import type { ReactNode } from "react";
import type { LogoStyles } from "../_styles";
import { cn } from "../../lib/utils";
export type LogoData = {
  ariaposinset: string;
  icon: ReactNode;
};
/** A logo. */
export default function Logo({ d, styles }: { d: LogoData; styles: LogoStyles }) {
  return (
    <li className={cn("hidden max-lg:list-item max-lg:relative max-lg:shrink-0", styles.className)} aria-hidden="false" aria-posinset={d.ariaposinset} aria-setsize="5">
      <div className="hidden max-lg:w-39 max-lg:h-14.5 max-lg:block max-lg:relative max-lg:shrink-0">
        <div className="hidden max-lg:w-39 max-lg:h-14.5 max-lg:block max-lg:relative max-lg:overflow-clip max-lg:cursor-pointer">
          <div className={cn("hidden", styles.className2)} aria-hidden="true">
            <div className="hidden max-lg:h-full max-lg:block">
              <svg className={cn("hidden max-lg:block max-lg:overflow-hidden", styles.className3)} height="100%" width="100%" preserveAspectRatio="none" fill="currentColor">{d.icon}</svg>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
