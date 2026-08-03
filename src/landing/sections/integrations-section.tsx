import CtaButton from "../components/cta-button";
import {
  integrationSteps as stepsContent,
  integrationTools as toolsContent,
  type IntegrationStep,
} from "../content";

/** “Connects with your stack”: Unisen evidence & systems. */
export default function IntegrationsSection({
  steps = stepsContent,
  tools = toolsContent,
}: {
  steps?: IntegrationStep[];
  tools?: string[];
} = {}) {
  return (
    <section
      id="integration"
      className="w-full flex relative py-20 px-5 flex-col justify-start items-center content-center shrink-0 max-lg:py-12 max-lg:px-4"
      aria-labelledby="integrations-heading"
    >
      <div className="w-full max-w-310 flex flex-col gap-12 max-lg:gap-8">
        <div className="flex w-full items-end justify-between gap-8 max-lg:flex-col max-lg:items-start max-lg:gap-4">
          <div className="flex max-w-xl flex-col gap-3">
            <p className="text-accent [font-family:var(--font-body)] text-sm font-semibold">
              Workflow
            </p>
            <h2
              id="integrations-heading"
              className="text-color-001 [font-family:var(--font-heading)] text-[2.5rem] font-bold leading-[1.15] tracking-[-0.04em] text-balance max-lg:text-[1.75rem]"
              data-component="heading"
            >
              Works with the evidence you already collect.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground [font-family:var(--font-body)] text-base leading-relaxed text-balance">
            No forced migration off your LA portal or school MIS. Bring advice, views and templates into the case and keep the statutory clock visible.
          </p>
        </div>

        <div className="grid w-full grid-cols-3 gap-4 max-lg:grid-cols-1">
          {steps.map((s) => (
            <div
              key={s.step}
              className="flex flex-col gap-4 rounded-[20px] border border-[var(--border-default)] bg-background p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-clr-0 text-color-001 [font-family:var(--font-heading)] text-base font-bold">
                {s.step}
              </span>
              <p className="text-color-001 [font-family:var(--font-body)] text-base font-semibold leading-snug">
                {s.title}
              </p>
            </div>
          ))}
        </div>

        <div className="flex w-full flex-col gap-5 rounded-[24px] border border-[var(--border-default)] bg-surface-2 p-8 max-lg:p-6">
          <p className="text-muted-foreground [font-family:var(--font-body)] text-sm font-semibold uppercase tracking-wide">
            Fits alongside
          </p>
          <ul className="flex flex-wrap gap-3">
            {tools.map((tool) => (
              <li
                key={tool}
                className="rounded-full border border-[var(--border-default)] bg-background px-4 py-2 text-sm font-medium text-color-001 [font-family:var(--font-body)]"
              >
                {tool}
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <CtaButton label="Explore the workspace" href="/product" variant="light" />
          </div>
        </div>
      </div>
    </section>
  );
}
