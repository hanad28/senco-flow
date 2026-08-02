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
          <strong className="text-foreground">Hanad</strong> — ML/AI and information
          retrieval; family experience navigating EHC processes.
        </li>
        <li>
          <strong className="text-foreground">Husaam</strong> — ops and business
          model (Chartered Accountant, CFA candidate).
        </li>
        <li>
          <strong className="text-foreground">Iylana</strong> — outreach and product
          marketing.
        </li>
        <li>
          <strong className="text-foreground">Mikhail</strong> — engineering.
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
