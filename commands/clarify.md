---
description: "Review the specification, identify up to 5 ambiguities, and ask targeted questions to resolve them."
argument-hint: "[Optional: specific area to clarify]"
---

# User Input: $ARGUMENTS

## Objective
Eliminate vagueness from the story specification by identifying and resolving ambiguities.

## Execution Steps

### 1. Read Context
1. Read `memory/constitution.md` and `stories/[novel-name]/specification.md`.
2. Check if `stories/[novel-name]/knowledge/` exists and contains files.
   - If it exists: read the contents of `characters.md`, `world-setting.md`, `locations.md`, and `character-voices.md`.
   - If it does NOT exist: inform the user — "The knowledge folder hasn't been created yet. This folder improves the accuracy of clarification. You can either re-run the `specify` step to create it, or create `stories/[novel-name]/knowledge/` manually and continue."

### 2. Identify Ambiguities
Analyze ALL loaded documents for:
- Plot holes
- Weak character motivations
- Vague worldbuilding
- Conflicting tones
- Missing psychological backstory (per character-depth skill)
- Any `[Needs Clarification]` markers
- Discrepancies between the specification and the knowledge files

### 3. Ask Questions
Present exactly 1 to 5 highly specific, targeted questions to the user. Do not ask more than 5.
Wait for the user's answers.

### 4. Update Documents
Once the user answers:
- Update `stories/[novel-name]/specification.md` with the answers. Remove resolved `[Needs Clarification]` markers.
- If any answer adds new information about characters, locations, or the world, also update the relevant file in `stories/[novel-name]/knowledge/`.

### 5. Next Steps
Tell the user: "Specification clarified. Continue to Step 4 with `@planner`."