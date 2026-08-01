/**
 * Static Unisen product mocks for the marketing landing.
 * Mirror the school consultations UI (dashboard, clock, draft, evidence)
 * so cards never show Nexura/template screenshots.
 */

import type { ReactNode } from "react";
import {
  AlertTriangle,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  LayoutGrid,
  Sparkles,
} from "lucide-react";

function Shell({
  title,
  children,
  aside,
}: {
  title: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="unisen-mock" aria-hidden>
      <div className="unisen-mock-sidebar">
        <div className="unisen-mock-brand">
          <span className="unisen-mock-mark" />
          <span>Unisen</span>
        </div>
        <div className="unisen-mock-nav">
          <span className="is-active">
            <LayoutGrid className="h-3.5 w-3.5" /> Dashboard
          </span>
          <span>
            <Calendar className="h-3.5 w-3.5" /> Calendar
          </span>
          <span>
            <FileText className="h-3.5 w-3.5" /> Templates
          </span>
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

function Pill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "urgent" | "warn" | "ok" | "info" | "neutral";
}) {
  return <span className={`unisen-mock-pill unisen-mock-pill--${tone}`}>{children}</span>;
}

/** Full consultations dashboard — hero product shot */
export function MockConsultationsDashboard() {
  const rows = [
    { pupil: "A.R.", year: "Y5", la: "Camden", days: 2, status: "Reviewing", tone: "urgent" as const },
    { pupil: "J.K.", year: "Y8", la: "Hackney", days: 6, status: "Drafting", tone: "warn" as const },
    { pupil: "M.S.", year: "Y3", la: "Islington", days: 11, status: "New", tone: "ok" as const },
    { pupil: "T.B.", year: "Y10", la: "Southwark", days: 0, status: "Drafting", tone: "urgent" as const },
  ];

  return (
    <Shell
      title="Consultations"
      aside={
        <div className="unisen-mock-stats">
          <span>
            <AlertTriangle className="h-3 w-3" /> 2 due soon
          </span>
          <span>
            <Clock className="h-3 w-3" /> 4 open
          </span>
        </div>
      }
    >
      <div className="unisen-mock-table">
        <div className="unisen-mock-table-head">
          <span>Pupil</span>
          <span>Local authority</span>
          <span>Deadline</span>
          <span>Status</span>
        </div>
        {rows.map((r) => (
          <div key={r.pupil} className="unisen-mock-table-row">
            <span>
              <strong>{r.pupil}</strong>
              <em>{r.year}</em>
            </span>
            <span>{r.la}</span>
            <span>
              <Pill tone={r.tone}>
                {r.days === 0 ? "Due today" : `${r.days} days left`}
              </Pill>
            </span>
            <span>
              <Pill tone={r.status === "New" ? "info" : "neutral"}>{r.status}</Pill>
            </span>
          </div>
        ))}
      </div>
    </Shell>
  );
}

/** Outcome: statutory clock visible */
export function MockClockPanel() {
  return (
    <Shell
      title="A.R., Year 5"
      aside={<Pill tone="urgent">2 days left</Pill>}
    >
      <div className="unisen-mock-clock">
        <div className="unisen-mock-clock-hero unisen-mock-clock-hero--urgent">
          <AlertTriangle className="h-4 w-4" />
          <div>
            <strong>2 days until response due</strong>
            <p>Statutory 15-day consultation window (minimum)</p>
          </div>
        </div>
        <ul className="unisen-mock-timeline">
          <li className="is-done">
            <CheckCircle2 className="h-3.5 w-3.5" /> Received from Camden LA
          </li>
          <li className="is-done">
            <CheckCircle2 className="h-3.5 w-3.5" /> Advice attached (EP + SaLT)
          </li>
          <li className="is-active">
            <Clock className="h-3.5 w-3.5" /> Draft response in progress
          </li>
          <li>
            <span className="unisen-mock-dot" /> Submit to LA portal
          </li>
        </ul>
      </div>
    </Shell>
  );
}

/** Outcome: vague provision flagged */
export function MockDraftFlags() {
  return (
    <Shell title="Response draft: Section F" aside={<Pill tone="warn">3 flags</Pill>}>
      <div className="unisen-mock-draft">
        <div className="unisen-mock-need">
          <header>
            <span>1</span>
            <strong>Receptive language: needs specific provision</strong>
            <Pill tone="ok">Can meet</Pill>
          </header>
          <p className="unisen-mock-draft-text">
            Weekly SaLT group (2× 30 min) with targets reviewed every half-term…
          </p>
        </div>
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
        <div className="unisen-mock-need">
          <header>
            <span>2</span>
            <strong>Sensory regulation in class</strong>
            <Pill tone="warn">Partial</Pill>
          </header>
          <p className="unisen-mock-draft-text is-muted">Access to support as needed in the classroom…</p>
        </div>
      </div>
    </Shell>
  );
}

/** Outcome: evidence on the case */
export function MockEvidencePanel() {
  const docs = [
    { author: "Dr. Patel", role: "Educational Psychologist", pages: 12 },
    { author: "S. Khan", role: "Speech and Language Therapy", pages: 8 },
    { author: "School SENCO", role: "School advice form", pages: 4 },
  ];
  return (
    <Shell title="Received documents" aside={<span className="unisen-mock-meta">3 files · 24 pages</span>}>
      <ul className="unisen-mock-docs">
        {docs.map((d) => (
          <li key={d.author}>
            <div className="unisen-mock-doc-icon">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <strong>
                {d.author}
                <em> · {d.role}</em>
              </strong>
              <p>{d.pages} pp. · attached to case</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="unisen-mock-ai">
        <Sparkles className="h-3.5 w-3.5" />
        <span>AI summary cites uploaded sources only; it never invents provision.</span>
      </div>
    </Shell>
  );
}

/** Outcome: grounded in law / Code */
export function MockLawPanel() {
  return (
    <Shell title="Case guidance" aside={<Pill tone="info">Sources cited</Pill>}>
      <div className="unisen-mock-law">
        <div className="unisen-mock-ai-card">
          <header>
            <Sparkles className="h-3.5 w-3.5" />
            <strong>Section B &amp; F draft notes</strong>
          </header>
          <p>
            Needs and provision language checked against the SEND Code of Practice and IPSEA
            specificity guidance. Suggestions link back to the attached EP report (p. 6–8).
          </p>
        </div>
        <ul className="unisen-mock-sources">
          <li>
            <Building2 className="h-3.5 w-3.5" /> Children and Families Act 2014
          </li>
          <li>
            <FileText className="h-3.5 w-3.5" /> SEND Code of Practice 0–25
          </li>
          <li>
            <CheckCircle2 className="h-3.5 w-3.5" /> IPSEA: specific, quantified provision
          </li>
        </ul>
      </div>
    </Shell>
  );
}

export type MockKind = "dashboard" | "clock" | "draft" | "evidence" | "law";

export function DashboardMock({ kind }: { kind: MockKind }) {
  switch (kind) {
    case "dashboard":
      return <MockConsultationsDashboard />;
    case "clock":
      return <MockClockPanel />;
    case "draft":
      return <MockDraftFlags />;
    case "evidence":
      return <MockEvidencePanel />;
    case "law":
      return <MockLawPanel />;
  }
}
