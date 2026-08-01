import { Building2, Clock, FileSearch, FolderOpen, School, Users, Stethoscope, Landmark } from "lucide-react";
import type { ReactNode } from "react";
import CtaButton from "../components/cta-button";
import {
  DashboardMock,
  type MockKind,
} from "../components/dashboard-mocks";
import FooterSection2 from "../sections/footer-section2";
import ScrollAppear from "./components/scroll-appear";
import ScrollRevealText from "./components/scroll-reveal-text";

const iconClass = "h-5 w-5 shrink-0";

const OUTCOMES: {
  title: string;
  body: string;
  icon: ReactNode;
  mock: MockKind;
}[] = [
  {
    title: "15 calendar days, always visible",
    body: "Every consultation carries its statutory clock. Overdue work is obvious before it becomes a crisis.",
    icon: <Clock className={iconClass} strokeWidth={1.75} aria-hidden />,
    mock: "clock",
  },
  {
    title: "Vague provision flagged before you send",
    body: "Drafts are checked against IPSEA-style specificity so schools submit clear, defensible wording.",
    icon: <FileSearch className={iconClass} strokeWidth={1.75} aria-hidden />,
    mock: "draft",
  },
  {
    title: "Evidence stays with the case",
    body: "Advice, school forms, and parent views live on one case, not scattered across email, post, and folders.",
    icon: <Building2 className={iconClass} strokeWidth={1.75} aria-hidden />,
    mock: "evidence",
  },
  {
    title: "Built on the law, not guesswork",
    body: "Grounded in the Children and Families Act, SEND Code of Practice, and IPSEA. AI cites sources; it never invents provision.",
    icon: <FolderOpen className={iconClass} strokeWidth={1.75} aria-hidden />,
    mock: "law",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Open the consultation",
    body: "Pull in the LA request and attach the evidence you already hold: advice, views, and school forms.",
  },
  {
    n: "02",
    title: "Draft with the clock in view",
    body: "Write the response with deadlines, needs, and provision checks alongside the draft, not in a separate spreadsheet.",
  },
  {
    n: "03",
    title: "Check, then submit",
    body: "Flag vague wording, capture a clear cannot-meet rationale when needed, and submit before the statutory day runs out.",
  },
];

const PARTIES: {
  label: string;
  title: string;
  body: string;
  status: "ships" | "roadmap";
  icon: ReactNode;
}[] = [
  {
    label: "Schools",
    title: "Answer LA EHC consultations in time",
    body: "Surface the clock, consolidate needs advice, and draft a clear statutory response.",
    status: "ships",
    icon: <School className={iconClass} strokeWidth={1.75} aria-hidden />,
  },
  {
    label: "Families",
    title: "Review a draft plan on a shared timeline",
    body: "See what is due, capture issues and evidence, and prepare comments without chasing paper.",
    status: "roadmap",
    icon: <Users className={iconClass} strokeWidth={1.75} aria-hidden />,
  },
  {
    label: "Specialists",
    title: "Submit advice that meets the specificity bar",
    body: "EP, SaLT, OT and others share quantified advice on-platform, tied to the case clock.",
    status: "roadmap",
    icon: <Stethoscope className={iconClass} strokeWidth={1.75} aria-hidden />,
  },
  {
    label: "Councils",
    title: "Track every open consultation in one place",
    body: "Issue consultations, watch school responses against statutory clocks, and reduce chasing.",
    status: "roadmap",
    icon: <Landmark className={iconClass} strokeWidth={1.75} aria-hidden />,
  },
];

function SectionShell({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`unisen-mid-section w-full flex relative justify-center ${className}`}
    >
      <div className="unisen-mid-inner w-full max-w-[78.125rem] mx-auto px-5 max-lg:px-4">{children}</div>
    </section>
  );
}

/** Landing body under the Unisen hero: product proof → outcomes → school flow → parties → CTA. */
export default function UnisenBody() {
  return (
    <>
      <div className="block nexura-body w-full" id="nexura-main">
        <div className="min-h-0 flex relative w-full flex-col justify-start items-center content-center overflow-x-clip bg-background">
          {/* 1. Promise */}
          <SectionShell id="product" className="unisen-mid-promise py-20 max-lg:py-12">
            <ScrollAppear y={16} className="max-w-[42rem]">
              <p className="unisen-mid-kicker mb-4">For SENCOs under the statutory clock</p>
              <ScrollRevealText
                text="Unisen turns each LA EHC consultation into a guided response: deadlines on one timeline, evidence with the case, and wording checked so schools can submit on time."
                className="block [font-family:var(--font-heading)] text-[1.75rem] leading-[1.35] tracking-[-0.03em] text-left max-lg:text-xl max-lg:leading-[1.4]"
                initialColor="#999999"
                activeColor="#244a70"
                startOffsetPct={80}
                scrollDistancePx={120}
              />
            </ScrollAppear>
          </SectionShell>

          {/* 2. Product showcase — atmosphere band */}
          <SectionShell id="demo" className="unisen-mid-product pb-20 max-lg:pb-14">
            <ScrollAppear y={24} className="unisen-mid-product-frame">
              <div className="unisen-mid-product-chrome" aria-hidden>
                <span />
                <span />
                <span />
              </div>
              <div
                className="unisen-mid-product-shot"
                role="img"
                aria-label="Unisen consultations dashboard showing open EHC cases with statutory deadlines (illustrative demo data)"
              >
                <DashboardMock kind="dashboard" />
              </div>
            </ScrollAppear>
            <ScrollAppear y={12} delay={0.08} className="mt-6 max-w-[36rem]">
              <p className="text-muted-foreground text-base leading-relaxed tracking-[-0.01em]">
                One workspace shows open consultations, days left, and case status, so the SENCO never rebuilds the picture from inboxes.
              </p>
            </ScrollAppear>
          </SectionShell>

          {/* 3. Outcomes */}
          <SectionShell id="integration" className="unisen-mid-outcomes py-20 max-lg:py-14">
            <ScrollAppear y={16} className="max-w-[36rem] mb-12 max-lg:mb-8">
              <h2 className="unisen-mid-h2" data-component="heading">
                What changes when the clock is visible.
              </h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed tracking-[-0.01em] max-lg:text-base">
                Not another portal. A workspace built around the 15-day consultation and the evidence you already collect.
              </p>
            </ScrollAppear>

            <div className="unisen-mid-outcome-grid">
              {OUTCOMES.map((item, i) => (
                <ScrollAppear
                  key={item.title}
                  y={20}
                  delay={i * 0.06}
                  className="unisen-mid-outcome-card"
                >
                  <div className="unisen-mid-outcome-media" aria-hidden>
                    <DashboardMock kind={item.mock} />
                  </div>
                  <div className="unisen-mid-outcome-copy">
                    <div className="unisen-mid-outcome-icon" aria-hidden>
                      {item.icon}
                    </div>
                    <h3 className="unisen-mid-h3" data-component="heading">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground text-base leading-relaxed tracking-[-0.01em]">
                      {item.body}
                    </p>
                  </div>
                </ScrollAppear>
              ))}
            </div>
          </SectionShell>

          {/* 4. How it works — school path */}
          <SectionShell className="unisen-mid-steps py-20 max-lg:py-14">
            <div className="unisen-mid-steps-layout">
              <ScrollAppear y={16} className="unisen-mid-steps-intro">
                <p className="unisen-mid-kicker mb-3">School workspace: shipping first</p>
                <h2 className="unisen-mid-h2" data-component="heading">
                  From LA request to submitted response.
                </h2>
                <p className="mt-4 text-muted-foreground text-lg leading-relaxed tracking-[-0.01em] max-lg:text-base">
                  Three steps. No forced migration. Bring portal downloads, professional advice, and school forms into one case.
                </p>
                <div className="mt-8">
                  <CtaButton label="Explore the workspace" variant="glass" href="/contact" />
                </div>
              </ScrollAppear>

              <div className="unisen-mid-steps-list" role="list">
                {STEPS.map((step, i) => (
                  <ScrollAppear key={step.n} y={16} delay={i * 0.07} role="listitem" className="unisen-mid-step">
                    <span className="unisen-mid-step-n" aria-hidden>
                      {step.n}
                    </span>
                    <div>
                      <h3 className="unisen-mid-h3" data-component="heading">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-muted-foreground text-base leading-relaxed tracking-[-0.01em]">
                        {step.body}
                      </p>
                    </div>
                  </ScrollAppear>
                ))}
              </div>
            </div>
          </SectionShell>

          {/* 5. Four parties — brand atmosphere band */}
          <section id="solution" className="unisen-mid-parties w-full">
            <div className="unisen-mid-parties-band">
              <div className="unisen-mid-inner unisen-mid-parties-inner w-full max-w-[78.125rem] mx-auto px-5 max-lg:px-4 py-20 max-lg:py-14">
                <ScrollAppear y={16} className="unisen-mid-parties-intro max-w-[36rem] mb-12 max-lg:mb-8 mx-auto text-center">
                  <h2 className="unisen-mid-h2 text-center" data-component="heading">
                    Four parties, one EHC workspace.
                  </h2>
                  <p className="mt-4 text-muted-foreground text-lg leading-relaxed tracking-[-0.01em] text-center max-lg:text-base">
                    Schools ship first. Families, specialists, and councils follow on the same shared timeline.
                  </p>
                </ScrollAppear>

                <div className="unisen-mid-parties-grid mx-auto">
                  {PARTIES.map((party, i) => (
                    <ScrollAppear
                      key={party.label}
                      y={18}
                      delay={i * 0.05}
                      className={`unisen-mid-party-card${party.status === "ships" ? " unisen-mid-party-card--ships" : ""}`}
                      id={i === 0 ? "solution-1" : `solution-${i + 1}`}
                      style={{ scrollMarginTop: "6rem" }}
                    >
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="unisen-mid-party-icon" aria-hidden>
                          {party.icon}
                        </div>
                        <span
                          className={
                            party.status === "ships"
                              ? "unisen-mid-badge unisen-mid-badge--ships"
                              : "unisen-mid-badge"
                          }
                        >
                          {party.status === "ships" ? "Shipping" : "Roadmap"}
                        </span>
                      </div>
                      <p className="unisen-mid-party-label">{party.label}</p>
                      <h3 className="unisen-mid-h3 mt-1" data-component="heading">
                        {party.title}
                      </h3>
                      <p className="mt-2 text-muted-foreground text-base leading-relaxed tracking-[-0.01em]">
                        {party.body}
                      </p>
                    </ScrollAppear>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 6. Photo CTA — keep the strong closer */}
          <div className="contents">
            <div className="w-full h-120 block relative shrink-0 mb-12 max-lg:h-112.5 max-lg:mb-10">
              <section
                className="h-full flex relative px-5 justify-center items-center content-center gap-2.5 max-lg:px-1.5"
                id="contact"
                aria-label="Get started"
              >
                <div className="w-full max-w-312.5 h-full flex relative py-25 px-16 flex-col justify-start items-start content-start grow shrink-0 basis-0 gap-16 max-lg:py-16 max-lg:px-5">
                  <div className="w-full max-w-150 flex relative z-1 flex-col justify-center items-start content-start shrink-0 gap-5 max-md:px-6">
                    <div className="w-full block relative shrink-0">
                      <div className="w-150 flex relative flex-col justify-start shrink-0 max-md:w-full">
                        <h2
                          className="block [font-family:var(--font-heading)] text-[2.5rem] font-medium leading-12 tracking-[-1.6px] text-left text-balance max-lg:text-[1.75rem] max-lg:leading-[2.125rem] max-lg:tracking-[-1.12px]"
                          data-component="heading"
                          dir="auto"
                        >
                          Your next EHC consultation starts here.
                        </h2>
                      </div>
                    </div>
                    <div className="w-full flex relative justify-start items-center content-center shrink-0 gap-3 max-lg:flex-wrap max-md:flex-nowrap">
                      <CtaButton className="max-md:min-w-0 max-md:flex-1 max-md:[&_.cta-glass-track]:min-w-0" label="Get started" variant="glass" href="/contact" />
                      <CtaButton className="max-md:min-w-0 max-md:flex-1 max-md:[&_.cta-glass-track]:min-w-0" label="Talk to us" variant="glass" href="/contact" />
                    </div>
                  </div>
                  <div className="w-310 h-full block absolute top-0 left-0 z-0 min-w-0 shrink-0 max-md:w-[22.6875rem] md:max-lg:w-189 2xl:w-312.5">
                    <div className="h-full block relative">
                      <div className="w-px h-118 block absolute top-1 left-1 z-8 shrink-0 max-lg:h-110.5">
                        <div className="w-px h-full block relative overflow-hidden after:content-[''] after:block after:absolute after:inset-y-0 after:-right-px after:left-0 after:w-0.5" />
                      </div>
                      <div className="w-px h-118 block absolute top-1 right-1 z-8 shrink-0 max-lg:h-110.5">
                        <div className="w-px h-full block relative overflow-hidden after:content-[''] after:block after:absolute after:inset-y-0 after:-right-px after:left-0 after:w-0.5" />
                      </div>
                      <div className="h-px block absolute bottom-0 inset-x-0 z-9 shrink-0">
                        <div className="h-px flex relative justify-center items-center content-center">
                          <div className="w-2.5 h-2.5 block relative shrink-0 overflow-hidden bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-2.5 after:h-2.5" />
                          <div className="w-[98.5%] h-full block relative grow shrink-0 basis-0 overflow-hidden max-md:w-[94.5%] md:max-lg:w-[97.5%] after:content-[''] after:block after:absolute after:top-0 after:-bottom-px after:inset-x-0 after:h-0.5" />
                          <div className="w-2.5 h-2.5 block relative shrink-0 overflow-hidden bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-2.5 after:h-2.5" />
                        </div>
                      </div>
                      <div className="h-px block absolute inset-x-0 z-9 shrink-0">
                        <div className="h-px flex relative justify-center items-center content-center">
                          <div className="w-2.5 h-2.5 block relative shrink-0 overflow-hidden bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-2.5 after:h-2.5" />
                          <div className="w-[98.5%] h-full block relative grow shrink-0 basis-0 overflow-hidden max-md:w-[94.5%] md:max-lg:w-[97.5%] after:content-[''] after:block after:absolute after:top-0 after:-bottom-px after:inset-x-0 after:h-0.5" />
                          <div className="w-2.5 h-2.5 block relative shrink-0 overflow-hidden bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-2.5 after:h-2.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-304 h-116 block absolute top-2 left-3 z-0 min-w-0 shrink-0 overflow-clip rounded-[1.25rem] max-md:right-3 max-md:w-auto max-md:rounded-xl max-lg:h-108.5 md:max-lg:w-183 2xl:w-306.5">
                    <div className="h-full block absolute top-0 inset-x-0">
                      <img
                        className="w-full h-full block overflow-clip object-cover object-[42%_58%] max-lg:h-full"
                        data-component="image"
                        alt="Park path by a river with city skyline"
                        height="930"
                        sizes="calc(min(max(100vw - 40px, 1px), 1250px) - 24px)"
                        src="/assets/nexura/images/cta-park-2387.jpg?v=5"
                        srcSet="/assets/nexura/images/cta-park-512.jpg?v=5 512w, /assets/nexura/images/cta-park-1024.jpg?v=5 1024w, /assets/nexura/images/cta-park-2048.jpg?v=5 2048w, /assets/nexura/images/cta-park-2387.jpg?v=5 2432w"
                        width="2432"
                      />
                    </div>
                  </div>
                  <div
                    className="w-310 h-full block absolute top-0 left-0 z-0 opacity-2 min-w-0 shrink-0 overflow-clip max-md:w-[22.6875rem] md:max-lg:w-189 2xl:w-312.5"
                    style={{
                      maskImage: "linear-gradient(270deg, var(--clr-14) 3%, var(--clr-5) 86%)",
                    }}
                  >
                    <div
                      className="h-full block absolute top-0 inset-x-0 [background-size:189px] max-lg:[background-size:94.5px] max-lg:[background-position:50%_50%]"
                      style={{ backgroundImage: 'url("/assets/nexura/svg/7f677b46bd48.svg")' }}
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <FooterSection2 />
      </div>
    </>
  );
}
