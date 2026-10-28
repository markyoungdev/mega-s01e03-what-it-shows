# Shared date parser swaps day and month — 379 reports

## Scope

Reports: **379** unique report IDs from #4471 in the October 4 export.

The shared parser reads dates month first although tenant locales are day first. This affects app/email paths and booking-v2 forms.

## Evidence

- R-41200 — harbour.dental / app: Our 7 April reminder went out on 4 July. Is this a joke. It is not April Fools where we are.
- R-41619 — harbour.dental / email: Booked for 9 December. The invite says 12 September.

## Reproduction / investigation

Use a day-first tenant and submit 07/04 through the app or email: expected 7 April; observed July 4. Verify all 11 tenant locales and channels. Use tenant settings, not browser locale.

## Acceptance

Respect tenant date order consistently; add regression coverage for ambiguous and unambiguous dates, and verify booking-v3 separately.

## Counting and provenance

Deduplicate the export by report ID, then select #4471 and group by causeOf(report, tenantOf(report)). This group has 379 unique report IDs across 11 tenants, first seen 2026-04-01 and last seen 2026-10-04.

Source: src/lib/kb/causes.ts, src/lib/kb/locales.ts, src/lib/data/tenants/, src/lib/data/reports-4471.json. CauseTable computes this group at render time.

Five reports in this group are flagged in desk-notes.json as one-day moves: R-41202, R-41209, R-41236, R-41344, R-41620. Their symptoms deserve investigation; the tenant/channel classifier does not establish their root cause.

KB review: src/routes/kb/incidents/4471-review/+page.svx; rendered page: dist/kb/incidents/4471-review/index.html. Desk ref: DR-7XQQ-8JB5.

## Resolution

Engineering update, October 5: **fixed** — fix(dates): parse dd/mm for eu locales. Closure follows the course desk update; no product patch was implemented in this review repository.
Source: https://hq.mega.dev/challenges/what-it-shows#engineering-update
