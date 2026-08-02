import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import EnquiryDialog from "@/landing/components/enquiry-dialog";
import { MarketingShell } from "@/landing/marketing-shell";
import { pageTitle } from "@/lib/site";

export const Route = createFileRoute("/workshops")({
  head: () => ({
    meta: [
      { title: pageTitle("Workshops") },
      {
        name: "description",
        content: "Book a Unisen walkthrough or pilot session with your SENCO team.",
      },
    ],
  }),
  component: WorkshopsPage,
});

function WorkshopsPage() {
  return (
    <MarketingShell title="Workshops">
      <p>
        We run short walkthroughs with SENCOs, school leaders, and local-authority
        contacts who want to see the consultation-response workflow.
      </p>
      <p>
        Typical session: 15 minutes on the live product surface, then questions
        about your current process. No self-serve signup: we schedule with you
        directly.
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
