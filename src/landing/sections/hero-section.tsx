import CtaButton from "../components/cta-button";

/**
 * Hero — full-viewport illustration with copy shifted into the upper sky
 * (like the reference: open park/city below, compact text above).
 */
export default function HeroSection() {
  return (
    <section
      className="unisen-hero relative isolate flex w-full flex-col items-center justify-start shrink-0 overflow-hidden"
      aria-label="Introduction"
    >
      <div className="unisen-hero-media absolute inset-0 z-0" aria-hidden>
        <img
          src="/assets/brand/hero-park.jpg"
          srcSet="/assets/brand/hero-park-1280.jpg 1280w, /assets/brand/hero-park-1840.jpg 1840w, /assets/brand/hero-park.jpg 1840w"
          sizes="100vw"
          alt=""
          width={1840}
          height={1308}
          className="absolute inset-0 h-full w-full max-w-none object-cover object-[center_42%]"
          decoding="async"
          fetchPriority="high"
        />
        <div className="unisen-hero-scrim absolute inset-0" />
      </div>

      {/* Soft blend into the page — removes the hard hero / content edge */}
      <div className="unisen-hero-fade" aria-hidden />

      {/* Upper-sky copy block — leaves lower half of the illustration open */}
      <div className="unisen-hero-copy relative z-[2] flex w-full max-w-[40rem] flex-col items-center px-5 max-lg:px-4">
        <h1
          className="unisen-hero-title block w-full [font-family:var(--font-heading)] font-bold text-center text-balance"
          data-component="heading"
          dir="auto"
        >
          Help SENCOs answer LA EHC consultations within 15 calendar days
        </h1>
        <p
          className="unisen-hero-sub mt-4 max-w-[26rem] [font-family:var(--font-body)] text-center text-balance"
          dir="auto"
        >
          Track LA consultations, review needs and advice, and draft statutory responses — all in one calm workspace.
        </p>
        <div className="unisen-hero-cta mt-7 shrink-0">
          <CtaButton label="Get started" variant="glass" />
        </div>
      </div>
    </section>
  );
}
