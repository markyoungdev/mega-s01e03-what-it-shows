# booking-v3 displays MM/DD hint to day-first tenants — 33 reports

## Scope

Reports: **33** unique report IDs from #4471 in the October 4 export.

booking-v3 prints MM/DD/YYYY while its form reads the tenant locale. This is a different mechanism from the shared parser. Affects alder.physio, copper.studio, pale.harbour.

## Evidence

- R-41230 — copper.studio / form: My client came on 1 June instead of 6 January. We sorted it out.
- R-41584 — copper.studio / form: Every booking we make shows the wrong day. 7 November is now 11 July.

## Reproduction / investigation

In Alder Physio booking-v3, follow the MM/DD/YYYY hint. Enter 06/01 intending June 1; the locale-aware form interprets 6 January. Align hint and input parsing.

## Acceptance

Use a locale-correct hint and ensure displayed examples agree with form parsing. Test all three booking-v3 tenants, independently of the shared-parser fix.

## Counting and provenance

427 exported rows collapse to 412 unique IDs. This partition is 374 parser + 33 hint + 5 unresolved timing = 412. The unchanged existing CauseTable shows 379 parser + 33 hint because it includes the five timing exceptions under parser. Intake tags alone produce 371/41 and are not causal evidence.

Source: src/lib/data/reports-4471.json; tenant directory; src/lib/kb/causes.ts; desk-notes.json. Exact assigned IDs: R-41230, R-41241, R-41251, R-41259, R-41262, R-41275, R-41294, R-41305, R-41308, R-41366, R-41372, R-41384, R-41387, R-41396, R-41400, R-41406, R-41415, R-41416, R-41418, R-41428, R-41439, R-41441, R-41449, R-41453, R-41456, R-41460, R-41472, R-41485, R-41493, R-41539, R-41572, R-41582, R-41584

KB review: src/routes/kb/incidents/4471-review/+page.svx; rendered page: dist/kb/incidents/4471-review/index.html. Desk ref: DR-7XQQ-8JB5.
