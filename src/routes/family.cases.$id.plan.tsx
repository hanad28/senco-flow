import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, AlertTriangle, Circle, MinusCircle, FileText, ArrowRight, Info } from "lucide-react";
import { FamilyShell, StatusChip, AiLabel } from "@/components/family-shell";
import { useFamilyI18n } from "@/lib/family-i18n";
import { useFamilyCase, PLAN_SECTIONS, issueSectionCount, type PlanSection, type ReviewStatus } from "@/lib/family-case-store";

export const Route = createFileRoute("/family/cases/$id/plan")({
  component: PlanReview,
});

function PlanReview() {
  const { t } = useFamilyI18n();
  const { state } = useFamilyCase();
  return (
    <FamilyShell>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">{t("plan.title")}</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-3xl">{t("plan.caveat")}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PLAN_SECTIONS.map((s) => {
            const status = state.sectionStatus[s.key];
            const issueCount = issueSectionCount(state, s.key);
            return <SectionCard key={s.key} sectionKey={s.key} name={s.name} blurb={s.blurb} status={status} issueCount={issueCount} caseId={state.id} />;
          })}
        </div>
      </div>
    </FamilyShell>
  );
}

function statusMeta(status: ReviewStatus) {
  const map = {
    reviewed: { tone: "ok" as const, label: "Reviewed", Icon: CheckCircle2 },
    needs_attention: { tone: "warn" as const, label: "Needs attention", Icon: AlertTriangle },
    not_reviewed: { tone: "muted" as const, label: "Not yet reviewed", Icon: Circle },
    not_applicable: { tone: "muted" as const, label: "Not applicable", Icon: MinusCircle },
    expected_blank: { tone: "info" as const, label: "Expected to be blank in draft", Icon: Info },
  };
  return map[status];
}

function SectionCard({ sectionKey, name, blurb, status, issueCount, caseId }: { sectionKey: PlanSection; name: string; blurb: string; status: ReviewStatus; issueCount: number; caseId: string }) {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useFamilyCase();
  const meta = statusMeta(status);
  const sectionIssues = state.issues.filter((i) => i.section === sectionKey && i.status !== "dismissed");
  const notes = state.notes.filter((n) => n.section === sectionKey);
  const [noteDraft, setNoteDraft] = useState("");

  return (
    <div className={`rounded-lg border bg-surface ${status === "needs_attention" ? "border-warn/50" : ""}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-start p-4 sm:p-5 flex items-start gap-3 min-h-11 hover:bg-accent/40 transition-colors rounded-lg"
        aria-expanded={open}
      >
        <div className="grid place-items-center h-8 w-8 rounded-md bg-primary/10 text-primary text-xs font-bold shrink-0">{sectionKey}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="text-sm font-semibold truncate">{name}</div>
            {issueCount > 0 && (
              <span className="inline-flex items-center gap-1 text-[11px] text-warn-foreground shrink-0">
                <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                {issueCount}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{blurb}</p>
          <div className="mt-2"><StatusChip tone={meta.tone} label={meta.label} Icon={meta.Icon} /></div>
        </div>
      </button>

      {open && (
        <div className="px-4 sm:px-5 pb-5 space-y-4 border-t pt-4">
          {sectionIssues.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Highlighted items</h3>
              {sectionIssues.map((i) => (
                <div key={i.id} className="rounded-md border p-3 bg-muted/30">
                  <div className="flex items-start gap-2">
                    <AiLabel>{i.origin === "ai" ? "AI" : "check"}</AiLabel>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{i.title}</div>
                      {i.currentDraft && <p className="text-xs text-muted-foreground mt-1"><span className="font-medium">Current draft: </span>{i.currentDraft}</p>}
                      <p className="text-xs mt-1"><span className="font-medium">Why: </span>{i.why}</p>
                      <Link to={`/family/cases/${caseId}/issues`} className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline">
                        Review in issues <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Mark your review</h3>
            <div className="flex flex-wrap gap-2">
              {(["reviewed", "needs_attention", "not_reviewed", "not_applicable"] as ReviewStatus[]).map((s) => {
                const m = statusMeta(s);
                const active = status === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => dispatch({ type: "setSectionStatus", section: sectionKey, status: s })}
                    className={`inline-flex items-center gap-1.5 min-h-11 px-3 rounded-md border text-xs transition-colors ${active ? "bg-primary text-primary-foreground border-primary" : "bg-surface hover:bg-accent"}`}
                    aria-pressed={active}
                  >
                    <m.Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Your notes</h3>
            {notes.length > 0 && (
              <ul className="space-y-1 mb-2">
                {notes.map((n) => (
                  <li key={n.id} className="text-sm rounded-md bg-muted/40 p-2">{n.text}</li>
                ))}
              </ul>
            )}
            <div className="flex flex-col sm:flex-row gap-2">
              <textarea
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                placeholder="Add a note about this section…"
                className="flex-1 min-h-11 rounded-md border bg-surface px-3 py-2 text-sm resize-y"
                rows={2}
              />
              <button
                type="button"
                onClick={() => {
                  if (!noteDraft.trim()) return;
                  dispatch({ type: "addNote", section: sectionKey, text: noteDraft.trim() });
                  setNoteDraft("");
                }}
                className="inline-flex items-center justify-center min-h-11 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
              >
                Save note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
