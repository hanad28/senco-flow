import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — EHCP Response" },
      { name: "description", content: "Response history, outcomes, and school-level SEND reporting." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Reports"
      description="Aggregate response history, outcomes, and school-level SEND reporting — useful for governor packs and LA moderation meetings."
      icon={BarChart3}
    />
  ),
});
