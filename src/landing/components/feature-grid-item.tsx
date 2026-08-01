export type FeatureGridItemData = {
  variant: string;
  eyebrow?: string;
  title: string;
  description: string;
  stat?: string;
  restImage: string;
  detailImage: string;
  detailImageSrcSet?: string;
};

/** Shared rest size for every Why Unisen card (exactly equal off-hover). */
const CARD_REST =
  "w-full max-w-none h-105";

/**
 * Feature cards: compact at rest → elevated detail on hover.
 * Both layers stay mounted (no display:none) so opacity/transform can animate.
 */
export default function FeatureGridItem({ d }: { d: FeatureGridItemData }) {
  // 03/04 desktop-only; mobile stacked cards live in the section file.
  const mobileHidden =
    d.variant !== "always-context-aware" && d.variant !== "takes-real-action";

  const restLabel = d.eyebrow ?? d.title;
  const restStat = d.stat ?? (d.variant === "takes-real-action" ? "02." : undefined);

  return (
    <div
      className={`feature-card-host group/feature relative flex-1 min-w-0 basis-0 max-lg:w-full max-lg:max-w-full max-lg:flex-none max-lg:basis-auto ${
        mobileHidden
          ? "hidden lg:block"
          : "block max-lg:flex max-lg:p-2 max-lg:rounded-xl max-lg:flex-col max-lg:overflow-clip"
      }`}
    >
      {/* Desktop — identical box for every card at rest */}
      <div className={`feature-card relative max-lg:hidden ${CARD_REST}`}>
        {/* Rest layer */}
        <div className="feature-card-rest absolute inset-0 z-[1] flex flex-col justify-between items-start overflow-clip rounded-xl bg-surface-2 pt-5 pb-10 px-5">
          {restStat ? (
            <p className="feature-card-stat block text-color-003 [font-family:'DM_Sans',_'DM_Sans_Placeholder',_sans-serif] text-[3.25rem] font-medium leading-[3.4375rem] text-balance">
              {restStat}
            </p>
          ) : (
            <div className="h-[3.4125rem]" />
          )}
          <div className="feature-card-mosaic w-full overflow-hidden rounded-lg aspect-[1.32317/1]">
            <img
              className="w-full h-full object-cover"
              alt=""
              src={d.restImage}
              draggable={false}
            />
          </div>
          <h3 className="feature-card-rest-title block w-full text-color-001 [font-family:'DM_Sans',_'DM_Sans_Placeholder',_sans-serif] text-xl font-medium leading-5.5 text-balance">
            {restLabel}
          </h3>
        </div>

        {/* Detail layer — only visible/interactive on hover */}
        <div className="feature-card-detail absolute inset-0 z-[2] flex flex-col justify-between items-stretch overflow-clip rounded-[20px] bg-color-002 p-2">
          <div className="feature-card-detail-media relative w-full shrink-0 overflow-hidden rounded-xl aspect-[1.56911/1]">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              data-component="image"
              alt={d.title}
              src={d.detailImage}
              srcSet={d.detailImageSrcSet}
              sizes="280px"
              draggable={false}
            />
          </div>
          <div className="feature-card-detail-copy flex flex-col justify-center gap-3 self-stretch p-5">
            <h3 className="block text-color-001 [font-family:'DM_Sans',_'DM_Sans_Placeholder',_sans-serif] text-[2rem] font-medium leading-[2.1875rem] text-balance">
              {d.title}
            </h3>
            <p className="feature-card-desc block text-muted-foreground [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-sm leading-[1.0625rem] text-balance">
              {d.description}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: always show detail (no hover on touch) for 01 + 02 */}
      {!mobileHidden ? (
        <div className="hidden max-lg:flex max-lg:relative max-lg:w-full max-lg:p-2 max-lg:rounded-xl max-lg:flex-col max-lg:overflow-clip max-lg:bg-color-002">
          <div className="w-full block relative rounded-xl shrink-0 overflow-hidden aspect-[1.56911/1]">
            <img
              className="w-full h-full block rounded-xl object-cover"
              alt={d.title}
              src={d.detailImage}
              srcSet={d.detailImageSrcSet}
            />
          </div>
          <div className="flex relative p-5 flex-col gap-3">
            <h3 className="block text-color-001 [font-family:'DM_Sans',_'DM_Sans_Placeholder',_sans-serif] text-2xl font-medium leading-[1.625rem]">
              {d.title}
            </h3>
            <p className="block text-muted-foreground [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-sm leading-[1.0625rem]">
              {d.description}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
