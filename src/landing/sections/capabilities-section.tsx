import { capabilities as capabilitiesContent, type CapabilityItem } from "../content";

/** Nexura-style 2×2 capability grid — Unisen product pillars. */
export default function CapabilitiesSection({
  items = capabilitiesContent,
}: {
  items?: CapabilityItem[];
} = {}) {
  return (
    <section
      id="product"
      className="w-full flex relative py-20 px-5 flex-col justify-start items-center content-center shrink-0 max-lg:py-12 max-lg:px-4"
      aria-labelledby="capabilities-heading"
    >
      <div className="w-full max-w-310 flex flex-col gap-12 max-lg:gap-8">
        <div className="flex w-full items-end justify-between gap-8 max-lg:flex-col max-lg:items-start max-lg:gap-4">
          <div className="flex max-w-xl flex-col gap-3">
            <p className="text-accent [font-family:var(--font-body)] text-sm font-semibold">
              Product
            </p>
            <h2
              id="capabilities-heading"
              className="text-color-001 [font-family:var(--font-heading)] text-[2.5rem] font-bold leading-[1.15] tracking-[-0.04em] text-balance max-lg:text-[1.75rem]"
              data-component="heading"
            >
              Built for the SENCO job, not generic case tracking.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground [font-family:var(--font-body)] text-base leading-relaxed text-balance">
            Unisen keeps statutory clocks, advice, and draft responses in one calm workspace for schools and families.
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-4 max-lg:grid-cols-1">
          {items.map((item) => (
            <article
              key={item.title}
              className="flex flex-col gap-3 rounded-[20px] border border-[var(--border-default)] bg-surface-2 p-7 max-lg:p-6"
            >
              <h3 className="text-color-001 [font-family:var(--font-heading)] text-xl font-bold tracking-[-0.03em] max-lg:text-lg">
                {item.title}
              </h3>
              <p className="text-muted-foreground [font-family:var(--font-body)] text-base leading-relaxed">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
