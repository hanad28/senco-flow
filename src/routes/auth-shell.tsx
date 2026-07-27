import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import {
  ClerkProvider,
  OrganizationSwitcher,
  SignIn,
  UserButton,
  useAuth,
} from "@clerk/tanstack-react-start";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { useEffect } from "react";

import { ConsultationsProvider } from "../lib/consultations-store";
import { SchoolProfileProvider } from "../lib/school-profile-store";
import { TemplatesProvider } from "../lib/templates-store";
import { SearchProvider } from "../lib/search-store";
import { getLocationSuffix } from "../lib/hostname";
import { APP_URL, SITE_URL, type HostMode } from "../lib/site";
import { LandingPage } from "../landing/landing-page";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

const postAuthRedirect = `${APP_URL}/`;
const postSignOutUrl = `${SITE_URL}/`;

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
      Loading…
    </div>
  );
}

/** Unauthenticated users on app.unisen.uk — Clerk sign-in, not marketing. */
function AppSignInGate() {
  return (
    <div className="relative isolate flex min-h-screen flex-col items-center justify-center gap-6 overflow-hidden px-4">
      <img
        src="/assets/brand/hero-park-1280.jpg"
        srcSet="/assets/brand/hero-park-768.jpg 768w, /assets/brand/hero-park-1280.jpg 1280w, /assets/brand/hero-park-1840.jpg 1840w"
        sizes="100vw"
        alt=""
        width={1840}
        height={1308}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        decoding="async"
      />
      <div className="absolute inset-0 -z-10 bg-slate-950/25" aria-hidden />
      <div className="text-center text-white drop-shadow-sm">
        <p className="text-lg font-semibold tracking-tight">Unisen</p>
        <p className="mt-1 text-sm">Sign in to open your dashboard</p>
      </div>
      <SignIn
        routing="hash"
        forceRedirectUrl={postAuthRedirect}
        signUpForceRedirectUrl={postAuthRedirect}
        fallbackRedirectUrl={postAuthRedirect}
      />
      <a
        href={SITE_URL}
        className="text-sm text-white underline-offset-4 drop-shadow-sm hover:underline"
      >
        ← Back to unisen.uk
      </a>
    </div>
  );
}

function AuthenticatedApp({ queryClient }: { queryClient: QueryClient }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SchoolProfileProvider>
        <TemplatesProvider>
          <ConsultationsProvider>
            <SearchProvider>
              <Outlet />
              <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border bg-background/95 p-2 shadow-lg backdrop-blur">
                <OrganizationSwitcher />
                <UserButton afterSignOutUrl={postSignOutUrl} />
              </div>
            </SearchProvider>
          </ConsultationsProvider>
        </TemplatesProvider>
      </SchoolProfileProvider>
    </QueryClientProvider>
  );
}

/**
 * Marketing paint must not wait on auth.
 * AuthLoading used to flash a centered "Loading…" then swap in the full landing —
 * that single swap was ~0.78 CLS on mobile PageSpeed.
 */
function MarketingLanding() {
  return <LandingPage />;
}

function HostAwareAuthShell({
  hostMode,
  queryClient,
}: {
  hostMode: HostMode;
  queryClient: QueryClient;
}) {
  // App host: keep a compact loader while Clerk resolves (sign-in gate next).
  // Combined (e.g. *.vercel.app): show marketing immediately so lab tools and
  // first visitors never see a blank/loading → full-page layout shift.
  const loadingFallback =
    hostMode === "app" ? <LoadingScreen /> : <MarketingLanding />;

  return (
    <>
      <AuthLoading>{loadingFallback}</AuthLoading>

      <Unauthenticated>
        {hostMode === "app" ? <AppSignInGate /> : <MarketingLanding />}
      </Unauthenticated>

      <Authenticated>
        {hostMode === "marketing" ? (
          <MarketingLanding />
        ) : (
          <AuthenticatedApp queryClient={queryClient} />
        )}
      </Authenticated>
    </>
  );
}

/** Full Clerk + Convex shell — only loaded when a session is expected. */
export default function AuthShell({
  hostMode,
  queryClient,
}: {
  hostMode: HostMode;
  queryClient: QueryClient;
}) {
  return (
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      signInFallbackRedirectUrl={postAuthRedirect}
      signUpFallbackRedirectUrl={postAuthRedirect}
      afterSignOutUrl={postSignOutUrl}
      allowedRedirectOrigins={[APP_URL, SITE_URL]}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <HostAwareAuthShell hostMode={hostMode} queryClient={queryClient} />
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

/** Send browser to the app host, preserving path/query/hash (incl. Clerk handshake). */
export function RedirectToApp({ reason }: { reason?: string }) {
  useEffect(() => {
    const suffix = getLocationSuffix();
    const target = `${APP_URL}${suffix || "/"}`;
    if (typeof window !== "undefined" && window.location.href !== target) {
      window.location.replace(target);
    }
  }, [reason]);
  return <LoadingScreen />;
}
