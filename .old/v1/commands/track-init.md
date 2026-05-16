---
description: "Initialize the JSON tracking system for a new novel."
argument-hint: "[Novel Name]"
---

# User Input: $ARGUMENTS

## Objective
Set up the JSON tracking files required for advanced story consistency tracking.

## Execution Steps

### 1. Create Tracking Directory
Ensure the `tracking/` directory exists for the current project.

### 2. Initialize Files
Initialize the following files using the templates in `templates/tracking/`:
- `character-state.json`
- `plot-tracker.json`
- `relationships.json`
- `timeline.json`
- `validation-rules.json`

Replace placeholder values (like `[Novel Name]`) with the actual project name provided by the user.

### 3. Output
Confirm that the tracking system has been initialized. Explain briefly that these files will be used by the `/track` command to maintain consistency as the story grows.