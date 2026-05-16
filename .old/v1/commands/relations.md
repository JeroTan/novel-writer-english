---
description: "Manage and analyze character relationships."
argument-hint: "[Optional: specific characters to analyze]"
---

# User Input: $ARGUMENTS

## Objective
Track, update, or analyze the evolving relationships between characters in the story.

## Execution Steps

### 1. Read Context
Read `templates/tracking/relationships.json` (if initialized) and the `specification.md`.

### 2. Perform Requested Action
Based on user input:
- **Add/Update Relationship**: Update the status of a relationship between two characters (e.g., "Strangers" to "Allies").
- **Analyze Dynamic**: Explain the current tension or bond between specific characters based on recent story events.
- **Identify Conflicts**: Highlight potential future conflicts based on differing goals or factions.

### 3. Output
Provide a summary of the relationship status or the requested analysis. If using the tracking system, remind the user to update `relationships.json`.