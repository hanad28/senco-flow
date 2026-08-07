import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPost } from "@/content/blog/posts";
import { MarketingShell } from "@/landing/marketing-shell";
import { marketingPageHead } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    const head = marketingPageHead({
      title: loaderData?.title ?? "Blog",
      description: loaderData?.description ?? "Unisen blog",
      path: `/blog/${loaderData?.slug ?? ""}`,
      ogType: "article",
    });

    const post = loaderData;
    return {
      ...head,
      scripts: post
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.title,
                description: post.description,
                datePublished: post.date,
                mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
                author: { "@id": `${SITE_URL}/#organization` },
                publisher: { "@id": `${SITE_URL}/#organization` },
              }),
            },
          ]
        : [],
    };
  },
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
