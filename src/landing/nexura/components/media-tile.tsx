import type { ReactNode } from "react";
import type { MediaTileStyles } from "../_styles";
import { cn } from "@/lib/utils";
export type MediaTileData = {
  ariahidden: string;
  name?: string;
  name2?: string;
  kind?: string;
  icon: ReactNode;
  description: string;
  description2: string;
};
/** A media tile. */
export default function MediaTile({ d, styles }: { d: MediaTileData; styles: MediaTileStyles }) {
  return (
    <li className="contents min-w-0">
      <div className={cn("w-[22.15rem] h-17.5 block relative shrink-0 max-md:w-[17.1875rem] md:max-lg:w-167 2xl:w-[22.4rem]", styles.className)} aria-hidden={d.ariahidden} name={d.name}>
        <div className={cn("h-17.5 flex relative p-3 rounded-xl justify-start items-center content-center gap-4 overflow-clip bg-background shadow-[var(--clr-7)_0px_5px_20px_0px] after:content-[''] after:block after:absolute after:inset-0 after:h-17.5 after:rounded-tl-xl", styles.className2)} name={d.name2}>
          <div className={cn("flex relative p-2 rounded-[100px] justify-center items-center content-center shrink-0 gap-2.5", styles.className3)}>
            <svg className={cn("h-4.5 block relative shrink-0 overflow-hidden aspect-square", styles.className4)} data-component={d.kind} role="presentation" viewBox="0 0 24 24" fill="currentColor">{d.icon}</svg>
          </div>
          <div className="flex relative flex-col justify-center items-start content-start shrink-0">
            <div className={cn("flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap", styles.className5)}>
              <p className="block [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-medium leading-[1.375rem] tracking-[-0.48px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                {d.description}
              </p>
            </div>
            <div className={cn("flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap", styles.className6)}>
              <p className="block text-muted-foreground [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-sm leading-[1.25rem] tracking-[-0.42px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                {d.description2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
