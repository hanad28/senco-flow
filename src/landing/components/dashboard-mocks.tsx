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
  FileText,
  LayoutGrid,
  Sparkles,
} from "lucide-react";

export type MockKind = "dashboard" | "clock" | "draft" | "evidence" | "law";

const NAV: { id: MockKind; label: string; icon: typeof LayoutGrid }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "clock", label: "Case", icon: Clock },
  { id: "evidence", label: "Evidence", icon: FileText },
  { id: "draft", label: "Draft", icon: Sparkles },
];

const ROWS = [
  { id: "ar", pupil: "A.R.", year: "Y5", la: "Camden", days: 2, status: "Reviewing", tone: "urgent" as const },
  { id: "jk", pupil: "J.K.", year: "Y8", la: "Hackney", days: 6, status: "Drafting", tone: "warn" as const },
  { id: "ms", pupil: "M.S.", year: "Y3", la: "Islington", days: 11, status: "New", tone: "ok" as const },
  { id: "tb", pupil: "T.B.", year: "Y10", la: "Southwark", days: 0, status: "Drafting", tone: "urgent" as const },
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
  view,
  onViewChange,
}: {
  title: string;
  children: ReactNode;
  aside?: ReactNode;
  view: MockKind;
  onViewChange: (view: MockKind) => void;
}) {
  return (
    <div className="unisen-mock" role="region" aria-label="Unisen product demo">
      <div className="unisen-mock-sidebar">
        <div className="unisen-mock-brand">
          <img className="unisen-mock-mark" src="/favicon.ico" alt="" />
          <span>Unisen</span>
        </div>
        <div className="unisen-mock-nav" role="tablist" aria-label="Demo views">
          {NAV.map(({ id, label, icon: Icon }) => {
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
            <p className="unisen-mock-crumb">School workspace</p>
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
              <Pill tone={row.tone}>
                {row.days === 0 ? "Due today" : `${row.days} days left`}
              </Pill>
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
          Viewing {selected.author}: AI summary cites uploaded sources only; it never invents
          provision.
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
          aside: view === "law" ? <Pill tone="info">Sources cited</Pill> : <Pill tone="warn">3 flags</Pill>,
        };
    }
  }, [view]);

  return (
    <Shell title={meta.title} aside={meta.aside} view={view} onViewChange={setView}>
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
