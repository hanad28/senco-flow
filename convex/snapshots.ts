import { v } from "convex/values";
import { mutation, query, type MutationCtx, type QueryCtx } from "./_generated/server";

const kind = v.union(
  v.literal("consultations"),
  v.literal("schoolProfile"),
  v.literal("templates"),
  v.literal("familyCase"),
);

type Kind = "consultations" | "schoolProfile" | "templates" | "familyCase";

/**
 * Convex documents are capped at 1 MiB. Keep the JSON value well under that so
 * scope/kind/updatedAt/_id metadata still fit.
 */
const MAX_SNAPSHOT_JSON_BYTES = 900_000;
const MAX_CONSULTATIONS = 500;
const MAX_EVIDENCE = 200;
const MAX_SNIPPETS = 200;
const MAX_FAMILY_LIST = 500;

const CONSULTATION_STATUSES = new Set(["New", "Reviewing", "Drafting", "Submitted"]);
const NEED_DOMAINS = new Set(["communication", "cognition", "semh", "sensory"]);
const NEED_CAPABILITIES = new Set(["full", "partial", "cannot"]);
const RESPONSE_STYLES = new Set(["formal", "plain"]);
const SNIPPET_CAPABILITIES = new Set(["partial", "cannot"]);
const ACTIVITY_ACTIONS = new Set([
  "received",
  "document_opened",
  "needs_reviewed",
  "draft_started",
  "draft_edited",
  "evidence_attached",
  "template_inserted",
  "submitted",
]);
const SPECIALIST_ARRANGEMENTS = new Set(["in-house", "external"]);
const ISSUE_STATUSES = new Set(["not_started", "drafted", "ready", "dismissed"]);
const NEED_PAIRING_STATUSES = new Set(["reviewed", "needs_attention", "not_reviewed"]);
const ASSISTANT_ROLES = new Set(["user", "assistant"]);
const FAM_ACTIVITY_ACTORS = new Set(["local_authority", "system", "family", "ai"]);
const AMENDMENT_SOURCES = new Set(["family", "ai_suggested", "workflow"]);
const PLAN_SECTIONS = new Set([
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H1",
  "H2",
  "I",
  "J",
  "K",
]);


function utf8ByteLength(text: string): number {
  return new TextEncoder().encode(text).byteLength;
}

function assertSerializableSize(value: unknown) {
  let encoded: string;
  try {
    encoded = JSON.stringify(value);
  } catch {
    throw new Error("Snapshot value is not serialisable");
  }
  if (utf8ByteLength(encoded) > MAX_SNAPSHOT_JSON_BYTES) {
    throw new Error("Snapshot exceeds the maximum allowed size");
  }
}

function assertPlainObject(value: unknown): asserts value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Snapshot value must be a plain object");
  }
}

function assertString(value: unknown, field: string): asserts value is string {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Snapshot field ${field} must be a non-empty string`);
  }
}

function assertStringValue(value: unknown, field: string): asserts value is string {
  if (typeof value !== "string") {
    throw new Error(`Snapshot field ${field} must be a string`);
  }
}

function assertOptionalString(value: unknown, field: string) {
  if (value !== undefined && typeof value !== "string") {
    throw new Error(`Snapshot field ${field} must be a string when present`);
  }
}

function assertNumber(value: unknown, field: string): asserts value is number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`Snapshot field ${field} must be a finite number`);
  }
}

function assertArray(value: unknown, field: string, max: number): asserts value is unknown[] {
  if (!Array.isArray(value)) {
    throw new Error(`Snapshot field ${field} must be an array`);
  }
  if (value.length > max) {
    throw new Error(`Snapshot field ${field} exceeds the maximum length of ${max}`);
  }
}

function assertBoolean(value: unknown, field: string): asserts value is boolean {
  if (typeof value !== "boolean") {
    throw new Error(`Snapshot field ${field} must be a boolean`);
  }
}

function assertConsultationDocument(item: unknown, field: string) {
  assertPlainObject(item);
  assertString(item.id, `${field}.id`);
  assertString(item.name, `${field}.name`);
  assertString(item.kind, `${field}.kind`);
  assertNumber(item.pages, `${field}.pages`);
  assertString(item.author, `${field}.author`);
  assertString(item.date, `${field}.date`);
}

function assertConsultationNeed(item: unknown, field: string) {
  assertPlainObject(item);
  assertString(item.id, `${field}.id`);
  assertString(item.title, `${field}.title`);
  assertString(item.source, `${field}.source`);
  // Historical seed needs intentionally use empty detail/draftResponse.
  assertStringValue(item.detail, `${field}.detail`);
  assertString(item.capability, `${field}.capability`);
  if (!NEED_CAPABILITIES.has(item.capability)) {
    throw new Error(`Snapshot ${field}.capability is invalid`);
  }
  assertString(item.domain, `${field}.domain`);
  if (!NEED_DOMAINS.has(item.domain)) {
    throw new Error(`Snapshot ${field}.domain is invalid`);
  }
  assertStringValue(item.draftResponse, `${field}.draftResponse`);
  assertArray(item.evidence, `${field}.evidence`, 50);
  for (const [index, evidence] of item.evidence.entries()) {
    assertStringValue(evidence, `${field}.evidence[${index}]`);
  }
  assertOptionalString(item.cannotRationale, `${field}.cannotRationale`);
}

function assertActivityEntry(item: unknown, field: string) {
  assertPlainObject(item);
  assertString(item.id, `${field}.id`);
  assertString(item.timestamp, `${field}.timestamp`);
  assertString(item.action, `${field}.action`);
  if (!ACTIVITY_ACTIONS.has(item.action)) {
    throw new Error(`Snapshot ${field}.action is invalid`);
  }
  assertOptionalString(item.detail, `${field}.detail`);
}

function assertConsultation(item: unknown, index: number) {
  assertPlainObject(item);
  assertString(item.id, `consultations[${index}].id`);
  assertString(item.pupilRef, `consultations[${index}].pupilRef`);
  assertString(item.yearGroup, `consultations[${index}].yearGroup`);
  assertString(item.localAuthority, `consultations[${index}].localAuthority`);
  assertString(item.caseOfficer, `consultations[${index}].caseOfficer`);
  assertString(item.receivedOn, `consultations[${index}].receivedOn`);
  assertString(item.status, `consultations[${index}].status`);
  if (!CONSULTATION_STATUSES.has(item.status)) {
    throw new Error(`Snapshot consultations[${index}].status is invalid`);
  }
  assertStringValue(item.summary, `consultations[${index}].summary`);
  assertArray(item.documents, `consultations[${index}].documents`, 100);
  item.documents.forEach((doc, docIndex) => {
    assertConsultationDocument(doc, `consultations[${index}].documents[${docIndex}]`);
  });
  assertArray(item.needs, `consultations[${index}].needs`, 100);
  item.needs.forEach((need, needIndex) => {
    assertConsultationNeed(need, `consultations[${index}].needs[${needIndex}]`);
  });
  assertOptionalString(item.submittedOn, `consultations[${index}].submittedOn`);
  if (item.activity !== undefined) {
    assertArray(item.activity, `consultations[${index}].activity`, 500);
    item.activity.forEach((entry, entryIndex) => {
      assertActivityEntry(entry, `consultations[${index}].activity[${entryIndex}]`);
    });
  }
}

function assertProvisionItem(item: unknown, field: string) {
  assertPlainObject(item);
  assertString(item.id, `${field}.id`);
  assertStringValue(item.description, `${field}.description`);
}

function assertSpecialist(item: unknown, field: string) {
  assertPlainObject(item);
  assertString(item.id, `${field}.id`);
  assertStringValue(item.role, `${field}.role`);
  assertString(item.arrangement, `${field}.arrangement`);
  if (!SPECIALIST_ARRANGEMENTS.has(item.arrangement)) {
    throw new Error(`Snapshot ${field}.arrangement is invalid`);
  }
  assertStringValue(item.detail, `${field}.detail`);
}

function assertSchoolProfile(value: Record<string, unknown>) {
  // Editable identity fields may be cleared in the UI before save.
  assertStringValue(value.schoolName, "schoolName");
  assertStringValue(value.schoolAddress, "schoolAddress");
  assertStringValue(value.sendcoName, "sendcoName");
  assertStringValue(value.sendcoRole, "sendcoRole");
  assertPlainObject(value.provision);
  assertPlainObject(value.cohort);
  assertPlainObject(value.staffing);
  assertArray(value.specialists, "specialists", 100);
  value.specialists.forEach((item, index) => {
    assertSpecialist(item, `specialists[${index}]`);
  });
  assertString(value.responseStyle, "responseStyle");
  if (!RESPONSE_STYLES.has(value.responseStyle)) {
    throw new Error("Snapshot responseStyle is invalid");
  }

  for (const domain of NEED_DOMAINS) {
    assertArray(value.provision[domain], `provision.${domain}`, 100);
    value.provision[domain].forEach((item, index) => {
      assertProvisionItem(item, `provision.${domain}[${index}]`);
    });
    assertNumber(value.cohort[domain], `cohort.${domain}`);
  }

  assertNumber(value.staffing.taCount, "staffing.taCount");
  assertStringValue(value.staffing.typicalGroupSize, "staffing.typicalGroupSize");
  assertStringValue(value.staffing.sensorySpace, "staffing.sensorySpace");
}

function assertTemplates(value: Record<string, unknown>) {
  assertArray(value.evidence, "evidence", MAX_EVIDENCE);
  assertArray(value.snippets, "snippets", MAX_SNIPPETS);
  for (const [index, item] of value.evidence.entries()) {
    assertPlainObject(item);
    assertString(item.id, `evidence[${index}].id`);
    assertString(item.name, `evidence[${index}].name`);
    assertString(item.kind, `evidence[${index}].kind`);
    assertString(item.updated, `evidence[${index}].updated`);
    assertStringValue(item.size, `evidence[${index}].size`);
    assertStringValue(item.note, `evidence[${index}].note`);
  }
  for (const [index, item] of value.snippets.entries()) {
    assertPlainObject(item);
    assertString(item.id, `snippets[${index}].id`);
    assertString(item.domain, `snippets[${index}].domain`);
    if (!NEED_DOMAINS.has(item.domain)) {
      throw new Error(`Snapshot snippets[${index}].domain is invalid`);
    }
    assertString(item.capability, `snippets[${index}].capability`);
    if (!SNIPPET_CAPABILITIES.has(item.capability)) {
      throw new Error(`Snapshot snippets[${index}].capability is invalid`);
    }
    assertString(item.title, `snippets[${index}].title`);
    assertString(item.text, `snippets[${index}].text`);
  }
}

function assertFamilyNote(item: unknown, field: string) {
  assertPlainObject(item);
  assertString(item.id, `${field}.id`);
  assertString(item.section, `${field}.section`);
  if (!PLAN_SECTIONS.has(item.section)) {
    throw new Error(`Snapshot ${field}.section is invalid`);
  }
  assertStringValue(item.text, `${field}.text`);
  assertString(item.timestamp, `${field}.timestamp`);
}

function assertAmendment(item: unknown, field: string) {
  assertPlainObject(item);
  assertString(item.id, `${field}.id`);
  assertString(item.section, `${field}.section`);
  if (!PLAN_SECTIONS.has(item.section)) {
    throw new Error(`Snapshot ${field}.section is invalid`);
  }
  assertOptionalString(item.currentWording, `${field}.currentWording`);
  assertStringValue(item.proposedWording, `${field}.proposedWording`);
  assertString(item.source, `${field}.source`);
  if (!AMENDMENT_SOURCES.has(item.source)) {
    throw new Error(`Snapshot ${field}.source is invalid`);
  }
  assertBoolean(item.approved, `${field}.approved`);
}

function assertNeedPairing(item: unknown, field: string) {
  assertPlainObject(item);
  assertString(item.id, `${field}.id`);
  assertStringValue(item.need, `${field}.need`);
  if (item.provision !== null) assertStringValue(item.provision, `${field}.provision`);
  assertStringValue(item.professional, `${field}.professional`);
  assertString(item.sourceDocId, `${field}.sourceDocId`);
  assertNumber(item.sourcePage, `${field}.sourcePage`);
  assertStringValue(item.proposed, `${field}.proposed`);
  assertString(item.status, `${field}.status`);
  if (!NEED_PAIRING_STATUSES.has(item.status)) {
    throw new Error(`Snapshot ${field}.status is invalid`);
  }
}

function assertOutcome(item: unknown, field: string) {
  assertPlainObject(item);
  assertString(item.id, `${field}.id`);
  assertStringValue(item.text, `${field}.text`);
  if (item.concern !== null && item.concern !== undefined) {
    assertStringValue(item.concern, `${field}.concern`);
  }
}

function assertAssistantMessage(item: unknown, field: string) {
  assertPlainObject(item);
  assertString(item.id, `${field}.id`);
  assertString(item.role, `${field}.role`);
  if (!ASSISTANT_ROLES.has(item.role)) {
    throw new Error(`Snapshot ${field}.role is invalid`);
  }
  assertStringValue(item.text, `${field}.text`);
  assertStringValue(item.lang, `${field}.lang`);
}

function assertFamilyActivity(item: unknown, field: string) {
  assertPlainObject(item);
  assertString(item.id, `${field}.id`);
  assertString(item.timestamp, `${field}.timestamp`);
  assertString(item.actor, `${field}.actor`);
  if (!FAM_ACTIVITY_ACTORS.has(item.actor)) {
    throw new Error(`Snapshot ${field}.actor is invalid`);
  }
  assertStringValue(item.message, `${field}.message`);
}

function assertFamilyCase(value: Record<string, unknown>) {
  assertString(value.id, "id");
  assertString(value.childName, "childName");
  assertNumber(value.age, "age");
  assertString(value.yearGroup, "yearGroup");
  assertString(value.localAuthority, "localAuthority");
  assertString(value.parent, "parent");
  assertString(value.caseOfficer, "caseOfficer");
  assertString(value.stage, "stage");
  assertString(value.draftReceivedIso, "draftReceivedIso");
  assertString(value.deadlineIso, "deadlineIso");
  assertArray(value.documents, "documents", MAX_FAMILY_LIST);
  assertPlainObject(value.sectionStatus);
  assertArray(value.notes, "notes", MAX_FAMILY_LIST);
  assertArray(value.amendments, "amendments", MAX_FAMILY_LIST);
  assertArray(value.issues, "issues", MAX_FAMILY_LIST);
  assertArray(value.needPairings, "needPairings", MAX_FAMILY_LIST);
  assertArray(value.outcomes, "outcomes", MAX_FAMILY_LIST);
  assertPlainObject(value.placement);
  assertArray(value.support, "support", MAX_FAMILY_LIST);
  assertArray(value.assistant, "assistant", MAX_FAMILY_LIST);
  assertArray(value.activity, "activity", MAX_FAMILY_LIST);

  assertStringValue(value.placement.preferredSchool, "placement.preferredSchool");
  assertStringValue(value.placement.preferredType, "placement.preferredType");
  assertStringValue(value.placement.reasons, "placement.reasons");
  assertStringValue(value.placement.travelNotes, "placement.travelNotes");
  assertBoolean(value.placement.meetingRequested, "placement.meetingRequested");

  for (const [index, item] of value.notes.entries()) {
    assertFamilyNote(item, `notes[${index}]`);
  }
  for (const [index, item] of value.amendments.entries()) {
    assertAmendment(item, `amendments[${index}]`);
  }
  for (const [index, item] of value.issues.entries()) {
    assertPlainObject(item);
    assertString(item.id, `issues[${index}].id`);
    assertString(item.title, `issues[${index}].title`);
    assertString(item.status, `issues[${index}].status`);
    if (!ISSUE_STATUSES.has(item.status)) {
      throw new Error(`Snapshot issues[${index}].status is invalid`);
    }
    assertString(item.section, `issues[${index}].section`);
    if (!PLAN_SECTIONS.has(item.section)) {
      throw new Error(`Snapshot issues[${index}].section is invalid`);
    }
    assertStringValue(item.proposedAmendment, `issues[${index}].proposedAmendment`);
  }
  for (const [index, item] of value.needPairings.entries()) {
    assertNeedPairing(item, `needPairings[${index}]`);
  }
  for (const [index, item] of value.outcomes.entries()) {
    assertOutcome(item, `outcomes[${index}]`);
  }
  for (const [index, item] of value.documents.entries()) {
    assertPlainObject(item);
    assertString(item.id, `documents[${index}].id`);
    assertString(item.title, `documents[${index}].title`);
    assertStringValue(item.professional, `documents[${index}].professional`);
    assertStringValue(item.kind, `documents[${index}].kind`);
    assertStringValue(item.date, `documents[${index}].date`);
    assertNumber(item.pages, `documents[${index}].pages`);
  }
  for (const [index, item] of value.support.entries()) {
    assertPlainObject(item);
    assertString(item.id, `support[${index}].id`);
    assertStringValue(item.name, `support[${index}].name`);
    assertStringValue(item.role, `support[${index}].role`);
    assertStringValue(item.access, `support[${index}].access`);
  }
  for (const [index, item] of value.assistant.entries()) {
    assertAssistantMessage(item, `assistant[${index}]`);
  }
  for (const [index, item] of value.activity.entries()) {
    assertFamilyActivity(item, `activity[${index}]`);
  }
}

/** Integrity / size boundary checks - not an XSS control. */
export function assertValidSnapshotValue(snapshotKind: Kind, value: unknown) {
  assertSerializableSize(value);

  switch (snapshotKind) {
    case "consultations": {
      assertArray(value, "consultations", MAX_CONSULTATIONS);
      value.forEach(assertConsultation);
      return;
    }
    case "schoolProfile": {
      assertPlainObject(value);
      assertSchoolProfile(value);
      return;
    }
    case "templates": {
      assertPlainObject(value);
      assertTemplates(value);
      return;
    }
    case "familyCase": {
      assertPlainObject(value);
      assertFamilyCase(value);
      return;
    }
    default: {
      const _exhaustive: never = snapshotKind;
      throw new Error(`Unknown snapshot kind: ${_exhaustive}`);
    }
  }
}

async function scopeFor(ctx: Pick<QueryCtx, "auth">, snapshotKind: Kind) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Not authenticated");

  if (snapshotKind !== "familyCase") {
    const organization = identity.o as { id?: unknown } | undefined;
    if (typeof organization?.id === "string") return `org:${organization.id}`;
  }

  return `user:${identity.tokenIdentifier}`;
}

export const get = query({
  args: { kind },
  handler: async (ctx, args) => {
    const scope = await scopeFor(ctx, args.kind);
    const snapshot = await ctx.db
      .query("snapshots")
      .withIndex("by_scope_kind", (q) => q.eq("scope", scope).eq("kind", args.kind))
      .unique();
    return snapshot?.value ?? null;
  },
});

export const save = mutation({
  args: { kind, value: v.any() },
  handler: async (ctx: MutationCtx, args) => {
    assertValidSnapshotValue(args.kind, args.value);
    const scope = await scopeFor(ctx, args.kind);
    const snapshot = await ctx.db
      .query("snapshots")
      .withIndex("by_scope_kind", (q) => q.eq("scope", scope).eq("kind", args.kind))
      .unique();
    const patch = { value: args.value, updatedAt: Date.now() };
    if (snapshot) {
      await ctx.db.patch(snapshot._id, patch);
      return snapshot._id;
    }
    return await ctx.db.insert("snapshots", { scope, kind: args.kind, ...patch });
  },
});
