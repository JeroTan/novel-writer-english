---
name: clarify
description: "Step 3: Reviews the specification, identifies up to 5 ambiguities, and asks targeted questions to resolve them."
tools:
  - "*"
kind: local
argument-hint: "[Optional: specific area to clarify]"
---

# User Input: $ARGUMENTS

## Objective

Eliminate vagueness from the story specification by identifying and resolving ambiguities.

## Execution Steps

### 1. Read Context

1. Read `./memory/constitution.md` and `./stories/[novel-name]/specification.md`.
2. Check if `./stories/[novel-name]/knowledge/` exists and contains files.
   - If it exists: read the contents of `character-profiles.md`, `character-voices.md`, `locations.md`, `world-setting.md`, `glossary.md`, and `strategic-reversals.md` when present.
   - If it does NOT exist: inform the user — "The knowledge folder hasn't been created yet. This folder improves the accuracy of clarification. You can either re-run the `/specify` step to create it, or create `./stories/[novel-name]/knowledge/` manually and continue."

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
- Update `./stories/[novel-name]/specification.md` with the answers. Remove resolved `[Needs Clarification]` markers.
- If any answer adds new information about characters, character voices, locations, worldbuilding, terminology, contests, tactics, or strategic reversals, also update the relevant file in `./stories/[novel-name]/knowledge/`.

### 5. Next Steps

Tell the user: "Specification clarified. Continue to Step 4 with `/planner`."

## Supplement Skills

These skills enhance this command's output quality. Check if they are available before proceeding:

| Skill | File | Purpose |
|-------|------|---------|
| `character-depth` | `[user_agent]/skills/writing-techniques/character-depth/SKILL.md` | Flag if any major character lacks psychological backstory. |
| `requirement-detector` | `[user_agent]/skills/quality-assurance/requirement-detector/SKILL.md` | Identify missing core requirements. |

If any skill file is not found, inform the user:
> "Supplement skills are available to enhance this command. Download them from:
> https://github.com/JeroTan/novel-writer-english.git
> I'll continue without them, but output quality will be reduced."
