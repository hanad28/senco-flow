import { createFileRoute } from "@tanstack/react-router";
import {
  DetailItem,
  DetailList,
  FinalWalkthroughCta,
  MarketingSection,
  RichMarketingPage,
  WalkthroughButton,
} from "@/landing/rich-marketing-page";
import { marketingPageHead } from "@/lib/seo";

const DESCRIPTION =
  "See what Unisen supports in the prototype, what can be configured during a pilot, and which SEND workflow integrations are planned.";

export const Route = createFileRoute("/integrations")({
  head: () =>
    marketingPageHead({
      title: "Integrations",
      description: DESCRIPTION,
      path: "/integrations",
    }),
  component: IntegrationsPage,
});

function IntegrationsPage() {
  return (
    <RichMarketingPage
      pageLabel="Integrations"
      title="Designed to fit around your existing SEND workflow"
      introduction="Schools and local authorities should not have to replace every system before improving the way EHC work is coordinated. Unisen is being designed to support practical import, export and handoff between the tools organisations already use."
      actions={<WalkthroughButton />}
    >
      <MarketingSection
        eyebrow="Current"
        title="Available in the prototype"
        introduction="These capabilities can be seen in the current product demonstration."
        id="available"
      >
        <DetailList>
          <DetailItem>Structured document workflows</DetailItem>
          <DetailItem>Document review</DetailItem>
          <DetailItem>Word document export</DetailItem>
          <DetailItem>Clear handoff between stages of a response</DetailItem>
        </DetailList>
      </MarketingSection>

      <MarketingSection
        eyebrow="Pilot scope"
        title="Configured during a pilot"
        introduction="A pilot would begin by confirming how an organisation works today and what a useful, appropriately governed deployment would need. These activities define requirements and do not imply that automatic connections already exist."
        id="pilot-configuration"
      >
        <DetailList>
          <DetailItem>Existing workflow mapping</DetailItem>
          <DetailItem>User and role requirements</DetailItem>
          <DetailItem>Required data imports and exports</DetailItem>
          <DetailItem>Document formats</DetailItem>
          <DetailItem>Reporting requirements</DetailItem>
          <DetailItem>Security and governance review</DetailItem>
        </DetailList>
      </MarketingSection>

      <MarketingSection
        eyebrow="Future direction"
        title="Planned integration areas"
        introduction="The areas below are planned rather than currently supported integrations. Priorities will depend on pilot requirements, technical access and governance review."
        id="planned"
      >
        <DetailList>
          <DetailItem>School management information systems</DetailItem>
          <DetailItem>Local authority SEND case-management systems</DetailItem>
          <DetailItem>Email and calendars</DetailItem>
          <DetailItem>Secure document storage</DetailItem>
          <DetailItem>Identity and single sign-on</DetailItem>
          <DetailItem>Reporting and data export APIs</DetailItem>
        </DetailList>
      </MarketingSection>

      <FinalWalkthroughCta
        title="Talk through the systems and handoffs in your current workflow"
        body="A walkthrough can focus on what the prototype does today and what would need to be configured or planned for your organisation."
      />
    </RichMarketingPage>
  );
}
