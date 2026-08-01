import type { MediaCardStyles } from "../_styles";
import { cn } from "@/lib/utils";
export type MediaCardData = {
  alt: string;
  imgSrc: string;
  srcSet: string;
  width: string;
  kind?: string;
  alt2: string;
  imgSrc2: string;
  width2: string;
  kind2?: string;
  title: string;
  description: string;
};
/** A card with media + heading. */
export default function MediaCard({ d, styles }: { d: MediaCardData; styles: MediaCardStyles }) {
  return (
    <div className={cn("block relative shrink-0 max-md:w-full max-lg:min-w-80 md:max-lg:w-87.5", styles.className)}>
      <div className={cn("h-80 flex relative items-center content-center gap-4 overflow-clip bg-surface max-lg:flex-col", styles.className2)}>
        <div className={cn("w-45 h-80 block relative z-1 shrink-0 overflow-clip max-lg:max-h-112.5", styles.className3)}>
          <div className="h-full block absolute top-0 inset-x-0">
            <img className={cn("w-full h-80 block overflow-clip object-cover", styles.className4)} data-component="image" alt={d.alt} height="1200" sizes="180px" src={d.imgSrc} srcSet={d.srcSet} width={d.width} />
          </div>
        </div>
        <div className={cn("max-lg:p-5 max-lg:justify-start max-lg:gap-10", styles.className5)}>
          <div className={styles.className6}>
            <div className={styles.className7}>
              <img className={styles.className8} data-component={d.kind} alt={d.alt2} height="72" src={d.imgSrc2} width={d.width2} />
            </div>
          </div>
          <div className={cn("max-md:w-full md:max-lg:w-77.5", styles.className9)}>
            <div className={cn("max-md:w-full md:max-lg:w-77.5", styles.className10)}>
              <h6 className={cn("max-lg:text-lg max-lg:leading-[1.5625rem] max-lg:tracking-[-0.72px]", styles.className11)} data-component={d.kind2} dir="auto">
                {d.title}
              </h6>
            </div>
            <div className={cn("max-md:w-full md:max-lg:w-77.5", styles.className12)}>
              <p className={styles.className13} dir="auto">
                {d.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
