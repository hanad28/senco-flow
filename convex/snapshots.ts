import { v } from "convex/values";
import { mutation, query, type QueryCtx } from "./_generated/server";

const kind = v.union(
  v.literal("consultations"),
  v.literal("schoolProfile"),
  v.literal("templates"),
  v.literal("familyCase"),
);

type Kind = "consultations" | "schoolProfile" | "templates" | "familyCase";

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
  handler: async (ctx, args) => {
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
