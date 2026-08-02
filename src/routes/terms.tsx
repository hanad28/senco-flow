import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/landing/marketing-shell";
import { pageTitle } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: pageTitle("Terms") },
      { name: "description", content: "Unisen website terms of use." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <MarketingShell title="Terms of Service">
      <p>Last updated: 2 August 2026</p>
      <p>
        This website describes Unisen and lets you request a walkthrough. It is
        provided as-is for information and outreach.
      </p>
      <p>
        Nothing on this site is legal advice, clinical advice, or a substitute for
        statutory SEND processes or qualified professionals.
      </p>
      <p>
        Product screens may use fictional demonstration data. Access to the
        authenticated product is by arrangement.
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
