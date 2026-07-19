# EHCP Response (senco-flow)

Dual-workspace demo for England SEND / EHC needs assessments:

- **School (SENCO)** — track LA consultations, review needs, draft and submit statutory responses within the 15-calendar-day window
- **Family** — review a draft EHC plan, triage issues, prepare a response (i18n + RTL)

Built with TanStack Start, React 19, Vite, Tailwind 4, and shadcn/ui. Domain state is seeded in React context (no backend database). Connected to [Lovable](https://lovable.dev) — see root `AGENTS.md` before rewriting git history.

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

| Doc | Purpose |
| --- | --- |
| [CODEBASE_MAP.md](./CODEBASE_MAP.md) | Architecture, routes, stores, workflows |
| [ROUTING.md](./ROUTING.md) | TanStack file-based routing conventions |
| [DEADLINES.md](./DEADLINES.md) | Calendar-day deadline product rule |
| [../AGENTS.md](../AGENTS.md) | Lovable sync constraints (must stay at repo root) |

## Workspaces

| Surface | Entry | Shell |
| --- | --- | --- |
| School | `/` | `src/components/app-shell.tsx` |
| Family | `/family` | `src/components/family-shell.tsx` |

Switch between them with the workspace switcher in the chrome.

## Stack notes

- File-based routes live in `src/routes/` (`routeTree.gen.ts` is generated — do not edit)
- Vite config comes from `@lovable.dev/vite-tanstack-config` — do not duplicate its plugins
- Deadlines use **calendar days** (`calendarDaysRemaining` / `familyDeadlineIso`), not working days — see [DEADLINES.md](./DEADLINES.md)
