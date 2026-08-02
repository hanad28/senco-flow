import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPost } from "@/content/blog/posts";
import { MarketingShell } from "@/landing/marketing-shell";
import { pageTitle } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: pageTitle(loaderData?.title ?? "Blog") },
      {
        name: "description",
        content: loaderData?.description ?? "Unisen blog",
      },
    ],
  }),
  component: BlogPostPage,
});

function BlogPostPage() {
  const post = Route.useLoaderData();

  return (
    <MarketingShell title={post.title}>
      <p className="text-xs text-muted-foreground">{post.date}</p>
      {post.body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <p>
        <Link to="/blog" className="font-medium text-primary hover:underline">
          ← All posts
        </Link>
      </p>
    </MarketingShell>
  );
}
