# 👪 Family-Side Requirements — Derived Strictly from EHC Process Facts

> Notion export — 2026-08-03, logged 1 Aug 2026. Source: child page of `Idea Validation & Hypotheses`.
> One reference to a named interview source has been generalised to a role description, consistent with the naming-consent rule already stated in `landing-page-spec.md`.

**Purpose:** This page is a first-principles derivation, not a feature brainstorm. Every item below exists because it answers one question: does the EHC process itself — as logged in `ehc-process-facts.md` — actually require this? Built deliberately independent of the existing feature backlog in `send-idea-full-detail.md` so it can be used as an **audit tool against that backlog**, not folded into it. Researched, derived, self-audited, and corrected on 1 Aug 2026.

---

## How this was built

Two passes. First, a derivation straight from the logged legal facts. Second, a self-audit against two questions — is this the full list, and is everything strictly tied to what the law requires, especially deadlines and numbers — which corrected real overreaches (a fabricated-source deadline that turned out to hold up on independent check; an appeal-window claim asserted before it was actually verified across all appeal types; one piece of reasoning imported from a meeting transcript rather than the legal facts; two overstated framings of family obligations) and surfaced genuine gaps that hadn't been in the first pass. The corrections are kept visible below rather than silently smoothed over.

---

## Part A — Strictly demanded by the legal facts

### 1. Rights-holder model (foundational — everything below depends on this)

The system must track *who* holds each right at any given moment, not assume "the family" is a constant single actor:

- **Parent** holds the rights below the end of compulsory school age.
- **Young person** holds them directly from the end of the academic year in which they turn 16 (not their literal birthday) through to 25 — for requesting an assessment, responding to a draft plan, requesting a named school, requesting mediation, and appealing.
- **Capacity is decision-specific**, under the Mental Capacity Act 2005: unable to understand, retain, use/weigh the relevant information, or communicate a decision — any one of those four failing is enough, and a young person can have capacity for one decision and lack it for another at the same time. Where they lack it for a specific decision, a parent/representative steps in for that decision only.
- Confirmed directly on IPSEA's appeal-rights page for the appeal stage; the claim that it spans every stage is corroborated by a specialist mental-capacity/SEND source rather than an IPSEA page for each stage individually — solid enough to build the rights-holder toggle against, worth one more direct IPSEA check only if we build actual capacity-*assessment* logic rather than a rights-holder flag.

### 2. A clock engine with the correct number of deadline shapes

- **Rolling, from the request date**: 6 weeks (assess/no), 16 weeks (no-plan notice), 20 weeks (final plan), the "at least 15 days" family window (fires on the draft plan, and again after any amendment)
- **Fixed calendar dates**: 15 February (most phase transfers) or 31 March (secondary→post-16)
- **Rolling, counted backward from a known future date**: at least 5 months before a post-16-to-post-16 institution transfer specifically (reg.18(2), confirmed against legislation.gov.uk) — a third, genuinely distinct shape
- **Recurring, 12-month cycle**: annual review, with sub-deadlines (info circulated 2 weeks before the meeting, LA decision within 4 weeks after)
- **Sequenced sub-deadlines within phase transfer**: review starts within 12 months of transfer → LA sends draft amendments within 4 weeks of the review meeting → family gets 15 days to respond → LA has up to 8 weeks from the draft to issue final — all before the fixed calendar date
- **Escalation clocks**: mediation resolves or issues a certificate within 30 days; appeal due 2 months from the decision letter or 1 month from the certificate, whichever later — confirmed uniform across every appeal type on the 1 Aug audit (previously only confirmed for refusal-to-assess)

### 3. A task list correctly framed around the actual rights-holder

Write the initial request (no required form exists in law); decide whether to submit views/private reports; object to an old report's "sufficiency" if needed (requires the rights-holder to actively raise it — family, LA, and original author all have to agree otherwise); request a specific type of professional; respond within each 15-day window with substance; decide whether to escalate. Framed as what the rights-holder *can and should do*, not as a deadline-bound duty the law doesn't actually impose on them (corrected from an earlier draft that overstated this as "mandatory family input").

### 4. A rights/compliance checker

Flags unlawful extra criteria (proof of prior spend, percentile thresholds, minimum terms of SEN support, prior specialist involvement — none are part of the legal test); flags a draft plan that wrongly names a placement; checks a school refusal against the only three lawful grounds; flags ineligible appeals (refusal-to-assess appeal where reassessed in the past 6 months; attempts to appeal sections A/E/J). **Extension**: run the same check longitudinally over the dated correspondence record (item 6) to catch a recurring invalid reason or delaying tactic across months — same mechanism applied over time, not a new category.

### 5. Evidence and document storage

The rights-holder's own written views, private/independent reports, and everything received from each mandatory source (school, health, EP, social care) — including a communication log (who said what, on what date, via which channel).

### 6. A dated record of correspondence and decisions

Not "so you can prove you asked" (that reasoning was imported from a meeting transcript, not the legal facts, and has been corrected). The real grounding: several deadlines are *legally defined* relative to a specific letter or certificate date — the appeal window counts from "the date on the decision letter" or "the date on the mediation certificate." Without an accurate dated record, the rights-holder can't calculate their own deadline.

### 7. An advice/provision specificity checker

Flags non-specific provision language against the Code's standard (clear, accessible, specific; quantified — "at least," "no less than" — rather than vague terms), quoting the exact phrase and the standard it falls short of. Never proposes replacement wording or an hours figure — that would cross into generating unsupported provision, the exact failure mode already validated by an EHC Coordinator's account of a council-trialled AI tool (see `buildlog.md`).

### 8. Drafting assistance for every formal written action

The request letter, representations on a draft plan, a meeting request, a named-school request, a sufficiency objection, a specific-professional request (framed around the "reasonableness" test — stronger if tied to an existing waiting list or another professional already flagging the need), mediation/appeal paperwork. Drafts only from facts the rights-holder has actually entered — never invents supporting detail to fill a gap.

### 9. Escalation routing with the real eligibility rules attached

Routes by what actually happened (refusal to assess, refusal to issue, contents of B/F/I, named school, cease-to-maintain) — with the exceptions built in: A/E/J aren't appealable; no appeal right on refusal-to-assess if reassessed in the last 6 months; provision and placement must continue during a cease-to-maintain appeal until the deadline passes or the appeal is decided.

### 10. A plain-language guidance layer

Explains what's happening at each stage and which deadlines are firm statutory floors vs. practical targets (the week-14 draft-plan target is *not* a legal deadline, unlike everything around it). This is what actually discharges the LA's own duty (reg.9) to help the family participate meaningfully.

### 11. Notifications on both sides of every clock

An LA missing its deadline is a real, actionable right ("if your LA does not respond in time, you can take action"); the rights-holder's own window closing mostly shifts their remedy from comment to appeal, rather than forfeiting anything outright (corrected from an earlier "real cost" overstatement). Notification copy needs to reflect the right consequence for each direction.

---

## Part B — Sound engineering judgment, not a strict legal requirement

### 12. Multi-child / multi-case support, and a defined human-escalation pathway

Supporting more than one child or more than one open process per child at once isn't demanded by the statute — it's inferred from the process being per-child and plausibly overlapping. A defined escalation pathway to a real human (pro bono solicitor, SENDIASS) is the practical endpoint of "AI never issues a legal conclusion," not a citation-backed requirement itself. Both are good decisions; neither belongs in Part A.

---

## Explicitly excluded (checked against the legacy feature list, 1 Aug 2026)

Not relevant, or actively not recommended, against this derivation:

- **Case strength indicator** — actively recommended against: an outcome prediction is unfalsifiable in the moment and can wrongly reassure or wrongly discourage. Any surviving version should be re-scoped as pure evidence-completeness checking, which is just item 7 again.
- **Reform/White Paper explainer** — explains a *proposed*, not current, legal position; same overclaim risk already caught elsewhere in this build (unproven landing-page claims, working-vs-calendar days).
- **Condition-specific pathways for the core tool** — contradicts an already-established fact: the core statutory process is condition-agnostic. Fine only as separate depth-layer content, never as a fork of the core tracker.
- **Specialist/school directories, LA-performance crowdsourcing, community peer layer, multilingual expansion, ongoing news/updates feed, SENCO dashboard, open-ended chatbot** — none are required by an individual family's statutory journey; each is a separate business/market/accessibility decision, not a process requirement.

---

## AI integration — where it fits, from this list only

Governing rule: AI touches only reading, matching, or drafting natural language against a deterministic rules engine — never computing a date, deciding eligibility, or inventing a fact.

- **Strong fit, with guardrails**: item 7 (specificity checker — flags and cites, never rewrites); item 8 (drafting — drafts only from entered facts); item 4 (compliance checker — flags and cites, never asserts a legal conclusion on its own authority); item 10 (plain-language guidance — explains process generically, never predicts case-specific outcomes).
- **Must stay deterministic, never AI**: item 2 (clock/deadline maths), item 9's eligibility logic (the 6-month bar, A/E/J exclusion), item 11's trigger logic (rules-based on the clock engine, not judgment), item 1's state machine (AI can narrate the state in friendlier language; it must not decide the state).

---

*Logged 1 Aug 2026, following the family-side legal breakdown, a two-pass self-audit, and cross-check of the legacy feature document against this derivation. Cross-reference against `send-idea-full-detail.md` as the next step — this page is the audit standard, not a replacement for that backlog.*
