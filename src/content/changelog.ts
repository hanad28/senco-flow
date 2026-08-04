/** Drawn from git history (meaningful subjects only; deploy/noise commits omitted). */
export const CHANGELOG_ENTRIES = [
  {
    date: "4 August 2026",
    dateTime: "2026-08-04",
    items: [
      {
        slug: "public-blog-discovery",
        title: "Public blog discovery",
        body: "Add a featured public blog, topic filtering, individual post routes, and a changelog preview for easier product updates discovery.",
      },
      {
        slug: "production-security-and-compliance",
        title: "Production security and compliance",
        body: "Harden production headers, robots and sitemap handling, privacy surfaces, enquiry validation, and snapshot persistence.",
      },
    ],
  },
  {
    date: "3 August 2026",
    dateTime: "2026-08-03",
    items: [
      {
        slug: "landing-section-system",
        title: "Landing section system",
        body: "Rebuild the landing body around reusable Unisen section shells, product visuals, and a shared light canvas.",
      },
      {
        slug: "landing-visual-polish",
        title: "Landing visual polish",
        body: "Refine the hero, soft card surfaces, school and family product mocks, and CTA copy across the marketing page.",
      },
      {
        slug: "responsive-landing-polish",
        title: "Responsive landing polish",
        body: "Scale the hero, landing body, footer, and enquiry controls for more natural mobile proportions.",
      },
    ],
  },
  {
    date: "2 August 2026",
    dateTime: "2026-08-02",
    items: [
      {
        slug: "public-marketing-pages",
        title: "Public marketing pages",
        body: "Add the core public product, pricing, legal, resources, and integrations surfaces around the Unisen marketing shell.",
      },
      {
        slug: "marketing-and-enquiry-flow",
        title: "Marketing and enquiry flow",
        body: "Refresh public navigation, marketing-page routing, and the walkthrough enquiry flow for Unisen schools and families.",
      },
    ],
  },
  {
    date: "1 August 2026",
    dateTime: "2026-08-01",
    items: [
      {
        slug: "verified-website-enquiries",
        title: "Verified website enquiries",
        body: "Capture early interest with Turnstile-verified walkthrough enquiries.",
      },
      {
        slug: "product-led-landing-refresh",
        title: "Product-led landing refresh",
        body: "Cursor-style feature stack with interactive product mocks, brand Nunito type, liquid-glass feature cards, and mobile chrome polish including the hero sky seam.",
      },
      {
        slug: "faster-app-sign-in",
        title: "Faster app sign-in",
        body: "Speed up Clerk on the app host, clean loading chrome, and restore Get started redirect behaviour.",
      },
      {
        slug: "landing-footer-and-motion",
        title: "Landing footer and motion",
        body: "Replace the footer with the Framer glass section, refresh brand assets, and polish Nexura landing motion.",
      },
    ],
  },
  {
    date: "27 July 2026",
    dateTime: "2026-07-27",
    items: [
      {
        slug: "cloudflare-production-deploy",
        title: "Cloudflare production deploy",
        body: "Deploy Unisen on Cloudflare and refresh landing copy for four-party EHC coordination.",
      },
    ],
  },
  {
    date: "26 July 2026",
    dateTime: "2026-07-26",
    items: [
      {
        slug: "unisen-marketing-site",
        title: "Unisen marketing site",
        body: "Ship the Nexura-style landing with glass CTAs, brand assets, nav polish, and Convex snapshot persistence.",
      },
      {
        slug: "public-mcp-server",
        title: "Public MCP server",
        body: "Publish MCP agent support for the product surface.",
      },
    ],
  },
  {
    date: "21 July 2026",
    dateTime: "2026-07-21",
    items: [
      {
        slug: "live-calendar-deadlines",
        title: "Live calendar deadlines",
        body: "Remove the hardcoded calendar TODAY so day counts stay live, and add a deadline banner on Review & Submit.",
      },
    ],
  },
  {
    date: "13 July 2026",
    dateTime: "2026-07-13",
    items: [
      {
        slug: "activity-search-and-export",
        title: "Activity, search, and export",
        body: "Activity log and notifications bell, global search and collapsible sidebar, dashboard pagination, calendar month picker, letter PDF/print export, and required cannot-meet rationale.",
      },
    ],
  },
  {
    date: "12 July 2026",
    dateTime: "2026-07-12",
    items: [
      {
        slug: "calendar-reports-and-templates",
        title: "Calendar, reports, and templates",
        body: "Statutory calendar dates, Reports screen with seed data, and template append/detach in draft responses.",
      },
    ],
  },
  {
    date: "11 July 2026",
    dateTime: "2026-07-11",
    items: [
      {
        slug: "school-profile-and-navigation",
        title: "School profile and navigation",
        body: "School profile settings plus dashboard navigation for the main workspace pages.",
      },
    ],
  },
  {
    date: "9 July 2026",
    dateTime: "2026-07-09",
    items: [
      {
        slug: "family-workspace",
        title: "Family workspace",
        body: "Built the family workspace prototype alongside the school SENCO flow.",
      },
    ],
  },
] as const;

const changelogSlugs = CHANGELOG_ENTRIES.flatMap((group) => group.items.map((item) => item.slug));

if (new Set(changelogSlugs).size !== changelogSlugs.length) {
  throw new Error("Changelog item slugs must be unique.");
}
