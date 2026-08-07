/** Cloudflare Worker / SSR request redirects and security headers. */

export const CANONICAL_HOST = "unisen.uk";
export const APP_HOST = "app.unisen.uk";

/** Authenticated product paths that must not be served on the marketing host. */
export const APP_PATH_PREFIXES = [
  "/consultations",
  "/family",
  "/calendar",
  "/templates",
  "/settings",
  "/reports",
] as const;

export function isAppProductPath(pathname: string): boolean {
  const path = pathname.split("?")[0] ?? pathname;
  return APP_PATH_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}

export function requestHostname(request: Request): string {
  const raw =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  return raw.split(",")[0]?.trim().split(":")[0]?.toLowerCase() ?? "";
}

export function requestProto(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-proto");
  if (forwarded) return forwarded.split(",")[0]?.trim().toLowerCase() ?? "https";
  try {
    return new URL(request.url).protocol.replace(":", "").toLowerCase();
  } catch {
    return "https";
  }
}

function isLocalHost(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0"
  );
}

function isProductionHost(hostname: string): boolean {
  return hostname === CANONICAL_HOST || hostname === APP_HOST || hostname === `www.${CANONICAL_HOST}`;
}

/**
 * Host/scheme consolidation and marketing→app path hand-off for SSR requests.
 * Static asset requests are handled by Nitro's outer asset layer and Cloudflare
 * platform rules (see public/_headers and AGENTS.md), not this function.
 */
export function maybeCanonicalRedirect(request: Request): Response | null {
  const hostname = requestHostname(request);
  if (!hostname || isLocalHost(hostname)) return null;

  let url: URL;
  try {
    url = new URL(request.url);
  } catch {
    return null;
  }

  const proto = requestProto(request);

  if (hostname === `www.${CANONICAL_HOST}`) {
    const target = new URL(url.href);
    target.protocol = "https:";
    target.hostname = CANONICAL_HOST;
    return Response.redirect(target.toString(), 301);
  }

  if (proto === "http" && isProductionHost(hostname)) {
    const target = new URL(url.href);
    target.protocol = "https:";
    target.hostname = hostname === `www.${CANONICAL_HOST}` ? CANONICAL_HOST : hostname;
    return Response.redirect(target.toString(), 301);
  }

  if (hostname === CANONICAL_HOST && isAppProductPath(url.pathname)) {
    const target = new URL(url.href);
    target.protocol = "https:";
    target.hostname = APP_HOST;
    return Response.redirect(target.toString(), 302);
  }

  return null;
}

const BASE_SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
  // Enforced framing policy (report-only would not block clickjacking).
  "Content-Security-Policy": "frame-ancestors 'none'",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  // Broader CSP in report-only while Clerk/Convex/Turnstile/fonts are tuned.
  "Content-Security-Policy-Report-Only": [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.accounts.dev https://*.clerk.com https://challenges.cloudflare.com",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://*.convex.cloud wss://*.convex.cloud https://*.clerk.accounts.dev https://*.clerk.com https://challenges.cloudflare.com",
    "frame-src https://challenges.cloudflare.com https://*.clerk.accounts.dev https://*.clerk.com",
    "worker-src 'self' blob:",
  ].join("; "),
};

export function applySecurityHeaders(request: Request, response: Response): Response {
  const hostname = requestHostname(request);
  const headers = new Headers(response.headers);

  for (const [key, value] of Object.entries(BASE_SECURITY_HEADERS)) {
    headers.set(key, value);
  }

  if (requestProto(request) === "https" && isProductionHost(hostname)) {
    // includeSubDomains only after app.unisen.uk is confirmed on HTTPS (it is).
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }

  if (hostname === APP_HOST || hostname === "app.localhost") {
    headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

const MARKETING_ROBOTS_BODY = `# https://unisen.uk/robots.txt
User-agent: *
Allow: /

Disallow: /consultations
Disallow: /family
Disallow: /calendar
Disallow: /templates
Disallow: /settings
Disallow: /reports

Sitemap: https://unisen.uk/sitemap.xml
# Optional LLM entry point: https://unisen.uk/llms.txt
`;

const APP_ROBOTS_BODY = `# https://app.unisen.uk/robots.txt
User-agent: *
Disallow: /
`;

/**
 * Host-aware robots.txt. Must not exist under public/ or Nitro's outer asset
 * handler will serve the marketing file on every host before SSR runs.
 */
export function maybeRobotsResponse(request: Request): Response | null {
  let pathname = "/";
  try {
    pathname = new URL(request.url).pathname;
  } catch {
    return null;
  }
  if (pathname !== "/robots.txt") return null;

  const hostname = requestHostname(request);
  const isApp = hostname === APP_HOST || hostname === "app.localhost";
  return new Response(isApp ? APP_ROBOTS_BODY : MARKETING_ROBOTS_BODY, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
      ...(isApp ? { "X-Robots-Tag": "noindex, nofollow" } : {}),
    },
  });
}
