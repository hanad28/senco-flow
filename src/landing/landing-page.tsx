import { useEffect, type MouseEvent, type PointerEvent } from "react";
import { APP_URL, clerkFrontendOrigin, SITE_HOME_TITLE } from "@/lib/site";
import "./landing.css";
import "./ditto.css";
import "./hover.css";
import Page from "./page";

/**
 * Pre-auth marketing home.
 * Auth CTAs send users to the app host (app.unisen.uk).
 */

function isAuthCtaText(text: string) {
  return (
    text.includes("get started") ||
    text.includes("sign in") ||
    text.includes("log in")
  );
}

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

    if (href.includes("startfrom.co") || isAuthCtaText(text)) {
      e.preventDefault();
      e.stopPropagation();
      warmAuthDestinations();
      window.location.assign(`${APP_URL}/`);
      return;
    }

    // Real multi-page routes + hash anchors use native navigation.
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
