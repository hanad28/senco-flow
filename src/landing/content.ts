// Semantic page content for the Unisen marketing landing.

export type FeaturesItem = {
  variant: string;
  eyebrow?: string;
  title: string;
  description: string;
  stat?: string;
  restImage: string;
  detailImage: string;
  detailImageSrcSet?: string;
};

export const features: FeaturesItem[] = [
  {
    variant: "always-context-aware",
    eyebrow: "Shared timeline",
    title: "Shared timeline",
    description:
      "Every party sees the same statutory clocks, obligations, and handoffs, so SENCOs, families, and case officers stay aligned.",
    stat: "01.",
    restImage: "/assets/cloned/images/3814d9f8d026.png",
    detailImage: "/assets/cloned/images/a030dd7cfa79.png",
    detailImageSrcSet:
      "/assets/cloned/images/099e069abda2.png 512w, /assets/cloned/images/a030dd7cfa79.png 772w",
  },
  {
    variant: "takes-real-action",
    title: "Execution assistance",
    description:
      "Draft statutory responses, flag vague provision against IPSEA-style specificity, and prepare family comments on draft EHC plans.",
    stat: "02.",
    restImage: "/assets/cloned/images/3814d9f8d026.png",
    detailImage: "/assets/cloned/images/fd6ba2aa7f6c.png",
    detailImageSrcSet:
      "/assets/cloned/images/f1438ce833f0.png 512w, /assets/cloned/images/fd6ba2aa7f6c.png 772w",
  },
  {
    variant: "connects-everything",
    title: "School & family workspaces",
    description:
      "One platform for SENCOs answering LA consultations and families reviewing draft plans. Evidence and responses move on-platform instead of email, post, and re-chasing.",
    stat: "03.",
    restImage: "/assets/cloned/images/a9476dcf4db0.png",
    detailImage: "/assets/cloned/images/967ab053fa72.png",
    detailImageSrcSet:
      "/assets/cloned/images/ffbb785cd01b.png 512w, /assets/cloned/images/967ab053fa72.png 772w",
  },
  {
    variant: "gets-better-over-time",
    title: "Protects the clocks",
    description:
      "15-day and 6-week clocks are visible to everyone who needs them. Overdue work is obvious before it becomes a crisis.",
    stat: "04.",
    restImage: "/assets/cloned/images/4e5c7fba301c.png",
    detailImage: "/assets/cloned/images/b2e1d278df24.png",
    detailImageSrcSet:
      "/assets/cloned/images/f92da167a664.png 512w, /assets/cloned/images/b2e1d278df24.png 772w",
  },
];

export type MediaCardDataItem = {
  title: string;
  description: string;
  image: string;
  imageSrcSet?: string;
};

export const mediaCardData: MediaCardDataItem[] = [
  {
    title: "Statutory deadline tracking",
    description:
      "Calendar-day countdowns for EHC consultations and draft plan responses, not buried in spreadsheets.",
    image: "/assets/cloned/images/c48e53eeb52c.png",
    imageSrcSet:
      "/assets/cloned/images/3cc9712cf9fd.png 512w, /assets/cloned/images/d1524386f401.png 1024w, /assets/cloned/images/c48e53eeb52c.png 1364w",
  },
  {
    title: "Needs & provision review",
    description:
      "Consolidate professional advice into one needs view, then draft provision language that is specific and quantifiable.",
    image: "/assets/cloned/images/f40c6e0ae68f.png",
    imageSrcSet:
      "/assets/cloned/images/0b98ba521e1b.png 512w, /assets/cloned/images/413a899e4100.png 1024w, /assets/cloned/images/f40c6e0ae68f.png 1364w",
  },
  {
    title: "School + family modes",
    description:
      "Separate workspaces for SENCOs and families: shared clocks, different responsibilities, less chasing across email.",
    image: "/assets/cloned/images/fd6ba2aa7f6c.png",
    imageSrcSet:
      "/assets/cloned/images/f1438ce833f0.png 512w, /assets/cloned/images/fd6ba2aa7f6c.png 772w",
  },
  {
    title: "Evidence in one place",
    description:
      "EP, SaLT, OT, parental views and school forms stay with the case so responses and draft-plan comments stay grounded.",
    image: "/assets/cloned/images/b9d3f94ae04c.png",
    imageSrcSet:
      "/assets/cloned/images/3c458e5b4582.png 512w, /assets/cloned/images/56aabddd40c8.png 1024w, /assets/cloned/images/c0899aa26a20.png 2048w, /assets/cloned/images/b9d3f94ae04c.png 2326w",
  },
];

/** Pricing feature row: orange dot = included; muted = not in plan */
export type PricingFeature = {
  label: string;
  included: boolean;
};

export type ProductsItem = {
  variant: "solo" | "pro" | "teams";
  title: string;
  description: string;
  /** Monthly price display (string keeps £ / Free formatting) */
  priceMonthly: string;
  priceAnnual: string;
  priceNoteMonthly: string;
  priceNoteAnnual: string;
  label: string;
  features: PricingFeature[];
  /** Featured middle card with photo background */
  featured?: boolean;
  ctaDark?: boolean;
};

export const products: ProductsItem[] = [
  {
    variant: "solo",
    title: "School",
    description:
      "Perfect for a single school SENCO team getting started with EHC consultation responses. No credit card required.",
    priceMonthly: "£0",
    priceAnnual: "£0",
    priceNoteMonthly: "Free forever",
    priceNoteAnnual: "Free forever",
    label: "Get started free",
    ctaDark: false,
    features: [
      { label: "1 school workspace", included: true },
      { label: "Consultation deadlines", included: true },
      { label: "Needs & provision review", included: true },
      { label: "Response draft builder", included: true },
      { label: "Up to 5 open cases", included: true },
      { label: "Custom templates", included: false },
      { label: "Priority support", included: false },
      { label: "Multi-school admin", included: false },
    ],
  },
  {
    variant: "pro",
    title: "Pro",
    description:
      "The full Unisen workspace for schools that want templates, vagueness checks, and multi-case deadlines.",
    priceMonthly: "£49",
    priceAnnual: "£42",
    priceNoteMonthly: "per month, billed monthly",
    priceNoteAnnual: "per month, billed annually",
    label: "Get started free",
    featured: true,
    ctaDark: true,
    features: [
      { label: "1 school workspace", included: true },
      { label: "Consultation deadlines", included: true },
      { label: "Needs & provision review", included: true },
      { label: "Response draft builder", included: true },
      { label: "Vagueness checks", included: true },
      { label: "Custom templates", included: false },
      { label: "Priority support", included: false },
      { label: "Multi-school admin", included: false },
    ],
  },
  {
    variant: "teams",
    title: "Trust",
    description:
      "For growing trusts that want shared templates, role-based access, and centralised control across schools.",
    priceMonthly: "£89",
    priceAnnual: "£76",
    priceNoteMonthly: "per school / month",
    priceNoteAnnual: "per school / month, billed annually",
    label: "Talk to sales",
    ctaDark: false,
    features: [
      { label: "Multi-school workspaces", included: true },
      { label: "Consultation deadlines", included: true },
      { label: "Needs & provision review", included: true },
      { label: "Family draft-plan review", included: true },
      { label: "Shared trust templates", included: true },
      { label: "Custom workflows", included: true },
      { label: "Priority support", included: true },
      { label: "Central admin & reporting", included: true },
    ],
  },
];

export type TileDataItem = {
  description: string;
};
export const tileData: TileDataItem[] = [
  { description: "Open a consultation" },
  { description: "Review needs & advice" },
  { description: "Draft & submit" },
];

export type MediaCard3DataItem = {
  title: string;
};
export const mediaCard3Data: MediaCard3DataItem[] = [
  { title: "How is Unisen different from a spreadsheet or case tracker?" },
  { title: "Is pupil and family data handled carefully?" },
  { title: "Who is Unisen for: schools or families?" },
  { title: "How long does setup take?" },
  { title: "Does Unisen replace local authority systems?" },
];

export type Tile2DataItem = {
  href: string;
  description: string;
};
export const tile2Data: Tile2DataItem[] = [
  { href: "/workflow-1", description: "School workspace" },
  { href: "/workflow-2", description: "Family workspace" },
  { href: "/workflow-3", description: "Deadlines" },
];
