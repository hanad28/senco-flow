/**
 * Interactive Unisen product mocks for the marketing landing.
 * Click around the mini workspace the way Cursor demos do.
 */

import { useMemo, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  Clock,
  FileSearch,
  FileText,
  Languages,
  LayoutGrid,
  MessageSquareText,
  Sparkles,
} from "lucide-react";

export type MockKind = "dashboard" | "clock" | "draft" | "evidence" | "law";
export type FamilyMockView = "plan" | "issues" | "documents" | "response";

const NAV: { id: MockKind; label: string; icon: typeof LayoutGrid }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "clock", label: "Case", icon: Clock },
  { id: "evidence", label: "Evidence", icon: FileText },
  { id: "draft", label: "Draft", icon: Sparkles },
];

const FAMILY_NAV: { id: FamilyMockView; label: string; icon: typeof LayoutGrid }[] = [
  { id: "plan", label: "Plan", icon: LayoutGrid },
  { id: "issues", label: "Issues", icon: AlertTriangle },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "response", label: "Response", icon: MessageSquareText },
];

const FAMILY_SECTIONS = [
  {
    id: "b",
    letter: "B",
    title: "Special educational needs",
    status: "Reviewed",
    tone: "ok" as const,
    quote: "Maya has significant receptive language needs that affect following multi-step instructions.",
    note: "Matches the EP report (p. 6). Keep the wording linked to evidence.",
  },
  {
    id: "f",
    letter: "F",
    title: "Special educational provision",
    status: "Needs attention",
    tone: "warn" as const,
    quote: "Access to regular adult support as appropriate.",
    note: "Check whether frequency, duration and who delivers the support are clear.",
  },
  {
    id: "i",
    letter: "I",
    title: "Placement",
    status: "In progress",
    tone: "info" as const,
    quote: "Maintained mainstream primary school with SEN support.",
    note: "Confirm preferred school naming before the response is final.",
  },
];

const FAMILY_ISSUES = [
  {
    id: "vague-f",
    section: "Section F",
    title: "Provision is not specific enough",
    detail: "“As appropriate” does not state frequency, duration or who delivers support.",
  },
  {
    id: "missing-salt",
    section: "Section B",
    title: "SaLT advice not reflected",
    detail: "Weekly group targets from the SaLT report are missing from the draft need wording.",
  },
  {
    id: "source-gap",
    section: "Section F",
    title: "No source linked for adult support",
    detail: "Link the clause back to the school advice form or EP recommendations.",
  },
  {
    id: "placement",
    section: "Section I",
    title: "Preferred school not named",
    detail: "Families can name a preferred school or type of placement in the response.",
  },
];

const FAMILY_DOCS = [
  { id: "draft", title: "Draft EHC plan", meta: "LA document · 18 pp.", status: "Needs review" },
  { id: "ep", title: "EP advice", meta: "Dr. Patel · 12 pp.", status: "Linked" },
  { id: "salt", title: "SaLT advice", meta: "S. Khan · 8 pp.", status: "Linked" },
  { id: "school", title: "School advice form", meta: "SENCO · 4 pp.", status: "Linked" },
];

const ROWS = [
  {
    id: "ar",
    pupil: "A.R.",
    year: "Y5",
    la: "Camden",
    days: 2,
    status: "Reviewing",
    tone: "urgent" as const,
  },
  {
    id: "jk",
    pupil: "J.K.",
    year: "Y8",
    la: "Hackney",
    days: 6,
    status: "Drafting",
    tone: "warn" as const,
  },
  {
    id: "ms",
    pupil: "M.S.",
    year: "Y3",
    la: "Islington",
    days: 11,
    status: "New",
    tone: "ok" as const,
  },
  {
    id: "tb",
    pupil: "T.B.",
    year: "Y10",
    la: "Southwark",
    days: 0,
    status: "Drafting",
    tone: "urgent" as const,
  },
];

const TIMELINE = [
  { id: "received", label: "Received from Camden LA", state: "done" as const },
  { id: "advice", label: "Advice attached (EP + SaLT)", state: "done" as const },
  { id: "draft", label: "Draft response in progress", state: "active" as const },
  { id: "submit", label: "Submit to LA portal", state: "todo" as const },
];

const DOCS = [
  { id: "ep", author: "Dr. Patel", role: "Educational Psychologist", pages: 12 },
  { id: "salt", author: "S. Khan", role: "Speech and Language Therapy", pages: 8 },
  { id: "school", author: "School SENCO", role: "School advice form", pages: 4 },
];

const NEEDS = [
  {
    id: "language",
    title: "Receptive language: needs specific provision",
    status: "Can meet",
    tone: "ok" as const,
    text: "Weekly SaLT group (2× 30 min) with targets reviewed every half-term…",
    muted: false,
  },
  {
    id: "sensory",
    title: "Sensory regulation in class",
    status: "Partial",
    tone: "warn" as const,
    text: "Access to support as needed in the classroom…",
    muted: true,
  },
];

function Pill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "urgent" | "warn" | "ok" | "info" | "neutral";
}) {
  return <span className={`unisen-mock-pill unisen-mock-pill--${tone}`}>{children}</span>;
}

function Shell({
  title,
  children,
  aside,
  crumb = "School workspace",
  nav = NAV,
  view,
  onViewChange,
  ariaLabel = "Unisen product demo",
}: {
  title: string;
  children: ReactNode;
  aside?: ReactNode;
  crumb?: string;
  nav?: { id: string; label: string; icon: typeof LayoutGrid }[];
  view: string;
  onViewChange: (view: string) => void;
  ariaLabel?: string;
}) {
  return (
    <div
      className="unisen-mock"
      role="region"
      aria-label={ariaLabel}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <div className="unisen-mock-sidebar">
        <div className="unisen-mock-brand">
          <img className="unisen-mock-mark" src="/favicon.ico" alt="" />
          <span>Unisen</span>
        </div>
        <div className="unisen-mock-nav" role="tablist" aria-label="Demo views">
          {nav.map(({ id, label, icon: Icon }) => {
            const active = view === id || (view === "law" && id === "draft");
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active}
                className={active ? "is-active" : undefined}
                onClick={() => onViewChange(id)}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="unisen-mock-main">
        <header className="unisen-mock-top">
          <div>
            <p className="unisen-mock-crumb">{crumb}</p>
            <h4>{title}</h4>
          </div>
          {aside}
        </header>
        <div className="unisen-mock-body">{children}</div>
      </div>
    </div>
  );
}

function DashboardPanel({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const selected = ROWS.find((row) => row.id === selectedId) ?? ROWS[0];

  return (
    <>
      <div className="unisen-mock-table">
        <div className="unisen-mock-table-head">
          <span>Pupil</span>
          <span>Local authority</span>
          <span>Deadline</span>
          <span>Status</span>
        </div>
        {ROWS.map((row) => (
          <button
            key={row.id}
            type="button"
            className={`unisen-mock-table-row${selectedId === row.id ? " is-selected" : ""}`}
            onClick={() => onSelect(row.id)}
          >
            <span>
              <strong>{row.pupil}</strong>
              <em>{row.year}</em>
            </span>
            <span>{row.la}</span>
            <span>
              <Pill tone={row.tone}>{row.days === 0 ? "Due today" : `${row.days} days left`}</Pill>
            </span>
            <span>
              <Pill tone={row.status === "New" ? "info" : "neutral"}>{row.status}</Pill>
            </span>
          </button>
        ))}
      </div>
      <div className="unisen-mock-detail" aria-live="polite">
        <strong>
          {selected.pupil} · {selected.la}
        </strong>
        <span>
          {selected.days === 0 ? "Due today" : `${selected.days} days left`} · {selected.status}
        </span>
        <button type="button" className="unisen-mock-action">
          Open case
        </button>
      </div>
    </>
  );
}

function ClockPanel({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const selected = TIMELINE.find((step) => step.id === selectedId) ?? TIMELINE[2];

  return (
    <div className="unisen-mock-clock">
      <div className="unisen-mock-clock-hero unisen-mock-clock-hero--urgent">
        <AlertTriangle className="h-4 w-4" />
        <div>
          <strong>2 days until response due</strong>
          <p>Statutory 15-day consultation window (minimum)</p>
        </div>
      </div>
      <ul className="unisen-mock-timeline">
        {TIMELINE.map((step) => (
          <li key={step.id}>
            <button
              type="button"
              className={`unisen-mock-timeline-btn${selectedId === step.id ? " is-active" : ""}${
                step.state === "done" ? " is-done" : ""
              }`}
              onClick={() => onSelect(step.id)}
            >
              {step.state === "done" ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : step.state === "active" ? (
                <Clock className="h-3.5 w-3.5" />
              ) : (
                <span className="unisen-mock-dot" />
              )}
              {step.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="unisen-mock-detail" aria-live="polite">
        <strong>{selected.label}</strong>
        <span>
          {selected.state === "done"
            ? "Completed"
            : selected.state === "active"
              ? "In progress"
              : "Not started"}
        </span>
      </div>
    </div>
  );
}

function EvidencePanel({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const selected = DOCS.find((doc) => doc.id === selectedId) ?? DOCS[0];

  return (
    <>
      <ul className="unisen-mock-docs">
        {DOCS.map((doc) => (
          <li key={doc.id}>
            <button
              type="button"
              className={`unisen-mock-doc-btn${selectedId === doc.id ? " is-selected" : ""}`}
              onClick={() => onSelect(doc.id)}
            >
              <div className="unisen-mock-doc-icon">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <strong>
                  {doc.author}
                  <em> · {doc.role}</em>
                </strong>
                <p>{doc.pages} pp. · attached to case</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <div className="unisen-mock-ai">
        <Sparkles className="h-3.5 w-3.5" />
        <span>
          Viewing {selected.author}: the summary links back to uploaded evidence for human review.
        </span>
      </div>
    </>
  );
}

function DraftPanel({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const selected = NEEDS.find((need) => need.id === selectedId) ?? NEEDS[1];

  return (
    <div className="unisen-mock-draft">
      {NEEDS.map((need, index) => (
        <button
          key={need.id}
          type="button"
          className={`unisen-mock-need${selectedId === need.id ? " is-selected" : ""}`}
          onClick={() => onSelect(need.id)}
        >
          <header>
            <span>{index + 1}</span>
            <strong>{need.title}</strong>
            <Pill tone={need.tone}>{need.status}</Pill>
          </header>
          <p className={`unisen-mock-draft-text${need.muted ? " is-muted" : ""}`}>{need.text}</p>
        </button>
      ))}
      {selected.id === "sensory" ? (
        <div className="unisen-mock-flag">
          <AlertTriangle className="h-3.5 w-3.5" />
          <div>
            <strong>Vague wording flagged</strong>
            <p>
              “Access to support as needed” lacks frequency, duration, and who delivers it (IPSEA
              specificity).
            </p>
          </div>
        </div>
      ) : (
        <div className="unisen-mock-flag is-ok">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <div>
            <strong>Specific and quantified</strong>
            <p>Frequency, duration, and delivery are clear enough to defend.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function LawPanel() {
  return (
    <div className="unisen-mock-law">
      <div className="unisen-mock-ai-card">
        <header>
          <Sparkles className="h-3.5 w-3.5" />
          <strong>Section B &amp; F draft notes</strong>
        </header>
        <p>
          Needs and provision language checked against the SEND Code of Practice and IPSEA
          specificity guidance. Suggestions link back to the attached EP report (p. 6 to 8).
        </p>
      </div>
      <ul className="unisen-mock-sources">
        <li>
          <Building2 className="h-3.5 w-3.5" /> Children and Families Act 2014
        </li>
        <li>
          <FileText className="h-3.5 w-3.5" /> SEND Code of Practice 0 to 25
        </li>
        <li>
          <CheckCircle2 className="h-3.5 w-3.5" /> IPSEA: specific, quantified provision
        </li>
      </ul>
    </div>
  );
}

export function DashboardMock({ kind }: { kind: MockKind }) {
  const initialView = kind === "law" ? "draft" : kind;
  const [view, setView] = useState<MockKind>(initialView);
  const [selectedRow, setSelectedRow] = useState(ROWS[0].id);
  const [selectedStep, setSelectedStep] = useState(TIMELINE[2].id);
  const [selectedDoc, setSelectedDoc] = useState(DOCS[0].id);
  const [selectedNeed, setSelectedNeed] = useState(NEEDS[1].id);

  const meta = useMemo(() => {
    switch (view) {
      case "dashboard":
        return {
          title: "Consultations",
          aside: (
            <div className="unisen-mock-stats">
              <span>
                <AlertTriangle className="h-3 w-3" /> 2 due soon
              </span>
              <span>
                <Clock className="h-3 w-3" /> 4 open
              </span>
            </div>
          ),
        };
      case "clock":
        return {
          title: "A.R., Year 5",
          aside: <Pill tone="urgent">2 days left</Pill>,
        };
      case "evidence":
        return {
          title: "Received documents",
          aside: <span className="unisen-mock-meta">3 files · 24 pages</span>,
        };
      case "draft":
      case "law":
        return {
          title: view === "law" ? "Case guidance" : "Response draft: Section F",
          aside:
            view === "law" ? (
              <Pill tone="info">Sources cited</Pill>
            ) : (
              <Pill tone="warn">3 flags</Pill>
            ),
        };
    }
  }, [view]);

  return (
    <Shell title={meta.title} aside={meta.aside} view={view} onViewChange={(next) => setView(next as MockKind)}>
      {view === "dashboard" ? (
        <DashboardPanel selectedId={selectedRow} onSelect={setSelectedRow} />
      ) : null}
      {view === "clock" ? (
        <ClockPanel selectedId={selectedStep} onSelect={setSelectedStep} />
      ) : null}
      {view === "evidence" ? (
        <EvidencePanel selectedId={selectedDoc} onSelect={setSelectedDoc} />
      ) : null}
      {view === "draft" ? (
        <DraftPanel selectedId={selectedNeed} onSelect={setSelectedNeed} />
      ) : null}
      {view === "law" ? <LawPanel /> : null}
    </Shell>
  );
}

function FamilyPlanPanel({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const selected = FAMILY_SECTIONS.find((section) => section.id === selectedId) ?? FAMILY_SECTIONS[1];

  return (
    <div className="unisen-mock-draft">
      <div className="unisen-mock-stats" style={{ marginBottom: "0.55rem" }}>
        <span>7 of 11 sections</span>
        <span>
          <AlertTriangle className="h-3 w-3" /> 4 issues
        </span>
        <span>
          <FileText className="h-3 w-3" /> 9 sources
        </span>
      </div>
      {FAMILY_SECTIONS.map((section) => (
        <button
          key={section.id}
          type="button"
          className={`unisen-mock-need${selectedId === section.id ? " is-selected" : ""}`}
          onClick={() => onSelect(section.id)}
        >
          <header>
            <span>{section.letter}</span>
            <strong>{section.title}</strong>
            <Pill tone={section.tone}>{section.status}</Pill>
          </header>
          <p className={`unisen-mock-draft-text${section.tone === "warn" ? " is-muted" : ""}`}>
            {section.quote}
          </p>
        </button>
      ))}
      <div className={`unisen-mock-flag${selected.tone === "ok" ? " is-ok" : ""}`}>
        {selected.tone === "ok" ? (
          <CheckCircle2 className="h-3.5 w-3.5" />
        ) : (
          <FileSearch className="h-3.5 w-3.5" />
        )}
        <div>
          <strong>
            Section {selected.letter}: {selected.status}
          </strong>
          <p>{selected.note}</p>
        </div>
      </div>
    </div>
  );
}

function FamilyIssuesPanel({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const selected = FAMILY_ISSUES.find((issue) => issue.id === selectedId) ?? FAMILY_ISSUES[0];

  return (
    <>
      <ul className="unisen-mock-docs">
        {FAMILY_ISSUES.map((issue) => (
          <li key={issue.id}>
            <button
              type="button"
              className={`unisen-mock-doc-btn${selectedId === issue.id ? " is-selected" : ""}`}
              onClick={() => onSelect(issue.id)}
            >
              <div className="unisen-mock-doc-icon">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <strong>
                  {issue.title}
                  <em> · {issue.section}</em>
                </strong>
                <p>{issue.detail}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <div className="unisen-mock-detail" aria-live="polite">
        <strong>{selected.title}</strong>
        <span>{selected.section} · open for family comment</span>
        <button type="button" className="unisen-mock-action">
          Mark ready
        </button>
      </div>
    </>
  );
}

function FamilyDocumentsPanel({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const selected = FAMILY_DOCS.find((doc) => doc.id === selectedId) ?? FAMILY_DOCS[0];

  return (
    <>
      <ul className="unisen-mock-docs">
        {FAMILY_DOCS.map((doc) => (
          <li key={doc.id}>
            <button
              type="button"
              className={`unisen-mock-doc-btn${selectedId === doc.id ? " is-selected" : ""}`}
              onClick={() => onSelect(doc.id)}
            >
              <div className="unisen-mock-doc-icon">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <strong>{doc.title}</strong>
                <p>
                  {doc.meta} · {doc.status}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <div className="unisen-mock-ai">
        <Sparkles className="h-3.5 w-3.5" />
        <span>
          Viewing {selected.title}: quotes and issues stay linked to the source pages for review.
        </span>
      </div>
    </>
  );
}

function FamilyResponsePanel() {
  return (
    <div className="unisen-mock-law">
      <div className="unisen-mock-ai-card">
        <header>
          <MessageSquareText className="h-3.5 w-3.5" />
          <strong>Response draft readiness</strong>
        </header>
        <p>
          Comments on Section F and preferred placement are ready. Download an English or bilingual
          letter when the open issues are marked ready.
        </p>
      </div>
      <ul className="unisen-mock-sources">
        <li>
          <CheckCircle2 className="h-3.5 w-3.5" /> Parent views drafted
        </li>
        <li>
          <AlertTriangle className="h-3.5 w-3.5" /> 2 issues still open
        </li>
        <li>
          <Languages className="h-3.5 w-3.5" /> Interface in five languages
        </li>
      </ul>
      <div className="unisen-mock-detail" aria-live="polite">
        <strong>Continue review</strong>
        <span>11 days left · statutory draft response window</span>
        <button type="button" className="unisen-mock-action">
          Open response
        </button>
      </div>
    </div>
  );
}

export function FamilyMock({ kind = "plan" }: { kind?: FamilyMockView }) {
  const [view, setView] = useState<FamilyMockView>(kind);
  const [selectedSection, setSelectedSection] = useState(FAMILY_SECTIONS[1].id);
  const [selectedIssue, setSelectedIssue] = useState(FAMILY_ISSUES[0].id);
  const [selectedDoc, setSelectedDoc] = useState(FAMILY_DOCS[0].id);

  const meta = useMemo(() => {
    switch (view) {
      case "plan":
        return {
          title: "Review your plan section by section",
          aside: <Pill tone="warn">11 days left</Pill>,
        };
      case "issues":
        return {
          title: "Issues to check",
          aside: <Pill tone="warn">4 open</Pill>,
        };
      case "documents":
        return {
          title: "Source documents",
          aside: <span className="unisen-mock-meta">4 files · 42 pages</span>,
        };
      case "response":
        return {
          title: "Prepare your response",
          aside: <Pill tone="info">In progress</Pill>,
        };
    }
  }, [view]);

  return (
    <Shell
      title={meta.title}
      aside={meta.aside}
      crumb="Family workspace"
      nav={FAMILY_NAV}
      view={view}
      onViewChange={(next) => setView(next as FamilyMockView)}
      ariaLabel="Unisen family workspace demo"
    >
      {view === "plan" ? (
        <FamilyPlanPanel selectedId={selectedSection} onSelect={setSelectedSection} />
      ) : null}
      {view === "issues" ? (
        <FamilyIssuesPanel selectedId={selectedIssue} onSelect={setSelectedIssue} />
      ) : null}
      {view === "documents" ? (
        <FamilyDocumentsPanel selectedId={selectedDoc} onSelect={setSelectedDoc} />
      ) : null}
      {view === "response" ? <FamilyResponsePanel /> : null}
    </Shell>
  );
}
