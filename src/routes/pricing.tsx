import { createFileRoute } from "@tanstack/react-router";
import {
  FinalWalkthroughCta,
  MarketingCard,
  MarketingSection,
  RichMarketingPage,
  WalkthroughButton,
} from "@/landing/rich-marketing-page";
import { marketingPageHead } from "@/lib/seo";

const DESCRIPTION =
  "Core Unisen access is free for families, with tailored pilot or rollout pricing for schools, trusts and local authorities.";

export const Route = createFileRoute("/pricing")({
  head: () =>
    marketingPageHead({
      title: "Pricing & pilots",
      description: DESCRIPTION,
      path: "/pricing",
    }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <RichMarketingPage
      pageLabel="Pricing & pilots"
      title="Free for families. Tailored for organisations."
      introduction="Core family access is free. Schools, trusts and local authorities receive a tailored proposal based on the scale of the rollout, expected caseload and support required."
      actions={<WalkthroughButton />}
    >
      <MarketingSection title="Pricing built around who is taking part" id="audiences">
        <div className="grid gap-5 md:grid-cols-2">
          <MarketingCard title="Families" label="Free core access">
            <p>
              Families can use the core navigation, plan-review and response-preparation tools
              without paying.
            </p>
          </MarketingCard>

          <MarketingCard
            title="Schools and academy trusts"
            label="Tailored pilot or annual pricing"
          >
            <p>A proposal may reflect:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Number of settings</li>
              <li>Expected SEND and EHC caseload</li>
              <li>Number and type of users</li>
              <li>Workspaces or modules required</li>
              <li>Onboarding and support</li>
              <li>Integration requirements</li>
              <li>Reporting requirements</li>
              <li>Contract length</li>
            </ul>
          </MarketingCard>

          <MarketingCard title="Local authorities" label="Portfolio pricing">
            <p>
              One coordinated agreement can cover participating schools across a local authority
              area. Pricing is based on the number of settings, expected caseload and rollout
              requirements, with the aim of reducing duplicated procurement and providing better
              value across the participating schools.
            </p>
          </MarketingCard>

          <MarketingCard
            title="Healthcare and specialist partners"
            label="Included collaboration access"
          >
            <p>
              Where a healthcare or specialist professional is invited into a participating school
              or local authority workflow, appropriate collaboration access can be included within
              the organisational deployment. Standalone organisational pricing is still being
              developed.
            </p>
          </MarketingCard>
        </div>
      </MarketingSection>

      <MarketingSection title="How a proposal is prepared" id="proposal">
        <ol className="grid gap-4 md:grid-cols-2">
          {[
            "A short walkthrough and discovery discussion",
            "Confirmation of the organisations, cases and workflows in scope",
            "A proposed pilot or rollout structure",
            "Clear indicative pricing and next steps",
          ].map((step, index) => (
            <li
              key={step}
              className="flex gap-4 rounded-[1.25rem] border border-[var(--border-default)] bg-white p-5 text-sm leading-6 text-[var(--text-secondary)]"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--action-primary)] font-bold text-white">
                {index + 1}
              </span>
              <span className="pt-1">{step}</span>
            </li>
          ))}
        </ol>
      </MarketingSection>

      <FinalWalkthroughCta
        title="Start with a short walkthrough"
        body="We will use the discussion to understand the scope, explain what is available now and outline a proportionate next step."
      />
    </RichMarketingPage>
  );
}
