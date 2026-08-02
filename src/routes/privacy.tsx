import { createFileRoute } from "@tanstack/react-router";
import { MarketingSection, RichMarketingPage } from "@/landing/rich-marketing-page";
import { pageTitle, SITE_URL } from "@/lib/site";

const DESCRIPTION =
  "Unisen's website privacy notice explains how information from visitors, enquiries and walkthrough requests is handled.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: pageTitle("Website Privacy Notice") },
      { name: "description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacy` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <RichMarketingPage
      pageLabel="Privacy"
      title="Website Privacy Notice"
      introduction="This notice explains how Unisen handles personal information from visitors to this website and people who contact us through the website enquiry form."
    >
      <p className="mb-10 text-sm font-semibold text-[var(--text-secondary)]">
        Last updated: 2 August 2026
      </p>

      <MarketingSection title="1. Who we are" id="who-we-are">
        {/* LEGAL REVIEW: Insert the final legal entity name and contact address after incorporation. */}
        <div className="max-w-3xl space-y-4 text-sm leading-7 text-[var(--text-secondary)]">
          <p>
            Unisen operates this website. You can contact us about privacy or this notice at{" "}
            <a
              className="font-bold text-[var(--action-primary)] underline underline-offset-4"
              href="mailto:enquiries@unisen.uk"
            >
              enquiries@unisen.uk
            </a>
            .
          </p>
        </div>
      </MarketingSection>

      <MarketingSection title="2. Scope of this notice" id="scope">
        <div className="max-w-3xl space-y-4 text-sm leading-7 text-[var(--text-secondary)]">
          <p>
            This notice covers website visitors, website enquiries and requests for a walkthrough.
            It is not a complete privacy notice for the future processing of live SEND cases.
          </p>
          <p>
            A separate product privacy notice will apply before real SEND case data is processed
            through Unisen.
          </p>
        </div>
      </MarketingSection>

      <MarketingSection title="3. Information we collect" id="information">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.25rem] border border-[var(--border-default)] bg-white p-6">
            <h3 className="font-bold text-[var(--text-primary)]">Information you provide</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--text-secondary)]">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Organisation and role</li>
              <li>Enquiry message</li>
            </ul>
          </div>
          <div className="rounded-[1.25rem] border border-[var(--border-default)] bg-white p-6">
            <h3 className="font-bold text-[var(--text-primary)]">Technical information</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              Cloudflare Turnstile processes technical information needed to check whether a form
              submission may be spam or misuse. Its processing may include browser, device and
              network information associated with the verification check.
            </p>
          </div>
        </div>
      </MarketingSection>

      <MarketingSection title="4. How we use the information" id="use">
        {/* LEGAL REVIEW: Confirm each Article 6 lawful basis before publication by the final entity. */}
        <div className="max-w-3xl space-y-4 text-sm leading-7 text-[var(--text-secondary)]">
          <p>We use information from the website enquiry flow to:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Respond to enquiries</li>
            <li>Arrange walkthroughs</li>
            <li>Understand potential pilot requirements</li>
            <li>Prevent spam and misuse</li>
            <li>Maintain necessary business correspondence</li>
          </ul>
          <p>
            Depending on the circumstances, we expect this processing to be based on our legitimate
            interests in responding to enquiries and operating the website, steps requested before
            entering into a contract, or consent where we specifically ask for it. The appropriate
            lawful basis must be confirmed against the circumstances of each use.
          </p>
        </div>
      </MarketingSection>

      <MarketingSection title="5. Sensitive information" id="sensitive-information">
        <div className="max-w-4xl rounded-[1.25rem] border-2 border-[#e1b400] bg-[#fff9dc] p-6 text-base font-bold leading-7 text-[var(--text-primary)]">
          Please do not send children's names, medical information, EHC plan content or other
          sensitive case information through the website enquiry form.
        </div>
      </MarketingSection>

      <MarketingSection title="6. Service providers and sharing" id="providers">
        {/* LEGAL REVIEW: Confirm provider retention, transfer locations and transfer safeguards. */}
        <div className="max-w-3xl space-y-4 text-sm leading-7 text-[var(--text-secondary)]">
          <p>We use service providers to operate the website enquiry flow:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-[var(--text-primary)]">Convex</strong> stores the enquiry
              record in the website database.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">Cloudflare Turnstile</strong> provides
              spam protection for the enquiry form.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">Resend</strong> sends the enquiry
              notification and confirmation email.
            </li>
            <li>Enquiry notifications currently reach the team's email inbox.</li>
          </ul>
          <p>
            These providers may process information on our behalf. Their relevant processing
            locations, retention periods and any international transfer arrangements require final
            confirmation for the complete notice.
          </p>
        </div>
      </MarketingSection>

      <MarketingSection title="7. Retention" id="retention">
        {/* LEGAL REVIEW: Confirm the business correspondence and team inbox retention schedule. */}
        <p className="max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
          The enquiry record stored in our website database is normally deleted after 30 days.
          Related email correspondence may be retained for longer where reasonably necessary to
          respond to the enquiry, maintain business records or follow up on an active conversation.
        </p>
      </MarketingSection>

      <MarketingSection title="8. Your rights" id="rights">
        <div className="max-w-3xl space-y-4 text-sm leading-7 text-[var(--text-secondary)]">
          <p>
            Data protection law may give you rights over your personal information. Depending on the
            circumstances, these can include:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Access to your personal information</li>
            <li>Correction of inaccurate or incomplete information</li>
            <li>Deletion of your information</li>
            <li>Restriction of how your information is used</li>
            <li>Objection to certain uses of your information</li>
            <li>Data portability where applicable</li>
            <li>Withdrawal of consent where consent is used</li>
          </ul>
          <p>
            These rights are not absolute and may not apply in every circumstance. To make a
            request, email enquiries@unisen.uk.
          </p>
        </div>
      </MarketingSection>

      <MarketingSection title="9. Complaints" id="complaints">
        <p className="max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
          You can contact us first at enquiries@unisen.uk so that we can consider your concern. You
          may also complain to the UK Information Commissioner's Office. Current guidance and the
          complaint process are available on the{" "}
          <a
            href="https://ico.org.uk/make-a-complaint/"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-[var(--action-primary)] underline underline-offset-4"
          >
            ICO website
          </a>
          .
        </p>
      </MarketingSection>

      <MarketingSection title="10. Cookies and similar technologies" id="cookies">
        <div className="max-w-3xl space-y-4 text-sm leading-7 text-[var(--text-secondary)]">
          <p>
            Cloudflare Turnstile is loaded when you open the enquiry form. It uses browser and
            technical signals to distinguish genuine visitors from spam and may use cookies or
            similar technologies that are necessary for that check.
          </p>
          <p>
            The website does not currently use analytics, advertising or marketing cookies. We do
            not show a consent banner because we have not identified non-essential cookies in the
            current website implementation. We will review this if the technologies used on the site
            change.
          </p>
        </div>
      </MarketingSection>

      <MarketingSection title="11. Changes and contact" id="changes-contact">
        <div className="max-w-3xl space-y-4 text-sm leading-7 text-[var(--text-secondary)]">
          <p>
            We may update this notice as the website, organisation or applicable requirements
            change. The date at the top shows when it was last updated.
          </p>
          <p>
            Questions, requests and privacy concerns can be sent to{" "}
            <a
              className="font-bold text-[var(--action-primary)] underline underline-offset-4"
              href="mailto:enquiries@unisen.uk"
            >
              enquiries@unisen.uk
            </a>
            .
          </p>
        </div>
      </MarketingSection>
    </RichMarketingPage>
  );
}
