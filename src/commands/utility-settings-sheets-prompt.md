---
name: utility-settings-sheets-prompt
description: "Bonus comics utility: creates AI prompt files for setting/place reference sheets used by comic page prompts."
tools:
  - "*"
kind: local
argument-hint: "[Setting/place name and optional visual direction]"
---

# User Input: $ARGUMENTS

## Objective

Create a setting/place sheet prompt file for comic/page prompt reference.

Save to:
`./stories/[novel-name]/sheets/place/[setting_slug]_sheet.md`

## Execution Steps

### 1. Read Context

Read only relevant context:
- `./stories/[novel-name]/specification.md`
- `./stories/[novel-name]/knowledge/locations.md`
- `./stories/[novel-name]/knowledge/world-setting.md`
- relevant `./stories/[novel-name]/knowledge/glossary.md`
- relevant source chapters in `./stories/[novel-name]/content/`
- user-provided visual references or description

Load `[user_agent]/skills/writing-techniques/comics-prompting/SKILL.md` when available.

If setting is ambiguous, ask which place.

### 2. Prompt Content

The prompt must request a clean setting reference sheet with:
- key exterior/interior angles
- main landmarks and composition anchors
- scale cues with people or objects
- entrances, exits, paths, stairs, windows, doors, roads, or transit routes
- materials, texture, lighting, weather, time-of-day variants
- mood and color palette
- recurring props, signage, symbols, hazards, and background details
- notes on what must stay consistent across pages

### 3. File Format

Use:

```markdown
---
novel: [Novel Name]
sheet_type: setting
subject: [Setting Name]
created: [YYYY-MM-DD]
updated: [YYYY-MM-DD]
prompt_type: reference_sheet_image
---

# Setting Sheet — [Setting Name]

[Clean prompt paragraph(s). Mention key angles, landmarks, scale, lighting, mood, materials, recurring props, and continuity notes.]
```

### 4. Task Update

If `./stories/[novel-name]/comics-task.md` exists, add or update:
`- [PROMPTED] **Setting sheet: [Name]**`
