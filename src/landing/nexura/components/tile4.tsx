import type { Tile4Styles } from "../_styles";
import { cn } from "@/lib/utils";
export type Tile4Data = {
  href: string;
  description: string;
};
/** A content tile. */
export default function Tile4({ d, styles }: { d: Tile4Data; styles: Tile4Styles }) {
  return (
    <div className={cn("block relative shrink-0", styles.className)}>
      <a className="h-[1.65rem] flex relative p-0.5 rounded-[30px] justify-center items-center content-center gap-1 text-primary cursor-pointer" data-component="link" href={d.href}>
        <div className={cn("flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap", styles.className2)}>
          <p className="block text-background [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base leading-[1.375rem] tracking-[-0.48px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
            {d.description}
          </p>
        </div>
      </a>
    </div>
  );
}
