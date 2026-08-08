// Mock RAG provider for the Family workspace demo. Deterministic keyword
// matching against a small library of seeded answers. A real LLM/RAG
// implementation would plug in behind the same FamilyAiProvider shape.

import type { AssistantMsg, FamilyCase } from "./family-case-store";
import type { FamilyLang } from "./family-i18n";

export type FamilyAiResponse = Omit<AssistantMsg, "id" | "role" | "lang"> & {
  text: string;
  originalEnglish: string;
};

export interface FamilyAiProvider {
  ask(question: string, ctx: { lang: FamilyLang; state: FamilyCase }): FamilyAiResponse;
}

type Seed = {
  match: RegExp;
  englishAnswer: string;
  citations: NonNullable<AssistantMsg["citations"]>;
  confidence: "high" | "medium" | "low";
  limitations: string;
  suggestedAction?: string;
  translations?: Partial<Record<FamilyLang, string>>;
};

const SEEDS: Seed[] = [
  {
    match: /educational psycholog|EP\b|psycholog/i,
    englishAnswer:
      "The educational psychologist, Dr Priya Shah, recommends individual 1:1 support for new vocabulary and structured chunking of multi-step instructions. This recommendation is on pages 3 and 6 of the EP advice.",
    citations: [
      { id: "c1", label: "Educational Psychology Advice", kind: "case_document", docId: "doc-ep", page: 3, extract: "Maya presents with receptive-language difficulties, particularly with multi-step instructions." },
      { id: "c2", label: "Educational Psychology Advice", kind: "case_document", docId: "doc-ep", page: 6, extract: "Individual, low-arousal 1:1 support is recommended for new vocabulary." },
    ],
    confidence: "high",
    limitations: "Based on Dr Shah's report only. Compare with the SaLT report for full picture.",
    suggestedAction: "Ask the local authority to confirm that specific provision addresses each EP recommendation.",
    translations: {
      ar: "توصي الأخصائية النفسية التربوية الدكتورة بريا شاه بدعم فردي 1:1 للمفردات الجديدة وتقسيم التعليمات متعددة الخطوات.",
    },
  },
  {
    match: /section f.*section b|section b.*section f|address every need|every need/i,
    englishAnswer:
      "Four of the five needs identified in Section B have some matching provision in Section F, but one need — difficulty processing multi-step verbal instructions — does not appear to have specific corresponding provision.",
    citations: [
      { id: "c1", label: "Draft EHC Plan", kind: "case_document", docId: "doc-draft", page: 4, extract: "Maya has difficulty processing multi-step verbal instructions in the classroom." },
      { id: "c2", label: "SEND Code of Practice", kind: "verified_guidance", extract: "Provision in Section F should be specified in terms of type, hours and frequency." },
    ],
    confidence: "high",
    limitations: "Automatic matching only. Open Plan review → Needs and provision (B ↔ F) to check each pairing against Section F.",
    suggestedAction: "Add the missing-provision issue to your response.",
  },
  {
    match: /individual support|1:1|one to one|one-to-one/i,
    englishAnswer:
      "Individual 1:1 support for Maya is referenced in the Educational Psychology advice (page 6) and implied by the SaLT weekly 1:1 language sessions (page 4).",
    citations: [
      { id: "c1", label: "Educational Psychology Advice", kind: "case_document", docId: "doc-ep", page: 6, extract: "Individual, low-arousal 1:1 support is recommended for new vocabulary." },
      { id: "c2", label: "Speech and Language Therapy Report", kind: "case_document", docId: "doc-salt", page: 4, extract: "Weekly 1:1 language sessions with trained TA, supervised termly by SaLT." },
    ],
    confidence: "high",
    limitations: "The current draft does not yet specify frequency for the 1:1 language sessions.",
  },
  {
    match: /missing|omit|gap|not reflected|not included/i,
    englishAnswer:
      "Two areas appear to be missing or under-specified: pre-teaching of key vocabulary (recommended by SaLT but not in Section F) and a clearly measurable outcome for communication in Section E.",
    citations: [
      { id: "c1", label: "Speech and Language Therapy Report", kind: "case_document", docId: "doc-salt", page: 2, extract: "Recommend a visual timetable and pre-teaching of key vocabulary before lessons." },
      { id: "c2", label: "SEND Code of Practice", kind: "verified_guidance", extract: "Outcomes should be SMART: specific, measurable, achievable, realistic and time-bound." },
    ],
    confidence: "medium",
    limitations: "This is a deterministic check, not a legal assessment.",
    suggestedAction: "Review the Issues screen and mark items you want to include in your response.",
  },
  {
    match: /explain section f|section f in/i,
    englishAnswer:
      "Section F sets out the special educational provision the local authority must arrange for Maya. It should describe the support in terms of type, frequency, duration, who delivers it and any training required.",
    citations: [{ id: "c1", label: "SEND Code of Practice: 0 to 25 years", kind: "verified_guidance", extract: "Provision must be specified so that it is clear what will be provided." }],
    confidence: "high",
    limitations: "General guidance — please read alongside your child's own draft.",
  },
  {
    match: /communication outcome|section e|why.*flag/i,
    englishAnswer:
      "The communication outcome — 'Maya will improve her communication skills' — is flagged because it does not specify how progress will be measured or by when. Outcomes should be SMART.",
    citations: [
      { id: "c1", label: "Draft EHC Plan", kind: "case_document", docId: "doc-draft", page: 18, extract: "Maya will improve her communication skills." },
      { id: "c2", label: "SEND Code of Practice", kind: "verified_guidance", extract: "Outcomes should be SMART: specific, measurable, achievable, realistic and time-bound." },
    ],
    confidence: "high",
    limitations: "You may want to ask the SaLT to help write a measurable version.",
    suggestedAction: "Propose a measurable version of this outcome from the Section E card.",
  },
  {
    match: /clarify|ask the local authority|ask the la/i,
    englishAnswer:
      "Consider asking Camden to (1) confirm whether Occupational Therapy advice was obtained and considered, (2) specify the frequency and duration of adult support in Section F, and (3) add pre-teaching of vocabulary in line with SaLT advice.",
    citations: [
      { id: "c1", label: "Draft EHC Plan", kind: "case_document", docId: "doc-draft", page: 24, extract: "Occupational Therapy advice is referenced for handwriting support." },
      { id: "c2", label: "Speech and Language Therapy Report", kind: "case_document", docId: "doc-salt", page: 2 },
    ],
    confidence: "medium",
    limitations: "Not legal advice. IPSEA and SENDIASS can help you phrase requests formally.",
  },
];

const FALLBACK_EN =
  "I could not find enough information in the fictional documents to answer that reliably. Consider checking the source reports or asking the local authority or an independent adviser.";

const FALLBACK_TR: Partial<Record<FamilyLang, string>> = {
  ar: "لم أجد معلومات كافية في المستندات الخيالية للإجابة على هذا بشكل موثوق. يُنصح بمراجعة التقارير المصدرية أو استشارة السلطة المحلية أو مستشار مستقل.",
  ur: "میں فرضی دستاویزات میں اس کا قابل اعتماد جواب دینے کے لیے کافی معلومات نہیں پایا۔",
  bn: "নির্ভরযোগ্যভাবে উত্তর দেওয়ার জন্য কাল্পনিক নথিতে যথেষ্ট তথ্য পাইনি।",
  so: "Kuma helin macluumaad ku filan si aan si isku halayn leh ugu jawaabo.",
};

export const mockFamilyAi: FamilyAiProvider = {
  ask(question, { lang }) {
    const seed = SEEDS.find((s) => s.match.test(question));
    if (!seed) {
      return {
        text: FALLBACK_TR[lang] ?? FALLBACK_EN,
        originalEnglish: FALLBACK_EN,
        citations: [],
        confidence: "low",
        limitations: "No matching source found in the fictional demo library.",
      };
    }
    const translated = seed.translations?.[lang];
    return {
      text: translated ?? seed.englishAnswer,
      originalEnglish: seed.englishAnswer,
      citations: seed.citations,
      confidence: seed.confidence,
      limitations: seed.limitations,
      suggestedAction: seed.suggestedAction,
    };
  },
};
