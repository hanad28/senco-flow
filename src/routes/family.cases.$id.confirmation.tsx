import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { FamilyShell } from "@/components/family-shell";
import { useFamilyI18n } from "@/lib/family-i18n";
import { useFamilyCase } from "@/lib/family-case-store";

export const Route = createFileRoute("/family/cases/$id/confirmation")({
  component: ConfirmationScreen,
});

function ConfirmationScreen() {
  const { t } = useFamilyI18n();
  const { state } = useFamilyCase();
  return (
    <FamilyShell>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center space-y-6">
        <div className="mx-auto h-16 w-16 rounded-full bg-ok/15 text-ok grid place-items-center">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">{t("confirm.ready")}</h1>
        <p className="text-sm text-muted-foreground">{t("confirm.notSent")}</p>
        <p className="text-sm">
          Your response for <strong>{state.childName}</strong> is ready to download and send to {state.localAuthority}.
        </p>
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          <Link to="/family" className="inline-flex items-center gap-2 min-h-11 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t("confirm.returnHome")}
          </Link>
          <Link to={`/family/cases/${state.id}/response`} className="inline-flex items-center gap-2 min-h-11 px-4 rounded-md border text-sm hover:bg-accent">
            Back to my response
          </Link>
        </div>
      </div>
    </FamilyShell>
  );
}
