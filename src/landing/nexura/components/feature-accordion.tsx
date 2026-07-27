import { useState, type ReactNode } from "react";
import { Building2, Clock, FileSearch, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type FeatureItem = {
  title: string;
  description: string;
  icon: ReactNode;
  imgSrc: string;
  srcSet: string;
};

const iconClass = "h-6 w-6 shrink-0";

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
 * Nexura product feature list: exclusive expand + media swap.
 * Framer used variant state; the static clone only captured the open first item.
 */
export default function FeatureAccordion() {
  const [active, setActive] = useState(0);

  return (
    <div className="contents min-w-0">
      <div className="w-full block relative z-1 shrink-0">
        <div className="flex relative justify-center items-center content-center gap-16 overflow-clip max-lg:flex-wrap max-lg:gap-10">
          {/* Media panel */}
          <div className="w-[40.3125rem] h-112.5 block relative shrink-0 overflow-clip bg-clr-6 max-md:w-[20.1875rem] max-lg:h-[20.3125rem] max-lg:min-w-75 max-lg:flex-1 md:max-lg:w-84.5 2xl:w-[40.675rem]">
            <div className="h-104.5 flex absolute top-8 right-0 left-8 p-1 rounded-tl-xl justify-start items-start content-start shrink-0 gap-2.5 overflow-clip bg-background shadow-[var(--clr-7)_-2px_5px_10px_0px] max-lg:h-[19.0625rem] max-lg:top-5 max-lg:left-5">
              {FEATURES.map((f, i) => (
                <div
                  key={f.title}
                  className={cn(
                    "w-[40.225rem] h-[482.7px] block absolute min-w-0 shrink-0 overflow-clip aspect-[1.33333/1] max-md:w-[25.5625rem] max-md:h-[19.175rem] md:max-lg:w-[429.3px] md:max-lg:h-[20.125rem] 2xl:w-[649.7px] 2xl:h-[487.3px] transition-opacity duration-300 ease-out",
                    i === active ? "z-4 opacity-100" : "z-1 opacity-0 pointer-events-none",
                  )}
                  aria-hidden={i !== active}
                >
                  <div className="h-full block absolute top-0 inset-x-0">
                    <img
                      className="w-full h-[30.1875rem] block overflow-clip object-cover object-[0%_0%] aspect-[auto_1600/1200] max-md:h-[19.1875rem] md:max-lg:h-80.5 2xl:h-[30.4375rem]"
                      data-component="image"
                      alt=""
                      height={1200}
                      width={1600}
                      sizes="calc((calc(min(max(100vw - 40px, 1px), 1250px) - 128px) * 0.58 - 32px) * 1.05)"
                      src={f.imgSrc}
                      srcSet={f.srcSet}
                      // First panel is often LCP on mobile; keep it eager, defer the rest.
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding={i === 0 ? "async" : "async"}
                      fetchPriority={i === 0 ? "high" : "low"}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature rows */}
          <div
            className="w-[25.1875rem] flex relative flex-col justify-center items-stretch content-start grow shrink-0 basis-0 gap-0 max-md:w-[20.1875rem] max-lg:min-w-75 max-lg:gap-0 md:max-lg:w-84.5 2xl:w-[407.3px]"
            role="list"
          >
            {FEATURES.map((f, i) => {
              const open = i === active;
              return (
                <div key={f.title} className="w-full block relative shrink-0" role="listitem">
                  {i > 0 ? (
                    <div className="w-full block relative shrink-0 py-0">
                      <div className="flex relative justify-center items-center content-center">
                        <div className="basis-0 shrink-0 h-px block relative grow overflow-hidden after:content-[''] after:block after:absolute after:top-0 after:-bottom-px after:inset-x-0 after:h-0.5 after:bg-[var(--clr-12,#b7e1e9)]" />
                      </div>
                    </div>
                  ) : null}

                  <button
                    type="button"
                    className={cn(
                      "nexura-feature-row w-full flex relative flex-col justify-center items-start content-start gap-4 overflow-clip text-left cursor-pointer py-5 max-lg:cursor-pointer",
                      open ? "nexura-feature-row--open" : "",
                    )}
                    aria-expanded={open}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => {
                      // Desktop Nexura: hover switches active feature
                      if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
                        setActive(i);
                      }
                    }}
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
                      <div className="flex relative max-w-125 flex-col justify-start grow shrink-0 basis-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word]">
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
                          className="block text-muted-foreground [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base leading-[1.375rem] tracking-[-0.48px] text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']"
                          dir="auto"
                        >
                          {f.description}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
