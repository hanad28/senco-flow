import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/landing/marketing-shell";
import { pageTitle, SITE_DESCRIPTION } from "@/lib/site";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: pageTitle("Product") },
      { name: "description", content: SITE_DESCRIPTION },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  return (
    <MarketingShell title="Product">
      <p>
        Unisen helps schools run EHC needs assessment consultations: open cases,
        statutory deadlines, evidence in one place, and clearer response wording
        before submit.
      </p>
      <p>
        Family workspace support is part of the wider platform direction. The
        live wedge we demo first is the SENCO consultation-response flow.
      </p>
      <p>
        <Link to="/" className="font-medium text-primary hover:underline">
          See product screens on the home page →
        </Link>
      </p>
    </MarketingShell>
  );
}
