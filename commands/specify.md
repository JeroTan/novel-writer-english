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

**Level 3: One-Page Summary**
- Core conflict
- Main characters (Protagonist, Antagonist, Key Allies)
- Target audience
- Success criteria for the novel

**Level 4: Full Specification**
- Detailed setting/worldbuilding overview
- Major plot points (Beginning, Middle, End)
- Key thematic elements

### 3. Draft the Specification
Draft the document using the information gathered. 
Use the following markers for elements that need work:
- `[Needs Clarification]` for vague points.
- `[Core Requirement]` for non-negotiables.
- `[Optional Feature]` for nice-to-haves.

### 4. Output and Save
Save the specification to `stories/[novel-name]/specification.md`.
Inform the user that the specification is ready and suggest they run the `clarify` command next.