import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — EHCP Response" },
      { name: "description", content: "School profile, staff, and integration settings." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Settings"
      description="School profile, staff, notification preferences, and integrations with the local authority's case management system."
      icon={Settings}
    />
  ),
});
