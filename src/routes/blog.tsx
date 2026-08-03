import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { posts } from "@/content/blog/posts";
import { MarketingShell } from "@/landing/marketing-shell";

export const Route = createFileRoute("/blog")({
  // Index and post children own their head tags. Emitting a parent canonical here
  // duplicates <link rel="canonical"> on /blog/$slug pages.
  component: BlogLayout,
});

function BlogLayout() {
  return <Outlet />;
}

export function BlogIndexPage() {
  return (
    <MarketingShell title="Blog">
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-border pb-6 last:border-0">
            <p className="text-xs text-muted-foreground">{post.date}</p>
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="mt-1 block text-lg font-semibold text-foreground hover:text-primary"
            >
              {post.title}
            </Link>
            <p className="mt-2">{post.description}</p>
          </li>
        ))}
      </ul>
    </MarketingShell>
  );
}
