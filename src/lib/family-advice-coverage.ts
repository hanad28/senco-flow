import type { FamilyDoc, ReviewStatus } from "./family-case-store";

/** Advice types typically expected when preparing a draft EHC plan (Section K). */
export type RequiredAdvice = {
  id: string;
  label: string;
  match: (doc: FamilyDoc) => boolean;
};

export const REQUIRED_ADVICE: RequiredAdvice[] = [
  {
    id: "ep",
    label: "Educational psychology advice",
    match: (d) =>
      /educational psycholog|EP advice/i.test(d.title) || /educational psycholog/i.test(d.professional),
  },
  {
    id: "salt",
    label: "Speech and language therapy advice",
    match: (d) => /speech and language|SaLT/i.test(d.title) || /speech and language|SaLT/i.test(d.professional),
  },
  {
    id: "ot",
    label: "Occupational therapy advice",
    match: (d) => /occupational therap|\bOT\b/i.test(d.title) || /occupational therap/i.test(d.professional),
  },
  {
    id: "school",
    label: "School SEN / SENDCO advice",
    match: (d) => /SEN support|SENDCO|school advice/i.test(d.title) || /SENDCO/i.test(d.professional),
  },
  {
    id: "views",
    label: "Child and family views",
    match: (d) => /views|aspirations/i.test(d.title) || /child.*views/i.test(d.kind),
  },
];

export type AdviceCoverageRow = {
  id: string;
  label: string;
  present: boolean;
  documentIds: string[];
};

export function adviceCoverage(documents: FamilyDoc[]): AdviceCoverageRow[] {
  return REQUIRED_ADVICE.map((req) => {
    const hits = documents.filter(req.match);
    return {
      id: req.id,
      label: req.label,
      present: hits.length > 0,
      documentIds: hits.map((d) => d.id),
    };
  });
}

/** Derive Section K review status from document list vs required advice. */
export function deriveSectionKStatus(documents: FamilyDoc[]): ReviewStatus {
  const rows = adviceCoverage(documents);
  const missing = rows.filter((r) => !r.present);
  if (missing.length === 0) return "reviewed";
  return "needs_attention";
}
