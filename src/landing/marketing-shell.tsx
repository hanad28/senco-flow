import type { ReactNode } from "react";
import FooterSection2 from "./sections/footer-section2";
import Navbar from "./sections/navbar";
import "./landing.css";
import "./nexura/nexura-body.css";

export function MarketingFrame({ children }: { children: ReactNode }) {
  return (
    <div className="unisen-landing min-h-screen bg-background text-foreground">
      <Navbar variant="solid" />
      {children}
      <div className="nexura-body">
        <FooterSection2 />
      </div>
    </div>
  );
}

/** Public marketing pages: same header chrome as the home landing (solid bar). */
export function MarketingShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <MarketingFrame>
      <main className="mx-auto w-full max-w-3xl px-5 pb-16 pt-[calc(4.5rem+env(safe-area-inset-top,0px))]">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary,#244a70)] [font-family:var(--font-heading)]">
          {title}
        </h1>
        <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--text-secondary,#40689c)] [font-family:var(--font-body)]">
          {children}
        </div>
      </main>
    </MarketingFrame>
  );
}
