---
name: specify
description: "Step 2: Creates the story specification document using a progressive 4-level approach (logline → premise → one-page → full spec)."
tools:
  - "*"
kind: local
argument-hint: "[Working Title]"
---

# User Input: $ARGUMENTS

## Objective

Create a detailed story specification document for the novel, serving as the blueprint for all future planning and writing.

## Execution Steps

### 1. Read Constitution

Always read `./memory/constitution.md` first to ensure alignment.

### 1b. Gather Novel Name and Genre

Ask the user for:
- **Novel name or working title** — used to create the directory `./stories/[novel-name]/`.
- **Primary genre** — e.g., fantasy, scifi, romance, mystery, thriller, horror. This determines which genre-knowledge skill to activate.
- **Subgenres or tags** — e.g., "urban fantasy", "space opera", "enemies to lovers".

If the user is unsure of the genre, use the `setting-detector` skill to auto-detect it from their description.

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

### 3. Draft the Specification

Draft the document using the information gathered.
Use the following markers for elements that need work:
- `[Needs Clarification]` for vague points.
- `[Core Requirement]` for non-negotiables.
- `[Optional Feature]` for nice-to-haves.

### 4. Output and Save

Save the specification to `./stories/[novel-name]/specification.md`.

### 5. Post-Specification: Initialize Knowledge Folder

1. Create the directory `./stories/[novel-name]/knowledge/` if it does not exist.
2. Copy and populate from templates:
   - `[user_agent]/templates/knowledge/character-profiles.md` → `./stories/[novel-name]/knowledge/character-profiles.md`
   - `[user_agent]/templates/knowledge/character-voices.md` → `./stories/[novel-name]/knowledge/character-voices.md`
   - `[user_agent]/templates/knowledge/locations.md` → `./stories/[novel-name]/knowledge/locations.md`
   - `[user_agent]/templates/knowledge/world-setting.md` → `./stories/[novel-name]/knowledge/world-setting.md`
3. Pre-fill each file with everything already established in the specification. Replace `[Protagonist Name]` with the actual name, fill out known locations, etc.
4. For fields the user has not yet defined, leave the placeholder text (e.g., `[TBD]`) but offer 2–3 concrete suggestions based on the genre and logline.
5. If the user says "maybe later" or skips a field, leave the placeholder and move on. Do NOT block the workflow.
6. Tell the user: "Knowledge folder created at `./stories/[novel-name]/knowledge/`. These files will be used by the Clarify and Write commands. Fill them in or update them any time."

Inform the user that the specification is ready and suggest they run the `/clarify` command next.

## Supplement Skills

These skills enhance this command's output quality. Check if they are available before proceeding:

| Skill | File | Purpose |
|-------|------|---------|
| `character-depth` | `[user_agent]/skills/writing-techniques/character-depth/SKILL.md` | Require Wound/Ghost and Origin of Motivation for every major character. |
| `setting-detector` | `[user_agent]/skills/quality-assurance/setting-detector/SKILL.md` | Auto-detect genre and setting elements. |
| `genre-knowledge` | `[user_agent]/skills/genre-knowledge/[genre]/SKILL.md` | Load the genre-specific skill matching the user's chosen genre (fantasy, scifi, romance, mystery, thriller, horror). Suggest genre-appropriate tropes, structures, and conventions. |

If any skill file is not found, inform the user:
> "Supplement skills are available to enhance this command. Download them from:
> https://github.com/JeroTan/novel-writer-english.git
> I'll continue without them, but output quality will be reduced."
