import { useState } from "react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import AnimatedTabs from "@/components/ui/animated-tabs";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/site";
import EnquiryDialog from "@/landing/components/enquiry-dialog";
import { formatDate, getPost, readMinutes, sortedPosts, type BlogPost } from "@/content/blog/posts";
import { CHANGELOG_ENTRIES } from "@/content/changelog";
import { MarketingFrame } from "@/landing/marketing-shell";

export const Route = createFileRoute("/blog")({
  // Index and post children own their head tags. Emitting a parent canonical here
  // duplicates <link rel="canonical"> on /blog/$slug pages.
  component: BlogLayout,
});

function BlogLayout() {
  return <Outlet />;
}

const FEATURED_IMAGE = "/assets/brand/hero-park-1280.jpg";

export function BlogIndexPage() {
  const [topic, setTopic] = useState<string>("all");
  const featured = sortedPosts[0];
  const topics = ["all", ...Array.from(new Set(sortedPosts.map((p) => p.topic)))];
  const gridPosts = sortedPosts.filter((p) => p.slug !== featured?.slug);
  const matchesTopic = (p: BlogPost) => topic === "all" || p.topic === topic;
  const showFeatured = featured !== undefined && matchesTopic(featured);
  const visible = gridPosts.filter(matchesTopic);

  const quotePost = getPost("15-day-consultation-window");

  return (
    <MarketingFrame>
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-5 pb-24 pt-[calc(4.5rem+env(safe-area-inset-top,0px))] md:px-12">
        {/* Page hero */}
        <header className="pt-12 md:pt-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-[var(--text-primary,#244a70)] [font-family:var(--font-heading)] md:text-5xl">
            Blog
          </h1>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-[var(--text-secondary,#40689c)] [font-family:var(--font-body)]">
            Notes from building Unisen: SEND coordination for schools and families, shared in
            public.
          </p>
        </header>

        {/* Featured post */}
        {showFeatured && featured && (
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            className="group mt-10 block overflow-hidden rounded-[28px] border border-[var(--border-default,#d7e5eb)] bg-white shadow-[var(--shadow-sm)] transition-shadow duration-200 hover:shadow-[var(--shadow-md)]"
          >
            <div className="grid md:grid-cols-2">
              <div className="aspect-[16/9] overflow-hidden md:aspect-auto md:min-h-[320px]">
                <img
                  src={FEATURED_IMAGE}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="text-[13px] font-bold text-[var(--text-secondary,#40689c)]">
                  {formatDate(featured.date)}
                  <span className="mx-2 text-[var(--border-default,#b7e1e9)]">·</span>
                  <span className="capitalize">{featured.topic}</span>
                </p>
                <h2 className="mt-3 text-2xl font-extrabold leading-snug text-[var(--text-primary,#244a70)] [font-family:var(--font-heading)] md:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 leading-relaxed text-[var(--text-secondary,#40689c)]">
                  {featured.description}
                </p>
                <p className="mt-6 text-sm font-semibold text-[var(--text-secondary,#40689c)]">
                  {featured.author}
                  <span className="ml-2 font-normal opacity-70">
                    {readMinutes(featured)} min read
                  </span>
                </p>
              </div>
            </div>
          </Link>
        )}

        {/* Topic filter */}
        <div className="mt-12 border-b border-[var(--border-default,#d7e5eb)]">
          <AnimatedTabs
            ariaLabel="Blog topics"
            variant="underline"
            activeTab={topic}
            onChange={setTopic}
            tabs={topics.map((t) => ({
              id: t,
              label: <span className="font-bold capitalize">{t}</span>,
            }))}
          />
        </div>

        {/* Post grid */}
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </ul>
        {visible.length === 0 && !showFeatured && (
          <p className="mt-8 text-[var(--text-secondary,#40689c)]">No posts in this topic yet.</p>
        )}

        {/* Pull quote */}
        {quotePost && (
          <section className="mt-20 rounded-[28px] bg-[#dbf1fc] px-8 py-12 md:px-16">
            <blockquote className="mx-auto max-w-3xl text-center text-2xl font-bold leading-snug text-[var(--text-primary,#244a70)] [font-family:var(--font-heading)] md:text-3xl">
              “Missing the clock is easy when evidence is scattered.”
            </blockquote>
            <p className="mt-4 text-center text-sm font-semibold text-[var(--text-secondary,#40689c)]">
              From{" "}
              <Link
                to="/blog/$slug"
                params={{ slug: quotePost.slug }}
                className="underline hover:text-[#1d638e]"
              >
                {quotePost.title}
              </Link>
            </p>
          </section>
        )}

        {/* Changelog strip */}
        <section className="mt-20">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-extrabold text-[var(--text-primary,#244a70)] [font-family:var(--font-heading)]">
              Changelog
            </h2>
            <Link to="/changelog" className="text-sm font-bold text-[#287fb4] hover:text-[#1d638e]">
              See what&rsquo;s new in Unisen →
            </Link>
          </div>
          <ul className="mt-6 divide-y divide-[var(--border-default,#d7e5eb)] border-y border-[var(--border-default,#d7e5eb)]">
            {CHANGELOG_ENTRIES.slice(0, 4).flatMap((group) =>
              group.items.slice(0, 1).map((item) => (
                <li
                  key={`${group.date}-${item.title}`}
                  className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-4"
                >
                  <span className="w-36 shrink-0 text-[13px] font-bold text-[var(--text-secondary,#40689c)]">
                    {group.date}
                  </span>
                  <span className="font-semibold text-[var(--text-primary,#244a70)]">
                    {item.title}
                  </span>
                </li>
              )),
            )}
          </ul>
        </section>
      </main>

      {/* Final CTA — same as the homepage */}
      <div className="landing-body">
        <section
          id="contact"
          aria-label="Choose a Unisen workspace"
          className="cursor-section cursor-section--headline flex items-center justify-center"
        >
          <div className="cursor-container">
            <div className="cursor-prose-medium-wide mx-auto text-center">
              <h2
                className="cursor-type-xl text-balance mx-auto mb-[var(--cursor-v)]"
                data-component="heading"
                dir="auto"
              >
                Try Unisen from your side.
              </h2>
              <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:flex-wrap sm:gap-[var(--cursor-g)]">
                <EnquiryDialog
                  trigger={
                    <Button
                      type="button"
                      size="lg"
                      className="cta-brand relative h-10 w-auto min-w-0 px-5 text-sm font-bold sm:h-12 sm:min-w-56 sm:px-7 sm:text-base"
                    >
                      <span className="relative z-[1]">Book a 15-min walkthrough</span>
                    </Button>
                  }
                />
                <Button
                  type="button"
                  size="lg"
                  className="cta-brand relative h-10 w-auto min-w-0 px-5 text-sm font-bold sm:h-12 sm:min-w-56 sm:px-7 sm:text-base"
                  onClick={() => window.location.assign(`${APP_URL}/family`)}
                >
                  <span className="relative z-[1]">Try the family demo</span>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MarketingFrame>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <li>
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="flex h-full flex-col rounded-[20px] border border-[var(--border-default,#d7e5eb)] bg-white p-6 shadow-[var(--shadow-sm)] transition-shadow duration-200 hover:shadow-[var(--shadow-md)]"
      >
        <p className="text-[13px] font-bold text-[var(--text-secondary,#40689c)]">
          {formatDate(post.date)}
          <span className="mx-2 text-[var(--border-default,#b7e1e9)]">·</span>
          <span className="capitalize">{post.topic}</span>
        </p>
        <h3 className="mt-3 text-lg font-bold leading-snug text-[var(--text-primary,#244a70)]">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--text-secondary,#40689c)]">
          {post.description}
        </p>
        <p className="mt-auto pt-4 text-[13px] font-semibold text-[var(--text-secondary,#40689c)]">
          {post.author}
          <span className="ml-2 font-normal opacity-70">{readMinutes(post)} min read</span>
        </p>
      </Link>
    </li>
  );
}
