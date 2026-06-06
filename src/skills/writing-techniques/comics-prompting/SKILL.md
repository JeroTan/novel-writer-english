---
name: comics-prompting
description: "Use when adapting novel chapters into manga, manhwa, manhua, webtoon, comic page plans, page image prompts, revision prompts, or visual reference sheet prompts for characters, settings, objects, NPCs, monsters, races, and props."
---

# Comics Prompting

Use this skill to convert novel prose into comic planning assets and clean AI image prompts.

## Source Guide

Reference: Clip Studio Paint Art Rocket, "Tips for Creating Vertical Scrolling Webtoons" — https://www.clipstudio.net/how-to-draw/archives/157055

Apply these ideas:
- Webtoon/manhwa flow reads vertically on phones; arrange panels mostly top-to-bottom.
- Character placement and dialogue placement must be deliberate.
- Space between panels controls timing, rest, scene changes, and dramatic impact.
- Reduce text where possible. Convert narration into visible action, expression, pose, setting detail, caption, or short bubble.
- Keep smartphone readability in mind: clear silhouettes, readable bubbles, limited crowding.
- Color and background area can carry mood, flashback, time, and atmosphere.
- Long vertical canvases may be planned as one flow, then split into page/upload-sized prompt units.
- Traditional manga/manhua page formats may use page turns and panel grids, but still need clear eye flow.

## Adaptation Rules

- Preserve novel canon. Do not invent plot changes unless needed as a visual bridge, and mark those bridges.
- One page or vertical-scroll unit should focus on one strong beat, or a short linked sequence of beats.
- Convert internal narration into expression, body language, props, framing, lighting, symbolic background, or short caption.
- Include source chapter(s) for every comic chapter and page.
- Vary visual rhythm: establishing shot, medium shot, close-up, reaction, action panel, object detail, quiet gap.
- Keep dialogue exact when canon matters; otherwise compress lightly for bubble readability.
- Specify bubble placement: top-left, top-right, center, lower panel, beside character, off-panel, caption box, thought bubble.
- Keep continuity: character position, eye-line, object location, injuries, clothing state, lighting, and scene geography.
- Always mention relevant sheets in prompts: "Use the provided character sheet for [Name]" and similar for settings, objects, NPCs, monsters, races, or props.

## Output Paths

- Plan: `stories/[novel-name]/comics-plan.md`
- Task list: `stories/[novel-name]/comics-task.md`
- Page prompts: `stories/[novel-name]/comic/chapter_0001/ch_0001_page_001.md`
- Character sheets: `stories/[novel-name]/sheets/characters/[slug]_sheet.md`
- Setting sheets: `stories/[novel-name]/sheets/place/[slug]_sheet.md`
- Object sheets: `stories/[novel-name]/sheets/object/[slug]_sheet.md`
- NPC/general sheets: `stories/[novel-name]/sheets/npc/[slug]_sheet.md`

## Comic Page Prompt Standard

Each page prompt file should have frontmatter, one headline, then clean prompt text. Body may be one paragraph or multiple paragraphs. Do not use tables inside prompt files.

Include:
- format: manga, manhwa/webtoon, manhua, or hybrid
- page purpose and source chapter
- panel or vertical scroll beats
- characters, setting, objects, NPCs, and sheet references
- camera angle, shot scale, composition, lighting, mood, color or black-and-white treatment
- action, expressions, poses, continuity details
- dialogue/captions with bubble placement

## Sheet Prompt Standards

**Character sheet**
- Include labeled front view, side view, and back view.
- Include head turns, expression/emotion set, eye/detail close-up, hairstyle detail, body proportions, silhouette, palette, outfit layers, accessories, weapon/tool if important, body marks, scars, clothing status variants, and notes.

**Setting/place sheet**
- Show key angles, landmarks, scale, entrances/exits, navigation path, materials, lighting/time variants, mood, signage, recurring props, and shot anchors used for continuity.

**Object sheet**
- Show multiple angles: front, side, back, top, 3/4, functional detail close-ups, moving parts, materials, scale beside hand/person, variants, damage/wear state, and how characters hold or use it.

**NPC/general sheet**
- Use for unnamed groups, race/species design, monsters, bestiary, crowd roles, guards, civilians, or recurring minor archetypes.
- Include labeled front/side/back, silhouette rules, anatomy, clothing/equipment, rank/role variants, expression/behavior notes, palette, accessories, and distinguishing details.

## Prompt Tone

Prompt text should be clean, direct, and usable in image models. Avoid workflow explanation inside generated prompt files. Mention external source documents only as references the image model should use, not as process notes.
