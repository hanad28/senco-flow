import { defineTool } from "@lovable.dev/mcp-js";
import { seedSchoolProfile } from "@/lib/school-profile-store";

export default defineTool({
  name: "get_school_profile",
  title: "Get school profile",
  description:
    "Return the school's identity, provision catalogue by area of need, cohort baseline counts, staffing/capacity, and response-style preference. This is the source of truth for what the school currently offers.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(seedSchoolProfile, null, 2) }],
    structuredContent: { profile: seedSchoolProfile },
  }),
});
