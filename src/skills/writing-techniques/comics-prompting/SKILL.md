---
name: comics-prompting
description: "Use when adapting novel chapters into manga, manhwa, manhua, webtoon, comic page plans, page image prompts, revision prompts, or visual reference sheet prompts for characters, settings, objects, NPCs, monsters, races, and props."
---

# Comics Prompting

Use this skill to convert novel prose into comic planning assets and clean AI image prompts.

## Source Guide

References:
- Clip Studio Paint Art Rocket, "Tips for Creating Vertical Scrolling Webtoons" — https://www.clipstudio.net/how-to-draw/archives/157055
- Reddit r/WebtoonCanvas dialogue advice thread — https://www.reddit.com/r/WebtoonCanvas/comments/1k8r83q/can_anyone_give_me_some_advice_on_writing/

Apply these ideas:
- Webtoon/manhwa flow reads vertically on phones; arrange panels mostly top-to-bottom.
- Character placement and dialogue placement must be deliberate.
- Space between panels controls timing, rest, scene changes, and dramatic impact.
- Reduce text where possible. Convert narration into visible action, expression, pose, setting detail, caption, or short bubble.
- Keep smartphone readability in mind: clear silhouettes, readable bubbles, limited crowding.
- Color and background area can carry mood, flashback, time, and atmosphere.
- Long vertical canvases may be planned as one flow, then split into page/upload-sized prompt units.
- Traditional manga/manhua page formats may use page turns and panel grids, but still need clear eye flow.
- Comic dialogue must have distinct character voice, reveal character, move plot, or create tension.
- Speech bubble breaks control reading rhythm. Avoid large text blocks, but do not split so much that readers lose the sentence across scroll distance.
- Read dialogue aloud mentally. Cut or rewrite lines that sound wooden, repeated, or only explain what the art already shows.

## Adaptation Rules

- Preserve novel canon. Do not invent plot changes unless needed as a visual bridge, and mark those bridges.
- One page or vertical-scroll unit should focus on one strong beat, or a short linked sequence of beats.
- Convert internal narration into expression, body language, props, framing, lighting, symbolic background, or short caption.
- Add comic-native dialogue when the light novel source has too little dialogue for a strong page. New lines must respect source intent, character voice, relationship state, world knowledge, and current scene facts.
- Do not ask the user to supply ordinary dialogue when source intent, character voice, and scene facts are enough to infer it. Generate strong candidate dialogue. Ask only when the line would decide new canon, reveal unknown facts, or change character intent.
- Include source chapter(s) for every comic chapter and page.
- Vary visual rhythm: establishing shot, medium shot, close-up, reaction, action panel, object detail, quiet gap.
- Keep dialogue exact when canon matters; otherwise compress lightly for bubble readability.
- Specify bubble placement: top-left, top-right, center, lower panel, beside character, off-panel, caption box, thought bubble.
- Keep continuity: character position, eye-line, object location, injuries, clothing state, lighting, and scene geography.
- Treat pages as one connected scene chain, not disconnected prompt cards. Each page must inherit state from the previous page and hand off state to the next page.
- If continuity needs more pages, add pages instead of compressing or skipping important movement.
- If the scene jumps in time/place/POV, add a visible transition: "Next day," "Three years later," "Elsewhere," "Same night, rooftop," "Meanwhile," or a similar story-fit caption/establishing beat.
- Always mention relevant sheets in prompts: "Use the provided character sheet for [Name]" and similar for settings, objects, NPCs, monsters, races, or props.

## Page Continuity

Every comics plan and page prompt needs continuity logic:
- **Continuity In:** exact state inherited from previous page: location, time, characters present, positions, gaze direction, clothing, injuries, props, mood, unresolved action, and last dialogue beat.
- **Continuity Out:** state created for next page: where characters end, what object moved, who reacts, what line/action remains unresolved.
- **Transition Indicator:** only when a break occurs. Use a caption, establishing shot, time/place card, color/lighting shift, or clear change in environment.
- **Continuous Flow:** when no break occurs, the next page starts from the previous final beat. Do not relaunch the scene as if new.
- **Scene Geography:** keep entrances, exits, left/right position, distance, height, crowd placement, and object locations consistent.
- **Visual Carryover:** maintain clothing state, damage, sweat/tears/blood, lighting, weather, held items, and background layout.
- **Emotional Carryover:** preserve the emotional state and reaction caused by previous page events.
- **Expansion Rule:** if a transition, reaction, movement, or setup would be unclear, add another page or scroll beat rather than skipping it.

## Dialogue Layer

Treat dialogue as a primary comic engine, not leftover prose.

For every planned page, define dialogue beats unless silence is deliberate:
- **Voice:** Which character speaks, and why only that character would say it that way.
- **Function:** Character reveal, plot movement, suspense, relationship/status shift, exposition, humor, or emotional pressure.
- **Bubble Rhythm:** Where lines split into bubbles, where a pause lands, and whether a reaction panel interrupts the speech.
- **Placement:** Bubble position relative to face, gaze, action, and scroll direction.
- **Subtext:** What the character means but does not say directly.
- **Scene Logic:** Whether another character reacts, misses the line, interrupts it, or misunderstands it.

When adding dialogue from sparse prose:
- Use micro-lines, questions, refusals, interruptions, reactions, teasing, commands, or short captions.
- Do not add new facts, promises, lore, powers, clues, or emotional confessions unless source content supports them.
- Avoid dialogue that describes visible art.
- Prefer one idea per bubble.
- Use silence, ellipses, cutoffs, or reaction-only panels only when they create readable tension.
- Keep recap dialogue brief and useful; avoid repeating previous chapter information unless it rewards the next-chapter hook.

### Unheard Dialogue Staging

Never confuse "a character cannot hear this" with "the bubble should be blank."

Use these rules:
- If a line matters, write the actual dialogue in a readable bubble.
- Show that another character missed it through scene staging: distance, turned back, blocked line of sight, crowd noise, a separate panel, no reaction, wrong reaction, or delayed reaction.
- Use muffled, covered, tiny, blurred, or blank bubble treatment only when the words are intentionally hidden as mystery or background texture.
- Whisper can still be readable; show privacy with small bubble, close body language, covered mouth, or background noise.
- Off-panel voice can still include exact text when the words matter.
- Interrupted line can use a readable cutoff such as "Wait, don't--".
- **Background chatter:** can be unreadable texture, but it must not replace important dialogue.
- Do not add meta-notes such as "Reader sees/hears," "Heard by," or "Not heard by" in generated prompt text. Let the scene make that clear.

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
- continuity in, continuity out, and transition indicator when needed
- characters, setting, objects, NPCs, and sheet references
- camera angle, shot scale, composition, lighting, mood, color or black-and-white treatment
- action, expressions, poses, continuity details
- dialogue/captions with bubble placement
- dialogue function and bubble rhythm when it affects page timing
- scene staging for missed, whispered, interrupted, or off-panel dialogue

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
