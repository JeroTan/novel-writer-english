---
name: comics-chapter-pages-prompt
description: "Bonus comics workflow: generates clean AI image prompt files for comic chapter pages from comics-plan.md."
tools:
  - "*"
kind: local
argument-hint: "[Comic chapter/page range, e.g., 'Chapter 1 pages 1-5']"
---

# User Input: $ARGUMENTS

## Objective

Generate detailed comic page AI image prompts from `./stories/[novel-name]/comics-plan.md`.

Save each page prompt to:
`./stories/[novel-name]/comic/chapter_0001/ch_0001_page_001.md`

## Execution Steps

### 1. Read Context

Read:
- `./stories/[novel-name]/comics-plan.md`
- `./stories/[novel-name]/comics-task.md`
- source novel chapter files listed in the comics plan
- relevant `./stories/[novel-name]/knowledge/`
- relevant `./stories/[novel-name]/tracking/`
- relevant sheet prompt files in `./stories/[novel-name]/sheets/characters/`
- relevant sheet prompt files in `./stories/[novel-name]/sheets/place/`
- relevant sheet prompt files in `./stories/[novel-name]/sheets/object/`
- relevant sheet prompt files in `./stories/[novel-name]/sheets/npc/`

Load `[user_agent]/skills/writing-techniques/comics-prompting/SKILL.md` when available.

Use this public guide as layout reference: https://www.clipstudio.net/how-to-draw/archives/157055

### 2. Select Pages

If `$ARGUMENTS` names chapter/page range, generate those files.

If no range is given, ask which comic chapter and pages to generate.

### 3. Prompt Rules

- Prompt body must be clean text only: one paragraph or multiple paragraphs.
- Do not output tables in prompt files.
- Include page layout, panel or vertical-scroll beats, camera, composition, lighting, mood, color/BW choice, action, character expressions, continuity details, and sheet references.
- Include dialogue and captions. State bubble placement.
- Always include sheet reference language when applicable:
  - "Use the provided character sheet for [Name]."
  - "Use the provided setting sheet for [Place]."
  - "Use the provided object sheet for [Object]."
  - "Use the provided NPC/general sheet for [Group]."
- If a needed sheet is missing, mention what sheet is needed and use current knowledge as fallback.
- Preserve canon from source chapter. Do not add new plot beats unless needed as visual bridge and mark it as a visual bridge.

### 4. File Format

Use zero-padded comic chapter and page numbers:
- folder: `chapter_0001`
- file: `ch_0001_page_001.md`

Each file must use:

```markdown
---
novel: [Novel Name]
comic_chapter: [N]
page: [N]
source_chapters:
  - ./stories/[novel-name]/content/chapter_00001.md
created: [YYYY-MM-DD]
updated: [YYYY-MM-DD]
prompt_type: comic_page_image
---

# Chapter [N] Page [N] — [Prompt Headline]

[Clean prompt paragraph(s). Include sheet references, layout, action, dialogue/captions, bubble placement, camera, mood, continuity details, and image style.]
```

### 5. Task Update

After creating each page file, update matching page in `./stories/[novel-name]/comics-task.md` from `[ ]` to `[PROMPTED]`. Preserve other statuses.

### 6. Handoff

If user has generated art and wants changes, suggest `/comics-revise-prompt [target prompt file]`.
