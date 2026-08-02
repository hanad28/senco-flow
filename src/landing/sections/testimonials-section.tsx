import { testimonials as testimonialsContent, type TestimonialItem } from "../content";

/** Nexura “Loved by teams”: Unisen social proof. */
export default function TestimonialsSection({
  items = testimonialsContent,
}: {
  items?: TestimonialItem[];
} = {}) {
  return (
    <section
      className="w-full flex relative py-20 px-5 flex-col justify-start items-center content-center shrink-0 max-lg:py-12 max-lg:px-4"
      aria-labelledby="testimonials-heading"
    >
      <div className="w-full max-w-310 flex flex-col items-center gap-10 max-lg:gap-8">
        <div className="flex max-w-2xl flex-col items-center gap-3 text-center">
          <p className="text-accent [font-family:var(--font-body)] text-sm font-semibold">
            Stories
          </p>
          <h2
            id="testimonials-heading"
            className="text-color-001 [font-family:var(--font-heading)] text-[2.5rem] font-bold leading-[1.15] tracking-[-0.04em] text-balance max-lg:text-[1.75rem]"
            data-component="heading"
          >
            Built with SENCOs, families, and trusts.
          </h2>
          <p className="text-muted-foreground [font-family:var(--font-body)] text-base leading-relaxed text-balance">
            From single-school teams to multi-academy trusts. Here is the kind of calm EHC work Unisen is designed for.
          </p>
        </div>

        <div className="grid w-full grid-cols-3 gap-4 max-lg:grid-cols-1">
          {items.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col justify-between gap-6 rounded-[20px] border border-[var(--border-default)] bg-background p-7 max-lg:p-6"
            >
              <blockquote className="text-color-001 [font-family:var(--font-heading)] text-lg font-semibold leading-snug tracking-[-0.02em] text-balance max-lg:text-base">
                “{t.quote}”
              </blockquote>
              <figcaption className="flex flex-col gap-0.5">
                <span className="text-color-001 [font-family:var(--font-body)] text-sm font-bold">
                  {t.name}
                </span>
                <span className="text-muted-foreground [font-family:var(--font-body)] text-sm">
                  {t.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
