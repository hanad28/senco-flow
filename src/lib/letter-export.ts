// Client-only .docx generation for the response letter. Uses the `docx`
// npm package, which produces a real Word document (openable in Word,
// Google Docs, Pages, LibreOffice). Kept in a lib file so both the Draft
// preview and the Submitted confirmation can call it.

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  HeadingLevel,
} from "docx";
import type { Consultation, NeedCapability } from "./consultations-store";
import { formatDate } from "./consultations-store";

const capabilityLabel: Record<NeedCapability, string> = {
  full: "Can meet in full",
  partial: "Can meet in part",
  cannot: "Cannot meet",
};

type SchoolBits = {
  schoolName: string;
  schoolAddress: string;
  sendcoName: string;
  sendcoRole: string;
};

function greetingName(caseOfficer: string): string {
  // e.g. "R. Owusu" → "Owusu"; "Dr. Jane Smith" → "Smith"
  const parts = caseOfficer.trim().split(/\s+/);
  return parts[parts.length - 1] ?? caseOfficer;
}

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

export function buildResponseLetterDoc(c: Consultation, school: SchoolBits): Document {
  const today = formatDate(new Date().toISOString());
  const addrLines = school.schoolAddress.split(/,\s*/);

  const children: Paragraph[] = [];

  // School letterhead (right-aligned)
  children.push(line(school.schoolName, { bold: true, align: AlignmentType.RIGHT }));
  for (const l of addrLines) children.push(line(l, { align: AlignmentType.RIGHT }));
  children.push(line(today, { align: AlignmentType.RIGHT }));
  children.push(blank());

  // Recipient
  children.push(line(c.caseOfficer, { bold: true }));
  children.push(line(c.localAuthority));
  children.push(blank());

  // Subject
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [
        new TextRun({
          text: `Re: EHC needs assessment consultation — ${c.pupilRef} (${c.yearGroup})`,
          bold: true,
        }),
      ],
      spacing: { after: 200 },
    }),
  );

  children.push(line(`Dear ${greetingName(c.caseOfficer)},`));
  children.push(
    new Paragraph({
      children: [
        new TextRun(
          `Thank you for consulting ${school.schoolName} regarding the above pupil. We have reviewed the assessment documentation and set out below our response to each of the needs identified in Section B, together with the Section F provision we are able to make. This response is offered to inform the local authority's Section I placement decision.`,
        ),
      ],
      spacing: { after: 200 },
    }),
  );

  c.needs.forEach((n, i) => {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: `${i + 1}. ${n.title}`, bold: true })],
        spacing: { before: 160, after: 60 },
      }),
    );
    children.push(
      new Paragraph({
        children: [new TextRun({ text: capabilityLabel[n.capability], italics: true })],
        spacing: { after: 80 },
      }),
    );
    if (n.draftResponse.trim().length > 0) {
      children.push(new Paragraph({ children: [new TextRun(n.draftResponse)], spacing: { after: 80 } }));
    }
    if (n.capability === "cannot" && n.cannotRationale && n.cannotRationale.trim().length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: "Rationale: ", bold: true }),
            new TextRun(n.cannotRationale),
          ],
          spacing: { after: 80 },
        }),
      );
    }
    if (n.evidence.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: "Evidence: ", bold: true }),
            new TextRun(n.evidence.join(", ")),
          ],
          spacing: { after: 80 },
        }),
      );
    }
  });

  children.push(blank());
  children.push(
    new Paragraph({
      children: [
        new TextRun(
          "We remain committed to working with the local authority and the family to ensure the pupil's needs are met. Please do not hesitate to contact us should you require any further information.",
        ),
      ],
      spacing: { after: 200 },
    }),
  );
  children.push(line("Yours sincerely,"));
  children.push(blank());
  children.push(line(school.sendcoName, { bold: true }));
  children.push(line(`${school.sendcoRole}, ${school.schoolName}`));

  return new Document({
    creator: school.sendcoName,
    title: `EHCP response — ${c.pupilRef}`,
    styles: {
      default: {
        document: { run: { font: "Calibri", size: 22 } }, // 11pt
      },
    },
    sections: [{ children }],
  });
}

export async function downloadResponseLetter(c: Consultation, school: SchoolBits): Promise<void> {
  const doc = buildResponseLetterDoc(c, school);
  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `EHCP-response-${c.id.toUpperCase()}-${c.pupilRef.replace(/\s+/g, "-")}.docx`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
