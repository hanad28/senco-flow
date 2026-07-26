import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { NeedCapability } from "./consultations-store";
import type { NeedDomain } from "./school-profile-store";

export type EvidenceDoc = {
  id: string;
  name: string;
  kind: string;
  updated: string; // ISO
  size: string;
  note: string;
};

// Curated boilerplate for "can meet in part" and "cannot meet" outcomes.
// "Can meet in full" snippets are derived live from the Settings provision
// catalogue and are NOT stored here.
export type PartialCannotSnippet = {
  id: string;
  domain: NeedDomain;
  capability: Exclude<NeedCapability, "full">;
  title: string;
  text: string;
  evidenceId?: string; // links to EvidenceDoc.id
};

export const seedEvidence: EvidenceDoc[] = [
  {
    id: "ev-provision-map",
    name: "Provision map 2025-26.pdf",
    kind: "Provision map",
    updated: "2026-06-01",
    size: "412 KB",
    note: "Whole-school provision map for the current academic year, by year group and area of need.",
  },
  {
    id: "ev-ta-timetable-rwi",
    name: "TA timetable — RWI.pdf",
    kind: "Staffing",
    updated: "2026-05-20",
    size: "88 KB",
    note: "Deployment of trained TAs delivering Read Write Inc. across KS1 and Y3 intervention groups.",
  },
  {
    id: "ev-costed-provision",
    name: "Costed provision map — Section F.xlsx",
    kind: "Costing",
    updated: "2026-05-30",
    size: "64 KB",
    note: "Per-pupil cost of each intervention, used to evidence provision within element 1/2 funding.",
  },
  {
    id: "ev-elsa-training",
    name: "ELSA training certificates.pdf",
    kind: "Training",
    updated: "2026-04-14",
    size: "1.2 MB",
    note: "Accreditation records for the two ELSA-trained TAs currently on roll.",
  },
  {
    id: "ev-send-info-report",
    name: "SEND information report 2025-26.pdf",
    kind: "Policy",
    updated: "2026-09-01",
    size: "230 KB",
    note: "Statutory SEND information report published on the school website.",
  },
  {
    id: "ev-sensory-room",
    name: "Sensory room photos.pdf",
    kind: "Environment",
    updated: "2026-03-12",
    size: "3.4 MB",
    note: "Photographs and floor plan of the low-stimulus room and hall sensory circuit set-up.",
  },
];

export const seedSnippets: PartialCannotSnippet[] = [
  // Communication & Interaction
  {
    id: "sn-comm-partial-1",
    domain: "communication",
    capability: "partial",
    title: "SaLT-devised programme, no direct therapy",
    text: "The school can meet this need in part for {{pupil}} ({{year_group}}). A trained TA can deliver a therapist-devised programme 3×15 minutes per week, reviewed termly by the commissioned SaLT. Direct weekly therapy from a qualified SaLT is not currently commissioned by the school and would need to be arranged by {{LA}}.",
    evidenceId: "ev-ta-timetable-rwi",
  },
  {
    id: "sn-comm-partial-2",
    domain: "communication",
    capability: "partial",
    title: "Social communication group — larger group size",
    text: "The school runs a weekly Lego Therapy group of up to 6 pupils, delivered by a trained TA in 45-minute sessions across the school year. We can prioritise a place for {{pupil}}; the recommended group size of no more than 4 would require additional TA capacity, which we would be able to provide with the funding uplift identified in Section F.",
    evidenceId: "ev-provision-map",
  },
  {
    id: "sn-comm-cannot-1",
    domain: "communication",
    capability: "cannot",
    title: "Direct weekly SaLT — LA to commission",
    text: "The school is not currently able to meet this need for {{pupil}}. We do not commission direct on-site provision from a qualified Speech & Language Therapist beyond 0.5 day/week, shared across the SEND cohort. Weekly 1:1 direct therapy for {{pupil}} would need to be commissioned by {{LA}} as part of the Section F provision.",
  },

  // Cognition & Learning
  {
    id: "sn-cog-partial-1",
    domain: "cognition",
    capability: "partial",
    title: "Increased 1:1 literacy — ratio uplift",
    text: "The school can meet this need in part for {{pupil}} ({{year_group}}). Read Write Inc. is delivered 1:1 with a trained TA for 4×20 minutes per week, tracked half-termly against reading age. The recommended 5×30 minutes per week would require the funding uplift identified in Section F to release additional trained TA time.",
    evidenceId: "ev-provision-map",
  },
  {
    id: "sn-cog-cannot-1",
    domain: "cognition",
    capability: "cannot",
    title: "Specialist dyslexia teacher — LA to commission",
    text: "The school is not currently able to meet this need for {{pupil}}. We do not employ a qualified specialist dyslexia teacher (AMBDA or equivalent). Weekly specialist teaching would need to be commissioned by {{LA}}; the school can host the sessions on site and release {{pupil}} from timetable.",
  },

  // SEMH
  {
    id: "sn-semh-partial-1",
    domain: "semh",
    capability: "partial",
    title: "ELSA 1:1 — extended block",
    text: "The school can meet this need in part for {{pupil}}. An accredited ELSA-trained TA delivers 1:1 sessions of 30 minutes per week in 6-week blocks. Extending to 12-week continuous blocks with fortnightly parent liaison would require the funding uplift identified in Section F.",
    evidenceId: "ev-elsa-training",
  },
  {
    id: "sn-semh-cannot-1",
    domain: "semh",
    capability: "cannot",
    title: "Weekly play therapy — LA to commission",
    text: "The school is not currently able to meet this need for {{pupil}}. Weekly 1:1 play therapy from a BAPT-registered play therapist is not commissioned by the school and would need to be arranged by {{LA}}. The school can provide space and adult liaison during the sessions.",
  },

  // Sensory / Physical
  {
    id: "sn-sen-partial-1",
    domain: "sensory",
    capability: "partial",
    title: "Sensory breaks — every 45 minutes",
    text: "The school can meet this need in part for {{pupil}}. A daily 10-minute sensory circuit is delivered by a TA before morning registration, and the low-stimulus room is available on request. Timetabled 45-minute breaks throughout the day with a named TA would require the additional TA capacity identified in Section F.",
    evidenceId: "ev-sensory-room",
  },
  {
    id: "sn-sen-cannot-1",
    domain: "sensory",
    capability: "cannot",
    title: "Direct weekly OT — LA to commission",
    text: "The school is not currently able to meet this need for {{pupil}}. Direct weekly Occupational Therapy is not commissioned by the school; OT input is currently accessed per-pupil on referral. Weekly direct therapy for {{pupil}} would need to be commissioned by {{LA}}.",
  },
];

// Replace {{pupil}}, {{year_group}}, {{LA}} tokens with real consultation data.
export function fillTemplateTokens(
  text: string,
  ctx: { pupil: string; yearGroup: string; localAuthority: string },
): string {
  return text
    .replace(/\{\{\s*pupil\s*\}\}/gi, ctx.pupil)
    .replace(/\{\{\s*year[_ ]?group\s*\}\}/gi, ctx.yearGroup)
    .replace(/\{\{\s*LA\s*\}\}/gi, ctx.localAuthority);
}

type Ctx = {
  evidence: EvidenceDoc[];
  snippets: PartialCannotSnippet[];
  getEvidence: (id: string) => EvidenceDoc | undefined;
};

const TemplatesContext = createContext<Ctx | null>(null);

export function TemplatesProvider({ children }: { children: ReactNode }) {
  const [evidence] = useState<EvidenceDoc[]>(seedEvidence);
  const [snippets] = useState<PartialCannotSnippet[]>(seedSnippets);
  const value = useMemo<Ctx>(
    () => ({
      evidence,
      snippets,
      getEvidence: (id) => evidence.find((e) => e.id === id),
    }),
    [evidence, snippets],
  );
  return <TemplatesContext.Provider value={value}>{children}</TemplatesContext.Provider>;
}

export function useTemplates() {
  const ctx = useContext(TemplatesContext);
  if (!ctx) throw new Error("useTemplates must be used within TemplatesProvider");
  return ctx;
}
