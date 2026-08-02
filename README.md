# EHCP Response (UNISEN)

Dual-workspace demo for England SEND / EHC needs assessments:

- **School (SENCO)** — track LA consultations, review needs, draft and submit statutory responses within the 15-calendar-day window
- **Family** — review a draft EHC plan, triage issues, prepare a response (i18n + RTL)

Built with TanStack Start, React 19, Vite, Tailwind 4, and shadcn/ui. Domain state is seeded in React context (no backend database). Connected to [Lovable](https://lovable.dev) — see root `AGENTS.md` before rewriting git history.

The marketing host includes expanded public pages for the product, integrations, pricing and pilots, website privacy, and website terms. These pages distinguish demonstrated prototype capabilities from pilot configuration and future plans.

## Quick start

```bash
bun install
bun run dev
```

Other scripts: `bun run build`, `bun run lint`, `bun run format`.

If `bun install` fails with **403** against `europe-west1-npm.pkg.dev`, the lockfile still points at Lovable’s private sandbox cache. This repo’s `bun.lock` should use `registry.npmjs.org`. To regenerate from scratch:

```bash
rm -rf node_modules bun.lock
bun install
```

## Documentation index

| Doc                                                         | Purpose                                                               |
| ----------------------------------------------------------- | --------------------------------------------------------------------- |
| [CODEBASE_MAP.md](docs/CODEBASE_MAP.md)                     | Architecture, routes, stores, workflows                               |
| [ROUTING.md](docs/ROUTING.md)                               | TanStack file-based routing conventions                               |
| [DEADLINES.md](docs/DEADLINES.md)                           | Calendar-day deadline product rule                                    |
| [LEGAL_REVIEW_CHECKLIST.md](docs/LEGAL_REVIEW_CHECKLIST.md) | Internal founder and legal follow-up before live SEND data processing |
| [AGENTS.md](AGENTS.md)                                      | Lovable sync constraints (must stay at repo root)                     |

## Public marketing routes

| Route           | Purpose                                                              |
| --------------- | -------------------------------------------------------------------- |
| `/product`      | Full overview of the school and family prototype workflows           |
| `/integrations` | Current handoffs, pilot configuration, and planned integration areas |
| `/pricing`      | Free core family access and tailored organisational proposals        |
| `/privacy`      | Privacy notice for website visitors and enquiry submissions          |
| `/terms`        | Terms governing use of the public website                            |

## Workspaces

| Surface | Entry     | Shell                             |
| ------- | --------- | --------------------------------- |
| School  | `/`       | `src/components/app-shell.tsx`    |
| Family  | `/family` | `src/components/family-shell.tsx` |

Switch between them with the workspace switcher in the chrome.

## Stack notes

- File-based routes live in `src/routes/` (`routeTree.gen.ts` is generated — do not edit)
- Vite config comes from `@lovable.dev/vite-tanstack-config` — do not duplicate its plugins
- Deadlines use **calendar days** (`calendarDaysRemaining` / `familyDeadlineIso`), not working days — see [DEADLINES.md](docs/DEADLINES.md)
