import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { seedNormalised } from "@/lib/consultations-store";
import { calendarDaysRemaining, calendarDeadlineDate } from "@/lib/working-days";

export default defineTool({
  name: "get_consultation",
  title: "Get consultation detail",
  description:
    "Return the full detail for a single consultation by id: documents, identified needs (with capability, domain, draft response, evidence), activity log, and deadline. Fictional prototype data.",
  inputSchema: {
    id: z.string().min(1).describe("Consultation id, e.g. 'c-pupil-a'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const c = seedNormalised.find((r) => r.id === id);
    if (!c) {
      return {
        content: [{ type: "text", text: `No consultation found with id '${id}'.` }],
        isError: true,
      };
    }
    const payload = {
      ...c,
      deadlineOn: calendarDeadlineDate(c.receivedOn),
      daysRemaining:
        c.status === "Submitted" ? null : calendarDaysRemaining(c.receivedOn),
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: { consultation: payload },
    };
  },
});
