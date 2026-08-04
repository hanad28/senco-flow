# 💡 Idea Validation & Hypotheses

> Notion export — 2026-08-03. Source: `Idea Validation & Hypotheses` (workspace root, under `After Hours — Redwood Founders`).
> Sub-pages are exported as separate files in this folder: `send-idea-full-detail.md`, `domain-research.md`, `ehc-process-facts.md`, `family-side-requirements.md`.

Every idea is a hypothesis until validated with real users. This page tracks the evolution of the problem space — what we believed, what we tested, what the evidence showed.

---

## Working product thesis (SEND/SENDCO direction) — the three layers

Not just "faster forms," and not just a shared timeline either. The multiparty platform's actual value has three distinct layers, and the pitch/build should be explicit about which one is being shown at any point:

1. **Visibility** — a shared timeline where each party (family, school, specialists, LA) sees their own obligation and the interlocking statutory clocks (see `ehc-process-facts.md` for the actual deadlines). This is coordination infrastructure — it surfaces what's due and what's overdue, but it doesn't do the work for anyone.
2. **Execution assistance** — actively helping each party fulfil their obligation, not just track it. Already built for the SENCO side (vagueness-flagging against IPSEA's specificity standard, consolidated needs view, "cannot meet" rationale field). Same logic extends to other parties: helping a parent draft their 15-day comment on a draft plan, helping a specialist write advice that meets the Code's "specific and quantifiable" bar instead of vague boilerplate.
3. **Communication / information exchange** — a shared request-and-share layer so evidence, advice, and responses move on-platform instead of by email/post/phone and having to be re-chased. This is what actually protects the 6-week and 15-day clocks in practice, where most of the real-world delay comes from re-requesting things nobody can see were already sent.

**Pitch framing:** the shared timeline is the visible skeleton; execution assistance and information exchange are what make it a daily-use product rather than a dashboard/Gantt chart — this is the answer when an investor asks "isn't this just a dashboard."

---

> **CURRENT BUILD & PITCH SCOPE (decided 2 Aug 2026) — schools and families only for the rest of this incubator**
>
> The three-layer thesis above is the long-term platform vision across all four parties. **For the remainder of After Hours, active build, copy, pitch, and outreach are scoped to schools and families only.** Councils and specialists are roadmap, not current build:
>
> - **Councils** already appear in the product as the destination of statutory consultations and the source of the deadline clock — but there is no dedicated council workspace/login, and none should be implied as live.
> - **Specialists** already appear as evidence sources (EP/SaLT/OT reports flowing into the case) — but there is no dedicated specialist workspace/login either.
>
> **Why schools + families, specifically:** they are the two parties closest to the child day-to-day (the child's hours split between home and school), and — alongside the young person themselves if 16+ — the two who hold the statutory right under **s.36(1) Children and Families Act 2014** to request an EHC needs assessment in the first place. Councils and specialists are downstream of that trigger, not upstream of it.
>
> **This is not a pivot.** It's the already-locked SENDCO-first wedge (see Pivot log below) made explicit for this phase: school first, family-facing next, multi-party after. No build work is being discarded — Husaam's family party-view build continues as planned.
>
> **Action for any future session:** before writing landing page copy, pitch decks, outreach messages, or new build scope, check this note. If a document implies a live council or specialist workspace, it needs correcting to this scope.

---

## Before committing to any idea — questions to actually answer

**Is the problem real, or assumed?** Build for a felt need, not a hypothesised one (PG). Why doesn't this already exist or why hasn't anyone solved it well?

**Are you the right people for this specific problem?** Real unfair advantage — access, lived experience, data, network, domain credibility — not just general competence ("Before the Startup").

**Is there a real underserved segment, or are you describing an existing solution?** Competitors existing isn't disqualifying; not having a real gap is.

**How does this become a business?** How do you make money, what's the distribution/growth strategy, what's the moat (from Demo Day anticipated Q&A). Market size is the second number, not the first — growth rate and duration are what matter early (PG).

**Can this get built and tested in 8 weeks?** Gate 1: testable version shippable via Lovable + Supabase with no designer, or a custom build the team can genuinely execute. Gate 2: no regulatory or institutional dead-end (licensing, children's health data, school/council gatekeepers) that can't be routed around in the time available.

**What would prove or kill this, and have you done it yet?** A problem is only real if users describe it unprompted. Willingness to pay beats enthusiasm. What have you actually learned from users so far — stated plainly enough to say to an investor.

**Outstanding prep gap:** The Mom Test (customer interview technique) and the Founding Sales Ebook (early GTM) are both logged as "To read" — directly relevant to the validation and business-model questions above, worth finishing before Week 1 interviews.

---

## Hypothesis log

| # | Hypothesis | How tested | Result | Decision |
|---|---|---|---|---|
| H1 | *(Add first hypothesis)* | | | |

---

## Family party-view — detail page (formerly filed as "Idea 5")

**Status:** Active build in progress — this is the feature backlog and business-model detail for the family party-view of the unified SEND platform (see "Working product thesis" above), not a discarded or exploratory idea. Score: 26/30 from initial framework scoring, retained as historical record. Husaam is currently building this in Lovable; Hanad's current task is auditing that build against this page and the three-layer thesis.

Full origin story, business model, framework score, contacts, risks, and interview questions: see `send-idea-full-detail.md`.

**Audit companion (1 Aug 2026):** a first-principles requirements list, derived strictly from the EHC process facts and independently of this backlog, exists specifically to check this feature list against — not to replace it. Use it as the audit standard when reviewing Husaam's build: see `family-side-requirements.md`.

---

## Pivot log

*(Record any pivots here — what triggered the pivot, what we moved to, why)*

**Pivot — from a family-only Navigation Assistant to a unified multi-party SEND platform (early Jul 2026):** Team moved from the family-only Navigation Assistant (originally "Idea 5") to a single platform connecting all parties (family, school, specialists, LA) around the EHC process, per the three-layer thesis (Visibility / Execution assistance / Communication) logged at the top of this page. SENDCOs were chosen as the first party-view to build (Week 1): many schools = many reachable SENDCOs for validation/LOIs, and SENDCOs are a known, stretched, existing-problem user group. First testable wedge: the statutory EHC consultation-response burden (schools have **at least 15 calendar days**, not working days — see `domain-research.md` — to respond to LA-issued EHC needs assessments, currently manual across scattered reports/appendices). Full build reasoning, prototype scope, and feature decisions logged on `buildlog.md`.

**Update (20–21 Jul):** the family party-view is not a deferred "future scope" item — Husaam is actively building it now, using the same feature backlog originally scored under Idea 5. Both party-views are part of the same platform, built sequentially, not competing directions.

---

## Domain research

Competitor analysis, the 15-calendar-day statutory deadline correction, and verified EHC section (A–K) learnings: see `domain-research.md`.

---

## Validation principles

- Talk to real users before writing a line of code
- A problem is only real if users describe it unprompted
- Willingness to pay is stronger signal than enthusiasm
- Hanad's community access is an asset — use it

Related: `ehc-process-facts.md`, `family-side-requirements.md`.
