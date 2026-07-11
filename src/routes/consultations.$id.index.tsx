import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { useConsultations, formatDate, deadlineTone } from "@/lib/consultations-store";
import { workingDaysRemaining } from "@/lib/working-days";
import { FileText, Sparkles, ArrowRight, AlertTriangle, Calendar, User2, Building2 } from "lucide-react";

export const Route = createFileRoute("/consultations/$id/")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.id.toUpperCase()} — Consultation — EHCP Response` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ConsultationDetail,
});

function ConsultationDetail() {
  const { id } = Route.useParams();
  const { get, setStatus } = useConsultations();
  const c = get(id);
  if (!c) throw notFound();

  const daysLeft = workingDaysRemaining(c.receivedOn);
  const tone = deadlineTone(daysLeft);
  const deadlineLabel =
    daysLeft < 0
      ? `Overdue by ${Math.abs(daysLeft)} working day${Math.abs(daysLeft) === 1 ? "" : "s"}`
      : daysLeft === 0
        ? "Response due today"
        : `${daysLeft} working day${daysLeft === 1 ? "" : "s"} until response due`;

  return (
    <AppShell
      breadcrumbs={[
        { label: "Dashboard", to: "/" },
        { label: `${c.pupilRef} · ${c.localAuthority}` },
      ]}
      actions={
        <Link
          to="/consultations/$id/needs"
          params={{ id: c.id }}
          onClick={() => c.status === "New" && setStatus(c.id, "Reviewing")}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
        >
          Review needs <ArrowRight className="h-4 w-4" />
        </Link>
      }
    >
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Consultation {c.id.toUpperCase()}
            </div>
            <h1 className="text-2xl font-semibold tracking-tight mt-1">{c.pupilRef} — {c.yearGroup}</h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Building2 className="h-4 w-4" />{c.localAuthority}</span>
              <span className="inline-flex items-center gap-1.5"><User2 className="h-4 w-4" />Case officer: {c.caseOfficer}</span>
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" />Received {formatDate(c.receivedOn)}</span>
            </div>
          </div>
          {c.status !== "Submitted" && (
            <div
              className={`rounded-md px-4 py-3 border text-sm ${
                tone === "urgent"
                  ? "bg-urgent/10 border-urgent/30 text-urgent"
                  : tone === "warn"
                    ? "bg-warn/15 border-warn/40 text-warn-foreground"
                    : "bg-ok/10 border-ok/30 text-ok"
              }`}
            >
              <div className="flex items-center gap-2 font-semibold">
                {tone === "urgent" && <AlertTriangle className="h-4 w-4" />}
                {deadlineLabel}
              </div>
              <div className="text-xs opacity-80 mt-0.5">Statutory 15 working-day window</div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-surface border rounded-lg overflow-hidden">
              <header className="px-5 py-4 border-b flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">Received documents</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {c.documents.length} files — {c.documents.reduce((s, d) => s + d.pages, 0)} pages total
                  </p>
                </div>
              </header>
              <ul className="divide-y">
                {c.documents.map((d) => (
                  <li key={d.id} className="flex items-center gap-4 px-5 py-3 hover:bg-muted/20">
                    <div className="h-10 w-10 rounded bg-primary/5 border border-primary/10 grid place-items-center text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{d.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {d.kind} · {d.author} · {formatDate(d.date)} · {d.pages} pp.
                      </div>
                    </div>
                    <button className="text-xs text-muted-foreground hover:text-foreground">Open</button>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="bg-gradient-to-br from-primary/[0.04] to-info/[0.06] border border-primary/15 rounded-lg overflow-hidden">
              <header className="px-5 py-4 border-b border-primary/10 flex items-center gap-2">
                <div className="h-7 w-7 rounded bg-primary text-primary-foreground grid place-items-center">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="font-semibold text-sm">AI summary</h2>
                  <p className="text-[11px] text-muted-foreground">Generated across all received documents</p>
                </div>
              </header>
              <div className="p-5 text-sm leading-relaxed text-foreground/90">
                {c.summary}
              </div>
              <div className="px-5 pb-5 pt-2 border-t border-primary/10 text-[11px] text-muted-foreground">
                Draft — always verify against source reports.
              </div>
            </section>

            <section className="bg-surface border rounded-lg p-5">
              <h3 className="text-sm font-semibold">Next step</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Review the consolidated list of needs extracted from the documents and confirm which the school can meet.
              </p>
              <Link
                to="/consultations/$id/needs"
                params={{ id: c.id }}
                onClick={() => c.status === "New" && setStatus(c.id, "Reviewing")}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                Go to consolidated needs <ArrowRight className="h-4 w-4" />
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
