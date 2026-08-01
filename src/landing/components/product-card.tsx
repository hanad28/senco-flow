import type { ProductsItem } from "../content";
import CtaButton from "./cta-button";

function FeatureList({ features }: { features: ProductsItem["features"] }) {
  return (
    <ul className="w-full flex relative flex-col justify-start items-start content-start shrink-0 m-0 p-0 list-none">
      {features.map((f) => (
        <li
          key={f.label}
          className={`w-full flex relative py-2 justify-start items-center content-center shrink-0 gap-3 ${
            f.included ? "" : "opacity-60"
          }`}
        >
          {f.included ? (
            <span className="w-2 h-2 block relative shrink-0 rounded-full bg-accent" />
          ) : (
            <span className="w-2 h-2 block relative shrink-0" aria-hidden />
          )}
          <span className="block text-color-001 [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-base leading-[1.1875rem] text-balance">
            {f.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function ProductCard({
  d,
  billing,
}: {
  d: ProductsItem;
  billing: "monthly" | "annual";
}) {
  const price = billing === "annual" ? d.priceAnnual : d.priceMonthly;
  const note = billing === "annual" ? d.priceNoteAnnual : d.priceNoteMonthly;

  if (d.featured) {
    return (
      <article className="pricing-card pricing-card--featured relative flex w-full min-h-[35.3125rem] flex-col justify-end items-stretch gap-5 overflow-hidden rounded-[24px] border border-[var(--border-default)] p-4 max-lg:min-h-[34.5rem]">
        <div className="absolute inset-0 z-0 rounded-[24px] overflow-hidden">
          <img
            className="h-full w-full object-cover"
            data-component="image"
            alt=""
            src="/assets/cloned/images/b0ee4ee3249a.png"
            srcSet="/assets/cloned/images/f5babcd868ae.png 682w, /assets/cloned/images/b0ee4ee3249a.png 746w"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          {/* Soft brand scrim so type stays readable on the photo */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(116,196,215,0.12) 0%, rgba(234,248,250,0.55) 42%, rgba(234,248,250,0.92) 72%, #EAF8FA 100%)",
            }}
          />
        </div>

        <div className="relative z-[1] flex w-full flex-col gap-5">
          <h4 className="block text-color-001 [font-family:'DM_Sans',_'DM_Sans_Placeholder',_sans-serif] text-2xl font-medium italic leading-[1.625rem] text-balance max-lg:text-xl max-lg:leading-5.5">
            {d.title}
          </h4>

          <div className="flex flex-col gap-2">
            <h3 className="block text-color-001 [font-family:'DM_Sans',_'DM_Sans_Placeholder',_sans-serif] text-[2rem] font-medium leading-[2.1875rem] text-balance max-lg:text-2xl max-lg:leading-[1.625rem]">
              {price}
            </h3>
            <p className="block text-muted-foreground [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-base leading-[1.1875rem] text-balance">
              {note}
            </p>
          </div>

          <div className="flex w-full flex-col gap-5 rounded-lg">
            <p className="block text-muted-foreground [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-base leading-[1.1875rem] text-balance">
              {d.description}
            </p>
            <FeatureList features={d.features} />
            <CtaButton
              label={d.label}
              variant={d.ctaDark ? "accent" : "light"}
              fullWidth
              className="pricing-cta"
            />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="pricing-card relative flex w-full min-h-[35.3125rem] flex-col justify-start items-start gap-5 rounded-[16px] border border-[var(--border-default)] bg-surface-2 p-4 max-lg:min-h-0">
      <h4 className="block text-color-001 [font-family:'DM_Sans',_'DM_Sans_Placeholder',_sans-serif] text-2xl font-medium italic leading-[1.625rem] text-balance max-lg:text-xl max-lg:leading-5.5">
        {d.title}
      </h4>

      <div className="flex flex-col gap-2">
        <h3 className="block text-color-001 [font-family:'DM_Sans',_'DM_Sans_Placeholder',_sans-serif] text-[2rem] font-medium leading-[2.1875rem] text-balance max-lg:text-2xl max-lg:leading-[1.625rem]">
          {price}
        </h3>
        <p className="block text-muted-foreground [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-base leading-[1.1875rem] text-balance">
          {note}
        </p>
      </div>

      <p className="block text-muted-foreground [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-base leading-[1.1875rem] text-balance">
        {d.description}
      </p>

      <div className="mt-auto flex w-full flex-col gap-5">
        <FeatureList features={d.features} />
        <CtaButton
          label={d.label}
          variant={d.ctaDark ? "primary" : "light"}
          fullWidth
          className="pricing-cta"
        />
      </div>
    </article>
  );
}
