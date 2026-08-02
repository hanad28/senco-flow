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
        Unisen is built by a small founding team combining lived experience of
        the UK SEND/EHC system with engineering, ops, and outreach.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-foreground">Hanad, Co-founder and CEO</strong>
          <br />
          Product, AI and information retrieval, informed by family experience navigating EHC
          processes.
        </li>
        <li>
          <strong className="text-foreground">Husaam, Co-founder and CFO</strong>
          <br />
          Financial planning, commercial strategy, operations and organisational delivery.
        </li>
        <li>
          <strong className="text-foreground">Iylana</strong>
          <br />
          Outreach and product marketing.
        </li>
        <li>
          <strong className="text-foreground">Mikhail, Co-founder and CTO</strong>
          <br />
          Product engineering and technical architecture.
        </li>
      </ul>
      <p>
        Contact:{" "}
        <a className="text-primary hover:underline" href="mailto:enquiries@unisen.uk">
          enquiries@unisen.uk
        </a>
      </p>
    </MarketingShell>
  );
}
