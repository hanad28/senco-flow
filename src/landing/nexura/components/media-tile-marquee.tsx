import type { CSSProperties } from "react";
import { useReducedMotion } from "motion/react";
import MediaTile, { type MediaTileData } from "./media-tile";
import type { MediaTileStyles } from "../_styles";
import { cn } from "@/lib/utils";

/**
 * Nexura solution-1 vertical carousel: continuous upward scroll.
 * Ditto froze mid-loop at translateY(-410px) — one period of 5 tiles (70px + 12px gap).
 */
const PERIOD_PX = 410; // 5 × (70 + 12)
const DURATION_S = 18;

type Props = {
  tiles: MediaTileData[];
  styles: MediaTileStyles[];
  className?: string;
};

export default function MediaTileMarquee({ tiles, styles, className }: Props) {
  const reduceMotion = useReducedMotion();
  // One loop period = first half of data (Nexura duplicates the strip for seamless scroll)
  const periodCount = Math.max(1, Math.floor(tiles.length / 2) || tiles.length);
  const strip = tiles.length >= periodCount * 2 ? tiles : [...tiles, ...tiles];

  return (
    <section className={cn("h-full flex max-w-full max-h-full items-center justify-items-center", className)}>
      <div className="h-full block absolute inset-x-0 min-w-0 overflow-hidden">
        <ul
          className={cn(
            "flex max-w-full max-h-none flex-col items-center gap-3 justify-items-center [list-style-type:none] list-outside will-change-transform",
            !reduceMotion && "nexura-media-marquee",
          )}
          style={
            reduceMotion
              ? { transform: "translateY(0)" }
              : ({
                  "--marquee-period": `${PERIOD_PX}px`,
                  "--marquee-duration": `${DURATION_S}s`,
                } as CSSProperties)
          }
        >
          {strip.map((d, i) => (
            <MediaTile key={`${d.description}-${i}`} d={d} styles={styles[i % styles.length]!} />
          ))}
        </ul>
      </div>
      <fieldset
        className="h-17.5 flex absolute top-0 inset-x-0 min-w-[min-content] justify-between items-center pointer-events-none"
        aria-label="Slideshow pagination controls"
      >
        <div className="h-7.5 flex absolute top-5 inset-x-5 min-w-0 flex-col justify-between items-center pointer-events-none" />
      </fieldset>
    </section>
  );
}
