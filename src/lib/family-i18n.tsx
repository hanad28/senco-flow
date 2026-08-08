// Family workspace i18n. Central dictionaries with English fallback,
// language + direction persisted in localStorage as a non-sensitive UI
// preference. Reads storage in useEffect to avoid SSR hydration mismatches.

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type FamilyLang = "en" | "ar" | "ur" | "bn" | "so";

export type LangMeta = {
  code: FamilyLang;
  englishName: string;
  nativeName: string;
  dir: "ltr" | "rtl";
  locale: string;
};

export const FAMILY_LANGS: LangMeta[] = [
  { code: "en", englishName: "English", nativeName: "English", dir: "ltr", locale: "en-GB" },
  { code: "ar", englishName: "Arabic", nativeName: "العربية", dir: "rtl", locale: "ar" },
  { code: "ur", englishName: "Urdu", nativeName: "اردو", dir: "rtl", locale: "ur" },
  { code: "bn", englishName: "Bengali", nativeName: "বাংলা", dir: "ltr", locale: "bn" },
  { code: "so", englishName: "Somali", nativeName: "Soomaali", dir: "ltr", locale: "so" },
];

const DICT_EN: Record<string, string> = {
  // Nav
  "nav.home": "Home",
  "nav.case": "Maya's case",
  "nav.plan": "Plan review",
  "nav.issues": "Issues to address",
  "nav.assistant": "Ask about the plan",
  "nav.response": "My response",
  "nav.documents": "Documents",
  "nav.support": "Support network",
  "nav.help": "Help and guidance",

  // Workspace
  "workspace.switch": "Switch workspace",
  "workspace.school": "School workspace",
  "workspace.family": "Family workspace",

  // Dashboard
  "dash.greeting": "Good afternoon, Jordan",
  "dash.subtitle": "Review Maya's draft EHC plan and prepare your response before the deadline.",
  "dash.tracker": "Where you are",
  "dash.stage.received": "Draft received",
  "dash.stage.review": "Review the plan",
  "dash.stage.changes": "Record requested changes",
  "dash.stage.prepare": "Prepare your response",
  "dash.stage.issued": "Final plan issued",
  "dash.tasks": "Things to do",
  "dash.task.reviewIssues": "Review four highlighted issues",
  "dash.task.addViews": "Add Maya's views and aspirations",
  "dash.task.checkAdvice": "Check that professional recommendations appear in the draft",
  "dash.task.placement": "Record a preferred school or type of setting",
  "dash.task.reviewResponse": "Review the response before export",
  "dash.primary": "Continue plan review",
  "dash.secondary": "Ask a question about the plan",
  "dash.aiSummary": "Five source documents reviewed in this fictional demonstration. Four areas may need your attention.",

  // Common
  "common.demoBanner":
    "Demo workspace - fictional data only. Signed-in edits save a cloud snapshot; do not enter real children’s information.",
  "common.aiDisclosure": "AI demonstration - answers use fictional seeded documents and do not constitute legal advice.",
  "common.translationDisclosure": "AI-assisted translation - check important wording before relying on it.",
  "common.explainInMyLanguage": "Explain in my language",
  "common.showOriginalEnglish": "Show original English",
  "common.notYet": "Not yet recorded",
  "common.deadline": "Response deadline",
  "common.daysLeft": "days remaining",
  "common.viewSource": "View source",
  "common.next": "Next",
  "common.back": "Back",
  "common.save": "Save",
  "common.cancel": "Cancel",
  "common.close": "Close",
  "common.resetDemo": "Reset family demo",
  "common.resetDemoConfirm": "Restore Maya's demo case to its original state? Your notes, amendments and preferences will be cleared.",
  "common.language": "Language",

  // Status
  "status.reviewed": "Reviewed",
  "status.needsAttention": "Needs attention",
  "status.notYetReviewed": "Not yet reviewed",
  "status.notApplicable": "Not applicable",
  "status.expectedBlank": "Expected to be blank in draft",

  // Plan
  "plan.title": "Plan review",
  "plan.caveat": "Needs often span more than one domain. Review each section together with the professional advice it draws on.",

  // Issue statuses
  "issue.status.notStarted": "Not started",
  "issue.status.drafted": "Drafted",
  "issue.status.ready": "Ready to include",
  "issue.status.dismissed": "Dismissed by family",
  "issue.restore": "Restore",
  "issue.dismiss": "Dismiss",
  "issue.markReady": "Mark ready to include",
  "issue.markDrafted": "Mark as drafted",

  // Assistant
  "assistant.title": "Ask about Maya's plan",
  "assistant.subtitle": "Get plain-language explanations grounded in Maya's fictional case documents and verified SEND guidance.",
  "assistant.suggested": "Try asking",
  "assistant.placeholder": "Ask a question about Maya's plan…",
  "assistant.send": "Ask",
  "assistant.clear": "Clear demo conversation",
  "assistant.fallback": "I could not find enough information in the fictional documents to answer that reliably. Consider checking the source reports or asking the local authority or an independent adviser.",
  "assistant.sourceCase": "From Maya's documents",
  "assistant.sourceGuidance": "From general SEND guidance",
  "assistant.addToIssues": "Add as an issue to review",

  // Response
  "response.title": "My response",
  "response.viewEnglish": "English formal response",
  "response.viewFamily": "Family-language working view",
  "response.viewBilingual": "Side-by-side",
  "response.markReady": "Mark as ready to send",
  "response.download.en": "Download English Word response",
  "response.download.bi": "Download bilingual family copy",
  "response.print": "Print",
  "response.saveDraft": "Save draft",
  "response.preview": "Preview",
  "response.readiness": "Response readiness",

  // Confirmation
  "confirm.ready": "Your response is ready",
  "confirm.notSent": "Nothing has been sent by this demonstration.",
  "confirm.returnHome": "Return to your dashboard",
};

// Sample native translations for headline nav + banners so language toggle is
// visibly effective without shipping ~150 duplicated strings. Missing keys
// fall back to English; use <Tx /> (or isFallback) so fallbacks are labelled.
const DICT_AR: Record<string, string> = {
  "nav.home": "الرئيسية",
  "nav.case": "قضية مايا",
  "nav.plan": "مراجعة الخطة",
  "nav.issues": "المسائل الواجب معالجتها",
  "nav.assistant": "اسأل عن الخطة",
  "nav.response": "ردّي",
  "nav.documents": "المستندات",
  "nav.support": "شبكة الدعم",
  "nav.help": "المساعدة والإرشاد",
  "workspace.switch": "تبديل مساحة العمل",
  "workspace.school": "مساحة المدرسة",
  "workspace.family": "مساحة الأسرة",
  "dash.greeting": "مساء الخير يا جوردان",
  "dash.subtitle": "راجع مسودة خطة EHC الخاصة بمايا وأعدّ ردك قبل الموعد النهائي.",
  "dash.primary": "متابعة مراجعة الخطة",
  "dash.secondary": "اطرح سؤالاً حول الخطة",
  "common.demoBanner": "مساحة عمل تجريبية — جميع الأسماء والمستندات خيالية.",
  "common.aiDisclosure": "عرض توضيحي للذكاء الاصطناعي — الإجابات تستند إلى مستندات خيالية ولا تشكل استشارة قانونية.",
  "common.explainInMyLanguage": "اشرح بلغتي",
  "common.showOriginalEnglish": "عرض النص الإنجليزي الأصلي",
  "common.language": "اللغة",
};
const DICT_UR: Record<string, string> = {
  "nav.home": "ہوم",
  "nav.case": "مایا کا کیس",
  "nav.plan": "پلان کا جائزہ",
  "nav.issues": "قابل توجہ مسائل",
  "nav.assistant": "پلان کے بارے میں پوچھیں",
  "nav.response": "میرا جواب",
  "nav.documents": "دستاویزات",
  "nav.support": "معاون نیٹ ورک",
  "nav.help": "مدد اور رہنمائی",
  "workspace.family": "خاندانی ورک اسپیس",
  "dash.greeting": "شام بخیر، جارڈن",
  "dash.subtitle": "مایا کے مسودہ EHC پلان کا جائزہ لیں اور آخری تاریخ سے پہلے اپنا جواب تیار کریں۔",
  "common.demoBanner": "ڈیمو ورک اسپیس — تمام نام اور دستاویزات فرضی ہیں۔",
  "common.language": "زبان",
};
const DICT_BN: Record<string, string> = {
  "nav.home": "হোম",
  "nav.case": "মায়ার কেস",
  "nav.plan": "প্ল্যান পর্যালোচনা",
  "nav.issues": "মনোযোগ প্রয়োজন",
  "nav.assistant": "প্ল্যান সম্পর্কে জিজ্ঞাসা",
  "nav.response": "আমার প্রতিক্রিয়া",
  "nav.documents": "নথিপত্র",
  "nav.support": "সহায়তা নেটওয়ার্ক",
  "nav.help": "সাহায্য ও নির্দেশনা",
  "workspace.family": "পরিবার ওয়ার্কস্পেস",
  "dash.greeting": "শুভ অপরাহ্ণ, জর্ডান",
  "dash.subtitle": "মায়ার খসড়া EHC প্ল্যান পর্যালোচনা করুন এবং সময়সীমার আগে আপনার প্রতিক্রিয়া প্রস্তুত করুন।",
  "common.demoBanner": "ডেমো ওয়ার্কস্পেস — সব নাম ও নথি কাল্পনিক।",
  "common.language": "ভাষা",
};
const DICT_SO: Record<string, string> = {
  "nav.home": "Bogga hore",
  "nav.case": "Kiiska Maya",
  "nav.plan": "Dib-u-eegista qorshaha",
  "nav.issues": "Arrimaha loo baahan yahay in la eego",
  "nav.assistant": "Weydii qorshaha",
  "nav.response": "Jawaabtayda",
  "nav.documents": "Dukumentiyada",
  "nav.support": "Shabakadda taageerada",
  "nav.help": "Caawimo iyo hagitaan",
  "workspace.family": "Meesha shaqada qoyska",
  "dash.greeting": "Galab wanaagsan, Jordan",
  "dash.subtitle": "Dib u eeg qorshaha EHC ee Maya oo diyaari jawaabtaada ka hor waqtiga kama danbaysta ah.",
  "common.demoBanner": "Meel shaqo tijaabo ah — dhammaan magacyada iyo dukumentiyada waa khayaali.",
  "common.language": "Luuqad",
};

const DICTS: Record<FamilyLang, Record<string, string>> = {
  en: DICT_EN,
  ar: DICT_AR,
  ur: DICT_UR,
  bn: DICT_BN,
  so: DICT_SO,
};

type Ctx = {
  lang: FamilyLang;
  meta: LangMeta;
  setLang: (l: FamilyLang) => void;
  t: (key: string, fallback?: string) => string;
  isFallback: (key: string) => boolean;
  formatDate: (iso: string) => string;
};

const FamilyI18nCtx = createContext<Ctx | null>(null);
const STORAGE_KEY = "family.lang";

export function FamilyI18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<FamilyLang>("en");

  // Read persisted preference after mount only (SSR-safe).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw && FAMILY_LANGS.some((l) => l.code === raw)) {
        setLangState(raw as FamilyLang);
      }
    } catch {
      // ignore
    }
  }, []);

  // Sync dir on the family workspace root via effect (see FamilyShell).
  const meta = useMemo(() => FAMILY_LANGS.find((l) => l.code === lang) ?? FAMILY_LANGS[0], [lang]);

  const setLang = useCallback((l: FamilyLang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
  }, []);

  const t = useCallback(
    (key: string, fallback?: string) => {
      const d = DICTS[lang];
      if (d && key in d) return d[key];
      if (key in DICT_EN) return DICT_EN[key];
      return fallback ?? key;
    },
    [lang],
  );

  const isFallback = useCallback(
    (key: string) => lang !== "en" && !(key in DICTS[lang]) && key in DICT_EN,
    [lang],
  );

  const formatDate = useCallback(
    (iso: string) => {
      try {
        return new Intl.DateTimeFormat(meta.locale, { day: "numeric", month: "long", year: "numeric" }).format(
          new Date(iso + "T00:00:00Z"),
        );
      } catch {
        return iso;
      }
    },
    [meta.locale],
  );

  const value: Ctx = { lang, meta, setLang, t, isFallback, formatDate };
  return <FamilyI18nCtx.Provider value={value}>{children}</FamilyI18nCtx.Provider>;
}

export function useFamilyI18n(): Ctx {
  const ctx = useContext(FamilyI18nCtx);
  if (!ctx) throw new Error("useFamilyI18n must be used inside FamilyI18nProvider");
  return ctx;
}

/** Renders a dictionary string and marks silent English fallbacks. */
export function Tx({ k, className }: { k: string; className?: string }) {
  const { t, isFallback } = useFamilyI18n();
  const fallback = isFallback(k);
  return (
    <span className={className} data-i18n-fallback={fallback ? "true" : undefined}>
      {t(k)}
      {fallback ? (
        <span
          className="ms-1 align-super text-[9px] font-medium tracking-wide text-muted-foreground"
          title="Shown in English — translation not yet available"
        >
          EN
        </span>
      ) : null}
    </span>
  );
}
