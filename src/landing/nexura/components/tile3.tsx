import type { Tile3Styles } from "../_styles";
import { cn } from "@/lib/utils";
export type Tile3Data = {
  href: string;
  description: string;
};
/** A content tile. */
export default function Tile3({ d, styles }: { d: Tile3Data; styles: Tile3Styles }) {
  return (
    <div className={cn("block relative shrink-0 max-lg:hidden", styles.className)}>
      <a className={cn("flex relative flex-col justify-center items-start content-start gap-2.5 overflow-clip text-primary cursor-pointer max-lg:hidden after:content-[''] after:block after:absolute after:inset-0 after:h-[1.4rem] max-lg:after:hidden", styles.className2)} data-component="link" href={d.href}>
        <div className={cn("flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap max-lg:hidden", styles.className3)}>
          <p className={cn("block [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-medium leading-[1.375rem] tracking-[-0.48px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:hidden", styles.className4)} dir="auto">
            {d.description}
          </p>
        </div>
      </a>
    </div>
  );
}
