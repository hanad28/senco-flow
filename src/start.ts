import { createStart, createMiddleware } from "@tanstack/react-start";
import { clerkMiddleware } from "@clerk/tanstack-react-start/server";

import { renderErrorPage } from "./lib/error-page";
import { hasClerkSessionCookie } from "./lib/hostname";
import { getHostMode } from "./lib/site";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

const clerk = clerkMiddleware();

function shouldSkipClerkAuth(request: Request, hostname: string): boolean {
  const mode = getHostMode(hostname);
  // Pure marketing never needs session resolution.
  if (mode === "marketing") return true;
  // App host always resolves auth (sign-in gate).
  if (mode === "app") return false;

  // Combined (e.g. *.vercel.app): cold public visitors get HTML without the
  // Clerk dev-browser handshake redirect chain (~1.7s). Returning visitors
  // with session cookies or an in-flight handshake still hit Clerk.
  const hasSession = hasClerkSessionCookie(request.headers.get("cookie"));
  let hasHandshake = false;
  try {
    const url = new URL(request.url);
    hasHandshake =
      url.searchParams.has("__clerk_handshake") ||
      url.searchParams.has("__clerk_db_jwt") ||
      url.searchParams.has("__clerk_synced") ||
      url.searchParams.has("__clerk_redirect_url");
  } catch {
    hasHandshake = false;
  }
  return !hasSession && !hasHandshake;
}

/**
 * Avoid Clerk authenticateRequest redirects on hosts/visits that only need
 * the public marketing landing (FCP/LCP killers on PageSpeed cold runs).
 */
const hostAwareClerkMiddleware = createMiddleware().server(async (opts) => {
  const hostHeader =
    opts.request.headers.get("x-forwarded-host") ??
    opts.request.headers.get("host") ??
    "";
  const hostname = hostHeader.split(":")[0]?.toLowerCase() ?? "";
  if (shouldSkipClerkAuth(opts.request, hostname)) {
    return opts.next();
  }
  return clerk.options.server!(opts);
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware, hostAwareClerkMiddleware],
}));
