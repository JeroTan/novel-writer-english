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
- previous and next page plan sections when revising a page prompt
- previous and next generated page prompt files when they exist
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
- Preserve page continuity with the previous and next page. Match location, time, positions, clothing/injury state, held objects, lighting, mood, and unresolved action/dialogue unless the revision intentionally adds a transition.
- If the page jumps in time/place/POV, add a visible transition indicator inside the scene, such as a caption, establishing shot, time/place card, or story-fit transition phrase.
- If revision creates a continuity gap, add a bridging beat or recommend adding a new page instead of forcing a broken jump.
- If important dialogue is blank, muffled, tiny, or indistinct, replace it with readable dialogue text unless the words are intentionally hidden for mystery or background texture.
- If one character misses a line, show it through scene staging: distance, blocked sightline, crowd noise, no reaction, wrong reaction, delayed reaction, or separate panel. Do not add meta-notes explaining who hears what.
- Address user feedback directly: pose, expression, framing, lighting, costume, setting, object detail, NPC design, panel flow, or style.
- Do not change canon unless user explicitly approves.

### 4. Save Behavior

Default: save revised prompt next to original with suffix `_revise_[YYYYMMDD].md`.

If user explicitly says overwrite, update the original file instead.

### 5. Task Update

If revising a comic page, update matching page in `./stories/[novel-name]/comics-task.md` to `[REVISED]`.

If revising a sheet prompt, update matching sheet task to `[REVISED]` when present.
