import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { seedNormalised } from "@/lib/consultations-store";
import { calendarDaysRemaining } from "@/lib/working-days";

export default defineTool({
  name: "list_consultations",
  title: "List EHC consultations",
  description:
    "List EHC needs-assessment consultations in the school workspace, with pupil ref, LA, status, receipt date, and days remaining against the 15-calendar-day (minimum) statutory window. All data is fictional prototype seed data.",
  inputSchema: {
    status: z
      .enum(["New", "Reviewing", "Drafting", "Submitted", "Open", "All"])
      .default("All")
      .describe("Filter by status. 'Open' = not yet submitted."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ status }) => {
    const rows = seedNormalised
      .filter((c) => {
        if (status === "All") return true;
        if (status === "Open") return c.status !== "Submitted";
        return c.status === status;
      })
      .map((c) => ({
        id: c.id,
        pupilRef: c.pupilRef,
        yearGroup: c.yearGroup,
        localAuthority: c.localAuthority,
        caseOfficer: c.caseOfficer,
        status: c.status,
        receivedOn: c.receivedOn,
        submittedOn: c.submittedOn,
        daysRemaining:
          c.status === "Submitted" ? null : calendarDaysRemaining(c.receivedOn),
        needsCount: c.needs.length,
      }));

    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { consultations: rows, count: rows.length },
    };
  },
});
