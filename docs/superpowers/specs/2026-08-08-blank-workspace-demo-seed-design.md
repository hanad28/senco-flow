# Blank workspace + demo-account seed

**Status:** Approved  
**Date:** 2026-08-08

## Goal

New signed-in users get an empty school (and family) workspace. Only Clerk user `user_3H00chWDFb5d61UkU3xdPTPm3Ud` receives the fictional demo snapshot (consultations, school profile, templates, family case).

## Behaviour

- Stop auto-writing client seed into Convex when `snapshots.get` returns null.
- Default client state: empty consultations, empty school profile, empty templates, empty family case.
- Sidebar shows unset school/SENDCO labels when profile fields are blank (not Millbrook / S. Ahmed).
- Authenticated bootstrap calls `snapshots.ensureDemoSeed` once; server no-ops unless `identity.subject` matches the demo Clerk user id and a kind has no snapshot yet.
- Scope unchanged: `org:{id}` when present for school kinds; else `user:{tokenIdentifier}`. Family stays user-scoped.

## Out of scope

Normalized consultation tables; multi-account seeding UI.
