import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import EnquiryDialog from "@/landing/components/enquiry-dialog";
import { MarketingShell } from "@/landing/marketing-shell";
import { marketingPageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    marketingPageHead({
      title: "Contact",
      description: "Book a 15-minute Unisen walkthrough or email the team.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <MarketingShell title="Contact">
      <p>
        Book a short walkthrough, or email us. Please don’t include children’s
        names or sensitive case details in the form.
      </p>
      <p>
        Email:{" "}
        <a className="text-primary hover:underline" href="mailto:enquiries@unisen.uk">
          enquiries@unisen.uk
        </a>
      </p>
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
