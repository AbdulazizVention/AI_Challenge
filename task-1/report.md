# Task 1 — The Clone Wars (vibe-coded leaderboard clone)

## What was built

A static, single-page clone of the internal Company Leader Board 2025. It
mirrors the layout and interactions of the original — breadcrumb, page title,
the "Leaderboard / Top performers based on contributions and activity" card,
four filter controls (Year, Quarter, Category, Search), a 3-up podium for the
top three, and the ranked list of expandable rows. Each row shows per-category
icon-and-count badges and a TOTAL star score; expanding a row reveals a
**RECENT ACTIVITY** table (Activity · Category · Date · Points).

Stack: React 18 + TypeScript + Vite + Tailwind CSS. Deployed to **Vercel**
(auto-detected Vite preset, configured via [`task-1/src/vercel.json`](./src/vercel.json)).

- Live demo: _(set after first Vercel deploy — see `task-1/README.md`)_
- Source: [`task-1/src/`](./src)
- Working notes: [`task-1/notes/implementation-notes.md`](./notes/implementation-notes.md)
- Vercel config: [`task-1/src/vercel.json`](./src/vercel.json)

## Approach

The work was driven through Claude Code (CLI) inside the IDE — a "vibe coding"
loop: describe the target UI from screenshots, let the assistant scaffold
files, iterate on small pieces. Roughly:

1. Capture the original page as a single full-page screenshot.
2. Slice the screenshot into smaller crops so the layout could be inspected
   piece-by-piece (header + filters, podium, list rows, expanded row).
3. Describe each slice abstractly (controls, columns, sort order, badge
   shapes) without transcribing identifying content.
4. Scaffold a Vite + React + TS + Tailwind project and component tree.
5. Build the data model and a deterministic fictional dataset.
6. Render and tune Tailwind classes against the layout description.
7. Wire filter / sort / search / expand interactions.
8. Configure Vercel deployment (`vercel.json` + Root Directory pointing at
   `task-1/src`).

### Prompting techniques

- **Reference-by-shape, not by data.** The screenshot was used to derive
  layout, spacing, colours, and which controls existed — never to copy
  identifying content. Real names, photos, titles, and department codes were
  never typed back into the prompt or committed.
- **Decision narrowing.** Stack, theme, deploy target, fake-data style, and
  category labels were locked in before code generation, so the assistant did
  not drift mid-build.
- **Single-concern diffs.** One prompt per component / concern; reviewed each
  before moving on.
- **Build-as-gate.** `npm run build` after each major change — the
  TypeScript + Vite pipeline catches regressions fast.
- **Notes-as-spec.** Working notes (`notes/implementation-notes.md`) were
  used as the canonical spec, and the implementation was reconciled against
  them whenever they were updated.

## How the data was replaced

The brief explicitly forbids feeding corporate data into AI tools. Two
guardrails were used:

1. **No identifying content in prompts or code.** The assistant only worked
   off layout descriptions ("rank | avatar | name | role + dept code |
   category badges with counts | TOTAL star score | chevron"). Real names,
   roles, and codes were never transcribed.
2. **Source screenshot stays out of git.** The full-page capture and any
   slices live under `task-1/screencapture-*.png` and
   `task-1/artifacts/crops/`, both ignored via the repo's
   [`.gitignore`](../.gitignore). The deployed site contains zero pixels of
   the original.

The replacement dataset is Star Wars-themed (a nod to the task title "The
Clone Wars"):

- **Names** — well-known fictional characters (Luke Skywalker, Leia Organa,
  Ahsoka Tano, …): clearly fictional, no chance of resembling a real
  employee.
- **Roles** — invented in-universe titles ("Senior Jedi Engineer",
  "Holocron Archivist", "Mandalorian Ops").
- **Department codes** — invented planet-based codes (`TAT.U1.D1`,
  `COR.U1.D2`, …) that mimic the *shape* of the originals without copying
  any.
- **Activities** — fictional events ("Talk at GalaxyConf 2025", "Coruscant
  Academy guest lecture"), generated to cover each entry's per-category
  point total.
- **Scores** — deterministic seeded PRNG so the leaderboard is stable across
  reloads. Top tiers get higher per-category points so the podium is
  meaningful.

## Functionality replicated

- Filter by **Year** (All Years / 2025)
- Filter by **Quarter** (All Quarters / Q1–Q4)
- Filter by **Category** (All Categories / Education / Public Speaking /
  University Partnership) — selecting a category re-ranks by that category's
  points
- **Search** across name + role + department code
- Sort by total score, descending (or by selected category's points)
- **Top-3 podium**: #1 centred on a gold pedestal, #2 left on silver, #3
  right on bronze; each shows avatar, rank badge, name, role/dept, star-score
  pill
- **Expandable rows** revealing a RECENT ACTIVITY table with columns
  Activity · Category · Date · Points (+N in blue)
- **Empty-state message** when filters return no results
- **Comments / discussion section** below the leaderboard: composer at the
  top, **Newest / Oldest / Popular** sort tabs, and a list of comments with
  author avatar + name, date, body, **Reply**, like count, view count, and
  **Save for later**. Posting a new comment prepends it to the list.

The categories shown in the original (the three badge icons) are reified as:
**Education** (graduation cap), **Public Speaking** (monitor), **University
Partnership** (handshake).

## Repository layout

```
task-1/
├── README.md              — task brief + submission links
├── report.md              — this file
├── notes/
│   └── implementation-notes.md
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
│           ├── ActivityTable.tsx
│           ├── Avatar.tsx
│           ├── Comments.tsx
│           ├── Filters.tsx
│           ├── Icons.tsx
│           ├── LeaderRow.tsx
│           └── Podium.tsx
└── artifacts/             — local-only working artifacts (gitignored)
```
