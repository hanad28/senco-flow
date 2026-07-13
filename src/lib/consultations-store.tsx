import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { NeedDomain } from "@/lib/school-profile-store";

// ---------- Activity log ----------
export type ActivityAction =
  | "received"
  | "document_opened"
  | "needs_reviewed"
  | "draft_started"
  | "draft_edited"
  | "evidence_attached"
  | "template_inserted"
  | "submitted";

export type ActivityEntry = {
  id: string;
  timestamp: string; // ISO datetime
  action: ActivityAction;
  detail?: string;
};

let __actSeq = 0;
function actEntry(dateIso: string, hh: number, mm: number, action: ActivityAction, detail?: string): ActivityEntry {
  // Use UTC so SSR and client produce identical timestamps (avoids hydration mismatch).
  const [y, m, day] = dateIso.split("-").map(Number);
  const t = Date.UTC(y, (m ?? 1) - 1, day ?? 1, hh, mm, 0, 0);
  __actSeq += 1;
  return { id: `act-${t}-${__actSeq}`, timestamp: new Date(t).toISOString(), action, detail };
}
function addDaysIso(iso: string, n: number): string {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

export type ConsultationStatus = "New" | "Reviewing" | "Drafting" | "Submitted";
export type NeedCapability = "full" | "partial" | "cannot";

export type NeedItem = {
  id: string;
  title: string;
  source: string;
  detail: string;
  capability: NeedCapability;
  domain: NeedDomain;
  draftResponse: string;
  evidence: string[];
  // Required rationale when capability === "cannot". Optional here so
  // historical/seed data need not carry it; validated at submit time.
  cannotRationale?: string;
};

export type DocumentItem = {
  id: string;
  name: string;
  kind: string;
  pages: number;
  author: string;
  date: string;
};

export type Consultation = {
  id: string;
  pupilRef: string;
  yearGroup: string;
  localAuthority: string;
  caseOfficer: string;
  receivedOn: string; // ISO
  submittedOn?: string; // ISO — set for Submitted consultations
  // Deadline is derived from receivedOn at render time via calendarDaysRemaining.
  status: ConsultationStatus;
  summary: string;
  documents: DocumentItem[];
  needs: NeedItem[];
  activity?: ActivityEntry[];
};

const seedNeeds = (prefix: string): NeedItem[] => [
  {
    id: `${prefix}-n1`,
    title: "1:1 literacy support (min. 3 sessions per week)",
    source: "Educational Psychologist Report, §4.2",
    detail:
      "Pupil presents with significant delay in phonological processing and decoding. Recommends targeted structured literacy intervention delivered 1:1.",
    capability: "full",
    domain: "cognition",
    draftResponse:
      "The school can meet this need in full. We deliver a structured literacy programme (Read Write Inc.) 1:1 with a trained TA for 4×20 minute sessions per week, tracked half-termly against reading age.",
    evidence: ["Provision map 2025-26.pdf", "TA timetable — RWI.pdf"],
  },
  {
    id: `${prefix}-n2`,
    title: "Sensory regulation breaks every 45 minutes",
    source: "Occupational Therapy Report, §3.1",
    detail:
      "Pupil requires scheduled proprioceptive input and access to a low-stimulus space to prevent dysregulation during the school day.",
    capability: "partial",
    domain: "sensory",
    draftResponse:
      "The school can meet this need in part. A sensory circuit is available at breaktimes and a quiet room can be accessed on request. Timetabled 45-minute breaks would require additional TA capacity, which we would be able to provide with the funding uplift identified in Section F.",
    evidence: ["Sensory room photos.pdf"],
  },
  {
    id: `${prefix}-n3`,
    title: "Speech & Language Therapy input, weekly",
    source: "SaLT Report, §5",
    detail:
      "Direct weekly therapy from a qualified SaLT for a minimum of 30 minutes, plus a programme of activities delivered by trained school staff.",
    capability: "cannot",
    domain: "communication",
    draftResponse:
      "The school is not currently able to meet this need. We do not commission direct SaLT provision on site. We can deliver a therapist-devised programme via a trained TA, but weekly direct therapy would need to be commissioned by the local authority.",
    evidence: [],
  },
  {
    id: `${prefix}-n4`,
    title: "Access to a quiet workspace for assessments",
    source: "Parental Views, p.2",
    detail:
      "Parents report pupil is unable to complete extended writing tasks in the main classroom due to noise sensitivity.",
    capability: "full",
    domain: "cognition",
    draftResponse:
      "The school can meet this need in full. The learning support base is available for all extended tasks and formal assessments, with a member of support staff present.",
    evidence: [],
  },
  {
    id: `${prefix}-n5`,
    title: "Social communication group (small group, weekly)",
    source: "Educational Psychologist Report, §4.6",
    detail:
      "Pupil would benefit from a structured social communication group of no more than 4 peers, delivered weekly across the school year.",
    capability: "partial",
    domain: "communication",
    draftResponse:
      "The school runs a Lego Therapy group weekly with up to 6 pupils. We can prioritise a place for this pupil, though group size exceeds the recommendation of 4.",
    evidence: ["Lego Therapy — group plan.pdf"],
  },
];

// Compact factory for the historical (already-submitted) seed data used by
// the Reports and Calendar screens. Documents are intentionally omitted —
// aggregates only need pupil/LA/dates/needs.
type HistNeed = [title: string, capability: NeedCapability, domain: NeedDomain];
const hist = (
  id: string,
  pupilRef: string,
  yearGroup: string,
  localAuthority: string,
  caseOfficer: string,
  receivedOn: string,
  submittedOn: string,
  summary: string,
  needs: HistNeed[],
  activityOverride?: ActivityEntry[],
): Consultation => ({
  id,
  pupilRef,
  yearGroup,
  localAuthority,
  caseOfficer,
  receivedOn,
  submittedOn,
  status: "Submitted",
  summary,
  documents: [],
  needs: needs.map(([title, capability, domain], i) => ({
    id: `${id}-n${i + 1}`,
    title,
    source: "Historical record",
    detail: "",
    capability,
    domain,
    draftResponse: "",
    evidence: [],
  })),
  activity: activityOverride ?? [
    actEntry(receivedOn, 9, 15, "received", "Consultation received from " + localAuthority),
    actEntry(addDaysIso(receivedOn, 2), 10, 0, "needs_reviewed", `Confirmed provision against ${needs.length} needs`),
    actEntry(addDaysIso(receivedOn, 4), 11, 30, "draft_started"),
    actEntry(addDaysIso(receivedOn, 6), 15, 0, "draft_edited", "Response text refined across all needs"),
    actEntry(submittedOn, 9, 30, "submitted", `Response sent to ${localAuthority}`),
  ],
});

const seedConsultations: Consultation[] = [

  {
    id: "c-2401",
    pupilRef: "Pupil A",
    yearGroup: "Year 4",
    localAuthority: "Camden LA",
    caseOfficer: "R. Owusu",
    receivedOn: "2026-07-01",
    status: "Reviewing",
    summary:
      "Pupil A (Y4) presents with a specific learning difficulty affecting literacy, alongside emerging sensory processing needs and mild social communication difficulties. The EP identifies four primary areas of need: literacy (decoding & spelling), sensory regulation, expressive language, and peer interaction. All reports converge on the need for structured, low-arousal learning environments and consistent adult support. No safeguarding concerns raised. Parental views align with professional recommendations.",
    documents: [
      { id: "d1", name: "Educational Psychologist Report.pdf", kind: "EP", pages: 18, author: "Dr. M. Alvarez", date: "2026-06-12" },
      { id: "d2", name: "Speech & Language Therapy Report.pdf", kind: "SaLT", pages: 9, author: "J. Patel", date: "2026-06-04" },
      { id: "d3", name: "Occupational Therapy Report.pdf", kind: "OT", pages: 7, author: "S. Nguyen", date: "2026-05-28" },
      { id: "d4", name: "Parental Views.pdf", kind: "Parental", pages: 3, author: "Family", date: "2026-06-20" },
      { id: "d5", name: "School Information Form (Appendix A).pdf", kind: "School", pages: 5, author: "SENCO", date: "2026-06-22" },
      { id: "d6", name: "Local Authority covering letter.pdf", kind: "LA", pages: 2, author: "Camden LA", date: "2026-07-01" },
    ],
    needs: seedNeeds("a"),
  },
  {
    id: "c-2402",
    pupilRef: "Pupil B",
    yearGroup: "Year 7",
    localAuthority: "Hackney LA",
    caseOfficer: "L. Hassan",
    receivedOn: "2026-06-30",
    status: "Drafting",
    summary:
      "Pupil B (Y7) has a diagnosis of ASD with significant anxiety around transitions. Assessment identifies needs across communication, emotional regulation, and access to curriculum. EP recommends a graduated timetable and named key adult.",
    documents: [
      { id: "d1", name: "Educational Psychologist Report.pdf", kind: "EP", pages: 22, author: "Dr. K. Ito", date: "2026-06-01" },
      { id: "d2", name: "CAMHS Letter.pdf", kind: "Health", pages: 2, author: "CAMHS", date: "2026-05-19" },
      { id: "d3", name: "Parental Views.pdf", kind: "Parental", pages: 4, author: "Family", date: "2026-06-18" },
      { id: "d4", name: "School Information Form.pdf", kind: "School", pages: 5, author: "SENCO", date: "2026-06-24" },
    ],
    needs: seedNeeds("b"),
  },
  {
    id: "c-2403",
    pupilRef: "Pupil C",
    yearGroup: "Year 2",
    localAuthority: "Islington LA",
    caseOfficer: "T. Bright",
    receivedOn: "2026-06-24",
    status: "New",
    summary:
      "Pupil C (Y2) — global developmental delay with associated speech and motor needs. Provision to date has been via SEN Support. Reports recommend a step-up to EHCP-level provision including daily fine-motor programme and small-group phonics.",
    documents: [
      { id: "d1", name: "Educational Psychologist Report.pdf", kind: "EP", pages: 14, author: "Dr. F. Ahmed", date: "2026-06-05" },
      { id: "d2", name: "Speech & Language Therapy Report.pdf", kind: "SaLT", pages: 8, author: "H. Green", date: "2026-06-02" },
      { id: "d3", name: "Paediatrician Letter.pdf", kind: "Health", pages: 2, author: "Dr. P. Costa", date: "2026-05-15" },
      { id: "d4", name: "Parental Views.pdf", kind: "Parental", pages: 3, author: "Family", date: "2026-06-17" },
    ],
    needs: seedNeeds("c"),
  },
  {
    id: "c-2404",
    pupilRef: "Pupil D",
    yearGroup: "Year 9",
    localAuthority: "Southwark LA",
    caseOfficer: "M. Reyes",
    receivedOn: "2026-06-18",
    status: "New",
    summary:
      "Pupil D (Y9) — SEMH needs with a history of school avoidance. Reports emphasise the importance of a consistent key adult, low-arousal environment, and a phased reintegration plan.",
    documents: [
      { id: "d1", name: "Educational Psychologist Report.pdf", kind: "EP", pages: 16, author: "Dr. N. Berg", date: "2026-06-08" },
      { id: "d2", name: "CAMHS Report.pdf", kind: "Health", pages: 6, author: "CAMHS", date: "2026-05-30" },
      { id: "d3", name: "Parental Views.pdf", kind: "Parental", pages: 5, author: "Family", date: "2026-06-15" },
      { id: "d4", name: "School Information Form.pdf", kind: "School", pages: 5, author: "SENCO", date: "2026-06-20" },
    ],
    needs: seedNeeds("d"),
  },
  {
    id: "c-2405",
    pupilRef: "Pupil E",
    yearGroup: "Year 5",
    localAuthority: "Lambeth LA",
    caseOfficer: "A. Cole",
    receivedOn: "2026-06-10",
    submittedOn: "2026-07-02",
    status: "Submitted",
    summary:
      "Pupil E (Y5) — moderate learning difficulty with associated speech needs. Response submitted 2 July confirming full provision within existing SEN budget with 6 hours of TA support redirected.",
    documents: [
      { id: "d1", name: "Educational Psychologist Report.pdf", kind: "EP", pages: 15, author: "Dr. R. Lin", date: "2026-05-25" },
      { id: "d2", name: "Speech & Language Therapy Report.pdf", kind: "SaLT", pages: 8, author: "P. Shah", date: "2026-05-22" },
      { id: "d3", name: "Parental Views.pdf", kind: "Parental", pages: 3, author: "Family", date: "2026-06-04" },
    ],
    needs: seedNeeds("e"),
  },
  // ---------- Historical (already-submitted) consultations ----------
  // These power aggregates on Reports and appear in Calendar's "show submitted"
  // toggle and Dashboard's Submitted status filter. Documents omitted by design.
  hist(
    "c-2406", "Pupil F", "Year 3", "Camden LA", "R. Owusu",
    "2026-04-25", "2026-05-08",
    "Pupil F (Y3) — dyslexia and mild sensory processing needs. Response confirmed structured literacy and daily sensory circuit.",
    [
      ["1:1 structured literacy programme, 4×20 min weekly", "full", "cognition"],
      ["Small-group social skills intervention", "partial", "communication"],
      ["Daily sensory circuit before registration", "full", "sensory"],
    ],
  ),
  hist(
    "c-2407", "Pupil G", "Year 6", "Hackney LA", "L. Hassan",
    "2026-05-02", "2026-05-19",
    "Pupil G (Y6) — SEMH with school avoidance. Named key adult and reintegration plan agreed; SaLT input outside school scope.",
    [
      ["Named key adult and daily meet-and-greet", "full", "semh"],
      ["Direct weekly SaLT input, 30 min", "cannot", "communication"],
      ["Precision teaching for number facts, 5×10 min weekly", "full", "cognition"],
    ],
  ),
  hist(
    "c-2408", "Pupil H", "Year 1", "Islington LA", "T. Bright",
    "2026-05-14", "2026-05-27",
    "Pupil H (Y1) — global developmental delay. Fine-motor programme and phonics intervention agreed.",
    [
      ["OT-devised fine-motor programme, 4×15 min weekly", "partial", "sensory"],
      ["Read Write Inc. phonics, 4×20 min weekly", "full", "cognition"],
    ],
  ),
  hist(
    "c-2409", "Pupil I", "Year 8", "Southwark LA", "M. Reyes",
    "2026-05-20", "2026-06-02",
    "Pupil I (Y8) — ASD with anxiety around transitions. Graduated timetable and ELSA sessions agreed.",
    [
      ["ELSA 1:1 sessions, weekly for 6-week blocks", "full", "semh"],
      ["Structured transitions plan with key adult", "partial", "semh"],
      ["Lego Therapy social communication group, weekly", "full", "communication"],
    ],
  ),
  hist(
    "c-2410", "Pupil J", "Year 10", "Lambeth LA", "A. Cole",
    "2026-05-28", "2026-06-12",
    "Pupil J (Y10) — moderate learning difficulty. Exam access arrangements and small-group maths intervention agreed.",
    [
      ["Numicon small-group maths intervention, 3×30 min weekly", "full", "cognition"],
      ["Low-stimulus room for exam access arrangements", "partial", "sensory"],
    ],
  ),
  hist(
    "c-2411", "Pupil K", "Year 5", "Camden LA", "R. Owusu",
    "2026-06-01", "2026-06-20",
    "Pupil K (Y5) — SLCN and specific literacy difficulty. Response late owing to half-term staffing gap. Direct weekly SaLT declined.",
    [
      ["Weekly direct SaLT, 30 min", "cannot", "communication"],
      ["1:1 structured literacy programme, 4×20 min weekly", "full", "cognition"],
      ["Zones of Regulation and named key adult", "partial", "semh"],
    ],
    [
      actEntry("2026-06-01", 9, 15, "received", "Consultation received from Camden LA"),
      actEntry("2026-06-03", 10, 30, "needs_reviewed", "Confirmed provision against 3 needs"),
      actEntry("2026-06-05", 14, 0, "draft_started"),
      actEntry("2026-06-08", 16, 45, "draft_edited", "Draft paused — half-term staffing gap"),
      actEntry("2026-06-19", 15, 30, "draft_edited", "Draft resumed and finalised after half-term"),
      actEntry("2026-06-20", 10, 15, "submitted", "Response sent to Camden LA (5 days late — half-term staffing gap)"),
    ],
  ),
  hist(
    "c-2412", "Pupil L", "Year 2", "Hackney LA", "L. Hassan",
    "2026-06-15", "2026-06-28",
    "Pupil L (Y2) — moderate learning difficulty with fine-motor needs. Full provision agreed within existing SEN budget.",
    [
      ["Precision teaching for spelling, 5×10 min weekly", "full", "cognition"],
      ["OT-devised fine-motor programme, 4×15 min weekly", "full", "sensory"],
    ],
  ),
  hist(
    "c-2413", "Pupil M", "Year 4", "Islington LA", "T. Bright",
    "2026-02-10", "2026-02-24",
    "Pupil M (Y4) — communication and interaction needs alongside emerging SEMH. Full provision agreed.",
    [
      ["1:1 structured literacy programme, 4×20 min weekly", "full", "cognition"],
      ["SaLT-devised individual programme via trained TA, 3×15 min weekly", "full", "communication"],
      ["ELSA 1:1 sessions, weekly for 6-week blocks", "partial", "semh"],
    ],
  ),
  hist(
    "c-2414", "Pupil N", "Year 7", "Southwark LA", "M. Reyes",
    "2026-03-02", "2026-03-20",
    "Pupil N (Y7) — sensory and physical needs; late response owing to LA information gap. OT input outside school scope.",
    [
      ["Weekly on-site OT input, 45 min", "cannot", "sensory"],
      ["Numicon small-group maths intervention, 3×30 min weekly", "partial", "cognition"],
    ],
  ),
  hist(
    "c-2415", "Pupil O", "Year 9", "Camden LA", "R. Owusu",
    "2026-03-15", "2026-03-29",
    "Pupil O (Y9) — SEMH with anxiety-based non-attendance. Reintegration plan and ELSA blocks agreed.",
    [
      ["Named key adult and daily meet-and-greet", "full", "semh"],
      ["Precision teaching for spelling and number facts, 5×10 min weekly", "full", "cognition"],
    ],
  ),
  hist(
    "c-2416", "Pupil P", "Year 6", "Lambeth LA", "A. Cole",
    "2026-05-10", "2026-05-25",
    "Pupil P (Y6) — SLCN with fine-motor needs. Response filed exactly on the statutory deadline day; provision agreed in full within existing SEN budget.",
    [
      ["SaLT-devised individual programme via trained TA, 3×15 min weekly", "full", "communication"],
      ["OT-devised fine-motor programme, 4×15 min weekly", "full", "sensory"],
      ["Precision teaching for spelling, 5×10 min weekly", "partial", "cognition"],
    ],
  ),
];

// Seed activity for active (non-submitted) consultations. Historical entries
// already carry a full trail via hist(). For active ones, seed a minimal
// plausible trail based on current status so the timeline isn't blank on
// first render.
function seedActiveActivity(c: Consultation): ActivityEntry[] {
  if (c.activity && c.activity.length > 0) return c.activity;
  const entries: ActivityEntry[] = [
    actEntry(c.receivedOn, 9, 10, "received", `Consultation received from ${c.localAuthority}`),
  ];
  if (c.status === "Reviewing" || c.status === "Drafting") {
    entries.push(actEntry(addDaysIso(c.receivedOn, 1), 11, 20, "document_opened", "Reviewed received reports"));
    entries.push(actEntry(addDaysIso(c.receivedOn, 2), 14, 45, "needs_reviewed", `Confirmed provision against ${c.needs.length} needs`));
  }
  if (c.status === "Drafting") {
    entries.push(actEntry(addDaysIso(c.receivedOn, 3), 10, 15, "draft_started"));
  }
  return entries;
}

const seedNormalised: Consultation[] = seedConsultations.map((c) => ({
  ...c,
  activity: seedActiveActivity(c),
}));

// Dedup window: repeated same (action, detail) within 10 min collapses into
// a single entry with updated timestamp — avoids per-keystroke spam.
const DEDUP_MS = 10 * 60 * 1000;

function appendActivity(list: ActivityEntry[], entry: Omit<ActivityEntry, "id" | "timestamp"> & { timestamp?: string }): ActivityEntry[] {
  const timestamp = entry.timestamp ?? new Date().toISOString();
  const last = list[list.length - 1];
  if (
    last &&
    last.action === entry.action &&
    (last.detail ?? "") === (entry.detail ?? "") &&
    new Date(timestamp).getTime() - new Date(last.timestamp).getTime() < DEDUP_MS
  ) {
    // Coalesce: update timestamp on last entry
    return [...list.slice(0, -1), { ...last, timestamp }];
  }
  __actSeq += 1;
  return [
    ...list,
    { id: `act-${Date.now()}-${__actSeq}`, timestamp, action: entry.action, detail: entry.detail },
  ];
}

type Ctx = {
  consultations: Consultation[];
  get: (id: string) => Consultation | undefined;
  setStatus: (id: string, status: ConsultationStatus) => void;
  setCapability: (id: string, needId: string, capability: NeedCapability) => void;
  setDraftResponse: (id: string, needId: string, text: string) => void;
  setCannotRationale: (id: string, needId: string, text: string) => void;
  addEvidence: (id: string, needId: string, filename: string) => void;
  removeEvidence: (id: string, needId: string, filename: string) => void;
  logActivity: (id: string, action: ActivityAction, detail?: string) => void;
};

const ConsultationsContext = createContext<Ctx | null>(null);

export function ConsultationsProvider({ children }: { children: ReactNode }) {
  const [consultations, setConsultations] = useState<Consultation[]>(seedNormalised);

  const withActivity = useCallback(
    (id: string, action: ActivityAction, detail?: string) =>
      setConsultations((cs) =>
        cs.map((c) =>
          c.id === id ? { ...c, activity: appendActivity(c.activity ?? [], { action, detail }) } : c,
        ),
      ),
    [],
  );

  const value = useMemo<Ctx>(
    () => ({
      consultations,
      get: (id) => consultations.find((c) => c.id === id),
      setStatus: (id, status) => {
        setConsultations((cs) => cs.map((c) => (c.id === id ? { ...c, status } : c)));
        if (status === "Submitted") {
          withActivity(id, "submitted", "Response sent");
        }
      },
      setCapability: (id, needId, capability) =>
        setConsultations((cs) =>
          cs.map((c) =>
            c.id === id
              ? {
                  ...c,
                  needs: c.needs.map((n) => (n.id === needId ? { ...n, capability } : n)),
                }
              : c,
          ),
        ),
      setDraftResponse: (id, needId, text) => {
        setConsultations((cs) =>
          cs.map((c) => {
            if (c.id !== id) return c;
            const need = c.needs.find((n) => n.id === needId);
            const wasEmpty = !need || need.draftResponse.trim().length === 0;
            const nextActivityAction: ActivityAction = wasEmpty && text.trim().length > 0 ? "draft_started" : "draft_edited";
            const detail = need ? `“${truncate(need.title, 60)}”` : undefined;
            return {
              ...c,
              needs: c.needs.map((n) => (n.id === needId ? { ...n, draftResponse: text } : n)),
              activity: appendActivity(c.activity ?? [], { action: nextActivityAction, detail }),
            };
          }),
        );
      },
      addEvidence: (id, needId, filename) => {
        setConsultations((cs) =>
          cs.map((c) => {
            if (c.id !== id) return c;
            const need = c.needs.find((n) => n.id === needId);
            if (!need || need.evidence.includes(filename)) return c;
            return {
              ...c,
              needs: c.needs.map((n) =>
                n.id === needId ? { ...n, evidence: [...n.evidence, filename] } : n,
              ),
              activity: appendActivity(c.activity ?? [], {
                action: "evidence_attached",
                detail: `${filename} → “${truncate(need.title, 50)}”`,
              }),
            };
          }),
        );
      },
      removeEvidence: (id, needId, filename) =>
        setConsultations((cs) =>
          cs.map((c) =>
            c.id === id
              ? {
                  ...c,
                  needs: c.needs.map((n) =>
                    n.id === needId
                      ? { ...n, evidence: n.evidence.filter((e) => e !== filename) }
                      : n,
                  ),
                }
              : c,
          ),
        ),
      logActivity: (id, action, detail) => withActivity(id, action, detail),
    }),
    [consultations, withActivity],
  );

  return <ConsultationsContext.Provider value={value}>{children}</ConsultationsContext.Provider>;
}

function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

export function useConsultations() {
  const ctx = useContext(ConsultationsContext);
  if (!ctx) throw new Error("useConsultations must be used within ConsultationsProvider");
  return ctx;
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function formatDateTime(iso: string) {
  const d = new Date(iso);
  const dateOpts: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" };
  const timeOpts: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "UTC" };
  return `${d.toLocaleDateString("en-GB", dateOpts)}, ${d.toLocaleTimeString("en-GB", timeOpts)}`;
}

export function deadlineTone(days: number): "urgent" | "warn" | "ok" {
  if (days <= 2) return "urgent";
  if (days <= 5) return "warn";
  return "ok";
}

// ---------- "This term" boundary ----------
// The current academic term is the UK summer term 2026. Start date is the
// Monday after the Easter break. Reports and the Dashboard's "Submitted this
// term" stat share this single definition.
export const TERM_START_ISO = "2026-04-20";

export function isThisTerm(iso: string): boolean {
  return iso >= TERM_START_ISO;
}
