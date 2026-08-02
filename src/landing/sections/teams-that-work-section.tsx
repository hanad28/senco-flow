import { useCallback, useEffect, useRef, useState } from "react";
import TestimonialCard, { type Testimonial } from "../components/testimonial-card";

/**
 * Social-proof carousel under “Built for SENCOs”.
 * Parley used fake SaaS brands (CloudPlex, Tytotone, Bloopglow, ZingZap, Junotwig).
 * These are Unisen-relevant roles instead: not claimed customer logos.
 */
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I can finally see every consultation deadline in one place. The 15-day window stopped feeling like a scramble.",
    name: "James R.",
    role: "SENCO · North London primary",
    avatar: "/assets/cloned/images/d70aae97a6ce.png",
    avatarSrcSet:
      "/assets/cloned/images/73486580f1da.png 512w, /assets/cloned/images/0df763aabb60.png 1024w, /assets/cloned/images/d70aae97a6ce.png 1254w",
  },
  {
    quote:
      "As a parent, the family workspace made the draft plan readable. We knew what to challenge and what to ask for.",
    name: "Sophie K.",
    role: "Parent carer",
    avatar: "/assets/cloned/images/5c72fcf24234.png",
  },
  {
    quote:
      "Our team used to chase advice by email. Unisen keeps needs, reports, and response drafts together.",
    name: "Daniel M.",
    role: "SENDCo · Secondary school",
    avatar: "/assets/cloned/images/812235517cfa.png",
  },
  {
    quote:
      "Deadline visibility alone is worth it. Knowing what’s due this week changes how we prioritise.",
    name: "Paul M.",
    role: "Inclusion lead · Multi-academy trust",
    avatar: "/assets/cloned/images/e50b915f59df.png",
  },
  {
    quote:
      "The checks on provision language are exactly what we needed for clearer statutory responses.",
    name: "Emily C.",
    role: "EHCP case support lead",
    avatar: "/assets/cloned/images/2fe3cdbc28f6.png",
  },
];

/** Built for SENCOs: testimonial carousel (Parley layout, Unisen roles). */
export default function TeamsThatWorkSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const periodRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  const measurePeriod = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    periodRef.current = el.scrollWidth / 2;
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    measurePeriod();
    const ro = new ResizeObserver(measurePeriod);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measurePeriod);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measurePeriod);
    };
  }, [measurePeriod]);

  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    let last = performance.now();
    const pxPerSec = 32;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!pausedRef.current && !draggingRef.current && periodRef.current > 0) {
        offsetRef.current -= pxPerSec * dt;
        if (offsetRef.current <= -periodRef.current) {
          offsetRef.current += periodRef.current;
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${offsetRef.current}px,0,0)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetRef.current;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || periodRef.current <= 0) return;
    const dx = e.clientX - dragStartX.current;
    let next = dragStartOffset.current + dx;
    while (next <= -periodRef.current) next += periodRef.current;
    while (next > 0) next -= periodRef.current;
    offsetRef.current = next;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px,0,0)`;
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    draggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  return (
    <section className="w-full flex relative py-20 px-5 flex-col justify-start items-center content-center shrink-0 max-lg:py-10 max-lg:px-4">
      <div className="w-full max-w-310 flex relative flex-col justify-center items-center content-center shrink-0 gap-10 max-lg:gap-5">
        <div className="w-full flex relative flex-col justify-center items-center content-center shrink-0 gap-5">
          <div className="w-[56.5%] flex relative flex-col justify-start items-center content-center shrink-0 gap-3 max-lg:w-full">
            <p className="block text-accent [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-[0.875rem] font-semibold text-balance max-lg:text-center" dir="auto">
              Built for real SEND work
            </p>
            <h2
              className="block text-color-001 [font-family:'DM_Sans',_'DM_Sans_Placeholder',_sans-serif] text-[3.25rem] font-medium leading-[3.4375rem] text-center text-balance max-lg:text-[2rem] max-lg:leading-[2.125rem]"
              data-component="heading"
              dir="auto"
            >
              Built for SENCOs
              <br className="inline" />
              and families under pressure
            </h2>
          </div>
          <p className="block max-w-125 text-muted-foreground [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-base leading-[1.1875rem] text-center text-balance" dir="auto">
            Designed around England’s EHC process: consultations, advice, draft plans, and the clocks that actually matter.
          </p>
        </div>

        <div
          className="testimonials-carousel w-full relative rounded-[10px] shrink-0 select-none"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
          }}
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            ref={trackRef}
            className="testimonials-track flex relative items-stretch gap-2.5 will-change-transform"
            style={{ width: "max-content" }}
            aria-live="off"
          >
            {loop.map((t, i) => (
              <TestimonialCard key={`${t.name}-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
