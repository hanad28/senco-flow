import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "solution-1", label: "For SENCOs" },
  { id: "solution-2", label: "For schools" },
  { id: "solution-3", label: "For families" },
] as const;

/** Sticky offset under Unisen fixed nav — matches scroll-margin on panels. */
const SPY_OFFSET_PX = 120;

/**
 * Nexura-style sticky solution links:
 * - anchor navigation (hash + scroll-margin)
 * - scrollspy picks the last section whose top has crossed the sticky line
 * - active = dark text + underline under the label
 */
export default function SolutionsStickyNav() {
  const [active, setActive] = useState<string>(TABS[0].id);

  useEffect(() => {
    const update = () => {
      let current = TABS[0].id;
      for (const tab of TABS) {
        const el = document.getElementById(tab.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= SPY_OFFSET_PX + 24) {
          current = tab.id;
        }
      }
      setActive((prev) => (prev === current ? prev : current));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="w-[14.2rem] h-auto flex sticky top-28 z-1 p-2 flex-col justify-start items-start content-start grow shrink-0 basis-0 gap-4 overflow-visible max-lg:hidden 2xl:w-[14.325rem]"
      role="navigation"
      aria-label="Solutions"
    >
      {TABS.map((tab) => {
        const selected = active === tab.id;
        return (
          <div key={tab.id} className="block relative w-full shrink-0">
            <a
              href={`#${tab.id}`}
              className="nexura-solution-tab group relative inline-flex flex-col items-start justify-center gap-1.5 overflow-visible text-primary cursor-pointer"
              data-component="link"
              aria-current={selected ? "true" : undefined}
              onClick={() => setActive(tab.id)}
            >
              <span
                className={cn(
                  "relative block whitespace-nowrap text-base font-medium leading-[1.375rem] tracking-[-0.48px] transition-colors duration-200 [font-family:var(--font-body)]",
                  selected
                    ? "text-[var(--text-primary,#244a70)]"
                    : "text-[var(--text-secondary,#40689c)] group-hover:text-[var(--text-primary,#244a70)]",
                )}
              >
                {tab.label}
                {/* Nexura-style underline under active label (text width) */}
                <span
                  className={cn(
                    "pointer-events-none absolute left-0 right-0 -bottom-1 h-[2px] origin-left rounded-full bg-[var(--text-primary,#244a70)] transition-transform duration-200 ease-out",
                    selected ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-hover:bg-[var(--brand-blue,#3b8ac1)]",
                  )}
                  aria-hidden
                />
              </span>
            </a>
          </div>
        );
      })}
    </div>
  );
}
