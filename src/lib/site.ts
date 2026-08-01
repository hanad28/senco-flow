/** Canonical public marketing origin (SEO). Override with VITE_SITE_URL. */
export const SITE_URL = (
  (import.meta.env.VITE_SITE_URL as string | undefined) ??
  (import.meta.env.DEV ? "http://localhost:8080" : "https://senco-flow.vercel.app")
).replace(/\/$/, "");

/** Authenticated app origin (dashboard). Override with VITE_APP_URL. */
export const APP_URL = (
  (import.meta.env.VITE_APP_URL as string | undefined) ??
  (import.meta.env.DEV ? "http://app.localhost:8080" : "https://app.unisen.uk")
).replace(/\/$/, "");

export type HostMode = "marketing" | "app" | "combined";

/** Classify hostname: marketing site vs app subdomain vs local/combined. */
export function getHostMode(hostname: string): HostMode {
  const host = hostname.toLowerCase().split(":")[0] ?? "";
  if (host === "app.unisen.uk" || host === "app.localhost") return "app";
  if (host === "unisen.uk" || host === "www.unisen.uk" || host === "localhost") {
    return "marketing";
  }
  return "combined";
}

export const SITE_NAME = "Unisen";
export const SITE_TITLE = "Unisen: SEND coordination for schools & families";
/** Browser tab titles: `Unisen ⋅ Page`. */
export function pageTitle(page: string): string {
  return `${SITE_NAME} ⋅ ${page}`;
}
export const SITE_HOME_TITLE = pageTitle("Home");
export const SITE_DESCRIPTION =
  "Unisen helps schools and families run EHC needs assessments together with shared timelines, statutory deadlines, and execution assistance.";
export const SITE_OG_DESCRIPTION =
  "Visibility, execution assistance, and clear communication across school and family EHC workspaces.";

/** Absolute social preview image (icon logo, unprocessed). */
export const SITE_OG_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Clerk Frontend API origin from the publishable key (pk_test_/pk_live_ + base64 host).
 * Used for preconnect so the first SignIn fetch is not cold DNS+TLS.
 */
export function clerkFrontendOrigin(
  publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined,
): string | null {
  if (!publishableKey) return null;
  const raw = publishableKey.replace(/^pk_(?:test|live)_/, "").replace(/\$$/, "");
  if (!raw) return null;
  try {
    const padded = raw + "=".repeat((4 - (raw.length % 4)) % 4);
    const binary =
      typeof atob === "function"
        ? atob(padded)
        : typeof Buffer !== "undefined"
          ? Buffer.from(padded, "base64").toString("utf8")
          : null;
    if (!binary) return null;
    const clean = binary.replace(/\$$/, "").trim();
    if (!clean.includes("clerk")) return null;
    return `https://${clean}`;
  } catch {
    return null;
  }
}

export function siteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/favicon.ico`,
        description: SITE_DESCRIPTION,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-GB",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#app`,
        name: SITE_NAME,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: APP_URL,
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
}
