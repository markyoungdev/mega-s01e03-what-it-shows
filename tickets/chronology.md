# Invite appears before its booking — 1 report

Reports: **1**, R-41236, received 2026-04-20, nine.lanterns, app, merged into #4471.

The reporter says: “The invite arrived before I made the booking. I would like to know how.” This is an event-order anomaly, not evidence of a month/day swap or a one-day display shift. The cause is unknown.

Retrieve booking creation, invitation generation, delivery and client receipt timestamps with explicit time zones and stable event IDs. Establish whether this is clock skew, misleading display, a stale invite or a scheduling race before proposing a fix. Preserve source payloads. Verify causal ordering after a confirmed fix.

This report is excluded from the four-report one-day investigation. The non-overlapping partition is 374 parser, 33 form hint, 4 one-day shifts, 1 event chronology: 412 unique reports. Source: src/lib/data/reports-4471.json.
