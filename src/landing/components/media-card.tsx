import type { MediaCardStyles } from "../_styles";
import { cn } from "../../lib/utils";

export type MediaCardData = {
  title: string;
  description?: string;
  image?: string;
  imageSrcSet?: string;
};

/** A selectable row in the How Unisen works list. */
export default function MediaCard({
  d,
  styles,
  active = false,
  onSelect,
}: {
  d: MediaCardData;
  styles: MediaCardStyles;
  active?: boolean;
  onSelect?: () => void;
}) {
  return (
    <div className={cn("w-full block relative shrink-0 max-lg:max-w-109.5", styles.className)}>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={active}
        className={cn(
          "group/media-row w-full flex relative py-5 justify-start items-start content-start gap-4 cursor-pointer text-left max-lg:max-w-full rounded-xl transition-colors duration-200",
          active ? "bg-transparent" : "hover:bg-surface/60",
        )}
      >
        <div
          className={cn(
            "h-6 flex relative justify-start items-center content-center shrink-0 transition-opacity duration-300",
            active ? "opacity-100" : "opacity-0 group-hover/media-row:opacity-100",
          )}
        >
          <div className="w-6 h-6 block relative shrink-0" aria-hidden="true">
            <div className="h-full block">
              <svg
                className="w-6 h-6 block overflow-hidden focus:outline-clr-7 focus:[outline-style:auto] focus:outline-[5px]"
                data-component="icon"
                fill="currentColor"
              >
                <use href="#svg11121512309" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-119.5 flex relative flex-col justify-center items-start content-start grow shrink-0 basis-0 gap-2 max-md:w-[18.9375rem] md:max-lg:w-99.5">
          <div className="w-full flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word]">
            <h4
              className={cn(
                "block [font-family:'DM_Sans',_'DM_Sans_Placeholder',_sans-serif] text-2xl font-medium leading-[1.625rem] text-balance max-lg:text-xl max-lg:leading-5.5 transition-colors duration-200",
                active ? "text-color-001" : "text-muted group-hover/media-row:text-color-001",
              )}
              data-component="heading"
              dir="auto"
            >
              {d.title}
            </h4>
          </div>
          {d.description ? (
            <div
              className={cn(
                "w-full grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="block text-muted-foreground [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-sm leading-[1.0625rem] text-balance pt-1 pb-0.5">
                  {d.description}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </button>
    </div>
  );
}
