import { Link } from "@tanstack/react-router";
import "../landing/landing.css";
import "./-not-found.css";

/** Full-viewport hero treatment for unknown URLs. */
export function NotFoundPage() {
  return (
    <div className="unisen-landing unisen-not-found">
      <section
        className="unisen-hero relative isolate flex w-full flex-col items-center justify-start shrink-0 overflow-hidden"
        aria-label="Page not found"
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
          />
          <div className="unisen-hero-scrim absolute inset-0" />
        </div>
        <div className="unisen-hero-copy relative z-[2] flex w-full max-w-[40rem] flex-col items-center px-5 max-lg:px-4">
          <h1
            className="unisen-hero-title block w-full [font-family:var(--font-heading)] font-bold text-center text-balance"
            data-component="heading"
          >
            404
          </h1>
          <p className="unisen-hero-sub mt-4 max-w-[36rem] [font-family:var(--font-body)] text-center text-balance">
            Page not found. The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <div className="unisen-hero-cta mt-7 flex shrink-0 flex-col items-center justify-center">
            <Link
              to="/"
              className="cta-glass hero-enquiry-trigger relative inline-flex h-10 w-auto min-w-0 items-center justify-center px-5 text-sm font-bold sm:h-12 sm:min-w-56 sm:px-7 sm:text-base"
            >
              <span className="relative z-[1]">Return to home</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
