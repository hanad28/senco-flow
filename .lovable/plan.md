## Problem

`/consultations/$id/needs` (and `/draft`, `/submit`) match on click — the URL updates and the child route's `head()` fires (tab title changes to "Consolidated needs — C-2402"). But the visible page never changes: the detail page's H1 ("Pupil B — Year 7") stays on screen.

This is because `src/routes/consultations.$id.tsx` acts as the parent of three child routes but its component renders the full detail UI instead of an `<Outlet />`. TanStack Router mounts children into the parent's `<Outlet />`; with none present, children silently have nowhere to render. Result: buttons appear dead even though navigation succeeded.

The `<Link to="/consultations/$id/needs" params={{ id }}>` wiring, the route file, the store lookup, and the seed data are all correct. Only the parent-layout shape is wrong.

## Fix

Convert `consultations.$id.tsx` into a pure layout, and move the detail page body into a new index leaf at the same path.

1. **`src/routes/consultations.$id.tsx`** — replace `ConsultationDetail` with a layout component that only returns `<Outlet />`. Keep the route definition (still needed so params flow to children) but drop the `head()` and the `component` body — either remove `head` entirely or leave a minimal generic one. Remove now-unused imports.

2. **Create `src/routes/consultations.$id.index.tsx`** — move the current `ConsultationDetail` component, its `head()`, and its imports here. Change the route path to `createFileRoute("/consultations/$id/")`. Everything else (breadcrumbs, actions, layout) stays identical, so `/consultations/c-2402` renders exactly what it does today.

3. **Do not edit `src/routeTree.gen.ts`** — the Vite plugin will regenerate it once the new file exists and the parent file changes.

No changes needed to `consultations.$id.needs.tsx`, `.draft.tsx`, `.submit.tsx`, the store, the AppShell, or any Link.

## Verification

After the change:
- `/consultations/c-2402` still shows the detail page unchanged.
- Clicking "Review needs" navigates to `/consultations/c-2402/needs` and the consolidated-needs UI actually appears.
- "Go to consolidated needs" link under the AI summary does the same.
- "Draft response" from the needs page and "Submit" flow continue to work.
