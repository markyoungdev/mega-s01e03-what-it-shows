# kb — the support knowledge base

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.

## S01E03 review

Added `/kb/incidents/4471-review`, signed by Mark Young / Codex. Original exported pages and classification logic are preserved. `IncidentSplit.svelte` computes a separate investigative partition and explains its relationship to the original table.

- `npm ci --cache /private/tmp/mega-npm-cache`
- `npm run dev`, then visit `/kb/incidents/4471-review`
- `npm run build && node scripts/prerender.mjs` generates static, hydrated desk pages in `dist/kb/`.
- `node --experimental-strip-types scripts/analyze.mjs` independently recounts reports using the exported cause logic.
- `tickets/` contains the proposed issue bodies. These use the export snapshot and distinguish established mechanisms from unconfirmed timing hypotheses.

The static page is `dist/kb/incidents/4471-review/index.html`. Serve `dist` over HTTP to retain its assets and interactive explorer. All pages are prerendered so their text and computed values are also available in the HTML.
