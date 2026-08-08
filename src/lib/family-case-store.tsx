// FamilyCaseProvider — family workspace demo state.
// Case content is not written to localStorage; signed-in users persist a remote
// Convex snapshot via usePersistentSnapshot (demo/fictional data only).

import { createContext, useCallback, useContext, useMemo, type Dispatch, type ReactNode } from "react";
import { FAMILY_STATUTORY, familyDeadlineIso } from "./family-config";
import { usePersistentSnapshot } from "./use-persistent-snapshot";
import {
  DEMO_FAMILY_DAYS_LEFT,
  isoDaysFromToday,
  receivedOnForDaysRemaining,
} from "./demo-seed-dates";
import { deriveSectionKStatus } from "./family-advice-coverage";
import { PROVISION_SPECIFICITY_STANDARD } from "./family-specificity";

export type PlanSection = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H1" | "H2" | "I" | "J" | "K";

export const PLAN_SECTIONS: { key: PlanSection; name: string; blurb: string }[] = [
  { key: "A", name: "Views, interests and aspirations", blurb: "What matters to Maya and her family, in their own words." },
  { key: "B", name: "Special educational needs", blurb: "The needs that professionals have identified." },
  { key: "C", name: "Health needs related to SEN", blurb: "Health needs connected to Maya's learning." },
  { key: "D", name: "Social care needs", blurb: "Social care needs connected to Maya's learning." },
  { key: "E", name: "Outcomes", blurb: "What Maya should be able to do by the end of the plan period." },
  { key: "F", name: "Special educational provision", blurb: "The support the school and others will provide." },
  { key: "G", name: "Health provision", blurb: "Health support agreed by the NHS." },
  { key: "H1", name: "Statutory social care provision", blurb: "Social care support under section 2 of the CSDPA 1970." },
  { key: "H2", name: "Other social care provision", blurb: "Other social care support agreed for Maya." },
  { key: "I", name: "Placement", blurb: "The name and type of school or setting Maya will attend." },
  { key: "J", name: "Personal Budget", blurb: "Details of any personal budget requested." },
  { key: "K", name: "Advice and information", blurb: "The list of advice and information used to prepare the plan." },
];

export type ReviewStatus = "reviewed" | "needs_attention" | "not_reviewed" | "not_applicable" | "expected_blank";

export type DocumentSource = "case_document" | "verified_guidance";

export type FamilyDoc = {
  id: string;
  title: string;
  professional: string;
  kind: string;
  date: string;
  pages: number;
  status: "reviewed" | "needs_attention" | "not_processed" | "added_by_family";
  extractedCount: number;
  issueRefs: string[];
  extracts: { page: number; text: string }[];
};

export type Issue = {
  id: string;
  origin: "workflow" | "ai" | "family";
  section: PlanSection;
  severity: "info" | "attention" | "important";
  category:
    | "missing_information"
    | "vague_wording"
    | "evidence_mismatch"
    | "family_views"
    | "outcomes"
    | "placement"
    | "family_created";
  title: string;
  currentDraft?: string;
  why: string;
  sourceDocId?: string;
  sourcePage?: number;
  proposedAmendment: string;
  status: "not_started" | "drafted" | "ready" | "dismissed";
};

export type NeedPairing = {
  id: string;
  need: string;
  provision: string | null;
  professional: string;
  sourceDocId: string;
  sourcePage: number;
  proposed: string;
  status: "reviewed" | "needs_attention" | "not_reviewed";
};

export type OutcomeItem = {
  id: string;
  text: string;
  concern: string | null;
  evidenceDocId?: string;
  proposed?: string;
};

export type FamilyNote = {
  id: string;
  section: PlanSection;
  text: string;
  timestamp: string;
};

export type Amendment = {
  id: string;
  section: PlanSection;
  currentWording?: string;
  proposedWording: string;
  source: "family" | "ai_suggested" | "workflow";
  approved: boolean;
  sourceDocId?: string;
  sourcePage?: number;
};

export type PlacementPref = {
  preferredSchool: string;
  preferredType: string;
  reasons: string;
  travelNotes: string;
  meetingRequested: boolean;
};

export type SupportMember = {
  id: string;
  name: string;
  role: string;
  access: string;
  addedByFamily?: boolean;
  wantsContact?: boolean;
  privateNote?: string;
  reviewSection?: string;
};

export type AssistantMsg = {
  id: string;
  role: "user" | "assistant";
  text: string;
  lang: string;
  originalEnglish?: string;
  citations?: {
    id: string;
    label: string;
    kind: DocumentSource;
    docId?: string;
    page?: number;
    extract?: string;
  }[];
  confidence?: "high" | "medium" | "low";
  limitations?: string;
  suggestedAction?: string;
};

export type FamActivity = {
  id: string;
  timestamp: string; // ISO
  actor: "local_authority" | "system" | "family" | "ai";
  message: string;
};

/** Who currently holds draft-response / naming rights for this case (tracking only). */
export type RightsHolder = "parent" | "young_person";

export type FamilyCase = {
  id: string;
  childName: string;
  age: number;
  yearGroup: string;
  localAuthority: string;
  parent: string;
  caseOfficer: string;
  stage: string;
  /** Tracking field only — not capacity assessment. Defaults to parent for under-16 demos. */
  rightsHolder: RightsHolder;
  draftReceivedIso: string;
  deadlineIso: string;
  documents: FamilyDoc[];
  sectionStatus: Record<PlanSection, ReviewStatus>;
  notes: FamilyNote[];
  amendments: Amendment[];
  issues: Issue[];
  needPairings: NeedPairing[];
  outcomes: OutcomeItem[];
  placement: PlacementPref;
  support: SupportMember[];
  assistant: AssistantMsg[];
  activity: FamActivity[];
};

// ---------- Seed ----------
function actIsoFromDraft(draftIso: string, dayOffset: number, hh = 10, mm = 0): string {
  const [y, m, d] = draftIso.split("-").map(Number);
  const base = Date.UTC(y, (m ?? 1) - 1, d ?? 1, hh, mm);
  return new Date(base + dayOffset * 24 * 60 * 60 * 1000).toISOString();
}

function buildSeedDocs(draftIso: string, today: Date = new Date()): FamilyDoc[] {
  return [
  {
    id: "doc-draft",
    title: "Draft EHC Plan",
    professional: "Camden Local Authority",
    kind: "Draft plan",
    date: draftIso,
    pages: 31,
    status: "reviewed",
    extractedCount: 12,
    issueRefs: ["iss-1", "iss-2", "iss-4"],
    extracts: [
      { page: 4, text: "Maya has difficulty processing multi-step verbal instructions in the classroom." },
      { page: 12, text: "Maya will receive access to regular adult support as appropriate." },
      { page: 18, text: "Maya will improve her communication skills." },
      { page: 24, text: "Occupational Therapy advice is referenced for handwriting support." },
    ],
  },
  {
    id: "doc-ep",
    title: "Educational Psychology Advice",
    professional: "Dr Priya Shah, Educational Psychologist",
    kind: "Professional advice",
    date: isoDaysFromToday(-67, today),
    pages: 8,
    status: "reviewed",
    extractedCount: 9,
    issueRefs: ["iss-1"],
    extracts: [
      { page: 3, text: "Maya presents with receptive-language difficulties, particularly with multi-step instructions." },
      { page: 6, text: "Individual, low-arousal 1:1 support is recommended for new vocabulary." },
    ],
  },
  {
    id: "doc-salt",
    title: "Speech and Language Therapy Report",
    professional: "Emma Collins, SaLT",
    kind: "Professional advice",
    date: isoDaysFromToday(-59, today),
    pages: 6,
    status: "reviewed",
    extractedCount: 7,
    issueRefs: ["iss-3"],
    extracts: [
      { page: 2, text: "Recommend a visual timetable and pre-teaching of key vocabulary before lessons." },
      { page: 4, text: "Weekly 1:1 language sessions with trained TA, supervised termly by SaLT." },
    ],
  },
  {
    id: "doc-sen",
    title: "School SEN Support Summary",
    professional: "S. Ahmed, SENDCO",
    kind: "School evidence",
    date: isoDaysFromToday(-72, today),
    pages: 4,
    status: "reviewed",
    extractedCount: 5,
    issueRefs: [],
    extracts: [{ page: 2, text: "Small-group interventions have improved Maya's confidence but comprehension remains a barrier." }],
  },
  {
    id: "doc-views",
    title: "Parent and Child Views Form",
    professional: "Jordan and Maya Lewis",
    kind: "Family evidence",
    date: isoDaysFromToday(-49, today),
    pages: 3,
    status: "needs_attention",
    extractedCount: 3,
    issueRefs: ["iss-4"],
    extracts: [{ page: 1, text: "Maya said: I like when the teacher shows me the pictures first." }],
  },
  ];
}
const seedIssues: Issue[] = [
  {
    id: "iss-1",
    origin: "workflow",
    section: "F",
    severity: "important",
    category: "missing_information",
    title: "Potential missing provision — multi-step instructions",
    currentDraft: "No specific provision addressing multi-step verbal instructions was found in Section F.",
    why: "Section B identifies difficulty with multi-step verbal instructions, but no matching provision appears in Section F.",
    sourceDocId: "doc-ep",
    sourcePage: 3,
    proposedAmendment:
      "Please consider specifying provision addressing Maya's difficulty with multi-step verbal instructions, for example structured chunking and visual supports delivered by a trained TA.",
    status: "not_started",
  },
  {
    id: "iss-2",
    origin: "workflow",
    section: "F",
    severity: "attention",
    category: "vague_wording",
    title: "Vague provision wording",
    currentDraft: "Maya will receive access to regular adult support as appropriate.",
    why: `Flagged phrases: "access to", "regular", "as appropriate". The legal standard expects provision to specify ${PROVISION_SPECIFICITY_STANDARD.join(", ")}. This tool does not invent replacement wording or hours — write your own request below, drawing only on facts already in Maya's documents or advice from a professional.`,
    sourceDocId: "doc-draft",
    sourcePage: 12,
    proposedAmendment: "",
    status: "not_started",
  },
  {
    id: "iss-3",
    origin: "ai",
    section: "F",
    severity: "attention",
    category: "evidence_mismatch",
    title: "Professional advice not fully reflected — pre-teaching",
    currentDraft: "The draft includes a visual timetable but does not mention pre-teaching of key vocabulary.",
    why: "The SaLT report recommends both a visual timetable and pre-teaching of key vocabulary. Only the first appears in the draft.",
    sourceDocId: "doc-salt",
    sourcePage: 2,
    proposedAmendment:
      "Please add pre-teaching of key vocabulary before lessons to Section F, in line with the SaLT report (page 2).",
    status: "not_started",
  },
  {
    id: "iss-4",
    origin: "workflow",
    section: "A",
    severity: "attention",
    category: "family_views",
    title: "Child's views are incomplete",
    currentDraft: "Section A contains one short sentence attributed to Maya.",
    why: "Maya's own preferences and aspirations would strengthen Section A and are required by the Code of Practice.",
    sourceDocId: "doc-views",
    sourcePage: 1,
    proposedAmendment: "",
    status: "not_started",
  },
];

const seedPairings: NeedPairing[] = [
  {
    id: "pair-1",
    need: "Difficulty processing multi-step verbal instructions",
    provision: null,
    professional: "Dr Priya Shah (EP)",
    sourceDocId: "doc-ep",
    sourcePage: 3,
    proposed: "Add structured chunking and visual supports for multi-step instructions.",
    status: "needs_attention",
  },
  {
    id: "pair-2",
    need: "Receptive language delay affecting new vocabulary",
    provision: "1:1 language-support sessions with a trained TA",
    professional: "Emma Collins (SaLT)",
    sourceDocId: "doc-salt",
    sourcePage: 4,
    proposed: "Specify weekly frequency, duration and supervising professional.",
    status: "needs_attention",
  },
  {
    id: "pair-3",
    need: "Reduced confidence in whole-class discussion",
    provision: "Small-group interventions",
    professional: "S. Ahmed (SENDCO)",
    sourceDocId: "doc-sen",
    sourcePage: 2,
    proposed: "Confirm which intervention and its frequency.",
    status: "not_reviewed",
  },
  {
    id: "pair-4",
    need: "Handwriting fatigue",
    provision: "Access to sloped writing board and scribing where appropriate",
    professional: "Reference to OT advice within draft",
    sourceDocId: "doc-draft",
    sourcePage: 24,
    proposed: "Confirm OT recommendations and appropriate provision.",
    status: "not_reviewed",
  },
  {
    id: "pair-5",
    need: "Anxiety at unstructured transitions",
    provision: "Visual timetable and pre-warning of changes",
    professional: "Emma Collins (SaLT)",
    sourceDocId: "doc-salt",
    sourcePage: 2,
    proposed: "Confirm pre-teaching of vocabulary is added to the same provision.",
    status: "needs_attention",
  },
];

const seedOutcomes: OutcomeItem[] = [
  {
    id: "out-1",
    text: "Maya will improve her communication skills.",
    concern: "This outcome may be difficult to measure — it lacks a clear measure or timeframe.",
    evidenceDocId: "doc-salt",
    proposed: "By the end of Year 5, Maya will consistently follow two-step verbal instructions in class, with visual support, in 8 out of 10 opportunities across a two-week period.",
  },
  {
    id: "out-2",
    text: "Maya will use small-group discussion to share ideas confidently.",
    concern: null,
  },
  {
    id: "out-3",
    text: "Maya will manage transitions between activities using a visual timetable.",
    concern: null,
  },
];

const seedSupport: SupportMember[] = [
  { id: "sup-1", name: "Jordan Lewis", role: "Parent/carer", access: "Full case access" },
  { id: "sup-2", name: "Maya Lewis", role: "Child", access: "Views recorded" },
  { id: "sup-3", name: "S. Ahmed", role: "School SENDCO", access: "Contributor" },
  { id: "sup-4", name: "Rachel Morgan", role: "Local-authority case officer", access: "Recipient" },
  { id: "sup-5", name: "Dr Priya Shah", role: "Educational psychologist", access: "Advice provider" },
  { id: "sup-6", name: "Emma Collins", role: "Speech and language therapist", access: "Advice provider" },
  { id: "sup-7", name: "SENDIASS adviser", role: "Independent adviser", access: "Not yet added" },
];

function buildSeedActivity(draftIso: string): FamActivity[] {
  return [
    { id: "a1", timestamp: actIsoFromDraft(draftIso, 0, 9, 15), actor: "local_authority", message: "Draft EHC plan received." },
    { id: "a2", timestamp: actIsoFromDraft(draftIso, 0, 9, 20), actor: "system", message: "Five documents added to the case." },
    { id: "a3", timestamp: actIsoFromDraft(draftIso, 1, 10, 0), actor: "family", message: "Jordan began reviewing Section A." },
    { id: "a4", timestamp: actIsoFromDraft(draftIso, 1, 10, 45), actor: "system", message: "Potential Section B/F gap highlighted." },
    { id: "a5", timestamp: actIsoFromDraft(draftIso, 2, 11, 30), actor: "family", message: "Proposed amendment saved for vague wording in Section F." },
    { id: "a6", timestamp: actIsoFromDraft(draftIso, 2, 12, 0), actor: "system", message: "Preferred setting not yet recorded." },
  ];
}

/** Demo-only seed. Uses DEMO_FAMILY_DAYS_LEFT so the demo always shows a mid-window clock.
 * Do not call for real/blank accounts — use emptyFamilyCase() instead. */
function makeSeed(today: Date = new Date()): FamilyCase {
  const draft = receivedOnForDaysRemaining(DEMO_FAMILY_DAYS_LEFT, today);
  const documents = buildSeedDocs(draft, today);
  return {
    id: "maya-lewis",
    childName: "Maya Lewis",
    age: 9,
    yearGroup: "Year 5",
    localAuthority: "Camden",
    parent: "Jordan Lewis",
    caseOfficer: "Rachel Morgan",
    stage: "Draft EHC plan received",
    rightsHolder: "parent",
    draftReceivedIso: draft,
    deadlineIso: familyDeadlineIso(draft, FAMILY_STATUTORY.draftResponsePeriodDays),
    documents,
    sectionStatus: {
      A: "needs_attention",
      B: "needs_attention",
      C: "not_applicable",
      D: "not_applicable",
      E: "needs_attention",
      F: "needs_attention",
      G: "not_applicable",
      H1: "not_applicable",
      H2: "not_applicable",
      I: "expected_blank",
      J: "not_applicable",
      K: deriveSectionKStatus(documents),
    },
    notes: [],
    amendments: [],
    issues: seedIssues,
    needPairings: seedPairings,
    outcomes: seedOutcomes,
    placement: {
      preferredSchool: "",
      preferredType: "",
      reasons: "",
      travelNotes: "",
      meetingRequested: false,
    },
    support: seedSupport,
    assistant: [],
    activity: buildSeedActivity(draft),
  };
}

/** Public demo payload for the designated demo-account seed bootstrap. */
export function demoFamilyCase(today: Date = new Date()): FamilyCase {
  return makeSeed(today);
}

/** Blank family workspace for new (non-demo) accounts.
 * Deadline is computed from the stored received date — never from DEMO_FAMILY_DAYS_LEFT. */
export function emptyFamilyCase(today: Date = new Date()): FamilyCase {
  const draft = today.toISOString().slice(0, 10);
  return {
    id: "empty-case",
    childName: "",
    age: 0,
    yearGroup: "",
    localAuthority: "",
    parent: "",
    caseOfficer: "",
    stage: "Not started",
    rightsHolder: "parent",
    draftReceivedIso: draft,
    deadlineIso: familyDeadlineIso(draft, FAMILY_STATUTORY.draftResponsePeriodDays),
    documents: [],
    sectionStatus: {
      A: "not_reviewed",
      B: "not_reviewed",
      C: "not_applicable",
      D: "not_applicable",
      E: "not_reviewed",
      F: "not_reviewed",
      G: "not_applicable",
      H1: "not_applicable",
      H2: "not_applicable",
      I: "expected_blank",
      J: "not_applicable",
      K: deriveSectionKStatus([]),
    },
    notes: [],
    amendments: [],
    issues: [],
    needPairings: [],
    outcomes: [],
    placement: {
      preferredSchool: "",
      preferredType: "",
      reasons: "",
      travelNotes: "",
      meetingRequested: false,
    },
    support: [],
    assistant: [],
    activity: [],
  };
}

/** Normalize snapshots that pre-date rightsHolder / derived Section K. */
export function normalizeFamilyCase(raw: FamilyCase): FamilyCase {
  const documents = raw.documents ?? [];
  return {
    ...raw,
    rightsHolder: raw.rightsHolder === "young_person" ? "young_person" : "parent",
    sectionStatus: {
      ...raw.sectionStatus,
      K: deriveSectionKStatus(documents),
    },
  };
}

// ---------- Reducer ----------
type Action =
  | { type: "reset"; mode?: "demo" | "empty" }
  | { type: "setSectionStatus"; section: PlanSection; status: ReviewStatus }
  | { type: "addNote"; section: PlanSection; text: string }
  | { type: "addAmendment"; a: Omit<Amendment, "id"> }
  | { type: "updateAmendment"; id: string; patch: Partial<Amendment> }
  | { type: "removeAmendment"; id: string }
  | { type: "updateIssue"; id: string; patch: Partial<Issue> }
  | { type: "addIssue"; issue: Omit<Issue, "id"> }
  | { type: "updateNeedPairing"; id: string; patch: Partial<NeedPairing> }
  | { type: "setPlacement"; patch: Partial<PlacementPref> }
  | { type: "setRightsHolder"; rightsHolder: RightsHolder }
  | { type: "addSupport"; m: Omit<SupportMember, "id"> }
  | { type: "updateSupport"; id: string; patch: Partial<SupportMember> }
  | { type: "addAssistant"; m: Omit<AssistantMsg, "id"> }
  | { type: "clearAssistant" }
  | { type: "addDocument"; d: Omit<FamilyDoc, "id"> }
  | { type: "removeDocument"; id: string }
  | { type: "renameDocument"; id: string; title: string }
  | { type: "logActivity"; a: Omit<FamActivity, "id" | "timestamp"> };

let _seq = 0;
const nid = (p: string) => `${p}-${Date.now().toString(36)}-${(_seq += 1)}`;

function withDerivedK(state: FamilyCase): FamilyCase {
  return {
    ...state,
    sectionStatus: { ...state.sectionStatus, K: deriveSectionKStatus(state.documents) },
  };
}

function reducer(state: FamilyCase, action: Action): FamilyCase {
  switch (action.type) {
    case "reset":
      return action.mode === "empty" ? emptyFamilyCase() : makeSeed();
    case "setSectionStatus":
      return { ...state, sectionStatus: { ...state.sectionStatus, [action.section]: action.status } };
    case "addNote":
      return {
        ...state,
        notes: [...state.notes, { id: nid("note"), section: action.section, text: action.text, timestamp: new Date().toISOString() }],
      };
    case "addAmendment":
      return { ...state, amendments: [...state.amendments, { ...action.a, id: nid("am") }] };
    case "updateAmendment":
      return { ...state, amendments: state.amendments.map((a) => (a.id === action.id ? { ...a, ...action.patch } : a)) };
    case "removeAmendment":
      return { ...state, amendments: state.amendments.filter((a) => a.id !== action.id) };
    case "updateIssue":
      return { ...state, issues: state.issues.map((i) => (i.id === action.id ? { ...i, ...action.patch } : i)) };
    case "addIssue":
      return { ...state, issues: [...state.issues, { ...action.issue, id: nid("iss") }] };
    case "updateNeedPairing":
      return {
        ...state,
        needPairings: state.needPairings.map((p) => (p.id === action.id ? { ...p, ...action.patch } : p)),
      };
    case "setPlacement":
      return { ...state, placement: { ...state.placement, ...action.patch } };
    case "setRightsHolder":
      return { ...state, rightsHolder: action.rightsHolder };
    case "addSupport":
      return { ...state, support: [...state.support, { ...action.m, id: nid("sup"), addedByFamily: true }] };
    case "updateSupport":
      return { ...state, support: state.support.map((s) => (s.id === action.id ? { ...s, ...action.patch } : s)) };
    case "addAssistant":
      return { ...state, assistant: [...state.assistant, { ...action.m, id: nid("msg") }] };
    case "clearAssistant":
      return { ...state, assistant: [] };
    case "addDocument":
      return withDerivedK({ ...state, documents: [...state.documents, { ...action.d, id: nid("doc") }] });
    case "removeDocument":
      return withDerivedK({ ...state, documents: state.documents.filter((d) => d.id !== action.id) });
    case "renameDocument":
      return { ...state, documents: state.documents.map((d) => (d.id === action.id ? { ...d, title: action.title } : d)) };
    case "logActivity":
      return {
        ...state,
        activity: [...state.activity, { ...action.a, id: nid("act"), timestamp: new Date().toISOString() }],
      };
  }
}

type Ctx = {
  state: FamilyCase;
  dispatch: Dispatch<Action>;
  reset: (mode?: "demo" | "empty") => void;
};
const CaseCtx = createContext<Ctx | null>(null);

export function FamilyCaseProvider({ children }: { children: ReactNode }) {
  const initialState = useMemo(() => emptyFamilyCase(), []);
  const [state, setState] = usePersistentSnapshot<FamilyCase>("familyCase", initialState);

  const dispatch = useCallback<Dispatch<Action>>(
    (action) =>
      setState((current) => {
        const base = normalizeFamilyCase(current);
        return normalizeFamilyCase(reducer(base, action));
      }),
    [setState],
  );
  const reset = useCallback(
    (mode: "demo" | "empty" = "demo") => dispatch({ type: "reset", mode }),
    [dispatch],
  );
  const value = useMemo(() => ({ state: normalizeFamilyCase(state), dispatch, reset }), [state, dispatch, reset]);
  return <CaseCtx.Provider value={value}>{children}</CaseCtx.Provider>;
}

export function useFamilyCase(): Ctx {
  const c = useContext(CaseCtx);
  if (!c) throw new Error("useFamilyCase must be inside FamilyCaseProvider");
  return c;
}

// Helpers exported for screens
export function issueSectionCount(state: FamilyCase, section: PlanSection): number {
  return state.issues.filter((i) => i.section === section && i.status !== "dismissed").length;
}
export function readinessChecks(state: FamilyCase): { label: string; passed: boolean; blocking: boolean }[] {
  const included = state.issues.filter((i) => i.status === "ready");
  return [
    {
      label: "At least one amendment is marked Ready to include.",
      passed: included.length > 0,
      blocking: true,
    },
    {
      label: "Every highlighted issue has been reviewed or dismissed.",
      passed: state.issues.every((i) => i.status !== "not_started"),
      blocking: true,
    },
    { label: "Every included amendment contains wording.", passed: included.every((i) => i.proposedAmendment.trim().length > 0), blocking: true },
    { label: "Child and family views have been considered.", passed: state.sectionStatus.A !== "not_reviewed", blocking: false },
    { label: "School or setting preference has been considered.", passed: state.placement.preferredSchool.trim().length > 0 || state.placement.preferredType.trim().length > 0, blocking: false },
    { label: "Meeting preference has been recorded.", passed: state.placement.meetingRequested || state.placement.reasons.trim().length > 0, blocking: false },
    { label: "No included item is still marked Drafted.", passed: state.issues.filter((i) => i.status === "drafted").length === 0 || included.length > 0, blocking: false },
    { label: "No unresolved template tokens remain.", passed: included.every((i) => !/\{\{.*?\}\}/.test(i.proposedAmendment)), blocking: true },
  ];
}
export function readinessScore(state: FamilyCase): number {
  const checks = readinessChecks(state);
  const passed = checks.filter((c) => c.passed).length;
  return Math.round((passed / checks.length) * 100);
}
