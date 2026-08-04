import { createFileRoute } from "@tanstack/react-router";
import { CHANGELOG_ENTRIES } from "@/content/changelog";
import { MarketingShell } from "@/landing/marketing-shell";
import { marketingPageHead } from "@/lib/seo";

export const Route = createFileRoute("/changelog")({
  head: () =>
    marketingPageHead({
      title: "Changelog",
      description: "What has shipped in Unisen.",
      path: "/changelog",
    }),
  component: ChangelogPage,
});

function ChangelogPage() {
  return (
    <MarketingShell title="Changelog">
      <p>
        Product-facing notes from the Unisen git history. Deploy-only and empty commits are omitted.
      </p>
      <ol className="space-y-10">
        {CHANGELOG_ENTRIES.map((group) => (
          <li key={group.date}>
            <p className="text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">
              {group.date}
            </p>
            <ul className="mt-4 space-y-5">
              {group.items.map((item) => (
                <li key={item.title}>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1">{item.body}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </MarketingShell>
  );
}
