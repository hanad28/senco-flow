import { createFileRoute, Link } from "@tanstack/react-router";
import { FamilyShell } from "@/components/family-shell";
import { useFamilyI18n } from "@/lib/family-i18n";
import { useFamilyCase } from "@/lib/family-case-store";

export const Route = createFileRoute("/family/cases/$id/")({
  component: () => {
    const { state } = useFamilyCase();
    const { t } = useFamilyI18n();
    return (
      <FamilyShell>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-4">
          <h1 className="text-xl font-semibold">{state.childName}</h1>
          <p className="text-sm text-muted-foreground">{t("nav.case")}</p>
          <div className="flex flex-wrap gap-2">
            <Link to={`/family/cases/${state.id}/plan`} className="rounded-md border px-3 py-2 text-sm hover:bg-accent">{t("nav.plan")}</Link>
            <Link to={`/family/cases/${state.id}/issues`} className="rounded-md border px-3 py-2 text-sm hover:bg-accent">{t("nav.issues")}</Link>
            <Link to={`/family/cases/${state.id}/response`} className="rounded-md border px-3 py-2 text-sm hover:bg-accent">{t("nav.response")}</Link>
          </div>
        </div>
      </FamilyShell>
    );
  },
});
