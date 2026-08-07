import { QueryClient } from "@tanstack/react-query";
import {
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { lazy, Suspense, useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import {
  getLocationSuffix,
  hasClerkHandshakeParams,
  needsAuthShell,
  resolveHostMode,
} from "../lib/hostname";
import { isAppProductPath } from "../lib/request-hardening";
import {
  SITE_DESCRIPTION,
  SITE_OG_DESCRIPTION,
  SITE_OG_IMAGE,
  SITE_HOME_TITLE,
  SITE_TITLE,
  SITE_URL,
  clerkFrontendOrigin,
  pageTitle,
  siteJsonLd,
} from "../lib/site";
import { MarketingSurface } from "../landing/marketing-surface";

// Auth stack (Clerk/Convex) is a separate chunk: cold marketing visits never download it.
const loadAuthShell = () => import("./-auth-shell");
const AuthShell = lazy(loadAuthShell);
const RedirectToApp = lazy(() =>
  loadAuthShell().then((m) => ({ default: m.RedirectToApp })),
);

// App-host chrome is lazy so the marketing preload graph never pulls app-shell
// chunks. It is used as a Suspense fallback, so wrap it in its own Suspense.
const AppHostChrome = lazy(() =>
  import("./-app-host-chrome").then((m) => ({ default: m.AppHostChrome })),
);

function AppHostChromeFallback() {
  return (
    <Suspense fallback={null}>
      <AppHostChrome />
    </Suspense>
  );
}

const CLERK_FRONTEND_ORIGIN = clerkFrontendOrigin();

// App host always needs auth: kick off the chunk as soon as this module evaluates.
if (typeof window !== "undefined") {
  const host = window.location.hostname.toLowerCase().split(":")[0] ?? "";
  if (host === "app.unisen.uk" || host === "app.localhost") {
    void loadAuthShell();
  }
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. You can try again or head back to the dashboard.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: (ctx) => {
    const isNotFound = ctx?.matches?.some(
      (m) => m.status === "notFound" || m.globalNotFound === true,
    );

    if (isNotFound) {
      return {
        meta: [
          { charSet: "utf-8" },
          { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
          { name: "theme-color", content: "#0596F2" },
          { name: "theme-color", content: "#0596F2", media: "(prefers-color-scheme: light)" },
          { name: "theme-color", content: "#0596F2", media: "(prefers-color-scheme: dark)" },
          { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
          { title: pageTitle("Page not found") },
          { name: "robots", content: "noindex, nofollow" },
        ],
        links: [
          { rel: "stylesheet", href: appCss },
          { rel: "icon", href: "/favicon.ico", type: "image/png", sizes: "any" },
        ],
      };
    }

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
        // Hero sky match (closest single: #0596F2).
        { name: "theme-color", content: "#0596F2" },
        { name: "theme-color", content: "#0596F2", media: "(prefers-color-scheme: light)" },
        { name: "theme-color", content: "#0596F2", media: "(prefers-color-scheme: dark)" },
        { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
        { title: SITE_HOME_TITLE },
        { name: "description", content: SITE_DESCRIPTION },
        { property: "og:title", content: SITE_TITLE },
        { property: "og:description", content: SITE_OG_DESCRIPTION },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE_URL}/` },
        { property: "og:image", content: SITE_OG_IMAGE },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:type", content: "image/png" },
        { property: "og:image:alt", content: SITE_TITLE },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: SITE_TITLE },
        { name: "twitter:description", content: SITE_OG_DESCRIPTION },
        { name: "twitter:image", content: SITE_OG_IMAGE },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        // User-supplied original at public/favicon.ico (do not reprocess)
        { rel: "icon", href: "/favicon.ico", type: "image/png", sizes: "any" },
        // Note: a framework-generated <link rel="preload" as="image" href="/favicon.ico"/>
        // still appears in built HTML regardless of apple-touch-icon presence; this is
        // TanStack Start/Nitro behavior, not something we fight here.
        { rel: "apple-touch-icon", href: "/favicon.ico" },
        // Hero LCP: discover before JS; mobile PSI typically picks 768 to 1280w.
        {
          rel: "preload",
          as: "image",
          href: "/assets/brand/hero-park-768.jpg",
          imageSrcSet:
            "/assets/brand/hero-park-768.jpg 768w, /assets/brand/hero-park-1280.jpg 1280w, /assets/brand/hero-park-1840.jpg 1840w",
          imageSizes: "100vw",
          fetchPriority: "high",
        } as Record<string, string>,
        // Self-hosted variable woff2 (replaces Google Fonts CDN).
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: "/assets/fonts/figtree-latin.woff2",
          crossOrigin: "anonymous",
        },
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: "/assets/fonts/literata-latin.woff2",
          crossOrigin: "anonymous",
        },
        // Clerk FAPI: warm DNS/TLS before SignIn mounts (app host cold path).
        ...(CLERK_FRONTEND_ORIGIN
          ? [
              { rel: "preconnect", href: CLERK_FRONTEND_ORIGIN, crossOrigin: "anonymous" },
              { rel: "dns-prefetch", href: CLERK_FRONTEND_ORIGIN },
            ]
          : []),
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(siteJsonLd()),
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const hostMode = resolveHostMode();
  const locationSuffix = getLocationSuffix();
  const search = locationSuffix.includes("?")
    ? locationSuffix.slice(locationSuffix.indexOf("?"))
    : "";
  const clerkHandoff = hasClerkHandshakeParams(search);

  // Handshake tokens that landed off the app host must finish on the app host.
  if (hostMode !== "app" && clerkHandoff) {
    return (
      <Suspense fallback={null}>
        <RedirectToApp reason="clerk-handshake" />
      </Suspense>
    );
  }

  // Product paths on the marketing host belong on the app host (auth + Convex).
  const pathOnly = locationSuffix.split("?")[0]?.split("#")[0] || "/";
  if (hostMode === "marketing" && isAppProductPath(pathOnly)) {
    return (
      <Suspense fallback={<AppHostChromeFallback />}>
        <RedirectToApp reason="app-path-on-marketing" />
      </Suspense>
    );
  }

  // Marketing + cold combined (no session cookie): paint marketing with zero Clerk.
  // Home = landing; other public routes use Outlet via MarketingSurface.
  if (!needsAuthShell()) {
    return <MarketingSurface />;
  }

  // App host: chrome first (not full marketing) while the auth chunk loads.
  const fallback = hostMode === "app" ? <AppHostChromeFallback /> : <MarketingSurface />;

  return (
    <Suspense fallback={fallback}>
      <AuthShell hostMode={hostMode} queryClient={queryClient} />
    </Suspense>
  );
}
