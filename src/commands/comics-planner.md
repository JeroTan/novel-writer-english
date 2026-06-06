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

Use this public guide as layout reference: https://www.clipstudio.net/how-to-draw/archives/157055

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
- Keep source chapter(s) visible for every comic chapter and page.
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

## Chapter 1: [Comic Chapter Title]

**Source:** `./stories/[novel-name]/content/chapter_00001.md`
**Adaptation Decision:** [same chapter | split from source | merged from sources]
**Target Pages:** [N or flexible]
**Visual Promise:** [Main visual mood and hook]
**Required Sheets:** Characters: [...]; Settings: [...]; Objects: [...]; NPCs: [...]

### Pages

#### Page 1

**Purpose:** [Page function]
**Content:** [Detailed explanation of what appears on the page]
**Panels / Scroll Beats:** [Beat 1] > [Beat 2] > [Beat 3]
**Dialogue / Captions:** [Speaker/bubble/caption notes]
**Layout Notes:** [Panel flow, spacing, phone readability, page turn, or dramatic gap]
**References:** [Source chapter line/scene, sheet names, knowledge files]

#### Page 2

**Purpose:** [...]
**Content:** [...]
**Panels / Scroll Beats:** [...]
**Dialogue / Captions:** [...]
**Layout Notes:** [...]
**References:** [...]
```

### 5. Handoff

After saving, suggest `/comics-task` to create page checklist, then `/comics-chapter-pages-prompt Chapter [N]` to generate page prompt files.
