import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequest, getRequestHost } from "@tanstack/react-start/server";
import { getHostMode, type HostMode } from "./site";

/** Current request hostname (SSR) or browser hostname (client). */
export const getHostname = createIsomorphicFn()
  .server(() => getRequestHost({ xForwardedHost: true }) ?? "localhost")
  .client(() => window.location.hostname);

/** Path + query + hash for the current request/location. */
export const getLocationSuffix = createIsomorphicFn()
  .server(() => {
    try {
      const url = new URL(getRequest().url);
      return `${url.pathname}${url.search}${url.hash}`;
    } catch {
      return "/";
    }
  })
  .client(
    () =>
      `${window.location.pathname}${window.location.search}${window.location.hash}`,
  );

export function resolveHostMode(): HostMode {
  return getHostMode(getHostname());
}

/** Clerk dev/prod handshake query keys that must finish on the app host. */
export function hasClerkHandshakeParams(search: string): boolean {
  const q = search.startsWith("?") ? search.slice(1) : search;
  if (!q) return false;
  const params = new URLSearchParams(q);
  return (
    params.has("__clerk_db_jwt") ||
    params.has("__clerk_handshake") ||
    params.has("__clerk_synced") ||
    params.has("__clerk_redirect_url")
  );
}

/** Session/client cookies that mean Clerk must resolve auth for this request. */
export function hasClerkSessionCookie(cookieHeader: string | null | undefined): boolean {
  if (!cookieHeader) return false;
  return /(?:^|;\s*)(__session|__client)(?:_uat|_account)?=/.test(cookieHeader);
}

/**
 * Whether this host/visit needs Clerk + Convex (app shell or returning session).
 * Cold marketing / combined public visits skip auth entirely for first paint.
 */
export const needsAuthShell = createIsomorphicFn()
  .server(() => {
    const host = getRequestHost({ xForwardedHost: true }) ?? "localhost";
    const hostname = host.split(":")[0]?.toLowerCase() ?? "";
    const mode = getHostMode(hostname);
    if (mode === "app") return true;
    if (mode === "marketing") return false;
    try {
      const cookie = getRequest().headers.get("cookie");
      return hasClerkSessionCookie(cookie);
    } catch {
      return false;
    }
  })
  .client(() => {
    const mode = getHostMode(window.location.hostname);
    if (mode === "app") return true;
    if (mode === "marketing") return false;
    return hasClerkSessionCookie(document.cookie);
  });
