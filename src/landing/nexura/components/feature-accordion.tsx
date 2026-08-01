import { useState, type ReactNode } from "react";
import { Building2, Clock, FileSearch, FolderOpen } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type FeatureItem = {
  title: string;
  description: string;
  icon: ReactNode;
  imgSrc: string;
  srcSet: string;
};

const iconClass = "h-6 w-6 shrink-0";

/** Nexura Features appear: enter x:80 / opacity 0, 50ms stagger, 0.8s ease. */
const APPEAR_EASE = [0.2, 0, 0.2, 1] as const;
const APPEAR_DELAYS = [0, 0.05, 0.1, 0.15] as const;

const FEATURES: FeatureItem[] = [
  {
    title: "Visibility",
    description:
      "A shared timeline of every party's statutory clocks: consultation, advice, and draft-plan deadlines in one place.",
    icon: <Clock className={iconClass} strokeWidth={1.75} aria-hidden />,
    imgSrc: "/assets/nexura/images/b82b7b40401d.png",
    srcSet:
      "/assets/nexura/images/b00e8652ddd0.png 512w, /assets/nexura/images/334ea838e731.png 1024w, /assets/nexura/images/b82b7b40401d.png 1600w",
  },
  {
    title: "Execution assistance",
    description:
      "Draft statutory responses, flag vague provision against IPSEA's specificity standard, and capture a clear cannot-meet rationale.",
    icon: <FileSearch className={iconClass} strokeWidth={1.75} aria-hidden />,
    imgSrc: "/assets/nexura/images/a8be68743346.png",
    srcSet:
      "/assets/nexura/images/7f8142532bd1.png 512w, /assets/nexura/images/00590ae47303.png 1024w, /assets/nexura/images/a8be68743346.png 1600w",
  },
  {
    title: "Communication",
    description:
      "Evidence, advice, and school forms stay with the case so nothing is re-chased by email, post, or phone.",
    icon: <Building2 className={iconClass} strokeWidth={1.75} aria-hidden />,
    imgSrc: "/assets/nexura/images/c0fd2fc412e0.png",
    srcSet:
      "/assets/nexura/images/01c1424f2fca.png 512w, /assets/nexura/images/bb7bee0f8baf.png 1024w, /assets/nexura/images/c0fd2fc412e0.png 1600w",
  },
  {
    title: "Built on the law",
    description:
      "Grounded in IPSEA, the Children and Families Act 2014, and the SEND Code of Practice. AI suggestions cite uploaded sources; they never invent provision.",
    icon: <FolderOpen className={iconClass} strokeWidth={1.75} aria-hidden />,
    imgSrc: "/assets/nexura/images/1326bc88be38.png",
    srcSet:
      "/assets/nexura/images/08167f6f6a5e.png 512w, /assets/nexura/images/2bf9491f9d2d.png 1024w, /assets/nexura/images/1326bc88be38.png 1600w",
  },
];

/**
 * Nexura product feature list: exclusive expand + media swap on click,
 * scroll-appear on the four rows (opacity + x slide, staggered).
 */
export default function FeatureAccordion() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="contents min-w-0">
      <div className="w-full block relative z-1 shrink-0">
        {/* overflow visible so x:80 enter isn't clipped */}
        <div className="flex relative w-full justify-center items-center content-center gap-16 overflow-visible max-lg:flex-col max-lg:items-stretch max-lg:gap-8">
          {/* Media panel */}
          <div className="nexura-feature-media w-[40.3125rem] h-112.5 block relative shrink-0 overflow-clip bg-clr-6 max-md:w-full max-lg:h-[14.5rem] max-lg:min-w-0 max-lg:w-full md:max-lg:w-full 2xl:w-[40.675rem]">
            <div className="nexura-feature-panel h-104.5 flex absolute top-8 right-0 left-8 p-1 rounded-tl-xl justify-start items-start content-start shrink-0 gap-2.5 overflow-clip bg-background shadow-[var(--clr-7)_-2px_5px_10px_0px] max-lg:inset-3 max-lg:top-3 max-lg:right-0 max-lg:left-3 max-lg:h-auto max-lg:bottom-0 max-lg:rounded-xl">
              {FEATURES.map((f, i) => (
                <div
                  key={f.title}
                  className={cn(
                    "w-[40.225rem] h-[482.7px] block absolute inset-0 min-w-0 shrink-0 overflow-clip max-md:w-full max-md:h-full md:max-lg:w-full md:max-lg:h-full 2xl:w-[649.7px] 2xl:h-[487.3px] transition-opacity duration-300 ease-out",
                    i === active ? "z-4 opacity-100" : "z-1 opacity-0 pointer-events-none",
                  )}
                  aria-hidden={i !== active}
                >
                  <div className="h-full block absolute top-0 inset-x-0">
                    <img
                      className="w-full h-full block overflow-clip object-cover object-[0%_0%] max-lg:object-left-top"
                      data-component="image"
                      alt=""
                      height={1200}
                      width={1600}
                      sizes="(max-width: 1023px) 100vw, calc((min(max(100vw - 40px, 1px), 1250px) - 128px) * 0.58)"
                      src={f.imgSrc}
                      srcSet={f.srcSet}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={i === 0 ? "high" : "low"}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature rows */}
          <div
            className="w-[25.1875rem] flex relative flex-col justify-center items-stretch content-start grow shrink-0 basis-0 gap-0 max-md:w-full max-lg:min-w-0 max-lg:w-full max-lg:gap-0 md:max-lg:w-full 2xl:w-[407.3px]"
            role="list"
          >
            {FEATURES.map((f, i) => {
              const open = i === active;
              return (
                <motion.div
                  key={f.title}
                  className="w-full block relative shrink-0"
                  role="listitem"
                  initial={reduceMotion ? false : { opacity: 0, x: 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    delay: APPEAR_DELAYS[i] ?? 0,
                    duration: 0.8,
                    ease: APPEAR_EASE,
                  }}
                >
                  {i > 0 ? (
                    <div className="nexura-feature-divider w-full block relative shrink-0 py-0" aria-hidden>
                      <div className="flex relative justify-center items-center content-center">
                        <div className="basis-0 shrink-0 h-px block relative grow overflow-hidden after:content-[''] after:block after:absolute after:top-0 after:-bottom-px after:inset-x-0 after:h-0.5 after:bg-[var(--clr-12,#b7e1e9)]" />
                      </div>
                    </div>
                  ) : null}

                  <button
                    type="button"
                    className={cn(
                      "nexura-feature-row w-full flex relative flex-col justify-center items-start content-start gap-3 overflow-clip text-left cursor-pointer py-4 max-lg:py-3.5 max-lg:cursor-pointer",
                      open ? "nexura-feature-row--open" : "",
                    )}
                    aria-expanded={open}
                    onClick={() => setActive(i)}
                  >
                    <div className="w-full flex relative justify-start items-center content-center shrink-0 gap-2.5">
                      <span
                        className={cn(
                          "flex shrink-0 text-current transition-colors duration-200",
                          open ? "text-foreground" : "text-muted",
                        )}
                      >
                        {f.icon}
                      </span>
                      <div className="flex relative min-w-0 max-w-125 flex-col justify-start grow shrink-0 basis-0 whitespace-normal [word-break:break-word] [overflow-wrap:break-word]">
                        <h6
                          className={cn(
                            "block [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-xl font-medium leading-7 tracking-[-0.8px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-lg max-lg:leading-[1.5625rem] max-lg:tracking-[-0.72px] transition-colors duration-200",
                            open ? "text-foreground" : "text-muted",
                          )}
                          data-component="heading"
                          dir="auto"
                        >
                          {f.title}
                        </h6>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "w-full max-w-125 grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <p
                          className="block text-muted-foreground [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base leading-[1.45] tracking-[-0.48px] text-pretty [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']"
                          dir="auto"
                        >
                          {f.description}
                        </p>
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
