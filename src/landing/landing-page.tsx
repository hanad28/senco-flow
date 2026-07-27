import type { MouseEvent } from "react";
import { APP_URL } from "@/lib/site";
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
export function LandingPage() {
  function onClick(e: MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement | null;
    const anchor = target?.closest?.("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href") ?? "";
    const text = (anchor.textContent ?? "").trim().toLowerCase();

    const wantsAuth =
      href.includes("startfrom.co") ||
      text.includes("sign in") ||
      text.includes("log in");

    if (wantsAuth) {
      e.preventDefault();
      e.stopPropagation();
      window.location.assign(`${APP_URL}/`);
      return;
    }

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
      "/pricing": "pricing",
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
    <div className="unisen-landing min-h-screen bg-background text-color-001" onClick={onClick}>
      <Page />
    </div>
  );
}
