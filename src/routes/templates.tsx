import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates — EHCP Response" },
      { name: "description", content: "Reusable response templates and standard statutory phrasing." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Templates"
      description="Reusable boilerplate for response letters — standard statutory phrasing that can be dropped into a draft response."
      icon={ClipboardList}
    />
  ),
});
