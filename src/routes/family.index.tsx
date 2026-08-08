import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Circle, AlertTriangle, ArrowRight, MessageCircle, FileText, Users, Calendar, FolderOpen } from "lucide-react";
import { FamilyShell, AiLabel } from "@/components/family-shell";
import { useFamilyI18n, Tx } from "@/lib/family-i18n";
import { useFamilyCase, readinessScore, readinessChecks } from "@/lib/family-case-store";
import { FAMILY_STATUTORY, familyDaysRemaining } from "@/lib/family-config";

export const Route = createFileRoute("/family/")({
  component: FamilyDashboard,
});

function FamilyDashboard() {
  return (
    <FamilyShell>
      <DashboardBody />
    </FamilyShell>
  );
}

function DashboardBody() {
  const { t, formatDate } = useFamilyI18n();
  const { state } = useFamilyCase();
  const daysLeft = familyDaysRemaining(state.draftReceivedIso);
  const readiness = readinessScore(state);
  const openIssues = state.issues.filter((i) => i.status !== "dismissed" && i.status !== "ready").length;
  const caseBase = `/family/cases/${state.id}`;

  const stages = [
    { key: "received", label: t("dash.stage.received"), done: true },
    { key: "review", label: t("dash.stage.review"), done: state.issues.some((i) => i.status !== "not_started") },
    { key: "changes", label: t("dash.stage.changes"), done: state.issues.some((i) => i.status === "ready") },
    { key: "prepare", label: t("dash.stage.prepare"), done: readiness >= 70 },
    { key: "issued", label: t("dash.stage.issued"), done: false },
  ];

  const tasks = [
    { label: t("dash.task.reviewIssues"), done: openIssues === 0, to: `${caseBase}/issues` },
    { label: t("dash.task.addViews"), done: state.notes.some((n) => n.section === "A"), to: `${caseBase}/plan` },
    { label: t("dash.task.checkAdvice"), done: state.needPairings.every((p) => p.status !== "not_reviewed"), to: `${caseBase}/plan#pairings` },
    { label: t("dash.task.placement"), done: state.placement.preferredSchool.length > 0 || state.placement.preferredType.length > 0, to: `${caseBase}/response` },
    { label: t("dash.task.reviewResponse"), done: readinessChecks(state).every((c) => c.passed), to: `${caseBase}/response` },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight"><Tx k="dash.greeting" /></h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-3xl"><Tx k="dash.subtitle" /></p>
        <p className="text-xs text-muted-foreground">
          Rights holder (tracking): {state.rightsHolder === "young_person" ? "Young person" : "Parent / carer"}
          {state.age > 0 ? ` · child age ${state.age}` : null}
        </p>
      </header>

      {/* Deadline banner */}
      <section className="rounded-lg border bg-surface p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={`h-10 w-10 rounded-md grid place-items-center shrink-0 ${daysLeft <= 3 ? "bg-urgent/15 text-urgent" : daysLeft <= 7 ? "bg-warn/15 text-warn-foreground" : "bg-ok/15 text-ok"}`}>
            <Calendar className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-muted-foreground">{t("common.deadline")}</div>
            <div className="text-base font-semibold">{formatDate(state.deadlineIso)}</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {daysLeft >= 0 ? `${daysLeft} ${t("common.daysLeft")}` : `Overdue by ${Math.abs(daysLeft)} days`} · {FAMILY_STATUTORY.draftResponsePeriodLabel}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            to={`${caseBase}/plan`}
            className="inline-flex items-center gap-2 min-h-11 px-4 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90"
          >
            {t("dash.primary")} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to={`${caseBase}/assistant`}
            className="inline-flex items-center gap-2 min-h-11 px-4 rounded-md border bg-surface text-sm font-medium hover:bg-accent"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> {t("dash.secondary")}
          </Link>
        </div>
      </section>

      {/* AI summary card */}
      <section className="rounded-lg border bg-info/5 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <AiLabel>AI</AiLabel>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium">Reviewed for you</div>
            <p className="text-sm text-muted-foreground mt-1">{t("dash.aiSummary")}</p>
            <Link to={`${caseBase}/issues`} className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline">
              See the {openIssues} highlighted items <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tracker + Tasks */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border bg-surface p-4 sm:p-5">
          <h2 className="text-sm font-semibold">{t("dash.tracker")}</h2>
          <ol className="mt-4 space-y-3" aria-label={t("dash.tracker")}>
            {stages.map((s, i) => (
              <li key={s.key} className="flex items-start gap-3">
                <span className={`mt-0.5 grid place-items-center h-6 w-6 rounded-full text-[11px] font-semibold shrink-0 ${
                  s.done ? "bg-ok text-ok-foreground" : i === stages.findIndex((x) => !x.done) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`} aria-hidden="true">
                  {s.done ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <div className="flex-1">
                  <div className={`text-sm ${s.done ? "text-foreground" : i === stages.findIndex((x) => !x.done) ? "font-medium" : "text-muted-foreground"}`}>{s.label}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-lg border bg-surface p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">{t("dash.tasks")}</h2>
            <span className="text-xs text-muted-foreground">{tasks.filter((t) => t.done).length}/{tasks.length}</span>
          </div>
          <ul className="mt-4 space-y-2">
            {tasks.map((task, i) => (
              <li key={i}>
                <Link to={task.to} className="group flex items-start gap-3 rounded-md p-2 -m-2 min-h-11 hover:bg-accent transition-colors">
                  {task.done ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-ok shrink-0" aria-hidden="true" />
                  ) : (
                    <Circle className="mt-0.5 h-5 w-5 text-muted-foreground shrink-0" aria-hidden="true" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm ${task.done ? "text-muted-foreground line-through" : ""}`}>{task.label}</div>
                  </div>
                  <ArrowRight className="mt-0.5 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quick links */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <QuickLink to={`${caseBase}/response`} icon={FileText} label={t("nav.response")} sub={`Readiness ${readiness}%`} />
        <QuickLink to={`${caseBase}/documents`} icon={FolderOpen} label={t("nav.documents")} sub={`${state.documents.length} in case`} />
        <QuickLink to={`${caseBase}/support`} icon={Users} label={t("nav.support")} sub={`${state.support.length} people`} />
        <QuickLink to={`${caseBase}/issues`} icon={AlertTriangle} label={t("nav.issues")} sub={`${openIssues} open`} />
      </section>
    </div>
  );
}

function QuickLink({ to, icon: Icon, label, sub }: { to: string; icon: React.ComponentType<{ className?: string }>; label: string; sub: string }) {
  return (
    <Link to={to} className="rounded-lg border bg-surface p-4 hover:bg-accent transition-colors min-h-24 flex flex-col justify-between">
      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
      </div>
    </Link>
  );
}
