---
name: comics-planner
description: "Bonus comics workflow: adapts written novel chapters into manga, manhwa, manhua, or webtoon chapter/page plans."
tools:
  - "*"
kind: local
argument-hint: "[Optional: source chapter range, comic format, target pages, e.g., 'chapters 1-3 as manhwa webtoon']"
---

# User Input: $ARGUMENTS

## Objective

Create `./stories/[novel-name]/comics-plan.md` by adapting novel chapters from `./stories/[novel-name]/content/` into comic chapters and page-level visual beats.

This command processes existing novel content only. It may split one novel chapter into multiple comic chapters, merge multiple novel chapters into one comic chapter, or adjust page count when visual pacing demands it.

## Execution Steps

### 1. Read Context

Read:
- `./memory/constitution.md`
- `./stories/[novel-name]/specification.md`
- `./stories/[novel-name]/creative-plan.md`
- `./stories/[novel-name]/tasks.md`
- relevant files in `./stories/[novel-name]/knowledge/`
- relevant files in `./stories/[novel-name]/tracking/`
- selected source chapters in `./stories/[novel-name]/content/`

If `$ARGUMENTS` names chapter(s), use those. Otherwise, ask which chapter(s) to adapt.

Load `[user_agent]/skills/writing-techniques/comics-prompting/SKILL.md` when available.
Read `./stories/[novel-name]/knowledge/character-voices.md` for every speaking character.

Use this public guide as layout reference: https://www.clipstudio.net/how-to-draw/archives/157055
Use this dialogue advice reference: https://www.reddit.com/r/WebtoonCanvas/comments/1k8r83q/can_anyone_give_me_some_advice_on_writing/

### 2. Confirm Format

Identify or ask:
- comic style: manga, manhwa/webtoon, manhua, or hybrid
- target: page count, vertical-scroll units, or flexible
- source chapter range
- whether sheet prompts already exist under `./stories/[novel-name]/sheets/`

### 3. Adapt Story

Rules:
- Preserve novel canon.
- Do not rewrite prose into final page prompts yet. This command creates the page plan only.
- Convert narration into visible beats: action, expression, pose, framing, object detail, setting detail, caption, or dialogue bubble.
- Treat dialogue as the heart of the comic adaptation. Every page should include a dialogue layer unless deliberate silence works better.
- If the light novel source has little dialogue, add comic-native dialogue that respects the source idea, character voice, relationship state, and scene facts. Do not add new canon facts.
- Do not ask the user to write ordinary dialogue when source intent, character voice, and scene facts are enough. Infer strong candidate lines. Ask only if the line would decide new canon, reveal unknown facts, or change character intent.
- Every dialogue line must reveal character, move plot, create suspense, shift relationship/status, deliver needed exposition, or sharpen emotional pressure.
- Plan bubble rhythm: short bubbles, one idea per bubble, meaningful pauses, reaction interruptions, and no large text blocks.
- If one character does not hear a line, keep important dialogue readable and show the missed line through scene staging: distance, no reaction, blocked view, crowd noise, separate panel, or wrong reaction. Do not add meta-notes explaining who hears what.
- Keep source chapter(s) visible for every comic chapter and page.
- Treat pages as a connected chapter flow. Every page must inherit state from the previous page and hand off state to the next page.
- If a scene continues, start the next page from the previous final beat with matching location, time, character positions, clothing state, injuries, props, lighting, mood, and unresolved action/dialogue.
- If a scene jumps in time/place/POV, add a clear transition indicator such as "Next day," "Few years later," "Elsewhere," "Meanwhile," "Same night," a location caption, or an establishing transition panel.
- If continuity would break because the adaptation is too compressed, add more pages or scroll beats. Page count is flexible when scene consistency needs room.
- Use vertical spacing, panel rhythm, and dialogue placement deliberately for webtoon/manhwa.
- For manga/manhua, keep page-turn rhythm, panel flow, and bubble readability clear.
- Identify needed sheet references: characters, settings, objects, NPCs, monsters, race sheets.

### 4. Output Format

Save to `./stories/[novel-name]/comics-plan.md`.

Use this structure:

```markdown
# Comics Plan — [Novel Name]

**Definition:** [What this comics plan covers]
**Created:** [YYYY-MM-DD]
**Updated:** [YYYY-MM-DD]
**Comic Format:** [Manga | Manhwa/Webtoon | Manhua | Hybrid]
**Source Chapters:** [Novel chapter files or range]
**Layout Guidance Source:** Clip Studio Paint Art Rocket — https://www.clipstudio.net/how-to-draw/archives/157055

## Adaptation Principles

- [Canon preservation rule]
- [Panel/page rhythm rule]
- [Dialogue and sheet reference rule]
- [Dialogue voice/rhythm rule]
- [Unheard dialogue staging rule]
- [Page continuity and transition rule]

## Chapter 1: [Comic Chapter Title]

**Source:** `./stories/[novel-name]/content/chapter_00001.md`
**Adaptation Decision:** [same chapter | split from source | merged from sources]
**Target Pages:** [N or flexible]
**Visual Promise:** [Main visual mood and hook]
**Continuity Spine:** [How pages flow from opening state to final state; major scene breaks and transitions]
**Required Sheets:** Characters: [...]; Settings: [...]; Objects: [...]; NPCs: [...]

### Pages

#### Page 1

**Purpose:** [Page function]
**Content:** [Detailed explanation of what appears on the page]
**Continuity In:** [State inherited from previous page: place, time, positions, props, clothing/injury state, mood, unresolved beat]
**Panels / Scroll Beats:** [Beat 1] > [Beat 2] > [Beat 3]
**Dialogue Layer:** [Speaker lines, captions, thoughts, subtext, why each line belongs, and any missed/whispered/interrupted line]
**Bubble Rhythm / Placement:** [Bubble splits, pauses, reaction interruptions, positions, and scene staging that shows who misses or reacts to a line]
**Transition Indicator:** [N/A if continuous; otherwise exact caption/establishing beat such as "Next day" or "Elsewhere"]
**Continuity Out:** [State handed to next page: ending position, props moved, emotional state, unresolved line/action]
**Layout Notes:** [Panel flow, spacing, phone readability, page turn, or dramatic gap]
**References:** [Source chapter line/scene, sheet names, knowledge files]

#### Page 2

**Purpose:** [...]
**Content:** [...]
**Continuity In:** [...]
**Panels / Scroll Beats:** [...]
**Dialogue Layer:** [...]
**Bubble Rhythm / Placement:** [...]
**Transition Indicator:** [...]
**Continuity Out:** [...]
**Layout Notes:** [...]
**References:** [...]
```

### 5. Handoff

After saving, suggest `/comics-task` to create page checklist, then `/comics-chapter-pages-prompt Chapter [N]` to generate page prompt files.
