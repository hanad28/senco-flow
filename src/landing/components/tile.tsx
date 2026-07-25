import type { TileStyles } from "../_styles";
import { cn } from "../../lib/utils";
export type TileData = {
  description: string;
};
/** A content tile. */
export default function Tile({ d, styles }: { d: TileData; styles: TileStyles }) {
  return (
    <div className={cn("block relative shrink-0", styles.className)}>
      <div className={cn("flex relative py-2 px-3 rounded-lg justify-center items-center content-center gap-2.5 overflow-hidden [backdrop-filter:blur(6px)] cursor-pointer", styles.className2)}>
        <div className={cn("flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap", styles.className3)}>
          <p className="block text-color-001 [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-base leading-[1.1875rem]" dir="auto">
            {d.description}
          </p>
        </div>
      </div>
    </div>
  );
}
