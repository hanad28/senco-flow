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
          Unisen is the SEND workspace for schools and families.
        </h1>
        <p
          className="unisen-hero-sub mt-4 max-w-[36rem] [font-family:var(--font-body)] text-center text-balance"
          dir="auto"
        >
          Get EHC consultations and draft plans out of scattered inboxes, with the clock, evidence,
          and work in one place.
        </p>
        <div className="unisen-hero-cta mt-7 flex shrink-0 flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <EnquiryDialog />
          <Button
            type="button"
            size="lg"
            className="cta-glass hero-enquiry-trigger relative h-10 w-auto min-w-0 px-5 text-sm font-bold sm:h-12 sm:min-w-56 sm:px-7 sm:text-base"
            onClick={() => window.location.assign(`${APP_URL}/family`)}
          >
            <span className="relative z-[1]">Try the family demo</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
