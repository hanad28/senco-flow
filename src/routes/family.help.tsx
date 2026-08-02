import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { FamilyShell } from "@/components/family-shell";
import { useFamilyI18n } from "@/lib/family-i18n";
import { FAMILY_STATUTORY } from "@/lib/family-config";

export const Route = createFileRoute("/family/help")({
  component: HelpScreen,
});

const FAQS = [
  { q: "What is an EHC plan?", a: "An Education, Health and Care (EHC) plan sets out the special educational, health and social care needs of a child or young person, and the support they must receive." },
  { q: "What is Section F and why does it matter?", a: "Section F sets out the special educational provision. It should be specific about type, frequency, duration and who provides it, so it can be enforced." },
  { q: "How long do I have to respond to a draft plan?", a: `The local authority must give you at least ${FAMILY_STATUTORY.draftResponsePeriodDays} calendar days from the date you receive the draft to comment and to name a preferred school.` },
  { q: "What if I need more time?", a: "You can ask the local authority for more time in writing. It is often granted, but keep a written record of the request." },
  { q: "Who can help me?", a: "SENDIASS gives free independent information, advice and support in your area. IPSEA and Contact also offer national resources." },
];

const LINKS = [
  { label: "SEND Code of Practice: 0 to 25 years (GOV.UK)", href: "https://www.gov.uk/government/publications/send-code-of-practice-0-to-25" },
  { label: "Children with special educational needs and disabilities (GOV.UK)", href: "https://www.gov.uk/children-with-special-educational-needs" },
  { label: "IPSEA: Independent Provider of Special Education Advice", href: "https://www.ipsea.org.uk/" },
  { label: "SENDIASS: Special Educational Needs and Disability Information, Advice and Support", href: "https://cyp.ipsea.org.uk/sendiass" },
];

function HelpScreen() {
  const { t } = useFamilyI18n();
  return (
    <FamilyShell>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">{t("nav.help")}</h1>
          <p className="text-sm text-muted-foreground mt-1">{FAMILY_STATUTORY.disclaimer}</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold">Common questions</h2>
          {FAQS.map((f, i) => (
            <details key={i} className="rounded-md border bg-surface p-3">
              <summary className="cursor-pointer text-sm font-medium">{f.q}</summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold">Independent information</h2>
          <ul className="space-y-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                  {l.label} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </FamilyShell>
  );
}
