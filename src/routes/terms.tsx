import { createFileRoute } from "@tanstack/react-router";
import { MarketingSection, RichMarketingPage } from "@/landing/rich-marketing-page";
import { marketingPageHead } from "@/lib/seo";

const DESCRIPTION =
  "Terms governing use of the public Unisen website, including its informational and demonstration content.";

export const Route = createFileRoute("/terms")({
  head: () =>
    marketingPageHead({
      title: "Website Terms of Use",
      description: DESCRIPTION,
      path: "/terms",
    }),
  component: TermsPage,
});

const sectionBodyClass = "max-w-3xl space-y-4 text-sm leading-7 text-[var(--text-secondary)]";

function TermsPage() {
  return (
    <RichMarketingPage
      pageLabel="Terms"
      title="Website Terms of Use"
      introduction="These terms govern access to and use of the public Unisen website. They are not a subscription agreement or a paid product contract for a school, local authority, family or other organisation."
    >
      <p className="mb-10 text-sm font-semibold text-[var(--text-secondary)]">
        Last updated: 2 August 2026
      </p>

      <MarketingSection title="1. About these terms" id="about-these-terms">
        {/* LEGAL REVIEW: Replace Unisen with the final contracting legal entity after incorporation. */}
        <div className={sectionBodyClass}>
          <p>
            By using this public website, you agree to use it in line with these terms. If you do
            not agree, please do not use the website.
          </p>
          <p>
            Any pilot, subscription or other product access will require separate terms agreed with
            the relevant organisation or user.
          </p>
        </div>
      </MarketingSection>

      <MarketingSection title="2. Information provided on the website" id="information">
        <div className={sectionBodyClass}>
          <p>
            The website provides general information about Unisen, its current prototype, pilot
            approach and future direction. We aim to keep this information useful and current, but
            product features and plans may change.
          </p>
          <p>
            You should verify information that is important to a decision and obtain appropriate
            professional advice where needed.
          </p>
        </div>
      </MarketingSection>

      <MarketingSection title="3. No legal, clinical or statutory advice" id="no-advice">
        <div className={sectionBodyClass}>
          <p>
            Content on this website, including product demonstrations and examples, is general
            information. It is not legal or clinical advice and does not determine statutory duties,
            placement decisions or outcomes.
          </p>
          <p>
            Unisen is not a substitute for a local authority's statutory process or advice from a
            qualified lawyer, healthcare professional or other specialist.
          </p>
        </div>
      </MarketingSection>

      <MarketingSection title="4. Demonstration and fictional product data" id="demonstration-data">
        <div className={sectionBodyClass}>
          <p>
            Product screens may contain fictional people, cases, documents and other demonstration
            data. They are provided to illustrate a workflow and must not be treated as a real case
            record or professional recommendation.
          </p>
        </div>
      </MarketingSection>

      <MarketingSection title="5. Permitted website use" id="permitted-use">
        <div className={sectionBodyClass}>
          <p>
            You may browse the website, share links to public pages, contact us through the enquiry
            form and use the information for lawful personal or internal business evaluation.
          </p>
          <p>
            You are responsible for ensuring that your use is lawful and that information you submit
            is accurate and appropriate for the public website enquiry channel.
          </p>
        </div>
      </MarketingSection>

      <MarketingSection title="6. Prohibited misuse" id="prohibited-misuse">
        <div className={sectionBodyClass}>
          <p>You must not:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Use the website unlawfully, fraudulently or to harm another person</li>
            <li>Attempt to disrupt, overload or gain unauthorised access to the website</li>
            <li>Introduce malicious code or interfere with website operation</li>
            <li>
              Use the enquiry form to send spam, abusive content or sensitive case information
            </li>
            <li>Misrepresent your identity or relationship with an organisation</li>
            <li>
              Copy or exploit website content in a way that infringes intellectual property rights
            </li>
          </ul>
        </div>
      </MarketingSection>

      <MarketingSection title="7. Intellectual property" id="intellectual-property">
        <div className={sectionBodyClass}>
          <p>
            Unless stated otherwise, the website, Unisen branding, written content, design and
            demonstration materials are owned by or licensed to Unisen. These terms do not transfer
            any intellectual property rights to you.
          </p>
          <p>
            You may make reasonable copies for personal or internal evaluation, provided you do not
            remove ownership notices or present the material as your own.
          </p>
        </div>
      </MarketingSection>

      <MarketingSection title="8. Third-party links" id="third-party-links">
        <div className={sectionBodyClass}>
          <p>
            The website may link to third-party websites for convenience or further information. We
            do not control those websites or their content, availability or privacy practices. A
            link does not by itself mean that Unisen endorses the third party.
          </p>
        </div>
      </MarketingSection>

      <MarketingSection title="9. Website availability and changes" id="availability">
        <div className={sectionBodyClass}>
          <p>
            We may update, suspend or withdraw parts of the public website. We do not promise that
            the website will always be available, uninterrupted or free from errors.
          </p>
          <p>
            We may revise these terms. The updated date at the top of this page shows when the
            latest version was published.
          </p>
        </div>
      </MarketingSection>

      <MarketingSection title="10. Limitation of liability" id="liability">
        {/* LEGAL REVIEW: Counsel should confirm this limitation for the final legal entity. */}
        <div className={sectionBodyClass}>
          <p>
            Nothing in these terms excludes or limits liability where doing so would be unlawful,
            including liability for death or personal injury caused by negligence, fraud or
            fraudulent misrepresentation.
          </p>
          <p>
            Subject to applicable law, Unisen is not responsible for loss arising solely from
            reliance on general website information, inability to access the public website, or use
            of a third-party website linked from it. These terms do not affect rights that cannot
            lawfully be excluded or limited.
          </p>
        </div>
      </MarketingSection>

      <MarketingSection title="11. Governing law" id="governing-law">
        <div className={sectionBodyClass}>
          <p>
            These website terms are governed by the law of England and Wales. The courts of England
            and Wales will have jurisdiction, subject to any mandatory rights you may have to bring
            proceedings elsewhere.
          </p>
        </div>
      </MarketingSection>

      <MarketingSection title="12. Contact details" id="contact-details">
        <div className={sectionBodyClass}>
          <p>
            Questions about the website or these terms can be sent to{" "}
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
