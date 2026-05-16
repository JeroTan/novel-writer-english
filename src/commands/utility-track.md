---
name: utility-track
description: "Update or query the comprehensive tracking system."
tools:
  - "*"
kind: local
argument-hint: "[update | query] [details]"
---

# User Input: $ARGUMENTS

## Objective

Keep the story's internal tracking state up-to-date or query it for specific information.

## Execution Steps

### 1. Identify Action

Determine if the user is updating the state or querying it.

### 2. Update State

If updating (e.g., "Character A just lost their sword in Chapter 5"):
- Identify which JSON file needs updating (`./stories/[novel-name]/tracking/character-state.json`, `./stories/[novel-name]/tracking/plot-tracker.json`, etc.).
- Apply the necessary changes to the JSON structure.

### 3. Query State

If querying (e.g., "Where is Character B right now?" or "What is the status of the main plot?"):
- Read the relevant JSON files in the `./stories/[novel-name]/tracking/` directory.
- Provide a clear, formatted answer based on the tracked data.

### 4. Validation

If the user requests validation (`--check`), run the rules defined in `./stories/[novel-name]/tracking/validation-rules.json` against the latest chapter to ensure names, titles, and facts are consistent.
