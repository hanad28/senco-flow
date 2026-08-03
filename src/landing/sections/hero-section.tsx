import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/site";
import EnquiryDialog from "../components/enquiry-dialog";

/**
 * Hero: full-viewport illustration with copy shifted into the upper sky
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
          src="/assets/brand/hero-park-1280.jpg"
          srcSet="/assets/brand/hero-park-768.jpg 768w, /assets/brand/hero-park-1280.jpg 1280w, /assets/brand/hero-park-1840.jpg 1840w"
          sizes="100vw"
          alt=""
          width={1840}
          height={1308}
          className="absolute inset-0 h-full w-full max-w-none object-cover"
          decoding="async"
          fetchPriority="high"
        />
        <div className="unisen-hero-scrim absolute inset-0" />
      </div>

      {/* Soft blend into the page: removes the hard hero / content edge */}
      <div className="unisen-hero-fade" aria-hidden />

      {/* Upper-sky copy block: leaves lower half of the illustration open */}
      <div className="unisen-hero-copy relative z-[2] flex w-full max-w-[40rem] flex-col items-center px-5 max-lg:px-4">
        <h1
          className="unisen-hero-title block w-full [font-family:var(--font-heading)] font-bold text-center text-balance"
          data-component="heading"
          dir="auto"
        >
          Built on the law, not guesswork.
        </h1>
        <p
          className="unisen-hero-sub mt-4 max-w-[36rem] [font-family:var(--font-body)] text-center text-balance"
          dir="auto"
        >
          For schools preparing a legally specific response, and families making sure the plan is right. Unisen flags
          what&apos;s vague, missing, or wrong, and shows you exactly why.
        </p>
        <div className="unisen-hero-cta mt-7 flex shrink-0 flex-wrap justify-center gap-3">
          <EnquiryDialog />
          <Button
            type="button"
            size="lg"
            className="cta-glass hero-enquiry-trigger relative h-12 min-w-56 px-7 text-base font-bold"
            onClick={() => window.location.assign(`${APP_URL}/family`)}
          >
            <span className="relative z-[1]">Try the family demo</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
