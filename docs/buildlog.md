# 🛠️ Build Log

> Notion export — 2026-08-03. Source: `Build Log` (workspace root, under `After Hours — Redwood Founders`).
> This page is now an index — full ship history and roadmap live in the sibling files: `ship-log-sendco.md`, `ship-log-family.md`, `roadmap-known-issues-sendco.md`, `roadmap-known-issues-family.md`, `landing-page-spec.md`.
> One reference to a named interview source has been generalised to a role description, consistent with the naming-consent rule already stated in `landing-page-spec.md`.

Track everything we ship — features, prototypes, experiments. Log decisions and the reasoning behind them. This page is the technical memory of the programme.

---

## Stack decisions

| Layer | Tool | Reason |
|---|---|---|
| Frontend / prototyping | Lovable | Speed — AI-powered, no design required |
| Backend / DB / auth | Supabase | Fastest path to a real backend |
| Hosting / DNS | Cloudflare | Already in credits stack |
| Forms / surveys | Tally | User research in Weeks 1–2 |
| Notes / interviews | Granola | Async capture |
| Version control | GitHub | Lovable two-way sync — rollback point, Husaam code-level access, portfolio-visible commit history |
| Agentic coding (held back) | Cognition (Devin) | Redeemed but deliberately not used yet — best suited to well-scoped tickets against an existing codebase, not exploratory prompting. Bring in Weeks 3-6 once there's a stable codebase and a defined backlog. |

---

## Architecture notes — cross-platform

**Modes:** Build mode for generating from a fully-specified prompt (ambiguity resolved in planning first, not as paid Lovable messages). Plan mode for debugging or genuine architectural tradeoffs once something is already built and broken. Applies to any Lovable project on this platform, not just one build.

**General principle — validate before investing:** confirm a workflow with mock/seed data before investing build time in real backend logic. Proven on the SENDCO build; apply the same discipline to any new party-view.

**Routing gotcha worth knowing generally:** if using TanStack Router (or a similar nested-route framework), watch for a parent route rendering full page content instead of `<Outlet />` — this silently blocks all child routes from rendering even though navigation/links/data look correct. Bit us once on the SENDCO build.

SENDCO-specific implementation detail (the exact collaboration/workspace setup, the specific routing bug instance, current data status) lives in `ship-log-sendco.md`.

---

## Cross-platform decisions & principles

*(Applies to every party-view on this platform, not just one build — consolidated 1 Aug 2026 from items previously mixed into the SENDCO-specific pages.)*

**Multi-party platform** (council/school/family/health logins, RBAC, RAG document search across the platform, cross-party task & collaboration system — Husaam's original spec) — **Defer, v2/v3 roadmap.** Genuine long-term product vision, months of build (auth, permission-scoped multi-tenancy, RAG search). Captured here so it isn't lost, not discarded — the family party-view build is the next deliberate step toward it, not a replacement for it.

**Messaging/collaboration with LA case officers** — **Defer, v2/v3 roadmap.** Cross-party by definition — part of the same deferred multi-party vision above, not a single party-view's feature.

**AI provision-hallucination risk (confirmed by an LA source, 20 Jul)** — an EHC Coordinator (Ealing SENAS) confirmed a council-trialled AI plan-writing tool inserted an unrecommended provision with no supporting professional evidence, creating manual clean-up work to trace and remove it. **Hard constraint for any AI feature on any party-view:** must strictly ground every suggested provision to a cited source document and never infer or invent provision not present in the evidence.

**Product naming — confirmed: Unisen** (26 Jul). Live at unisen.uk. Applies to the whole platform, not one build. Full landing page spec and copy in `landing-page-spec.md`.

**Data-handling principle:** real documents belonging to real people (pupil EHCPs, family correspondence, specialist reports) should stay outside any Lovable prototype — no real auth/data protection layer yet on either build. Keep every prototype on fictional seed data as real validation ramps up, regardless of which party-view.

**Infrastructure status (updated 1 Aug):** Mikhail has begun the real backend transition — redeeming the $30 Supabase credit, standing up one **shared** Supabase org (not per-build) with real auth, and sourcing an LLM API key/credit. This serves whichever party-view needs it first, not just the SENDCO build. Status: in progress, not yet confirmed complete — worth checking directly with Mikhail rather than assuming from this note alone.

**Tier 1 — highest-value shared infrastructure:**

1. **Real AI integration** — replacing any mocked AI summary/analysis with an LLM actually reading uploaded documents live, on whichever party-view needs it. Must ground every suggestion to a cited source per the hallucination-risk constraint above.
2. **Real Supabase backend + auth** — lets any party-view onboard real users with real logins instead of a shared demo link. Foundational for eventually unifying multiple party-views under one shell.

**Tier 2 — strengthens the story, not just one product:**

1. **Accessibility audit** — WCAG colour contrast, aria labels, full keyboard-only navigation, non-colour status affordances (icon + label, not just colour tint). Applies to every party-view — a SEND platform that isn't itself accessible is a real, avoidable gap.
2. **Vision mockup (slides, not a build) of the full multi-party platform** — councils, families, health professionals connected. Gives investors the bigger picture without derailing whichever party-view is actively being built.

---

## Ship log & feature decisions

Full phase-by-phase build history (what shipped, when) and the build/cut/defer reasoning behind every feature, split by party-view:

- `ship-log-sendco.md`
- `ship-log-family.md`

---

## Roadmap & known issues

What's next to build, what's cut for speed and needs revisiting, and the future backlog, split by party-view:

- `roadmap-known-issues-sendco.md`
- `roadmap-known-issues-family.md`

---

## Principles

- No dedicated designer — lean on Lovable for UI, don't over-invest in polish before validation
- Ship the simplest version that can be tested
- Every build decision should be traceable to a user insight

Landing page content and design spec: `landing-page-spec.md`.
