/** Shared public marketing navigation. */

export const PRIMARY_NAV = [
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
] as const;

/** Resources that make sense at pilot stage — skip Docs/Community/Forum/Careers for now. */
export const RESOURCE_LINKS = [
  {
    href: "/changelog",
    label: "Changelog",
    description: "What shipped recently",
  },
  {
    href: "/blog",
    label: "Blog",
    description: "Notes from building Unisen",
  },
  {
    href: "/help",
    label: "Help",
    description: "FAQs and how to reach us",
  },
  {
    href: "/workshops",
    label: "Workshops",
    description: "SENCO walkthroughs and pilots",
  },
] as const;

export const CONTACT_NAV = { href: "/contact", label: "Contact" } as const;
