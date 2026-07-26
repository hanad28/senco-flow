<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Unisen / senco-flow — agent setup notes

Product is **Unisen** (SEND coordination). Temporary hosting + multi-remote git are intentional until the team standardizes on the company GitHub org and Vercel team.

## Git remotes and ownership

| Remote | Repo | Role |
| --- | --- | --- |
| `origin` | `mwijanarko1/senco-flow` (private) | Mikhail’s fork/copy; backup branches |
| `upstream` | `hanad28/senco-flow` (public) | Co-founder original; **do not push WIP to `main` without agreement** |
| `unisenofficial` | `unisenofficial/senco-flow` (private) | **Temporary demo host** for Vercel until org move |

**GitHub Organization (company home — preferred long term):** [`unisen-official`](https://github.com/unisen-official)

- Members (as of setup): `hanad28` (admin), `mwijanarko1`, `husaam-atq`
- Not the same as personal user `unisenofficial`
- Plan: move canonical repo under `unisen-official`, then point Vercel at that

**Demo branch pattern (already used):**

- Local + `origin`: `mikhail/unisen-demo`
- Demo remote: `unisenofficial` → `main` (same tree for Vercel default branch)

**Vercel Hobby only builds commits authored by the linked GitHub user** (`unisenofficial`). Work commits may use Mikhail’s identity; always add a separate deploy-author commit before pushing to `unisenofficial` `main`.

```bash
# 1) Work commit (local default author — usually mwijanarko1 / Mikhail)
git commit -m "Your feature message"

# 2) Separate deploy commit authored as unisenofficial (required for Vercel)
git -c user.name="unisenofficial" \
    -c user.email="309063258+unisenofficial@users.noreply.github.com" \
    commit --allow-empty -m "Trigger Vercel deploy as unisenofficial."

# 3) Push both remotes (gh auth must match the remote owner)
gh auth switch --user mwijanarko1
git push origin mikhail/unisen-demo

gh auth switch --user unisenofficial
git push unisenofficial mikhail/unisen-demo:main
# optional: keep feature branch tip in sync
git push unisenofficial mikhail/unisen-demo
```

Do **not** force-push (Lovable). Do **not** treat personal accounts as permanent company ownership. Do **not** amend already-pushed commits just to change author — use a new empty (or real) commit with the `unisenofficial` author instead.

## Local secrets

- File: **`.env.local`** (gitignored via `*.local` — never commit)
- Vite loads it for `bun run dev` / `bun run build`

Typical keys (names only):

| Name | Purpose |
| --- | --- |
| `CONVEX_DEPLOYMENT` | Local Convex CLI only (`convex dev`) — **not** for Vercel |
| `VITE_CONVEX_URL` | Client → Convex, e.g. `https://artful-owl-851.convex.cloud` |
| `VITE_CONVEX_SITE_URL` | Convex site URL (`https://….convex.site`) |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk browser |
| `CLERK_SECRET_KEY` | Clerk server middleware |

## Environment variables: Vercel vs Convex

### Vercel (web app host)

Set on the **Vercel project** → Settings → Environment Variables (Production + Preview).  
`VITE_*` are inlined at **build** time — change them, then **redeploy**.

| Variable | Required for deploy |
| --- | --- |
| `VITE_CLERK_PUBLISHABLE_KEY` | Yes |
| `CLERK_SECRET_KEY` | Yes |
| `VITE_CONVEX_URL` | Yes (`https://artful-owl-851.convex.cloud` for current dev deployment) |
| `VITE_CONVEX_SITE_URL` | Recommended |

Runtime crash UI **"This page didn't load"** (`src/routes/__root.tsx` error boundary) usually means missing/wrong Clerk or Convex env on Vercel.

### Convex (backend)

Set in **Convex dashboard** → project → Environment Variables (not Vercel):

| Variable | Required |
| --- | --- |
| `CLERK_JWT_ISSUER_DOMAIN` | Yes for Clerk↔Convex auth (e.g. `https://….clerk.accounts.dev`) |

Used by `convex/auth.config.ts` (`applicationID: "convex"` — Clerk JWT template name must match).

Also in Clerk dashboard (not env):

- JWT template named **`convex`**
- Allowed origins / redirect URLs for local + `*.vercel.app` (and custom domain later)

### Do not put

| Variable | Where it does **not** belong |
| --- | --- |
| `CONVEX_DEPLOYMENT` | Vercel |
| `CLERK_JWT_ISSUER_DOMAIN` | Vercel (Convex only for this app) |
| Any secrets | Git |

## Vercel / hosting notes

- **Temporary:** deploy from `unisenofficial/senco-flow` for demos.
- **Long term:** company **Vercel Team** + repo under **`unisen-official`** org. Real multi-founder team features need **Pro** (Hobby is free/personal; limited commercial collaboration).
- Vercel CLI is **one login at a time** (unlike `gh auth switch`). Use `vercel switch` for teams under the current login; logout/login or separate config dirs for multiple accounts.
- Build: TanStack Start + Nitro. On Vercel (`VERCEL=1`) Nitro targets Vercel; local default via Lovable config is often Cloudflare — that’s expected.
- **Vercel Toolbar** on production is a platform overlay for logged-in team members, **not** app code. Disable: Project/Team → Settings → General → Vercel Toolbar → Production → Off. Or open the site logged out / private window for clean demos.

## Stack reminders

- Package manager: **bun** (`bun.lock`)
- Do not duplicate plugins already provided by `@lovable.dev/vite-tanstack-config` in `vite.config.ts`
- Prefer existing shadcn components; add missing ones via project shadcn CLI
