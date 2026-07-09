import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { useConsultations, formatDate, deadlineTone, type ConsultationStatus } from "@/lib/consultations-store";
import { Search, ArrowUpDown, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — EHCP Response" },
      { name: "description", content: "All incoming EHC needs assessment consultations, sorted by deadline." },
    ],
  }),
  component: Dashboard,
});

const statusStyles: Record<ConsultationStatus, string> = {
  New: "bg-info/10 text-info border-info/20",
  Reviewing: "bg-warn/15 text-warn-foreground border-warn/30",
  Drafting: "bg-primary/10 text-primary border-primary/20",
  Submitted: "bg-ok/10 text-ok border-ok/20",
};

function Dashboard() {
  const { consultations } = useConsultations();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ConsultationStatus | "All">("All");

  const rows = useMemo(() => {
    return consultations
      .filter((c) =>
        (statusFilter === "All" || c.status === statusFilter) &&
        (query === "" ||
          c.pupilRef.toLowerCase().includes(query.toLowerCase()) ||
          c.localAuthority.toLowerCase().includes(query.toLowerCase())),
      )
      .slice()
      .sort((a, b) => a.deadlineWorkingDays - b.deadlineWorkingDays);
  }, [consultations, query, statusFilter]);

  const urgentCount = consultations.filter((c) => c.status !== "Submitted" && c.deadlineWorkingDays <= 2).length;
  const openCount = consultations.filter((c) => c.status !== "Submitted").length;
  const submittedCount = consultations.filter((c) => c.status === "Submitted").length;

  return (
    <AppShell breadcrumbs={[{ label: "Dashboard" }]}>
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Consultations</h1>
          <p className="text-sm text-muted-foreground mt-1">
            EHC needs assessments awaiting your school's response.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard icon={<AlertTriangle className="h-4 w-4" />} tone="urgent" label="Due within 2 working days" value={urgentCount} />
          <StatCard icon={<Clock className="h-4 w-4" />} tone="info" label="Open consultations" value={openCount} />
          <StatCard icon={<CheckCircle2 className="h-4 w-4" />} tone="ok" label="Submitted this term" value={submittedCount} />
        </div>

        <div className="bg-surface border rounded-lg overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-b bg-muted/30">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pupil or local authority"
                className="w-full h-9 pl-9 pr-3 rounded-md border bg-surface text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div className="flex gap-1">
              {(["All", "New", "Reviewing", "Drafting", "Submitted"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 h-9 rounded-md text-xs font-medium border transition-colors ${
                    statusFilter === s
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-surface text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground bg-muted/20">
                <th className="px-4 py-3 font-medium">Pupil</th>
                <th className="px-4 py-3 font-medium">Local authority</th>
                <th className="px-4 py-3 font-medium">Received</th>
                <th className="px-4 py-3 font-medium">
                  <span className="inline-flex items-center gap-1">
                    Deadline <ArrowUpDown className="h-3 w-3" />
                  </span>
                </th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => {
                const tone = deadlineTone(c.deadlineWorkingDays);
                const isSubmitted = c.status === "Submitted";
                return (
                  <tr key={c.id} className="border-t hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-4">
                      <div className="font-medium">{c.pupilRef}</div>
                      <div className="text-xs text-muted-foreground">{c.yearGroup}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div>{c.localAuthority}</div>
                      <div className="text-xs text-muted-foreground">Case officer: {c.caseOfficer}</div>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">{formatDate(c.receivedOn)}</td>
                    <td className="px-4 py-4">
                      {isSubmitted ? (
                        <span className="text-muted-foreground text-xs">Response submitted</span>
                      ) : (
                        <DeadlinePill days={c.deadlineWorkingDays} tone={tone} />
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full border text-xs font-medium ${statusStyles[c.status]}`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Link
                        to="/consultations/$id"
                        params={{ id: c.id }}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Open →
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground text-sm">
                    No consultations match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}

function StatCard({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: number; tone: "urgent" | "info" | "ok" }) {
  const toneMap = {
    urgent: "bg-urgent/10 text-urgent border-urgent/20",
    info: "bg-info/10 text-info border-info/20",
    ok: "bg-ok/10 text-ok border-ok/20",
  };
  return (
    <div className="bg-surface border rounded-lg p-4 flex items-center gap-4">
      <div className={`h-10 w-10 rounded-md grid place-items-center border ${toneMap[tone]}`}>{icon}</div>
      <div>
        <div className="text-2xl font-semibold leading-none">{value}</div>
        <div className="text-xs text-muted-foreground mt-1">{label}</div>
      </div>
    </div>
  );
}

function DeadlinePill({ days, tone }: { days: number; tone: "urgent" | "warn" | "ok" }) {
  const styles = {
    urgent: "bg-urgent text-urgent-foreground",
    warn: "bg-warn text-warn-foreground",
    ok: "bg-ok/15 text-ok border border-ok/30",
  }[tone];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${styles}`}>
      {tone === "urgent" && <AlertTriangle className="h-3 w-3" />}
      {days} working day{days === 1 ? "" : "s"}
    </span>
  );
}
