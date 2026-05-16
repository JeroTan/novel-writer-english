---
description: "Create a comprehensive story specification document (logline -> premise -> one-page -> full spec)"
argument-hint: "[Working Title]"
---

# User Input: $ARGUMENTS

## Objective
Create a detailed story specification document for the novel, serving as the blueprint for all future planning and writing.

## Execution Steps

### 1. Read Constitution
Read `memory/constitution.md` to ensure all specifications align with your core creative principles.

### 2. Information Gathering
If the user hasn't provided enough information, ask targeted questions to build the 4 levels of specification:

**Level 1: Logline**
- A one-sentence summary of the story.

**Level 2: Premise**
- A short paragraph covering: Protagonist, Goal, Conflict, and Stakes.
- For each major character, include:
  - **Wound / Ghost**: What past event defines them?
  - **Origin of Motivation**: WHY they want their goal (not just what the goal is).
  - **Internal Contradiction**: What they believe vs. what's true.
  *(Explicitly reference the `character-depth` skill if available)*

**Level 3: One-Page Summary**
- Core conflict
- Main characters (Protagonist, Antagonist, Key Allies)
- Target audience
- Success criteria for the novel

**Level 4: Full Specification**
- Detailed setting/worldbuilding overview
- Major plot points (Beginning, Middle, End)
- Key thematic elements
- Deep character profiles for each major character, including:
  - **Wound / Ghost**: What past event defines them?
  - **Origin of Motivation**: WHY they want their goal (not just what the goal is).
  - **Internal Contradiction**: What they believe vs. what's true.
  *(Explicitly reference the `character-depth` skill if available)*

### 3. Draft the Specification
Draft the document using the information gathered. 
Use the following markers for elements that need work:
- `[Needs Clarification]` for vague points.
- `[Core Requirement]` for non-negotiables.
- `[Optional Feature]` for nice-to-haves.

### 4. Output and Save
Save the specification to `stories/[novel-name]/specification.md`.

### 5. Post-Specification: Initialize Knowledge Folder
After saving the specification, immediately do the following:

1. Create the directory `stories/[novel-name]/knowledge/` if it does not exist.
2. Copy and populate from templates:
   - `templates/knowledge/character-profiles.md` → `stories/[novel-name]/knowledge/characters.md`
   - `templates/knowledge/character-voices.md` → `stories/[novel-name]/knowledge/character-voices.md`
   - `templates/knowledge/locations.md` → `stories/[novel-name]/knowledge/locations.md`
   - `templates/knowledge/world-setting.md` → `stories/[novel-name]/knowledge/world-setting.md`
3. Pre-fill each file with everything already established in the specification. Replace `[Protagonist Name]` with the actual name, fill out known locations, etc.
4. For fields the user has not yet defined, leave the placeholder text (e.g., `[TBD]`) but offer 2–3 concrete suggestions based on the genre and logline.
5. If the user says "maybe later" or skips a field, leave the placeholder and move on. Do NOT block the workflow.
6. Tell the user: "Knowledge folder created at `stories/[novel-name]/knowledge/`. These files will be used by the Clarify and Write agents. Fill them in or update them any time."

Inform the user that the specification is ready and suggest they run the `clarify` command next.