import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { useSchoolProfile, domainLabel, domainOrder, type NeedDomain } from "@/lib/school-profile-store";
import { useTemplates, type EvidenceDoc } from "@/lib/templates-store";
import type { NeedCapability } from "@/lib/consultations-store";
import { segmentText, VAGUENESS_EXPLANATION } from "@/lib/vagueness";
import {
  CheckCircle2,
  MinusCircle,
  XCircle,
  Info,
  FileText,
  Search,
  Paperclip,
  Copy,
} from "lucide-react";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates — EHCP Response" },
      {
        name: "description",
        content:
          "Reusable Section F provision language and a searchable library of evidence documents.",
      },
    ],
  }),
  component: TemplatesPage,
});

type Tab = "templates" | "evidence";

function TemplatesPage() {
  const [tab, setTab] = useState<Tab>("templates");
  const [highlightedEvidence, setHighlightedEvidence] = useState<string | null>(null);
  const [highlightedSnippet, setHighlightedSnippet] = useState<string | null>(null);
  const evidenceRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const snippetRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const jumpToEvidence = (id: string) => {
    setTab("evidence");
    setHighlightedEvidence(id);
    // Wait for tab render to attach refs.
    window.setTimeout(() => {
      const el = evidenceRefs.current[id];
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
    window.setTimeout(() => setHighlightedEvidence(null), 2600);
  };

  const jumpToSnippet = (id: string) => {
    setTab("templates");
    setHighlightedSnippet(id);
    window.setTimeout(() => {
      const el = snippetRefs.current[id];
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
    window.setTimeout(() => setHighlightedSnippet(null), 2600);
  };

  // Deep-link via URL hash: "#tab=evidence&highlight=<id>", "#tab=templates&snippet=<id>",
  // or plain "#tab=<name>". React to router state so navigations from within Templates work too.
  const routerHash = useRouterState({ select: (s) => s.location.hash });
  useEffect(() => {
    const raw = (routerHash ?? (typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : ""))
      .replace(/^#/, "");
    if (!raw) return;
    const params = new URLSearchParams(raw);
    const t = params.get("tab");
    if (t === "evidence" || t === "templates") setTab(t);
    const h = params.get("highlight");
    if (h) jumpToEvidence(h);
    const s = params.get("snippet");
    if (s) jumpToSnippet(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routerHash]);

  return (
    <AppShell breadcrumbs={[{ label: "Templates" }]}>
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Templates</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Reusable Section F provision language and a shared library of evidence documents.
          </p>
        </div>

        <div className="inline-flex rounded-md border bg-surface p-1">
          <TabButton active={tab === "templates"} onClick={() => setTab("templates")}>
            Templates
          </TabButton>
          <TabButton active={tab === "evidence"} onClick={() => setTab("evidence")}>
            Evidence
          </TabButton>
        </div>

        {tab === "templates" ? (
          <TemplatesTab
            onJumpToEvidence={jumpToEvidence}
            highlightedId={highlightedSnippet}
            itemRefs={snippetRefs}
          />
        ) : (
          <EvidenceTab highlightedId={highlightedEvidence} itemRefs={evidenceRefs} />
        )}
      </div>
    </AppShell>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 text-sm font-medium rounded ${
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

// ---------------- Templates tab ----------------

const capabilityMeta: Record<NeedCapability, { label: string; icon: React.ReactNode; chip: string }> = {
  full: {
    label: "Can meet in full",
    icon: <CheckCircle2 className="h-4 w-4" />,
    chip: "bg-ok/10 text-ok border-ok/30",
  },
  partial: {
    label: "Can meet in part",
    icon: <MinusCircle className="h-4 w-4" />,
    chip: "bg-warn/15 text-warn-foreground border-warn/40",
  },
  cannot: {
    label: "Cannot meet",
    icon: <XCircle className="h-4 w-4" />,
    chip: "bg-urgent/10 text-urgent border-urgent/30",
  },
};

function TemplatesTab({
  onJumpToEvidence,
  highlightedId,
  itemRefs,
}: {
  onJumpToEvidence: (id: string) => void;
  highlightedId: string | null;
  itemRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
}) {
  const { profile } = useSchoolProfile();
  const { snippets, getEvidence } = useTemplates();

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Reusable Section F provision language, organised by domain.
      </p>
      <div className="rounded-md border bg-muted/20 px-4 py-3 flex items-start gap-2 text-xs text-muted-foreground">
        <Info className="h-4 w-4 mt-0.5 shrink-0 text-info" />
        <span>
          A child's needs often span more than one developmental area — communication, cognition,
          sensory or SEMH needs frequently overlap. Treat the categories below as a working
          structure, not a fixed classification.
        </span>
      </div>

      <div className="space-y-8">
        {domainOrder.map((d) => {
          const fullFromCatalogue = profile.provision[d];
          const partial = snippets.filter((s) => s.domain === d && s.capability === "partial");
          const cannot = snippets.filter((s) => s.domain === d && s.capability === "cannot");
          return (
            <section key={d} className="space-y-3">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-lg font-semibold tracking-tight">{domainLabel[d]}</h2>
                <span className="text-xs text-muted-foreground">
                  {fullFromCatalogue.length + partial.length + cannot.length} snippets
                </span>
              </div>

              <OutcomeGroup
                capability="full"
                helper="Reads from the school's provision catalogue in Settings. Editing Settings updates these snippets."
              >
                {fullFromCatalogue.length === 0 ? (
                  <EmptyRow>No provision recorded in Settings for this area.</EmptyRow>
                ) : (
                  fullFromCatalogue.map((item) => (
                    <SnippetCard
                      key={item.id}
                      title="From Settings — provision catalogue"
                      text={item.description}
                    />
                  ))
                )}
              </OutcomeGroup>

              <OutcomeGroup capability="partial" helper="General boilerplate — customise per case.">
                {partial.map((s) => (
                  <SnippetCard
                    key={s.id}
                    id={s.id}
                    title={s.title}
                    text={s.text}
                    evidence={s.evidenceId ? getEvidence(s.evidenceId) : undefined}
                    onEvidenceClick={onJumpToEvidence}
                    highlighted={highlightedId === s.id}
                    itemRef={(el) => {
                      itemRefs.current[s.id] = el;
                    }}
                  />
                ))}
              </OutcomeGroup>

              <OutcomeGroup capability="cannot" helper="General boilerplate — customise per case.">
                {cannot.map((s) => (
                  <SnippetCard
                    key={s.id}
                    id={s.id}
                    title={s.title}
                    text={s.text}
                    evidence={s.evidenceId ? getEvidence(s.evidenceId) : undefined}
                    onEvidenceClick={onJumpToEvidence}
                    highlighted={highlightedId === s.id}
                    itemRef={(el) => {
                      itemRefs.current[s.id] = el;
                    }}
                  />
                ))}
              </OutcomeGroup>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function OutcomeGroup({
  capability,
  helper,
  children,
}: {
  capability: NeedCapability;
  helper: string;
  children: React.ReactNode;
}) {
  const meta = capabilityMeta[capability];
  return (
    <div className="border rounded-lg overflow-hidden">
      <header className="px-4 py-2.5 border-b bg-muted/20 flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-medium ${meta.chip}`}
        >
          {meta.icon}
          {meta.label}
        </span>
        <span className="text-[11px] text-muted-foreground">{helper}</span>
      </header>
      <div className="p-3 space-y-2">{children}</div>
    </div>
  );
}

function EmptyRow({ children }: { children: React.ReactNode }) {
  return <div className="text-xs text-muted-foreground px-2 py-2">{children}</div>;
}

function SnippetCard({
  id,
  title,
  text,
  evidence,
  onEvidenceClick,
  highlighted,
  itemRef,
}: {
  id?: string;
  title: string;
  text: string;
  evidence?: EvidenceDoc;
  onEvidenceClick?: (id: string) => void;
  highlighted?: boolean;
  itemRef?: (el: HTMLDivElement | null) => void;
}) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard blocked; no-op */
    }
  };
  return (
    <div
      ref={itemRef}
      data-snippet-id={id}
      className={`rounded-md border bg-surface p-3 transition-colors ${
        highlighted ? "ring-2 ring-primary/50 bg-primary/5" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-xs font-medium text-muted-foreground">{title}</div>
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
        >
          <Copy className="h-3 w-3" /> {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="text-sm leading-relaxed mt-2">
        <FlaggedText text={text} />
      </p>
      {evidence && onEvidenceClick && (
        <button
          onClick={() => onEvidenceClick(evidence.id)}
          className="mt-2 inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
        >
          <FileText className="h-3 w-3" /> {evidence.name}
        </button>
      )}
    </div>
  );
}

// Inline flagged rendering used in snippet previews.
export function FlaggedText({ text }: { text: string }) {
  const segs = useMemo(() => segmentText(text), [text]);
  return (
    <>
      {segs.map((s, i) =>
        s.flag ? (
          <span
            key={i}
            title={`"${s.flag.phrase}" — ${VAGUENESS_EXPLANATION}`}
            className="rounded-sm bg-warn/25 text-warn-foreground underline decoration-dotted decoration-warn/70 underline-offset-2 cursor-help"
          >
            {s.text}
          </span>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </>
  );
}

// ---------------- Evidence tab ----------------

function EvidenceTab({
  highlightedId,
  itemRefs,
}: {
  highlightedId: string | null;
  itemRefs: React.MutableRefObject<Record<string, HTMLLIElement | null>>;
}) {
  const { evidence } = useTemplates();
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return evidence;
    return evidence.filter(
      (e) =>
        e.name.toLowerCase().includes(t) ||
        e.kind.toLowerCase().includes(t) ||
        e.note.toLowerCase().includes(t),
    );
  }, [evidence, q]);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Pupil-agnostic document store — provision maps, costings, staffing and training records.
        Referenced from templates and attachable from the Draft response screen.
      </p>
      <div className="relative">
        <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, type or note…"
          className="w-full h-10 rounded-md border bg-surface pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
        />
      </div>
      <ul className="space-y-2">
        {filtered.map((d) => (
          <li
            key={d.id}
            ref={(el) => {
              itemRefs.current[d.id] = el;
            }}
            className={`bg-surface border rounded-lg p-4 flex items-start gap-3 transition-colors ${
              highlightedId === d.id ? "ring-2 ring-primary/50 bg-primary/5" : ""
            }`}
          >
            <div className="h-10 w-10 rounded-md bg-muted grid place-items-center shrink-0">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-3">
                <div className="font-medium text-sm truncate">{d.name}</div>
                <div className="text-[11px] text-muted-foreground shrink-0">
                  {d.kind} · {d.size} · updated{" "}
                  {new Date(d.updated).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{d.note}</p>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="text-sm text-muted-foreground px-2 py-6 text-center">
            No documents match "{q}".
          </li>
        )}
      </ul>
    </div>
  );
}

// ---------------- Evidence picker (used from Draft screen) ----------------

export function EvidencePickerDialog({
  open,
  onClose,
  onPick,
  excludeNames,
}: {
  open: boolean;
  onClose: () => void;
  onPick: (doc: EvidenceDoc) => void;
  excludeNames: string[];
}) {
  const { evidence } = useTemplates();
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return evidence.filter(
      (e) =>
        !excludeNames.includes(e.name) &&
        (!t ||
          e.name.toLowerCase().includes(t) ||
          e.kind.toLowerCase().includes(t) ||
          e.note.toLowerCase().includes(t)),
    );
  }, [evidence, q, excludeNames]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-surface border rounded-lg shadow-lg overflow-hidden"
      >
        <header className="px-5 py-3 border-b flex items-center justify-between">
          <h2 className="text-sm font-semibold">Attach evidence</h2>
          <button
            onClick={onClose}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Close
          </button>
        </header>
        <div className="p-4 space-y-3">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search library…"
              className="w-full h-9 rounded-md border bg-surface pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <ul className="max-h-80 overflow-y-auto space-y-1.5">
            {filtered.map((d) => (
              <li key={d.id}>
                <button
                  onClick={() => onPick(d)}
                  className="w-full text-left rounded-md border bg-surface hover:bg-accent px-3 py-2 flex items-start gap-2"
                >
                  <Paperclip className="h-3.5 w-3.5 mt-0.5 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{d.name}</div>
                    <div className="text-[11px] text-muted-foreground truncate">
                      {d.kind} · {d.note}
                    </div>
                  </div>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="text-xs text-muted-foreground text-center py-6">
                Nothing else to attach.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
