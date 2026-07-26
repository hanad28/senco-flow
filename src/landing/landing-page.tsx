import { useClerk } from "@clerk/tanstack-react-start";
import type { MouseEvent } from "react";
import "./landing.css";
import "./ditto.css";
import "./hover.css";
import Page from "./page";

/**
 * Pre-auth marketing landing (ditto clone of the Parley Framer template,
 * rebranded for Unisen). CTAs open Clerk sign-in / sign-up modals.
 */
export function LandingPage() {
  const clerk = useClerk();

  function onClick(e: MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement | null;
    const anchor = target?.closest?.("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href") ?? "";
    const text = (anchor.textContent ?? "").trim().toLowerCase();

    const wantsAuth =
      href === "/contact" ||
      href.startsWith("/contact") ||
      href.includes("startfrom.co") ||
      text.includes("get started") ||
      text.includes("sign in") ||
      text.includes("hire") ||
      text.includes("chat with");

    if (wantsAuth) {
      e.preventDefault();
      e.stopPropagation();
      const preferSignIn = text.includes("sign in");
      if (preferSignIn) {
        void clerk.openSignIn({});
      } else {
        void clerk.openSignUp({});
      }
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
      "/blog": "solution",
      "/#solution": "solution",
      "/#solution-1": "solution-1",
      "/#solution-2": "solution-2",
      "/#solution-3": "solution-3",
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
