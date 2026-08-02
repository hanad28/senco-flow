/**
 * Home landing footer: real destinations only.
 */
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SocialData = {
  ariaLabel: string;
  href: string;
  icon: ReactNode;
};

const SOCIALS: SocialData[] = [
  {
    ariaLabel: "LinkedIn",
    href: "https://www.linkedin.com/company/unisenuk/",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" fill="none" />
        <line x1="7.5" y1="10" x2="7.5" y2="17" />
        <circle cx="7.5" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
        <path
          d="M11.5 17 V10 M11.5 13 C11.5 11 13 10 14.5 10 C16 10 16.5 11 16.5 13 V17"
          fill="none"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    ariaLabel: "Instagram",
    href: "https://www.instagram.com/unisenuk",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" />
        <circle cx="12" cy="12" r="4" fill="none" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    ariaLabel: "Substack",
    href: "https://substack.com/@unisen?r=8tjfef&shareImageVariant=light",
    icon: (
      <>
        <path d="M3 4h18v2.5H3V4Z" fill="currentColor" stroke="none" />
        <path d="M3 9.5h18V20l-9-5.5L3 20V9.5Z" fill="none" />
      </>
    ),
  },
];

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/product" },
      { label: "Integrations", href: "/integrations" },
      { label: "Pricing", href: "/pricing" },
      { label: "Home demo", href: "/#product" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Changelog", href: "/changelog" },
      { label: "Blog", href: "/blog" },
      { label: "Help", href: "/help" },
      { label: "Workshops", href: "/workshops" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
] as const;

function SocialLink({ d }: { d: SocialData }) {
  return (
    <a
      className="footer-s2-social h-[1.5625rem] flex p-1 rounded-[50%] justify-center items-center text-color-002 cursor-pointer"
      data-component="link"
      aria-label={d.ariaLabel}
      href={d.href}
      target="_blank"
      rel="noreferrer"
    >
      <svg
        className="w-auto h-[1.0625rem] block overflow-hidden"
        data-component="icon"
        fill="none"
        height="17"
        stroke="currentColor"
        viewBox="0 0 24 24"
        width="17"
        strokeWidth="1.4"
        strokeLinecap="round"
        aria-hidden
      >
        {d.icon}
      </svg>
    </a>
  );
}

function UnderlineLink({
  href,
  children,
  muted,
}: {
  href: string;
  children: ReactNode;
  muted?: boolean;
}) {
  return (
    <a
      className={cn(
        "footer-s2-link relative inline-flex whitespace-nowrap pb-0.5 rounded-xs text-sm leading-4 cursor-pointer",
        muted ? "text-color-002" : "text-color-001",
      )}
      data-component="link"
      href={href}
    >
      {children}
      <span className="footer-s2-underline h-px w-full block absolute bottom-0 left-0 bg-primary origin-[0px_0.5px]" />
    </a>
  );
}

function scrollToTop() {
  if (typeof window === "undefined") return;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function FooterSection2() {
  return (
    <div className="w-full block relative shrink-0 order-[1002]">
      <footer className="footer-section2 relative w-full overflow-hidden [font-family:Inter,_'Inter_Placeholder',_sans-serif]">
        <div className="footer-s2-bg" aria-hidden>
          <img
            src="/assets/brand/footer-park-panorama.jpg"
            srcSet="/assets/brand/footer-park-panorama-768.jpg 768w, /assets/brand/footer-park-panorama-1280.jpg 1280w, /assets/brand/footer-park-panorama.jpg 2000w"
            sizes="100vw"
            alt=""
            width={2000}
            height={500}
            decoding="async"
            loading="lazy"
          />
        </div>
        <div className="footer-s2-scrim" aria-hidden />
        <div className="footer-s2-content relative z-[1] block max-w-320 pt-16 px-12 mx-auto max-lg:pt-12 max-lg:px-6">
          <div className="flex justify-between gap-12 max-lg:flex-col max-lg:gap-10">
            <div className="block max-w-70 shrink-0 max-lg:max-w-full">
              <a
                className="inline-flex h-7 mb-4 items-center cursor-pointer"
                data-component="link"
                href="/"
                aria-label="Unisen home"
              >
                <img
                  src="/assets/brand/unisen-logo-nav.png"
                  alt="Unisen"
                  width={280}
                  height={80}
                  className="block h-7 w-auto object-contain"
                  decoding="async"
                />
              </a>
              <p className="block mb-5 text-clr-1 text-[0.8125rem] leading-[1.3125rem] max-w-[17.5rem]">
                SEND coordination for schools and families: shared timelines, statutory deadlines,
                and execution assistance for EHC work.
              </p>
              <div className="flex gap-3.5">
                {SOCIALS.map((d) => (
                  <SocialLink key={d.ariaLabel} d={d} />
                ))}
              </div>
            </div>

            <div className="grid gap-12 grid-cols-4 max-lg:gap-y-8 max-lg:gap-x-6 max-lg:grid-cols-2">
              {COLUMNS.map((col) => (
                <div key={col.title} className="flex flex-col">
                  <span className="block mb-4 text-color-002 text-[0.6875rem] leading-3 tracking-[1.65px] uppercase">
                    {col.title}
                  </span>
                  <div className="flex flex-col gap-3">
                    {col.links.map((link) => (
                      <UnderlineLink key={link.label} href={link.href}>
                        {link.label}
                      </UnderlineLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-solid border-t-border flex mt-14 py-6 justify-between items-center max-lg:mt-12 max-lg:flex-col max-lg:items-start max-lg:gap-4">
            <span className="block text-color-002 text-sm">
              © 2026 Unisen. All rights reserved.
            </span>
            <div className="flex items-center gap-8 max-lg:gap-5">
              <div className="flex flex-nowrap gap-6">
                <UnderlineLink href="/privacy" muted>
                  Website Privacy Notice
                </UnderlineLink>
                <UnderlineLink href="/terms" muted>
                  Website Terms of Use
                </UnderlineLink>
              </div>
              <button
                className="footer-s2-link h-6 flex py-1 px-1.5 rounded-xs items-center gap-1.5 text-color-002 text-center cursor-pointer"
                data-component="button"
                aria-label="Back to top"
                type="button"
                onClick={scrollToTop}
              >
                <svg
                  className="w-auto h-[0.6875rem] block overflow-hidden"
                  fill="none"
                  height="11"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  width="11"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M12 19 V5 M5 12 L12 5 L19 12" />
                </svg>
                <span className="block relative pb-0.5 text-sm">Back to top</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
