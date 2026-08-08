import type { FamilyCase, Issue, PlanSection } from "./family-case-store";
import { FAMILY_STATUTORY } from "./family-config";

export type ResponseAmendment = {
  id: string;
  section: PlanSection;
  title: string;
  currentDraft?: string;
  proposedAmendment: string;
  why: string;
};

export type FamilyResponseModel = {
  childName: string;
  age: number;
  yearGroup: string;
  localAuthority: string;
  caseOfficer: string;
  draftReceivedIso: string;
  deadlineIso: string;
  intro: string;
  amendmentsBySection: { section: PlanSection; items: ResponseAmendment[] }[];
  childViews: string[];
  childViewsPlaceholder: string;
  placement: {
    preferredSchool: string;
    preferredType: string;
    reasons: string;
    travelNotes: string;
    recorded: boolean;
  };
  meetingRequested: boolean;
  meetingLine: string;
  documents: { title: string; professional: string; date: string; pages: number }[];
  disclaimer: string;
};

function includedReady(state: FamilyCase): Issue[] {
  return state.issues.filter((i) => i.status === "ready");
}

/** Single canonical model for on-screen preview and .docx export. */
export function buildFamilyResponseModel(state: FamilyCase): FamilyResponseModel {
  const ready = includedReady(state);
  const bySection = new Map<PlanSection, ResponseAmendment[]>();
  for (const i of ready) {
    const list = bySection.get(i.section) ?? [];
    list.push({
      id: i.id,
      section: i.section,
      title: i.title,
      currentDraft: i.currentDraft,
      proposedAmendment: i.proposedAmendment,
      why: i.why,
    });
    bySection.set(i.section, list);
  }
  const amendmentsBySection = [...bySection.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([section, items]) => ({ section, items }));

  const aNotes = state.notes.filter((n) => n.section === "A").map((n) => n.text);
  const p = state.placement;
  const recorded = Boolean(p.preferredSchool.trim() || p.preferredType.trim());

  return {
    childName: state.childName,
    age: state.age,
    yearGroup: state.yearGroup,
    localAuthority: state.localAuthority,
    caseOfficer: state.caseOfficer,
    draftReceivedIso: state.draftReceivedIso,
    deadlineIso: state.deadlineIso,
    intro: `Thank you for the draft EHC plan for ${state.childName}. We have reviewed the draft together with the supporting advice and set out below the amendments we would like the local authority to consider.`,
    amendmentsBySection,
    childViews: aNotes,
    childViewsPlaceholder: "Family views to be added — see Section A of the working draft.",
    placement: {
      preferredSchool: p.preferredSchool,
      preferredType: p.preferredType,
      reasons: p.reasons,
      travelNotes: p.travelNotes,
      recorded,
    },
    meetingRequested: p.meetingRequested,
    meetingLine: p.meetingRequested
      ? "The family requests a meeting with the local authority to discuss this response."
      : "No meeting requested at this stage.",
    documents: state.documents.map((d) => ({
      title: d.title,
      professional: d.professional,
      date: d.date,
      pages: d.pages,
    })),
    disclaimer: FAMILY_STATUTORY.disclaimer,
  };
}
