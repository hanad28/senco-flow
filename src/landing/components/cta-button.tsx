/**
 * Primary CTA — UNISEN design system.
 * Blue / accent / light / glass pills.
 * Solid variants: dual-label + dual-arrow hover.
 * Glass: square tile swipes across the pill on hover.
 */

const ARROW_MASK =
  'url("data:image/svg+xml,<svg display=\\"block\\" role=\\"presentation\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\"><g transform=\\"translate(8.306 6.234)\\"><path d=\\"M 1.439 1.439 L 0 1.439 L 0 0 L 1.439 0 Z\\" fill=\\"black\\" transform=\\"translate(0 11.51)\\"/><path d=\\"M 1.438 1.439 L 0 1.438 L 0 0 L 1.438 0 Z\\" fill=\\"black\\" transform=\\"translate(1.439 10.071)\\"/><path d=\\"M 1.438 1.439 L 0 1.439 L 0 0 L 1.438 0 Z\\" fill=\\"black\\" transform=\\"translate(2.878 8.633)\\"/><path d=\\"M 1.439 1.439 L 0 1.439 L 0.001 0 L 1.439 0 Z\\" fill=\\"black\\" transform=\\"translate(4.316 7.193)\\"/><path d=\\"M 1.438 1.438 L 0 1.438 L 0 0 L 1.438 0 Z\\" fill=\\"black\\" transform=\\"translate(5.756 5.755)\\"/><path d=\\"M 1.438 1.438 L 0 1.438 L 0 0 L 1.438 0 Z\\" fill=\\"black\\" transform=\\"translate(4.317 4.316)\\"/><path d=\\"M 1.439 1.439 L 0 1.439 L 0 0 L 1.438 0 Z\\" fill=\\"black\\" transform=\\"translate(2.878 2.877)\\"/><path d=\\"M 1.438 1.438 L 0 1.438 L 0 0 L 1.438 0 Z\\" fill=\\"black\\" transform=\\"translate(1.439 1.438)\\"/><path d=\\"M 1.439 0 L 1.439 1.438 L 0 1.438 L 0 0 Z\\" fill=\\"black\\"/></g></svg>"), none';

const arrowMaskStyle = {
  maskImage: ARROW_MASK,
  WebkitMaskImage: ARROW_MASK,
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
} as const;

type CtaVariant = "primary" | "accent" | "light" | "glass";

type CtaButtonProps = {
  label: string;
  href?: string;
  /**
   * primary = brand blue (#3B8AC1) with white label (default)
   * accent  = yellow (#FFDE59) with deep-blue label — one main action per section
   * light   = white pill with blue border (secondary)
   * glass   = liquid frosted glass (hero over imagery)
   */
  variant?: CtaVariant;
  /** @deprecated use variant — kept for existing call sites */
  dark?: boolean;
  /** Stretch to parent width (pricing cards). */
  fullWidth?: boolean;
  /**
   * Glass only: blue L→R swipe (header solid blue). Default white trail (hero).
   */
  brandSlide?: boolean;
  className?: string;
};

export default function CtaButton({
  label,
  href = "/contact",
  variant,
  dark = true,
  fullWidth = false,
  brandSlide = false,
  className = "",
}: CtaButtonProps) {
  const resolved: CtaVariant =
    variant ?? (dark === false ? "light" : "primary");

  const isGlass = resolved === "glass";

  const shell =
    resolved === "glass"
      ? `cta-glass${brandSlide ? " cta-glass--brand-slide" : ""}`
      : resolved === "accent"
        ? "bg-[var(--action-accent)] text-[var(--text-on-accent)] hover:brightness-[0.98]"
        : resolved === "light"
          ? "bg-color-002 text-[var(--action-primary)] border-2 border-[var(--brand-cyan)]"
          : "bg-[var(--action-primary)] text-color-002 hover:bg-[var(--action-primary-hover)]";

  const labelColor =
    resolved === "glass"
      ? "text-[var(--text-primary)]"
      : resolved === "accent" || resolved === "light"
        ? "text-[var(--text-on-accent)]"
        : "text-color-002";

  const arrowBg =
    resolved === "glass"
      ? "cta-glass-arrow"
      : resolved === "accent"
        ? "bg-[var(--action-primary)]"
        : "bg-[var(--action-accent)]";

  const arrowFg =
    resolved === "glass"
      ? "bg-[var(--text-primary)]"
      : resolved === "accent"
        ? "bg-color-002"
        : "bg-[var(--text-primary)]";

  if (isGlass) {
    return (
      <a
        className={[
          "group/cta h-11 flex relative justify-start items-center content-center overflow-hidden cursor-pointer",
          shell,
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-cyan)]",
          fullWidth ? "w-full max-w-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        data-component="link"
        href={href}
      >
        <div className="cta-glass-track relative z-[1] flex h-full w-full min-w-[11.5rem] items-center px-1">
          {/* Tile — same corner language as the button (radius − inset), swipes L→R */}
          <div
            className={`cta-glass-arrow absolute z-[2] flex items-center justify-center overflow-hidden ${arrowBg}`}
            aria-hidden
          >
            <div className="cta-glass-arrow-icon flex h-[1.25rem] w-[1.25rem] items-center justify-center">
              <div
                className={`block h-full w-full aspect-square ${arrowFg}`}
                style={arrowMaskStyle}
              />
            </div>
          </div>

          <p
            className={`cta-glass-label relative z-[1] w-full text-center [font-family:var(--font-heading)] text-sm font-bold leading-[1.0625rem] whitespace-nowrap ${labelColor}`}
          >
            {label}
          </p>
        </div>
      </a>
    );
  }

  return (
    <a
      className={[
        "group/cta h-11 flex relative rounded-[12px] justify-start items-center content-center overflow-hidden cursor-pointer transition-[transform,box-shadow,background-color,border-color] duration-200 ease-out",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-cyan)]",
        "hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(64,104,156,0.18)]",
        shell,
        fullWidth ? "w-full max-w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-component="link"
      href={href}
    >
      <div className="relative z-[1] flex py-1 pr-3 pl-1 justify-center items-center content-center shrink-0 gap-3 overflow-hidden">
        <div
          className={`w-9 h-9 flex relative rounded-[8px] justify-center items-center content-center shrink-0 overflow-hidden ${arrowBg}`}
        >
          <div className="w-[1.5625rem] flex relative justify-end items-center content-center shrink-0 aspect-square">
            <div
              className={`basis-full shrink-0 block relative aspect-square transition-all duration-300 group-hover/cta:opacity-0 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 ${arrowFg}`}
              style={arrowMaskStyle}
            />
            <div
              className={`absolute inset-0 block aspect-square opacity-0 translate-x-[-3px] translate-y-[3px] transition-all duration-300 group-hover/cta:opacity-100 group-hover/cta:translate-x-0 group-hover/cta:translate-y-0 ${arrowFg}`}
              style={arrowMaskStyle}
            />
          </div>
        </div>

        <div className="h-4.5 flex relative flex-col justify-start items-start content-start shrink-0 overflow-hidden">
          <div className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:-translate-y-4.5">
            <p
              className={`block h-4.5 [font-family:var(--font-heading)] text-sm font-bold leading-[1.0625rem] text-left whitespace-nowrap ${labelColor}`}
            >
              {label}
            </p>
            <p
              className={`block h-4.5 [font-family:var(--font-heading)] text-sm font-bold leading-[1.0625rem] text-left whitespace-nowrap ${labelColor}`}
            >
              {label}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}
