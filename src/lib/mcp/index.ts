import { auth, defineMcp } from "@lovable.dev/mcp-js";
import { APP_URL, SITE_URL, clerkFrontendOrigin } from "@/lib/site";
import listConsultations from "./tools/list-consultations";
import getConsultation from "./tools/get-consultation";
import listTemplates from "./tools/list-templates";
import listEvidence from "./tools/list-evidence";
import getSchoolProfile from "./tools/get-school-profile";

/**
 * Clerk is the OAuth 2.1 authorization server; this MCP route is only the
 * resource server (verifies bearer JWTs against Clerk's JWKS).
 *
 * The issuer is the Clerk Frontend API origin, derived at build time from the
 * inlined publishable key. The sentinel keeps the config well-formed if the key
 * is absent during the throwaway manifest-extract eval — no token ever verifies
 * against it, so the server fails closed rather than falling back to public.
 */
const clerkIssuer = clerkFrontendOrigin() ?? "https://clerk-issuer-unset.invalid";

/**
 * MCP clients send the resource indicator they connected to (RFC 8707), so every
 * public origin that serves /mcp must be listed. `resource` is intentionally not
 * pinned to one host: the same Worker serves the app, marketing, and Lovable hosts.
 */
const acceptedAudiences = [
  `${APP_URL}/mcp`,
  `${SITE_URL}/mcp`,
  "https://app.unisen.uk/mcp",
  "https://unisen.uk/mcp",
  "https://ehc-clear-path.lovable.app/mcp",
];

export default defineMcp({
  name: "ehcp-response-mcp",
  title: "EHCP Response",
  version: "0.1.0",
  instructions:
    "Signed-in access to a prototype SENDCO workspace for EHC needs-assessment consultations. Callers authenticate with the app's own accounts (Clerk) over OAuth 2.1; there is no anonymous access. Tools expose fictional seed data: incoming consultations with their 15-calendar-day (minimum) statutory deadlines, identified needs and draft responses per pupil, reusable Section F template snippets by area of need, the school's evidence library, and the school profile (provision catalogue, cohort baseline, staffing).",
  auth: auth.oauth.issuer({
    issuer: clerkIssuer,
    acceptedAudiences,
    resourceName: "Unisen EHCP Response workspace",
  }),
  tools: [
    listConsultations,
    getConsultation,
    listTemplates,
    listEvidence,
    getSchoolProfile,
  ],
});
