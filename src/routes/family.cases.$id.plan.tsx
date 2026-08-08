import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, AlertTriangle, Circle, MinusCircle, ArrowRight, Info } from "lucide-react";
import { FamilyShell, StatusChip, AiLabel } from "@/components/family-shell";
import { useFamilyI18n } from "@/lib/family-i18n";
import { useFamilyCase, PLAN_SECTIONS, issueSectionCount, type PlanSection, type ReviewStatus } from "@/lib/family-case-store";
import { adviceCoverage } from "@/lib/family-advice-coverage";

export const Route = createFileRoute("/family/cases/$id/plan")({
  component: PlanReview,
});

function PlanReview() {
  const { t } = useFamilyI18n();
  const { state, dispatch } = useFamilyCase();
  const coverage = adviceCoverage(state.documents);
  const missingAdvice = coverage.filter((r) => !r.present);

  return (
    <FamilyShell>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">{t("plan.title")}</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-3xl">{t("plan.caveat")}</p>
        </header>

        <section id="pairings" className="rounded-lg border bg-surface p-4 sm:p-5 space-y-3">
          <div>
            <h2 className="text-sm font-semibold">Needs and provision (B ↔ F)</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Each need from professional advice is paired with matching Section F provision when one exists.
            </p>
          </div>
          {state.needPairings.length === 0 ? (
            <p className="text-sm text-muted-foreground">No pairings in this case yet.</p>
          ) : (
            <ul className="space-y-2">
              {state.needPairings.map((p) => (
                <li key={p.id} className={`rounded-md border p-3 ${p.provision ? "bg-muted/20" : "border-warn/50 bg-warn/5"}`}>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="text-sm font-medium">{p.need}</div>
                      <div className="text-xs text-muted-foreground">{p.professional} · source p.{p.sourcePage}</div>
                      <div className="text-xs">
                        <span className="font-medium">Provision: </span>
                        {p.provision ?? <span className="text-warn-foreground">No corresponding provision found in Section F</span>}
                      </div>
                      {p.proposed ? <div className="text-xs text-muted-foreground">Suggested family action: {p.proposed}</div> : null}
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <StatusChip
                        tone={p.status === "reviewed" ? "ok" : p.status === "needs_attention" ? "warn" : "muted"}
                        label={p.status === "reviewed" ? "Reviewed" : p.status === "needs_attention" ? "Needs attention" : "Not yet reviewed"}
                        Icon={p.status === "reviewed" ? CheckCircle2 : p.status === "needs_attention" ? AlertTriangle : Circle}
                      />
                      {p.status !== "reviewed" && (
                        <button
                          type="button"
                          onClick={() => dispatch({ type: "updateNeedPairing", id: p.id, patch: { status: "reviewed" } })}
                          className="min-h-11 px-3 rounded-md border text-xs hover:bg-accent"
                        >
                          Mark reviewed
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <Link to={`/family/cases/${state.id}/issues`} className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
            Open issues to include amendments <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </section>

        <section id="section-k" className="rounded-lg border bg-surface p-4 sm:p-5 space-y-3">
          <div>
            <h2 className="text-sm font-semibold">Section K — advice and information</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Compared against advice types typically needed to prepare a draft plan. Status is derived from documents on the case.
            </p>
          </div>
          <StatusChip
            tone={state.sectionStatus.K === "reviewed" ? "ok" : "warn"}
            label={state.sectionStatus.K === "reviewed" ? "All expected advice present" : "Needs attention — advice missing"}
            Icon={state.sectionStatus.K === "reviewed" ? CheckCircle2 : AlertTriangle}
          />
          <ul className="space-y-1.5">
            {coverage.map((row) => (
              <li key={row.id} className="flex items-center gap-2 text-sm">
                {row.present ? (
                  <CheckCircle2 className="h-4 w-4 text-ok shrink-0" aria-hidden="true" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-warn-foreground shrink-0" aria-hidden="true" />
                )}
                <span className={row.present ? "text-muted-foreground" : "font-medium"}>{row.label}</span>
                {!row.present && <span className="text-xs text-warn-foreground">— not found in case documents</span>}
              </li>
            ))}
          </ul>
          {missingAdvice.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Consider asking the local authority to confirm whether missing advice was obtained and considered.
            </p>
          )}
        </section>

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
  const kDerived = sectionKey === "K";

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
          {kDerived && (
            <p className="text-xs text-muted-foreground rounded-md bg-muted/40 p-2">
              Section K status is derived from the advice checklist above — it updates when documents are added or removed.
            </p>
          )}

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

          {!kDerived && (
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
          )}

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
