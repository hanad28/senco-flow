# 🗺️ Roadmap & Known Issues — SENDCO

> Notion export — 2026-08-03. Source: child page of `Build Log`.
> Redactions applied: (1) named interview sources generalised to role descriptions, per the naming-consent rule already stated in `landing-page-spec.md`; (2) the exact endpoint path, exposed tool names, and specific auth-provider configuration steps for the unauthenticated-MCP-server item below have been removed pending confirmation the gate is closed — publishing exploitable specifics of a known-open issue in a public repo before it's fixed is a bad trade even though only fictional data sits behind it today. The full unredacted detail still lives in Notion for whoever is doing the fix. **Verify the endpoint returns 401 before treating this as historical.**

What's next to build, what's cut for speed and needs revisiting, and the future backlog. Current stack and architecture live in `buildlog.md`.

---

## Build sequencing — Prototype 2 (tabs & screens expansion)

*(Order to build in; each phase depends on the one before it. See `ship-log-sendco.md` for full reasoning per item.)*

**Phase 1 — Foundational + quick wins** *(cheap, touches existing screens only, do first)*

1. Active-state nav highlight bug fix
2. Sidebar restructure — drop Inbox/Submitted, add routed Templates/Calendar/Reports/Settings
3. Deadline countdown verification (live-computed vs. hardcoded) — load-bearing for Calendar/Notifications
4. Aggregate "needs matched" score on Needs/Draft screens
5. EHC section framing in copy (B/F/I, draft-vs-final nuance, domains-not-rigid-boxes caveat)
6. Section K-style relabeling of the existing "received documents" list

**Phase 2 — Settings / School Profile** *(source of truth — build before Templates/Evidence/Reports)*

Provision catalogue by domain, staffing/capacity, dynamic — feeds Templates and Reports.

**Phase 3 — Templates + Evidence library + Vagueness-flagging** *(paired — same mental model, same screen area)*

Templates (domain first, then outcome, pulling from Settings); Evidence library (searchable, pupil-agnostic document store); vagueness-flagging on Draft responses (IPSEA-sourced).

**Phase 4 — Calendar / Deadlines**

Full month grid, colour-coded by urgency, depends on Phase 1's live deadline fix.

**Phase 5 — Reports / Overview**

On-time/late rate, LA breakdown, needs met by domain, workload-over-time trend, capacity gaps — all sourced from Settings + consultation data, not separately mocked.

**Phase 6 — Cross-cutting layer** *(layer on once Phases 2–5 exist)*

Activity log/audit trail (embedded per consultation, not a tab), global search (extend existing dashboard search), notifications wiring (tied to deadline logic), sidebar collapse (lowest priority polish).

**Deliberately excluded from all phases, not forgotten:** Messaging/collaboration with LA case officers, the "Inefficient Education Test," SENCO Chat, Banding Analysis, and the full A–K EHC section set (belongs to the separate family-facing idea) — all logged above as Defer with reasoning.

---

## Known issues & debt

*(Log things cut for speed that need to be revisited)*

- ✅ **Resolved (4 Aug 2026) — MCP server auth confirmed fail-closed, verified independently twice.** The manifest's `.invalid` issuer is a build-time artifact from manifest generation running without env vars — production correctly inlines the real Clerk issuer via `VITE_CLERK_PUBLISHABLE_KEY`, confirmed live via `GET /.well-known/oauth-protected-resource` returning the real Clerk domain. The SDK's authorizer (`createTanStackMcpHandler` → `authorizer.authorize()`) runs before any tool is registered or invoked, verifying JWT signature, issuer, audience, subject, and expiry, and by default requiring an OAuth `client_id`/`azp` claim — an ordinary copied Clerk session token does not validate. The only fail-open path in the SDK requires `auth.type === "none"`; commit `21b1d08` closed that by adding real OAuth config, and every failure mode since (missing/malformed/non-JWT credentials) returns 401, confirmed directly against production. Verified two ways independently: full source/commit-history trace and live testing against production with deliberately invalid credentials.
- **New — no per-tool authorization scoping (logged 4 Aug 2026).** Authentication is solid, but any validly-issued OAuth token currently grants access to all five MCP tools — no role, organisation, user-ownership, or per-tool scope is enforced. Fine against fictional seed data; must be fixed before real Convex data is connected to these tools, not a current risk.
- "Statutory guidance" sidebar link — was decorative filler (plain `<div>`, no route, no href), not scaffolded to anything. Decision: turn it into a real external link to the SEND Code of Practice on gov.uk (DfE's *Special educational needs and disability code of practice: 0 to 25 years*), opening in a new tab — good idea worth keeping, not worth deleting.
- "Millbrook Primary" / SENCO S. Ahmed is placeholder data — be upfront it's fictional if demoing to a real school, don't let it be mistaken for an existing customer
- ✅ GitHub sync completed (11 Jul) — confirm `sendco-portal` placeholder repo was deleted / establish which repo is now the real synced one
- ✅ **Resolved (12 Jul) — calendar-day fix verified.** Deadlines across Dashboard, Consultation detail, Review & Submit, and Calendar now use 15 calendar days (not working days), computed dynamically from `receivedOn` via `calendarDaysRemaining()`. Verified by manual calculation against screenshots — all 4 open consultations matched exactly (Pupil D overdue by 9, Pupil C overdue by 3, Pupil B 3 remaining, Pupil A 4 remaining). Consultation detail banner now reads "Statutory 15-day response window (minimum)". Full sourcing in `domain-research.md`.
- **Product naming decision — working name adopted: Unisen** (26 Jul, chosen while drafting landing page copy — see `landing-page-spec.md`). Using this across landing page copy now; confirm with Iylana against her capped branding task before treating as fully locked.
- ✅ Settings/School Profile (Phase 2, 11 Jul): **resolved and verified** — sidebar now reads role/position live (matching how name already worked), and the letter preview now reads school name, address, SENDCO name and role live from the shared profile store. Provision catalogue/staffing persistence also confirmed working during a session and correctly resets on a full page refresh, as designed.
- ✅ Templates (Phase 3, 12 Jul): **resolved and verified** — "Insert from template" now appends with a paragraph separator instead of overwriting; attached evidence chips now have a detach/X button. Both confirmed working by direct testing.
- ✅ **Full Phases 1–5 recheck (13 Jul)** — requested specifically because Phase 5 alone had caught two rounds of real gaps on first pass; worth checking whether 1–4 were equally solid. Found and fixed: Consultation detail/Review & Submit calendar-day copy confirmed correct; column sort and the Statutory guidance link (correct gov.uk SEND Code of Practice page) confirmed working; **Calendar was plotting submitted consultations by deadline date, not actual submission date** — fixed to show the real submission date, deadline moved to a tooltip; historical consultations (Pupils F–O) showed a broken-looking "0 files — 0 pages" card — replaced with a "not retained" note; Dashboard's "All" default view contradicted its own "awaiting response" subtitle by including submitted history — now defaults to Open only, matching Calendar's pattern. Same-day-submission-counts-as-on-time logic confirmed correct in code (`<=` comparison) and a seed case (Pupil P) added so it's demonstrable in Reports, not just theoretically correct.
- ✅ **Interaction-level recheck (13 Jul)** — final pass specifically testing click-throughs and buttons that had only ever been visually confirmed, not actually used. All confirmed working directly by Hanad: Calendar entries navigate to consultation detail; Evidence tab search filters correctly; Reports' LA breakdown text is plain (not a dead/fake link — false alarm); Settings' "+ Add" buttons (provision catalogue, specialist staff) correctly add new rows. Also confirmed: empty placeholder `sendco-portal` GitHub repo was deleted. Decision: keep the unprompted case-officer names Lovable added early on — no functional risk either way, deliberate choice not an accident. Phases 1–5 fully closed out across build, visual, and interaction verification.
- ✅ Phase 6 (13 Jul) — all three verification gaps closed: Activity log confirmed via screenshot (Pupil A — absolute timestamps, correct chronological order, live SENDCO attribution, header explicitly states "Attributed to S. Ahmed"); global search's no-results state confirmed clean (explicitly names all three searched domains); Notifications dropdown click-through confirmed navigating to the correct consultation. Build is now verified end to end across all 6 phases — built, screenshotted, and interaction-tested, not just described as done.
- ✅ **Post-build additions (13 Jul)** — three further features, all confirmed working via direct testing: (1) Letter export — real .docx download + print stylesheet, confirmed opening correctly. (2) "Cannot meet" required rationale — Submit correctly disabled until rationale is filled, confirmed on Pupil C. (3) Template variable tokens (`{{pupil}}`/`{{year_group}}`/`{{LA}}`) — confirmed resolving to real values ("for Pupil A (Year 4)", "arranged by Camden LA") rather than literal placeholder text. Also fixed in passing: a pre-existing hydration mismatch on Activity log timestamps (now uses UTC consistently), re-verified against Pupil A's log with no regression.
- Minor, non-blocking: the "Insert from template" picker doesn't filter by the need's own domain — observed twice inserting a Communication and Interaction (SaLT-related) snippet onto Cognition/Learning and Social-communication needs. Not a bug, but worth considering scoping the picker to the current need's domain to reduce mismatched inserts in a live demo.
- Minor copy inconsistency: Consultation detail's banner says "Statutory 15-day response window (minimum)" reflecting the legal floor correctly; Calendar's subtitle and the Notifications dropdown's subtitle both omit "(minimum)". Low priority, one-line fix if wanted.
- ✅ **Resolved (21 Jul) — Calendar's hardcoded `TODAY` removed.** `calendar.tsx` no longer overrides `calendarDaysRemaining`'s live default; month/year picker and "Jump to today" now anchor to the real current date. Type-check passed. All four surfaces (Dashboard, Consultation detail, Calendar, Review & Submit) now genuinely compute deadlines live.
- ✅ **Resolved (21 Jul) — Review & Submit now shows a deadline/overdue banner**, matching Consultation detail, closing the consistency gap the audit flagged.
- **CONFIRMED (21 Jul, via GitHub source) — "Insert from template" picker genuinely does not filter by domain, confirming the issue above is still live, not fixed.** `Need` objects do carry a populated `domain` field (`src/lib/consultations-store.tsx`), but `TemplateInsertMenu` (`consultations.$id.draft.tsx`) is only ever passed `capability`, never the need's domain — its snippet list iterates over *all four* domains, filtered only by capability. The domain data exists but is never used to scope the picker. Cheap fix: pass `n.domain` into `TemplateInsertMenu` and filter `domainOrder` down to just that value.
- **CONFIRMED (21 Jul, via GitHub source) — Dashboard filters do not persist across navigation, confirming the backlog item is accurately "not yet built."** `statusFilter` and `query` in `src/routes/index.tsx` are plain component-local `useState`, with no URL search param, store, or localStorage backing — they reset to defaults (`"Open"`, `""`) on every remount, i.e. every time the route changes away from and back to Dashboard.
- **CONFIRMED (21 Jul, via GitHub source) — no autosave code exists anywhere in the codebase**, matching the backlog's "not yet built" claim.
- **CONFIRMED (21 Jul, via GitHub source) — Activity log has no filter UI or filter state of any kind** (`src/components/activity-log.tsx` just sorts all entries by timestamp and renders them), matching the backlog's "not yet built" claim.
- **Ownership split (21 Jul):** the 4 confirmed-open bug items above (template domain filtering, activity log filtering, draft autosave, Dashboard filter persistence) are Hanad's, via Lovable — all UI/state-only, no backend needed, same workflow as the Calendar/Submit fixes. Not on Devin/Cognition or Mikhail. Mikhail is focused solely on the two Tier 1 items below (real AI integration, real Supabase backend + auth).

---

## Future roadmap / backlog (not yet built)

*(Consolidated from team brainstorming + Lovable's own codebase review, 13 Jul 2026.)*

*(Cross-platform infrastructure gaps and Tier 1/2 items live in `buildlog.md`'s "Cross-platform decisions & principles" section.)*

### From stakeholder interviews (an interviewed SENCO/inclusion leader, 20 Jul 2026) — not scoped into Prototype 1/2, logged for later

1. **Report-to-classroom-guidance translator** — EP/SALT/OT reports are long and classroom staff often lack time or confidence to turn them into daily practical strategies. Distinct from the vagueness-flagging feature (which checks reports are specific enough for statutory purposes) — this is about turning an already-adequate report into usable teacher guidance. Needs care to support professional judgement rather than replace it.
2. **Reintegration/transition plan tracker** — when a pupil moves between mainstream, alternative provision, respite, specialist services, or a school phase, information (what's worked, known triggers, communication approaches, pupil voice, agreed responsibilities) gets lost. Came from the interview source's own role (respite, reintegration and secondary outreach) — high-credibility source. Would need its own validation before scoping — currently just a candidate, not assessed against the build window.

### Tier 3 — real polish, lower urgency

1. Mobile responsiveness (explicitly out of scope so far — sidebar collapse was for laptop screens only, not phones)
2. Loading skeleton states (currently everything appears instantly since it's mock data with no fetch delay — matters more once real AI/backend calls are added)
3. First-run/onboarding flow for a new school setting up Settings for the first time, including a guided empty-dashboard state for a fresh school with 0 consultations
4. "Reset demo data" button in Settings — cleaner than relying on a full browser refresh when demoing live to multiple SENDCOs

### Additional items from Lovable's own codebase review (13 Jul)

1. **Draft autosave + version history** — a visible "Saved Xs ago" indicator plus a lightweight in-session version list/restore. Reduces anxiety on what is a statutory document. Session-only without Supabase; full version history surviving a refresh needs real persistence.
2. **Evidence citation chips in the draft** — auto-cite which source document/page each provision response is drawing from, linking back to the received document. Tightens the audit trail, speeds up LA follow-ups.
3. **Bulk actions on Dashboard** — mark-reviewed and export-as-batch are buildable now; "assign to a colleague" is *not* — it implies a second real user, which doesn't exist until real auth/multi-user is built.
4. **Deadline reminders / email digest** ("3 due this week, 1 overdue"). *Blocked on a real email-sending service — not in the credits stack.*
5. **Keyboard shortcuts panel** — a discoverable `?` overlay (j/k to move dashboard rows, e to open, etc.) rewarding power users handling volume. Cmd+K already exists.
6. **Filters persist across navigation** — status pill/search state on Dashboard should survive navigating into a consultation and back.
7. **Trend-over-time sparkline on Reports** — on-time rate per month, answering "are we improving?" rather than only point-in-time stats.
8. **Per-LA breakdown enhancement** — the core breakdown (volume + on-time rate per LA) already exists on Reports; the new idea here is flagging which LAs most often send incomplete consultation packs — high-signal for SENCO advocacy.
9. **Time-to-respond distribution** — median days used out of 15, not just a bare on-time/late boolean.
10. **Activity log filtering** by action type or date range, once a consultation's activity trail grows long.
11. **"Your work isn't backed up" banner** — honest, cheap UI acknowledgement that everything is currently client-side only. Real fix is Supabase persistence (see Tier 1 in `buildlog.md`).
12. **Multi-user awareness** — activity is currently attributed to a single `sendcoName` from Settings; misleading the moment two real staff share the same login. *Blocked on real auth/multi-user, same as bulk-assign above.*
13. **"Insert from template" domain filtering** — already flagged above: the picker doesn't currently filter snippets to the current need's domain, observed twice inserting a mismatched-domain snippet live. Cheap fix, worth doing whenever Templates gets touched again.

**Deliberately still excluded, not forgotten:** the "Inefficient Education Test," Banding Analysis, and a SENCO Chat feature. Having time doesn't change why these are deferred — each needs a real legal source or education lawyer confirming the framework before it's safe to build, not more engineering time.
