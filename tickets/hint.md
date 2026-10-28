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

Deduplicate the export by report ID, then select #4471 and the booking-v3 form path in day-first tenants. This group has 33 unique report IDs across three tenants, first seen 2026-04-17 and last seen 2026-09-22. Browser locale is not tenant locale: 15 of these reports have an incorrect intake tag.

Source: src/lib/kb/causes.ts, src/lib/kb/locales.ts, src/lib/data/tenants/, src/lib/data/reports-4471.json. CauseTable computes this group at render time.

KB review: src/routes/kb/incidents/4471-review/+page.svx; rendered page: dist/kb/incidents/4471-review/index.html. Desk ref: DR-7XQQ-8JB5.
