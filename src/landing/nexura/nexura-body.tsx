import { Button } from "@/components/ui/button";
import EnquiryDialog from "../components/enquiry-dialog";
import { DashboardMock, type MockKind } from "../components/dashboard-mocks";
import FooterSection2 from "../sections/footer-section2";

const FEATURES: {
  eyebrow: string;
  title: string;
  body: string;
  mock: MockKind;
}[] = [
  {
    eyebrow: "Case overview",
    title: "Every consultation in one clear view",
    body: "See every open EHC consultation, its local authority, status, and time remaining without rebuilding the picture from inboxes and spreadsheets.",
    mock: "dashboard",
  },
  {
    eyebrow: "Statutory deadlines",
    title: "Keep the 15-day clock visible",
    body: "Each case carries its statutory consultation window from receipt to submission, making urgent work obvious before it becomes a crisis.",
    mock: "clock",
  },
  {
    eyebrow: "Evidence",
    title: "Bring every report into the case",
    body: "Keep professional advice, school forms, and parent views together, then trace every summary and response back to its source.",
    mock: "evidence",
  },
  {
    eyebrow: "Response quality",
    title: "Check wording before you submit",
    body: "Flag vague provision against SEND law and IPSEA-style specificity so responses are clear, quantified, and defensible.",
    mock: "draft",
  },
];

/** Landing body under the Unisen hero: alternating product features → CTA. */
export default function UnisenBody() {
  return (
    <>
      <div className="block nexura-body w-full" id="nexura-main">
        <div className="min-h-0 flex relative w-full flex-col justify-start items-center content-center overflow-x-clip bg-background">
          {/* Cursor-inspired feature rhythm: focused copy + large product demonstration. */}
          <section id="product" className="unisen-feature-stack w-full py-20 max-lg:py-12">
            <div className="mx-auto flex w-full max-w-[78.125rem] flex-col gap-12 px-5 max-lg:gap-8 max-lg:px-4">
              {FEATURES.map((feature, index) => (
                <section
                  key={feature.title}
                  className={`unisen-feature-card${index % 2 ? " unisen-feature-card--reverse" : ""}`}
                  aria-labelledby={`unisen-feature-${index}`}
                >
                  <div className="unisen-feature-copy">
                    <p className="unisen-feature-eyebrow">{feature.eyebrow}</p>
                    <h2 id={`unisen-feature-${index}`} className="unisen-feature-title">
                      {feature.title}
                    </h2>
                    <p className="unisen-feature-body">{feature.body}</p>
                  </div>

                  <div className="unisen-feature-media">
                    <div className="unisen-feature-window">
                      <DashboardMock kind={feature.mock} />
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </section>

          {/* 6. Photo CTA — keep the strong closer */}
          <div className="contents">
            <div className="w-full h-120 block relative shrink-0 mb-12 max-lg:h-112.5 max-lg:mb-10">
              <section
                className="h-full flex relative px-5 justify-center items-center content-center gap-2.5 max-lg:px-1.5"
                id="contact"
                aria-label="Book a walkthrough"
              >
                <div className="w-full max-w-312.5 h-full flex relative py-25 px-16 flex-col justify-start items-start content-start grow shrink-0 basis-0 gap-16 max-lg:py-16 max-lg:px-5">
                  <div className="w-full max-w-150 flex relative z-1 flex-col justify-center items-start content-start shrink-0 gap-5 max-md:px-6">
                    <div className="w-full block relative shrink-0">
                      <div className="w-150 flex relative flex-col justify-start shrink-0 max-md:w-full">
                        <h2
                          className="block [font-family:var(--font-heading)] text-[2.5rem] font-medium leading-12 tracking-[-1.6px] text-left text-balance max-lg:text-center max-lg:text-[1.75rem] max-lg:leading-[2.125rem] max-lg:tracking-[-1.12px]"
                          data-component="heading"
                          dir="auto"
                        >
                          Your next EHC consultation starts here.
                        </h2>
                      </div>
                    </div>
                    <div className="w-full flex relative justify-start items-center content-center shrink-0 gap-3 max-lg:flex-wrap max-md:flex-nowrap">
                      <EnquiryDialog
                        trigger={
                          <Button
                            type="button"
                            size="lg"
                            className="relative h-11 rounded-full bg-[var(--action-primary)] px-6 font-bold text-[var(--text-on-brand)] shadow-[0_2px_10px_rgba(59,138,193,0.28)] transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-px hover:bg-[var(--action-primary-hover)] hover:shadow-[0_12px_28px_rgba(36,74,112,0.14)] max-md:min-w-0 max-md:flex-1"
                          >
                            <span className="relative z-[1]">Book a 15-min walkthrough</span>
                          </Button>
                        }
                      />
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
