---
name: utility-character-sheets-prompt
description: "Bonus comics utility: creates AI prompt files for character reference sheets used by manga, manhwa, manhua, webtoon, and comic page prompts."
tools:
  - "*"
kind: local
argument-hint: "[Character name and optional visual direction]"
---

# User Input: $ARGUMENTS

## Objective

Create a character sheet prompt file for comic/page prompt reference.

Save to:
`./stories/[novel-name]/sheets/characters/[character_slug]_sheet.md`

## Execution Steps

### 1. Read Context

Read only relevant context:
- `./stories/[novel-name]/specification.md`
- `./stories/[novel-name]/knowledge/character-profiles.md`
- `./stories/[novel-name]/knowledge/character-voices.md`
- relevant `./stories/[novel-name]/knowledge/glossary.md`
- relevant source chapters in `./stories/[novel-name]/content/`
- user-provided visual references or description

Load `[user_agent]/skills/writing-techniques/comics-prompting/SKILL.md` when available.

If character is ambiguous, ask which character.

### 2. Prompt Content

The prompt must request a clean character model sheet with:
- labeled Front View, Side View, and Back View
- 3/4 pose if useful
- head turns and face close-ups
- expression/emotion set
- eye/detail close-up
- hairstyle and silhouette notes
- body proportions and posture
- outfit layers, accessories, materials, colors
- weapon/tool/body mark/scar/important body highlight if relevant
- clothing status variants if story uses damaged, disguised, uniform, casual, or battle state
- concise notes/callouts for details an artist or image model must preserve

### 3. File Format

Use:

```markdown
---
novel: [Novel Name]
sheet_type: character
subject: [Character Name]
created: [YYYY-MM-DD]
updated: [YYYY-MM-DD]
prompt_type: reference_sheet_image
---

# Character Sheet — [Character Name]

[Clean prompt paragraph(s). Mention labeled front/side/back views, expressions, detail callouts, clothing/accessories, colors, weapons/tools, and canon notes.]
```

### 4. Task Update

If `./stories/[novel-name]/comics-task.md` exists, add or update:
`- [PROMPTED] **Character sheet: [Name]**`
