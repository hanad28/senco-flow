import type { Logo2Styles } from "../_styles";
import { cn } from "@/lib/utils";
export type Logo2Data = {
  imgSrc: string;
  srcSet: string;
};
/** A logo. */
export default function Logo2({ d, styles }: { d: Logo2Data; styles: Logo2Styles }) {
  return (
    <div className={cn("w-[40.225rem] h-[482.7px] block absolute min-w-0 shrink-0 overflow-clip aspect-[1.33333/1] max-md:w-[25.5625rem] max-md:h-[19.175rem] md:max-lg:w-[429.3px] md:max-lg:h-[20.125rem] 2xl:w-[649.7px] 2xl:h-[487.3px]", styles.className)}>
      <div className="h-full block absolute top-0 inset-x-0">
        <img className="w-full h-[30.1875rem] block overflow-clip object-cover object-[0%_0%] aspect-[auto_1600/1200] max-md:h-[19.1875rem] md:max-lg:h-80.5 2xl:h-[30.4375rem]" data-component="image" alt="Sample UI" height="1200" sizes="calc((calc(min(max(100vw - 40px, 1px), 1250px) - 128px) * 0.58 - 32px) * 1.05)" src={d.imgSrc} srcSet={d.srcSet} width="1600" />
      </div>
    </div>
  );
}
