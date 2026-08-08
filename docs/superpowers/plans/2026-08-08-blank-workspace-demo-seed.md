# Blank Workspace + Demo Seed Implementation Plan

> **For agentic workers:** Implement task-by-task. Steps use checkbox syntax.

**Goal:** Blank workspaces for new users; seed Convex snapshots only for Clerk user `user_3H00chWDFb5d61UkU3xdPTPm3Ud`.

**Architecture:** Keep snapshot blobs. Remove client auto-seed on null. Server `ensureDemoSeed` mutation gates on Clerk subject. Client bootstrap sends existing seed payloads once after auth.

**Tech Stack:** Convex, Clerk, React providers, existing seed modules.

## Task 1: Convex ensureDemoSeed

- [ ] Add `DEMO_CLERK_USER_ID` and `ensureDemoSeed` mutation in `convex/snapshots.ts`
- [ ] Only seed missing kinds for matching subject; validate with `assertValidSnapshotValue`

## Task 2: Stop auto-seed; empty defaults

- [ ] `use-persistent-snapshot.ts`: on `remote === null`, keep local initial, do not `save`
- [ ] Empty defaults in consultations / school-profile / templates / family stores
- [ ] Remove stale-date reseed effects

## Task 3: Client bootstrap + sidebar

- [ ] `DemoSeedBootstrap` in auth shell calling mutation with seed payloads
- [ ] Sidebar empty-state labels for blank school/SENDCO
