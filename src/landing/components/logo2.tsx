import type { ReactNode } from "react";
import type { Logo2Styles } from "../_styles";
import { cn } from "../../lib/utils";
export type Logo2Data = {
  icon: ReactNode;
  height?: string;
  width?: string;
  preserveAspectRatio?: string;
};
/** A logo. */
export default function Logo2({ d, styles }: { d: Logo2Data; styles: Logo2Styles }) {
  return (
    <div className="w-39 h-14.5 block relative shrink-0 max-lg:hidden">
      <div className="w-39 h-14.5 block relative overflow-clip cursor-pointer max-lg:hidden">
        <div className={cn("block absolute shrink-0 max-lg:hidden", styles.className)} aria-hidden="true">
          <div className="h-full block max-lg:hidden">
            <svg className={cn("block overflow-hidden max-lg:hidden focus:outline-clr-7 focus:[outline-style:auto] focus:outline-[5px]", styles.className2)} data-component="image" fill="currentColor" height={d.height} width={d.width} preserveAspectRatio={d.preserveAspectRatio}>{d.icon}</svg>
          </div>
        </div>
      </div>
    </div>
  );
}
