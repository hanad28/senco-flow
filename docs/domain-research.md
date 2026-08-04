# 🔍 Domain Research — Competitor Analysis & EHC Learnings

> Notion export — 2026-08-03. Source: child page of `Idea Validation & Hypotheses`.
> Legal/domain research backing the build: the calendar-days correction, competitor analysis, and verified EHC section learnings. Current thesis lives in `idea-validation.md`.

---

## ⚠️ Major correction (12 Jul 2026) — the deadline is 15 CALENDAR days, not working days

This was wrong from the original prompt onward and had been built into the Dashboard, Consultation detail, Needs/Draft/Letter copy, and the Calendar screen. **Confirmed via multiple independent sources, including IPSEA (our established source throughout this build) and the primary legislation itself:**

- Statutory basis: Children and Families Act 2014, s.39(6) — LA must consult the school before naming it in a plan. The specific day count is set out in the SEND Code of Practice, para 9.83.
- IPSEA directly: "Your LA should give them 15 days to respond" — no "working" qualifier, anywhere.
- Essex SEND IASS and a Local Government Ombudsman decision (case 23 004 539) both cite the identical duty using plain "15 days"/"15 calendar days," never "working days."
- It is consistently framed as **"at least 15 days"** — a statutory minimum the LA can extend, not a hard single number.

**Practical impact:** a calendar-day count runs faster than a working-day count — the app has been showing SENDCOs more time than they actually have, which is a serious direction to be wrong in for a legal-deadline tool. The bank holiday fix (11 Jul) solved the right problem for the wrong count — the underlying logic isn't wasted, but it needs to apply to a simple calendar-day calculation now (bank holidays/weekends stop being exclusions).

**Status:** resolved and verified — see `ship-log-sendco.md`.

---

## Competitor analysis — SENDCO consultation-response tools

**SENCO AI** (reviewed 11 Jul 2026, marketing site) — closest direct competitor to Prototype 1's exact wedge.

**What they cover, that we also cover:** AI-drafted consultation responses (download as Word); EHCP analysis parsing needs/provision/placement; a suitability assessment matching needs against school capability; child profiles synthesising needs from professional reports. Core workflow parity is close — validates the wedge is real, not imagined.

**Worth adopting into our build (folded into Build Log scope):**

- An aggregate "needs matched" score (e.g. their "87%") on the Needs or Draft screen
- Precise EHC section framing (B = needs, F = provision, I = placement) in our copy — verified against IPSEA, see below
- Confirms Settings/School profile is worth building — their suitability assessment explicitly matches against "resources and current cohort," which only works if school capacity data is configured somewhere

**Real gaps — logged as roadmap, not built now (each needs its own validation before touching):**

- Email inbox with auto-forwarding/parsing (real infra, not just a notification feed)
- "Inefficient Education Test" (s.39(4)(b) — cohort impact/resource displacement) — do not build or name without a real legal source or SENCO/education lawyer confirming the framework first
- Banding analysis / funding gap detection — strongest differentiator, arguably a stronger business angle than compliance workload-saving; worth remembering for our own roadmap and Demo Day narrative
- Evidence gathering (Ofsted/web harvesting), Intelligence Briefs, SENCO Chat, full pupil/SEND register tracking — bigger scope than a consultation-response tool. SENCO Chat carries the same legal-accuracy risk as the Inefficient Education Test — needs real sourcing, not a generic LLM guess

**EHC section framework — verified sources (11 Jul 2026):**

- **IPSEA** (registered SEND legal charity) confirms Section B must specify all SEN identified in the EHC needs assessment (CFA 2014 s.37(2)(a); SEND Regs 2014 reg.12(1)(b)), and Section F must specify provision to meet every need in Section B (CFA 2014 s.37(2)(c); reg.12(1)(f)) — provision must be specific and quantified (hours, frequency, who delivers it), not vague. IPSEA lists wording that is NOT legally specific enough: "regular," "access to," "opportunities for," "would benefit from," "as appropriate," "is recommended," "a high level of." Directly usable as a properly-sourced vagueness-flagging feature later.
- IPSEA confirms banding/funding references cannot substitute for specifying actual provision in Section F — provision must be determined first, funding allocated after.
- Section I now confirmed directly via IPSEA (12 Jul 2026): it is the name of the school/institution the child will attend, and the type of institution if none is named yet (SEND Regs 2014, reg.12). If a setting is named in Section I, that school must admit the child (near-universal duty). All three sections (B, F, I) now equally verified from the same authoritative source.
- **Product-accuracy nuance:** Section I only applies to *final* EHC plans — a draft plan cannot name a setting. Our tool operates at the *consultation* stage (LA asking a school "can you meet this child's needs" as part of an EHC needs assessment), which happens *before* a final plan exists. Our copy should reflect that the school's response helps determine the eventual Section I placement — not that it's confirming an already-populated Section I. Small distinction, but one a real SENCO would notice if reversed.
- Full EHC section set (A–K), per IPSEA, for future reference: A (views/aspirations), B (SEN), C (health needs re: SEN), D (social care needs re: SEN/disability), E (outcomes sought), F (special educational provision), G (health provision), H (social care provision), I (placement), J (direct payments), K (copies of all EHC needs assessment advice/evidence).
- Good validation: our current mocked draft response wording (e.g. "4×20 minute sessions per week") already matches the quantified, specific style IPSEA says the law requires — keep this standard as real content gets built.

**Structural learnings from a real EHCP draft (anonymised, reviewed 12 Jul 2026):** reviewed a real draft EHC plan (Early Years, London borough) for structural reference only — no child-identifying details logged here.

- Section B is not a flat need list — it's organised into four consistent domains, each split into Strengths and Needs: (1) Cognition & Learning, (2) Communication/friendships/relationships, (3) Social, Emotional & Mental Health, (4) Physical, Sensory & Independence Skills. **Verified (12 Jul 2026) these map directly onto the statutory "four broad areas of need" set out in the SEND Code of Practice 2015, para 6.27** (Communication and Interaction; Cognition and Learning; Social, Emotional and Mental Health; Sensory and/or Physical) — confirmed via DfE guidance, IPSEA-linked sources, and multiple LA SEND services independently citing the same framework. This is the statutory categorisation, not one school's template — safe to build Templates/Consolidated Needs around it. Note: the Code itself warns these aren't rigid boxes — a child's needs often span more than one area — worth a soft caveat in the UI rather than presenting them as strictly exclusive.
- Section F provision at the level of detail IPSEA said the law requires: numbered, specific points — named session counts/durations, staff ratios, and specific methodologies/approaches per need. Strong real-world reference for writing convincing Templates content later rather than guessing at plausible phrasing.
- Section I was literally blank in this real draft ("Type of Setting / Name of School / Period" all empty) — direct real-world confirmation of the draft-vs-final nuance already logged above: the setting genuinely isn't decided yet at this stage.
- Section K (evidence log) lists report author, profession/team, contact details, and date of advice in a table — good reference for how our "received documents" list should be labelled.

**Data-handling flag:** a real EHCP is special category health data about a named child. As real SENDCO/family validation ramps up, real pupil documents should stay reference-only and reviewed outside the Lovable prototype — it has no real auth/data protection layer yet. Keep the app itself on fictional seed data.
