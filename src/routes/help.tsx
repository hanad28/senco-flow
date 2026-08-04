import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, Search } from "lucide-react";
import { useRef, useState } from "react";
import {
  HELP_ENTRY_COUNT,
  HELP_TOPICS,
  searchHelpTopics,
  type HelpEntry,
  type HelpLink,
  type HelpTopic,
} from "@/content/help";
import { Button } from "@/components/ui/button";
import EnquiryDialog from "@/landing/components/enquiry-dialog";
import { MarketingFrame } from "@/landing/marketing-shell";
import { marketingPageHead } from "@/lib/seo";

function HelpLinkList({ links }: { links: readonly HelpLink[] }) {
  return (
    <ul className="mt-4 space-y-1">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            to={link.href}
            className="group/link flex items-center justify-between gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-[var(--surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
          >
            <span className="min-w-0">
              <span className="block text-sm font-bold text-[var(--text-primary)]">
                {link.label}
              </span>
              <span className="mt-1 block text-sm leading-5 text-[var(--text-secondary)]">
                {link.description}
              </span>
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-[var(--text-secondary)] transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function HelpAnswer({
  topic,
  entry,
  links = entry.links,
  card = false,
}: {
  topic: HelpTopic;
  entry: HelpEntry;
  links?: readonly HelpLink[];
  card?: boolean;
}) {
  return (
    <article
      className={
        card ? "rounded-[1.25rem] border border-[var(--border-default)] bg-white p-5 sm:p-6" : ""
      }
    >
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-secondary)]">
        {topic.title}
      </p>
      <h3 className="mt-3 text-xl font-bold tracking-[-0.025em] text-[var(--text-primary)] [font-family:var(--font-heading)]">
        {entry.question}
      </h3>
      <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">{entry.answer}</p>
      <HelpLinkList links={links} />
    </article>
  );
}

export const Route = createFileRoute("/help")({
  head: () =>
    marketingPageHead({
      title: "Help",
      description: "Pilot-stage guidance, product links, and contact details for Unisen.",
      path: "/help",
    }),
  component: HelpPage,
});

function HelpPage() {
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const normalizedQuery = query.trim().toLowerCase();
  const searchResults = searchHelpTopics(query);
  const searchStatus = normalizedQuery
    ? searchResults.length > 0
      ? `${searchResults.length} matching help ${searchResults.length === 1 ? "answer" : "answers"} for “${query.trim()}”.`
      : `No matching help answers for “${query.trim()}”.`
    : `${HELP_ENTRY_COUNT} help answers available below.`;

  return (
    <MarketingFrame>
      <main
        id="main"
        aria-labelledby="help-title"
        className="mx-auto w-full max-w-[1200px] flex-1 px-5 pb-20 pt-[calc(4.5rem+env(safe-area-inset-top,0px))]"
      >
        <div className="mx-auto max-w-[44rem]">
          <header className="pt-12 sm:pt-16 lg:pt-20">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--text-primary)]">
              Unisen support
            </p>
            <h1
              id="help-title"
              className="mt-3 text-4xl font-extrabold tracking-[-0.04em] text-[var(--text-primary)] [font-family:var(--font-heading)] sm:text-5xl"
            >
              How can we help?
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)] [font-family:var(--font-body)]">
              Unisen is in pilot validation. There isn&apos;t a full help centre yet. Start with the
              links below.
            </p>
            <div className="mt-8 rounded-[1.25rem] border border-[var(--border-default)] bg-[var(--surface-muted)] p-2">
              <label className="sr-only" htmlFor="help-search">
                Search help topics
              </label>
              <div className="flex items-center gap-3 rounded-[0.9rem] bg-white px-4 py-3 focus-within:ring-2 focus-within:ring-[var(--border-focus)] focus-within:ring-offset-2">
                <Search
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-[var(--text-secondary)]"
                />
                <input
                  ref={searchInputRef}
                  id="help-search"
                  aria-describedby="help-search-status"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search help topics"
                  className="min-w-0 flex-1 bg-transparent text-base text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]"
                />
              </div>
            </div>
            <p
              id="help-search-status"
              role="status"
              aria-live="polite"
              className="mt-3 min-h-5 text-sm leading-5 text-[var(--text-secondary)]"
            >
              {searchStatus}
            </p>
          </header>

          {normalizedQuery ? (
            <section id="help-results" aria-labelledby="help-results-title" className="mt-8">
              <div className="flex items-center justify-between gap-4">
                <h2
                  id="help-results-title"
                  className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--text-secondary)]"
                >
                  Search results
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    searchInputRef.current?.focus();
                  }}
                  className="rounded-sm px-2 py-1 text-sm font-bold text-[var(--text-primary)] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2"
                >
                  Clear search
                </button>
              </div>
              {searchResults.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {searchResults.map(({ topic, entry, links }) => (
                    <HelpAnswer key={entry.id} topic={topic} entry={entry} links={links} card />
                  ))}
                </div>
              ) : (
                <p className="mt-4 rounded-[1.25rem] border border-[var(--border-default)] bg-[var(--surface-muted)] p-5 text-sm leading-6 text-[var(--text-secondary)]">
                  Try another term or clear the search to browse all help answers.
                </p>
              )}
            </section>
          ) : (
            <>
              <section aria-labelledby="browse-topics" className="mt-8">
                <h2
                  id="browse-topics"
                  className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-[var(--text-secondary)]"
                >
                  Browse by topic
                </h2>
                <div className="border-y border-[var(--border-default)]">
                  {HELP_TOPICS.map((topic) => (
                    <details
                      key={topic.id}
                      className="group border-b border-[var(--border-default)] last:border-b-0"
                    >
                      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-[var(--surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--border-focus)] [&::-webkit-details-marker]:hidden">
                        <span className="min-w-0">
                          <span className="block font-bold text-[var(--text-primary)] [font-family:var(--font-heading)]">
                            {topic.title}
                          </span>
                          <span className="mt-1 block text-sm leading-5 text-[var(--text-secondary)]">
                            {topic.description}
                          </span>
                        </span>
                        <ChevronDown
                          aria-hidden="true"
                          className="h-5 w-5 shrink-0 text-[var(--text-secondary)] transition-transform duration-200 group-open:rotate-180"
                        />
                      </summary>
                      <div className="space-y-5 px-4 pb-5 pt-2">
                        {topic.entries.map((entry) => (
                          <HelpAnswer key={entry.id} topic={topic} entry={entry} />
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              <section
                id="walkthrough"
                aria-labelledby="walkthrough-title"
                className="mt-12 rounded-[1.25rem] bg-[var(--surface-muted)] p-6 sm:p-8"
              >
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                  Pilot support
                </p>
                <h2
                  id="walkthrough-title"
                  className="mt-2 text-2xl font-bold tracking-[-0.025em] text-[var(--text-primary)] [font-family:var(--font-heading)] sm:text-3xl"
                >
                  Talk through your use case
                </h2>
                <p className="mt-3 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
                  Book a 15-min walkthrough, or email{" "}
                  <a
                    className="font-bold underline underline-offset-4"
                    href="mailto:enquiries@unisen.uk"
                  >
                    enquiries@unisen.uk
                  </a>
                  .
                </p>
                <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <EnquiryDialog
                    trigger={
                      <Button
                        type="button"
                        size="lg"
                        variant="outline"
                        className="h-12 w-full border-[var(--text-primary)] px-7 text-base font-bold text-[var(--text-primary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)] sm:w-auto"
                      >
                        Book a 15-min walkthrough
                      </Button>
                    }
                  />
                  <a
                    className="rounded-sm px-2 py-2 text-sm font-bold text-[var(--text-primary)] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2"
                    href="mailto:enquiries@unisen.uk"
                  >
                    Email the team
                  </a>
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </MarketingFrame>
  );
}
