import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { lazy, Suspense, useEffect, type ReactNode } from "react";
import {
  ClerkProvider,
  OrganizationSwitcher,
  UserButton,
  useAuth,
} from "@clerk/tanstack-react-start";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ConsultationsProvider } from "../lib/consultations-store";
import { SchoolProfileProvider } from "../lib/school-profile-store";
import { TemplatesProvider } from "../lib/templates-store";
import { SearchProvider } from "../lib/search-store";

const LandingPage = lazy(() =>
  import("../landing/landing-page").then((m) => ({ default: m.LandingPage })),
);

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
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Unisen — SEND coordination for schools & families" },
      {
        name: "description",
        content:
          "Unisen helps schools and families run EHC needs assessments together — shared timelines, statutory deadlines, and execution assistance.",
      },
      { property: "og:title", content: "Unisen — SEND coordination for schools & families" },
      {
        property: "og:description",
        content:
          "Visibility, execution assistance, and clear communication across school and family EHC workspaces.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { rel: "icon", href: "/favicon.png", type: "image/png", sizes: "512x512" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Nunito+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:ital,wght@0,500;0,600;0,700;0,800;1,400;1,600&display=swap",
      },
    ],
  }),
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

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <AuthLoading>
          <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
            Loading…
          </div>
        </AuthLoading>
        <Unauthenticated>
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
                Loading…
              </div>
            }
          >
            <LandingPage />
          </Suspense>
        </Unauthenticated>
        <Authenticated>
          <QueryClientProvider client={queryClient}>
            <SchoolProfileProvider>
              <TemplatesProvider>
                <ConsultationsProvider>
                  <SearchProvider>
                    <Outlet />
                    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border bg-background/95 p-2 shadow-lg backdrop-blur">
                      <OrganizationSwitcher />
                      <UserButton />
                    </div>
                  </SearchProvider>
                </ConsultationsProvider>
              </TemplatesProvider>
            </SchoolProfileProvider>
          </QueryClientProvider>
        </Authenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
