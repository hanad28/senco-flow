import { useEffect, type MouseEvent, type PointerEvent } from "react";
import { APP_URL, clerkFrontendOrigin, SITE_HOME_TITLE } from "@/lib/site";
import "./landing.css";
import "./ditto.css";
import "./hover.css";
import Page from "./page";

/**
 * Pre-auth marketing landing (ditto clone of the Parley Framer template,
 * rebranded for Unisen).
 *
 * Auth CTAs send users to the app host (app.unisen.uk). Sign-in must not run
 * on the marketing origin — Clerk's __clerk_db_jwt handshake breaks across
 * subdomains if it starts here.
 */

function isAuthCtaText(text: string) {
  return (
    text.includes("get started") ||
    text.includes("sign in") ||
    text.includes("log in")
  );
}

/** Warm DNS/TLS for app host + Clerk before the full navigation. */
function warmAuthDestinations() {
  if (typeof document === "undefined") return;
  const clerkOrigin = clerkFrontendOrigin();
  for (const href of [APP_URL, clerkOrigin]) {
    if (!href) continue;
    const mark = `data-auth-warm="${href}"`;
    if (document.head.querySelector(`link[${mark}]`)) continue;
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = href;
    link.crossOrigin = "anonymous";
    link.setAttribute("data-auth-warm", href);
    document.head.appendChild(link);
  }
}

export function LandingPage() {
  useEffect(() => {
    document.title = SITE_HOME_TITLE;
  }, []);

  function onPointerOver(e: PointerEvent<HTMLDivElement>) {
    const anchor = (e.target as HTMLElement | null)?.closest?.("a");
    if (!anchor) return;
    const text = (anchor.textContent ?? "").trim().toLowerCase();
    const href = anchor.getAttribute("href") ?? "";
    if (isAuthCtaText(text) || href.includes("startfrom.co")) {
      warmAuthDestinations();
    }
  }

  function onClick(e: MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement | null;
    const anchor = target?.closest?.("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href") ?? "";
    const text = (anchor.textContent ?? "").trim().toLowerCase();

    const wantsAuth =
      href.includes("startfrom.co") || isAuthCtaText(text);

    if (wantsAuth) {
      e.preventDefault();
      e.stopPropagation();
      warmAuthDestinations();
      window.location.assign(`${APP_URL}/`);
      return;
    }

    // "Talk to us" / plain contact links stay on the marketing page.
    if (href === "/contact" || href.startsWith("/contact")) {
      e.preventDefault();
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // Hash anchors (#solution-1, etc.) use native scroll + scroll-margin.
    if (href.startsWith("#") && href.length > 1) {
      return;
    }

    // In-page nav anchors — map Nexura-style routes onto landing sections.
    const sectionByHref: Record<string, string> = {
      "/product": "product",
      "/integration": "integration",
      "/about": "demo",
      "/blog": "solution",
      "/#solution": "solution",
      "/#solution-1": "solution-1",
      "/#solution-2": "solution-2",
      "/#solution-3": "solution-3",
      "/#solution-4": "solution-4",
      "/#demo": "demo",
    };

    if (
      href.startsWith("/workflow") ||
      href === "/workflows" ||
      href === "/terms-conditions" ||
      href in sectionByHref
    ) {
      e.preventDefault();
      const sectionId = sectionByHref[href];
      if (sectionId) {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  return (
    <div
      className="unisen-landing min-h-screen text-color-001"
      onClick={onClick}
      onPointerOver={onPointerOver}
    >
      <Page />
    </div>
  );
}
