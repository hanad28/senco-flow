import type { Logo4Styles } from "../_styles";
import { cn } from "@/lib/utils";
export type Logo4Data = {
  height: string;
  imgSrc: string;
};
/** A logo. */
export default function Logo4({ d, styles }: { d: Logo4Data; styles: Logo4Styles }) {
  return (
    <div className={cn("w-17.5 h-17.5 flex absolute rounded-[40px] flex-col justify-center items-center content-center shrink-0 bg-background shadow-[var(--clr-9)_0px_5px_20px_2px] max-lg:hidden after:content-[''] after:block after:absolute after:inset-0 after:w-17.5 after:h-17.5 after:rounded-tl-[40px] max-lg:after:hidden", styles.className)}>
      <div className={cn("w-8 block relative shrink-0 max-lg:hidden", styles.className2)}>
        <div className="w-8 h-full block absolute top-0 max-lg:hidden">
          <img className={cn("w-full block overflow-clip object-cover max-lg:hidden", styles.className3)} data-component="image" alt="" height={d.height} src={d.imgSrc} width="400" />
        </div>
      </div>
    </div>
  );
}
