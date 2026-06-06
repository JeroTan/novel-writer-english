---
name: utility-npc-sheets-prompt
description: "Bonus comics utility: creates AI prompt files for NPC, race, monster, bestiary, crowd, guard, civilian, or general archetype reference sheets used by comic page prompts."
tools:
  - "*"
kind: local
argument-hint: "[NPC/group/race/monster name and optional visual direction]"
---

# User Input: $ARGUMENTS

## Objective

Create an NPC/general sheet prompt file for comic/page prompt reference.

Save to:
`./stories/[novel-name]/sheets/npc/[npc_slug]_sheet.md`

## Execution Steps

### 1. Read Context

Read only relevant context:
- `./stories/[novel-name]/specification.md`
- `./stories/[novel-name]/knowledge/character-profiles.md`
- `./stories/[novel-name]/knowledge/world-setting.md`
- `./stories/[novel-name]/knowledge/glossary.md`
- relevant source chapters in `./stories/[novel-name]/content/`
- user-provided visual references or description

Load `[user_agent]/skills/writing-techniques/comics-prompting/SKILL.md` when available.

If subject is ambiguous, ask which NPC, race, monster, bestiary entry, crowd role, guard type, civilian type, or archetype.

### 2. Prompt Content

The prompt must request a clean NPC/general reference sheet with:
- labeled Front View, Side View, and Back View
- silhouette rules and anatomy/proportion notes
- head/face close-ups and expression/behavior set
- clothing, armor, uniform, accessories, equipment, bags, weapons, symbols, or tools
- rank/role variants if relevant
- age/body type/gender variants only when useful for crowd consistency
- color palette and material notes
- distinguishing details that keep the group recognizable across pages

### 3. File Format

Use:

```markdown
---
novel: [Novel Name]
sheet_type: npc_general
subject: [NPC, Group, Race, Monster, or Archetype Name]
created: [YYYY-MM-DD]
updated: [YYYY-MM-DD]
prompt_type: reference_sheet_image
---

# NPC / General Sheet — [Subject Name]

[Clean prompt paragraph(s). Mention front/side/back views, variants, anatomy/silhouette, outfit/equipment, behavior, palette, and continuity notes.]
```

### 4. Task Update

If `./stories/[novel-name]/comics-task.md` exists, add or update:
`- [PROMPTED] **NPC/general sheet: [Name]**`
