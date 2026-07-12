import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { useConsultations, formatDate, type NeedCapability } from "@/lib/consultations-store";
import { useSchoolProfile, domainLabel, domainOrder, type NeedDomain } from "@/lib/school-profile-store";
import { useTemplates } from "@/lib/templates-store";
import { EvidencePickerDialog } from "./templates";
import { findVagueness, VAGUENESS_EXPLANATION } from "@/lib/vagueness";
import { MatchScore } from "./consultations.$id.needs";
import { Paperclip, ArrowRight, ArrowLeft, FileText, Eye, Pencil, Sparkles, AlertTriangle, X } from "lucide-react";

export const Route = createFileRoute("/consultations/$id/draft")({
  head: ({ params }) => ({
    meta: [
      { title: `Draft response — ${params.id.toUpperCase()} — EHCP Response` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DraftView,
});

const capabilityLabel: Record<NeedCapability, string> = {
  full: "Can meet in full",
  partial: "Can meet in part",
  cannot: "Cannot meet",
};
const capabilityClass: Record<NeedCapability, string> = {
  full: "bg-ok/10 text-ok border-ok/30",
  partial: "bg-warn/15 text-warn-foreground border-warn/40",
  cannot: "bg-urgent/10 text-urgent border-urgent/30",
};

function DraftView() {
  const { id } = Route.useParams();
  const { get, setDraftResponse, addEvidence, removeEvidence } = useConsultations();
  const c = get(id);
  if (!c) throw notFound();

  const [view, setView] = useState<"edit" | "letter">("edit");
  const [pickerNeedId, setPickerNeedId] = useState<string | null>(null);

  const pickerNeed = c.needs.find((n) => n.id === pickerNeedId) ?? null;

  return (
    <AppShell
      breadcrumbs={[
        { label: "Dashboard", to: "/" },
        { label: c.pupilRef, to: `/consultations/${c.id}` },
        { label: "Draft response" },
      ]}
      actions={
        <Link
          to="/consultations/$id/submit"
          params={{ id: c.id }}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
        >
          Review & submit <ArrowRight className="h-4 w-4" />
        </Link>
      }
    >
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link to="/consultations/$id/needs" params={{ id: c.id }} className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Back to needs
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight mt-2">Response draft — Section F provision</h1>
            <p className="text-sm text-muted-foreground mt-1">
              For {c.pupilRef} · {c.localAuthority} · received {formatDate(c.receivedOn)}
            </p>
          </div>
          <MatchScore
            full={c.needs.filter((n) => n.capability === "full").length}
            total={c.needs.length}
          />
          <div className="inline-flex rounded-md border bg-surface p-1">
            <button
              onClick={() => setView("edit")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded ${view === "edit" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              <Pencil className="h-3 w-3" /> Per-need
            </button>
            <button
              onClick={() => setView("letter")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded ${view === "letter" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              <Eye className="h-3 w-3" /> Letter preview
            </button>
          </div>
        </div>

        {view === "edit" ? (
          <ol className="space-y-4">
            {c.needs.map((n, i) => (
              <li key={n.id} className="bg-surface border rounded-lg overflow-hidden">
                <header className="px-5 py-3 border-b bg-muted/20 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-6 w-6 rounded-full bg-muted grid place-items-center text-xs font-semibold text-muted-foreground shrink-0">
                      {i + 1}
                    </div>
                    <h3 className="text-sm font-medium truncate">{n.title}</h3>
                  </div>
                  <span className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-medium ${capabilityClass[n.capability]}`}>
                    {capabilityLabel[n.capability]}
                  </span>
                </header>
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <label className="text-xs font-medium text-muted-foreground">School response</label>
                    <TemplateInsertMenu
                      capability={n.capability}
                      currentText={n.draftResponse}
                      onInsert={(text) => {
                        const existing = n.draftResponse.trim();
                        const separator = existing ? "\n\n" : "";
                        setDraftResponse(c.id, n.id, existing + separator + text);
                      }}
                    />
                  </div>
                  <textarea
                    value={n.draftResponse}
                    onChange={(e) => setDraftResponse(c.id, n.id, e.target.value)}
                    rows={4}
                    className="w-full rounded-md border bg-surface p-3 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-ring/40"
                  />
                  <VaguenessHints text={n.draftResponse} />
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center flex-wrap gap-2">
                      {n.evidence.map((e) => (
                        <span key={e} className="inline-flex items-center gap-1.5 px-2 py-1 rounded border bg-muted/40 text-xs group">
                          <FileText className="h-3 w-3" /> {e}
                          <button
                            type="button"
                            onClick={() => removeEvidence(c.id, n.id, e)}
                            aria-label={`Remove ${e}`}
                            className="ml-1 text-muted-foreground hover:text-urgent rounded-sm focus:outline-none focus:ring-1 focus:ring-ring"
                            title="Remove evidence"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                      {n.evidence.length === 0 && (
                        <span className="text-xs text-muted-foreground">No evidence attached</span>
                      )}
                    </div>
                    <button
                      onClick={() => setPickerNeedId(n.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                    >
                      <Paperclip className="h-3 w-3" /> Attach evidence
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <LetterPreview c={c} />
        )}
      </div>

      <EvidencePickerDialog
        open={pickerNeed !== null}
        onClose={() => setPickerNeedId(null)}
        excludeNames={pickerNeed?.evidence ?? []}
        onPick={(doc) => {
          if (pickerNeed) addEvidence(c.id, pickerNeed.id, doc.name);
          setPickerNeedId(null);
        }}
      />
    </AppShell>
  );
}

// Compact dropdown of template snippets applicable to this need's capability.
function TemplateInsertMenu({
  capability,
  onInsert,
}: {
  capability: NeedCapability;
  onInsert: (text: string) => void;
}) {
  const { snippets } = useTemplates();
  const { profile } = useSchoolProfile();
  const [open, setOpen] = useState(false);

  const grouped = useMemo(() => {
    return domainOrder.map((d) => {
      const items =
        capability === "full"
          ? profile.provision[d].map((it) => ({
              id: it.id,
              title: firstSentence(it.description) || "Provision entry",
              text: it.description,
            }))
          : snippets
              .filter((s) => s.domain === d && s.capability === capability)
              .map((s) => ({ id: s.id, title: s.title, text: s.text }));
      return { domain: d, items };
    });
  }, [snippets, profile.provision, capability]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md border bg-surface text-xs font-medium hover:bg-accent"
      >
        <Sparkles className="h-3 w-3" /> Insert from template
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 w-96 max-h-96 overflow-y-auto rounded-md border bg-surface shadow-lg">
            <div className="px-3 py-2 border-b flex items-center justify-between">
              <span className="text-xs font-medium">
                Snippets — {capabilityLabel[capability].toLowerCase()}
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="p-2 space-y-3">
              {grouped.map((g) => (
                <div key={g.domain}>
                  <div className="text-[11px] font-medium text-muted-foreground px-1 pb-1">
                    {domainLabel[g.domain as NeedDomain]}
                  </div>
                  {g.items.length === 0 ? (
                    <div className="text-[11px] text-muted-foreground px-1 py-1">
                      No snippets.
                    </div>
                  ) : (
                    g.items.map((it) => (
                      <button
                        key={it.id}
                        onClick={() => {
                          onInsert(it.text);
                          setOpen(false);
                        }}
                        className="w-full text-left rounded-md hover:bg-accent px-2 py-1.5"
                      >
                        <div className="text-xs font-medium truncate">{it.title}</div>
                        <div className="text-[11px] text-muted-foreground line-clamp-2">
                          {it.text}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function firstSentence(text: string) {
  const m = text.match(/^[^.,;]{4,80}/);
  return m ? m[0].trim() : text.slice(0, 60);
}

// Non-blocking, soft prompt: lists flagged phrases below the textarea.
function VaguenessHints({ text }: { text: string }) {
  const matches = useMemo(() => findVagueness(text), [text]);
  if (matches.length === 0) return null;
  // De-duplicate by rule so the same phrase doesn't repeat.
  const seen = new Set<string>();
  const unique = matches.filter((m) => {
    if (seen.has(m.rule)) return false;
    seen.add(m.rule);
    return true;
  });
  return (
    <div className="flex items-start gap-2 rounded-md border border-warn/40 bg-warn/10 px-3 py-2 text-[11px] text-warn-foreground">
      <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
      <div className="space-y-1">
        <div className="font-medium">Vague wording — consider tightening</div>
        <div className="flex flex-wrap gap-1.5">
          {unique.map((m) => (
            <span
              key={m.rule}
              title={`"${m.phrase}" — ${VAGUENESS_EXPLANATION}`}
              className="rounded bg-warn/25 px-1.5 py-0.5 cursor-help underline decoration-dotted underline-offset-2"
            >
              {m.phrase}
            </span>
          ))}
        </div>
        <div className="opacity-80">
          Section F should state type, frequency, duration and who delivers the provision.
        </div>
      </div>
    </div>
  );
}

function LetterPreview({ c }: { c: ReturnType<ReturnType<typeof useConsultations>["get"]> & object }) {
  const { profile } = useSchoolProfile();
  return (
    <article className="bg-surface border rounded-lg p-10 leading-relaxed text-sm shadow-sm max-w-3xl mx-auto">
      <div className="text-right text-xs text-muted-foreground">
        {profile.schoolName}<br />
        {profile.schoolAddress}<br />
        {formatDate(new Date().toISOString())}
      </div>
      <div className="mt-8">
        <div className="font-medium">{c.caseOfficer}</div>
        <div className="text-muted-foreground">{c.localAuthority}</div>
      </div>
      <h2 className="mt-8 font-semibold">
        Re: EHC needs assessment consultation — {c.pupilRef} ({c.yearGroup})
      </h2>
      <p className="mt-4">Dear {c.caseOfficer.split(".")[1]?.trim() ?? c.caseOfficer},</p>
      <p className="mt-4">
        Thank you for consulting {profile.schoolName} regarding the above pupil. We have reviewed the assessment
        documentation and set out below our response to each of the needs identified in Section B, together with the
        Section F provision we are able to make. This response is offered to inform the local authority's Section I
        placement decision.
      </p>
      <ol className="mt-6 space-y-5 list-decimal pl-5">
        {c.needs.map((n) => (
          <li key={n.id}>
            <div className="font-medium">{n.title}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{capabilityLabel[n.capability]}</div>
            <p className="mt-2 text-foreground/90">{n.draftResponse}</p>
          </li>
        ))}
      </ol>
      <p className="mt-8">
        We remain committed to working with the local authority and the family to ensure the pupil's needs are met.
        Please do not hesitate to contact us should you require any further information.
      </p>
      <div className="mt-8">
        Yours sincerely,<br />
        <span className="font-medium">{profile.sendcoName}</span><br />
        {profile.sendcoRole}, {profile.schoolName}
      </div>
    </article>
  );
}
