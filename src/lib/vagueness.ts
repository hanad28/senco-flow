// Vagueness detection for Section F draft responses.
// Flags phrases that are too imprecise to be enforceable — SENCOs are prompted
// to state type, frequency, duration and who delivers the provision.

export type VaguenessMatch = {
  start: number;
  end: number;
  phrase: string;
  rule: string;
};

// Order matters: longer phrases first so "a high level of" wins over "of".
const RULES: { pattern: RegExp; rule: string }[] = [
  { pattern: /\bwould benefit from\b/gi, rule: "would benefit from" },
  { pattern: /\ba high level of\b/gi, rule: "a high level of" },
  { pattern: /\bopportunities for\b/gi, rule: "opportunities for" },
  { pattern: /\bis recommended\b/gi, rule: "is recommended" },
  { pattern: /\bas appropriate\b/gi, rule: "as appropriate" },
  { pattern: /\baccess to\b/gi, rule: "access to" },
  // "regular" only when it isn't followed (within ~30 chars) by a digit or a
  // specific frequency word — e.g. "regular 20-minute" or "regular weekly" is fine.
  {
    pattern: /\bregular\b(?!\s+(?:\d|weekly|daily|termly|fortnightly|monthly|hourly|per\b))/gi,
    rule: "regular (no frequency given)",
  },
];

export const VAGUENESS_EXPLANATION =
  "This wording isn't specific enough to be enforceable in Section F. Provision should state type, frequency, duration and who delivers it.";

export function findVagueness(text: string): VaguenessMatch[] {
  if (!text) return [];
  const matches: VaguenessMatch[] = [];
  for (const { pattern, rule } of RULES) {
    pattern.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = pattern.exec(text)) !== null) {
      matches.push({
        start: m.index,
        end: m.index + m[0].length,
        phrase: m[0],
        rule,
      });
    }
  }
  // Sort and drop overlapping (keep the earliest / longest).
  matches.sort((a, b) => a.start - b.start || b.end - b.start - (a.end - a.start));
  const out: VaguenessMatch[] = [];
  let cursor = -1;
  for (const m of matches) {
    if (m.start >= cursor) {
      out.push(m);
      cursor = m.end;
    }
  }
  return out;
}

// Split text into alternating plain / flagged segments for inline rendering.
export type Segment = { text: string; flag?: VaguenessMatch };
export function segmentText(text: string): Segment[] {
  const matches = findVagueness(text);
  if (matches.length === 0) return [{ text }];
  const segs: Segment[] = [];
  let i = 0;
  for (const m of matches) {
    if (m.start > i) segs.push({ text: text.slice(i, m.start) });
    segs.push({ text: text.slice(m.start, m.end), flag: m });
    i = m.end;
  }
  if (i < text.length) segs.push({ text: text.slice(i) });
  return segs;
}
