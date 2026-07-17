// Family response Word export. Uses the same `docx` package as the school
// letter export. English formal response + optional bilingual family copy.

import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } from "docx";
import type { FamilyCase, Issue } from "./family-case-store";
import { FAMILY_STATUTORY } from "./family-config";
import type { LangMeta } from "./family-i18n";

function line(text: string, opts?: { bold?: boolean; align?: (typeof AlignmentType)[keyof typeof AlignmentType] }): Paragraph {
  return new Paragraph({
    alignment: opts?.align,
    children: [new TextRun({ text, bold: opts?.bold })],
    spacing: { after: 120 },
  });
}
function blank(): Paragraph {
  return new Paragraph({ children: [new TextRun("")], spacing: { after: 120 } });
}
function heading(text: string): Paragraph {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text, bold: true })], spacing: { before: 200, after: 100 } });
}

function includedBySection(state: FamilyCase): Record<string, Issue[]> {
  const grouped: Record<string, Issue[]> = {};
  for (const i of state.issues.filter((x) => x.status === "ready")) {
    (grouped[i.section] ||= []).push(i);
  }
  return grouped;
}

function buildEnglishBody(state: FamilyCase): Paragraph[] {
  const children: Paragraph[] = [];
  children.push(line("Family response to draft EHC plan", { bold: true, align: AlignmentType.CENTER }));
  children.push(blank());

  children.push(line(`For: ${state.childName} (age ${state.age}, ${state.yearGroup})`));
  children.push(line(`Local authority: ${state.localAuthority}`));
  children.push(line(`Case officer: ${state.caseOfficer}`));
  children.push(line(`Draft received: ${state.draftReceivedIso}`));
  children.push(line(`Response deadline: ${state.deadlineIso} (${FAMILY_STATUTORY.draftResponsePeriodLabel})`));
  children.push(blank());

  children.push(heading("Introductory statement"));
  children.push(
    new Paragraph({
      children: [
        new TextRun(
          `Thank you for the draft EHC plan for ${state.childName}. We have reviewed the draft together with the supporting advice and set out below the amendments we would like the local authority to consider.`,
        ),
      ],
      spacing: { after: 200 },
    }),
  );

  const grouped = includedBySection(state);
  const sections = Object.keys(grouped).sort();
  if (sections.length > 0) {
    children.push(heading("Requested amendments"));
    for (const sec of sections) {
      children.push(line(`Section ${sec}`, { bold: true }));
      grouped[sec].forEach((i, idx) => {
        children.push(new Paragraph({ children: [new TextRun({ text: `${idx + 1}. ${i.title}`, bold: true })], spacing: { after: 60 } }));
        if (i.currentDraft) children.push(new Paragraph({ children: [new TextRun({ text: "Current wording: ", bold: true }), new TextRun(i.currentDraft)], spacing: { after: 60 } }));
        children.push(new Paragraph({ children: [new TextRun({ text: "Proposed amendment: ", bold: true }), new TextRun(i.proposedAmendment)], spacing: { after: 60 } }));
        children.push(new Paragraph({ children: [new TextRun({ text: "Reason: ", bold: true }), new TextRun(i.why)], spacing: { after: 120 } }));
      });
      children.push(blank());
    }
  }

  children.push(heading("Child's views and aspirations"));
  const aNotes = state.notes.filter((n) => n.section === "A");
  if (aNotes.length === 0) {
    children.push(line("Family views to be added — see Section A of the working draft."));
  } else {
    for (const n of aNotes) children.push(new Paragraph({ children: [new TextRun(n.text)], spacing: { after: 120 } }));
  }

  children.push(heading("School or setting preference"));
  const p = state.placement;
  if (p.preferredSchool || p.preferredType) {
    if (p.preferredSchool) children.push(line(`Preferred school: ${p.preferredSchool}`));
    if (p.preferredType) children.push(line(`Preferred type of setting: ${p.preferredType}`));
    if (p.reasons) children.push(new Paragraph({ children: [new TextRun({ text: "Reasons: ", bold: true }), new TextRun(p.reasons)], spacing: { after: 120 } }));
    if (p.travelNotes) children.push(new Paragraph({ children: [new TextRun({ text: "Travel/accessibility: ", bold: true }), new TextRun(p.travelNotes)], spacing: { after: 120 } }));
  } else {
    children.push(line("Not yet recorded."));
  }

  children.push(heading("Meeting request"));
  children.push(line(p.meetingRequested ? "The family requests a meeting with the local authority to discuss this response." : "No meeting requested at this stage."));

  children.push(heading("Supporting documents referenced"));
  for (const d of state.documents) children.push(line(`• ${d.title} — ${d.professional} (${d.date}, ${d.pages}pp)`));

  children.push(blank());
  children.push(new Paragraph({
    children: [new TextRun({ text: FAMILY_STATUTORY.disclaimer, italics: true })],
    spacing: { before: 200 },
  }));

  return children;
}

export async function downloadFamilyResponseEnglish(state: FamilyCase): Promise<void> {
  const doc = new Document({
    creator: state.parent,
    title: `Family response — ${state.childName}`,
    styles: { default: { document: { run: { font: "Calibri", size: 22 } } } },
    sections: [{ children: buildEnglishBody(state) }],
  });
  const blob = await Packer.toBlob(doc);
  triggerDownload(blob, `Family-response-${state.childName.replace(/\s+/g, "-")}.docx`);
}

export async function downloadFamilyResponseBilingual(state: FamilyCase, translate: (s: string) => string, lang: LangMeta): Promise<void> {
  const english = buildEnglishBody(state);
  // Family-language section: translated headings + a translated summary line.
  // Detailed clause-by-clause translation would require sentence-level i18n
  // beyond this prototype's scope; we mark the translated block honestly.
  const familyLangParas: Paragraph[] = [];
  familyLangParas.push(new Paragraph({ children: [new TextRun("")], pageBreakBefore: true }));
  familyLangParas.push(line(translate("response.title") + ` — ${lang.nativeName}`, { bold: true, align: AlignmentType.CENTER }));
  familyLangParas.push(new Paragraph({
    children: [new TextRun({ text: FAMILY_STATUTORY.translationDisclosure, italics: true })],
    spacing: { after: 200 },
  }));
  familyLangParas.push(line(`${translate("common.deadline")}: ${state.deadlineIso}`));
  familyLangParas.push(line(`${state.childName} — ${state.yearGroup} — ${state.localAuthority}`));
  familyLangParas.push(blank());

  // Repeat included amendments with translated headings but English body text
  // (an honest bilingual copy: translated frame, source-of-truth English wording).
  const grouped = includedBySection(state);
  for (const sec of Object.keys(grouped).sort()) {
    familyLangParas.push(line(`Section ${sec}`, { bold: true }));
    for (const i of grouped[sec]) {
      familyLangParas.push(line(`• ${i.title}`, { bold: true }));
      familyLangParas.push(line(i.proposedAmendment));
    }
    familyLangParas.push(blank());
  }

  const doc = new Document({
    creator: state.parent,
    title: `Family response bilingual — ${state.childName}`,
    styles: { default: { document: { run: { font: "Calibri", size: 22 } } } },
    sections: [{ children: [...english, ...familyLangParas] }],
  });
  const blob = await Packer.toBlob(doc);
  triggerDownload(blob, `Family-response-${state.childName.replace(/\s+/g, "-")}-${lang.code}.docx`);
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
