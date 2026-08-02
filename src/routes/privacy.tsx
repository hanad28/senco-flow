import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/landing/marketing-shell";
import { pageTitle } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: pageTitle("Privacy") },
      { name: "description", content: "Unisen privacy policy for website enquiries." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <MarketingShell title="Privacy Policy">
      <p>Last updated: 2 August 2026</p>
      <p>
        If you book a walkthrough via this site, we collect the name, email, phone number,
        organisation/role, and message you submit. We use Cloudflare Turnstile to reduce spam.
      </p>
      <p>
        We use that information only to respond. Enquiry records are deleted after
        30 days unless an active conversation needs them longer.
      </p>
      <p>
        Please don’t send children’s names, medical details, or other sensitive
        case information through the form.
      </p>
      <p>
        Questions or deletion requests:{" "}
        <a className="text-primary hover:underline" href="mailto:enquiries@unisen.uk">
          enquiries@unisen.uk
        </a>
      </p>
    </MarketingShell>
  );
}
