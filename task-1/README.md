# Task 1 — vibe coding (leaderboard clone)

## Goal

Replicate our internal company leaderboard using AI-assisted development —
same UI, same filters, same sort order — without feeding any corporate data
into AI tools.

## Submission

- **Live demo:** <https://abdulazizgreenphire.github.io/AI_Chalange_2/>
- **Source:** [`src/`](./src)
- **Write-up:** [`report.md`](./report.md)
- **Deploy workflow:** [`../.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml)

## Stack

- React 18 + TypeScript
- Vite 5 (base path `/AI_Chalange_2/` for GitHub Pages)
- Tailwind CSS 3
- Deployed via GitHub Actions → GitHub Pages

## Run locally

```bash
cd task-1/src
npm install
npm run dev      # http://localhost:5173/AI_Chalange_2/
npm run build    # outputs to task-1/src/dist
```

## Data handling

No real names, photos, titles, or department codes from the original
leaderboard were entered into AI tools or committed to this repo. The
demo dataset is Star Wars-themed (fictional characters with invented
in-universe roles and planet-based department codes). See
[`report.md`](./report.md) for details.

The original screenshot used as a layout reference is gitignored
(`task-1/screencapture-*.png`, `task-1/artifacts/crops/`).
