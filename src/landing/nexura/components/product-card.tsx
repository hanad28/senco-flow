import { Check } from "lucide-react";
import type { ProductsItem } from "../../content";
import CtaButton from "../../components/cta-button";
import { cn } from "@/lib/utils";

function FeatureList({ features }: { features: ProductsItem["features"] }) {
  return (
    <ul className="m-0 flex w-full list-none flex-col gap-0 p-0">
      {features.map((f) => (
        <li
          key={f.label}
          className={cn(
            "flex w-full items-center gap-3 py-2",
            f.included ? "" : "opacity-45",
          )}
        >
          <span
            className={cn(
              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
              f.included
                ? "bg-[var(--action-primary)] text-white"
                : "bg-[var(--brand-cyan-pale)] text-[var(--text-secondary)]",
            )}
            aria-hidden
          >
            {f.included ? <Check className="h-3 w-3" strokeWidth={2.5} /> : null}
          </span>
          <span className="text-base leading-snug text-[var(--text-primary)] [font-family:var(--font-body)]">
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
      <article className="pricing-card pricing-card--featured relative flex w-full min-h-[32rem] flex-col justify-between gap-6 overflow-hidden rounded-[24px] border border-[var(--border-default)] bg-[var(--surface-muted)] p-6 max-lg:min-h-0">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(165deg, rgba(116,196,215,0.35) 0%, rgba(234,248,250,0.95) 48%, #EAF8FA 100%)",
            }}
          />
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[var(--brand-yellow)] opacity-30 blur-2xl" />
          <div className="absolute -bottom-10 -left-6 h-36 w-36 rounded-full bg-[var(--brand-cyan)] opacity-25 blur-2xl" />
        </div>

        {d.badge ? (
          <span className="relative z-[1] self-start rounded-full bg-[var(--brand-yellow)] px-3 py-1 text-xs font-bold tracking-wide text-[var(--text-on-accent)] [font-family:var(--font-heading)]">
            {d.badge}
          </span>
        ) : (
          <span className="relative z-[1] h-6" aria-hidden />
        )}

        <div className="relative z-[1] flex flex-col gap-2">
          <h3 className="text-xl font-bold tracking-[-0.02em] text-[var(--text-primary)] [font-family:var(--font-heading)]">
            {d.title}
          </h3>
          <div className="flex flex-col gap-1">
            <p className="text-[2.5rem] font-extrabold leading-none tracking-[-0.03em] text-[var(--text-primary)] [font-family:var(--font-heading)]">
              {price}
            </p>
            <p className="text-sm text-[var(--text-secondary)] [font-family:var(--font-body)]">
              {note}
            </p>
          </div>
          <p className="mt-1 text-base leading-relaxed text-[var(--text-secondary)] [font-family:var(--font-body)]">
            {d.description}
          </p>
        </div>

        <div className="relative z-[1] mt-auto flex flex-col gap-5">
          <FeatureList features={d.features} />
          <CtaButton
            label={d.label}
            variant="glass"
            fullWidth
            className="pricing-cta"
          />
        </div>
      </article>
    );
  }

  return (
    <article className="pricing-card relative flex w-full min-h-[32rem] flex-col justify-between gap-6 rounded-[20px] border border-[var(--border-default)] bg-white p-6 max-lg:min-h-0">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold tracking-[-0.02em] text-[var(--text-primary)] [font-family:var(--font-heading)]">
          {d.title}
        </h3>
        <div className="flex flex-col gap-1">
          <p className="text-[2.5rem] font-extrabold leading-none tracking-[-0.03em] text-[var(--text-primary)] [font-family:var(--font-heading)]">
            {price}
          </p>
          <p className="text-sm text-[var(--text-secondary)] [font-family:var(--font-body)]">
            {note}
          </p>
        </div>
        <p className="mt-1 text-base leading-relaxed text-[var(--text-secondary)] [font-family:var(--font-body)]">
          {d.description}
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-5">
        <FeatureList features={d.features} />
        <CtaButton
          label={d.label}
          variant="glass"
          fullWidth
          className="pricing-cta"
        />
      </div>
    </article>
  );
}
