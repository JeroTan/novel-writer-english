---
name: comics-revise-prompt
description: "Bonus comics workflow: revises comic page or sheet prompt files based on user feedback or generated image results."
tools:
  - "*"
kind: local
argument-hint: "[Target prompt file and revision request]"
---

# User Input: $ARGUMENTS

## Objective

Revise an existing comic page prompt or sheet prompt while preserving canon, sheet references, and file metadata.

## Execution Steps

### 1. Identify Target

If `$ARGUMENTS` includes a file path, use it.

Otherwise ask which file to revise under:
- `./stories/[novel-name]/comic/`
- `./stories/[novel-name]/sheets/characters/`
- `./stories/[novel-name]/sheets/place/`
- `./stories/[novel-name]/sheets/object/`
- `./stories/[novel-name]/sheets/npc/`

Read the target prompt file and any feedback supplied by the user.

### 2. Read Supporting Context

Read only relevant supporting files:
- `./stories/[novel-name]/comics-plan.md`
- source chapter(s) listed in target frontmatter
- matching sheet files
- relevant knowledge/tracking entries

Load `[user_agent]/skills/writing-techniques/comics-prompting/SKILL.md` when available.

### 3. Revise Prompt

Rules:
- Preserve frontmatter keys.
- Update `updated` date.
- Keep prompt body clean: one paragraph or multiple paragraphs, no tables.
- Keep sheet references explicit.
- Keep dialogue/caption text and bubble placement unless user asks to change it.
- Address user feedback directly: pose, expression, framing, lighting, costume, setting, object detail, NPC design, panel flow, or style.
- Do not change canon unless user explicitly approves.

### 4. Save Behavior

Default: save revised prompt next to original with suffix `_revise_[YYYYMMDD].md`.

If user explicitly says overwrite, update the original file instead.

### 5. Task Update

If revising a comic page, update matching page in `./stories/[novel-name]/comics-task.md` to `[REVISED]`.

If revising a sheet prompt, update matching sheet task to `[REVISED]` when present.
