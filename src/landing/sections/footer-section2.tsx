/**
 * Home landing footer: real destinations only.
 */
import { cn } from "@/lib/utils";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

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

function LanguageChanger() {
  return (
    <span className="footer-s2-link flex items-center gap-1.5 text-color-002 text-sm" aria-label="Site language: English">
      <span aria-hidden>🌐</span>
      <span>English</span>
    </span>
  );
}

function ThemeChanger() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"system" | "light" | "dark">("system");
  const ref = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "system" | "light" | "dark" | null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: MouseEvent) =>
      !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  function apply(next: "system" | "light" | "dark") {
    setTheme(next);
    localStorage.setItem("theme", next);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = next === "dark" || (next === "system" && prefersDark);
    document.documentElement.classList.toggle("dark", isDark);
  }

  const ICONS: Record<"system" | "light" | "dark", ReactNode> = {
    system: (
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    light: (
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    dark: (
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  };

  const LABELS: Record<"system" | "light" | "dark", string> = {
    system: "System",
    light: "Light",
    dark: "Dark",
  };

  const OPTIONS: ("system" | "light" | "dark")[] = ["system", "light", "dark"];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="footer-s2-link flex items-center gap-1.5 text-color-002 text-sm cursor-pointer"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-label={`Theme: ${LABELS[theme]}`}
        onClick={() => setOpen((o) => !o)}
      >
        {ICONS[theme]}
        <span>{LABELS[theme]}</span>
        <svg
          className="h-3 w-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open ? (
        <ul
          id={menuId}
          role="menu"
          className="absolute bottom-[calc(100%+8px)] right-0 flex w-36 flex-col gap-0.5 rounded-lg border border-[var(--border-default,#d7e5eb)] bg-white p-1.5 shadow-[0_10px_30px_rgba(24,50,75,0.10)]"
        >
          {OPTIONS.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                role="menuitemradio"
                aria-checked={opt === theme}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-[var(--text-primary,#18324b)] hover:bg-[#f1f7f9] cursor-pointer"
                onClick={() => {
                  apply(opt);
                  setOpen(false);
                }}
              >
                <span className="flex items-center gap-2">
                  {ICONS[opt]}
                  {LABELS[opt]}
                </span>
                {opt === theme ? (
                  <svg
                    className="h-3.5 w-3.5 text-[var(--action-primary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
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
        <div className="footer-s2-content relative z-[1] block max-w-320 pt-16 px-12 mx-auto max-lg:pt-10 max-lg:px-5 max-md:pt-8">
          <div className="flex justify-between gap-12 max-lg:flex-col max-lg:gap-8 max-md:gap-7">
            <div className="block max-w-70 shrink-0 max-lg:max-w-full">
              <a
                className="inline-flex h-7 mb-4 items-center cursor-pointer max-md:mb-3 max-md:h-6"
                data-component="link"
                href="/"
                aria-label="Unisen home"
              >
                <img
                  src="/assets/brand/unisen-logo-nav.png"
                  alt="Unisen"
                  width={280}
                  height={80}
                  className="block h-7 w-auto object-contain max-md:h-6"
                  decoding="async"
                />
              </a>
              <p className="block mb-5 text-clr-1 text-[0.8125rem] leading-[1.3125rem] max-w-[17.5rem] max-md:mb-4 max-md:text-[0.75rem] max-md:leading-5">
                SEND coordination for schools and families: shared timelines, statutory deadlines,
                and execution assistance for EHC work.
              </p>
              <div className="flex gap-3.5">
                {SOCIALS.map((d) => (
                  <SocialLink key={d.ariaLabel} d={d} />
                ))}
              </div>
            </div>

            <div className="grid gap-12 grid-cols-4 max-lg:gap-y-8 max-lg:gap-x-6 max-lg:grid-cols-2 max-md:gap-y-6 max-md:gap-x-4">
              {COLUMNS.map((col) => (
                <div key={col.title} className="flex flex-col">
                  <span className="block mb-4 text-color-002 text-[0.6875rem] leading-3 tracking-[1.65px] uppercase max-md:mb-2.5">
                    {col.title}
                  </span>
                  <div className="flex flex-col gap-3 max-md:gap-2">
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

          <div className="border-t border-solid border-t-border flex mt-14 py-6 justify-between items-center max-lg:mt-10 max-lg:flex-col max-lg:items-start max-lg:gap-4 max-md:mt-8 max-md:py-5">
            <span className="block text-color-002 text-sm">
              © 2026 Unisen. All rights reserved.
            </span>
            <div className="flex items-center gap-6 max-lg:gap-5">
              <LanguageChanger />
              <ThemeChanger />
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
