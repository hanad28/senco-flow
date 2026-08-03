import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import EnquiryDialog from "@/landing/components/enquiry-dialog";
import { MarketingShell } from "@/landing/marketing-shell";
import { marketingPageHead } from "@/lib/seo";

export const Route = createFileRoute("/help")({
  head: () =>
    marketingPageHead({
      title: "Help",
      description: "Help and FAQs for Unisen: book a walkthrough or email the team.",
      path: "/help",
    }),
  component: HelpPage,
});

function HelpPage() {
  return (
    <MarketingShell title="Help">
      <p>
        Unisen is in pilot validation. There isn’t a full help centre yet: start
        here:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <Link to="/product" className="text-primary hover:underline">
            Product overview
          </Link>
        </li>
        <li>
          <Link to="/blog" className="text-primary hover:underline">
            Blog
          </Link>
        </li>
        <li>
          Email{" "}
          <a className="text-primary hover:underline" href="mailto:enquiries@unisen.uk">
            enquiries@unisen.uk
          </a>
        </li>
      </ul>
      <p>
        Please don’t include children’s names or sensitive case details in web
        forms.
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
