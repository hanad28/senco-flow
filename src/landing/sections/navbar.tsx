import { useEffect, useId, useRef, useState } from "react";
import { BookOpen, ChevronDown, LifeBuoy, Menu, Sparkles, X } from "lucide-react";
import EnquiryDialog from "../components/enquiry-dialog";

const NAV_LINKS = [
  { href: "/product", label: "Product" },
  { href: "/integration", label: "Integration" },
] as const;

const RESOURCE_LINKS = [
  {
    href: "/blog",
    label: "Blog",
    description: "Insights and stories",
    icon: BookOpen,
  },
  {
    href: "/contact",
    label: "Contact",
    description: "Get support",
    icon: LifeBuoy,
  },
  {
    href: "/#solution",
    label: "Solution",
    description: "See real use cases",
    icon: Sparkles,
  },
] as const;

/**
 * Nexura content structure (logo | pill links + Resources | Get started)
 * with Unisen transparent-over-hero / solid-on-scroll chrome.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [heroCtaVisible, setHeroCtaVisible] = useState(true);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const resourcesMenuId = useId();

  useEffect(() => {
    const threshold = 24;
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const heroCta = document.querySelector(".unisen-hero-cta");
    if (!heroCta) {
      setHeroCtaVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setHeroCtaVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(heroCta);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!resourcesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setResourcesOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      if (!resourcesRef.current?.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [resourcesOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <div
      className={`unisen-nav fixed inset-x-0 top-0 z-50 w-full pointer-events-none${scrolled ? " is-scrolled" : ""}`}
    >
      <nav
        className="pointer-events-auto flex h-[4.5625rem] w-full items-center justify-center bg-transparent px-5 pt-5 max-lg:px-4 max-lg:pt-4 border-0 transition-[height,padding] duration-180 ease-out"
        data-component="nav"
        aria-label="Primary"
      >
        <div className="grid w-full max-w-[78.125rem] grid-cols-[auto_1fr_auto] items-center max-lg:flex max-lg:justify-between">
          {/* Logo */}
          <a
            className="flex h-9 shrink-0 items-center justify-self-start cursor-pointer max-lg:justify-self-auto"
            data-component="link"
            href="/"
            aria-label="Unisen home"
          >
            <img
              src="/assets/brand/unisen-logo-nav.png"
              alt="Unisen"
              width={280}
              height={80}
              className="unisen-nav-logo block h-9 w-auto object-contain rounded-md"
              decoding="async"
              fetchPriority="high"
            />
          </a>

          {/* Center links — desktop */}
          <div className="flex shrink-0 items-center justify-center justify-self-end gap-8 max-lg:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                className="unisen-nav-link flex h-[2.4rem] items-center justify-center cursor-pointer"
                data-component="link"
                href={link.href}
              >
                <span className="unisen-nav-link-label whitespace-nowrap text-base font-medium leading-[1.375rem] tracking-[-0.48px] [font-family:var(--font-body)]">
                  {link.label}
                </span>
              </a>
            ))}

            {/* Resources dropdown */}
            <div className="relative shrink-0" ref={resourcesRef}>
              <button
                type="button"
                className="unisen-nav-link flex h-[2.4rem] items-center justify-center gap-1 cursor-pointer"
                data-ditto-id="menu-trigger-a"
                aria-expanded={resourcesOpen}
                aria-haspopup="menu"
                aria-controls={resourcesMenuId}
                onClick={() => setResourcesOpen((o) => !o)}
                onMouseEnter={() => setResourcesOpen(true)}
              >
                <span className="unisen-nav-link-label whitespace-nowrap text-base font-medium leading-[1.375rem] tracking-[-0.48px] [font-family:var(--font-body)]">
                  Resources
                </span>
                <ChevronDown
                  className={`unisen-nav-chevron h-3.5 w-3.5 shrink-0 transition-transform duration-150 ${resourcesOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>

              {resourcesOpen ? (
                <div
                  id={resourcesMenuId}
                  role="menu"
                  className="unisen-nav-resources absolute left-0 top-[calc(100%+10px)] z-[60] flex w-[250px] flex-col gap-3 overflow-clip rounded-xl bg-background p-4 shadow-[0_10px_20px_rgba(0,0,0,0.08)]"
                  onMouseLeave={() => setResourcesOpen(false)}
                >
                  {RESOURCE_LINKS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.href}
                        role="menuitem"
                        className="flex w-full items-center gap-3 rounded-lg p-2 cursor-pointer hover:bg-surface-2"
                        data-component="link"
                        href={item.href}
                        onClick={() => setResourcesOpen(false)}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center p-2 text-muted-foreground">
                          <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                        </span>
                        <span className="flex min-w-0 flex-col items-start justify-center">
                          <span className="text-base font-medium leading-[1.4] tracking-[-0.48px] text-foreground [font-family:var(--font-body)]">
                            {item.label}
                          </span>
                          <span className="text-sm font-normal leading-[1.4] tracking-[-0.42px] text-muted-foreground [font-family:var(--font-body)]">
                            {item.description}
                          </span>
                        </span>
                      </a>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>

          {/* Right CTA + mobile menu toggle */}
          <div className={`unisen-nav-actions flex shrink-0 items-center justify-end justify-self-end gap-3${heroCtaVisible ? "" : " is-cta-visible"}`}>
            <button
              type="button"
              className="unisen-nav-menu-btn hidden max-lg:flex h-10 w-10 items-center justify-center rounded-full"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <EnquiryDialog
              trigger={
                <button
                  type="button"
                  className={`unisen-nav-cta-glass max-lg:hidden${heroCtaVisible ? " unisen-nav-cta-glass--hidden" : ""}`}
                  aria-hidden={heroCtaVisible}
                  tabIndex={heroCtaVisible ? -1 : undefined}
                >
                  <span className="relative z-[1]">Register your interest</span>
                </button>
              }
            />
          </div>
        </div>
      </nav>

      {/* Mobile sheet */}
      {mobileOpen ? (
        <div className="unisen-nav-mobile pointer-events-auto absolute inset-x-0 top-full z-50 border-b border-[var(--border-default)] bg-background px-5 py-4 shadow-[0_12px_32px_rgba(36,74,112,0.08)] lg:hidden">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                className="px-1 py-3 text-base font-medium text-foreground [font-family:var(--font-body)]"
                data-component="link"
                href={link.href}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-1 border-t border-[var(--border-default)] pt-3">
              <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Resources
              </p>
              {RESOURCE_LINKS.map((item) => (
                <a
                  key={item.href}
                  className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-foreground hover:bg-surface-2"
                  data-component="link"
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                >
                  <item.icon className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
                  <span className="flex flex-col">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </span>
                </a>
              ))}
            </div>
            <EnquiryDialog
              trigger={
                <button
                  type="button"
                  className="unisen-nav-cta-glass unisen-nav-cta-glass--full mt-2"
                >
                  <span className="relative z-[1]">Register your interest</span>
                </button>
              }
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
