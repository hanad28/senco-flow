import { useState } from "react";
import ProductCard from "../components/product-card";
import { products as productsContent } from "../../content";

/**
 * Pricing grid — Nexura structure (billing toggle + 3 cards) with
 * Unisen content, monthly/yearly behaviour, and design-system chrome.
 */
export default function ProductGridSection({ products = productsContent } = {}) {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <div id="pricing" className="w-full relative z-1 flex shrink-0 flex-col items-center gap-8 scroll-mt-28">
      {/* Monthly / Yearly toggle — Nexura pill track */}
      <div
        className="relative z-1 flex shrink-0 items-center justify-center gap-[0.1875rem] rounded-[40px] bg-[var(--surface-muted,#EAF8FA)] p-[0.1875rem]"
        role="group"
        aria-label="Billing period"
      >
        <button
          type="button"
          onClick={() => setBilling("monthly")}
          aria-pressed={billing === "monthly"}
          className={[
            "relative flex min-w-[7rem] cursor-pointer items-center justify-center gap-2.5 overflow-clip rounded-[40px] px-4 py-2 transition-colors duration-200",
            billing === "monthly"
              ? "text-[var(--text-primary)]"
              : "text-[var(--text-secondary)] opacity-70 hover:opacity-100",
          ].join(" ")}
        >
          {billing === "monthly" ? (
            <span
              className="absolute inset-0 z-0 rounded-[40px] bg-white shadow-[0_2px_10px_rgba(36,74,112,0.08)]"
              aria-hidden
            />
          ) : null}
          <span className="relative z-[1] text-base font-medium tracking-[-0.02em] [font-family:var(--font-body)]">
            Monthly
          </span>
        </button>

        <button
          type="button"
          onClick={() => setBilling("annual")}
          aria-pressed={billing === "annual"}
          className={[
            "relative flex min-w-[7rem] cursor-pointer items-center justify-center gap-2 overflow-clip rounded-[40px] px-4 py-2 transition-colors duration-200",
            billing === "annual"
              ? "text-[var(--text-primary)]"
              : "text-[var(--text-secondary)] opacity-70 hover:opacity-100",
          ].join(" ")}
        >
          {billing === "annual" ? (
            <span
              className="absolute inset-0 z-0 rounded-[40px] bg-white shadow-[0_2px_10px_rgba(36,74,112,0.08)]"
              aria-hidden
            />
          ) : null}
          <span className="relative z-[1] text-base font-medium tracking-[-0.02em] [font-family:var(--font-body)]">
            Yearly
          </span>
          <span className="relative z-[1] rounded-full bg-[var(--brand-yellow)] px-2 py-0.5 text-xs font-bold text-[var(--text-on-accent)] [font-family:var(--font-heading)]">
            -15%
          </span>
        </button>
      </div>

      {/* Cards */}
      <div className="pricing-grid grid w-full max-w-[70rem] grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
        {products.map((d) => (
          <ProductCard key={d.variant} d={d} billing={billing} />
        ))}
      </div>
    </div>
  );
}
