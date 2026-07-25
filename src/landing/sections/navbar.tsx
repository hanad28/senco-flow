import { useEffect, useState } from "react";

/** Transparent over the hero; solid white bar once the page scrolls. */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const threshold = 24;
    const onScroll = () => {
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`unisen-nav fixed top-0 inset-x-0 z-50 w-full pointer-events-none${scrolled ? " is-scrolled" : ""}`}
    >
      <nav
        className="pointer-events-auto flex h-18 w-full items-center justify-center px-5 pt-5 max-lg:px-4 max-lg:pt-4 bg-transparent border-0"
        data-component="nav"
        aria-label="Primary"
      >
        <div className="flex w-full max-w-310 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <a
              className="flex items-center py-2.5 cursor-pointer max-lg:py-0"
              data-component="link"
              href="/"
              aria-label="Unisen home"
            >
              <img
                src="/assets/brand/unisen-wordmark.png"
                alt="Unisen"
                width={1245}
                height={387}
                className="unisen-nav-logo block h-8 w-auto object-contain rounded-md"
                decoding="async"
              />
            </a>
          </div>

          <div className="flex items-center gap-3 max-lg:hidden">
            <a
              className="unisen-nav-link cursor-pointer [font-family:var(--font-body)] text-sm leading-[1.0625rem]"
              data-ditto-id="menu-trigger-link"
              data-component="link"
              href="/workflows"
            >
              <span data-ditto-id="menu-trigger-div">Features</span>
            </a>
            <div className="unisen-nav-dot h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden />
            <a
              className="unisen-nav-link cursor-pointer [font-family:var(--font-body)] text-sm leading-[1.0625rem]"
              data-component="link"
              href="/pricing"
            >
              Pricing
            </a>
            <div className="unisen-nav-dot h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden />
            <a
              className="unisen-nav-link cursor-pointer [font-family:var(--font-body)] text-sm leading-[1.0625rem]"
              data-component="link"
              href="/contact"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
