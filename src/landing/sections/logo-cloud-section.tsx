/**
 * Trust / audience bar under the hero.
 * Replaces the Parley SaaS logos with Unisen-relevant roles & settings.
 */

const BADGES = [
  "School SENCOs",
  "Parent carers",
  "Inclusion leads",
  "Multi-academy trusts",
  "Secondary SENDCos",
  "Primary schools",
  "EHCP caseworkers",
  "Family advocates",
] as const;

function Badge({ label }: { label: string }) {
  return (
    <div className="trust-badge flex h-14.5 shrink-0 items-center justify-center rounded-2xl border border-[var(--border-default)] bg-[var(--surface-muted,#EAF8FA)] px-6">
      <span className="whitespace-nowrap text-[var(--text-secondary)] [font-family:var(--font-body)] text-sm font-semibold tracking-tight">
        {label}
      </span>
    </div>
  );
}

/** Audience strip: not a vendor logo cloud. */
export default function LogoCloudSection() {
  // Double the list for a seamless CSS marquee
  const loop = [...BADGES, ...BADGES];

  return (
    <section className="w-full flex relative py-10 px-5 flex-col justify-center items-center content-center shrink-0 gap-5 max-lg:px-4">
      <p className="block max-w-310 text-color-001 [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-sm leading-[1.0625rem] text-center text-balance">
        Built for SENCOs, schools, and families
      </p>

      <div
        className="trust-marquee relative w-full max-w-310 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
        }}
      >
        <div className="trust-marquee-track flex w-max items-center gap-5 py-1">
          {loop.map((label, i) => (
            <Badge key={`${label}-${i}`} label={label} />
          ))}
        </div>
      </div>
    </section>
  );
}
