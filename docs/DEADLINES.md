# Deadline calculation

Deadline calculation is calendar-day based.

The statutory response window is **15 calendar days** from receipt (day 1 = the day after receipt; the received day itself doesn't count). Weekends and bank holidays count toward the total and are **not** excluded.

The working-day helpers (`addWorkingDays`, `workingDaysBetween`, `workingDaysRemaining`) and the 2026 England & Wales bank holiday list remain in `src/lib/working-days.ts` for possible future use, but are intentionally not consumed by the deadline calculation. All deadline UI (Dashboard, Consultation detail, Calendar, Review & Submit) reads from `calendarDaysRemaining` / `calendarDeadlineDate`, which are pure calendar-day arithmetic off each consultation's `receivedOn`.

Family workspace uses the same rule via `familyDeadlineIso` / `familyDaysRemaining` in `src/lib/family-config.ts`.

The seeded `deadlineWorkingDays` field on consultations has been removed — the deadline is derived dynamically from `receivedOn` at render time.
