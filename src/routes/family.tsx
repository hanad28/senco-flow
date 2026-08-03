import { createFileRoute, Outlet } from "@tanstack/react-router";
import { FamilyI18nProvider } from "@/lib/family-i18n";
import { FamilyCaseProvider } from "@/lib/family-case-store";
import { appNoIndexHead } from "@/lib/seo";

export const Route = createFileRoute("/family")({
  head: () =>
    appNoIndexHead(
      "Family workspace",
      "Family workspace for reviewing a draft EHC plan and preparing a response.",
    ),
  component: FamilyLayout,
});

function FamilyLayout() {
  return (
    <FamilyI18nProvider>
      <FamilyCaseProvider>
        <Outlet />
      </FamilyCaseProvider>
    </FamilyI18nProvider>
  );
}
