import { createFileRoute } from "@tanstack/react-router";
import { BlogIndexPage } from "./blog";
import { pageTitle } from "@/lib/site";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: pageTitle("Blog") },
      {
        name: "description",
        content: "Notes from building Unisen: SEND coordination for schools and families.",
      },
    ],
  }),
  component: BlogIndexPage,
});
