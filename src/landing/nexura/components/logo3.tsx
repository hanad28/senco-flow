import type { Logo3Styles } from "../_styles";
import { cn } from "@/lib/utils";
export type Logo3Data = {
  ariaposinset: string;
  height: string;
  imgSrc: string;
};
/** A logo. */
export default function Logo3({ d, styles }: { d: Logo3Data; styles: Logo3Styles }) {
  return (
    <li className="hidden max-lg:list-item max-lg:relative max-lg:shrink-0" aria-hidden="false" aria-posinset={d.ariaposinset} aria-setsize="8">
      <div className="hidden max-lg:w-17.5 max-lg:h-17.5 max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-center max-lg:items-center max-lg:content-center max-lg:shrink-0 max-lg:bg-surface">
        <div className={cn("hidden max-lg:w-8 max-lg:block max-lg:relative max-lg:shrink-0", styles.className)}>
          <div className={cn("hidden", styles.className2)}>
            <img className={cn("hidden max-lg:w-full max-lg:block max-lg:overflow-clip max-lg:object-cover", styles.className3)} alt="" height={d.height} src={d.imgSrc} width="400" />
          </div>
        </div>
      </div>
    </li>
  );
}
