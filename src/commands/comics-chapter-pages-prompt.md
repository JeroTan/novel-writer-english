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
- previous page plan and next page plan for the selected comic chapter
- previous generated page prompt file if it exists
- next generated page prompt file if revising or continuing an already prompted range
- relevant `./stories/[novel-name]/knowledge/`
- relevant `./stories/[novel-name]/tracking/`
- `./stories/[novel-name]/knowledge/character-voices.md` for every speaking character
- relevant sheet prompt files in `./stories/[novel-name]/sheets/characters/`
- relevant sheet prompt files in `./stories/[novel-name]/sheets/place/`
- relevant sheet prompt files in `./stories/[novel-name]/sheets/object/`
- relevant sheet prompt files in `./stories/[novel-name]/sheets/npc/`

Load `[user_agent]/skills/writing-techniques/comics-prompting/SKILL.md` when available.

Use this public guide as layout reference: https://www.clipstudio.net/how-to-draw/archives/157055
Use this dialogue advice reference: https://www.reddit.com/r/WebtoonCanvas/comments/1k8r83q/can_anyone_give_me_some_advice_on_writing/

### 2. Select Pages

If `$ARGUMENTS` names chapter/page range, generate those files.

If no range is given, ask which comic chapter and pages to generate.

### 3. Prompt Rules

- Prompt body must be clean text only: one paragraph or multiple paragraphs.
- Do not output tables in prompt files.
- Include page layout, panel or vertical-scroll beats, camera, composition, lighting, mood, color/BW choice, action, character expressions, continuity details, and sheet references.
- Page prompts must form a connected scene chain. Before writing a page, check the previous page's Continuity Out and the current page's Continuity In. If they conflict, fix the prompt or add a transition beat.
- For continuous scenes, begin from the previous page's final state: same location, time, character positions, gaze direction, clothing/injury state, held objects, lighting, weather, mood, and unresolved action/dialogue.
- For discontinuous scenes, include a visible transition indicator inside the scene: caption, establishing shot, location card, time card, color/lighting shift, or opening environment beat. Use labels like "Next day," "Few years later," "Elsewhere," "Meanwhile," "Same night," or a story-fit equivalent.
- If a page becomes too crowded or skips necessary movement/reaction, create another page file and add it to `comics-plan.md` and `comics-task.md` rather than breaking continuity.
- End every prompt with a clear handoff state for the next page: where characters are, what object moved, what reaction lands, what line/action remains unresolved.
- Include dialogue and captions. State bubble placement and bubble rhythm.
- Dialogue is required unless the page is deliberately silent. If silent, say why silence is stronger.
- If the source light novel gives little or no dialogue, create faithful comic-native dialogue that respects source meaning, character voice, relationship state, and scene facts. Do not add new canon facts.
- Do not ask the user to write ordinary dialogue when source intent, character voice, and scene facts are enough. Generate strong candidate dialogue. Ask only if the line would decide new canon, reveal unknown facts, or change character intent.
- Every dialogue line should serve at least one function: reveal character, move plot, create suspense, shift relationship/status, deliver needed exposition, create humor, or sharpen emotional pressure.
- Keep bubbles short and readable. Use one idea per bubble. Split lines at emotional turns, pauses, interruptions, or reaction beats.
- Avoid dialogue that only describes what the image already shows.
- Use captions/thought bubbles sparingly for interiority that cannot be shown through pose, expression, framing, or object detail.
- If one character cannot hear a line, keep important dialogue readable and let the scene show it: distance, blocked sightline, crowd noise, no reaction, wrong reaction, delayed reaction, or separate panel.
- Use blank, tiny, blurred, muffled, or indistinct bubbles only for mystery, background chatter, or words intentionally hidden from the page.
- Do not add meta-notes such as "Reader sees/hears," "Heard by," or "Not heard by" in generated prompt text.
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

[Clean prompt paragraph(s). Include sheet references, layout, action, dialogue/captions, bubble rhythm and placement, scene staging for missed/whispered/interrupted lines, camera, mood, continuity in/out, transition indicator only when needed, and image style.]
```

### 5. Task Update

After creating each page file, update matching page in `./stories/[novel-name]/comics-task.md` from `[ ]` to `[PROMPTED]`. Preserve other statuses.

### 6. Handoff

If user has generated art and wants changes, suggest `/comics-revise-prompt [target prompt file]`.
