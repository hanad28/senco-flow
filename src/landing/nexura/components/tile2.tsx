import type { Tile2Styles } from "../_styles";
import { cn } from "@/lib/utils";
export type Tile2Data = {
  description: string;
  description2: string;
};
/** A content tile. */
export default function Tile2({ d, styles }: { d: Tile2Data; styles: Tile2Styles }) {
  return (
    <div className="w-full flex relative justify-start items-center content-center shrink-0 gap-2.5">
      <div className="w-6 h-6 flex relative rounded-[100px] justify-center items-center content-center shrink-0 gap-2.5 bg-surface-2">
        <div className={cn("flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap", styles.className)}>
          <p className="block text-color-004 [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-sm leading-[1.25rem] tracking-[-0.42px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
            {d.description}
          </p>
        </div>
      </div>
      <div className="min-w-0 w-full flex relative flex-col justify-start grow shrink-0 basis-0 md:max-lg:w-141.5">
        <p className="block text-muted-foreground [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base leading-[1.375rem] tracking-[-0.48px] text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
          {d.description2}
        </p>
      </div>
    </div>
  );
}
