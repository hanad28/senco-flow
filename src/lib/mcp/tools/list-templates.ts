import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { seedSnippets } from "@/lib/templates-store";
import { domainOrder } from "@/lib/school-profile-store";

export default defineTool({
  name: "list_section_f_templates",
  title: "List Section F template snippets",
  description:
    "Reusable Section F provision-response snippets for 'can meet in part' and 'cannot meet' outcomes, organised by the four statutory areas of need. Snippets may contain {{pupil}}, {{year_group}}, {{LA}} tokens.",
  inputSchema: {
    domain: z
      .enum([...domainOrder, "all"] as [string, ...string[]])
      .default("all")
      .describe("Filter by area of need, or 'all'."),
    capability: z
      .enum(["partial", "cannot", "all"])
      .default("all")
      .describe("Filter by outcome."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ domain, capability }) => {
    const rows = seedSnippets.filter(
      (s) =>
        (domain === "all" || s.domain === domain) &&
        (capability === "all" || s.capability === capability),
    );
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { snippets: rows, count: rows.length },
    };
  },
});
