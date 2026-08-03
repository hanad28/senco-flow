import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  snapshots: defineTable({
    scope: v.string(),
    kind: v.union(
      v.literal("consultations"),
      v.literal("schoolProfile"),
      v.literal("templates"),
      v.literal("familyCase"),
    ),
    // Nested demo shapes vary by kind; mutations enforce structure + size.
    value: v.any(),
    updatedAt: v.number(),
  }).index("by_scope_kind", ["scope", "kind"]),
  enquiries: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    organisationRole: v.string(),
    needs: v.string(),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_created_at", ["createdAt"]),
});
