// Family response Word export. Uses the same `docx` package as the school
// letter export. English formal response + optional bilingual family copy.
// Body content comes from buildFamilyResponseModel so the screen and .docx stay aligned.

import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } from "docx";
import type { FamilyCase } from "./family-case-store";
import { FAMILY_STATUTORY } from "./family-config";
import type { LangMeta } from "./family-i18n";
import { buildFamilyResponseModel } from "./family-response-model";
import { triggerBlobDownload } from "./trigger-blob-download";

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

function buildEnglishBody(state: FamilyCase): Paragraph[] {
  const m = buildFamilyResponseModel(state);
  const children: Paragraph[] = [];
  children.push(line("Family response to draft EHC plan", { bold: true, align: AlignmentType.CENTER }));
  children.push(blank());

  children.push(line(`For: ${m.childName} (age ${m.age}, ${m.yearGroup})`));
  children.push(line(`Local authority: ${m.localAuthority}`));
  children.push(line(`Case officer: ${m.caseOfficer}`));
  children.push(line(`Draft received: ${m.draftReceivedIso}`));
  children.push(line(`Response deadline: ${m.deadlineIso} (${FAMILY_STATUTORY.draftResponsePeriodLabel})`));
  children.push(blank());

  children.push(heading("Introductory statement"));
  children.push(
    new Paragraph({
      children: [new TextRun(m.intro)],
      spacing: { after: 200 },
    }),
  );

  if (m.amendmentsBySection.length > 0) {
    children.push(heading("Requested amendments"));
    for (const group of m.amendmentsBySection) {
      children.push(line(`Section ${group.section}`, { bold: true }));
      group.items.forEach((i, idx) => {
        children.push(new Paragraph({ children: [new TextRun({ text: `${idx + 1}. ${i.title}`, bold: true })], spacing: { after: 60 } }));
        if (i.currentDraft) {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: "Current wording: ", bold: true }), new TextRun(i.currentDraft)],
              spacing: { after: 60 },
            }),
          );
        }
        children.push(
          new Paragraph({
            children: [new TextRun({ text: "Proposed amendment: ", bold: true }), new TextRun(i.proposedAmendment)],
            spacing: { after: 60 },
          }),
        );
        children.push(
          new Paragraph({
            children: [new TextRun({ text: "Reason: ", bold: true }), new TextRun(i.why)],
            spacing: { after: 120 },
          }),
        );
      });
      children.push(blank());
    }
  }

  children.push(heading("Child's views and aspirations"));
  if (m.childViews.length === 0) {
    children.push(line(m.childViewsPlaceholder));
  } else {
    for (const text of m.childViews) {
      children.push(new Paragraph({ children: [new TextRun(text)], spacing: { after: 120 } }));
    }
  }

  children.push(heading("School or setting preference"));
  if (m.placement.recorded) {
    if (m.placement.preferredSchool) children.push(line(`Preferred school: ${m.placement.preferredSchool}`));
    if (m.placement.preferredType) children.push(line(`Preferred type of setting: ${m.placement.preferredType}`));
    if (m.placement.reasons) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: "Reasons: ", bold: true }), new TextRun(m.placement.reasons)],
          spacing: { after: 120 },
        }),
      );
    }
    if (m.placement.travelNotes) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: "Travel/accessibility: ", bold: true }), new TextRun(m.placement.travelNotes)],
          spacing: { after: 120 },
        }),
      );
    }
  } else {
    children.push(line("Not yet recorded."));
  }

  children.push(heading("Meeting request"));
  children.push(line(m.meetingLine));

  children.push(heading("Supporting documents referenced"));
  for (const d of m.documents) {
    children.push(line(`• ${d.title} — ${d.professional} (${d.date}, ${d.pages}pp)`));
  }

  children.push(blank());
  children.push(
    new Paragraph({
      children: [new TextRun({ text: m.disclaimer, italics: true })],
      spacing: { before: 200 },
    }),
  );

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
  triggerBlobDownload(blob, `Family-response-${state.childName.replace(/\s+/g, "-")}.docx`);
}

export async function downloadFamilyResponseBilingual(
  state: FamilyCase,
  t: (key: string, fallback?: string) => string,
  lang: LangMeta,
): Promise<void> {
  const english = buildEnglishBody(state);
  const m = buildFamilyResponseModel(state);
  const familyLangParas: Paragraph[] = [
    blank(),
    line("—", { align: AlignmentType.CENTER }),
    blank(),
    line(`${lang.nativeName} working copy (family language)`, { bold: true, align: AlignmentType.CENTER }),
    line(FAMILY_STATUTORY.translationDisclosure),
    blank(),
    line(t("response.title"), { bold: true }),
    line(`${t("nav.plan")}: ${m.childName}`),
    blank(),
  ];
  for (const group of m.amendmentsBySection) {
    familyLangParas.push(line(`Section ${group.section}`, { bold: true }));
    for (const i of group.items) {
      familyLangParas.push(line(i.title));
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
  triggerBlobDownload(blob, `Family-response-${state.childName.replace(/\s+/g, "-")}-${lang.code}.docx`);
}
