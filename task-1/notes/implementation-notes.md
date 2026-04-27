# Task 1 — Implementation Notes

> Working notes captured during the build session. For the polished write-up see `report.md`.
>
> ---
>
> ## Problem Understanding
>
> - The goal is to produce a **pixel-faithful clone** of the internal Company Leader Board 2025 SharePoint page — same layout, same filter controls, same interactions — but with **zero real corporate data**.
> - - The original page lives behind SSO; the only artefact I could work from was a live browser session (screenshots + page-text extraction).
>   - - Key UI elements identified:
>     -   - Page breadcrumb + H1 title ("Company Leader Board 2025")
>         -   - Leaderboard card with subtitle "Top performers based on contributions and activity"
>             -   - Four controls: **Year** dropdown, **Quarter** dropdown, **Category** dropdown, **Search** text input
>                 -   - **Podium** section: #1 centred (gold pedestal), #2 left (silver), #3 right (bronze); each shows avatar, name, role/dept, star-score pill
>                     -   - **Ranked list** below: rank number, avatar circle, name + role/dept code, per-category icon+count badges, TOTAL star label + score, chevron expand button
>                         -   - **Expanded row**: "RECENT ACTIVITY" table with columns Activity · Category · Date · Points (+N in blue)
>                             -   - Three scoring categories visible in the list: **Education** (graduation-cap icon), **Public Speaking** (monitor/screen icon), **University Partnership** (handshake icon)
>                                 -   - Year options: All Years / 2025
>                                     -   - Quarter options: All Quarters / Q1 / Q2 / Q3 / Q4
>                                         -   - Category options: All Categories / Education / Public Speaking / University Partnership
>                                          
>                                             - ---
>
> ## Approach
>
> - **Toolchain chosen**: React 18 + TypeScript + Vite + Tailwind CSS → static build → GitHub Pages.
> -   Rationale: fast iteration, no backend needed, Tailwind makes layout tweaks trivial, Vite produces a self-contained `dist/` that drops straight onto Pages.
> -   - **Workflow** (vibe-coding loop driven by Claude Code CLI):
>     -   1. Capture full-page screenshot → slice into crops (header, podium, list rows, expanded row).
>         2.   2. Describe each slice abstractly to the assistant; derive spacing/colour tokens without transcribing real data.
>              3.   3. Scaffold Vite project + component tree (`App`, `Filters`, `Podium`, `LeaderRow`, `ActivityTable`).
>                   4.   4. Build fictional `data.ts` (Star Wars theme — see Data Replacement below).
>                        5.   5. Render → compare against screenshot crops → iterate Tailwind classes.
>                             6.   6. Wire filter/search/expand logic (pure client-side state in `App.tsx`).
>                                  7.   7. Add `vite.config.ts` base path + GitHub Actions deploy workflow.
>                                       8. - **Prompting techniques**:
>                                          -   - *Reference-by-shape*: "the second column shows a circular avatar ~40 px, the third column is name in semi-bold above a smaller grey role string" — never "copy this name from the screenshot".
>                                              -   - *Decision narrowing*: locked stack, colour palette, fake-data theme before writing code so the assistant didn't drift.
>                                                  -   - *Single-concern diffs*: one prompt per component; reviewed each before moving on.
>                                                      -   - *Build-as-gate*: `npm run build` after every major change — TypeScript + Vite catch regressions fast.
>                                                       
>                                                          - ---
>
> ## AI IDE Usage
>
> - **Tool used**: Claude Code (Anthropic) running inside VS Code terminal — the "AI-enhanced IDE" for this session.
> - - **Where it helped**:
>   -   - Scaffolded the entire Vite + Tailwind project skeleton in one prompt.
>       -   - Generated the full `data.ts` fictional dataset (20 entries, deterministic scores, per-quarter activity rows) without touching real names.
>           -   - Wrote the filter/search/sort logic (`useMemo` chains) from a plain-English spec.
>               -   - Produced the GitHub Actions `deploy-pages.yml` workflow from a one-line request ("deploy Vite app to Pages under base path /AI_Chalange_2/").
>                   -   - Suggested the `seededRng` helper so scores are stable across reloads.
>                       -   - Caught a Tailwind purge issue (dynamic class names in template literals) and proposed the `safelist` fix.
>                        
>                           - ---
>
> ## Testing / Validation
>
> - `npm run build` — zero TypeScript errors, clean Vite bundle.
> - - `npm run preview` — manual smoke-test of all filter combinations, search, expand/collapse.
>   - - Visual diff: side-by-side browser tabs (live original vs. local preview) — checked podium layout, row badge colours, TOTAL label position, expand animation.
>     - - Edge cases confirmed working:
>       -   - Filtering by a single category re-ranks the list by that category's points.
>           -   - Searching a partial dept code (e.g. "TAT") returns correct subset.
>               -   - Selecting Q2 + Education shows only entries with Education points in Q2.
>                   -   - No results → empty-state message displayed.
>                       - - GitHub Pages deployment verified at the live URL after Actions run completed.
>                        
>                         - ---
>
> ## Final Submission Links
>
> - **Live demo**: https://abdulazizgreenphire.github.io/AI_Chalange_2/
> - - **Source**: `task-1/src/` in this repo
>   - - **Deploy workflow**: `.github/workflows/deploy-pages.yml`
>     - - **Report**: `task-1/report.md`
