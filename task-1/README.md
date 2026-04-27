# Task 1 — vibe coding (leaderboard clone)

## Goal

Replicate our internal company leaderboard using AI-assisted development —
same UI, same filters, same sort order — without feeding any corporate data
into AI tools.

## Submission

- **Live demo:** _(set after first Vercel deploy)_
- **Source:** [`src/`](./src)
- **Write-up:** [`report.md`](./report.md)
- **Vercel config:** [`src/vercel.json`](./src/vercel.json)

## Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- Deployed via **Vercel** (auto-detected Vite framework preset)

## Run locally

```bash
cd task-1/src
npm install
npm run dev      # http://localhost:5173/
npm run build    # outputs to task-1/src/dist
```

## Deploy to Vercel

The repo is set up for Vercel — there's a `vercel.json` in `task-1/src/`
that pins the framework, build command, and SPA rewrite. Two options:

### Option A — Vercel dashboard (recommended)

1. Push the repo to GitHub.
2. In Vercel, **Add New → Project**, import the repo.
3. In the project settings:
   - **Root Directory:** `task-1/src`
   - Framework Preset: `Vite` (auto-detected)
   - Build Command: `npm run build` (auto)
   - Output Directory: `dist` (auto)
4. Deploy. Subsequent pushes to `main` auto-deploy.

### Option B — Vercel CLI

```bash
npm i -g vercel
cd task-1/src
vercel            # first run: link to a new project
vercel --prod     # production deploy
```

## Data handling

No real names, photos, titles, or department codes from the original
leaderboard were entered into AI tools or committed to this repo. The
demo dataset is Star Wars-themed (fictional characters with invented
in-universe roles and planet-based department codes). See
[`report.md`](./report.md) for details.

The original screenshot used as a layout reference is gitignored
(`task-1/screencapture-*.png`, `task-1/artifacts/crops/`).
