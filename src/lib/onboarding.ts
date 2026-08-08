import type { SchoolProfile } from "@/lib/school-profile-store";

/** Identity fields required to leave onboarding. */
export function isSchoolProfileComplete(profile: SchoolProfile): boolean {
  return (
    profile.schoolName.trim().length > 0 &&
    profile.sendcoName.trim().length > 0 &&
    profile.sendcoRole.trim().length > 0
  );
}
