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
export const SITE_TITLE = "Unisen — SEND coordination for schools & families";
export const SITE_DESCRIPTION =
  "Unisen helps schools and families run EHC needs assessments together — shared timelines, statutory deadlines, and execution assistance.";
export const SITE_OG_DESCRIPTION =
  "Visibility, execution assistance, and clear communication across school and family EHC workspaces.";

/** Absolute social preview image (icon logo, unprocessed). */
export const SITE_OG_IMAGE = `${SITE_URL}/og-image.png`;

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
