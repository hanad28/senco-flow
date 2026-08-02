export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  body: string[];
};

/** On-site posts — plain TS for now; no CMS. */
export const posts: BlogPost[] = [
  {
    slug: "why-unisen",
    title: "Why we’re building Unisen",
    date: "2026-07-26",
    description:
      "SEND coordination across schools and families is still run on inboxes and paper. Here’s the problem we’re starting with.",
    body: [
      "Unisen starts with the school side of EHC needs assessment consultations — the statutory response window, scattered evidence, and the cost of vague provision wording.",
      "We’re validating with SENCOs and local authorities first. This blog will share what we learn in public, without naming private contacts or using real pupil data.",
      "If you work in a school or LA and want a short walkthrough, use Book a 15-min walkthrough on the site or email enquiries@unisen.uk.",
    ],
  },
  {
    slug: "15-day-consultation-window",
    title: "The 15-day consultation window, in plain terms",
    date: "2026-07-28",
    description:
      "Schools often have 15 calendar days to respond to an LA consultation. Missing the clock is easy when evidence is scattered.",
    body: [
      "When a local authority consults a school as part of an EHC needs assessment, the school is usually working to a short statutory response window measured in calendar days.",
      "In practice the work spans inbox threads, professional reports, and draft wording that has to be specific enough to stand up later. Unisen’s first wedge is making that case work visible and finishable on time.",
      "Nothing here is legal advice — always check the current Code of Practice and your LA’s process.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
