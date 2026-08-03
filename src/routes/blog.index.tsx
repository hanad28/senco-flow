import { createFileRoute } from "@tanstack/react-router";
import { BlogIndexPage } from "./blog";
import { marketingPageHead } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () =>
    marketingPageHead({
      title: "Blog",
      description: "Notes from building Unisen: SEND coordination for schools and families.",
      path: "/blog",
    }),
  component: BlogIndexPage,
});
