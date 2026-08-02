/**
 * Site footer: logo + socials → tagline + link columns → legal.
 */

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "School workspace", href: "#", scroll: "pricing" },
      { label: "Family workspace", href: "#", scroll: "pricing" },
      { label: "Deadlines", href: "#", scroll: "pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Pricing", href: "#pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/terms-conditions" },
      { label: "Terms", href: "/terms-conditions" },
    ],
  },
] as const;

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      data-component="link"
      className="footer-social flex h-8 w-8 items-center justify-center rounded-[8px] bg-[var(--surface-muted,#EAF8FA)] text-[var(--text-secondary)] transition-colors duration-200 hover:bg-[var(--action-primary)] hover:text-color-002"
    >
      {children}
    </a>
  );
}

export default function SocialMediaYourSection() {
  return (
    <div className="w-full block relative shrink-0 order-[1003]">
      <footer className="footer relative flex w-full flex-col items-center bg-surface-2 pt-10 px-5 max-lg:px-4">
        <div className="relative flex w-full max-w-310 flex-col gap-10 pb-0">
          {/* Top: logo + socials */}
          <div className="flex w-full items-center justify-between gap-4 max-lg:flex-wrap">
            <a
              href="/"
              data-component="link"
              className="flex h-8 items-center"
              aria-label="Unisen home"
            >
              <img
                src="/assets/brand/unisen-wordmark.png"
                alt="Unisen"
                width={1245}
                height={387}
                className="block h-8 w-auto object-contain rounded-md"
                decoding="async"
              />
            </a>

            <div className="flex items-center gap-3">
              <span className="text-muted-foreground [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-xs leading-[0.875rem]">
                Social media
              </span>
              <div className="flex items-center gap-2">
                <SocialIcon href="https://x.com/" label="X (Twitter)">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
                    <path d="M14.23 4 17 4l-5.12 5.85L18 20h-4.73l-3.7-4.83L5.7 20H3l5.48-6.26L2 4h4.85l3.34 4.44L14.23 4Zm-1.66 14.4h1.47L7.5 5.52H5.92l6.65 12.88Z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="https://www.linkedin.com/" label="LinkedIn">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
                    <path d="M6.94 6.5A1.94 1.94 0 1 1 6.94 2.6a1.94 1.94 0 0 1 0 3.9ZM4.9 8.4h4.08V21H4.9V8.4Zm6.4 0h3.91v1.72h.06c.54-1.03 1.87-2.12 3.85-2.12 4.12 0 4.88 2.71 4.88 6.24V21h-4.08v-5.54c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.92V21h-4.08V8.4Z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="https://www.threads.net/" label="Threads">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
                    <path d="M12.19 3.2c-3.96 0-6.87 2.48-6.87 7.12 0 3.9 2.45 6.9 6.18 6.9 2.74 0 5.53-1.65 5.53-4.48 0-1.6-.8-2.6-2.1-3.24.3-.44 1.36-1.62 1.36-3.54 0-2.5-1.86-4.06-4.1-4.06-2.56 0-4.23 1.65-4.23 4.16 0 .4.05.8.14 1.17l1.63-.47a3.5 3.5 0 0 1-.1-.83c0-1.4.86-2.3 2.42-2.3 1.42 0 2.2.8 2.2 2.1 0 1.5-.9 2.6-1.72 3.36-.3.28-.72.63-1.04.97.66.1 1.28.26 1.8.52 1.24.62 2.04 1.67 2.04 3.26 0 2.34-2.16 3.9-4.88 3.9-3.15 0-5.4-2.34-5.4-5.98 0-3.9 2.4-6.14 5.9-6.14 1.7 0 3.02.54 3.94 1.48l1.26-1.3A6.8 6.8 0 0 0 12.2 3.2Zm-.2 10.98c.28-.3.66-.64 1.04-.98.7.4 1.08 1.02 1.08 1.88 0 1.2-1.08 2.1-2.66 2.1-1.5 0-2.5-1-2.5-2.46 0-1.04.5-1.7 1.4-2 .4.5.96 1 1.64 1.46Z" />
                  </svg>
                </SocialIcon>
              </div>
            </div>
          </div>

          {/* Middle: blurb + link columns */}
          <div className="flex w-full items-start justify-between gap-10 max-lg:flex-col">
            <p className="max-w-[15rem] text-muted-foreground [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-xs leading-[0.875rem] text-balance">
              SEND coordination for schools and families: shared timelines, statutory deadlines, and execution assistance for EHC work.
            </p>

            <div className="flex w-[38.5%] min-w-0 shrink-0 items-start justify-start gap-10 max-lg:w-full max-lg:gap-8 max-md:flex-wrap">
              {FOOTER_COLUMNS.map((col) => (
                <div key={col.title} className="flex min-w-[6.5rem] flex-1 flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span className="text-color-001 [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-sm font-medium leading-[1.0625rem]">
                      {col.title}
                    </span>
                  </div>
                  <ul className="m-0 flex list-none flex-col gap-0 p-0 pl-4">
                    {col.links.map((link) => (
                      <li key={link.label} className="py-0.5">
                        <a
                          href={link.href}
                          data-component="link"
                          className="text-color-001 [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-xs leading-[0.875rem] transition-colors hover:text-muted"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Legal row */}
          <div className="relative flex w-full items-end justify-between gap-4 border-t border-[var(--border-default)] pt-6 pb-6 max-md:flex-col max-md:items-start max-md:gap-3 max-md:pb-5">
            <p className="text-muted-foreground [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-sm leading-[1.0625rem] text-balance">
              © 2026 Unisen · SEND coordination for schools & families ·{" "}
              <a
                className="text-color-001 transition-colors hover:text-muted"
                data-component="link"
                href="https://apollostudio.design/"
                target="_blank"
                rel="noreferrer"
              >
                Apollo Studio
              </a>
            </p>
            <a
              className="text-color-001 [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-sm leading-[1.0625rem] whitespace-nowrap transition-colors hover:text-muted"
              data-component="link"
              href="/terms-conditions"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
