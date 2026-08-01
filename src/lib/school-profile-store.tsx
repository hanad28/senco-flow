import { createContext, useContext, useMemo, type ReactNode } from "react";
import { usePersistentSnapshot } from "./use-persistent-snapshot";

export type NeedDomain =
  | "communication"
  | "cognition"
  | "semh"
  | "sensory";

export const domainLabel: Record<NeedDomain, string> = {
  communication: "Communication and Interaction",
  cognition: "Cognition and Learning",
  semh: "Social, Emotional and Mental Health",
  sensory: "Sensory and/or Physical",
};

export const domainOrder: NeedDomain[] = [
  "communication",
  "cognition",
  "semh",
  "sensory",
];

export type ProvisionItem = {
  id: string;
  description: string;
};

export type SpecialistStaff = {
  id: string;
  role: string;
  arrangement: "in-house" | "external";
  detail: string;
};

export type ResponseStyle = "formal" | "plain";

export type SchoolProfile = {
  schoolName: string;
  schoolAddress: string;
  sendcoName: string;
  sendcoRole: string;
  provision: Record<NeedDomain, ProvisionItem[]>;
  cohort: Record<NeedDomain, number>;
  staffing: {
    taCount: number;
    typicalGroupSize: string;
    sensorySpace: string;
  };
  specialists: SpecialistStaff[];
  responseStyle: ResponseStyle;
};

const uid = (p: string) => `${p}-${Math.random().toString(36).slice(2, 8)}`;

export const seedSchoolProfile: SchoolProfile = {
  schoolName: "Millbrook Primary",
  schoolAddress: "14 Willow Lane, London N1 4AA",
  sendcoName: "S. Ahmed",
  sendcoRole: "Assistant Head Teacher & SENDCO",
  provision: {
    communication: [
      {
        id: uid("p"),
        description:
          "Lego Therapy social communication group, delivered weekly by trained TA, up to 6 pupils per group, 45 min sessions across the school year.",
      },
      {
        id: uid("p"),
        description:
          "SaLT-devised individual programme delivered by trained TA, 3×15 min per week, reviewed termly by commissioned SaLT.",
      },
      {
        id: uid("p"),
        description:
          "Visual timetables and now/next boards available across all classrooms; key-adult check-ins twice daily for named pupils.",
      },
    ],
    cognition: [
      {
        id: uid("p"),
        description:
          "Read Write Inc. structured literacy programme, delivered 1:1 by trained TA, 4×20 min sessions per week, tracked half-termly against reading age.",
      },
      {
        id: uid("p"),
        description:
          "Numicon small-group maths intervention, 1:4 with trained TA, 3×30 min per week.",
      },
      {
        id: uid("p"),
        description:
          "Precision teaching for spelling and number facts, 1:1 with TA, 5×10 min per week.",
      },
    ],
    semh: [
      {
        id: uid("p"),
        description:
          "ELSA (Emotional Literacy Support Assistant) 1:1 sessions, 1×30 min per week over 6-week blocks, delivered by accredited ELSA-trained TA.",
      },
      {
        id: uid("p"),
        description:
          "Drawing and Talking therapy, 1:1 with trained practitioner, 1×30 min per week for 12 weeks.",
      },
      {
        id: uid("p"),
        description:
          "Zones of Regulation embedded across KS1 and KS2; named key adult and daily meet-and-greet for identified pupils.",
      },
    ],
    sensory: [
      {
        id: uid("p"),
        description:
          "Daily sensory circuit (10 min) before morning registration, delivered in the hall by TA team, up to 8 pupils.",
      },
      {
        id: uid("p"),
        description:
          "Low-stimulus room available on request throughout the day; ear defenders, wobble cushions and fidget tools in every classroom.",
      },
      {
        id: uid("p"),
        description:
          "OT-devised fine-motor programme (Write from the Start), 1:1 or 1:2 with TA, 4×15 min per week.",
      },
    ],
  },
  cohort: {
    communication: 6,
    cognition: 11,
    semh: 8,
    sensory: 4,
  },
  staffing: {
    taCount: 12,
    typicalGroupSize: "1:1 to 1:4 for intervention; 1:6 for small-group",
    sensorySpace: "One dedicated low-stimulus room; sensory circuit set up daily in the hall",
  },
  specialists: [
    { id: uid("s"), role: "SENDCO", arrangement: "in-house", detail: "0.6 FTE, NASENCO qualified" },
    { id: uid("s"), role: "ELSA-trained TAs", arrangement: "in-house", detail: "2 practitioners" },
    { id: uid("s"), role: "Speech & Language Therapist", arrangement: "external", detail: "Commissioned 0.5 day/week via NHS trust" },
    { id: uid("s"), role: "Educational Psychologist", arrangement: "external", detail: "Traded service, 6 days/year" },
    { id: uid("s"), role: "Occupational Therapist", arrangement: "external", detail: "Commissioned per-pupil as required" },
  ],
  responseStyle: "formal",
};

type Ctx = {
  profile: SchoolProfile;
  update: (patch: Partial<SchoolProfile>) => void;
  updateStaffing: (patch: Partial<SchoolProfile["staffing"]>) => void;
  setCohort: (d: NeedDomain, n: number) => void;
  addProvision: (d: NeedDomain) => void;
  updateProvision: (d: NeedDomain, id: string, description: string) => void;
  removeProvision: (d: NeedDomain, id: string) => void;
  addSpecialist: () => void;
  updateSpecialist: (id: string, patch: Partial<SpecialistStaff>) => void;
  removeSpecialist: (id: string) => void;
};

const SchoolProfileContext = createContext<Ctx | null>(null);

export function SchoolProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = usePersistentSnapshot<SchoolProfile>(
    "schoolProfile",
    seedSchoolProfile,
  );

  const value = useMemo<Ctx>(
    () => ({
      profile,
      update: (patch) => setProfile((p) => ({ ...p, ...patch })),
      updateStaffing: (patch) =>
        setProfile((p) => ({ ...p, staffing: { ...p.staffing, ...patch } })),
      setCohort: (d, n) =>
        setProfile((p) => ({ ...p, cohort: { ...p.cohort, [d]: n } })),
      addProvision: (d) =>
        setProfile((p) => ({
          ...p,
          provision: {
            ...p.provision,
            [d]: [...p.provision[d], { id: uid("p"), description: "" }],
          },
        })),
      updateProvision: (d, id, description) =>
        setProfile((p) => ({
          ...p,
          provision: {
            ...p.provision,
            [d]: p.provision[d].map((it) => (it.id === id ? { ...it, description } : it)),
          },
        })),
      removeProvision: (d, id) =>
        setProfile((p) => ({
          ...p,
          provision: {
            ...p.provision,
            [d]: p.provision[d].filter((it) => it.id !== id),
          },
        })),
      addSpecialist: () =>
        setProfile((p) => ({
          ...p,
          specialists: [
            ...p.specialists,
            { id: uid("s"), role: "", arrangement: "in-house", detail: "" },
          ],
        })),
      updateSpecialist: (id, patch) =>
        setProfile((p) => ({
          ...p,
          specialists: p.specialists.map((s) => (s.id === id ? { ...s, ...patch } : s)),
        })),
      removeSpecialist: (id) =>
        setProfile((p) => ({ ...p, specialists: p.specialists.filter((s) => s.id !== id) })),
    }),
    [profile, setProfile],
  );

  return (
    <SchoolProfileContext.Provider value={value}>{children}</SchoolProfileContext.Provider>
  );
}

export function useSchoolProfile() {
  const ctx = useContext(SchoolProfileContext);
  if (!ctx) throw new Error("useSchoolProfile must be used within SchoolProfileProvider");
  return ctx;
}
