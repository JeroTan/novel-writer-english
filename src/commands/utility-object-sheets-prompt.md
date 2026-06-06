---
name: utility-object-sheets-prompt
description: "Bonus comics utility: creates AI prompt files for object, prop, weapon, artifact, tool, or vehicle reference sheets used by comic page prompts."
tools:
  - "*"
kind: local
argument-hint: "[Object/prop name and optional visual direction]"
---

# User Input: $ARGUMENTS

## Objective

Create an object sheet prompt file for comic/page prompt reference.

Save to:
`./stories/[novel-name]/sheets/object/[object_slug]_sheet.md`

## Execution Steps

### 1. Read Context

Read only relevant context:
- `./stories/[novel-name]/specification.md`
- `./stories/[novel-name]/knowledge/glossary.md`
- `./stories/[novel-name]/knowledge/world-setting.md`
- relevant `./stories/[novel-name]/content/` chapters
- user-provided visual references or description

Load `[user_agent]/skills/writing-techniques/comics-prompting/SKILL.md` when available.

If object is ambiguous, ask which object.

### 2. Prompt Content

The prompt must request a clean object reference sheet with:
- front, side, back, top, bottom, and 3/4 views when useful
- functional close-ups and moving parts
- materials, construction, texture, seams, marks, inscriptions, screens, handles, straps, hinges, or damage
- size/scale beside a hand, character, or environment
- usage poses or interaction detail when important
- variants: folded/open, powered/off, damaged/intact, concealed/revealed, ordinary/activated
- notes on what must stay consistent across pages

### 3. File Format

Use:

```markdown
---
novel: [Novel Name]
sheet_type: object
subject: [Object Name]
created: [YYYY-MM-DD]
updated: [YYYY-MM-DD]
prompt_type: reference_sheet_image
---

# Object Sheet — [Object Name]

[Clean prompt paragraph(s). Mention multiple views, functional details, materials, scale, variants, and continuity notes.]
```

### 4. Task Update

If `./stories/[novel-name]/comics-task.md` exists, add or update:
`- [PROMPTED] **Object sheet: [Name]**`
