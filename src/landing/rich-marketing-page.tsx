import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import EnquiryDialog from "./components/enquiry-dialog";
import { MarketingFrame } from "./marketing-shell";

export function RichMarketingPage({
  pageLabel,
  title,
  introduction,
  actions,
  children,
}: {
  pageLabel: string;
  title: string;
  introduction: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <MarketingFrame>
      <main className="flex flex-1 flex-col overflow-hidden pt-[calc(4.5625rem+env(safe-area-inset-top,0px))] [font-family:var(--font-body)]">
        <header className="relative border-b border-[var(--border-default)] bg-[linear-gradient(135deg,#effaff_0%,#ffffff_48%,#fff9dc_100%)]">
          <div
            className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#74c4d7]/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto w-full max-w-[78.125rem] px-5 py-20 max-lg:px-4 max-lg:py-14">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--action-primary)]">
              {pageLabel}
            </p>
            <h1 className="mt-4 max-w-4xl text-balance text-5xl font-bold leading-[1.08] tracking-[-0.04em] text-[var(--text-primary)] [font-family:var(--font-heading)] max-md:text-4xl">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-[var(--text-secondary)] max-md:text-base max-md:leading-7">
              {introduction}
            </p>
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        </header>

        <div className="mx-auto w-full max-w-[78.125rem] px-5 py-20 max-lg:px-4 max-lg:py-14">
          {children}
        </div>
      </main>
    </MarketingFrame>
  );
}

export function MarketingSection({
  eyebrow,
  title,
  introduction,
  children,
  id,
}: {
  eyebrow?: string;
  title: string;
  introduction?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-[var(--border-default)] py-16 first:border-t-0 first:pt-0 max-md:py-12"
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      {eyebrow ? (
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--action-primary)]">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id ? `${id}-title` : undefined}
        className="mt-2 max-w-3xl text-balance text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)] [font-family:var(--font-heading)] max-md:text-2xl"
      >
        {title}
      </h2>
      {introduction ? (
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--text-secondary)]">
          {introduction}
        </p>
      ) : null}
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function MarketingCard({
  title,
  label,
  children,
}: {
  title: string;
  label?: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-[1.25rem] border border-[var(--border-default)] bg-white p-6 shadow-[0_16px_45px_rgba(36,74,112,0.06)] max-md:p-5">
      {label ? (
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--action-primary)]">
          {label}
        </p>
      ) : null}
      <h3 className="mt-1 text-xl font-bold text-[var(--text-primary)] [font-family:var(--font-heading)]">
        {title}
      </h3>
      <div className="mt-3 space-y-3 text-sm leading-6 text-[var(--text-secondary)]">
        {children}
      </div>
    </article>
  );
}

export function DetailList({ children }: { children: ReactNode }) {
  return (
    <ul className="grid gap-3 text-sm leading-6 text-[var(--text-secondary)] sm:grid-cols-2">
      {children}
    </ul>
  );
}

export function DetailItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 rounded-xl bg-[#effaff] px-4 py-3">
      <span
        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--action-primary)]"
        aria-hidden="true"
      />
      <span>{children}</span>
    </li>
  );
}

export function WalkthroughButton({ className = "" }: { className?: string }) {
  return (
    <EnquiryDialog
      trigger={
        <Button
          type="button"
          size="lg"
          className={`cta-glass hero-enquiry-trigger relative h-12 min-w-56 px-7 text-base font-bold ${className}`}
        >
          <span className="relative z-[1]">Book a 15-min walkthrough</span>
        </Button>
      }
    />
  );
}

export function FinalWalkthroughCta({ title, body }: { title: string; body?: string }) {
  return (
    <section className="rounded-[1.5rem] bg-[var(--text-primary)] px-8 py-12 text-white max-md:px-5 max-md:py-9">
      <div className="flex items-center justify-between gap-8 max-md:flex-col max-md:items-start">
        <div>
          <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-[-0.025em] [font-family:var(--font-heading)] max-md:text-2xl">
            {title}
          </h2>
          {body ? <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80">{body}</p> : null}
        </div>
        <WalkthroughButton className="shrink-0" />
      </div>
    </section>
  );
}
