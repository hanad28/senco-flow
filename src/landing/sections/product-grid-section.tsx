import { useState } from "react";
import ProductCard from "../components/product-card";
import { products as productsContent } from "../content";

/** Pricing — matches Parley layout: toggle + 3 cards, middle featured with photo. */
export default function ProductGridSection({ products = productsContent } = {}) {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <section
      id="pricing"
      className="w-full flex relative py-20 px-5 flex-col justify-start items-center content-center shrink-0 max-lg:py-10 max-lg:px-4"
    >
      <div className="w-full max-w-310 flex relative flex-col justify-center items-center content-center shrink-0 gap-10">
        {/* Header */}
        <div className="w-full flex relative justify-between items-end content-end shrink-0 gap-5 max-lg:flex-col max-lg:justify-center max-lg:items-center max-lg:content-center">
          <div className="w-[43.5%] flex relative flex-col justify-start items-start content-start shrink-0 gap-3 max-lg:w-full max-lg:items-center">
            <p className="block text-accent [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-[0.875rem] font-semibold text-balance max-lg:text-center">
              Pricing
            </p>
            <h2
              className="block text-color-001 [font-family:'DM_Sans',_'DM_Sans_Placeholder',_sans-serif] text-[3.25rem] font-medium leading-[3.4375rem] text-balance max-lg:text-[2rem] max-lg:leading-[2.125rem] max-lg:text-center"
              data-component="heading"
            >
              Simple, transparent pricing.{" "}
              <span className="text-muted font-normal italic">No surprises.</span>
            </h2>
          </div>
          <div className="w-105 flex relative flex-col justify-start shrink-0 max-lg:w-full max-md:w-full">
            <p className="block text-muted-foreground [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-base leading-[1.1875rem] text-balance max-lg:text-center">
              Start free, scale as you grow. Every plan includes core features. Upgrade when you need more seats or trust-wide control.
            </p>
          </div>
        </div>

        <div className="w-full flex relative flex-col justify-center items-center content-center gap-10">
          {/* Monthly / Annual toggle */}
          <div className="w-full flex relative justify-end items-center content-center shrink-0 gap-2.5 max-lg:justify-center">
            <div
              className="flex relative p-1 rounded-lg justify-start items-center content-center shrink-0 overflow-hidden bg-surface-2"
              role="group"
              aria-label="Billing period"
            >
              <button
                type="button"
                onClick={() => setBilling("monthly")}
                className={`relative flex py-2 px-3 rounded-lg justify-center items-center content-center shrink-0 gap-2 overflow-hidden transition-colors ${
                  billing === "monthly" ? "text-color-001" : "text-muted-foreground cursor-pointer"
                }`}
                aria-pressed={billing === "monthly"}
              >
                {billing === "monthly" ? (
                  <span className="absolute inset-0 z-0 rounded-lg bg-color-002 shadow-sm" />
                ) : null}
                <span className="relative z-[1] [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-base leading-[1.1875rem]">
                  Monthly
                </span>
              </button>
              <button
                type="button"
                onClick={() => setBilling("annual")}
                className={`relative flex py-2 px-3 rounded-lg justify-center items-center content-center shrink-0 gap-2 overflow-hidden transition-colors ${
                  billing === "annual" ? "text-color-001" : "text-muted-foreground cursor-pointer"
                }`}
                aria-pressed={billing === "annual"}
              >
                {billing === "annual" ? (
                  <span className="absolute inset-0 z-0 rounded-lg bg-color-002 shadow-sm" />
                ) : null}
                <span className="relative z-[1] [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-base leading-[1.1875rem]">
                  Annual
                </span>
                <span className="relative z-[1] [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-base font-medium leading-[1.1875rem] text-color-001">
                  -15%
                </span>
              </button>
            </div>
          </div>

          {/* Cards — equal columns, middle featured */}
          <div className="pricing-grid w-full grid grid-cols-1 gap-5 lg:grid-cols-3 lg:items-stretch">
            {products.map((d) => (
              <ProductCard key={d.variant} d={d} billing={billing} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
