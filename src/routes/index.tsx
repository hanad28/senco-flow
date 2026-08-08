import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { resolveHostMode } from "@/lib/hostname";
import { useConsultations, formatDate, deadlineTone, isThisTerm, type ConsultationStatus } from "@/lib/consultations-store";
import { marketingPageHead, appNoIndexHead } from "@/lib/seo";
import { pageTitle, SITE_DESCRIPTION, SITE_HOME_TITLE } from "@/lib/site";
import { calendarDaysRemaining } from "@/lib/working-days";
import { Search, ArrowUpDown, ArrowUp, ArrowDown, AlertTriangle, Clock, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

const DASHBOARD_TITLE = pageTitle("Dashboard");
const PAGE_SIZE = 10;

// AppShell pulls the app-shell/search-store chunks; lazy so marketing visits
// (which render LandingPage, not Dashboard) never preload them.
const AppShell = lazy(() =>
  import("@/components/app-shell").then((m) => ({ default: m.AppShell })),
);

function getPageItems(current: number, total: number): (number | "ellipsis-left" | "ellipsis-right")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items: (number | "ellipsis-left" | "ellipsis-right")[] = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  if (left > 2) items.push("ellipsis-left");
  for (let i = left; i <= right; i++) items.push(i);
  if (right < total - 1) items.push("ellipsis-right");
  items.push(total);
  return items;
}

export const Route = createFileRoute("/")({
  head: () => {
    // Marketing host renders the landing page on `/`; keep the tab title aligned.
    if (resolveHostMode() === "marketing") {
      return marketingPageHead({
        title: SITE_HOME_TITLE,
        description: SITE_DESCRIPTION,
        path: "/",
        absoluteTitle: true,
      });
    }
    return appNoIndexHead(
      "Dashboard",
      "All incoming EHC needs assessment consultations, sorted by deadline.",
    );
  },
  component: Dashboard,
});

const statusStyles: Record<ConsultationStatus, string> = {
  New: "bg-info/10 text-info border-info/20",
  Reviewing: "bg-warn/15 text-warn-foreground border-warn/30",
  Drafting: "bg-primary/10 text-primary border-primary/20",
  Submitted: "bg-ok/10 text-ok border-ok/20",
};

type SortKey = "pupilRef" | "localAuthority" | "receivedOn" | "daysLeft" | "status";
type SortDir = "asc" | "desc";

function SortHeader({
  label,
  sortKey,
  activeKey,
  dir,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  activeKey: SortKey;
  dir: SortDir;
  onSort: (key: SortKey) => void;
}) {
  const active = sortKey === activeKey;
  const Icon = active ? (dir === "asc" ? ArrowUp : ArrowDown) : ArrowUpDown;
  return (
    <th className="px-4 py-3 font-medium">
      <button
        onClick={() => onSort(sortKey)}
        className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
      >
        {label} <Icon className="h-3 w-3" />
      </button>
    </th>
  );
}

function Dashboard() {
  const { consultations } = useConsultations();
  const [statusFilter, setStatusFilter] = useState<ConsultationStatus | "All" | "Open">("Open");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("daysLeft");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  useEffect(() => {
    document.title = DASHBOARD_TITLE;
  }, []);

  const withDeadlines = useMemo(
    () => consultations.map((c) => ({ ...c, daysLeft: calendarDaysRemaining(c.receivedOn) })),
    [consultations],
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return withDeadlines
      .filter((c) =>
        statusFilter === "All" ||
        (statusFilter === "Open" ? c.status !== "Submitted" : c.status === statusFilter),
      )
      .filter((c) => {
        if (!q) return true;
        return (
          c.pupilRef.toLowerCase().includes(q) ||
          c.localAuthority.toLowerCase().includes(q) ||
          c.caseOfficer.toLowerCase().includes(q) ||
          c.yearGroup.toLowerCase().includes(q) ||
          c.status.toLowerCase().includes(q)
        );
      })
      .slice()
      .sort((a, b) => {
        const dir = sortDir === "asc" ? 1 : -1;
        let comparison = 0;
        if (sortKey === "pupilRef") {
          comparison = a.pupilRef.localeCompare(b.pupilRef);
        } else if (sortKey === "localAuthority") {
          comparison = a.localAuthority.localeCompare(b.localAuthority);
        } else if (sortKey === "receivedOn") {
          comparison = new Date(a.receivedOn).getTime() - new Date(b.receivedOn).getTime();
        } else if (sortKey === "daysLeft") {
          comparison = a.daysLeft - b.daysLeft;
        } else if (sortKey === "status") {
          comparison = a.status.localeCompare(b.status);
        }
        return comparison * dir;
      });
  }, [withDeadlines, statusFilter, query, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const [page, setPage] = useState(1);
  useEffect(() => {
    setPage(1);
  }, [statusFilter, query]);
  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = useMemo(
    () => rows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [rows, currentPage],
  );
  const pageItems = getPageItems(currentPage, totalPages);
  const rangeStart = rows.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, rows.length);

  const urgentCount = withDeadlines.filter((c) => c.status !== "Submitted" && c.daysLeft <= 2).length;
  const openCount = withDeadlines.filter((c) => c.status !== "Submitted").length;
  const submittedCount = withDeadlines.filter(
    (c) => c.status === "Submitted" && c.submittedOn && isThisTerm(c.submittedOn),
  ).length;

  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">Loading…</div>}>
      <AppShell breadcrumbs={[{ label: "Dashboard" }]}>
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Consultations</h1>
          <p className="text-sm text-muted-foreground mt-1">
            EHC needs assessments awaiting your school's response.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard icon={<AlertTriangle className="h-4 w-4" />} tone="urgent" label="Due within 2 days" value={urgentCount} />
          <StatCard icon={<Clock className="h-4 w-4" />} tone="info" label="Open consultations" value={openCount} />
          <StatCard icon={<CheckCircle2 className="h-4 w-4" />} tone="ok" label="Submitted this term" value={submittedCount} />
        </div>

        <div className="bg-surface border rounded-lg overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-b bg-muted/30">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter by pupil, LA, case officer, year, status…"
                className="w-full h-9 pl-9 pr-3 rounded-md border bg-surface text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div className="flex gap-1">
              {(["Open", "New", "Reviewing", "Drafting", "Submitted", "All"] as const).map((s) => (
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
                <SortHeader label="Pupil" sortKey="pupilRef" activeKey={sortKey} dir={sortDir} onSort={handleSort} />
                <SortHeader label="Local authority" sortKey="localAuthority" activeKey={sortKey} dir={sortDir} onSort={handleSort} />
                <SortHeader label="Received" sortKey="receivedOn" activeKey={sortKey} dir={sortDir} onSort={handleSort} />
                <SortHeader label="Deadline" sortKey="daysLeft" activeKey={sortKey} dir={sortDir} onSort={handleSort} />
                <SortHeader label="Status" sortKey="status" activeKey={sortKey} dir={sortDir} onSort={handleSort} />
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {pageRows.map((c) => {
                const tone = deadlineTone(c.daysLeft);
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
                        <DeadlinePill days={c.daysLeft} tone={tone} />
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

          {rows.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t bg-muted/20 text-xs text-muted-foreground">
              <div>
                Showing <span className="font-medium text-foreground">{rangeStart}</span> to
                <span className="font-medium text-foreground">{rangeEnd}</span> of{" "}
                <span className="font-medium text-foreground">{rows.length}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="h-8 w-8 grid place-items-center rounded-md border bg-surface hover:bg-accent/60 disabled:opacity-40 disabled:pointer-events-none"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {pageItems.map((item, idx) =>
                  typeof item === "number" ? (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setPage(item)}
                      aria-current={item === currentPage ? "page" : undefined}
                      className={`h-8 min-w-8 px-2 rounded-md border text-xs font-medium transition-colors ${
                        item === currentPage
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-surface text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item}
                    </button>
                  ) : (
                    <span key={`${item}-${idx}`} className="h-8 px-1 grid place-items-center text-muted-foreground">
                      …
                    </span>
                  ),
                )}
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 grid place-items-center rounded-md border bg-surface hover:bg-accent/60 disabled:opacity-40 disabled:pointer-events-none"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      </AppShell>
    </Suspense>
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
  const label =
    days < 0
      ? `Overdue by ${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"}`
      : days === 0
        ? "Due today"
        : `${days} day${days === 1 ? "" : "s"}`;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${styles}`}>
      {tone === "urgent" && <AlertTriangle className="h-3 w-3" />}
      {label}
    </span>
  );
}
