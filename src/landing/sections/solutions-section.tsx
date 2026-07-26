import { useState } from "react";
import { solutions as solutionsContent, type SolutionItem } from "../content";

/** Nexura “Built for every marketing team” — Unisen audiences. */
export default function SolutionsSection({
  items = solutionsContent,
}: {
  items?: SolutionItem[];
} = {}) {
  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0]!;

  return (
    <section
      id="solution"
      className="w-full flex relative py-20 px-5 flex-col justify-start items-center content-center shrink-0 max-lg:py-12 max-lg:px-4"
      aria-labelledby="solutions-heading"
    >
      <div className="w-full max-w-310 flex flex-col items-center gap-10 max-lg:gap-8">
        <div className="flex max-w-2xl flex-col items-center gap-3 text-center">
          <p className="text-accent [font-family:var(--font-body)] text-sm font-semibold">
            Solutions
          </p>
          <h2
            id="solutions-heading"
            className="text-color-001 [font-family:var(--font-heading)] text-[2.5rem] font-bold leading-[1.15] tracking-[-0.04em] text-balance max-lg:text-[1.75rem]"
            data-component="heading"
          >
            Built for every party in EHC work.
          </h2>
          <p className="text-muted-foreground [font-family:var(--font-body)] text-base leading-relaxed text-balance">
            Whether you are a school SENCO, a parent carer, or a trust inclusion lead, Unisen adapts to how you work.
          </p>
        </div>

        <div
          className="flex flex-wrap items-center justify-center gap-2"
          role="tablist"
          aria-label="Audience"
        >
          {items.map((item, i) => {
            const selected = i === active;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                id={`${item.id}-tab`}
                aria-controls={item.id}
                className={[
                  "rounded-full px-4 py-2 text-sm font-semibold [font-family:var(--font-body)] transition-colors duration-150 cursor-pointer",
                  selected
                    ? "bg-color-001 text-background"
                    : "bg-clr-0 text-color-001 hover:bg-surface-3",
                ].join(" ")}
                onClick={() => setActive(i)}
              >
                {item.tab}
              </button>
            );
          })}
        </div>

        <div
          id={current.id}
          role="tabpanel"
          aria-labelledby={`${current.id}-tab`}
          className="grid w-full max-w-[53rem] grid-cols-2 gap-10 overflow-clip max-lg:grid-cols-1 max-lg:gap-6"
        >
          <div className="flex flex-col justify-center gap-4">
            <h3 className="text-color-001 [font-family:var(--font-heading)] text-[1.75rem] font-bold leading-snug tracking-[-0.03em] text-balance max-lg:text-xl">
              {current.title}
            </h3>
            <p className="text-muted-foreground [font-family:var(--font-body)] text-base leading-relaxed">
              {current.description}
            </p>
            <ul className="mt-2 flex flex-col gap-2.5">
              {current.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-color-001 [font-family:var(--font-body)] text-sm font-medium"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-yellow,#ffde59)]"
                    aria-hidden
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex min-h-[16rem] flex-col justify-between rounded-[20px] border border-[var(--border-default)] bg-surface-2 p-6 max-lg:min-h-[12rem]">
            <p className="text-accent [font-family:var(--font-body)] text-xs font-semibold uppercase tracking-wide">
              {current.tab}
            </p>
            <div className="flex flex-col gap-3">
              {current.points.map((point, i) => (
                <div
                  key={point}
                  className="rounded-xl border border-[var(--border-default)] bg-background px-4 py-3 text-sm font-medium text-color-001 [font-family:var(--font-body)]"
                >
                  <span className="mr-2 text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
