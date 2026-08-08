# School onboarding for empty workspaces

**Status:** Approved  
**Date:** 2026-08-08

## Goal

New (non-demo) accounts with an incomplete school profile are taken through a multi-step onboarding wizard before using the dashboard.

## Trigger

After Convex snapshot hydrate: missing `schoolName` or `sendcoName` (or `sendcoRole`). Demo Clerk user skips (seeded profile). While snapshots are still loading, do not redirect.

## Flow

Dedicated `/onboarding` route. Authenticated app redirects incomplete profiles here. Steps: Welcome → Identity (required) → Provision (skippable) → Staffing (skippable) → Done → `/`.

Writes via existing `useSchoolProfile` / Convex snapshots. Incomplete profiles are redirected to `/onboarding`; they remain there through provision/staffing until they open the dashboard (identity alone does not bounce them home).
