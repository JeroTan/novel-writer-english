---
description: "Manage the story timeline and verify chronological consistency."
argument-hint: "[Optional: event to add or timeframe to analyze]"
---

# User Input: $ARGUMENTS

## Objective
Maintain a coherent chronological timeline of events in the story to prevent continuity errors.

## Execution Steps

### 1. Read Context
Read `templates/tracking/timeline.json` (if initialized) and the relevant story documents.

### 2. Perform Requested Action
Based on user input:
- **Add Event**: Record a new event with its in-story date and duration.
- **Verify Timeline**: Check recent chapters against the timeline to ensure travel times, aging, and concurrent events make logical sense.
- **Generate Summary**: Provide a chronological summary of all major events up to the current point.

### 3. Output
Provide the timeline analysis or summary. If an error is detected (e.g., a character travels 500 miles in one day on horseback), flag it immediately as a chronological anomaly.