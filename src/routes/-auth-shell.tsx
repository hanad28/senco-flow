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
import { AppHostChrome } from "./-app-host-chrome";

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
    <AppHostChrome>
      <SignIn
        routing="hash"
        forceRedirectUrl={postAuthRedirect}
        signUpForceRedirectUrl={postAuthRedirect}
        fallbackRedirectUrl={postAuthRedirect}
      />
    </AppHostChrome>
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

/**
 * App host: do not wait on Convex AuthLoading before showing sign-in.
 * That serial wait was the main "Clerk is slow" feel for cold visits.
 * Convex only gates the dashboard after Clerk reports signed-in.
 */
function AppHostShell({ queryClient }: { queryClient: QueryClient }) {
  const { isLoaded, isSignedIn } = useAuth();

  // Clerk still resolving session — chrome only (no SignIn flash for returnees).
  if (!isLoaded) {
    return <AppHostChrome />;
  }

  if (!isSignedIn) {
    return <AppSignInGate />;
  }

  return (
    <>
      <AuthLoading>
        <LoadingScreen />
      </AuthLoading>
      <Authenticated>
        <AuthenticatedApp queryClient={queryClient} />
      </Authenticated>
    </>
  );
}

function HostAwareAuthShell({
  hostMode,
  queryClient,
}: {
  hostMode: HostMode;
  queryClient: QueryClient;
}) {
  if (hostMode === "app") {
    return <AppHostShell queryClient={queryClient} />;
  }

  // Combined (e.g. *.vercel.app): marketing immediately — no loading → layout shift.
  return (
    <>
      <AuthLoading>
        <MarketingLanding />
      </AuthLoading>

      <Unauthenticated>
        <MarketingLanding />
      </Unauthenticated>

      <Authenticated>
        <AuthenticatedApp queryClient={queryClient} />
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
