import { createFileRoute } from "@tanstack/react-router";
import { MarketingSection, RichMarketingPage } from "@/landing/rich-marketing-page";
import { marketingPageHead } from "@/lib/seo";

const DESCRIPTION =
  "Unisen's website privacy notice explains how information from visitors, enquiries, walkthrough requests and demo account snapshots is handled.";

export const Route = createFileRoute("/privacy")({
  head: () =>
    marketingPageHead({
      title: "Website Privacy Notice",
      description: DESCRIPTION,
      path: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <RichMarketingPage
      pageLabel="Privacy"
      title="Website Privacy Notice"
      introduction="This notice explains how Unisen handles personal information from visitors to this website, people who contact us through the website enquiry form, and signed-in users of the fictional product demonstration."
    >
      <p className="mb-10 text-sm font-semibold text-[var(--text-secondary)]">
        Last updated: 3 August 2026
      </p>

      <MarketingSection title="1. Who we are" id="who-we-are">
        <div className="max-w-3xl space-y-4 text-sm leading-7 text-[var(--text-secondary)]">
          <p>
            This website and demonstration product are operated by the people currently building
            Unisen. For privacy requests and questions about this notice, contact{" "}
            <a
              className="font-bold text-[var(--action-primary)] underline underline-offset-4"
              href="mailto:enquiries@unisen.uk"
            >
              enquiries@unisen.uk
            </a>
            .
          </p>
          <p>
            {/* LEGAL REVIEW: Replace with the named current controller(s) and a geographic address
                now (individual, partnership or company). ICO Article 13 and, where applicable,
                e-commerce transparency require identity plus contact details that include a
                geographic address. Do not leave this as "founding team" only. */}
            The named controller identity and geographic contact address for the current operators
            are not yet published on this page. Until that information is confirmed and added here,
            privacy correspondence should be sent to enquiries@unisen.uk. After incorporation, this
            notice will also show the registered company name, company number, jurisdiction and
            registered office.
          </p>
        </div>
      </MarketingSection>

      <MarketingSection title="2. Scope of this notice" id="scope">
        <div className="max-w-3xl space-y-4 text-sm leading-7 text-[var(--text-secondary)]">
          <p>This notice covers:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Website visitors</li>
            <li>Website enquiries and walkthrough requests</li>
            <li>
              Signed-in use of the fictional school and family demonstration workspaces, including
              account-linked snapshot storage
            </li>
          </ul>
          <p>
            It is not a complete privacy notice for live SEND case processing. Do not enter real
            children&apos;s names, medical information, EHC plan content or other live case data. A
            separate product privacy notice, DPIA and processor arrangements will be required before
            any real SEND case data is accepted.
          </p>
        </div>
      </MarketingSection>

      <MarketingSection title="3. Information we collect" id="information">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.25rem] border border-[var(--border-default)] bg-white p-6">
            <h3 className="font-bold text-[var(--text-primary)]">Enquiry information you provide</h3>
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
          <div className="rounded-[1.25rem] border border-[var(--border-default)] bg-white p-6 md:col-span-2">
            <h3 className="font-bold text-[var(--text-primary)]">
              Account and demonstration snapshot information
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              If you sign in to the demonstration product, we associate stored snapshots with your
              authentication identity (and, for school-workspace kinds, an organisation identifier
              when your sign-in provider supplies one). Snapshot content can include fictional or
              user-entered demonstration data such as:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--text-secondary)]">
              <li>School profile details, provision catalogue and staffing notes</li>
              <li>Consultation lists, draft responses, evidence labels and activity history</li>
              <li>Template snippets and evidence library entries</li>
              <li>
                Family-case demonstration content such as plan notes, issues, documents, placement
                preferences, support-network names/roles and private notes
              </li>
            </ul>
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
            We use account-linked demonstration snapshots to operate the signed-in prototype, restore
            your demo workspace between sessions, and evaluate product behaviour. These snapshots are
            for demonstration and evaluation only.
          </p>
          <p>
            Depending on the circumstances, we expect this processing to be based on our legitimate
            interests in responding to enquiries and operating the website and demonstration product,
            steps requested before entering into a contract, or consent where we specifically ask for
            it. The appropriate lawful basis must be confirmed against the circumstances of each use.
          </p>
        </div>
      </MarketingSection>

      <MarketingSection title="5. Sensitive information" id="sensitive-information">
        <div className="max-w-4xl rounded-[1.25rem] border-2 border-[#e1b400] bg-[#fff9dc] p-6 text-base font-bold leading-7 text-[var(--text-primary)]">
          Please do not send children&apos;s names, medical information, EHC plan content or other
          sensitive case information through the website enquiry form or the demonstration product.
          The demonstration stores signed-in workspace content in Convex; it is not a live case
          system.
        </div>
      </MarketingSection>

      <MarketingSection title="6. Service providers and sharing" id="providers">
        {/* LEGAL REVIEW: Confirm provider retention, transfer locations and transfer safeguards. */}
        <div className="max-w-3xl space-y-4 text-sm leading-7 text-[var(--text-secondary)]">
          <p>We use service providers to operate the website and demonstration:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-[var(--text-primary)]">Convex</strong> stores enquiry records
              and account-linked demonstration snapshots in the application database.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">Clerk</strong> provides authentication
              for signed-in access to the demonstration product.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">Cloudflare</strong> hosts the website and
              provides Turnstile spam protection for the enquiry form.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">Resend</strong> sends enquiry
              notification and confirmation emails.
            </li>
            <li>Enquiry notifications currently reach the team&apos;s email inbox.</li>
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
        <div className="max-w-3xl space-y-4 text-sm leading-7 text-[var(--text-secondary)]">
          <p>
            The enquiry record stored in our website database is normally deleted after 30 days.
            Related email correspondence may be retained for longer where reasonably necessary to
            respond to the enquiry, maintain business records or follow up on an active conversation.
          </p>
          <p>
            Account-linked demonstration snapshots remain stored while your account continues to use
            the prototype, and may be overwritten when you edit or reset a demo workspace. You can
            request deletion of your demonstration snapshots by emailing enquiries@unisen.uk. Snapshot
            retention will be reviewed again before any live SEND case processing begins.
          </p>
        </div>
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
          may also complain to the UK Information Commissioner&apos;s Office. Current guidance and the
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
            Signed-in demonstration access uses authentication cookies or similar session technology
            provided by Clerk so that we can keep you signed in on the app host.
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
