import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X, FileText, ClipboardList, ClipboardCheck, ArrowRight, CornerDownLeft } from "lucide-react";
import { useSearchOverlay } from "@/lib/search-store";
import { useConsultations, formatDate, deadlineTone } from "@/lib/consultations-store";
import { useTemplates } from "@/lib/templates-store";
import { calendarDaysRemaining } from "@/lib/working-days";
import { domainLabel } from "@/lib/school-profile-store";

type ConsultationResult = {
  kind: "consultation";
  id: string;
  title: string;
  subtitle: string;
  meta: { label: string; tone: "urgent" | "warn" | "ok" | "muted" };
  to: { pathname: "/consultations/$id"; params: { id: string } };
};
type SnippetResult = {
  kind: "snippet";
  id: string;
  title: string;
  subtitle: string;
  to: { pathname: "/templates"; hash: string };
};
type EvidenceResult = {
  kind: "evidence";
  id: string;
  title: string;
  subtitle: string;
  to: { pathname: "/templates"; hash: string };
};
type Result = ConsultationResult | SnippetResult | EvidenceResult;

const capabilityLabel = { partial: "Can meet in part", cannot: "Cannot meet" } as const;

function matches(needle: string, ...haystacks: (string | undefined)[]) {
  if (!needle) return true;
  const n = needle.toLowerCase();
  return haystacks.some((h) => h && h.toLowerCase().includes(n));
}

export function GlobalSearchOverlay() {
  const { open, query, setQuery, closeSearch } = useSearchOverlay();
  const { consultations } = useConsultations();
  const { snippets, evidence } = useTemplates();
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Build result groups.
  const { consultationResults, snippetResults, evidenceResults, flat } = useMemo(() => {
    const cr: ConsultationResult[] = consultations
      .filter((c) => matches(query, c.pupilRef, c.localAuthority, c.caseOfficer, c.yearGroup))
      .map((c) => {
        const days = calendarDaysRemaining(c.receivedOn);
        const submitted = c.status === "Submitted";
        const meta: ConsultationResult["meta"] = submitted
          ? { label: `Submitted ${c.submittedOn ? formatDate(c.submittedOn) : ""}`.trim(), tone: "muted" }
          : {
              label:
                days < 0
                  ? `Overdue by ${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"}`
                  : days === 0
                    ? "Due today"
                    : `${days} day${days === 1 ? "" : "s"} left`,
              tone: deadlineTone(days),
            };
        return {
          kind: "consultation",
          id: c.id,
          title: `${c.pupilRef} · ${c.yearGroup}`,
          subtitle: `${c.localAuthority} · ${c.status}`,
          meta,
          to: { pathname: "/consultations/$id", params: { id: c.id } },
        } satisfies ConsultationResult;
      })
      .sort((a, b) => a.title.localeCompare(b.title));

    const sr: SnippetResult[] = snippets
      .filter((s) => matches(query, s.title, s.text, domainLabel[s.domain], capabilityLabel[s.capability]))
      .map((s) => ({
        kind: "snippet",
        id: s.id,
        title: s.title,
        subtitle: `${domainLabel[s.domain]} · ${capabilityLabel[s.capability]}`,
        to: { pathname: "/templates", hash: `tab=templates&snippet=${s.id}` },
      }));

    const er: EvidenceResult[] = evidence
      .filter((e) => matches(query, e.name, e.kind, e.note))
      .map((e) => ({
        kind: "evidence",
        id: e.id,
        title: e.name,
        subtitle: `${e.kind} · updated ${formatDate(e.updated)}`,
        to: { pathname: "/templates", hash: `tab=evidence&highlight=${e.id}` },
      }));

    const flat: Result[] = [...cr, ...sr, ...er];
    return { consultationResults: cr, snippetResults: sr, evidenceResults: er, flat };
  }, [consultations, snippets, evidence, query]);

  // Reset selection when query changes or overlay opens; focus input.
  useEffect(() => {
    if (open) {
      setSelectedIdx(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open, query]);

  // Keep selected item visible.
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(`[data-result-idx="${selectedIdx}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIdx, open]);

  const activate = (r: Result) => {
    closeSearch();
    if (r.kind === "consultation") {
      navigate({ to: r.to.pathname, params: r.to.params });
    } else {
      // Nonce guarantees the hash changes even when re-selecting the same result
      // (so the Templates page's hash effect re-fires and re-scrolls/re-highlights).
      const hash = `${r.to.hash}&n=${Date.now()}`;
      navigate({ to: r.to.pathname, hash });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(flat.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = flat[selectedIdx];
      if (r) activate(r);
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeSearch();
    }
  };

  if (!open) return null;

  let runningIdx = 0;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center pt-[10vh] px-4"
      onClick={closeSearch}
    >
      <div className="fixed inset-0 bg-foreground/40 backdrop-blur-[1px]" aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search across the app"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-lg border bg-surface shadow-2xl overflow-hidden"
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search consultations, templates, evidence…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={closeSearch}
            aria-label="Close search"
            className="text-muted-foreground hover:text-foreground rounded p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div ref={listRef} className="max-h-[60vh] overflow-y-auto">
          {flat.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="text-sm font-medium">No results</div>
              <div className="text-xs text-muted-foreground mt-1">
                {query
                  ? `Nothing matches “${query}” in consultations, templates, or evidence.`
                  : "Type to search across consultations, templates, and evidence."}
              </div>
            </div>
          ) : (
            <>
              {consultationResults.length > 0 && (
                <Group label="Consultations" count={consultationResults.length}>
                  {consultationResults.map((r) => {
                    const idx = runningIdx++;
                    return (
                      <ResultRow
                        key={r.id}
                        idx={idx}
                        selected={idx === selectedIdx}
                        icon={<ClipboardList className="h-4 w-4 text-primary" />}
                        title={r.title}
                        subtitle={r.subtitle}
                        right={
                          <span className={`text-[11px] font-medium ${toneText(r.meta.tone)}`}>
                            {r.meta.label}
                          </span>
                        }
                        onHover={() => setSelectedIdx(idx)}
                        onSelect={() => activate(r)}
                      />
                    );
                  })}
                </Group>
              )}
              {snippetResults.length > 0 && (
                <Group label="Templates" count={snippetResults.length}>
                  {snippetResults.map((r) => {
                    const idx = runningIdx++;
                    return (
                      <ResultRow
                        key={r.id}
                        idx={idx}
                        selected={idx === selectedIdx}
                        icon={<ClipboardCheck className="h-4 w-4 text-primary" />}
                        title={r.title}
                        subtitle={r.subtitle}
                        onHover={() => setSelectedIdx(idx)}
                        onSelect={() => activate(r)}
                      />
                    );
                  })}
                </Group>
              )}
              {evidenceResults.length > 0 && (
                <Group label="Evidence" count={evidenceResults.length}>
                  {evidenceResults.map((r) => {
                    const idx = runningIdx++;
                    return (
                      <ResultRow
                        key={r.id}
                        idx={idx}
                        selected={idx === selectedIdx}
                        icon={<FileText className="h-4 w-4 text-primary" />}
                        title={r.title}
                        subtitle={r.subtitle}
                        onHover={() => setSelectedIdx(idx)}
                        onSelect={() => activate(r)}
                      />
                    );
                  })}
                </Group>
              )}
            </>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 px-4 py-2 border-t bg-muted/20 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Kbd>↑</Kbd><Kbd>↓</Kbd> navigate
            </span>
            <span className="inline-flex items-center gap-1">
              <Kbd><CornerDownLeft className="h-3 w-3" /></Kbd> open
            </span>
            <span className="inline-flex items-center gap-1">
              <Kbd>Esc</Kbd> close
            </span>
          </div>
          <span className="inline-flex items-center gap-1">
            <Kbd>⌘</Kbd><Kbd>K</Kbd> anywhere
          </span>
        </div>
      </div>
    </div>
  );
}

function Group({ label, count, children }: { label: string; count: number; children: React.ReactNode }) {
  return (
    <div>
      <div className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
        <span>{label}</span>
        <span className="tabular-nums">{count}</span>
      </div>
      <ul>{children}</ul>
    </div>
  );
}

function ResultRow({
  idx,
  selected,
  icon,
  title,
  subtitle,
  right,
  onHover,
  onSelect,
}: {
  idx: number;
  selected: boolean;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  right?: React.ReactNode;
  onHover: () => void;
  onSelect: () => void;
}) {
  return (
    <li
      data-result-idx={idx}
      onMouseEnter={onHover}
      onClick={onSelect}
      className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer ${
        selected ? "bg-primary/10" : "hover:bg-muted/40"
      }`}
    >
      <div className="h-7 w-7 rounded bg-muted/60 grid place-items-center shrink-0">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium truncate">{title}</div>
        <div className="text-xs text-muted-foreground truncate">{subtitle}</div>
      </div>
      {right}
      {selected && <ArrowRight className="h-3.5 w-3.5 text-primary shrink-0" />}
    </li>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center justify-center min-w-[1.25rem] h-[1.25rem] px-1 rounded border bg-surface text-[10px] font-medium tabular-nums">
      {children}
    </kbd>
  );
}

function toneText(tone: "urgent" | "warn" | "ok" | "muted") {
  switch (tone) {
    case "urgent": return "text-urgent";
    case "warn":   return "text-warn-foreground";
    case "ok":     return "text-ok";
    default:       return "text-muted-foreground";
  }
}
