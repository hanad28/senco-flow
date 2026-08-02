import { createFileRoute, Outlet } from "@tanstack/react-router";
import { FamilyI18nProvider } from "@/lib/family-i18n";
import { FamilyCaseProvider } from "@/lib/family-case-store";
import { pageTitle } from "@/lib/site";

export const Route = createFileRoute("/family")({
  head: () => ({
    meta: [
      { title: pageTitle("Family workspace") },
      { name: "description", content: "Family workspace for reviewing a draft EHC plan and preparing a response." },
      { name: "robots", content: "noindex" },
    ],
  }),
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
