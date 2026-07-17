// Central statutory / process configuration for the Family workspace.
// Shared everywhere the response period, legal framework, source labels
// and disclaimers appear. Do not duplicate this data elsewhere.

export const FAMILY_STATUTORY = {
  jurisdiction: "England",
  framework:
    "Children and Families Act 2014 · SEND Regulations 2014 · SEND Code of Practice: 0 to 25 years",
  draftResponsePeriodDays: 15,
  draftResponsePeriodLabel: "at least 15 calendar days",
  sourceTitle: "SEND Code of Practice: 0 to 25 years",
  supplementarySourceLabel:
    "GOV.UK guidance for children with special educational needs and disabilities",
  independentInformationLabel: "IPSEA",
  lastReviewedIso: "2026-07-17",
  disclaimer:
    "This tool supports document organisation and preparation and is not a substitute for independent legal advice or SENDIASS support.",
  demoBanner:
    "Demo workspace — all names and documents are fictional.",
  aiDisclosure:
    "AI demonstration — answers use fictional seeded documents and do not constitute legal advice.",
  translationDisclosure:
    "AI-assisted translation — check important wording before relying on it.",
} as const;

// Add N calendar days to an ISO date (received day itself does not count;
// day 1 is the next calendar day). Matches the school-workspace convention.
export function familyDeadlineIso(receivedOnIso: string, days = FAMILY_STATUTORY.draftResponsePeriodDays): string {
  const d = new Date(receivedOnIso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function familyDaysRemaining(receivedOnIso: string, todayIso?: string): number {
  const deadline = new Date(familyDeadlineIso(receivedOnIso) + "T00:00:00Z").getTime();
  const today = todayIso ? new Date(todayIso + "T00:00:00Z").getTime() : Date.UTC(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth(),
    new Date().getUTCDate(),
  );
  return Math.round((deadline - today) / (1000 * 60 * 60 * 24));
}
