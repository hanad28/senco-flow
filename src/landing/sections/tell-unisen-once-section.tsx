import { useMemo, useState } from "react";
import Icon from "../svgs/svg-icon";
import MediaCard from "../components/media-card";
import { MediaCard_styles } from "../_styles";
import { mediaCardData as mediaCardDataContent } from "../content";

/** How Unisen works — list tabs switch the preview image (Parley Intelligent Delegation). */
export default function TellUnisenOnceSection({
  mediaCardData = mediaCardDataContent,
} = {}) {
  const items = useMemo(
    () =>
      mediaCardData.map((d, i) => ({
        ...d,
        styles: MediaCard_styles[Math.min(i, MediaCard_styles.length - 1)]!,
      })),
    [mediaCardData],
  );

  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0]!;

  return (
    <section className="w-full flex relative py-20 px-5 flex-col justify-start items-center content-center shrink-0 max-lg:py-10 max-lg:px-4">
      <div className="w-full max-w-310 flex relative flex-col justify-center items-center content-center shrink-0 gap-10 overflow-clip max-lg:gap-5">
        <div className="w-full flex relative justify-start items-end content-end shrink-0 gap-5 max-lg:flex-col">
          <div className="w-[64.5%] flex relative flex-col justify-start items-start content-start grow shrink-0 basis-0 gap-3 max-lg:w-full max-lg:grow-[initial] max-lg:basis-[initial]">
            <div className="w-[144.3px] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap max-md:w-[21.4375rem] max-lg:whitespace-pre-wrap max-lg:[word-break:break-word] max-lg:[overflow-wrap:break-word] max-lg:[text-wrap:initial] md:max-lg:w-184">
              <p className="block text-accent [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-[0.875rem] font-semibold whitespace-pre-wrap text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:[white-space:inherit]" dir="auto">
                How Unisen works
              </p>
            </div>
            <div className="w-full max-w-135 flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word]">
              <h2 className="block text-muted [font-family:'DM_Sans',_'DM_Sans_Placeholder',_sans-serif] text-[3.25rem] italic leading-[3.4375rem] text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-[2rem] max-lg:leading-[2.125rem]" data-component="heading" dir="auto">
                <span className="inline text-color-001 font-medium not-italic">
                  See what’s due.
                </span>
                <span className="inline text-color-001 font-medium not-italic">
                  <br className="inline" />
                </span>
                Do the work that matters.
              </h2>
            </div>
          </div>
          <div className="w-105 flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-md:w-[21.4375rem] md:max-lg:w-184">
            <p className="block text-muted-foreground [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-lg leading-[1.375rem] text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
              Track LA consultations, review professional advice, and draft your 15-day response in the school prototype workspace. A separate family draft-plan demo is also available, not the same workspace.
            </p>
          </div>
        </div>

        <div className="w-full block relative shrink-0">
          <div className="flex relative justify-start items-start content-start gap-10 max-lg:gap-5 max-lg:flex-col">
            <div className="w-129.5 flex relative flex-col justify-start items-start content-start grow shrink-0 basis-0 gap-1 max-md:w-[21.4375rem] md:max-lg:w-184">
              {items.map((item, i) =>
                i === 0 ? (
                  // First row keeps the always-visible check icon from the original capture
                  <div key={item.title} className="w-full block relative shrink-0 max-lg:max-w-109.5">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={active === i}
                      className="group/media-row w-full flex relative py-5 justify-start items-start content-start gap-4 cursor-pointer text-left max-lg:max-w-full rounded-xl"
                    >
                      <div className="flex relative justify-start items-center content-center shrink-0">
                        <div className="w-6 h-6 block relative shrink-0" aria-hidden="true">
                          <div className="h-full block">
                            <Icon />
                          </div>
                        </div>
                      </div>
                      <div className="w-119.5 flex relative flex-col justify-center items-start content-start grow shrink-0 basis-0 gap-2 max-md:w-[18.9375rem] md:max-lg:w-99.5">
                        <h4
                          className={`block [font-family:'DM_Sans',_'DM_Sans_Placeholder',_sans-serif] text-2xl font-medium leading-[1.625rem] text-balance max-lg:text-xl max-lg:leading-5.5 transition-colors ${
                            active === i ? "text-color-001" : "text-muted group-hover/media-row:text-color-001"
                          }`}
                          data-component="heading"
                          dir="auto"
                        >
                          {item.title}
                        </h4>
                        <div
                          className={`w-full grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                            active === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="min-h-0 overflow-hidden">
                            <p className="block text-muted-foreground [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-sm leading-[1.0625rem] text-balance pt-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                ) : (
                  <MediaCard
                    key={item.title}
                    d={item}
                    styles={item.styles}
                    active={active === i}
                    onSelect={() => setActive(i)}
                  />
                ),
              )}

              {/* Mobile preview under the list */}
              <div className="hidden max-lg:w-full max-lg:block max-lg:relative max-lg:rounded-xl max-lg:shrink-0 max-lg:order-[1] max-lg:overflow-hidden max-lg:aspect-[1.20922/1]">
                <div className="hidden max-lg:h-full max-lg:block max-lg:absolute max-lg:top-0 max-lg:inset-x-0 max-lg:rounded-xl">
                  <img
                    key={current.image}
                    className="hidden max-lg:w-full max-md:h-71 max-lg:block max-lg:rounded-xl max-lg:overflow-clip max-lg:object-cover max-lg:aspect-[auto_1364/1128] md:max-lg:h-[38.0625rem] max-lg:animate-in max-lg:fade-in max-lg:duration-300"
                    alt={current.title}
                    height="1128"
                    sizes="max(min(100vw - 32px, 1240px), 1px)"
                    src={current.image}
                    srcSet={current.imageSrcSet}
                    width="1364"
                  />
                </div>
              </div>
            </div>

            {/* Desktop preview — swaps with active item */}
            <div className="w-170.5 block relative rounded-xl shrink-0 overflow-hidden aspect-[1.20922/1] max-lg:hidden bg-surface-2">
              <div className="w-170.5 h-full block absolute top-0 rounded-xl max-lg:hidden">
                <img
                  key={current.image}
                  className="w-full h-141 block rounded-xl overflow-clip object-cover aspect-[auto_1364/1128] max-lg:hidden transition-opacity duration-300"
                  data-component="image"
                  alt={current.title}
                  height="1128"
                  sizes="682px"
                  src={current.image}
                  srcSet={current.imageSrcSet}
                  width="1364"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
