import type { LogoStyles } from "../_styles";
import { cn } from "@/lib/utils";
export type LogoData = {
  imgSrc: string;
  width: string;
};
/** A logo. */
export default function Logo({ d, styles }: { d: LogoData; styles: LogoStyles }) {
  return (
    <div className="contents min-w-0">
      <div className={cn("h-8 block relative shrink-0 overflow-clip max-lg:h-7 max-lg:self-center", styles.className)}>
        <div className="h-full block absolute top-0 inset-x-0">
          <img className={cn("w-full h-8 block overflow-clip object-cover max-lg:h-7", styles.className2)} data-component="image" alt="Logo" height="72" src={d.imgSrc} width={d.width} />
        </div>
      </div>
    </div>
  );
}
