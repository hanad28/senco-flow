---
last_mapped: 2026-07-19T11:15:17Z
---

# Codebase Map

**EHCP Response** — dual-workspace demo for England SEND / EHC needs assessments. School SENCOs manage LA consultations; families review a draft EHC plan and prepare a response. Built with TanStack Start + React 19 + Vite + Tailwind 4 + shadcn/ui. Client-side state only (seeded React context stores; no backend DB). Connected to Lovable — do not rewrite published git history.

Scanner snapshot: ~106 files / ~130k tokens (excluding `node_modules`, `.git`, `.lovable`).

## System Overview

```
src/server.ts          SSR entry (error-page wrapper around TanStack Start)
src/start.ts           Start middleware (catches unhandled server errors)
src/router.tsx         createRouter + QueryClient
src/routeTree.gen.ts   Auto-generated from src/routes/ — do not edit
src/routes/__root.tsx  HTML shell + global providers
```

Two product surfaces share one app:

| Surface | Shell | State | Routes |
| --- | --- | --- | --- |
| **School (SENCO)** | `AppShell` | `ConsultationsProvider`, `SchoolProfileProvider`, `TemplatesProvider`, `SearchProvider` | `/`, `/consultations/$id/*`, `/templates`, `/calendar`, `/reports`, `/settings` |
| **Family** | `FamilyShell` | `FamilyCaseProvider`, `FamilyI18nProvider` (mounted under `/family`) | `/family`, `/family/cases/$id/*`, `/family/help` |

Switch via `WorkspaceSwitcher`. Deadline rule (both workspaces): **15 calendar days** from receipt (day 1 = day after receipt). Prefer `calendarDaysRemaining` / `calendarDeadlineDate` / `familyDeadlineIso` — not the unused working-day helpers.

## Directory Guide

```
senco-flow/
├── README.md                 Points to docs/
├── AGENTS.md                 Lovable sync constraints (root — required by Lovable)
├── docs/                     All project documentation
│   ├── README.md             Product overview + quick start
│   ├── CODEBASE_MAP.md       This map
│   ├── ROUTING.md            TanStack route conventions
│   └── DEADLINES.md          Calendar-day deadline rule
├── package.json              bun scripts: dev / build / lint / format
├── vite.config.ts            @lovable.dev/vite-tanstack-config (do not duplicate plugins)
├── components.json           shadcn config
├── public/                   favicon
└── src/
    ├── styles.css            Design tokens / Tailwind theme
    ├── components/
    │   ├── app-shell.tsx     School chrome (nav, Cmd+K search, deadline bell)
    │   ├── family-shell.tsx  Family chrome (i18n, RTL, case nav, demo banner)
    │   ├── global-search.tsx Cmd/Ctrl+K overlay over consultations
    │   ├── workspace-switcher.tsx
    │   ├── activity-log.tsx
    │   └── ui/               shadcn/Radix primitives
    ├── hooks/
    │   ├── use-sidebar-collapsed.ts
    │   └── use-mobile.tsx
    ├── lib/                  Domain state + helpers (see below)
    └── routes/               File-based TanStack Router routes
```

### `src/lib/` — domain modules

| Module | Role |
| --- | --- |
| `consultations-store.tsx` | Seeded consultations, needs, documents, activity; status transitions |
| `school-profile-store.tsx` | School identity, provision by need domain, response style |
| `templates-store.tsx` | Response snippets + token fill; evidence docs |
| `search-store.tsx` | Global search overlay open/close |
| `working-days.ts` | Calendar-day deadline API (primary) + unused working-day helpers |
| `vagueness.ts` | Flag vague statutory wording in drafts |
| `letter-export.ts` | School DOCX response letter (`docx`) |
| `family-case-store.tsx` | Seeded family case: plan sections A–K, issues, docs, amendments |
| `family-config.ts` | Statutory constants + family deadline helpers — single source of truth |
| `family-i18n.tsx` | en / ar / ur / bn / so + RTL |
| `family-rag.ts` | Mock AI provider over seeded family docs |
| `family-letter-export.ts` | Family response DOCX export |
| `error-*.ts`, `lovable-error-reporting.ts` | SSR/client error surfaces for Lovable |

### Route map

**School**

| Path | File | Purpose |
| --- | --- | --- |
| `/` | `index.tsx` | Consultation dashboard (sort/filter/deadline) |
| `/consultations/$id` | `consultations.$id.tsx` | Layout outlet |
| `/consultations/$id/` | `…index.tsx` | Overview + documents + activity |
| `…/needs` | needs review / capability scoring |
| `…/draft` | Draft responses + templates + vagueness |
| `…/submit` | Review & submit + letter export |
| `/templates` | Template library |
| `/calendar` | Deadline calendar |
| `/reports` | Capability / domain analytics |
| `/settings` | School profile |

**Family**

| Path | File | Purpose |
| --- | --- | --- |
| `/family` | `family.tsx` | Providers + outlet |
| `/family/` | `family.index.tsx` | Case home / readiness |
| `/family/cases/$id/plan` | Plan sections A–K |
| `…/issues` | Issue triage |
| `…/assistant` | Mock RAG chat |
| `…/response` | Assemble & export response |
| `…/documents` | Case documents |
| `…/support` | Support network |
| `…/confirmation` | Post-submit confirmation |
| `/family/help` | Help / statutory copy |

Routing conventions: `docs/ROUTING.md`. Never invent Next.js `pages/` or `app/` layouts.

## Key Workflows

1. **School consultation response**  
   Dashboard → open consultation → review needs (`full` / `partial` / `cannot`) → draft with templates → submit → DOCX via `letter-export`. Status: `New → Reviewing → Drafting → Submitted`. Deadlines from `receivedOn` via `calendarDaysRemaining`.

2. **Family draft-plan response**  
   `/family` home → review plan sections → triage issues → optional assistant (`mockFamilyAi`) → build response → confirmation. State is session-only (reset-to-seed); i18n/RTL scoped to `FamilyShell`.

3. **Workspace switch**  
   `WorkspaceSwitcher` toggles school ↔ family chrome without sharing nav.

4. **SSR / errors**  
   `server.ts` normalizes h3-swallowed 500 JSON into HTML error page; `start.ts` middleware + root `errorComponent` report to Lovable.

## Known Risks

- **No persistence** — all domain state is in-memory seeded React context; refresh loses edits (family explicitly session-only).
- **Deadline dual APIs** — `workingDays*` helpers exist but must not drive UI; product decision in `docs/DEADLINES.md`.
- **Mock AI only** — `family-rag.ts` is demo; do not treat answers as legal advice (disclosures in `FAMILY_STATUTORY`).
- **Lovable coupling** — avoid force-push / history rewrite; Vite plugins come from `@lovable.dev/vite-tanstack-config` (duplicating them breaks the build).
- **Generated route tree** — edit files under `src/routes/`, not `routeTree.gen.ts`.
- **Hydration** — activity timestamps use UTC seeding to avoid SSR/client mismatch.
- **shadcn `ui/` bulk** — large generated surface; prefer extending domain components over editing primitives unless theming.

## Task-specific guidance

| Need | Go here first |
| --- | --- |
| Consultation CRUD / status / activity | `src/lib/consultations-store.tsx` |
| Deadline math | `src/lib/working-days.ts` + `family-config.ts` + `docs/DEADLINES.md` |
| School chrome / nav | `src/components/app-shell.tsx` |
| Family chrome / i18n | `src/components/family-shell.tsx`, `family-i18n.tsx` |
| Statutory copy | `src/lib/family-config.ts` |
| Draft quality flags | `src/lib/vagueness.ts` |
| Exports | `letter-export.ts`, `family-letter-export.ts` |
| New routes | `src/routes/` + `docs/ROUTING.md` |
| Agent / Lovable rules | `AGENTS.md` (repo root) |
| Doc index | `docs/README.md` |
