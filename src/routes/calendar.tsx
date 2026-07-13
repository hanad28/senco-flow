import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import {
  useConsultations,
  deadlineTone,
  type Consultation,
} from "@/lib/consultations-store";
import {
  calendarDeadlineDate,
  calendarDaysRemaining,
} from "@/lib/working-days";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar — EHCP Response" },
      {
        name: "description",
        content:
          "Chronological view of every open consultation's 15-day statutory deadline.",
      },
    ],
  }),
  component: CalendarPage,
});

// Fixed "today" for the prototype to match the rest of the app.
const TODAY = new Date(2026, 6, 12); // 12 July 2026

type Tone = "urgent" | "warn" | "ok";

const toneCellStyles: Record<Tone, string> = {
  urgent: "bg-urgent text-urgent-foreground hover:bg-urgent/90",
  warn: "bg-warn text-warn-foreground hover:bg-warn/90",
  ok: "bg-ok/15 text-ok border border-ok/30 hover:bg-ok/25",
};

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function isoKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function deadlineLabel(days: number) {
  if (days < 0)
    return `Overdue by ${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"}`;
  if (days === 0) return "Due today";
  return `${days} day${days === 1 ? "" : "s"}`;
}

type Entry = {
  consultation: Consultation;
  daysLeft: number;
  tone: Tone;
};

function CalendarPage() {
  const { consultations } = useConsultations();
  const [cursor, setCursor] = useState<Date>(startOfMonth(TODAY));
  const [showSubmitted, setShowSubmitted] = useState(false);

  const entriesByDay = useMemo(() => {
    const map = new Map<string, Entry[]>();
    for (const c of consultations) {
      if (!showSubmitted && c.status === "Submitted") continue;
      const dl = calendarDeadlineDate(c.receivedOn);
      const key = isoKey(dl);
      const daysLeft = calendarDaysRemaining(c.receivedOn, TODAY);
      const entry: Entry = { consultation: c, daysLeft, tone: deadlineTone(daysLeft) };
      const arr = map.get(key) ?? [];
      arr.push(entry);
      map.set(key, arr);
    }
    return map;
  }, [consultations, showSubmitted]);

  // Build a 6x7 grid starting on the Monday on/before the 1st of the month.
  const monthStart = startOfMonth(cursor);
  const gridStart = new Map<number, number>(); // unused, placeholder
  gridStart.clear();
  const firstDow = monthStart.getDay(); // 0=Sun … 6=Sat
  const offsetToMonday = (firstDow + 6) % 7; // days back to Monday
  const cells: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(monthStart);
    d.setDate(monthStart.getDate() - offsetToMonday + i);
    cells.push(d);
  }

  const monthLabel = cursor.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  return (
    <AppShell breadcrumbs={[{ label: "Calendar" }]}>
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Calendar</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Every open consultation's 15-day statutory deadline, by month.
            </p>
          </div>
          <label className="inline-flex items-center gap-2 text-sm bg-surface border rounded-md px-3 h-9">
            <input
              type="checkbox"
              className="h-4 w-4 accent-primary"
              checked={showSubmitted}
              onChange={(e) => setShowSubmitted(e.target.checked)}
            />
            Show submitted consultations
          </label>
        </div>

        <div className="bg-surface border rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCursor((c) => addMonths(c, -1))}
                className="h-8 w-8 grid place-items-center rounded-md border hover:bg-accent"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCursor((c) => addMonths(c, 1))}
                className="h-8 w-8 grid place-items-center rounded-md border hover:bg-accent"
                aria-label="Next month"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="text-sm font-semibold ml-2">{monthLabel}</div>
            </div>
            <button
              onClick={() => setCursor(startOfMonth(TODAY))}
              className="text-xs font-medium text-primary hover:underline"
            >
              Jump to today
            </button>
          </div>

          <div className="grid grid-cols-7 text-[11px] uppercase tracking-wide text-muted-foreground border-b bg-muted/20">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className="px-2 py-2 text-center">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 grid-rows-6">
            {cells.map((day, i) => {
              const inMonth = day.getMonth() === cursor.getMonth();
              const isToday = isSameDay(day, TODAY);
              const entries = entriesByDay.get(isoKey(day)) ?? [];
              const isWeekend = day.getDay() === 0 || day.getDay() === 6;
              return (
                <div
                  key={i}
                  className={`min-h-[110px] border-b border-r p-1.5 flex flex-col gap-1 ${
                    inMonth ? "bg-surface" : "bg-muted/20"
                  } ${(i + 1) % 7 === 0 ? "border-r-0" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-medium h-5 min-w-5 px-1.5 rounded grid place-items-center ${
                        isToday
                          ? "bg-primary text-primary-foreground"
                          : inMonth
                            ? isWeekend
                              ? "text-muted-foreground"
                              : "text-foreground"
                            : "text-muted-foreground/60"
                      }`}
                    >
                      {day.getDate()}
                    </span>
                  </div>
                  {entries.map((e) => {
                    const submittedShort = e.consultation.submittedOn
                      ? new Date(e.consultation.submittedOn).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                        })
                      : null;
                    const deadlineShort = calendarDeadlineDate(
                      e.consultation.receivedOn,
                    ).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
                    return (
                      <Link
                        key={e.consultation.id}
                        to="/consultations/$id"
                        params={{ id: e.consultation.id }}
                        className={`block rounded-md px-2 py-1 text-[11px] leading-tight transition-colors ${
                          e.consultation.status === "Submitted"
                            ? "bg-muted text-muted-foreground border hover:bg-muted/80"
                            : toneCellStyles[e.tone]
                        }`}
                        title={
                          e.consultation.status === "Submitted" && submittedShort
                            ? `${e.consultation.pupilRef} — ${e.consultation.localAuthority} · Deadline ${deadlineShort}, submitted ${submittedShort}`
                            : `${e.consultation.pupilRef} — ${e.consultation.localAuthority}`
                        }
                      >
                        <div className="font-semibold truncate">
                          {e.consultation.pupilRef}
                        </div>
                        <div className="truncate opacity-90">
                          {e.consultation.localAuthority}
                        </div>
                        <div className="flex items-center gap-1 mt-0.5 font-medium">
                          {e.tone === "urgent" && e.consultation.status !== "Submitted" && (
                            <AlertTriangle className="h-2.5 w-2.5 shrink-0" />
                          )}
                          <span className="truncate">
                            {e.consultation.status === "Submitted"
                              ? submittedShort
                                ? `Submitted ${submittedShort}`
                                : "Submitted"
                              : deadlineLabel(e.daysLeft)}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Legend:</span>
          <LegendSwatch className="bg-urgent" label="Overdue / due within 2 days" />
          <LegendSwatch className="bg-warn" label="Due within 3–5 days" />
          <LegendSwatch className="bg-ok/25 border border-ok/40" label="6+ days" />
          <LegendSwatch className="bg-muted border" label="Submitted" />
        </div>
      </div>
    </AppShell>
  );
}

function LegendSwatch({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-3 w-3 rounded-sm ${className}`} />
      {label}
    </span>
  );
}
