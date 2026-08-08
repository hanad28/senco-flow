import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Circle, EyeOff, RotateCcw, FileText, ArrowRight } from "lucide-react";
import { FamilyShell, AiLabel, StatusChip } from "@/components/family-shell";
import { useFamilyI18n } from "@/lib/family-i18n";
import { useFamilyCase, type Issue, PLAN_SECTIONS } from "@/lib/family-case-store";
import { flagVagueProvision } from "@/lib/family-specificity";

export const Route = createFileRoute("/family/cases/$id/issues")({
  component: IssuesScreen,
});

const STATUS_LABEL: Record<Issue["status"], string> = {
  not_started: "Not started",
  drafted: "Drafted",
  ready: "Ready to include",
  dismissed: "Dismissed by family",
};

function IssuesScreen() {
  const { t } = useFamilyI18n();
  const { state, dispatch } = useFamilyCase();
  const [filter, setFilter] = useState<"open" | "ready" | "dismissed" | "all">("open");

  const filtered = useMemo(() => {
    if (filter === "open") return state.issues.filter((i) => i.status !== "dismissed" && i.status !== "ready");
    if (filter === "ready") return state.issues.filter((i) => i.status === "ready");
    if (filter === "dismissed") return state.issues.filter((i) => i.status === "dismissed");
    return state.issues;
  }, [state.issues, filter]);

  return (
    <FamilyShell>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">{t("nav.issues")}</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-3xl">
            Review each highlighted item. You decide what to include in your response. Nothing is added to your response automatically.
          </p>
        </header>

        <div className="flex flex-wrap gap-2">
          {(["open", "ready", "dismissed", "all"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`min-h-11 px-3 rounded-md border text-sm ${filter === f ? "bg-primary text-primary-foreground border-primary" : "bg-surface hover:bg-accent"}`}
            >
              {f === "open" ? "Open" : f === "ready" ? "Ready to include" : f === "dismissed" ? "Dismissed" : "All"}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground rounded-md border bg-surface p-6 text-center">Nothing in this list.</p>
        ) : (
          <ul className="space-y-3">
            {filtered.map((i) => (
              <IssueCard key={i.id} issue={i} onUpdate={(patch) => dispatch({ type: "updateIssue", id: i.id, patch })} caseId={state.id} />
            ))}
          </ul>
        )}
      </div>
    </FamilyShell>
  );
}

function IssueCard({ issue, onUpdate, caseId }: { issue: Issue; onUpdate: (p: Partial<Issue>) => void; caseId: string }) {
  const { state } = useFamilyCase();
  const [draft, setDraft] = useState(issue.proposedAmendment);
  const sourceDoc = state.documents.find((d) => d.id === issue.sourceDocId);
  const secName = PLAN_SECTIONS.find((s) => s.key === issue.section)?.name;
  const vague = issue.currentDraft ? flagVagueProvision(issue.currentDraft) : null;

  // Keep local draft in sync if store resets (e.g. Reset demo).
  useEffect(() => {
    setDraft(issue.proposedAmendment);
  }, [issue.id, issue.proposedAmendment]);

  const tone = issue.severity === "important" ? "warn" : "info";
  const Icon = issue.severity === "important" ? AlertTriangle : Circle;

  const commitDraft = (status: Issue["status"]) => {
    onUpdate({ proposedAmendment: draft, status });
  };

  return (
    <li className={`rounded-lg border bg-surface p-4 sm:p-5 ${issue.status === "ready" ? "border-ok/40 bg-ok/5" : issue.status === "dismissed" ? "opacity-60" : ""}`}>
      <div className="flex items-start gap-3">
        <div className={`h-9 w-9 rounded-md grid place-items-center shrink-0 ${issue.severity === "important" ? "bg-warn/15 text-warn-foreground" : "bg-info/10 text-info-foreground"}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-muted-foreground font-medium">Section {issue.section} · {secName}</span>
            {issue.origin === "ai" && <AiLabel>AI-generated</AiLabel>}
            <StatusChip tone={issue.status === "ready" ? "ok" : issue.status === "dismissed" ? "muted" : tone} label={STATUS_LABEL[issue.status]} Icon={issue.status === "ready" ? CheckCircle2 : Icon} />
          </div>
          <h3 className="text-base font-semibold mt-1">{issue.title}</h3>

          {issue.currentDraft && (
            <div className="mt-3 rounded-md border bg-muted/30 p-3 text-sm">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1">Current draft wording</div>
              {issue.currentDraft}
            </div>
          )}

          {vague && (
            <div className="mt-3 rounded-md border border-warn/40 bg-warn/10 p-3 text-sm space-y-2">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-warn-foreground">Flag and cite — no invented wording</div>
              <p className="text-xs">
                Vague phrases: {vague.phrases.map((p) => `"${p}"`).join(", ")}. Missing from the legal standard: {vague.missing.join(", ")}.
              </p>
              <p className="text-[11px] text-muted-foreground">{vague.standardNote}</p>
            </div>
          )}

          <p className="text-sm mt-3"><span className="font-medium">Why we flagged this: </span>{issue.why}</p>

          {sourceDoc && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Source: <Link to={`/family/cases/${caseId}/documents`} className="text-primary hover:underline">{sourceDoc.title}</Link>{issue.sourcePage ? `, p.${issue.sourcePage}` : ""}</span>
            </div>
          )}

          {issue.status !== "dismissed" && (
            <div className="mt-4 space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Your amendment wording
                {issue.category === "vague_wording" ? (
                  <span className="ms-2 font-normal normal-case text-muted-foreground">— write your own; Unisen does not invent hours or staffing</span>
                ) : issue.origin === "ai" ? (
                  <span className="ms-2 inline-flex"><AiLabel>AI suggestion — review before including</AiLabel></span>
                ) : null}
              </label>
              <textarea
                value={draft}
                onChange={(e) => {
                  const next = e.target.value;
                  setDraft(next);
                  // Persist as the user types so navigation cannot drop edits (B8).
                  onUpdate({
                    proposedAmendment: next,
                    ...(issue.status === "not_started" && next.trim() ? { status: "drafted" as const } : {}),
                  });
                }}
                onBlur={() => {
                  if (issue.status === "not_started" && draft.trim()) commitDraft("drafted");
                  else onUpdate({ proposedAmendment: draft });
                }}
                rows={3}
                className="w-full rounded-md border bg-surface px-3 py-2 text-sm resize-y"
                placeholder="Write the amendment you would like included — using only facts from Maya's documents or professional advice…"
              />
              <p className="text-[11px] text-muted-foreground">You must review and approve before this appears in your response.</p>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {issue.status === "dismissed" ? (
              <button type="button" onClick={() => onUpdate({ status: "not_started" })} className="inline-flex items-center gap-1.5 min-h-11 px-3 rounded-md border text-sm hover:bg-accent">
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Restore
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => commitDraft("ready")}
                  disabled={!draft.trim()}
                  className="inline-flex items-center gap-1.5 min-h-11 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-40"
                >
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Mark ready to include
                </button>
                <button type="button" onClick={() => commitDraft("drafted")} className="inline-flex items-center gap-1.5 min-h-11 px-3 rounded-md border text-sm hover:bg-accent">
                  Save as draft
                </button>
                <button type="button" onClick={() => onUpdate({ status: "dismissed" })} className="inline-flex items-center gap-1.5 min-h-11 px-3 rounded-md border text-sm text-muted-foreground hover:bg-accent">
                  <EyeOff className="h-3.5 w-3.5" aria-hidden="true" /> Dismiss
                </button>
              </>
            )}
            <Link to={`/family/cases/${caseId}/response`} className="ms-auto inline-flex items-center gap-1 text-xs text-primary hover:underline">
              Go to my response <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
