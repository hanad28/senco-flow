import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import {
  useConsultations,
  isThisTerm,
  TERM_START_ISO,
  type Consultation,
  type NeedCapability,
} from "@/lib/consultations-store";
import {
  useSchoolProfile,
  domainLabel,
  domainOrder,
  type NeedDomain,
} from "@/lib/school-profile-store";
import { calendarDeadlineDate } from "@/lib/working-days";
import { CheckCircle2, Percent, Info } from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — EHCP Response" },
      {
        name: "description",
        content:
          "Aggregate response history, outcomes, and school-level SEND reporting for governor packs and LA moderation meetings.",
      },
    ],
  }),
  component: ReportsPage,
});

type TermFilter = "term" | "all";

function isOnTime(c: Consultation): boolean | null {
  if (!c.submittedOn) return null;
  const deadline = calendarDeadlineDate(c.receivedOn);
  const submitted = new Date(c.submittedOn);
  submitted.setHours(0, 0, 0, 0);
  return submitted.getTime() <= deadline.getTime();
}

function ReportsPage() {
  const { consultations } = useConsultations();
  const { profile } = useSchoolProfile();
  const [term, setTerm] = useState<TermFilter>("term");

  const submitted = useMemo(
    () => consultations.filter((c) => c.status === "Submitted" && c.submittedOn),
    [consultations],
  );

  const scoped = useMemo(
    () => (term === "term" ? submitted.filter((c) => isThisTerm(c.submittedOn!)) : submitted),
    [submitted, term],
  );

  // ---------- Headline stats ----------
  const scopedNeeds = scoped.flatMap((c) => c.needs);
  const totalNeeds = scopedNeeds.length;
  const fullNeeds = scopedNeeds.filter((n) => n.capability === "full").length;
  const partNeeds = scopedNeeds.filter((n) => n.capability === "partial").length;
  const matchedRate = totalNeeds === 0 ? 0 : Math.round((fullNeeds / totalNeeds) * 100);
  const matchedOrPartialRate =
    totalNeeds === 0 ? 0 : Math.round(((fullNeeds + partNeeds) / totalNeeds) * 100);

  const onTimeFlags = scoped.map(isOnTime).filter((v): v is boolean => v !== null);
  const onTimeRate =
    onTimeFlags.length === 0
      ? 0
      : Math.round((onTimeFlags.filter(Boolean).length / onTimeFlags.length) * 100);

  // ---------- LA breakdown ----------
  const laRows = useMemo(() => {
    const map = new Map<string, { la: string; total: number; onTime: number }>();
    for (const c of scoped) {
      const row = map.get(c.localAuthority) ?? { la: c.localAuthority, total: 0, onTime: 0 };
      row.total += 1;
      if (isOnTime(c)) row.onTime += 1;
      map.set(c.localAuthority, row);
    }
    return [...map.values()].sort((a, b) => b.total - a.total);
  }, [scoped]);

  // ---------- Needs met by domain ----------
  const domainRows = useMemo(() => {
    return domainOrder.map((d) => {
      const items = scopedNeeds.filter((n) => n.domain === d);
      const full = items.filter((n) => n.capability === "full").length;
      const partial = items.filter((n) => n.capability === "partial").length;
      const cannot = items.filter((n) => n.capability === "cannot").length;
      return { domain: d, total: items.length, full, partial, cannot };
    });
  }, [scopedNeeds]);

  // ---------- Workload over time (full range, month buckets) ----------
  const monthBuckets = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of consultations) {
      const d = new Date(c.receivedOn);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    const keys = [...map.keys()].sort();
    if (keys.length === 0) return [] as { key: string; label: string; count: number }[];
    // Fill any missing months between min and max for a continuous trend.
    const [minY, minM] = keys[0].split("-").map(Number);
    const [maxY, maxM] = keys[keys.length - 1].split("-").map(Number);
    const out: { key: string; label: string; count: number }[] = [];
    let y = minY, m = minM;
    while (y < maxY || (y === maxY && m <= maxM)) {
      const key = `${y}-${String(m).padStart(2, "0")}`;
      const label = new Date(y, m - 1, 1).toLocaleDateString("en-GB", {
        month: "short",
        year: "2-digit",
      });
      out.push({ key, label, count: map.get(key) ?? 0 });
      m += 1;
      if (m > 12) { m = 1; y += 1; }
    }
    return out;
  }, [consultations]);
  const workloadMax = Math.max(1, ...monthBuckets.map((b) => b.count));

  // ---------- Capacity gaps ----------
  const capacityRows = useMemo(() => {
    return domainOrder.map((d) => {
      // Incoming = needs across ALL consultations (open + submitted) in this domain.
      const incoming = consultations.flatMap((c) => c.needs).filter((n) => n.domain === d);
      const submittedIncoming = consultations
        .filter((c) => c.status === "Submitted")
        .flatMap((c) => c.needs)
        .filter((n) => n.domain === d).length;
      const openIncoming = incoming.length - submittedIncoming;
      const cannot = incoming.filter((n) => n.capability === "cannot").length;
      const partial = incoming.filter((n) => n.capability === "partial").length;
      const baseline = profile.cohort[d] ?? 0;
      const gapRatio = incoming.length === 0 ? 0 : (cannot + partial) / incoming.length;
      let flag: "high" | "medium" | "low" = "low";
      if (gapRatio >= 0.5) flag = "high";
      else if (gapRatio >= 0.25) flag = "medium";
      return {
        domain: d,
        baseline,
        incoming: incoming.length,
        submittedIncoming,
        openIncoming,
        cannot,
        partial,
        gapRatio,
        flag,
      };
    });
  }, [consultations, profile.cohort]);

  const termLabel = term === "term" ? "This term" : "All time";
  const termStart = new Date(TERM_START_ISO).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <AppShell breadcrumbs={[{ label: "Reports" }]}>
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              Aggregate response history, outcomes, and school-level SEND reporting —
              useful for governor packs and LA moderation meetings.
            </p>
          </div>
          <div className="inline-flex rounded-md border bg-surface p-0.5 text-xs font-medium">
            {(["term", "all"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTerm(t)}
                className={`px-3 h-8 rounded-[5px] transition-colors ${
                  term === t
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "term" ? "This term" : "All time"}
              </button>
            ))}
          </div>
        </div>

        {term === "term" && (
          <p className="-mt-4 text-xs text-muted-foreground">
            This term = submissions on or after {termStart}. The workload trend below
            always shows the full seeded range.
          </p>
        )}

        {/* Headline stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            tone="ok"
            icon={<CheckCircle2 className="h-4 w-4" />}
            label={`Needs matched in full (${termLabel})`}
            value={`${matchedRate}%`}
            sub={`${fullNeeds} of ${totalNeeds} needs — a further ${partNeeds} met in part (${matchedOrPartialRate}% full or partial)`}
          />
          <StatCard
            tone="info"
            icon={<Percent className="h-4 w-4" />}
            label={`On-time response rate (${termLabel})`}
            value={`${onTimeRate}%`}
            sub={`${onTimeFlags.filter(Boolean).length} of ${onTimeFlags.length} responses submitted within the statutory 15-day window`}
          />
          <StatCard
            tone="info"
            icon={<Info className="h-4 w-4" />}
            label={`Responses submitted (${termLabel})`}
            value={`${scoped.length}`}
            sub={`${scoped.length} consultations closed in scope`}
          />
        </div>

        {/* LA breakdown */}
        <Section
          title="By local authority"
          subtitle={`Volume and on-time rate per LA — ${termLabel.toLowerCase()}.`}
        >
          {laRows.length === 0 ? (
            <EmptyState label="No submitted responses in scope." />
          ) : (
            <div className="overflow-hidden rounded-lg border bg-surface">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground bg-muted/20">
                    <th className="px-4 py-3 font-medium">Local authority</th>
                    <th className="px-4 py-3 font-medium">Responses</th>
                    <th className="px-4 py-3 font-medium">On time</th>
                    <th className="px-4 py-3 font-medium">On-time rate</th>
                  </tr>
                </thead>
                <tbody>
                  {laRows.map((r) => {
                    const rate = Math.round((r.onTime / r.total) * 100);
                    return (
                      <tr key={r.la} className="border-t">
                        <td className="px-4 py-3 font-medium">{r.la}</td>
                        <td className="px-4 py-3 text-muted-foreground">{r.total}</td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {r.onTime} / {r.total}
                        </td>
                        <td className="px-4 py-3">
                          <RateBar percent={rate} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Section>

        {/* Needs met by domain */}
        <Section
          title="Needs (Section B) met by provision offered (Section F)"
          subtitle={`Full / part / cannot split per statutory domain — ${termLabel.toLowerCase()}, submitted responses only.`}
        >
          <p className="text-xs text-muted-foreground mb-3">
            Note: needs often span more than one domain — they have been assigned to a
            primary domain for reporting.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {domainRows.map((r) => (
              <div key={r.domain} className="bg-surface border rounded-lg p-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-medium text-sm">{domainLabel[r.domain]}</h3>
                  <span className="text-xs text-muted-foreground">{r.total} need{r.total === 1 ? "" : "s"}</span>
                </div>
                <div className="mt-3">
                  <SplitBar full={r.full} partial={r.partial} cannot={r.cannot} />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                  <SplitTag tone="ok" label="Full" count={r.full} total={r.total} />
                  <SplitTag tone="warn" label="Part" count={r.partial} total={r.total} />
                  <SplitTag tone="urgent" label="Cannot" count={r.cannot} total={r.total} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Workload over time */}
        <Section
          title="Workload over time"
          subtitle="Consultations received per month across the full seeded range (not affected by the term filter)."
        >
          <div className="bg-surface border rounded-lg p-4">
            {monthBuckets.length === 0 ? (
              <EmptyState label="No consultation history yet." />
            ) : (
              <div className="flex items-end gap-2 h-40">
                {monthBuckets.map((b) => (
                  <div key={b.key} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                    <div
                      className="w-full rounded-t bg-primary/70"
                      style={{ height: `${(b.count / workloadMax) * 100}%` }}
                      title={`${b.label}: ${b.count} received`}
                    />
                    <div className="text-[10px] text-muted-foreground truncate w-full text-center">
                      {b.label}
                    </div>
                    <div className="text-[10px] font-medium">{b.count}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Section>

        {/* Capacity gaps */}
        <Section
          title="Capacity gaps"
          subtitle="Where 'cannot meet' and 'can meet in part' cluster, compared with the school's current cohort baseline (from Settings)."
        >
          <p className="text-xs text-muted-foreground mb-3">
            Uses all consultations (open + submitted), not the term filter, to reflect
            live demand against capacity.
          </p>
          <div className="overflow-hidden rounded-lg border bg-surface">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground bg-muted/20">
                  <th className="px-4 py-3 font-medium">Domain</th>
                  <th className="px-4 py-3 font-medium">Cohort baseline</th>
                  <th className="px-4 py-3 font-medium">Needs in flight (open + submitted)</th>
                  <th className="px-4 py-3 font-medium">Part / cannot</th>
                  <th className="px-4 py-3 font-medium">Signal</th>
                </tr>
              </thead>
              <tbody>
                {capacityRows.map((r) => (
                  <tr key={r.domain} className="border-t">
                    <td className="px-4 py-3 font-medium">{domainLabel[r.domain]}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.baseline} pupils</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {r.incoming} ({r.submittedIncoming} submitted + {r.openIncoming} open)
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {r.partial + r.cannot} of {r.incoming}{" "}
                      {r.incoming > 0 && (
                        <span className="text-xs">
                          ({Math.round(r.gapRatio * 100)}%)
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <FlagPill flag={r.flag} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </AppShell>
  );
}

// ---------- Small building blocks ----------

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-base font-semibold tracking-tight">{title}</h2>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  tone: "ok" | "info";
}) {
  const toneMap = {
    ok: "bg-ok/10 text-ok border-ok/20",
    info: "bg-info/10 text-info border-info/20",
  };
  return (
    <div className="bg-surface border rounded-lg p-4 flex items-start gap-4">
      <div className={`h-10 w-10 rounded-md grid place-items-center border shrink-0 ${toneMap[tone]}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-2xl font-semibold leading-none">{value}</div>
        <div className="text-xs text-muted-foreground mt-1">{label}</div>
        <div className="text-[11px] text-muted-foreground/80 mt-1.5 leading-snug">{sub}</div>
      </div>
    </div>
  );
}

function RateBar({ percent }: { percent: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full ${percent >= 80 ? "bg-ok" : percent >= 60 ? "bg-warn" : "bg-urgent"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs font-medium tabular-nums w-10 text-right">{percent}%</span>
    </div>
  );
}

function SplitBar({ full, partial, cannot }: { full: number; partial: number; cannot: number }) {
  const total = full + partial + cannot;
  if (total === 0) {
    return <div className="h-2 rounded-full bg-muted" />;
  }
  const pct = (n: number) => `${(n / total) * 100}%`;
  return (
    <div className="flex h-2 rounded-full overflow-hidden bg-muted">
      <div className="bg-ok" style={{ width: pct(full) }} />
      <div className="bg-warn" style={{ width: pct(partial) }} />
      <div className="bg-urgent" style={{ width: pct(cannot) }} />
    </div>
  );
}

function SplitTag({
  tone,
  label,
  count,
  total,
}: {
  tone: "ok" | "warn" | "urgent";
  label: string;
  count: number;
  total: number;
}) {
  const toneMap = {
    ok: "bg-ok/10 text-ok",
    warn: "bg-warn/15 text-warn-foreground",
    urgent: "bg-urgent/10 text-urgent",
  };
  const pct = total === 0 ? 0 : Math.round((count / total) * 100);
  return (
    <div className={`rounded px-2 py-1 flex items-center justify-between ${toneMap[tone]}`}>
      <span className="font-medium">{label}</span>
      <span className="tabular-nums">{count} · {pct}%</span>
    </div>
  );
}

function FlagPill({ flag }: { flag: "high" | "medium" | "low" }) {
  const map = {
    high: { label: "High gap", cls: "bg-urgent/10 text-urgent border-urgent/20" },
    medium: { label: "Some gap", cls: "bg-warn/15 text-warn-foreground border-warn/30" },
    low: { label: "Meeting demand", cls: "bg-ok/10 text-ok border-ok/20" },
  };
  const it = map[flag];
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full border text-xs font-medium ${it.cls}`}>
      {it.label}
    </span>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="bg-surface border rounded-lg p-8 text-center text-sm text-muted-foreground">
      {label}
    </div>
  );
}

// Suppress unused-import warnings for types re-exported for readability.
export type { NeedCapability, NeedDomain };
