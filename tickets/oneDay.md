# Investigate one-day shifts and invite timing anomalies — 5 reports

## Scope

Reports: **5** unique report IDs from #4471 in the October 4 export.

Five report bodies describe a one-day or timing anomaly rather than a month/day swap. The current classifier assigns them to parser by tenant/channel, which does not explain the symptoms. Root cause is unconfirmed; timezone/date-only conversion is a hypothesis.

## Evidence

- R-41202: Invite says Tuesday 12 May. Calendar says Monday 11 May. My client turned up on the Monday. We had coffee.
- R-41209: Every booking in June is one day off. Only June. Why only June.
- R-41236: The invite arrived before I made the booking. I would like to know how.
- R-41344: Client in Lisbon got Tuesday. Client in Toronto got Monday. Same meeting. We held it twice.
- R-41620: Tuesday 6 October showed as Monday. I moved it myself. I have stopped reporting these but my colleague says it helps you.

## Reproduction / investigation

Compare original event payloads and timestamps across invite/calendar clients and Lisbon/Toronto time zones. Reproduce the June-only one-day report and the invite-before-booking anomaly independently. Do not claim one proven root cause for these observations.

## Acceptance

Preserve these five reports as a separate investigation. Confirm whether they share a cause, split further if evidence requires, and test date-only conversion, daylight-saving boundaries and event chronology where relevant.

## Counting and provenance

427 exported rows collapse to 412 unique IDs. This partition is 374 parser + 33 hint + 5 unresolved timing = 412. The unchanged existing CauseTable shows 379 parser + 33 hint because it includes the five timing exceptions under parser. Intake tags alone produce 371/41 and are not causal evidence.

Source: src/lib/data/reports-4471.json; tenant directory; src/lib/kb/causes.ts; desk-notes.json. Exact assigned IDs: R-41202, R-41209, R-41236, R-41344, R-41620

KB review: src/routes/kb/incidents/4471-review/+page.svx; rendered page: dist/kb/incidents/4471-review/index.html. Desk ref: DR-7XQQ-8JB5.
