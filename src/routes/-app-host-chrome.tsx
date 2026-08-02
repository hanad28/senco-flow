import type { ReactNode } from "react";
import { SITE_URL } from "../lib/site";

/** App-host sign-in chrome: no Clerk/Convex so it can paint before the auth chunk. */
export function AppHostChrome({ children }: { children?: ReactNode }) {
  return (
    <div className="relative isolate flex min-h-screen flex-col items-center justify-center gap-6 overflow-hidden px-4">
      <img
        src="/assets/brand/hero-park-1280.jpg"
        srcSet="/assets/brand/hero-park-768.jpg 768w, /assets/brand/hero-park-1280.jpg 1280w, /assets/brand/hero-park-1840.jpg 1840w"
        sizes="100vw"
        alt=""
        width={1840}
        height={1308}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        decoding="async"
      />
      <div className="absolute inset-0 -z-10 bg-slate-950/25" aria-hidden />
      {children ?? (
        <div className="min-h-[28rem] w-full max-w-[25rem] rounded-xl bg-white/10 backdrop-blur-sm" aria-hidden />
      )}
      <a
        href={SITE_URL}
        className="text-sm text-white underline-offset-4 drop-shadow-sm hover:underline"
      >
        ← Back to unisen.uk
      </a>
    </div>
  );
}
