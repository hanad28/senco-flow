import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import EnquiryDialog from "@/landing/components/enquiry-dialog";
import { MarketingShell } from "@/landing/marketing-shell";
import { pageTitle } from "@/lib/site";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: pageTitle("Pricing") },
      {
        name: "description",
        content: "Unisen pricing during pilot validation — book a walkthrough to discuss your school or trust.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <MarketingShell title="Pricing">
      <p>
        We’re in active pilot validation. Pricing is not self-serve yet — it
        depends on school or trust size and which workspace you need first.
      </p>
      <p>Working direction (subject to change after pilot conversations):</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-foreground">School</strong> — SENCO consultation
          workspace for one setting.
        </li>
        <li>
          <strong className="text-foreground">Trust</strong> — multi-school rollout
          and shared oversight.
        </li>
        <li>
          <strong className="text-foreground">Family access</strong> — discussed per
          pilot; not a public checkout.
        </li>
      </ul>
      <p>Book a short walkthrough and we’ll confirm what fits.</p>
      <EnquiryDialog
        trigger={
          <Button type="button" size="lg" className="mt-2">
            Book a 15-min walkthrough
          </Button>
        }
      />
    </MarketingShell>
  );
}
