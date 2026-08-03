import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/site";
import type { ReactNode } from "react";
import EnquiryDialog from "./components/enquiry-dialog";
import { DashboardMock, FamilyMock } from "./components/dashboard-mocks";
import FooterSection2 from "./sections/footer-section2";

function GlassCard({
  className = "cursor-card",
  children,
  href,
}: {
  className?: string;
  children: ReactNode;
  href?: string;
}) {
  if (href) {
    const external = /^https?:\/\//i.test(href);
    return (
      <a
        href={href}
        className={className}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }
  return <div className={className}>{children}</div>;
}

const PROBLEMS = [
  {
    tag: "Evidence",
    title: "The evidence is scattered",
    body: "Reports, forms, emails and parent views are re-chased by hand, making it difficult to see what has already been received.",
    impact: "Gaps re-emerge late",
    graphic: "scattered" as const,
  },
  {
    tag: "Wording",
    title: "Vague wording slips through",
    body: "Phrases such as “access to support as needed” can leave provision without clear frequency, duration or responsibility.",
    impact: "Provision is unenforceable",
    graphic: "wording" as const,
  },
  {
    tag: "Deadlines",
    title: "The clocks are hard to see",
    body: "Schools and families work to different statutory stages without one clear view of what is due and what happens next.",
    impact: "Statutory dates are missed",
    graphic: "deadlines" as const,
  },
];

const PILLARS = [
  {
    title: "Visibility",
    body: "Each workspace makes the relevant statutory dates, responsibilities and next steps visible in one place.",
    href: "#product",
    cta: "Learn about visibility",
    mock: "clock" as const,
  },
  {
    title: "Execution assistance",
    body: "Unisen helps users review the evidence, identify gaps and prepare clearer work, rather than only showing a deadline.",
    href: "#product",
    cta: "Learn about execution assistance",
    mock: "evidence" as const,
  },
  {
    title: "Communication",
    body: "Evidence and responses move on-platform instead of through email, post, and phone, so every party works from the same record.",
    href: "#product",
    cta: "Learn about communication",
    mock: "draft" as const,
  },
];

/** Product-page-style capability trios (Cursor never dumps 12 equal cards on /). */
const SCHOOL_CAPABILITIES = [
  {
    title: "Grounded in the legal standard",
    body: "Every flag traces to IPSEA and the actual legislation, never a guess.",
    graphic: "legal" as const,
  },
  {
    title: "Consultation to sent response, in one flow",
    body: "From the consultation letter to the submitted response without switching tools.",
    graphic: "flow" as const,
  },
  {
    title: "Never lose track of a deadline",
    body: "Across the whole caseload, calendar days not working days.",
    graphic: "deadlines" as const,
  },
];

const FAMILY_CAPABILITIES = [
  {
    title: "See what is missing, vague, or inconsistent",
    body: "Before you respond, not after — flagged against IPSEA specificity.",
    graphic: "gaps" as const,
  },
  {
    title: "Ask about the plan in your own language",
    body: "Every answer backed by a citation back to the actual document.",
    graphic: "language" as const,
  },
  {
    title: "A response ready to send",
    body: "In English and your own language, side by side.",
    graphic: "response" as const,
  },
];

const ROADMAP_CURRENT = [
  {
    title: "Schools",
    body: "SENCOs answer LA EHC consultations within the 15-day window, with evidence, needs review, and response drafting in one place.",
    graphic: "schools" as const,
  },
  {
    title: "Families",
    body: "Parent carers review draft EHC plans section by section, flag vague provision, and prepare a structured response.",
    graphic: "families" as const,
  },
];

const ROADMAP_FUTURE = [
  {
    title: "Specialists",
    body: "EP, SaLT, OT, and other professionals share quantified advice on-platform, tied to the case clock.",
    graphic: "specialists" as const,
  },
  {
    title: "Local authorities",
    body: "LA teams issue consultations, track school responses against statutory clocks, and reduce chasing for missing evidence.",
    graphic: "authorities" as const,
  },
];

const LEGAL_SOURCES = [
  {
    title: "Children and Families Act 2014",
    body: "The statutory framework for EHC assessments, plans and duties.",
    mark: "CFA",
    href: "https://www.legislation.gov.uk/ukpga/2014/6/contents",
  },
  {
    title: "SEND Regulations 2014",
    body: "The timelines and process rules schools and LAs must follow.",
    mark: "Reg",
    href: "https://www.legislation.gov.uk/uksi/2014/1530/contents",
  },
  {
    title: "SEND Code of Practice 2015",
    body: "How needs, provision and outcomes should be written in practice.",
    mark: "CoP",
    href: "https://www.gov.uk/government/publications/send-code-of-practice-0-to-25",
  },
  {
    title: "IPSEA guidance",
    body: "The specificity standard Unisen uses to flag vague provision.",
    mark: "IPSEA",
    href: "https://www.ipsea.org.uk/faqs/ehc-plans-need-to-be-specific-and-clear",
  },
];

const TRUST_DISCIPLINES = [
  {
    title: "Grounded claims only",
    body: "Every legal claim traces to the legislation and guidance below — never a free guess.",
  },
  {
    title: "Cited suggestions",
    body: "Any AI note points back to the source document. It flags what is wrong; it does not invent the fix.",
  },
  {
    title: "Human review required",
    body: "The same discipline applies on both sides of the platform before anything is shared or submitted.",
  },
];

/** Visual mockups for the Problem section — each shows the failure mode. */
function ProblemGraphic({ kind }: { kind: "scattered" | "wording" | "deadlines" }) {
  if (kind === "scattered") {
    // Distinct channels that never meet — inbox, form, report — not one pile of paper.
    return (
      <div className="flex h-32 flex-col overflow-hidden rounded-[4px] bg-[#f7fafc]">
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-1.5 p-2.5 pb-1.5">
          <div className="flex min-w-0 flex-col rounded-[4px] border border-[#cfe2ec] bg-white p-2">
            <div className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-[#607586]">
              <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#3b8ac1]" />
              Inbox
            </div>
            <div className="mt-1.5 space-y-1">
              <div className="h-1 w-full rounded-full bg-[#cfe2ec]" />
              <div className="h-1 w-4/5 rounded-full bg-[#e6f0f5]" />
              <div className="h-1 w-3/5 rounded-full bg-[#e6f0f5]" />
            </div>
            <p className="mt-auto pt-1.5 text-[9px] leading-tight text-[#8aa]">Parent email</p>
          </div>
          <div className="flex min-w-0 flex-col rounded-[4px] border border-[#cfe2ec] bg-white p-2">
            <div className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-[#607586]">
              <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#179dab]" />
              Form
            </div>
            <div className="mt-1.5 space-y-1">
              <div className="h-2.5 rounded-[2px] border border-dashed border-[#cfe2ec] bg-[#f7fafc]" />
              <div className="h-2.5 rounded-[2px] border border-dashed border-[#cfe2ec] bg-[#f7fafc]" />
            </div>
            <p className="mt-auto pt-1.5 text-[9px] leading-tight text-[#8aa]">LA portal</p>
          </div>
          <div className="flex min-w-0 flex-col rounded-[4px] border border-[#cfe2ec] bg-white p-2">
            <div className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-[#607586]">
              <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#d99a18]" />
              Report
            </div>
            <div className="mt-1.5 space-y-1">
              <div className="h-1 w-full rounded-full bg-[#cfe2ec]" />
              <div className="h-1 w-5/6 rounded-full bg-[#e6f0f5]" />
              <div className="h-1 w-2/3 rounded-full bg-[#e6f0f5]" />
            </div>
            <p className="mt-auto pt-1.5 text-[9px] leading-tight text-[#8aa]">EP advice</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1.5 border-t border-dashed border-[#f0d0d0] bg-[#fde8e8]/80 px-2 py-1.5 text-[9px] font-medium text-[#c44]">
          <span aria-hidden>⚠</span>
          No shared record — re-chased by hand
        </div>
      </div>
    );
  }

  if (kind === "wording") {
    return (
      <div className="h-32 overflow-hidden rounded-[4px] bg-[#f7fafc] p-4">
        <div className="mx-auto max-w-[14rem] rounded-[4px] border border-[#cfe2ec] bg-white p-3">
          <div className="mb-2 text-[10px] font-medium uppercase tracking-wide text-[#8aa]">
            Section B: Provision
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-[#e6f0f5]" />
            <div className="h-1.5 w-4/5 rounded-full bg-[#e6f0f5]" />
            <div className="inline-block rounded bg-[#fff3cd] px-1 py-0.5 text-[10px] text-[#8a6d00]">
              &ldquo;access to support as needed&rdquo;
            </div>
            <div className="h-1.5 w-3/4 rounded-full bg-[#e6f0f5]" />
            <div className="h-1.5 w-2/3 rounded-full bg-[#e6f0f5]" />
          </div>
          <div className="mt-3 flex items-center gap-1 border-t border-[#f0d0d0] pt-2 text-[10px] text-[#c44]">
            <span className="text-[#c44]">⚠</span> No frequency · No duration · No owner
          </div>
        </div>
      </div>
    );
  }

  // Shared statutory timeline — two lanes on one dated axis, clocks out of sync.
  return (
    <div className="flex h-36 flex-col overflow-hidden rounded-[4px] bg-[#f7fafc]">
      <div className="flex min-h-0 flex-1 flex-col px-2.5 pt-2 pb-1">
        {/* Day scale on its own band — kept clear of lane markers */}
        <div className="mb-3.5 flex items-center gap-1.5 border-b border-[#e6f0f5] pb-1.5">
          <span className="w-10 shrink-0" aria-hidden />
          <div className="flex flex-1 justify-between text-[8px] font-medium uppercase leading-none tracking-wide text-[#8aa]">
            <span>Day 0</span>
            <span>Day 7</span>
            <span>Day 15</span>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3">
          {/* School lane — rail through marker centres; labels hang below */}
          <div className="flex items-start gap-1.5">
            <span className="mt-0.5 w-10 shrink-0 text-[9px] font-semibold leading-none text-[#607586]">
              School
            </span>
            <div className="relative h-6 flex-1">
              <div className="absolute inset-x-0 top-[5px] h-px bg-[#cfe2ec]" />
              <div
                className="absolute top-0 flex w-max -translate-x-1/2 flex-col items-center"
                style={{ left: "18%" }}
              >
                <span className="relative z-[1] h-2.5 w-2.5 rounded-full bg-[#3b8ac1] ring-2 ring-[#f7fafc]" />
                <span className="mt-1 text-[7px] font-medium leading-none text-[#3b8ac1]">
                  Received
                </span>
              </div>
              <div
                className="absolute top-0 flex w-max -translate-x-1/2 flex-col items-center"
                style={{ left: "90%" }}
              >
                <span className="relative z-[1] h-2.5 w-2.5 rounded-full border-2 border-[#c44] bg-white ring-2 ring-[#f7fafc]" />
                <span className="mt-1 text-[7px] font-medium leading-none text-[#c44]">Due</span>
              </div>
            </div>
          </div>

          {/* Family lane */}
          <div className="flex items-start gap-1.5">
            <span className="mt-0.5 w-10 shrink-0 text-[9px] font-semibold leading-none text-[#607586]">
              Family
            </span>
            <div className="relative h-6 flex-1">
              <div className="absolute inset-x-0 top-[5px] h-px bg-[#cfe2ec]" />
              <div
                className="absolute top-0 flex w-max -translate-x-1/2 flex-col items-center"
                style={{ left: "48%" }}
              >
                <span className="relative z-[1] h-2.5 w-2.5 rounded-full border-2 border-[#c44] bg-white ring-2 ring-[#f7fafc]" />
                <span className="mt-1 text-[7px] font-medium leading-none text-[#c44]">Review</span>
              </div>
              <div
                className="absolute top-0 flex w-max -translate-x-1/2 flex-col items-center"
                style={{ left: "78%" }}
              >
                <span className="relative z-[1] h-2.5 w-2.5 rounded-full bg-[#3b8ac1] ring-2 ring-[#f7fafc]" />
                <span className="mt-1 text-[7px] font-medium leading-none text-[#3b8ac1]">Due</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 border-t border-dashed border-[#f0d0d0] bg-[#fde8e8]/80 px-2 py-1 text-[9px] font-medium text-[#c44]">
        <span aria-hidden>⚠</span>
        No shared clock — 15-day window missed
      </div>
    </div>
  );
}

/** Mini UI fragments for capability cards — same evidence style as ProblemGraphic. */
function CapabilityGraphic({
  kind,
}: {
  kind: "legal" | "flow" | "deadlines" | "gaps" | "language" | "response";
}) {
  if (kind === "legal") {
    return (
      <div className="flex h-36 flex-col overflow-hidden rounded-[4px] bg-[#f7fafc]">
        <div className="flex min-h-0 flex-1 flex-col gap-2 p-2.5">
          <div className="rounded-[4px] border border-[#f1d48b] bg-[#fffaf0] p-2">
            <p className="text-[9px] font-semibold uppercase tracking-wide text-[#7a5a00]">
              Flag · Section F
            </p>
            <p className="mt-1 text-[10px] leading-snug text-[#725315]">
              “As needed” lacks frequency, duration and owner
            </p>
          </div>
          <div className="mt-auto space-y-1.5">
            <div className="flex items-center gap-1.5 rounded-[4px] border border-[#cfe2ec] bg-white px-2 py-1.5 text-[9px] text-[#244a70]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3b8ac1]" />
              IPSEA specificity
            </div>
            <div className="flex items-center gap-1.5 rounded-[4px] border border-[#cfe2ec] bg-white px-2 py-1.5 text-[9px] text-[#244a70]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#179dab]" />
              SEND Code of Practice
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "flow") {
    const steps = [
      { label: "Received", state: "done" },
      { label: "Review", state: "done" },
      { label: "Draft", state: "active" },
      { label: "Sent", state: "todo" },
    ];
    return (
      <div className="flex h-36 flex-col justify-center overflow-hidden rounded-[4px] bg-[#f7fafc] px-3">
        <div className="relative flex items-start justify-between gap-1">
          <div className="absolute inset-x-3 top-[7px] h-px bg-[#cfe2ec]" />
          {steps.map((step) => (
            <div key={step.label} className="relative z-[1] flex w-14 flex-col items-center">
              <span
                className={
                  step.state === "done"
                    ? "h-3.5 w-3.5 rounded-full bg-[#3b8ac1] ring-2 ring-[#f7fafc]"
                    : step.state === "active"
                      ? "h-3.5 w-3.5 rounded-full border-2 border-[#d99a18] bg-white ring-2 ring-[#f7fafc]"
                      : "h-3.5 w-3.5 rounded-full border-2 border-[#cfe2ec] bg-white ring-2 ring-[#f7fafc]"
                }
              />
              <span
                className={
                  step.state === "todo"
                    ? "mt-2 text-[9px] font-medium text-[#8aa]"
                    : step.state === "active"
                      ? "mt-2 text-[9px] font-semibold text-[#7a5a00]"
                      : "mt-2 text-[9px] font-semibold text-[#244a70]"
                }
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-[4px] border border-[#cfe2ec] bg-white px-2.5 py-2 text-[10px] text-[#536572]">
          A.R. · Camden · response draft open
        </div>
      </div>
    );
  }

  if (kind === "deadlines") {
    const rows = [
      { pupil: "A.R.", days: "2 days", tone: "urgent" },
      { pupil: "J.K.", days: "6 days", tone: "warn" },
      { pupil: "M.S.", days: "11 days", tone: "ok" },
    ];
    return (
      <div className="flex h-36 flex-col overflow-hidden rounded-[4px] bg-[#f7fafc] p-2.5">
        <div className="mb-2 flex items-center justify-between text-[9px] font-semibold uppercase tracking-wide text-[#607586]">
          <span>Caseload</span>
          <span className="text-[#c44]">2 due soon</span>
        </div>
        <div className="space-y-1.5">
          {rows.map((row) => (
            <div
              key={row.pupil}
              className="flex items-center justify-between rounded-[4px] border border-[#cfe2ec] bg-white px-2 py-1.5"
            >
              <span className="text-[10px] font-semibold text-[#244a70]">{row.pupil}</span>
              <span
                className={
                  row.tone === "urgent"
                    ? "rounded-full bg-[#fde8e8] px-2 py-0.5 text-[9px] font-bold text-[#c44]"
                    : row.tone === "warn"
                      ? "rounded-full bg-[#fff1bf] px-2 py-0.5 text-[9px] font-bold text-[#7a5a00]"
                      : "rounded-full bg-[#e8f6ef] px-2 py-0.5 text-[9px] font-bold text-[#315e49]"
                }
              >
                {row.days}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "gaps") {
    return (
      <div className="flex h-36 flex-col overflow-hidden rounded-[4px] bg-[#f7fafc] p-2.5">
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-1.5">
          {[
            { label: "B", status: "ok", note: "Clear" },
            { label: "F", status: "warn", note: "Vague" },
            { label: "I", status: "info", note: "Check" },
          ].map((section) => (
            <div
              key={section.label}
              className={
                section.status === "warn"
                  ? "flex flex-col rounded-[4px] border border-[#f1d48b] bg-[#fffaf0] p-2"
                  : "flex flex-col rounded-[4px] border border-[#cfe2ec] bg-white p-2"
              }
            >
              <span className="text-[10px] font-bold text-[#244a70]">§{section.label}</span>
              <span
                className={
                  section.status === "warn"
                    ? "mt-auto text-[9px] font-semibold text-[#7a5a00]"
                    : section.status === "ok"
                      ? "mt-auto text-[9px] font-semibold text-[#315e49]"
                      : "mt-auto text-[9px] font-semibold text-[#3b8ac1]"
                }
              >
                {section.note}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 rounded-[4px] border border-[#f1d48b] bg-[#fffaf0] px-2 py-1.5 text-[9px] leading-snug text-[#725315]">
          4 issues need attention before you respond
        </div>
      </div>
    );
  }

  if (kind === "language") {
    return (
      <div className="flex h-36 flex-col overflow-hidden rounded-[4px] bg-[#f7fafc] p-2.5">
        <div className="rounded-[4px] border border-[#cfe2ec] bg-white p-2">
          <p className="text-[9px] font-semibold uppercase tracking-wide text-[#607586]">
            Ask the plan
          </p>
          <p className="mt-1 text-[10px] leading-snug text-[#244a70]">
            هل يذكر القسم F عدد مرات الدعم؟
          </p>
        </div>
        <div className="mt-2 flex min-h-0 flex-1 flex-col rounded-[4px] border border-[#bfe0d1] bg-[#f3fbf7] p-2">
          <p className="text-[9px] font-semibold text-[#315e49]">Answer · cited</p>
          <p className="mt-1 text-[10px] leading-snug text-[#315e49]">
            No — Section F only says “as appropriate.”
          </p>
          <p className="mt-auto pt-1 text-[9px] text-[#527262]">Source: Draft plan · p. 11</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-36 overflow-hidden rounded-[4px] bg-[#f7fafc] p-2.5">
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-1.5">
        <div className="flex flex-col rounded-[4px] border border-[#cfe2ec] bg-white p-2">
          <span className="text-[9px] font-semibold uppercase tracking-wide text-[#607586]">
            English
          </span>
          <div className="mt-2 space-y-1">
            <div className="h-1.5 w-full rounded-full bg-[#e6f0f5]" />
            <div className="h-1.5 w-5/6 rounded-full bg-[#e6f0f5]" />
            <div className="h-1.5 w-2/3 rounded-full bg-[#e6f0f5]" />
          </div>
          <span className="mt-auto pt-2 text-[9px] font-medium text-[#3b8ac1]">Ready</span>
        </div>
        <div className="flex flex-col rounded-[4px] border border-[#cfe2ec] bg-white p-2">
          <span className="text-[9px] font-semibold uppercase tracking-wide text-[#607586]">
            Family language
          </span>
          <div className="mt-2 space-y-1">
            <div className="h-1.5 w-full rounded-full bg-[#e6f0f5]" />
            <div className="h-1.5 w-4/5 rounded-full bg-[#e6f0f5]" />
            <div className="h-1.5 w-3/5 rounded-full bg-[#e6f0f5]" />
          </div>
          <span className="mt-auto pt-2 text-[9px] font-medium text-[#3b8ac1]">Side by side</span>
        </div>
      </div>
    </div>
  );
}

/** Party cards for the roadmap — current is live UI, future is dashed/muted. */
function PartyGraphic({
  kind,
}: {
  kind: "schools" | "families" | "specialists" | "authorities";
}) {
  if (kind === "schools") {
    return (
      <div className="flex h-40 overflow-hidden rounded-[4px] bg-[#1c2f45] text-white">
        <div className="flex w-[4.5rem] shrink-0 flex-col gap-1 border-r border-white/10 p-2.5">
          <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-white/45">
            School
          </span>
          {["Dash", "Case", "Draft"].map((item, index) => (
            <span
              key={item}
              className={
                index === 0
                  ? "rounded bg-white/10 px-1.5 py-1 text-[9px] font-medium"
                  : "px-1.5 py-1 text-[9px] text-white/55"
              }
            >
              {item}
            </span>
          ))}
        </div>
        <div className="min-w-0 flex-1 bg-[#f7fafc] p-2.5 text-[#244a70]">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-bold">Consultations</p>
            <span className="rounded-full bg-[#fde8e8] px-1.5 py-0.5 text-[8px] font-bold text-[#c44]">
              2 due
            </span>
          </div>
          <div className="mt-2 space-y-1">
            {["A.R. · Camden · 2 days", "J.K. · Hackney · 6 days"].map((row) => (
              <div
                key={row}
                className="rounded-[3px] border border-[#cfe2ec] bg-white px-2 py-1.5 text-[9px]"
              >
                {row}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (kind === "families") {
    return (
      <div className="flex h-40 flex-col overflow-hidden rounded-[4px] bg-[#f7fafc] p-2.5 text-[#244a70]">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[9px] font-semibold text-[#607586]">Draft EHC plan</p>
            <p className="mt-0.5 text-[11px] font-bold">Section-by-section review</p>
          </div>
          <span className="rounded-full bg-[#fff1bf] px-1.5 py-0.5 text-[8px] font-bold text-[#7a5a00]">
            11 days
          </span>
        </div>
        <div className="mt-2 grid flex-1 grid-cols-3 gap-1.5">
          <div className="rounded-[3px] border border-[#cfe2ec] bg-white p-1.5">
            <p className="text-[8px] text-[#607586]">Reviewed</p>
            <p className="text-[12px] font-bold">7/11</p>
          </div>
          <div className="rounded-[3px] border border-[#f1d48b] bg-[#fffaf0] p-1.5">
            <p className="text-[8px] text-[#7a6541]">Issues</p>
            <p className="text-[12px] font-bold text-[#725315]">4</p>
          </div>
          <div className="rounded-[3px] border border-[#bfe0d1] bg-[#f3fbf7] p-1.5">
            <p className="text-[8px] text-[#527262]">Sources</p>
            <p className="text-[12px] font-bold text-[#315e49]">9</p>
          </div>
        </div>
        <div className="mt-2 rounded-[3px] border border-[#f1d48b] bg-[#fffaf0] px-2 py-1.5 text-[9px] text-[#725315]">
          Section F needs clearer provision wording
        </div>
      </div>
    );
  }

  if (kind === "specialists") {
    return (
      <div className="flex h-40 flex-col overflow-hidden rounded-[4px] border border-dashed border-[#c7d8e4] bg-[#f3f7fa]/80 p-2.5 text-[#607586]">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold">Advice on the case clock</p>
          <span className="rounded-full border border-dashed border-[#c7d8e4] px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide">
            Next
          </span>
        </div>
        <div className="mt-2 space-y-1.5 opacity-70">
          {["EP · quantified targets", "SaLT · frequency + duration", "OT · classroom support"].map(
            (row) => (
              <div
                key={row}
                className="rounded-[3px] border border-dashed border-[#d5e4ec] bg-white/70 px-2 py-1.5 text-[9px]"
              >
                {row}
              </div>
            ),
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-40 flex-col overflow-hidden rounded-[4px] border border-dashed border-[#c7d8e4] bg-[#f3f7fa]/80 p-2.5 text-[#607586]">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold">Issue & track consultations</p>
        <span className="rounded-full border border-dashed border-[#c7d8e4] px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide">
          Next
        </span>
      </div>
      <div className="mt-3 flex flex-1 items-center gap-2 opacity-70">
        <div className="flex-1 rounded-[3px] border border-dashed border-[#d5e4ec] bg-white/70 p-2 text-center">
          <p className="text-[8px] uppercase tracking-wide">Issued</p>
          <p className="mt-1 text-[14px] font-bold">12</p>
        </div>
        <div className="flex-1 rounded-[3px] border border-dashed border-[#d5e4ec] bg-white/70 p-2 text-center">
          <p className="text-[8px] uppercase tracking-wide">Awaiting</p>
          <p className="mt-1 text-[14px] font-bold">5</p>
        </div>
        <div className="flex-1 rounded-[3px] border border-dashed border-[#d5e4ec] bg-white/70 p-2 text-center">
          <p className="text-[8px] uppercase tracking-wide">Overdue</p>
          <p className="mt-1 text-[14px] font-bold">1</p>
        </div>
      </div>
    </div>
  );
}

/** Orbit diagram: child at centre, current parties solid, future parties ghosted. */
function PartiesOrbitGraphic() {
  return (
    <div
      className="relative mx-auto mb-[calc(var(--cursor-v)*2)] h-44 w-full max-w-xl overflow-hidden rounded-[var(--cursor-card-radius,24px)] border border-[#d7e5f2] bg-[#f8fbff] sm:h-52"
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d7e5f2]" />
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#d7e5f2]" />
      <div className="absolute left-1/2 top-1/2 z-[1] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[#234a6b] text-center text-white">
        <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/70">
          Child
        </span>
        <span className="text-[11px] font-bold leading-tight">EHC</span>
      </div>
      <div className="absolute left-[12%] top-[18%] rounded-full bg-[#5fa9e6] px-3 py-1.5 text-[11px] font-bold text-white">
        Schools
      </div>
      <div className="absolute right-[10%] top-[22%] rounded-full bg-[#5fa9e6] px-3 py-1.5 text-[11px] font-bold text-white">
        Families
      </div>
      <div className="absolute bottom-[16%] left-[16%] rounded-full border border-dashed border-[#d7e5f2] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#607d96]">
        Specialists
      </div>
      <div className="absolute bottom-[14%] right-[12%] rounded-full border border-dashed border-[#d7e5f2] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#607d96]">
        Local authorities
      </div>
    </div>
  );
}

/** Citation chain for the trust section — flag → source → statute. */
function TrustCitationGraphic() {
  return (
    <div className="flex h-full min-h-[15rem] flex-col overflow-hidden rounded-[4px] bg-[#f7fafc] text-[#244a70] sm:min-h-[18rem]">
      <div className="flex items-center justify-between gap-3 border-b border-[#d7e4ec] px-3.5 py-2.5">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#607586]">
            Section F review
          </p>
          <p className="mt-0.5 text-[12px] font-bold">Special educational provision</p>
        </div>
        <span className="rounded-full bg-[#fff1bf] px-2 py-0.5 text-[9px] font-bold text-[#7a5a00]">
          Needs attention
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-2 p-3.5">
        <div className="rounded-[4px] border border-[#cfe2ec] bg-white p-2.5">
          <p className="text-[9px] font-semibold uppercase tracking-wide text-[#8aa]">Draft wording</p>
          <p className="mt-1 text-[11px] leading-snug text-[#536572]">
            “Access to regular adult support as appropriate.”
          </p>
        </div>
        <div className="rounded-[4px] border border-[#f1d48b] bg-[#fffaf0] p-2.5">
          <p className="text-[9px] font-semibold uppercase tracking-wide text-[#7a5a00]">
            Flag · not a rewrite
          </p>
          <p className="mt-1 text-[11px] leading-snug text-[#725315]">
            Missing frequency, duration and who delivers the support.
          </p>
        </div>
        <div className="mt-auto space-y-1.5">
          <div className="flex items-center gap-2 rounded-[4px] border border-[#cfe2ec] bg-white px-2.5 py-1.5 text-[10px]">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#edf5f9] text-[8px] font-bold text-[#3b8ac1]">
              EP
            </span>
            Source · EP advice, pp. 6–8
          </div>
          <div className="flex items-center gap-2 rounded-[4px] border border-[#cfe2ec] bg-white px-2.5 py-1.5 text-[10px]">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#fff8e8] text-[8px] font-bold text-[#7a5a00]">
              IP
            </span>
            Standard · IPSEA specificity
          </div>
        </div>
      </div>
    </div>
  );
}

function SourceMark({ mark }: { mark: string }) {
  return (
    <div
      className="flex h-14 w-11 shrink-0 flex-col justify-between rounded-[3px] border border-[#d7e5f2] bg-white px-1.5 py-1.5 shadow-[1px_2px_0_rgba(35,74,107,0.06)]"
      aria-hidden="true"
    >
      <div className="space-y-0.5">
        <div className="h-0.5 w-full rounded-full bg-[#eaf4ff]" />
        <div className="h-0.5 w-4/5 rounded-full bg-[#eaf4ff]" />
        <div className="h-0.5 w-3/5 rounded-full bg-[#eaf4ff]" />
      </div>
      <span className="text-[8px] font-bold tracking-wide text-[#5fa9e6]">{mark}</span>
    </div>
  );
}

/**
 * Landing body — section shells copied from cursor.com (structure + rhythm),
 * Unisen copy, tokens, and product mocks.
 */
export default function UnisenBody() {
  return (
    <div className="landing-body flex w-full flex-1 flex-col" id="landing-main">
      <div className="relative flex min-h-0 w-full flex-1 flex-col content-center items-center justify-start overflow-x-clip bg-[var(--landing-canvas,#ffffff)]">

          {/* ── Problem ← Cursor “The new way to build software.” ─────────── */}
          <section
            className="cursor-section"
            aria-labelledby="problem-heading"
          >
            <div className="cursor-container">
              <div className="cursor-prose-medium-wide cursor-mb-v2_5 mx-auto text-center">
                <h2 id="problem-heading" className="cursor-type-lg text-balance mx-auto">
                  Critical EHC work is still held together by inboxes, documents and memory.
                </h2>
              </div>
              <div className="cursor-gap grid grid-cols-1 items-stretch md:grid-cols-2 lg:grid-cols-3">
                {PROBLEMS.map((problem) => (
                  <div key={problem.tag} className="h-full">
                    <GlassCard>
                      <figure className="flex h-full flex-col">
                        <h3 className="cursor-type-base">{problem.title}</h3>
                        <p className="cursor-type-sm mt-2 text-pretty">{problem.body}</p>
                        <div className="mt-4 grow overflow-hidden">
                          <ProblemGraphic kind={problem.graphic} />
                        </div>
                        <p className="cursor-type-sm cursor-card-accent mt-auto pt-4">
                          → {problem.impact}
                        </p>
                      </figure>
                    </GlassCard>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Approach ← Cursor “Stay on the frontier” ──────────────────── */}
          <section
            className="cursor-section"
            aria-labelledby="approach-heading"
          >
            <div className="cursor-container">
              <div className="cursor-prose-narrow cursor-mb-v1 text-left">
                <h2 id="approach-heading" className="cursor-type-md text-balance">
                  Stay on top of the work
                </h2>
              </div>
              <div className="cursor-gap grid grid-cols-1 items-stretch xl:grid-cols-3">
                {PILLARS.map(({ title, body, href, cta, mock }) => (
                  <div key={title} className="h-full">
                    <GlassCard className="cursor-card flex h-full grow flex-col">
                      <div className="cursor-prose flex grow flex-col">
                        <h3 className="cursor-type-base">{title}</h3>
                        <p className="cursor-type-sm mt-2 text-pretty">{body}</p>
                        <div className="cursor-mt-link">
                          <a href={href} className="cursor-btn-tertiary">
                            {cta} →
                          </a>
                        </div>
                      </div>
                      <figure className="cursor-pt-media mt-auto w-full shrink-0">
                        <div className="cursor-media">
                          <DashboardMock kind={mock} />
                        </div>
                      </figure>
                    </GlassCard>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Schools feature ← Cursor “Agents turn ideas into code” ────── */}
          <section
            id="product"
            className="cursor-section"
            aria-label="School workspace"
          >
            <div className="cursor-container">
              <GlassCard className="cursor-card cursor-card--large cursor-feature cursor-feature--stage">
                <div className="cursor-feature-copy">
                  <h3 className="cursor-feature-title">
                    From consultation received to response ready.
                  </h3>
                  <p className="cursor-feature-body">
                    Keep the 15-day window visible, review needs against available provision and
                    prepare an accountable response with the evidence attached.
                  </p>
                  <a href={`${APP_URL}/product`} className="cursor-btn-tertiary cursor-mt-link">
                    Learn about school responses →
                  </a>
                </div>
                <figure className="cursor-feature-media cursor-pt-media lg:pt-0">
                  <div className="cursor-feature-window">
                    <DashboardMock kind="dashboard" />
                  </div>
                </figure>
              </GlassCard>
            </div>
          </section>

          {/* ── Families feature ← Cursor “Works autonomously…” (mirrored) ── */}
          <section
            className="cursor-section"
            aria-label="Family workspace"
          >
            <div className="cursor-container">
              <GlassCard className="cursor-card cursor-card--large cursor-feature cursor-feature--reverse cursor-feature--stage">
                <div className="cursor-feature-copy">
                  <h3 className="cursor-feature-title">
                    Review the whole draft plan before you respond.
                  </h3>
                  <p className="cursor-feature-body">
                    Work section by section, identify wording or evidence that needs attention and
                    prepare a response with links back to the source documents.
                  </p>
                  <a href={`${APP_URL}/family`} className="cursor-btn-tertiary cursor-mt-link">
                    Try the family demo →
                  </a>
                </div>
                <figure className="cursor-feature-media cursor-pt-media lg:pt-0">
                  <div className="cursor-feature-window">
                    <FamilyMock />
                  </div>
                </figure>
              </GlassCard>
            </div>
          </section>

          {/* ── Capabilities ← Product “Equipped to do real engineering” ──── */}
          <section
            className="cursor-section"
            aria-labelledby="capabilities-heading"
          >
            <div className="cursor-container">
              <h2 id="capabilities-heading" className="cursor-type-md cursor-mb-v1">
                Equipped for the statutory work
              </h2>
              <p className="cursor-type-sm cursor-mb-v1 cursor-prose">
                Schools
              </p>
              <div className="cursor-gap mb-[calc(var(--cursor-v)*2)] grid grid-cols-1 items-stretch md:grid-cols-2 lg:grid-cols-3">
                {SCHOOL_CAPABILITIES.map((item) => (
                  <div key={item.title} className="h-full">
                    <GlassCard>
                      <figure className="flex h-full flex-col">
                        <h3 className="cursor-type-base">{item.title}</h3>
                        <p className="cursor-type-sm mt-2 text-pretty">{item.body}</p>
                        <div className="mt-4 grow overflow-hidden">
                          <CapabilityGraphic kind={item.graphic} />
                        </div>
                      </figure>
                    </GlassCard>
                  </div>
                ))}
              </div>
              <p className="cursor-type-sm cursor-mb-v1 cursor-prose">
                Families
              </p>
              <div className="cursor-gap grid grid-cols-1 items-stretch md:grid-cols-2 lg:grid-cols-3">
                {FAMILY_CAPABILITIES.map((item) => (
                  <div key={item.title} className="h-full">
                    <GlassCard>
                      <figure className="flex h-full flex-col">
                        <h3 className="cursor-type-base">{item.title}</h3>
                        <p className="cursor-type-sm mt-2 text-pretty">{item.body}</p>
                        <div className="mt-4 grow overflow-hidden">
                          <CapabilityGraphic kind={item.graphic} />
                        </div>
                      </figure>
                    </GlassCard>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Roadmap ← Product lifecycle / Automate use-case groups ────── */}
          <section
            id="roadmap"
            aria-labelledby="roadmap-heading"
            className="cursor-section"
          >
            <div className="cursor-container">
              <div className="cursor-prose cursor-mb-v2_5">
                <h2 id="roadmap-heading" className="cursor-type-lg text-balance">
                  Unisen starts with the two parties closest to the child.
                </h2>
                <p className="cursor-type-sm mt-3 text-pretty">
                  Schools and families are the current scope. Specialists and local authorities are
                  the natural next chapters.
                </p>
              </div>

              <PartiesOrbitGraphic />

              <p className="cursor-type-sm mb-3 font-medium tracking-[0.04em] text-[var(--cursor-accent,#5fa9e6)] uppercase">
                Current
              </p>
              <div className="cursor-gap grid grid-cols-1 items-stretch md:grid-cols-2">
                {ROADMAP_CURRENT.map((item) => (
                  <div key={item.title} className="h-full">
                    <GlassCard>
                      <figure className="flex h-full flex-col">
                        <h3 className="cursor-type-base">{item.title}</h3>
                        <p className="cursor-type-sm mt-2 text-pretty">{item.body}</p>
                        <div className="mt-4 grow overflow-hidden">
                          <PartyGraphic kind={item.graphic} />
                        </div>
                      </figure>
                    </GlassCard>
                  </div>
                ))}
              </div>

              <p className="cursor-type-sm mt-8 mb-3 font-medium tracking-[0.04em] text-[var(--text-muted,#607586)] uppercase">
                Future direction
              </p>
              <div className="cursor-gap grid grid-cols-1 items-stretch md:grid-cols-2">
                {ROADMAP_FUTURE.map((item) => (
                  <div key={item.title} className="h-full">
                    <GlassCard>
                      <figure className="flex h-full flex-col">
                        <h3 className="cursor-type-base">{item.title}</h3>
                        <p className="cursor-type-sm mt-2 text-pretty">{item.body}</p>
                        <div className="mt-4 grow overflow-hidden">
                          <PartyGraphic kind={item.graphic} />
                        </div>
                      </figure>
                    </GlassCard>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Trust ← Enterprise control / proof card grid ──────────────── */}
          <section
            id="trust"
            aria-labelledby="trust-heading"
            className="cursor-section"
          >
            <div className="cursor-container">
              <div className="cursor-prose-medium-wide cursor-mb-v2_5 mx-auto text-center">
                <h2 id="trust-heading" className="cursor-type-lg text-balance mx-auto">
                  Built on the law, not guesses.
                </h2>
                <p className="cursor-type-sm mt-3 text-pretty mx-auto">
                  Unisen flags gaps against the statutory framework and cites the source document.
                  It never invents the wording or the fix.
                </p>
              </div>

              <div className="cursor-mb-v2_5">
                <GlassCard className="cursor-card cursor-card--large cursor-feature">
                  <div className="cursor-feature-copy">
                    <h3 className="cursor-feature-title">
                      Flag what is wrong. Leave the decision to the human.
                    </h3>
                    <ul className="mt-5 space-y-4">
                      {TRUST_DISCIPLINES.map((item) => (
                        <li key={item.title} className="flex gap-3">
                          <span
                            className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--cursor-accent,#5fa9e6)]"
                            aria-hidden="true"
                          />
                          <div>
                            <p className="cursor-type-base">{item.title}</p>
                            <p className="cursor-type-sm mt-1 text-pretty">{item.body}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <figure className="cursor-feature-media cursor-pt-media lg:pt-0">
                    <div className="cursor-feature-window">
                      <TrustCitationGraphic />
                    </div>
                  </figure>
                </GlassCard>
              </div>

              <p className="cursor-type-sm mb-3 font-medium tracking-[0.04em] text-[var(--cursor-accent,#5fa9e6)] uppercase">
                Grounded in
              </p>
              <div className="cursor-gap grid grid-cols-1 items-stretch sm:grid-cols-2 lg:grid-cols-4">
                {LEGAL_SOURCES.map((source) => (
                  <div key={source.title} className="h-full">
                    <GlassCard href={source.href}>
                      <figure className="flex h-full gap-3">
                        <SourceMark mark={source.mark} />
                        <div className="flex min-w-0 flex-1 flex-col">
                          <h3 className="cursor-type-base text-balance">{source.title}</h3>
                          <p className="cursor-type-sm mt-2 text-pretty">{source.body}</p>
                          <p className="cursor-type-sm cursor-card-accent mt-auto pt-3">
                            Open source →
                          </p>
                        </div>
                      </figure>
                    </GlassCard>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Final CTA ← Cursor “Try Cursor now.” ──────────────────────── */}
          <section
            id="contact"
            aria-label="Choose a Unisen workspace"
            className="cursor-section cursor-section--headline flex items-center justify-center"
          >
            <div className="cursor-container">
              <div className="cursor-prose-medium-wide mx-auto text-center">
                <h2
                  className="cursor-type-xl text-balance mx-auto mb-[var(--cursor-v)]"
                  data-component="heading"
                  dir="auto"
                >
                  Try Unisen from your side.
                </h2>
                <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:flex-wrap sm:gap-[var(--cursor-g)]">
                  <EnquiryDialog
                    trigger={
                      <Button
                        type="button"
                        size="lg"
                        className="cta-brand relative h-10 w-auto min-w-0 px-5 text-sm font-bold sm:h-12 sm:min-w-56 sm:px-7 sm:text-base"
                      >
                        <span className="relative z-[1]">Book a 15-min walkthrough</span>
                      </Button>
                    }
                  />
                  <Button
                    type="button"
                    size="lg"
                    className="cta-brand relative h-10 w-auto min-w-0 px-5 text-sm font-bold sm:h-12 sm:min-w-56 sm:px-7 sm:text-base"
                    onClick={() => window.location.assign(`${APP_URL}/family`)}
                  >
                    <span className="relative z-[1]">Try the family demo</span>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      <div className="shrink-0">
        <FooterSection2 />
      </div>
    </div>
  );
}
