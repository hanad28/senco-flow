import { defineTool } from "@lovable.dev/mcp-js";
import { seedEvidence } from "@/lib/templates-store";

export default defineTool({
  name: "list_evidence",
  title: "List evidence documents",
  description:
    "List the school's evidence library — provision maps, staffing records, policies, training certificates — available to attach to Section F responses. Fictional prototype data.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(seedEvidence, null, 2) }],
    structuredContent: { evidence: seedEvidence, count: seedEvidence.length },
  }),
});
