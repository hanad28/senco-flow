import { useEffect, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { buildSeedNormalised } from "@/lib/consultations-store";
import { seedSchoolProfile } from "@/lib/school-profile-store";
import { seedEvidence, seedSnippets } from "@/lib/templates-store";
import { demoFamilyCase } from "@/lib/family-case-store";

/**
 * For the designated demo Clerk account only, write / refresh Convex snapshots.
 * Consultations + family case are rebuilt relative to today on each login.
 * Other accounts get a no-op from the server and keep blank workspaces.
 */
export function DemoSeedBootstrap() {
  const ensureDemoSeed = useMutation(api.snapshots.ensureDemoSeed);
  const attempted = useRef(false);

  useEffect(() => {
    if (attempted.current) return;
    attempted.current = true;
    const today = new Date();
    void ensureDemoSeed({
      consultations: buildSeedNormalised(today),
      schoolProfile: seedSchoolProfile,
      templates: { evidence: seedEvidence, snippets: seedSnippets },
      familyCase: demoFamilyCase(today),
    });
  }, [ensureDemoSeed]);

  return null;
}
