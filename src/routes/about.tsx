import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/landing/marketing-shell";
import { pageTitle } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: pageTitle("About") },
      {
        name: "description",
        content: "The Unisen team building SEND coordination software for schools and families.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <MarketingShell title="About">
      <p>
        Unisen is building SEND coordination software to help schools and families manage EHC
        processes more clearly.
      </p>
      <p>
        Our work is informed by lived experience of navigating the SEND system, alongside expertise
        in technology, operations and organisational delivery.
      </p>
      <p>
        Contact:{" "}
        <a className="text-primary hover:underline" href="mailto:enquiries@unisen.uk">
          enquiries@unisen.uk
        </a>
      </p>
    </MarketingShell>
  );
}
