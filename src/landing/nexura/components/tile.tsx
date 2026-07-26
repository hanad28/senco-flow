import type { TileStyles } from "../_styles";
import { cn } from "@/lib/utils";
export type TileData = {
  href: string;
  description: string;
};
/** A content tile. */
export default function Tile({ d, styles }: { d: TileData; styles: TileStyles }) {
  return (
    <div className={cn("block relative shrink-0 max-lg:hidden", styles.className)}>
      <a className="h-[2.4rem] flex relative py-2 px-3 rounded-[30px] justify-center items-center content-center gap-1 text-primary bg-clr-0 cursor-pointer max-lg:hidden" data-component="link" href={d.href}>
        <div className={cn("flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap max-lg:hidden", styles.className2)}>
          <p className="block text-foreground [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-medium leading-[1.375rem] tracking-[-0.48px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:hidden" dir="auto">
            {d.description}
          </p>
        </div>
      </a>
    </div>
  );
}
