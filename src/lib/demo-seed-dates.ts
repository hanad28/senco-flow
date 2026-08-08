/** Calendar helpers for demo seed payloads — always relative to "today". */

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function startOfLocalDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function toIsoDateLocal(d: Date): string {
  const x = startOfLocalDay(d);
  const y = x.getFullYear();
  const m = String(x.getMonth() + 1).padStart(2, "0");
  const day = String(x.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** ISO date `offsetDays` from today (negative = past). */
export function isoDaysFromToday(offsetDays: number, today: Date = new Date()): string {
  const d = startOfLocalDay(today);
  d.setDate(d.getDate() + offsetDays);
  return toIsoDateLocal(d);
}

/**
 * `receivedOn` such that calendarDaysRemaining ≈ daysLeft
 * (deadline = receivedOn + 15 calendar days).
 */
export function receivedOnForDaysRemaining(daysLeft: number, today: Date = new Date()): string {
  return isoDaysFromToday(daysLeft - 15, today);
}

export function calendarDaysRemainingFrom(receivedOnIso: string, today: Date = new Date()): number {
  const [y, m, d] = receivedOnIso.split("-").map(Number);
  const deadline = new Date(y, (m ?? 1) - 1, (d ?? 1) + 15);
  return Math.round((deadline.getTime() - startOfLocalDay(today).getTime()) / MS_PER_DAY);
}

/** Open-caseload mix for the school demo dashboard. */
export const DEMO_OPEN_DAYS_LEFT = {
  "c-2401": 12, // plenty of time
  "c-2402": 7, // mid-window
  "c-2403": 14, // plenty of time
  "c-2404": 2, // urgent
} as const;

/** Family draft response window — mid-window (~7 days left). */
export const DEMO_FAMILY_DAYS_LEFT = 7;
