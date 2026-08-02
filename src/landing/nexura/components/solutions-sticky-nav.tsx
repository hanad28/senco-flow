import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import AnimatedTabs from "@/components/ui/animated-tabs";

const TABS = [
  { id: "solution-1", label: "For schools" },
  { id: "solution-2", label: "For families" },
  { id: "solution-3", label: "For specialists" },
  { id: "solution-4", label: "For councils" },
] as const;

/** Sticky offset under Unisen fixed nav: matches scroll-margin on panels. */
const SPY_OFFSET_PX = 120;
const MOBILE_SPY_OFFSET_PX = 160;

/**
 * Nexura-style sticky solution links:
 * - desktop: vertical sticky sidebar with underline active state
 * - mobile: horizontal pill tabs (AnimatedTabs) under the fixed nav
 * - scrollspy picks the last section whose top has crossed the sticky line
 */
export default function SolutionsStickyNav() {
  const [active, setActive] = useState<string>(TABS[0].id);

  useEffect(() => {
    const update = () => {
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;
      const offset = isMobile ? MOBILE_SPY_OFFSET_PX : SPY_OFFSET_PX;
      let current = TABS[0].id;
      for (const tab of TABS) {
        const el = document.getElementById(tab.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= offset + 24) {
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

  function goTo(tabId: string) {
    setActive(tabId);
    const el = document.getElementById(tabId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // Keep hash for deep links without fighting smooth scroll
    if (typeof history !== "undefined") {
      history.replaceState(null, "", `#${tabId}`);
    }
  }

  return (
    <>
      {/* Mobile: sticky horizontal tabs (scrollable, thumb-sized) */}
      <div
        className="nexura-solutions-mobile-tabs sticky z-20 -mx-1 mb-3 w-[calc(100%+0.5rem)] max-w-none shrink-0 overflow-x-auto px-1 py-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
        role="navigation"
        aria-label="Solutions"
      >
        <AnimatedTabs
          ariaLabel="Solutions"
          className="!flex w-max min-w-full gap-1 rounded-full bg-[var(--surface-muted,#eaf8fa)] p-1 shadow-[0_1px_0_rgba(36,74,112,0.06)] [&_button]:min-h-10 [&_button]:shrink-0 [&_button]:px-3.5 [&_button]:text-sm [&_button]:whitespace-nowrap"
          layoutId="nexura-solutions-mobile"
          activeTab={active}
          onChange={goTo}
          tabs={TABS.map((tab) => ({ id: tab.id, label: tab.label }))}
          variant="pill"
        />
      </div>

      {/* Desktop: vertical sticky sidebar */}
      <div
        className="hidden w-[14.2rem] h-auto sticky top-28 z-1 p-2 flex-col justify-start items-start content-start grow shrink-0 basis-0 gap-4 overflow-visible lg:flex 2xl:w-[14.325rem]"
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
                onClick={(e) => {
                  e.preventDefault();
                  goTo(tab.id);
                }}
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
                  <span
                    className={cn(
                      "pointer-events-none absolute left-0 right-0 -bottom-1 h-[2px] origin-left rounded-full bg-[var(--text-primary,#244a70)] transition-transform duration-200 ease-out",
                      selected
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100 group-hover:bg-[var(--brand-blue,#3b8ac1)]",
                    )}
                    aria-hidden
                  />
                </span>
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
}
