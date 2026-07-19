# 💡 Idea Validation & Hypotheses

Every idea is a hypothesis until validated with real users. This page tracks the evolution of the problem space — what we believed, what we tested, what the evidence showed.

---

## Working product thesis (SEND/SENDCO direction) — the three layers

**Not just "faster forms," and not just a shared timeline either.** The multiparty platform's actual value has three distinct layers, and the pitch/build should be explicit about which one is being shown at any point:

1. **Visibility** — a shared timeline where each party (family, school, specialists, LA) sees their own obligation and the interlocking statutory clocks (see [[📋 EHC Process — Facts, Roles & Statutory Deadlines]] for the actual deadlines). This is coordination infrastructure — it surfaces what's due and what's overdue, but it doesn't do the work for anyone.
2. **Execution assistance** — actively helping each party fulfil their obligation, not just track it. Already built for the SENCO side (vagueness-flagging against IPSEA's specificity standard, consolidated needs view, "cannot meet" rationale field). Same logic extends to other parties: helping a parent draft their 15-day comment on a draft plan, helping a specialist write advice that meets the Code's "specific and quantifiable" bar instead of vague boilerplate.
3. **Communication / information exchange** — a shared request-and-share layer so evidence, advice, and responses move on-platform instead of by email/post/phone and having to be re-chased. This is what actually protects the 6-week and 15-day clocks in practice, where most of the real-world delay comes from re-requesting things nobody can see were already sent.

**Pitch framing:** the shared timeline is the visible skeleton; execution assistance and information exchange are what make it a daily-use product rather than a dashboard/Gantt chart — this is the answer when an investor asks "isn't this just a dashboard."

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

## Current problem hypothesis

> **Draft (unvalidated — June 2025):** Older diaspora users in the UK (specifically Somali community) face significant friction sending remittances — they rely on physical agents and cash because existing digital apps (WorldRemit, Wise, Dahabshiil) are not designed for users with low digital literacy or low trust in fintech interfaces. The gap is an accessible, trust-first mobile remittance experience.
> 

**Status:** Hypothesis — not yet validated

**Origin:** Hanad's direct observation (grandmother's experience)

**Next step:** 10+ customer interviews before committing to build

---

## Hypothesis log

| # | Hypothesis | How tested | Result | Decision |
| --- | --- | --- | --- | --- |
| H1 | *(Add first hypothesis)* |  |  |  |

---

## Ideas explored

### Idea 1 — Remittance app for older diaspora

**Problem:** Older UK diaspora users struggle with existing digital remittance apps due to interface complexity and trust barriers

**Target user:** Somali community 50+, first smartphone owners

**Existing alternatives:** WorldRemit, Wise, Dahabshiil — all built for digitally comfortable users

**Our edge:** Personal access to community, lived context, ML + fintech credibility

**Voice interface concept:** "Send £50 to mum in Mogadishu"

**Status:** Set aside for now — team chose to explore other avenues first (idea exploration session, June 2026). Kept on record, not eliminated.

**Kill conditions:** If interviews show existing apps are good enough, or market is too small to matter

---

## Wide brainstorm — avenues logged (idea exploration session, not yet scored)

### Idea 2 — Saved-content-to-real-life-action app

**Problem:** People save restaurant/recipe/workout/outfit/event content on TikTok/Instagram and never act on it — no organisation, no resurfacing at the right time or place.

**Inspired by:** Pinit (live competitor — restaurants specifically, shipped after a year of building)

**Possible angles:** generalise beyond food to all saved content types, target a different underserved segment, or sell the content-extraction tech as B2B infra rather than competing as another consumer app

**Our edge:** Genuine personal felt-need; core extraction problem fits Hanad's CV/information-retrieval strength

**Status:** Exploring — felt need confirmed personally, but a direct live competitor exists in the restaurant vertical specifically

### Idea 3 — Cross-field project discovery + AI feedback platform

**Problem:** Job-hunting students/career-switchers don't know what portfolio projects to build, where to find ideas, or how to make them stand out to recruiters.

**Existing alternatives:** Static blog listicles (Dataquest, ProjectPro, etc.) with no filtering, interactivity, or feedback loop; AI portfolio-website builders solve a different problem (presentation, not selection or grading)

**Our edge:** Both team members are living this exact problem right now — instant access to test users (themselves + QMUL cohort)

**Open question:** MVP wedge — catalog/filter vs AI walkthrough vs feedback/grading engine; scope narrow (tech/data/AI) vs broad (all fields)

**Status:** Exploring — genuine whitespace identified, monetisation unproven

### Idea 4 — AI literacy/adoption platform for local small businesses

**Problem:** Local businesses sense AI could help them but don't understand what it is, how it applies to their business, or how to set it up.

**Concept:** Subscription app/website teaching AI basics in plain language, mapped to practical use cases and setup guidance for their specific business

**Status:** Exploring — not yet scored

### Idea 5 — SEND/Autism Navigation Assistant

**Status:** Primary direction — highest personal conviction. Score: 26/30. To be validated with 10+ user interviews before committing to build.

**Discussed with:** Iylana James (June 24) — positive reception, no objections raised.

**MVP scope decision**

Start narrow: autism only, London only. Expand to other conditions (ADHD, dyslexia, physical disability, speech and language) and other geographies in later iterations.

Rationale:

- Autism is Hanad's personal experience — the guidance will be accurate and credible, not researched from the outside
- Autism is the single largest diagnostic category in the SEND system — starting with the biggest segment, not a niche
- Condition-specific depth beats shallow breadth — accurate autism pathway guidance wins against generic SEND content that loses to Google
- London (not West London) gives 33 LAs, a large SEND population, and enough density that the directory and LA intelligence features feel genuinely useful from day one
- The Somali community is spread across multiple London boroughs (Tower Hamlets, Southwark, Ealing, Waltham Forest) — West London alone cuts off a significant portion of the primary user base
- Makes the 8-week build achievable — one condition, one city, done properly

Expansion narrative for Demo Day: "We started with autism in London. The same architecture works for every condition and every geography — autism was the wedge because it's the largest single category and the one we know most deeply."

Families navigating the UK SEND/autism diagnosis and support process face a deliberately complex, ambiguous, multi-agency system — compounded by language barriers. Councils send vague, underfunded draft plans; parents who don't push back get locked into inadequate provision, sometimes requiring tribunal action to reverse. The struggle continues from early diagnosis through adulthood, going back and forth with schools and local councils with no end point.

**Origin**

Hanad's own family — younger sister with suspected autism, Somali mother facing a language barrier; Hanad got involved because nobody else could explain what was happening. Confirmed by a school SENCO that many families struggle severely with this regardless of background, and that the process is made purposely difficult and ambiguous.

**Why now — the policy tailwind**

The government published a SEND White Paper in early 2026 — the biggest reform of the system since 2014. Individual Support Plans (ISPs) are being introduced as a baseline legal plan for all pupils with SEND; children will not need a diagnosis to access support. EHCPs become Tier 4 plans reserved for the most complex needs by 2035. Every family currently in the system is now confused about what happens to their child's existing plan. We are building a navigation tool at the exact moment the entire map is being redrawn.

- 638,700 children with an active EHC plan as of January 2025 — growing 10.8% year on year, every year since 2014
- Only 46.4% of new EHC plans issued within the statutory 20-week timeframe — over half of families being failed on the most basic legal obligation, and most don't know their rights well enough to challenge it
- £4 billion government investment in the reformed system over three years
- ISPs will cover all SEND children — dramatically expanding the addressable market beyond current EHCP holders

**Unfair advantage**

Lived experience navigating the system for own family, in a language-barrier context the system actively fails. Community access (Somali community, direct warm introductions to affected families). Existing institutional contact (SENCO). A team without this background cannot walk into this space with the same credibility — for user access or for the Demo Day story.

**The wedge — multilingual from day one**

Every existing resource (IPSEA, SENDIASS, Contact a Family, council websites) is English-only, bureaucratic, and built for parents who already know how to navigate institutions. The largest non-English-speaking communities in the UK — Somali, Arabic, Urdu, Bengali, Polish — are the families who struggle most and are most completely abandoned. Built multilingually from day one, starting with Somali, this is a defensible moat a well-funded EdTech startup without our community connections cannot replicate.

**Regulatory risk — and why it is smaller than it looks**

We are building a navigation and guidance tool, not a diagnostic or clinical tool. We explain what an EHCP is, what parents are entitled to, which services exist in their area, what to say to the council — closer to Citizens Advice than to an NHS app. We are not storing health records or providing medical opinions. Key rule from day one: do not hold sensitive personal or health data we do not need. Keep the platform informational and directional.

**Product concept — what lives inside it**

One place that walks families through the entire SEND journey from the very beginning:

- Stage-by-stage process guidance from first suspicion through to adulthood
- Document and correspondence analyser: covers any document or communication in the family's case — draft EHCP, council letters, LA emails, school responses. For submitted documents: plain-language summary + gap analysis against statutory requirements + specific language to challenge or strengthen. For incoming correspondence: flags if something is legally incorrect, if the council has cited a reason that isn't valid under the Children and Families Act 2014, if a deadline has been missed, or if they are trying to close something they are not legally entitled to close. Tells the family exactly what is wrong and what to say back. IPSEA has a waiting list for this level of advice; this delivers it in real time. Directly in Hanad's NLP/IR lane.
- Statutory deadline tracker: takes the date a family submitted their EHCP request → shows where they should be now, what the LA is legally required to have done, and exactly what to say if a deadline is missed
- Reform explainer layer: translates the 2026 White Paper into plain English specific to the child's current situation (year group, type of plan, diagnosis) — time-limited wedge creating urgent reasons to sign up now
- Directory of specialist schools, local consultation services, and therapists by location
- Community peer layer: connect families going through the same stage, at the same local authority, with the same diagnosis — creates network effects and retention
- AI chatbot for questions at any stage
- Multilingual throughout: Somali, Arabic, Urdu, Bengali, Polish
- Document vault: persistent storage where families upload every letter, email, assessment report, and council response they've ever received. AI indexes the full history so it can surface relevant quotes, dates, and references automatically — the AI always has the child's full picture, not just one document at a time
- AI form-filling and submission assistant: sits with the parent as they fill in a form or draft a submission, pulling from the document vault, suggesting specific language, flagging where they are underselling the child's needs, and checking the output against statutory requirements before anything is submitted
- Submission gap analyser: before anything gets sent to a council or school, the AI reviews it and returns what's missing, what's too vague, what can be strengthened, and what specific evidence from the document vault supports each section
- Document and correspondence analyser: covers any document or communication — draft EHCP, council letters, LA emails, school responses. For submitted documents: plain-language summary + gap analysis against statutory requirements + specific language to challenge or strengthen. For incoming correspondence: flags if something is legally incorrect, if the council has cited a reason that isn't valid under the Children and Families Act 2014, if a deadline has been missed, or if they are trying to close something they are not legally entitled to close. Tells the family exactly what is wrong and what to say back
- Communication log: timestamped, searchable record of every interaction with the school, council, and NHS — who said what, on what date, via which channel. Families forget the history; councils count on it. Becomes the evidence base for a tribunal and feeds the correspondence analyser with full context
- Case strength indicator: based on everything in the document vault, the AI gives an ongoing assessment of how strong the family's case is for a given tier of support, and specifically why — gives a realistic read before submission, not after
- Pattern detection across correspondence: if the council uses the same delaying tactic or the same invalid reason multiple times, the platform flags it with the specific legal basis for challenging it. Councils rely on families not noticing patterns across months of correspondence
- Expert escalation and consultation: clear pathway to a real human — pro bono solicitor, trained SENDIASS advisor, or a peer family who has been through the same LA and won. Triage layer so the AI handles what it can and routes upward when it can't
- Ongoing updates feed: filtered, plain-language feed of anything that matters — new government guidance, tribunal precedents, LA policy changes, deadline shifts — curated to what's relevant to the child's specific situation and stage
- Condition-specific pathways: tailored journeys for autism, ADHD, physical disability, speech and language needs — each has different assessment routes, specialists, entitlements, and language. Generic SEND guidance is the baseline; condition-specific pathways are meaningfully more useful and build trust
- Annual review preparation tool: checklist, AI-assisted drafting, and a reminder that fires before the annual review date. Documents how the child's needs have changed, what provision isn't working, what to push for in the next cycle. Creates a recurring reason to return to the platform every year
- Transition planner: stage-specific guidance that activates at the four critical transition points — Early Years to Primary, Primary to Secondary, Secondary to Post-16, Post-16 to adulthood. Each transition changes the rules, deadlines, and entitlements entirely, and is a moment of maximum confusion and maximum risk of falling through the gap
- Tribunal preparation module: guided preparation for SEND Tribunal appeals — organising evidence, structuring the argument, understanding the process, connecting to legal support. Turns the platform from a navigation tool into a full advocacy tool
- Template letter library: pre-written, legally robust letters for the most common situations — requesting an EHC needs assessment, challenging a refusal, requesting an urgent review, escalating a complaint to the Local Government Ombudsman. AI personalises each one using the document vault
- Jargon buster: inline, contextual definitions of every acronym and piece of technical language. When a council email references Section 37, Graduated Approach, or Targeted Plus, the platform explains it in plain English in context. Critical for the multilingual use case
- Local authority intelligence: anonymised, crowdsourced data on how different LAs handle SEND cases — which councils refuse most often, which are consistently late, which respond well to specific approaches. Unique data asset that builds over time and gives families a realistic picture before they begin
- Specialist directory with verified reviews: not just a map of educational psychologists and speech therapists, but reviews from families on which specialists write reports councils accept and which have waiting lists worth joining
- Child and young person version: age-appropriate version for older children and teenagers with SEND to understand their own plan, their own rights, and their own future. EHCPs cover up to age 25 — the young person becomes increasingly central to the process and no existing resource speaks to them directly
- SENCO dashboard (B2B layer): dedicated interface for SENCOs to track which families are at which stage, flag which need urgent attention, and see which families have used the platform and are coming in better informed. Justifies a school subscription as a caseload management tool, not just a signposting service

**Business model — ranked by viability in the 8-week window**

1. B2B to schools — SENCOs are overwhelmed; a platform families can self-serve on reduces panicked parent calls. Existing SENCO contact is a warm pilot lead, not a cold one.
2. B2B to SENDIASS services — every local authority is legally required to fund one, they are chronically under-resourced, and an AI platform families can self-serve on directly reduces their caseload. Statutory budget, immediate operational problem we solve.
3. Parent carer forums — every LA has one, they are co-producers of the local offer, actively looking for tools to signpost families to. Free partnership route into every LA in the country.
4. Impact and grant funding — Esmée Fairbairn Foundation, Paul Hamlyn Foundation, DfE reform funds. Sits alongside commercial routes; extends runway and adds Demo Day credibility.
5. Freemium for families — free core guidance, paid for AI document review and specialist access. Harder to convert under stress; secondary to institutional routes.
6. Local authority contracts — highest ticket, longest sales cycle. Not realistic for 8 weeks but relevant to the longer narrative.

**Framework score**

| Criterion | Score | Notes |
| --- | --- | --- |
| Unfair advantage | 5/5 | Lived experience + community access + existing institutional contact |
| Pain intensity | 5/5 | Child's education and life outcomes at stake |
| Validation speed | 4/5 | Community access makes Week 1 interviews immediate; institutional conversations slightly slower |
| Technical leverage | 3/5 | Strong at MVP (LLM + directory + structured guidance); depth comes later with document analysis and LA personalisation |
| Demoability | 5/5 | Story alone is a hook; product demo shows a parent being guided step by step |
| Market/career upside | 4/5 | 638,700+ active EHC plans, growing 10.8% YoY; politically live; impact-fundable; strong portfolio story |
| **Total** | **26/30** | Highest of the six ideas scored so far |

**Contacts secured**

- School SENCO leader
- Head of Haringey Borough SENCO

**Risks to monitor**

- Higher-trust, slower-moving build than other ideas — trust-sensitive product for parents of vulnerable children means UI quality matters more than for a productivity tool
- B2B sales cycle to councils/LAs exceeds the 8-week programme window — validate with schools and SENDIASS first
- Key open question for Week 1: do SENCOs see this as their problem to solve, or someone else's? Two SENCO conversations will answer this before a line of code is written

**Teammate requirement**

ML/AI and backend covered. Gap is design and frontend. Trust-sensitive product — UI quality matters. Lovable for MVP but need someone who can make UX decisions confidently and sweats the details.

**Customer interview questions — parents and carers**

- Can you walk me through what happened when you first realised something might be different about your child — what did you do first?
- What was the most confusing part of the process in the early stages?
- When you needed to understand what you were entitled to, where did you go? What did you actually do?
- Has there ever been a moment where you felt the school or council wasn't giving your child what they should be getting — what did you do about it?
- What's the hardest thing about the process right now — not the beginning, but where you are today?
- Has anyone or anything actually helped you navigate this — what was it and why did it help?
- How much time would you say you've spent on this in the last month — not appointments, just researching, writing emails, trying to figure out what to do?
- Has anyone in your family or community been through this before you? Did you lean on them?

**Customer interview questions — SENCOs**

- When a new family comes to you at the very start, what do you tell them to do? What resources do you point them to?
- What proportion of your time goes on supporting families with the process itself, rather than the child's actual education needs?
- What's the most common misunderstanding families come in with?
- Have you ever had a family who really struggled because English wasn't their first language — what happened?
- Are there resources you wish existed that you could send families to, so they came to you better informed?
- If a platform existed that families could self-serve on, would that reduce your workload or create more questions?
- What would make you trust something enough to recommend it to a family you're responsible for?

**End every interview with:** Is there anyone else you think I should speak to about this?

### Idea 6 — Hackathons/events/talks finder

**Problem:** Hard to quickly find what's on tonight (talks, hackathons, conferences) filtered by criteria like free/location.

**Origin:** Already prototyped informally as a personal Claude routine before a hackathon.

**Status:** Exploring — lowest conviction of the six

### Idea 7 — Sustainability / AI's environmental and information footprint

**Problem:** Not yet defined. Sparked by an MSc ethics module lecture covering AI's carbon and water footprint, and "AI slop" / information pollution. Sustainability is a broader passion area independent of AI specifically.

**Status:** Seed only — no specific problem or user identified yet

---

## Pivot log

*(Record any pivots here — what triggered the pivot, what we moved to, why)*

**Pivot — SEND, family-first → SENDCO-first platform (early Jul 2026):** Team decided to explore the SEND problem space via a platform connecting all parties (councils, schools, families, health professionals) rather than the family-only Navigation Assistant scored below. Starting scope narrowed to SENDCOs only for Week 1: many schools = many reachable SENDCOs for validation/LOIs, and SENDCOs are a known, stretched, existing-problem user group. First testable wedge: the statutory EHC consultation-response burden (schools have **at least 15 calendar days**, not working days — see correction below — to respond to LA-issued EHC needs assessments, currently manual across scattered reports/appendices). Full build reasoning, prototype scope, and feature decisions logged on [[🛠️ Build Log]] — this page's Idea 5 (family-facing Navigation Assistant) remains valid future scope, not discarded.

---

## ⚠️ Major correction (12 Jul 2026) — the deadline is 15 CALENDAR days, not working days

This was wrong from the original prompt onward and had been built into the Dashboard, Consultation detail, Needs/Draft/Letter copy, and the Calendar screen. **Confirmed via multiple independent sources, including IPSEA (our established source throughout this build) and the primary legislation itself:**

- Statutory basis: Children and Families Act 2014, s.39(6) — LA must consult the school before naming it in a plan. The specific day count is set out in the SEND Code of Practice, para 9.83.
- IPSEA directly: "Your LA should give them 15 days to respond" — no "working" qualifier, anywhere.
- Essex SEND IASS and a Local Government Ombudsman decision (case 23 004 539) both cite the identical duty using plain "15 days"/"15 calendar days," never "working days."
- It is consistently framed as **"at least 15 days"** — a statutory minimum the LA can extend, not a hard single number.

**Practical impact:** a calendar-day count runs faster than a working-day count — the app has been showing SENDCOs more time than they actually have, which is a serious direction to be wrong in for a legal-deadline tool. The bank holiday fix (11 Jul) solved the right problem for the wrong count — the underlying logic isn't wasted, but it needs to apply to a simple calendar-day calculation now (bank holidays/weekends stop being exclusions).

**Status:** Lovable is being asked to audit every instance of "working day" logic/copy across the app before a comprehensive fix is written. Update this section once resolved.

---

## Competitor analysis — SENDCO consultation-response tools

**SENCO AI** (reviewed 11 Jul 2026, marketing site) — closest direct competitor to Prototype 1's exact wedge.

**What they cover, that we also cover:** AI-drafted consultation responses (download as Word); EHCP analysis parsing needs/provision/placement; a suitability assessment matching needs against school capability; child profiles synthesising needs from professional reports. Core workflow parity is close — validates the wedge is real, not imagined.

**Worth adopting into our build (now folded into Build Log scope):**

- An aggregate "needs matched" score (e.g. their "87%") on the Needs or Draft screen
- Precise EHC section framing (B = needs, F = provision, I = placement) in our copy — verified against IPSEA, see below
- Confirms Settings/School profile is worth building — their suitability assessment explicitly matches against "resources and current cohort," which only works if school capacity data is configured somewhere

**Real gaps — logged as roadmap, not built now (each needs its own validation before touching):**

- Email inbox with auto-forwarding/parsing (real infra, not just a notification feed)
- "Inefficient Education Test" (s.39(4)(b) — cohort impact/resource displacement) — do not build or name without a real legal source or SENCO/education lawyer confirming the framework first
- Banding analysis / funding gap detection — their strongest differentiator, arguably a stronger business angle than compliance workload-saving; worth remembering for our own roadmap and Demo Day narrative
- Evidence gathering (Ofsted/web harvesting), Intelligence Briefs, SENCO Chat, full pupil/SEND register tracking — bigger scope than a consultation-response tool. SENCO Chat carries the same legal-accuracy risk as the Inefficient Education Test — needs real sourcing, not a generic LLM guess

**EHC section framework — verified sources (11 Jul 2026):**

- **IPSEA** (registered SEND legal charity) confirms Section B must specify all SEN identified in the EHC needs assessment (CFA 2014 s.37(2)(a); SEND Regs 2014 reg.12(1)(b)), and Section F must specify provision to meet every need in Section B (CFA 2014 s.37(2)(c); reg.12(1)(f)) — provision must be specific and quantified (hours, frequency, who delivers it), not vague. IPSEA lists wording that is NOT legally specific enough: "regular," "access to," "opportunities for," "would benefit from," "as appropriate," "is recommended," "a high level of." Directly usable as a properly-sourced vagueness-flagging feature later.
- IPSEA confirms banding/funding references cannot substitute for specifying actual provision in Section F — provision must be determined first, funding allocated after.
- Section I now confirmed directly via IPSEA (12 Jul 2026): it is the name of the school/institution the child will attend, and the type of institution if none is named yet (SEND Regs 2014, reg.12). If a setting is named in Section I, that school must admit the child (near-universal duty). All three sections (B, F, I) now equally verified from the same authoritative source.
- **Product-accuracy nuance:** Section I only applies to *final* EHC plans — a draft plan cannot name a setting. Our tool operates at the *consultation* stage (LA asking a school "can you meet this child's needs" as part of an EHC needs assessment), which happens *before* a final plan exists. Our copy should reflect that the school's response helps determine the eventual Section I placement — not that it's confirming an already-populated Section I. Small distinction, but one a real SENCO would notice if reversed.
- Full EHC section set (A–K), per IPSEA, for future reference (e.g. if the family-facing document/correspondence analyser from Idea 5 gets built): A (views/aspirations), B (SEN), C (health needs re: SEN), D (social care needs re: SEN/disability), E (outcomes sought), F (special educational provision), G (health provision), H (social care provision), I (placement), J (direct payments), K (copies of all EHC needs assessment advice/evidence).
- Good validation: our current mocked draft response wording (e.g. "4×20 minute sessions per week") already matches the quantified, specific style IPSEA says the law requires — keep this standard as real content gets built.

**Structural learnings from a real EHCP draft (anonymised, reviewed 12 Jul 2026):** reviewed a real draft EHC plan (Early Years, London borough) for structural reference only — no child-identifying details logged here.

- Section B is not a flat need list — it's organised into four consistent domains, each split into Strengths and Needs: (1) Cognition & Learning, (2) Communication/friendships/relationships, (3) Social, Emotional & Mental Health, (4) Physical, Sensory & Independence Skills. **Verified (12 Jul 2026) these map directly onto the statutory "four broad areas of need" set out in the SEND Code of Practice 2015, para 6.27** (Communication and Interaction; Cognition and Learning; Social, Emotional and Mental Health; Sensory and/or Physical) — confirmed via DfE guidance, IPSEA-linked sources, and multiple LA SEND services independently citing the same framework. This is the statutory categorisation, not one school's template — safe to build Templates/Consolidated Needs around it. Note: the Code itself warns these aren't rigid boxes — a child's needs often span more than one area — worth a soft caveat in the UI rather than presenting them as strictly exclusive.
- Section F provision at the level of detail IPSEA said the law requires: numbered, specific points — named session counts/durations, staff ratios, and specific methodologies/approaches per need. Strong real-world reference for writing convincing Templates content later rather than guessing at plausible phrasing.
- Section I was literally blank in this real draft ("Type of Setting / Name of School / Period" all empty) — direct real-world confirmation of the draft-vs-final nuance already logged above: the setting genuinely isn't decided yet at this stage.
- Section K (evidence log) lists report author, profession/team, contact details, and date of advice in a table — good reference for how our "received documents" list should be labelled.

**Data-handling flag for next week:** a real EHCP is special category health data about a named child. As real SENDCO/family validation ramps up, real pupil documents should stay reference-only and reviewed outside the Lovable prototype — it has no real auth/data protection layer yet. Keep the app itself on fictional seed data.

---

## Validation principles

- Talk to real users before writing a line of code
- A problem is only real if users describe it unprompted
- Willingness to pay is stronger signal than enthusiasm
- Hanad's community access is an asset — use it

H.Atq Brainstorm

📋 EHC Process — Facts, Roles & Statutory Deadlines