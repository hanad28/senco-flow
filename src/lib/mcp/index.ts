import { defineMcp } from "@lovable.dev/mcp-js";
import listConsultations from "./tools/list-consultations";
import getConsultation from "./tools/get-consultation";
import listTemplates from "./tools/list-templates";
import listEvidence from "./tools/list-evidence";
import getSchoolProfile from "./tools/get-school-profile";

export default defineMcp({
  name: "ehcp-response-mcp",
  title: "EHCP Response",
  version: "0.1.0",
  instructions:
    "Read-only access to a prototype SENDCO workspace for EHC needs-assessment consultations. Tools expose fictional seed data: incoming consultations with their 15-calendar-day (minimum) statutory deadlines, identified needs and draft responses per pupil, reusable Section F template snippets by area of need, the school's evidence library, and the school profile (provision catalogue, cohort baseline, staffing). No PII — every pupil is fictional.",
  tools: [
    listConsultations,
    getConsultation,
    listTemplates,
    listEvidence,
    getSchoolProfile,
  ],
});
