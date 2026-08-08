import { createFileRoute, Link } from "@tanstack/react-router";
import {
  DetailItem,
  DetailList,
  FinalWalkthroughCta,
  MarketingCard,
  MarketingSection,
  RichMarketingPage,
  WalkthroughButton,
} from "@/landing/rich-marketing-page";
import { marketingPageHead } from "@/lib/seo";

const DESCRIPTION =
  "Explore Unisen's school and family workspaces for clearer EHC needs assessment and draft-plan response workflows.";

export const Route = createFileRoute("/product")({
  head: () =>
    marketingPageHead({
      title: "Product",
      description: DESCRIPTION,
      path: "/product",
    }),
  component: ProductPage,
});

function ProductPage() {
  return (
    <RichMarketingPage
      pageLabel="Product"
      title="Bring every part of the EHC process into view"
      introduction="Unisen helps schools and families understand what needs to happen, complete the work and keep the right people informed throughout an EHC needs assessment or draft-plan response."
      actions={
        <>
          <WalkthroughButton />
          <a
            href="/#product"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-[var(--border-default)] bg-white px-7 text-sm font-bold text-[var(--text-primary)] transition-colors hover:bg-[#effaff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2"
          >
            View the home page demo
          </a>
        </>
      }
    >
      <MarketingSection title="A clearer route from request to response" id="outcomes">
        <div className="grid gap-5 md:grid-cols-3">
          <MarketingCard title="Visibility">
            <p>
              See cases, documents, responsibilities, statutory dates and progress in one place.
            </p>
          </MarketingCard>
          <MarketingCard title="Execution assistance">
            <p>
              Turn complex SEND processes into clear steps, structured reviews and response-ready
              outputs.
            </p>
          </MarketingCard>
          <MarketingCard title="Communication">
            <p>
              Help schools, families and supporting professionals work from clearer, more consistent
              information.
            </p>
          </MarketingCard>
        </div>
      </MarketingSection>

      <MarketingSection
        eyebrow="Current prototype"
        title="School and SENCO workspace"
        introduction="The demonstrated school workflow brings consultation work into a guided sequence. The final response remains subject to school review and submission through the appropriate local authority process."
        id="schools"
      >
        <DetailList>
          <DetailItem>Track incoming EHC needs assessment consultations</DetailItem>
          <DetailItem>See statutory deadlines and case status</DetailItem>
          <DetailItem>Review the child's described needs</DetailItem>
          <DetailItem>Record whether the school can meet each area of need</DetailItem>
          <DetailItem>Draft clearer consultation responses</DetailItem>
          <DetailItem>Reuse structured response templates</DetailItem>
          <DetailItem>Review supporting documents</DetailItem>
          <DetailItem>Export a response for final review and submission</DetailItem>
        </DetailList>
      </MarketingSection>

      <MarketingSection
        eyebrow="Current prototype"
        title="Family workspace"
        introduction="Families can work through a draft plan in manageable sections and prepare a structured response. Where interface translations are available, the prototype supports English, Arabic, Urdu, Bengali and Somali."
        id="families"
      >
        <DetailList>
          <DetailItem>Review draft EHC plan sections</DetailItem>
          <DetailItem>Record issues and proposed amendments</DetailItem>
          <DetailItem>Organise supporting documents</DetailItem>
          <DetailItem>Prepare a structured response</DetailItem>
          <DetailItem>Access multilingual interface support</DetailItem>
          <DetailItem>Use guided assistance to understand the next step</DetailItem>
        </DetailList>
      </MarketingSection>

      <MarketingSection
        eyebrow="Platform direction"
        title="Shared coordination"
        introduction="Unisen is being developed around the people who already contribute to EHC work. The current prototype demonstrates separate school and family workflows, while broader multi-party coordination would be agreed and configured through future pilots."
        id="coordination"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <MarketingCard title="Families">
            <p>Remain involved and informed as information and responses are prepared.</p>
          </MarketingCard>
          <MarketingCard title="Schools">
            <p>
              Respond more consistently through structured reviews and reusable ways of working.
            </p>
          </MarketingCard>
          <MarketingCard title="Local authorities">
            <p>Could support coordinated rollouts across participating schools through a pilot.</p>
          </MarketingCard>
          <MarketingCard title="Healthcare and specialists">
            <p>
              Could contribute through appropriate workflows agreed for the relevant deployment.
            </p>
          </MarketingCard>
        </div>
        <p className="mt-6 text-sm leading-6 text-[var(--text-secondary)]">
          Read how imports, exports and organisational requirements may be approached on the{" "}
          <Link
            to="/integrations"
            className="font-bold text-[var(--action-primary)] underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
          >
            Integrations page
          </Link>
          .
        </p>
      </MarketingSection>

      <MarketingSection
        eyebrow="Responsible assistance"
        title="Support for the work, with people in control"
        id="responsible-assistance"
      >
        <div className="rounded-[1.25rem] border border-[#f0d465] bg-[#fff9dc] p-6 text-sm leading-7 text-[var(--text-primary)] max-md:p-5">
          <p>
            Unisen supports users in organising information and preparing work. Human review remains
            required before any response is shared or submitted.
          </p>
          <p className="mt-3 font-semibold">
            Unisen does not make statutory, legal, clinical or placement decisions. It is not a
            substitute for qualified legal, clinical or other professional advice.
          </p>
        </div>
      </MarketingSection>

      <FinalWalkthroughCta title="See how Unisen could fit your current process" />
    </RichMarketingPage>
  );
}
