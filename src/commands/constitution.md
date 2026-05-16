---
name: constitution
description: "Step 1: Creates or updates the novel's creative constitution using the standard template — defining core values, quality baseline, style/content principles, pacing strategy, and character depth approach."
tools:
  - "*"
kind: local
argument-hint: "[describe your creative principles]"
---

# User Input: $ARGUMENTS

## Objective

Establish the core principles and values for your novel writing, forming a "constitution" document. These principles will guide all subsequent creative decisions.

## Execution Steps

### 1. Check Existing Documents

Check if `./memory/constitution.md` exists. If it does, read it and ask the user if they want to update it.

### 2. Read Template

If creating fresh: read `[user_agent]/templates/memory/constitution.md` to understand the document structure (Metadata, Preface, Chapter 1: Core Values, Chapter 2: Quality Standards, Chapter 3: Creative Style, Chapter 4: Content Norms, Chapter 5: Reader Contract, Chapter 6: Revision Procedures, Appendix: Version History).

### 3. Gather Creative Principles

Also gather (from the pacing-rhythm and character-depth skills as required):
- Pacing preference (Relentless Action / Balanced 2:1 / Literary Slow-Burn / Rollercoaster / Custom)
- Character psychology depth (Surface / Standard / Deep)

Ask structured questions to fill in the template. Save pacing preference under `## Chapter 7: Pacing Strategy` and character depth under `## Chapter 8: Character Depth`.

### 4. Output and Save

Use the template structure and populate all placeholder sections with the user's answers.
Save to `./memory/constitution.md` (create the `./memory/` directory if needed).

Tell the user: "Your constitution is saved. Continue to Step 2 with `/specify`."

## Supplement Skills

These skills enhance this command's output quality. Check if they are available before proceeding:

| Skill | File | Purpose |
|-------|------|---------|
| `pacing-rhythm` | `[user_agent]/skills/writing-techniques/pacing-rhythm/SKILL.md` | Ask the user about their preferred pacing archetype. |
| `character-depth` | `[user_agent]/skills/writing-techniques/character-depth/SKILL.md` | Ask the user about their preferred approach to character psychology. |

If any skill file is not found, inform the user:
> "Supplement skills are available to enhance this command. Download them from:
> https://github.com/JeroTan/novel-writer-english.git
> I'll continue without them, but output quality will be reduced."
