# Task 1 — The Clone Wars (vibe-coded leaderboard clone)

## What was built

A static, single-page clone of the internal company leaderboard. It mirrors the
layout and interactions of the original — breadcrumb, page title, the
"Leaderboard / Top performers based on contributions and activity" card, four
filter controls (Year, Quarter, Category, Search), a 3-up podium for the top
three, and the ranked list of expandable rows showing per-category point
badges and a TOTAL score.

Stack: React 18 + TypeScript + Vite + Tailwind CSS. Deployed to GitHub Pages
via a GitHub Actions workflow.

- Live demo: <https://abdulazizgreenphire.github.io/AI_Chalange_2/>
- Source: [`task-1/src/`](./src)
- Deploy workflow: [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml)

## Approach

The work was driven through Claude Code (CLI) inside an IDE — most of the
session is "vibe coding": describe the target UI, let the assistant scaffold
files, then iterate on small pieces. The loop was roughly:

1. Capture the original page as a single full-page screenshot.
2. Slice the screenshot into smaller crops so the layout could be inspected
   piece-by-piece (header + filters, podium, list rows).
3. Describe the structure abstractly (columns, controls, sort order, badges),
   then have the assistant scaffold a Vite project and component tree.
4. Build the data model and a deterministic fake dataset.
5. Render and tune Tailwind styling against the layout description.
6. Wire filter / sort / search / expand interactions.
7. Add a GitHub Actions deploy to Pages.

### Prompting techniques used

- **Reference-by-shape, not by data.** The screenshot was used to derive
  layout, spacing, colors, and which controls existed — never to copy
  identifying content. Real names and titles were never typed back into the
  prompt or committed to the repo.
- **Small, composable steps.** Scaffold → data → components → wiring →
  deploy. Each step had a single concern, which kept the assistant's diffs
  reviewable.
- **Decision narrowing.** Before generating code, the open choices (stack,
  theme, deploy target, fake-data style) were enumerated and locked in, so
  the assistant didn't drift mid-build.
- **Build-as-test.** Running `npm run build` after major changes was used as
  a fast validity gate (TypeScript + Vite catches most regressions).

## How the data was replaced

The brief explicitly forbids feeding corporate data into AI tools. Two
guardrails were used:

1. **No identifying content in prompts or code.** Real names, photos, titles,
   and department codes from the original were never transcribed. The
   assistant only worked off layout descriptions ("rank | avatar | name |
   role + dept code | category badges with counts | TOTAL star score |
   chevron").
2. **Source screenshot stays out of git.** The full-page capture and any
   slices live under `task-1/screencapture-*.png` and
   `task-1/artifacts/crops/`, both ignored via the repo's
   [`.gitignore`](../.gitignore). The deployed site contains zero pixels of
   the original.

The replacement dataset is Star Wars-themed (a nod to the task title "The
Clone Wars"):

- Names: well-known fictional characters (Luke Skywalker, Leia Organa,
  Ahsoka Tano, …) — clearly fictional, no chance of resembling a real
  employee.
- Roles: invented in-universe titles ("Senior Jedi Engineer", "Holocron
  Archivist", "Mandalorian Ops").
- Department codes: invented planet-based codes (`TAT.U1.D1`, `COR.U1.D2`,
  …) that mimic the shape of the originals without copying any.
- Scores: deterministic PRNG so the leaderboard is stable across reloads.
  Top tiers get higher per-category points to make the podium meaningful.

The four contribution categories shown in the original (the four badge
icons) are reified as: **Mentoring**, **Innovation**, **Culture**,
**Knowledge Sharing**.

## Functionality replicated

- Filter by Year (All / 2023 / 2024 / 2025)
- Filter by Quarter (All / Q1–Q4)
- Filter by Category (All / 4 categories) — also re-ranks by that category's
  score when set
- Search across name + role + department code
- Sort by total score, descending
- Top-3 podium (#1 centered, gold; #2 / #3 flanking, blue)
- Expandable rows revealing the full per-category breakdown plus year/quarter
- Empty-state message when filters return no results

What is intentionally out of scope: the SharePoint comments / discussion
section that follows the leaderboard on the original page. It is page chrome,
not part of the leaderboard, so it was excluded per the brief's "no extra
features" rule.

## Repository layout

```
task-1/
├── README.md              — task brief + submission links
├── report.md              — this file
├── src/                   — Vite project root
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts     — base path: /AI_Chalange_2/
│   ├── tailwind.config.js
│   └── src/
│       ├── App.tsx
│       ├── data.ts        — fictional dataset
│       ├── types.ts
│       └── components/
└── artifacts/             — local-only working artifacts (gitignored)
```
