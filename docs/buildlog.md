# 🛠️ Build Log

Track everything we ship — features, prototypes, experiments. Log decisions and the reasoning behind them. This page is the technical memory of the programme.

---

## Stack decisions

| Layer | Tool | Reason |
| --- | --- | --- |
| Frontend / prototyping | Lovable | Speed — AI-powered, no design required |
| Backend / DB / auth | Supabase | Fastest path to a real backend |
| Hosting / DNS | Cloudflare | Already in credits stack |
| Forms / surveys | Tally | User research in Weeks 1–2 |
| Notes / interviews | Granola | Async capture |
| Version control | GitHub | Lovable two-way sync — rollback point, Husaam code-level access, portfolio-visible commit history |
| Agentic coding (held back) | Cognition (Devin) | Redeemed but deliberately not used yet — best suited to well-scoped tickets against an existing codebase, not exploratory prompting. Bring in Weeks 3-6 once there's a stable codebase and a defined backlog. |

---

## Architecture notes

**Collaboration model:** Single shared Lovable project under "Hanad's Lovable" workspace. Husaam invited as Editor rather than redeeming his own 100 credits — his credits are held in reserve as a second month of runway once Hanad's run low (each Pro Plan must be cancelled within 1 month to avoid charge, so timing matters). Lovable generation is prompt-based, not multi-cursor — we take turns prompting and review the GitHub diff before the next prompt, rather than both generating into the project simultaneously.

**Routing:** Built on TanStack Router. Learned the hard way — a parent route (`consultations.$id.tsx`) that renders full page content instead of `<Outlet />` silently blocks all child routes (`/needs`, `/draft`, `/submit`) from rendering, even though navigation, links, and data are all correct. Fix: parent route must be a pure layout with `<Outlet />`; the actual page body moves to an index leaf (`consultations.$id.index.tsx`). Worth remembering for any future nested route added to this app.

**Data:** Prototype 1 (EHCP Response) uses mock/seed data only — no Supabase connection yet. Deliberate: validate the workflow with real SENDCOs before investing in real backend logic.

**Modes:** Build mode for generating from a fully-specified prompt (ambiguity resolved in planning first, not as paid Lovable messages). Plan mode for debugging or genuine architectural tradeoffs once something is already built and broken.

---

## Ship log

| Date | What shipped | Link / screenshot | Notes |
| --- | --- | --- | --- |
| 09 Jul 2026 | Prototype 1 — EHCP Response (SENDCO consultation-response tool) | Lovable project (GitHub sync pending) | Full flow live and clickable across all 5 seeded pupils: Dashboard → Consultation detail → Consolidated needs → Draft response → Letter preview → Review & submit → Confirmation. Built via Lovable (Build mode for generation, Plan mode for the routing bug fix). Mock/seed data only. Demo-ready — outreach to SENDCOs starting now. |
| 11 Jul 2026 | Phase 1 — Foundational fixes + quick wins | Lovable project | Active-state nav fix, sidebar restructure (Inbox/Submitted dropped, Templates/Calendar/Reports/Settings added as routed placeholders), deadline countdown verified correct (not a bug), aggregate needs-matched score added, Section B/F/I copy framing applied, received-documents list relabeled with author/profession/date, table sort extended to all columns, Statutory guidance link fixed to a real external [gov.uk](http://gov.uk) link, placeholder copy corrected on 3 Coming Soon pages. |
| 11 Jul 2026 | Phase 2 — Settings / School Profile | Lovable project | Real Settings screen backed by shared SchoolProfileProvider (in-memory), sidebar now reads live school name/SENDCO from it. School identity (incl. role/position), provision catalogue across all 4 statutory domains with domains-not-rigid caveat, current cohort baseline, staffing/capacity with specialist staff table, response style toggle. Cognition & Learning entry verified consistent with Pupil C's existing draft wording. Three items pending verification — see Known issues. |
| 12 Jul 2026 | Phase 3 — Templates + Evidence library + Vagueness-flagging | Lovable project | Templates tab: domain → outcome structure, "Can meet in full" reads live from Settings provision catalogue (confirmed via live edit test), no vague phrases in seeded snippets, vagueness-flagging present in both Templates and Draft response, Evidence cross-references clickable. Evidence tab: 6 seeded documents, consistent naming with existing draft content. Two real-world UX gaps found via testing (destructive insert-from-template, non-removable evidence attachments) — both fixed and verified. Phase 3 complete. |
| 12 Jul 2026 | Phase 4 — Calendar / Deadlines | Lovable project | Full month grid, urgency colour-coding matching Dashboard, days-remaining badges per entry, submitted-consultations toggle, click-through to detail, Statutory guidance link fixed to a real [gov.uk](http://gov.uk) link. Major correction during this phase: discovered and fixed that the statutory deadline is 15 calendar days, not working days (sourced from IPSEA, CFA 2014 s.39, and an LGO decision) — replaced the working-day model across Dashboard, Consultation detail, Review & Submit, and Calendar, verified by manual calculation against screenshots. Phase 4 complete. |
| 13 Jul 2026 | Phase 6 — Activity log, Notifications, Global search, Sidebar collapse, Pagination | Lovable project | Activity log embedded per consultation (timestamped, attributed live to Settings' SENDCO name/role, seeded consistently with existing historical narrative notes e.g. Pupil K). Notifications bell wired to existing calendarDaysRemaining/deadlineTone — badge count + dropdown of open due-soon/overdue consultations, confirmed against Dashboard's own count (different by design — dropdown includes a wider T-5 band). Global search: unified overlay (Cmd/Ctrl+K, header button) covering consultations/templates/evidence with keyboard nav; Dashboard's inline box reverted to live-filtering the table directly after an initial overcorrection merged it into the overlay — kept as two distinct, complementary features. Sidebar collapse: kept localStorage persistence deliberately (reversed an earlier plan to remove it — genuine UI preference, not session data, no reason to reset it). Dashboard pagination added (10/row, first/last + ellipsis, resets on filter or inline search change). Calendar got a month/year picker. Bug found and fixed: search deep-links to Templates/Evidence didn't switch tabs when already sitting on the "other" tab — fixed to work regardless of current tab, plus scroll+highlight of the specific matched item. Three items described/built but not yet visually confirmed — see Known issues. |

---

## Feature decisions

| Feature | Build / cut / defer | Reasoning |
| --- | --- | --- |
| EHCP consultation-response flow (Dashboard → Detail → Needs → Draft → Letter → Submit) | Build — Prototype 1 | Narrowest testable SENDCO pain point: a statutory 15-working-day deadline the school is legally obligated to meet, currently handled manually across scattered reports/appendices. Real, deadline-driven, legally grounded — easy for a SENDCO to react to. |
| Multi-party platform — council/school/family/health logins, RBAC, RAG document search across the platform, cross-party task & collaboration system (Husaam's original spec) | Defer — v2/v3 roadmap | Genuine long-term product vision, but months of build (auth, permission-scoped multi-tenancy, RAG search) — not testable this week and not something a SENDCO interview can react to. Captured here so it isn't lost, not discarded. |
| Login / auth | Cut — for now | Single persona (Millbrook Primary, SENCO S. Ahmed — placeholder data) is enough for a clickable demo. Revisit once real Supabase backend is needed. |
| Real Supabase backend + AI document parsing | Cut — for now | Mock/seed data only for Prototype 1. Validate the workflow itself before investing build time in real parsing logic. |
| Active-state highlight bug (Dashboard nav) | Fix — foundational | Currently uses list position instead of route matching; two-line fix, do first since Calendar/Reports/Settings all add more routes for this to break against. |
| Inbox (sidebar tab) | Drop | Dead link, no scaffolding behind it (confirmed via Lovable). Its intended purpose ("what's new") is already covered by the dashboard's "New" filter pill. |
| Submitted (sidebar tab) | Drop | Same — redundant with the dashboard's "Submitted" filter pill. Revisit only if a richer searchable audit archive is wanted later. |
| Templates | Build — new screen | Reusable response snippets by need category, insertable into the Draft screen. Genuinely new value, cheap relative to payoff. |
| Calendar / Deadlines | Build — new screen | Chronological view across all open consultations' 15-day deadlines. Independently suggested by both us and Lovable — good signal. Depends on the deadline countdown actually being live-computed (see Known issues). |
| Reports / Overview | Build — new screen | On-time vs. late response rate, breakdown by LA, needs met by category, workload over time (trend), and capacity gaps (sourced from Settings vs. actual needs seen). Turns the tool from task-helper into something a SENCO can show their headteacher — also an Ofsted/SEN-budget evidence angle worth a line in the Demo Day narrative. |
| Settings / School profile | Build — new screen | Configures the school's real provision/capacity once, as the source Templates' defaults and Reports' numbers both pull from — internal consistency is what makes the prototype feel real rather than disconnected screens. Validated by SENCO AI's suitability assessment requiring the same underlying data. |
| Evidence library | Build — new screen | Pupil-agnostic store of provision maps, costings, staffing docs — referenced from both Draft response and Templates instead of re-attached by hand each time. |
| Activity log / audit trail | Build — embedded per consultation, not a separate tab | Timeline of who-did-what-when on each consultation. Ties directly to the thing it documents; real question a headteacher or LA asks months later. |
| Global search | Build — extend existing dashboard search | Extend into omnisearch across pupils, LAs, templates, evidence once there are more than ~10 open cases. |
| Notifications wiring (bell icon) | Build — after deadline logic is solid | Tie to T-5/T-2/overdue deadline states so the urgency colour system feels connected. Do after foundational fixes, not before. |
| Sidebar collapse | Build — lowest priority polish | Helps on smaller laptop screens. Do last. |
| Messaging/collaboration with LA case officers | Defer — v2/v3 roadmap | Drifts back into the full multi-party platform vision deliberately deferred above. Real feature, wrong time. |
| Aggregate "needs matched" score | Build — add to Needs/Draft screen | Cheap to compute from existing full/part/cannot data. Seen on SENCO AI's dashboard ("87% needs matched") — gives a punchier at-a-glance number for demos. |
| EHC section framing in copy (Section B = needs, Section F = provision, Section I = placement) | Build — apply to AI summary/Needs/Draft copy | All three sections verified against IPSEA directly. Note for copy accuracy: Section I only exists on final plans — our tool operates at the consultation stage, before Section I is populated, so copy should frame the response as informing the eventual placement decision, not confirming an existing one. Also apply the SEND Code of Practice's own caveat (para 6.27) that the four need domains aren't rigid boxes — a child's needs often span more than one area — as a soft note wherever domains are shown (Needs screen, Templates). |
| Section K-style relabeling of "received documents" list (report author / profession / team / contact details / date of advice) | Build — quick win, existing Consultation detail screen | Manha's real EHCP draft structured its evidence log this way. Cheap relabel of an existing list, reinforces the legal-specificity theme the rest of the build is built around. |
| Vagueness-flagging on Draft responses (flag wording like "as appropriate," "would benefit from," "a high level of" as not legally specific enough) | Build — Phase 3, alongside Templates/Evidence library | Directly sourced from IPSEA's list of provision wording that fails the legal specificity standard. Cheap, well-sourced, reinforces the core differentiator (legal specificity) the whole prototype is built around. Moved from "future candidate" to active scope. |

---

## Build sequencing — Prototype 2 (tabs & screens expansion)

*(Order to build in; each phase depends on the one before it. See Feature decisions above for full reasoning per item.)*

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

- "Statutory guidance" sidebar link — was decorative filler (plain `<div>`, no route, no href), not scaffolded to anything. Decision: turn it into a real external link to the SEND Code of Practice on [gov.uk](http://gov.uk) (DfE's *Special educational needs and disability code of practice: 0 to 25 years*), opening in a new tab — good idea worth keeping, not worth deleting.
- "Millbrook Primary" / SENCO S. Ahmed is placeholder data — be upfront it's fictional if demoing to a real school, don't let it be mistaken for an existing customer
- ✅ GitHub sync completed (11 Jul) — confirm `sendco-portal` placeholder repo was deleted / establish which repo is now the real synced one
- ✅ **Resolved (12 Jul) — calendar-day fix verified.** Deadlines across Dashboard, Consultation detail, Review & Submit, and Calendar now use 15 calendar days (not working days), computed dynamically from `receivedOn` via `calendarDaysRemaining()`. Verified by manual calculation against screenshots — all 4 open consultations matched exactly (Pupil D overdue by 9, Pupil C overdue by 3, Pupil B 3 remaining, Pupil A 4 remaining). Consultation detail banner now reads "Statutory 15-day response window (minimum)". Full sourcing on Idea Validation.
- Product naming decision still open (SENDbridge and other options discussed, none finalised) — not urgent, but don't lose track of it
- Data-handling reminder: real pupil EHCP documents (e.g. shown for structural reference) should stay outside the Lovable prototype — no real auth/data protection layer yet. Keep the app itself on fictional seed data as real validation ramps up.
- ✅ Settings/School Profile (Phase 2, 11 Jul): **resolved and verified** — sidebar now reads role/position live (matching how name already worked), and the letter preview now reads school name, address, SENDCO name and role live from the shared profile store. Provision catalogue/staffing persistence also confirmed working during a session and correctly resets on a full page refresh, as designed.
- ✅ Templates (Phase 3, 12 Jul): **resolved and verified** — "Insert from template" now appends with a paragraph separator instead of overwriting; attached evidence chips now have a detach/X button. Both confirmed working by direct testing.
- ✅ **Full Phases 1–5 recheck (13 Jul)** — requested specifically because Phase 5 alone had caught two rounds of real gaps on first pass; worth checking whether 1–4 were equally solid. Found and fixed: Consultation detail/Review & Submit calendar-day copy confirmed correct; column sort and the Statutory guidance link (correct [gov.uk](http://gov.uk) SEND Code of Practice page) confirmed working; **Calendar was plotting submitted consultations by deadline date, not actual submission date** — fixed to show the real submission date, deadline moved to a tooltip; historical consultations (Pupils F–O) showed a broken-looking "0 files — 0 pages" card — replaced with a "not retained" note; Dashboard's "All" default view contradicted its own "awaiting response" subtitle by including submitted history — now defaults to Open only, matching Calendar's pattern. Same-day-submission-counts-as-on-time logic confirmed correct in code (`<=` comparison) and a seed case (Pupil P) added so it's demonstrable in Reports, not just theoretically correct.
- ✅ **Interaction-level recheck (13 Jul)** — final pass specifically testing click-throughs and buttons that had only ever been visually confirmed, not actually used. All confirmed working directly by Hanad: Calendar entries navigate to consultation detail; Evidence tab search filters correctly; Reports' LA breakdown text is plain (not a dead/fake link — false alarm); Settings' "+ Add" buttons (provision catalogue, specialist staff) correctly add new rows. Also confirmed: empty placeholder `sendco-portal` GitHub repo was deleted. Decision: keep the unprompted case-officer names Lovable added early on — no functional risk either way, deliberate choice not an accident. Phases 1–5 fully closed out across build, visual, and interaction verification.
- ✅ Phase 6 (13 Jul) — all three verification gaps closed: Activity log confirmed via screenshot (Pupil A — absolute timestamps, correct chronological order, live SENDCO attribution, header explicitly states "Attributed to S. Ahmed"); global search's no-results state confirmed clean (explicitly names all three searched domains); Notifications dropdown click-through confirmed navigating to the correct consultation. Build is now verified end to end across all 6 phases — built, screenshotted, and interaction-tested, not just described as done.
- ✅ **Post-build additions (13 Jul)** — three further features, all confirmed working via direct testing: (1) Letter export — real .docx download + print stylesheet, confirmed opening correctly. (2) "Cannot meet" required rationale — Submit correctly disabled until rationale is filled, confirmed on Pupil C. (3) Template variable tokens ({{pupil}}/{{year_group}}/{{LA}}) — confirmed resolving to real values ("for Pupil A (Year 4)", "arranged by Camden LA") rather than literal placeholder text. Also fixed in passing: a pre-existing hydration mismatch on Activity log timestamps (now uses UTC consistently), re-verified against Pupil A's log with no regression.
- Minor, non-blocking: the "Insert from template" picker doesn't filter by the need's own domain — observed twice inserting a Communication and Interaction (SaLT-related) snippet onto Cognition/Learning and Social-communication needs. Not a bug, but worth considering scoping the picker to the current need's domain to reduce mismatched inserts in a live demo.
- Minor copy inconsistency: Consultation detail's banner says "Statutory 15-day response window (minimum)" reflecting the legal floor correctly; Calendar's subtitle and the Notifications dropdown's subtitle both omit "(minimum)". Low priority, one-line fix if wanted.

---

## Future roadmap / backlog (not yet built)

*(Consolidated from team brainstorming + Lovable's own codebase review, 13 Jul 2026. Already-built items from this session — letter export, Cannot-meet rationale, template tokens — are NOT repeated here, see Build Log/Known issues above.)*

**Infrastructure gap, flagged once, applies to several items below:** checked against Credits & Perks (13 Jul) — there is no LLM API credit and no email-sending service anywhere in the current credits stack. Real AI summaries and email digests are blocked on this, not on Lovable itself. Supabase ($30 credit) is still unredeemed — real persistence, real auth, and multi-user features are blocked on that.

### Tier 1 — highest value

1. **Real AI integration**, replacing the mocked AI summary with an LLM actually reading uploaded documents live. Biggest credibility jump possible ("watch it read a real report" vs. a mockup), plays to Hanad's IR/NLP strength, strong portfolio artefact on its own. *Blocked on an LLM API key/credit — not currently in the credits stack.*
2. **Real Supabase backend + auth.** Lets a real school onboard with a real login instead of everyone sharing one demo link. Relevant the moment SENDCO outreach turns into a real pilot conversation. *Needs the $30 Supabase credit redeemed — create one shared org, invite Husaam.*

### Tier 2 — strengthens the story, not just the product

1. **Accessibility audit** — WCAG colour contrast, aria labels, full keyboard-only navigation through the whole flow, and non-colour affordances everywhere status/urgency is currently colour-only (icon + label, not just a red/amber/green tint). A tool built for SEND that isn't itself accessible is a real, avoidable gap; getting it right is a genuine values-aligned differentiator worth a line in the Demo Day narrative.
2. **Vision mockup (slides, not a build) of Husaam's original multi-party platform** — councils, families, health professionals connected. Gives investors the bigger picture without derailing the working SENDCO-first prototype.

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
11. **"Your work isn't backed up" banner** — honest, cheap UI acknowledgement that everything is currently client-side only. Real fix is Supabase persistence (see Tier 1).
12. **Multi-user awareness** — activity is currently attributed to a single `sendcoName` from Settings; misleading the moment two real staff share the same login. *Blocked on real auth/multi-user, same as bulk-assign above.*
13. **"Insert from template" domain filtering** — already flagged in Known issues (13 Jul): the picker doesn't currently filter snippets to the current need's domain, observed twice inserting a mismatched-domain snippet live. Cheap fix, worth doing whenever Templates gets touched again.

**Deliberately still excluded, not forgotten** (already logged with full reasoning in Feature decisions above): the "Inefficient Education Test," Banding Analysis, and a SENCO Chat feature. Having time doesn't change why these are deferred — each needs a real legal source or education lawyer confirming the framework before it's safe to build, not more engineering time.

---

## Principles

- No dedicated designer — lean on Lovable for UI, don't over-invest in polish before validation
- Ship the simplest version that can be tested
- Every build decision should be traceable to a user insight