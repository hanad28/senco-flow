import { Navigate, useRouterState } from "@tanstack/react-router";
import { useUser } from "@clerk/tanstack-react-start";
import type { ReactNode } from "react";
import { isDemoClerkUser } from "@/lib/demo-account";
import { isSchoolProfileComplete } from "@/lib/onboarding";
import { useSchoolProfile } from "@/lib/school-profile-store";
import { useSnapshotHydrated } from "@/lib/use-snapshot-hydrated";

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
      Loading…
    </div>
  );
}

/**
 * Incomplete school profiles (non-demo) must finish `/onboarding` before other app routes.
 */
export function OnboardingGate({ children }: { children: ReactNode }) {
  const { user, isLoaded } = useUser();
  const hydrated = useSnapshotHydrated("schoolProfile");
  const { profile } = useSchoolProfile();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onOnboarding = pathname === "/onboarding";

  if (!isLoaded || !hydrated) {
    return <LoadingScreen />;
  }

  if (isDemoClerkUser(user?.id)) {
    return children;
  }

  const complete = isSchoolProfileComplete(profile);

  // Incomplete profiles must enter onboarding. Once there, stay until they
  // finish the wizard (identity alone must not bounce them to the dashboard).
  if (!complete && !onOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}
