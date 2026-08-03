import { pageTitle, SITE_OG_IMAGE, SITE_URL } from "./site";

type MarketingHeadOptions = {
  /** Browser tab page label (without the Unisen prefix), or a full title. */
  title: string;
  description: string;
  /** Path beginning with `/`, e.g. `/about`. Use `/` for home. */
  path: string;
  /** When true, title is used as-is instead of `pageTitle()`. */
  absoluteTitle?: boolean;
  ogType?: "website" | "article";
};

function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Canonical + page-specific Open Graph / Twitter metadata for marketing routes. */
export function marketingPageHead({
  title,
  description,
  path,
  absoluteTitle = false,
  ogType = "website",
}: MarketingHeadOptions) {
  const resolvedTitle = absoluteTitle ? title : pageTitle(title);
  const url = absoluteUrl(path);

  return {
    meta: [
      { title: resolvedTitle },
      { name: "description", content: description },
      { property: "og:title", content: resolvedTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: ogType },
      { property: "og:url", content: url },
      { property: "og:image", content: SITE_OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:alt", content: resolvedTitle },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: resolvedTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: SITE_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

/** App / product surfaces that should not be indexed. */
export function appNoIndexHead(title: string, description?: string) {
  return {
    meta: [
      { title: pageTitle(title) },
      ...(description ? [{ name: "description", content: description }] : []),
      { name: "robots", content: "noindex, nofollow" },
    ],
  };
}
