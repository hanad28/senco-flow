// Working-day helpers. Excludes weekends (Sat/Sun). Bank holidays are out of
// scope for the prototype.

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function isWeekend(d: Date): boolean {
  const day = d.getDay();
  return day === 0 || day === 6;
}

/** Add N working days to an ISO date, returning a Date at 00:00 local. */
export function addWorkingDays(fromIso: string, n: number): Date {
  const d = startOfDay(new Date(fromIso));
  let added = 0;
  while (added < n) {
    d.setTime(d.getTime() + MS_PER_DAY);
    if (!isWeekend(d)) added += 1;
  }
  return d;
}

/**
 * Working days from `from` up to and including `to`. If `to` is in the past,
 * returns a negative number (overdue). If `to` is today, returns 0.
 */
export function workingDaysBetween(from: Date, to: Date): number {
  const a = startOfDay(from);
  const b = startOfDay(to);
  if (a.getTime() === b.getTime()) return 0;
  const sign = b > a ? 1 : -1;
  let count = 0;
  const cursor = new Date(a);
  while (cursor.getTime() !== b.getTime()) {
    cursor.setTime(cursor.getTime() + sign * MS_PER_DAY);
    if (!isWeekend(cursor)) count += sign;
  }
  return count;
}

/**
 * Remaining working days until the statutory 15-working-day deadline
 * measured from `receivedOnIso`. Positive = days left, 0 = due today,
 * negative = overdue.
 */
export function workingDaysRemaining(receivedOnIso: string, today: Date = new Date()): number {
  const deadline = addWorkingDays(receivedOnIso, 15);
  return workingDaysBetween(startOfDay(today), deadline);
}
