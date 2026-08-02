import CtaButton from "../components/cta-button";

/** Bottom CTA band: brand cyan panel + accent action. */
export default function MeetYourAiSection() {
  return (
    <div className="w-320 block relative shrink-0 max-md:w-[23.4375rem] md:max-lg:w-185 2xl:w-480">
      <section className="flex relative py-20 px-5 flex-col justify-center items-center content-center gap-5 max-lg:py-10">
        <div className="w-310 flex relative flex-col justify-center items-center content-center shrink-0 gap-5 max-md:w-[20.9375rem] md:max-lg:w-175 2xl:w-470">
          <div className="unisen-hero-panel w-full max-w-310 min-h-[22rem] flex relative rounded-[24px] flex-col justify-center items-center content-center shrink-0 gap-2.5 overflow-clip py-16 px-6">
            {/* Puzzle mark watermark */}
            <img
              src="/assets/brand/header-logo.png"
              alt=""
              aria-hidden
              className="pointer-events-none absolute left-[-6%] bottom-[-18%] z-0 w-[min(22rem,50%)] opacity-[0.16] object-contain rotate-[-8deg]"
              decoding="async"
            />
            <img
              src="/assets/brand/header-logo.png"
              alt=""
              aria-hidden
              className="pointer-events-none absolute right-[-4%] top-[-12%] z-0 w-[min(18rem,42%)] opacity-[0.12] object-contain rotate-[12deg]"
              decoding="async"
            />

            <div className="w-full max-w-175 flex relative z-2 flex-col justify-center items-center content-center shrink-0 gap-5 max-lg:px-2">
              <div className="w-full max-w-165 flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word]">
                <h2
                  className="block text-color-001 [font-family:var(--font-heading)] text-[2.75rem] font-extrabold leading-[1.15] text-center max-lg:text-[2rem] max-lg:leading-[1.15]"
                  data-component="heading"
                  dir="auto"
                >
                  Your next EHC consultation starts here.
                  <span className="inline font-semibold text-[var(--text-secondary)]">
                    <br className="inline" />
                    Set up in minutes. Keep the clock in view.
                  </span>
                </h2>
              </div>
              <div className="w-full max-w-125 flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word]">
                <p
                  className="block text-[var(--text-secondary)] [font-family:var(--font-body)] text-base leading-[1.5] text-center text-balance"
                  dir="auto"
                >
                  Try the school consultation workspace or family draft-plan review. Built with SENCOs and families, not another generic tracker.
                </p>
              </div>
              <div className="flex relative shrink-0 flex-wrap items-center justify-center gap-3">
                <CtaButton label="Get started" variant="accent" />
                <CtaButton label="Talk to us" variant="light" href="/contact" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
