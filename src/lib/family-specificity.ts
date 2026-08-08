/** Flag-and-cite helpers for vague provision wording. Never invents replacement hours or staffing. */

const VAGUE_PHRASES: { phrase: RegExp; label: string }[] = [
  { phrase: /\baccess to\b/i, label: "access to" },
  { phrase: /\bregular\b/i, label: "regular" },
  { phrase: /\bas appropriate\b/i, label: "as appropriate" },
  { phrase: /\bas needed\b/i, label: "as needed" },
  { phrase: /\bwhen required\b/i, label: "when required" },
];

/** What the Code of Practice expects provision to specify. */
export const PROVISION_SPECIFICITY_STANDARD = [
  "frequency",
  "duration",
  "who delivers it",
  "training required",
  "group size (if relevant)",
] as const;

export type VagueFlag = {
  phrases: string[];
  missing: readonly string[];
  standardNote: string;
};

export function flagVagueProvision(wording: string): VagueFlag | null {
  const phrases = VAGUE_PHRASES.filter((v) => v.phrase.test(wording)).map((v) => v.label);
  if (phrases.length === 0) return null;
  return {
    phrases: [...new Set(phrases)],
    missing: PROVISION_SPECIFICITY_STANDARD,
    standardNote:
      "SEND Code of Practice: provision should be specific and quantified so it is clear what will be provided.",
  };
}
