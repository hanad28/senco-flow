# 🎯 SEND Idea — Full Detail (Idea 5)

> Notion export — 2026-08-03. Source: child page of `Idea Validation & Hypotheses`.
> Full writeup for the SEND/Autism Navigation Assistant idea — origin, business model, framework score, contacts, and risks. Summary and current thesis live in `idea-validation.md`. Interview scripts for all stakeholder groups are internal (not exported — see note in project README on scope).

---

**Status:** Primary direction — highest personal conviction. Score: 26/30. To be validated with 10+ user interviews before committing to build.

**Independent validation:** an interviewed SENCO/inclusion leader (20 Jul 2026) independently described this exact concept unprompted — parents not knowing what support should be available, what to ask, or where they are in the process — without being pitched.

## MVP scope decision — corrected (21 Jul)

The **core statutory tool** (deadline tracker, document/correspondence analyser, vagueness-flagging against IPSEA's standard, EHC process guidance) is **condition-agnostic by design** — the underlying law (Children and Families Act 2014, SEND Regulations 2014, SEND Code of Practice) applies identically regardless of diagnosis, the same way the SENDCO side's tool works for any pupil's consultation regardless of need type. Gating the core tool behind "autism only" would turn away real families during outreach for no legal or product reason, and risks real trust cost in the exact community this is meant to serve. IPSEA itself works this way — general SEND legal advice for any condition, not autism-specific.

"Autism only, London only" correctly narrows the **depth layer**, not the core tool: specialist directory listings, condition-specific pathway guidance, community peer-matching, and the initial community/outreach focus (Somali community, London boroughs). Anyone outside that scope should still get full access to the statutory tracker and document analyser — just an honest "this pathway isn't tailored to your condition yet" on the deeper, condition-specific features (same Coming Soon honesty pattern used elsewhere in this build).

Rationale (for the depth-layer scoping specifically):

- Autism is Hanad's personal experience — the guidance will be accurate and credible, not researched from the outside
- Autism is the single largest diagnostic category in the SEND system — starting with the biggest segment, not a niche
- Condition-specific depth beats shallow breadth — accurate autism pathway guidance wins against generic SEND content that loses to Google
- London (not West London) gives 33 LAs, a large SEND population, and enough density that the directory and LA intelligence features feel genuinely useful from day one
- The Somali community is spread across multiple London boroughs (Tower Hamlets, Southwark, Ealing, Waltham Forest) — West London alone cuts off a significant portion of the primary user base
- Makes the 8-week build achievable — one condition, one city, done properly for the depth layer, while the core tool serves everyone from day one

Expansion narrative for Demo Day: "The core statutory tool works for any child going through the EHC process — we started deepening it with autism-specific pathway content and London community outreach first, because that's where our lived experience and community access make the content sharpest."

Families navigating the UK SEND/autism diagnosis and support process face a deliberately complex, ambiguous, multi-agency system — compounded by language barriers. Councils send vague, underfunded draft plans; parents who don't push back get locked into inadequate provision, sometimes requiring tribunal action to reverse. The struggle continues from early diagnosis through adulthood, going back and forth with schools and local councils with no end point.

## Origin

Hanad's own family — younger sister with suspected autism, Somali mother facing a language barrier; Hanad got involved because nobody else could explain what was happening. Confirmed by a school SENCO that many families struggle severely with this regardless of background, and that the process is made purposely difficult and ambiguous.

## Why now — the policy tailwind

The government published a SEND White Paper in early 2026 — the biggest reform of the system since 2014. Individual Support Plans (ISPs) are being introduced as a baseline legal plan for all pupils with SEND; children will not need a diagnosis to access support. EHCPs become Tier 4 plans reserved for the most complex needs by 2035. Every family currently in the system is now confused about what happens to their child's existing plan. We are building a navigation tool at the exact moment the entire map is being redrawn.

- 638,700 children with an active EHC plan as of January 2025 — growing 10.8% year on year, every year since 2014
- Only 46.4% of new EHC plans issued within the statutory 20-week timeframe — over half of families being failed on the most basic legal obligation, and most don't know their rights well enough to challenge it
- £4 billion government investment in the reformed system over three years
- ISPs will cover all SEND children — dramatically expanding the addressable market beyond current EHCP holders

## Unfair advantage

Lived experience navigating the system for own family, in a language-barrier context the system actively fails. Community access (Somali community, direct warm introductions to affected families). Existing institutional contact (SENCO). A team without this background cannot walk into this space with the same credibility — for user access or for the Demo Day story.

## The wedge — multilingual from day one

Every existing resource (IPSEA, SENDIASS, Contact a Family, council websites) is English-only, bureaucratic, and built for parents who already know how to navigate institutions. The largest non-English-speaking communities in the UK — Somali, Arabic, Urdu, Bengali, Polish — are the families who struggle most and are most completely abandoned. Built multilingually from day one, starting with Somali, this is a defensible moat a well-funded EdTech startup without our community connections cannot replicate.

## Regulatory risk — and why it is smaller than it looks

We are building a navigation and guidance tool, not a diagnostic or clinical tool. We explain what an EHCP is, what parents are entitled to, which services exist in their area, what to say to the council — closer to Citizens Advice than to an NHS app. We are not storing health records or providing medical opinions. Key rule from day one: do not hold sensitive personal or health data we do not need. Keep the platform informational and directional.

## Product concept — what lives inside it

One place that walks families through the entire SEND journey from the very beginning:

- Stage-by-stage process guidance from first suspicion through to adulthood
- Document and correspondence analyser: covers any document or communication in the family's case — draft EHCP, council letters, LA emails, school responses. For submitted documents: plain-language summary + gap analysis against statutory requirements + specific language to challenge or strengthen. For incoming correspondence: flags if something is legally incorrect, if the council has cited a reason that isn't valid under the Children and Families Act 2014, if a deadline has been missed, or if they are trying to close something they are not legally entitled to close. Tells the family exactly what is wrong and what to say back. IPSEA has a waiting list for this level of advice; this delivers it in real time.
- Statutory deadline tracker: takes the date a family submitted their EHCP request → shows where they should be now, what the LA is legally required to have done, and exactly what to say if a deadline is missed
- Reform explainer layer: translates the 2026 White Paper into plain English specific to the child's current situation (year group, type of plan, diagnosis) — time-limited wedge creating urgent reasons to sign up now
- Directory of specialist schools, local consultation services, and therapists by location
- Community peer layer: connect families going through the same stage, at the same local authority, with the same diagnosis — creates network effects and retention
- AI chatbot for questions at any stage
- Multilingual throughout: Somali, Arabic, Urdu, Bengali, Polish
- Document vault: persistent storage where families upload every letter, email, assessment report, and council response they've ever received. AI indexes the full history so it can surface relevant quotes, dates, and references automatically — the AI always has the child's full picture, not just one document at a time
- AI form-filling and submission assistant: sits with the parent as they fill in a form or draft a submission, pulling from the document vault, suggesting specific language, flagging where they are underselling the child's needs, and checking the output against statutory requirements before anything is submitted
- Submission gap analyser: before anything gets sent to a council or school, the AI reviews it and returns what's missing, what's too vague, what can be strengthened, and what specific evidence from the document vault supports each section
- Communication log: timestamped, searchable record of every interaction with the school, council, and NHS — who said what, on what date, via which channel. Families forget the history; councils count on it. Becomes the evidence base for a tribunal and feeds the correspondence analyser with full context
- Case strength indicator: based on everything in the document vault, the AI gives an ongoing assessment of how strong the family's case is for a given tier of support, and specifically why — gives a realistic read before submission, not after — **note: this specific item is explicitly recommended against in `family-side-requirements.md`; retained here as historical backlog, superseded there**
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

## Business model — ranked by viability in the 8-week window

1. B2B to schools — SENCOs are overwhelmed; a platform families can self-serve on reduces panicked parent calls. Existing SENCO contact is a warm pilot lead, not a cold one.
2. B2B to SENDIASS services — every local authority is legally required to fund one, they are chronically under-resourced, and an AI platform families can self-serve on directly reduces their caseload. Statutory budget, immediate operational problem we solve.
3. Parent carer forums — every LA has one, they are co-producers of the local offer, actively looking for tools to signpost families to. Free partnership route into every LA in the country.
4. Impact and grant funding — Esmée Fairbairn Foundation, Paul Hamlyn Foundation, DfE reform funds. Sits alongside commercial routes; extends runway and adds Demo Day credibility.
5. Freemium for families — free core guidance, paid for AI document review and specialist access. Harder to convert under stress; secondary to institutional routes.
6. Local authority contracts — highest ticket, longest sales cycle. Not realistic for 8 weeks but relevant to the longer narrative.

## Framework score

| Criterion | Score | Notes |
|---|---|---|
| Unfair advantage | 5/5 | Lived experience + community access + existing institutional contact |
| Pain intensity | 5/5 | Child's education and life outcomes at stake |
| Validation speed | 4/5 | Community access makes Week 1 interviews immediate; institutional conversations slightly slower |
| Technical leverage | 3/5 | Strong at MVP (LLM + directory + structured guidance); depth comes later with document analysis and LA personalisation |
| Demoability | 5/5 | Story alone is a hook; product demo shows a parent being guided step by step |
| Market/career upside | 4/5 | 638,700+ active EHC plans, growing 10.8% YoY; politically live; impact-fundable; strong portfolio story |
| **Total** | **26/30** | Highest of the six ideas scored so far |

## Contacts secured

- School SENCO leader
- Head of Haringey Borough SENCO

## Risks to monitor

- Higher-trust, slower-moving build than other ideas — trust-sensitive product for parents of vulnerable children means UI quality matters more than for a productivity tool
- B2B sales cycle to councils/LAs exceeds the 8-week programme window — validate with schools and SENDIASS first
- Key open question for Week 1: do SENCOs see this as their problem to solve, or someone else's? Two SENCO conversations will answer this before a line of code is written

## Teammate requirement

ML/AI and backend covered. Gap is design and frontend. Trust-sensitive product — UI quality matters. Lovable for MVP but need someone who can make UX decisions confidently and sweats the details.
