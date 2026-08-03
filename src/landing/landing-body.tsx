import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/site";
import { FileSearch, Languages } from "lucide-react";
import EnquiryDialog from "./components/enquiry-dialog";
import { DashboardMock } from "./components/dashboard-mocks";
import FooterSection2 from "./sections/footer-section2";

const PROBLEMS = [
  {
    tag: "Evidence",
    title: "The evidence is scattered",
    body: "Reports, forms, emails and parent views are re-chased by hand, making it difficult to see what has already been received.",
    impact: "Gaps re-emerge late",
    graphic: "scattered" as const,
  },
  {
    tag: "Wording",
    title: "Vague wording slips through",
    body: "Phrases such as “access to support as needed” can leave provision without clear frequency, duration or responsibility.",
    impact: "Provision is unenforceable",
    graphic: "wording" as const,
  },
  {
    tag: "Deadlines",
    title: "The clocks are hard to see",
    body: "Schools and families work to different statutory stages without one clear view of what is due and what happens next.",
    impact: "Statutory dates are missed",
    graphic: "deadlines" as const,
  },
];

const PILLARS = [
  {
    title: "Visibility",
    body: "Each workspace makes the relevant statutory dates, responsibilities and next steps visible in one place.",
    href: "#product",
    cta: "Learn about visibility",
    mock: "clock" as const,
  },
  {
    title: "Execution assistance",
    body: "Unisen helps users review the evidence, identify gaps and prepare clearer work, rather than only showing a deadline.",
    href: "#product",
    cta: "Learn about execution assistance",
    mock: "evidence" as const,
  },
  {
    title: "Communication",
    body: "Evidence and responses move on-platform instead of through email, post, and phone, so every party works from the same record.",
    href: "#product",
    cta: "Learn about communication",
    mock: "draft" as const,
  },
];

/** Product-page-style capability trios (Cursor never dumps 12 equal cards on /). */
const SCHOOL_CAPABILITIES = [
  {
    title: "Grounded in the legal standard",
    body: "Every flag traces to IPSEA and the actual legislation, never a guess.",
  },
  {
    title: "Consultation to sent response, in one flow",
    body: "From the consultation letter to the submitted response without switching tools.",
  },
  {
    title: "Never lose track of a deadline",
    body: "Across the whole caseload, calendar days not working days.",
  },
];

const FAMILY_CAPABILITIES = [
  {
    title: "See what is missing, vague, or inconsistent",
    body: "Before you respond, not after — flagged against IPSEA specificity.",
  },
  {
    title: "Ask about the plan in your own language",
    body: "Every answer backed by a citation back to the actual document.",
  },
  {
    title: "A response ready to send",
    body: "In English and your own language, side by side.",
  },
];

const ROADMAP_CURRENT = [
  {
    title: "Schools",
    body: "SENCOs answer LA EHC consultations within the 15-day window, with evidence, needs review, and response drafting in one place.",
  },
  {
    title: "Families",
    body: "Parent carers review draft EHC plans section by section, flag vague provision, and prepare a structured response.",
  },
];

const ROADMAP_FUTURE = [
  {
    title: "Specialists",
    body: "EP, SaLT, OT, and other professionals share quantified advice on-platform, tied to the case clock.",
  },
  {
    title: "Local authorities",
    body: "LA teams issue consultations, track school responses against statutory clocks, and reduce chasing for missing evidence.",
  },
];

const LEGAL_SOURCES = [
  "Children and Families Act 2014",
  "SEND Regulations 2014",
  "SEND Code of Practice 2015",
  "IPSEA guidance",
];

/** Visual mockups for the Problem section — each shows the failure mode. */
function ProblemGraphic({ kind }: { kind: "scattered" | "wording" | "deadlines" }) {
  if (kind === "scattered") {
    return (
      <div className="relative h-32 overflow-hidden rounded-[4px] bg-[#f7fafc]">
        <div className="absolute left-3 top-4 h-14 w-20 rotate-[-4deg] rounded-[4px] border border-[#cfe2ec] bg-white p-2 shadow-sm">
          <div className="h-1 w-full rounded-full bg-[#cfe2ec]" />
          <div className="mt-1 h-1 w-3/4 rounded-full bg-[#e6f0f5]" />
          <div className="mt-1 h-1 w-1/2 rounded-full bg-[#e6f0f5]" />
        </div>
        <div className="absolute right-4 top-3 h-14 w-24 rotate-[3deg] rounded-[4px] border border-[#cfe2ec] bg-white p-2 shadow-sm">
          <div className="h-1 w-full rounded-full bg-[#cfe2ec]" />
          <div className="mt-1 h-1 w-2/3 rounded-full bg-[#e6f0f5]" />
          <div className="mt-1 h-1 w-4/5 rounded-full bg-[#e6f0f5]" />
        </div>
        <div className="absolute bottom-3 left-1/2 h-12 w-28 -translate-x-1/2 rotate-[-1deg] rounded-[4px] border border-[#cfe2ec] bg-white p-2 shadow-sm">
          <div className="h-1 w-full rounded-full bg-[#cfe2ec]" />
          <div className="mt-1 h-1 w-3/5 rounded-full bg-[#e6f0f5]" />
        </div>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 128" fill="none" preserveAspectRatio="none">
          <path d="M 40 30 Q 80 50 100 90" stroke="#b8d4e0" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 160 25 Q 120 55 100 90" stroke="#b8d4e0" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>
    );
  }

  if (kind === "wording") {
    return (
      <div className="h-32 overflow-hidden rounded-[4px] bg-[#f7fafc] p-4">
        <div className="mx-auto max-w-[14rem] rounded-[4px] border border-[#cfe2ec] bg-white p-3">
          <div className="mb-2 text-[10px] font-medium uppercase tracking-wide text-[#8aa]">
            Section B: Provision
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-[#e6f0f5]" />
            <div className="h-1.5 w-4/5 rounded-full bg-[#e6f0f5]" />
            <div className="inline-block rounded bg-[#fff3cd] px-1 py-0.5 text-[10px] text-[#8a6d00]">
              &ldquo;access to support as needed&rdquo;
            </div>
            <div className="h-1.5 w-3/4 rounded-full bg-[#e6f0f5]" />
            <div className="h-1.5 w-2/3 rounded-full bg-[#e6f0f5]" />
          </div>
          <div className="mt-3 flex items-center gap-1 border-t border-[#f0d0d0] pt-2 text-[10px] text-[#c44]">
            <span className="text-[#c44]">⚠</span> No frequency · No duration · No owner
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-32 overflow-hidden rounded-[4px] bg-[#f7fafc] p-4">
      <div className="flex h-full flex-col gap-2">
        <div className="flex items-center justify-between text-[10px] text-[#8aa]">
          <span>School calendar</span>
          <span>Family calendar</span>
        </div>
        <div className="relative flex-1">
          <div className="absolute left-0 top-2 flex w-full items-center gap-1">
            <div className="h-1.5 w-1/4 rounded-full bg-[#cfe2ec]" />
            <div className="h-2 w-2 shrink-0 rounded-full bg-[#3b8ac1]" />
            <div className="h-1.5 flex-1 rounded-full bg-[#cfe2ec]" />
            <div className="h-2 w-2 shrink-0 rounded-full border-2 border-[#c44] bg-white" />
          </div>
          <div className="absolute bottom-2 left-0 flex w-full items-center gap-1">
            <div className="h-1.5 w-1/3 rounded-full bg-[#cfe2ec]" />
            <div className="h-2 w-2 shrink-0 rounded-full border-2 border-[#c44] bg-white" />
            <div className="h-1.5 flex-1 rounded-full bg-[#cfe2ec]" />
            <div className="h-2 w-2 shrink-0 rounded-full bg-[#3b8ac1]" />
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[4px] bg-[#fde8e8] px-2 py-1 text-[10px] font-medium text-[#c44]">
            15-day window missed
          </div>
        </div>
      </div>
    </div>
  );
}

function FamilyWorkspacePreview() {
  return (
    <div className="flex h-full min-h-[22rem] overflow-hidden bg-[#f7fafc] text-[#244a70] lg:min-h-[28rem]">
      <aside className="hidden w-32 shrink-0 bg-[#1c2f45] p-4 text-white sm:block">
        <div className="flex items-center gap-2 text-sm font-bold">
          <img src="/favicon.ico" alt="" className="h-5 w-5" />
          Unisen
        </div>
        <p className="mt-8 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/45">
          Family workspace
        </p>
        <div className="mt-3 space-y-1 text-xs text-white/60">
          <p className="rounded-md bg-white/10 px-2 py-2 text-white">Plan review</p>
          <p className="px-2 py-2">Issues</p>
          <p className="px-2 py-2">Documents</p>
          <p className="px-2 py-2">Response</p>
        </div>
      </aside>
      <div className="min-w-0 flex-1 p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#d7e4ec] pb-5">
          <div>
            <p className="text-xs font-semibold text-[#607586]">Draft EHC plan</p>
            <h4 className="mt-1 text-lg font-bold">Review your plan section by section</h4>
          </div>
          <span className="rounded-full bg-[#fff1bf] px-3 py-1 text-xs font-bold text-[#7a5a00]">
            11 days left
          </span>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[4px] border border-[#cfe2ec] bg-white p-4">
            <p className="text-xs text-[#607586]">Sections reviewed</p>
            <p className="mt-2 text-2xl font-bold">7 of 11</p>
          </div>
          <div className="rounded-[4px] border border-[#f1d48b] bg-[#fffaf0] p-4">
            <p className="text-xs text-[#7a6541]">Issues to check</p>
            <p className="mt-2 text-2xl font-bold text-[#725315]">4</p>
          </div>
          <div className="rounded-[4px] border border-[#bfe0d1] bg-[#f3fbf7] p-4">
            <p className="text-xs text-[#527262]">Sources linked</p>
            <p className="mt-2 text-2xl font-bold text-[#315e49]">9</p>
          </div>
        </div>
        <div className="mt-4 rounded-[4px] border border-[#cfe2ec] bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#3b8ac1]">
                Section F
              </p>
              <p className="mt-1 text-sm font-bold">Special educational provision</p>
            </div>
            <span className="rounded-full bg-[#fff1bf] px-2.5 py-1 text-[0.68rem] font-bold text-[#7a5a00]">
              Needs attention
            </span>
          </div>
          <div className="mt-4 rounded-[4px] bg-[#f7fafc] p-3 text-xs leading-5 text-[#536572]">
            “Access to regular adult support as appropriate.”
          </div>
          <div className="mt-3 flex items-start gap-2 rounded-[4px] border border-[#f1d48b] bg-[#fffaf0] p-3 text-xs leading-5 text-[#725315]">
            <FileSearch className="mt-0.5 h-4 w-4 shrink-0" />
            <span>Check whether frequency, duration and who delivers the support are clear.</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#607586]">
          <span className="inline-flex items-center gap-1.5">
            <Languages className="h-4 w-4" /> Interface available in five languages
          </span>
          <span className="font-bold text-[#287fb4]">Continue review</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Landing body — section shells copied from cursor.com (structure + rhythm),
 * Unisen copy, tokens, and product mocks.
 */
export default function UnisenBody() {
  return (
    <>
      <div className="block landing-body w-full" id="landing-main">
        <div className="relative flex min-h-0 w-full flex-col content-center items-center justify-start overflow-x-clip bg-background">

          {/* ── Problem ← Cursor “The new way to build software.” ─────────── */}
          <section
            className="cursor-section overflow-hidden bg-white"
            aria-labelledby="problem-heading"
          >
            <div className="cursor-container">
              <div className="cursor-prose-medium-wide cursor-mb-v2_5 mx-auto text-center">
                <h2 id="problem-heading" className="cursor-type-lg text-balance mx-auto">
                  Critical EHC work is still held together by inboxes, documents and memory.
                </h2>
              </div>
              <div className="cursor-gap grid grid-cols-1 items-stretch md:grid-cols-2 lg:grid-cols-3">
                {PROBLEMS.map((problem) => (
                  <div key={problem.tag} className="h-full">
                    <div className="cursor-card">
                      <figure className="flex h-full flex-col">
                        <h3 className="cursor-type-base">{problem.title}</h3>
                        <p className="cursor-type-sm mt-2 text-pretty">{problem.body}</p>
                        <div className="mt-4 grow overflow-hidden">
                          <ProblemGraphic kind={problem.graphic} />
                        </div>
                        <p className="cursor-type-sm mt-auto pt-4 text-[var(--action-primary)]">
                          → {problem.impact}
                        </p>
                      </figure>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Approach ← Cursor “Stay on the frontier” ──────────────────── */}
          <section
            className="cursor-section cursor-section--tint"
            aria-labelledby="approach-heading"
          >
            <div className="cursor-container">
              <div className="cursor-prose-narrow cursor-mb-v1 text-left">
                <h2 id="approach-heading" className="cursor-type-md text-balance">
                  Stay on top of the work
                </h2>
              </div>
              <div className="cursor-gap grid grid-cols-1 items-stretch xl:grid-cols-3">
                {PILLARS.map(({ title, body, href, cta, mock }) => (
                  <div key={title} className="h-full">
                    <div className="cursor-card cursor-card--on-tint flex h-full grow flex-col">
                      <div className="cursor-prose flex grow flex-col">
                        <h3 className="cursor-type-base">{title}</h3>
                        <p className="cursor-type-sm mt-2 text-pretty">{body}</p>
                        <div className="cursor-mt-link mt-auto">
                          <a href={href} className="cursor-btn-tertiary">
                            {cta} →
                          </a>
                        </div>
                      </div>
                      <figure className="cursor-pt-media">
                        <div className="cursor-media">
                          <DashboardMock kind={mock} />
                        </div>
                      </figure>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Schools feature ← Cursor “Agents turn ideas into code” ────── */}
          <section
            id="product"
            className="cursor-section cursor-section--flush-y bg-white"
            aria-label="School workspace"
          >
            <div className="cursor-container cursor-mb-v4 pt-[calc(var(--cursor-v)*3)]">
              <a
                href={`${APP_URL}/product`}
                className="cursor-card cursor-card--large cursor-card--on-tint cursor-feature"
              >
                <div className="cursor-feature-copy">
                  <h3 className="cursor-feature-title">
                    From consultation received to response ready.
                  </h3>
                  <p className="cursor-feature-body">
                    Keep the 15-day window visible, review needs against available provision and
                    prepare an accountable response with the evidence attached.
                  </p>
                  <span className="cursor-btn-tertiary cursor-mt-link">
                    Learn about school responses →
                  </span>
                </div>
                <figure className="cursor-feature-media cursor-pt-media lg:pt-0">
                  <div className="cursor-feature-window">
                    <DashboardMock kind="dashboard" />
                  </div>
                </figure>
              </a>
            </div>
          </section>

          {/* ── Families feature ← Cursor “Works autonomously…” (mirrored) ── */}
          <section
            className="cursor-section cursor-section--flush-y bg-white"
            aria-label="Family workspace"
          >
            <div className="cursor-container cursor-mb-v4">
              <a
                href={`${APP_URL}/family`}
                className="cursor-card cursor-card--large cursor-card--on-tint cursor-feature cursor-feature--reverse"
              >
                <div className="cursor-feature-copy">
                  <h3 className="cursor-feature-title">
                    Review the whole draft plan before you respond.
                  </h3>
                  <p className="cursor-feature-body">
                    Work section by section, identify wording or evidence that needs attention and
                    prepare a response with links back to the source documents.
                  </p>
                  <span className="cursor-btn-tertiary cursor-mt-link">
                    Try the family demo →
                  </span>
                </div>
                <figure className="cursor-feature-media">
                  <div className="cursor-feature-window">
                    <FamilyWorkspacePreview />
                  </div>
                </figure>
              </a>
            </div>
          </section>

          {/* ── Capabilities ← Product “Equipped to do real engineering” ──── */}
          <section
            className="cursor-section cursor-section--flush-y bg-white"
            aria-labelledby="capabilities-heading"
          >
            <div className="cursor-container pb-[calc(var(--cursor-v)*3)]">
              <h2 id="capabilities-heading" className="cursor-type-md cursor-mb-v1">
                Equipped for the statutory work
              </h2>
              <p className="cursor-type-sm cursor-mb-v1 cursor-prose">
                Schools
              </p>
              <div className="cursor-gap mb-[calc(var(--cursor-v)*2)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {SCHOOL_CAPABILITIES.map((item) => (
                  <div key={item.title} className="cursor-card">
                    <h3 className="cursor-type-base">{item.title}</h3>
                    <p className="cursor-type-sm mt-2 text-pretty">{item.body}</p>
                  </div>
                ))}
              </div>
              <p className="cursor-type-sm cursor-mb-v1 cursor-prose">
                Families
              </p>
              <div className="cursor-gap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {FAMILY_CAPABILITIES.map((item) => (
                  <div key={item.title} className="cursor-card">
                    <h3 className="cursor-type-base">{item.title}</h3>
                    <p className="cursor-type-sm mt-2 text-pretty">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Roadmap ← Product lifecycle / Automate use-case groups ────── */}
          <section
            id="roadmap"
            aria-labelledby="roadmap-heading"
            className="cursor-section cursor-section--tint"
          >
            <div className="cursor-container">
              <div className="cursor-prose cursor-mb-v2_5">
                <h2 id="roadmap-heading" className="cursor-type-lg text-balance">
                  Unisen starts with the two parties closest to the child.
                </h2>
                <p className="cursor-type-sm mt-3 text-pretty">
                  Schools and families are the current scope. Specialists and local authorities are
                  the natural next chapters.
                </p>
              </div>

              <p className="cursor-type-sm mb-3 font-medium tracking-[0.04em] text-[var(--action-primary)] uppercase">
                Current
              </p>
              <div className="cursor-gap grid grid-cols-1 md:grid-cols-2">
                {ROADMAP_CURRENT.map((item) => (
                  <div key={item.title} className="cursor-card cursor-card--on-tint">
                    <h3 className="cursor-type-base">{item.title}</h3>
                    <p className="cursor-type-sm mt-2 text-pretty">{item.body}</p>
                  </div>
                ))}
              </div>

              <p className="cursor-type-sm mt-8 mb-3 font-medium tracking-[0.04em] text-[var(--text-muted,#607586)] uppercase">
                Future direction
              </p>
              <div className="cursor-gap grid grid-cols-1 md:grid-cols-2">
                {ROADMAP_FUTURE.map((item) => (
                  <div key={item.title} className="cursor-card cursor-card--quiet">
                    <h3 className="cursor-type-base text-[var(--text-secondary)]">{item.title}</h3>
                    <p className="cursor-type-sm mt-2 text-pretty text-[var(--text-muted,#607586)]">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Trust ← Enterprise control / proof card grid ──────────────── */}
          <section
            id="trust"
            aria-labelledby="trust-heading"
            className="cursor-section bg-white"
          >
            <div className="cursor-container">
              <div className="cursor-prose cursor-mb-v1">
                <h2 id="trust-heading" className="cursor-type-lg text-balance">
                  Built on the law, not guesses.
                </h2>
              </div>
              <div className="cursor-gap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {LEGAL_SOURCES.map((source) => (
                  <div key={source} className="cursor-card">
                    <p className="cursor-type-base">{source}</p>
                  </div>
                ))}
              </div>
              <p className="cursor-type-sm cursor-prose mt-6 text-pretty">
                Every legal claim is grounded in the legislation above and IPSEA guidance. Any AI
                suggestion cites the source document — it flags what is wrong, it never invents the
                fix or the wording. The same discipline applies on both sides of the platform.
              </p>
              <div className="cursor-prose mt-6 rounded-[1.25rem] border border-[#f0d465] bg-[#fff9dc] p-6 text-sm leading-7 text-[var(--text-primary)] max-md:p-5">
                <p>
                  Unisen supports users in organising information and preparing work. Human review
                  remains required before any response is shared or submitted.
                </p>
                <p className="mt-3 font-semibold">
                  Unisen does not make statutory, legal, clinical or placement decisions. It is not a
                  substitute for qualified legal, clinical or other professional advice.
                </p>
              </div>
            </div>
          </section>

          {/* ── Final CTA ← Cursor “Try Cursor now.” ──────────────────────── */}
          <section
            id="contact"
            aria-label="Choose a Unisen workspace"
            className="cursor-section cursor-section--headline cursor-section--dark flex items-center justify-center"
          >
            <div className="cursor-container">
              <div className="cursor-prose-medium-wide mx-auto text-center text-white">
                <h2
                  className="cursor-type-xl text-balance mx-auto mb-[var(--cursor-v)] text-white"
                  data-component="heading"
                  dir="auto"
                >
                  See Unisen from your side of the process.
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-[var(--cursor-g)]">
                  <EnquiryDialog
                    trigger={
                      <Button
                        type="button"
                        size="lg"
                        className="h-12 rounded-full bg-[var(--action-primary)] px-7 font-bold text-[var(--text-on-brand)] shadow-[0_2px_10px_rgba(59,138,193,0.28)] hover:bg-[var(--action-primary-hover)]"
                      >
                        Book a 15-min walkthrough →
                      </Button>
                    }
                  />
                  <Button
                    asChild
                    type="button"
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-full border-white/60 bg-white/85 px-7 font-bold text-[#15293e] hover:bg-white"
                  >
                    <a href={`${APP_URL}/family`}>Try the family demo →</a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <FooterSection2 />
      </div>
    </>
  );
}
