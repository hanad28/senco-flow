import { createFileRoute } from "@tanstack/react-router";
import { CHANGELOG_ENTRIES } from "@/content/changelog";
import { MarketingFrame } from "@/landing/marketing-shell";
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
    <MarketingFrame>
      <main
        id="main"
        aria-labelledby="changelog-title"
        className="mx-auto w-full max-w-[1200px] flex-1 px-5 pb-20 pt-[calc(4.5rem+env(safe-area-inset-top,0px))]"
      >
        <header className="grid border-b border-[var(--border-default)] py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] lg:py-20">
          <div className="lg:col-start-2 lg:col-end-3">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--text-primary)]">
              Product updates
            </p>
            <h1
              id="changelog-title"
              className="mt-3 text-5xl font-extrabold tracking-[-0.04em] text-[var(--text-primary)] [font-family:var(--font-heading)] sm:text-6xl"
            >
              Changelog
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--text-secondary)] [font-family:var(--font-body)]">
              Product-facing notes from the Unisen git history. Deploy-only and empty commits are
              omitted.
            </p>
          </div>
        </header>

        <ol aria-label="Changelog entries" className="list-none">
          {CHANGELOG_ENTRIES.map((group) => (
            <li key={group.dateTime}>
              <article
                aria-label={`${group.items.length} Unisen ${group.items.length === 1 ? "update" : "updates"} from ${group.date}`}
                className="grid gap-6 border-b border-[var(--border-default)] py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] lg:gap-0 lg:py-24"
              >
                <div className="lg:pr-8">
                  <p className="text-sm leading-6 text-[var(--text-secondary)] lg:sticky lg:top-[calc(5.75rem+env(safe-area-inset-top,0px))] lg:self-start">
                    <time dateTime={group.dateTime}>{group.date}</time>
                  </p>
                </div>

                <div className="lg:col-start-2 lg:col-end-3">
                  <header className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 shrink-0 rounded-full bg-[var(--brand-teal)]"
                    />
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {group.items.length} {group.items.length === 1 ? "update" : "updates"} shipped
                    </p>
                  </header>
                  <div className="mt-6 space-y-10">
                    {group.items.map((item) => (
                      <section key={item.slug} id={item.slug} className="scroll-mt-28">
                        <h2 className="text-2xl font-bold leading-tight tracking-[-0.025em] text-[var(--text-primary)] [font-family:var(--font-heading)] sm:text-[2rem]">
                          <a
                            href={`#${item.slug}`}
                            aria-label={`Link to ${item.title}`}
                            className="group inline-flex max-w-full items-start gap-2 rounded-sm transition-colors hover:text-[var(--text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2"
                          >
                            <span>{item.title}</span>
                            <span
                              aria-hidden="true"
                              className="mt-1 shrink-0 text-lg font-normal text-[var(--text-primary)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
                            >
                              #
                            </span>
                          </a>
                        </h2>
                        <p className="mt-3 text-base leading-7 text-[var(--text-secondary)] [font-family:var(--font-body)]">
                          {item.body}
                        </p>
                      </section>
                    ))}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <nav
          aria-label="Changelog navigation"
          className="grid border-b border-[var(--border-default)] py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)]"
        >
          <a
            href="#changelog-title"
            className="text-sm font-bold text-[var(--text-primary)] transition-colors hover:text-[var(--text-secondary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2 lg:col-start-2 lg:col-end-3"
          >
            ↑ Back to top
          </a>
        </nav>
      </main>
    </MarketingFrame>
  );
}
