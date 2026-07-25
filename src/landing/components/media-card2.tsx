import type { MediaCard2Styles } from "../_styles";
import { cn } from "../../lib/utils";
export type MediaCard2Data = {
  ariaposinset: string;
  description: string;
  alt: string;
  imgSrc: string;
  title: string;
  description2: string;
  kind?: string;
  kind3?: string;
  kind2?: string;
};
/** A card with media + heading. */
export default function MediaCard2({ d, styles }: { d: MediaCard2Data; styles: MediaCard2Styles }) {
  return (
    <li className={cn("w-93 list-item relative shrink-0 max-md:w-[21.4375rem] md:max-lg:w-184", styles.className)} aria-hidden="false" aria-posinset={d.ariaposinset} aria-setsize="5">
      <div className={cn("block relative shrink-0", styles.className2)}>
        <div className={cn("group/testimonial h-86.5 flex relative p-5 rounded-xl flex-col justify-between items-start content-start overflow-hidden bg-color-002 cursor-pointer transition-transform duration-300 hover:-translate-y-0.5 max-lg:[cursor:inherit]", styles.className3)}>
          <div className="w-93 h-86.5 block absolute top-0 left-0 z-0 opacity-0 min-w-0 shrink-0 overflow-clip transition-opacity duration-500 group-hover/testimonial:opacity-25">
            <div className={cn("h-full block absolute top-0", styles.className4)}>
              <img className="w-full h-86.5 block overflow-clip object-cover aspect-[auto_970/958]" alt="Decorative background" height="958" sizes="372px" src="/assets/cloned/images/d2d44959d13b.jpg" srcSet="/assets/cloned/images/34e555e37802.jpg 512w, /assets/cloned/images/d2d44959d13b.jpg 970w" width="970" data-component={d.kind} />
            </div>
          </div>
          <div className="w-83 flex relative opacity-80 flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-md:w-[18.9375rem] md:max-lg:w-174">
            <p className="block [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base leading-[1.1875rem]" dir="auto">
              {d.description}
            </p>
          </div>
          <div className="w-full flex relative justify-end items-end content-end shrink-0 gap-2">
            <div className={cn("flex relative flex-col justify-start items-start content-start grow shrink-0 basis-0 gap-2.5", styles.className5)}>
              <div className="w-13 h-13 block relative rounded-lg shrink-0 overflow-hidden after:content-[''] after:block after:absolute after:inset-0 after:w-13 after:h-13 after:rounded-tl-lg">
                <div className="w-13 h-full block absolute top-0 rounded-lg">
                  <img className="w-full h-13 block rounded-lg overflow-clip object-cover aspect-[auto_364/364]" alt={d.alt} height="364" src={d.imgSrc} width="364" data-component={d.kind2} />
                </div>
              </div>
              <div className="w-full flex relative flex-col justify-start items-start content-start shrink-0 gap-[0.3125rem]">
                <div className="w-[20.8125rem] flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-md:w-[215.9px] md:max-lg:w-[608.9px]">
                  <h5 className="block text-color-001 [font-family:'DM_Sans',_'DM_Sans_Placeholder',_sans-serif] text-xl font-medium leading-5.5 text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-lg max-lg:leading-[1.25rem]" dir="auto" data-component={d.kind3}>
                    {d.title}
                  </h5>
                </div>
                <div className="w-83 flex relative opacity-50 flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-md:w-[215.9px] md:max-lg:w-[608.9px]">
                  <p className="block [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base leading-[1.1875rem]" dir="auto">
                    {d.description2}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
