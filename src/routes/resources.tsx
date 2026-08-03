import { createFileRoute, Link } from "@tanstack/react-router";
import { RESOURCE_LINKS } from "@/landing/nav";
import { MarketingShell } from "@/landing/marketing-shell";
import { marketingPageHead } from "@/lib/seo";

export const Route = createFileRoute("/resources")({
  head: () =>
    marketingPageHead({
      title: "Resources",
      description: "Changelog, blog, help, and workshops from Unisen.",
      path: "/resources",
    }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <MarketingShell title="Resources">
      <ul className="space-y-4">
        {RESOURCE_LINKS.map((item) => (
          <li key={item.href}>
            <Link to={item.href} className="font-semibold text-foreground hover:text-primary">
              {item.label}
            </Link>
            <p className="mt-1">{item.description}</p>
          </li>
        ))}
      </ul>
    </MarketingShell>
  );
}
