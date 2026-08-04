# 🌐 Landing Page — Content & Design Spec

> Notion export — 2026-08-03. Source: child page of `Build Log`.
> Named-individual references generalised to role descriptions in two places below, consistent with this page's own "Open items" note: *"Get consent before naming any real contact... anywhere on the public page."* Applying that same rule here, since this repo is public.

**Confirmed name: Unisen.** Domain live at unisen.uk — landing page built in Lovable and deployed (26 Jul, by Mikhail). Content below was the pre-build spec; treat as largely implemented — worth a pass to check the live page against this spec for drift, and to fold in any known issues (see `roadmap-known-issues-sendco.md`).

**Purpose (decided 26 Jul):** Outreach-first, not investor-first. Right now the team is actively messaging SENCOs, LAs, and parent/carer contacts — the page's job is to make a cold/warm outreach link look credible enough that a stressed professional replies or books time. The same single page becomes the Demo Day/investor asset later with minor additions (traction section) — one site, not two builds.

**Scope (decided 26 Jul):** Lead with only the built SENCO consultation-response wedge — what's actually demoable. One short section near the bottom gestures at the fuller three-party vision (family/LA/specialists) as roadmap, clearly labelled as direction-of-travel, not built product. Mirrors the existing Tier 2 backlog instinct ("vision mockup, slides not a build") and the same honesty principle already logged for demos ("Millbrook Primary is fictional, be upfront").

> **SCOPE & LAUNCH UPDATE (2 Aug 2026) — supersedes "SENCO only" above**
>
> **Scope:** the live workspace/build scope is now schools **and families** (not SENCO-only) — full rationale in `idea-validation.md`. Councils and specialists remain the roadmap gesture described in section 8 below — that part of this spec still holds.
>
> **Launch gate:** this page will not go live or be shared externally (including in the Redwood WhatsApp) until the family party-view reaches the same core-feature completeness as the SENCO side — built to prototype standard, not necessarily every future-roadmap item. Until then, treat this as internal work-in-progress reviewed against this spec, not a public asset.
>
> **Drift flagged for the next review pass:** the live hero currently uses a stock park/skyline illustration, not a real product screenshot in a browser-chrome frame as this spec specifies (see Hero section and Visual/design direction below). Worth correcting in the same pass as the copy changes, not treated as separate.

---

## Section-by-section content

**1. Nav**
Logo/wordmark (Unisen) + tagline. Links: Product, For Schools & Councils, About, Contact. Primary CTA: "Book a 15-min walkthrough" — not "Get started/Sign up", since there's no real self-serve access yet (no auth/backend live).

**2. Hero**
- Headline anchored to the statutory clock, e.g. "The 15 days start the moment the letter lands."
- Subhead: one sentence — Unisen turns the EHC consultation response into a guided, evidenced, on-time submission instead of a scramble across email and paper.
- Primary CTA + secondary "See how it works" (scroll anchor)
- Visual: a real screenshot of the built Dashboard or Consultation detail screen in a browser-chrome frame — not a stock illustration. Real screens are a genuine trust signal against AI-tool skepticism.

**3. Problem (3 cards)**
- Evidence scattered across email/post/paper, re-chased manually
- Vague provision wording that fails IPSEA's specificity bar without anyone noticing until too late
- No shared visibility into interlocking statutory clocks across family/school/LA

Keep composite/generic phrasing — don't attribute specific named-contact quotes publicly without their consent, even though the underlying findings (e.g. the AI-hallucination point confirmed by an interviewed EHC Coordinator) are real and can inform the wording.

**4. Solution — three-layer thesis** (direct from `idea-validation.md`)
- Visibility — shared timeline of every party's clock
- Execution assistance — actively helps meet the IPSEA specificity standard, not just track a deadline
- Communication — evidence and requests move on-platform instead of by email/post/phone

This is also the answer to "isn't this just a dashboard" if an investor lands here later.

**5. Trust — "built on the law, not guesses"**
Every legal claim grounded in IPSEA, Children and Families Act 2014, SEND Regs 2014, SEND Code of Practice 2015. State plainly: any AI suggestion strictly cites a source document you uploaded and never invents provision — a direct, named answer to the real hallucination risk an LA source confirmed happens with other tools.

**6. Product screens**
Carousel/grid of real built screens: Dashboard, Consultation detail, Draft response with vagueness-flagging, Letter preview/export. Caption honestly: "shown with fictional seed data during active pilot validation."

**7. Founders / why us**
- Hanad — ML/AI, information retrieval; direct family lived experience navigating the UK SEND/EHC system, not a hypothesised problem
- Husaam — Chartered Accountant, CFA candidate, EY FS Assurance, fintech — business model and ops rigor
- Iylana — outreach/growth/product-marketing lens
- Mikhail — MEng Aerospace, AI/engineering build

Frame as domain-lived-experience + technical depth + ops credibility, not just "students building an app."

**8. Roadmap / vision (short, clearly labelled as not-yet-built)**
One line + simple 4-node diagram (Family–School–Specialist–LA): "Unisen starts with SENCOs. It's built to grow into a shared record for every party in a child's EHC journey." No screenshots of unbuilt parts.

**9. Social proof (add once real)**
Until there's a citable quote/logo with consent: "Currently validating with SENCOs and local authorities across London — want to be one of them?" + CTA.

**10. Contact / CTA**
Form via Tally (already in credits stack): name, role (SENCO / LA / parent-carer / specialist / investor), email, message → feeds into the Stakeholder Outreach Tracker. Small separate line for investors/Redwood so they self-identify without dominating the page.

**11. Footer**
Fictional-data disclaimer, team names, contact email, LinkedIn, GitHub (hanad28).

---

## Visual / design direction

- Palette: calm, high-trust — deep navy/teal base, one warm accent (amber/coral) reserved for CTAs only. Avoid pastel/bubbly consumer-EdTech clichés — audience is stressed professionals (SENCOs, LA officers), not parents shopping for a product.
- Typography: one clean sans-serif (e.g. Inter-style), generous line height, max two weights of hierarchy beyond body text.
- Real product screenshots in browser-chrome frames > illustrations, throughout — signals "this is real and built," which matters more to LA/SENCO trust than polish does.
- Accessibility as a built-in design principle, not just a claim: real colour contrast, visible focus states, icon+label (not colour-only) status affordances — dogfoods the same differentiator already logged as a Tier 2 roadmap item for the app itself.
- Single scrolling page for this version — cheapest to build in Lovable, easiest to revise weekly as positioning moves, avoids maintaining multiple routes this early.
- Must be mobile-responsive (the app itself explicitly isn't yet — outreach contacts will often open this link on a phone).

## Build notes

- Built in Lovable, same as the app prototype. **Live at unisen.uk (26 Jul).**
- Custom domain (unisen.uk) purchased and live. Cloudflare fast-track (hosting/DNS) still to be sorted.
- Contact form via Tally embed, routing submissions into the Stakeholder Outreach Tracker — not yet confirmed as wired up on the live page; check before outreach links go out.

## Live page review (26 Jul)

- Footer currently credits a third-party template site — needs removing before sharing externally.
- Social links (X/LinkedIn/YouTube/GitHub in footer) point to placeholder root domains, not real Unisen accounts.
- "Vagueness checks" listed as a School-tier feature with no visible proof point yet — confirm this maps to real, demoable functionality before Demo Day.
- Pricing (Family free / School £49 / Trust £89) is placeholder, not yet validated with any stakeholder — have an honest answer ready if asked.

## Open items (post-launch)

- ~~Confirm final name/logo with Iylana~~ — done, Unisen confirmed.
- Decide who owns writing final copy vs. this spec, and reconcile any drift between this spec and the live page.
- Get consent before naming any real contact anywhere on the public page — double check the live footer/founders section doesn't name external contacts without consent.
- Remove template-attribution footer link and placeholder social links (see Live page review above).
