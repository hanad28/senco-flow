import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar — EHCP Response" },
      { name: "description", content: "Chronological view of statutory 15 working-day deadlines." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Calendar"
      description="A chronological view of every open consultation's 15 working-day statutory deadline, with reminders at T-5, T-2, and overdue."
      icon={Calendar}
    />
  ),
});
