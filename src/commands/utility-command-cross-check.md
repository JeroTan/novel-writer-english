---
name: utility-command-cross-check
description: "Cross-check a project file created by a workflow command against the current command instructions and suggest revisions when the file format is stale."
tools:
  - "*"
kind: local
argument-hint: "[command name, e.g. planner | writer | utility-meta]"
---

# User Input: $ARGUMENTS

## Objective

Check whether an existing project file created by a workflow command still follows the current command instructions. Use this when the package workflow has changed and the user's novel files may need format updates.

## Execution Steps

### 1. Choose Command And Target

Ask which command to cross-check if `$ARGUMENTS` does not name one.

Accept command names with or without leading slash:
- `planner`
- `/planner`
- `writer chapter 3`
- `comics-planner`
- `/utility-character-sheets-prompt`
- `/utility-meta`

Normalize the command name by removing the leading slash.

If multiple novels exist under `./stories/`, ask which novel to use.

If the command creates or updates multiple files, ask which file or range to check unless the user already specified it.

### 2. Identify Current Expected Format

Use the current workflow instruction for the named command as the source of truth.

If running from the package repository, you may read:
- `src/commands/[command].md`

When the command uses templates, also read the relevant template:
- `[user_agent]/templates/**`
- `src/templates/**` if running from the package repository

If the package repository is not available, infer the expected format from the active command or skill instruction already available in the user's assistant environment.

### 3. Find Project Files Created By That Command

Use this target map:

- `/constitution` -> `./memory/constitution.md`
- `/specify` -> `./stories/[novel-name]/specification.md` and `./stories/[novel-name]/knowledge/`
- `/clarify` -> `./stories/[novel-name]/specification.md` and any updated files in `./stories/[novel-name]/knowledge/`
- `/planner` -> `./stories/[novel-name]/creative-plan.md` and `./stories/[novel-name]/tracking/`
- `/task-manager` -> `./stories/[novel-name]/tasks.md`
- `/writer` -> selected chapter file(s) in `./stories/[novel-name]/content/`
- `/editor` -> selected chapter file(s) in `./stories/[novel-name]/content/`
- `/reviewer` -> `./stories/[novel-name]/tasks.md`, `./stories/[novel-name]/knowledge/`, `./stories/[novel-name]/tracking/`, and reviewed chapter files when relevant
- `/utility-meta` -> `./stories/[novel-name]/meta.json`
- `/utility-track-init` and `/utility-track` -> files in `./stories/[novel-name]/tracking/`
- `/utility-timeline` -> `./stories/[novel-name]/tracking/timeline.json`
- `/utility-relations` -> `./stories/[novel-name]/tracking/relationships.json`
- `/comics-planner` -> `./stories/[novel-name]/comics-plan.md`
- `/comics-task` -> `./stories/[novel-name]/comics-task.md`
- `/comics-chapter-pages-prompt` -> selected page prompt file(s) in `./stories/[novel-name]/comic/`
- `/comics-revise-prompt` -> selected revised prompt file(s) in `./stories/[novel-name]/comic/` or `./stories/[novel-name]/sheets/`
- `/utility-character-sheets-prompt` -> selected file(s) in `./stories/[novel-name]/sheets/characters/`
- `/utility-settings-sheets-prompt` -> selected file(s) in `./stories/[novel-name]/sheets/place/`
- `/utility-object-sheets-prompt` -> selected file(s) in `./stories/[novel-name]/sheets/object/`
- `/utility-npc-sheets-prompt` -> selected file(s) in `./stories/[novel-name]/sheets/npc/`

For utilities that do not create a persistent file by default, explain that there is no standard project file to cross-check and ask the user for a specific file if needed.

### 4. Compare File Format

Compare the project file against the current command's required output shape:
- Required headings and section order
- Required metadata fields
- Required status markers, pacing tags, tables, or lists
- Required JSON keys and nesting
- File naming conventions
- Required side-effect files, such as `knowledge/` or `tracking/`
- Newer workflow additions that older files may miss

Do not treat story-specific content differences as stale format. Only flag content when it conflicts with the command's structural requirements or required workflow state.

For `/specify`, specifically check whether `specification.md` uses the current lean format:
- Contains Definition, Logline, Core Premise, Core Purpose, Story Promise, Core Cast Snapshot, World Snapshot, Knowledge Map, and Open Clarifications when needed
- Keeps character, world, location, faction, magic/technology, glossary, strategic reversal, and voice details brief in the specification
- Uses the Knowledge Map to point to `./knowledge/character-profiles.md`, `./knowledge/character-voices.md`, `./knowledge/locations.md`, `./knowledge/world-setting.md`, `./knowledge/glossary.md`, and `./knowledge/strategic-reversals.md`
- Does not use an old "Full Specification" section as the home for all detailed canon
- Has `./stories/[novel-name]/knowledge/` with `character-profiles.md`, `character-voices.md`, `locations.md`, `world-setting.md`, `glossary.md`, and `strategic-reversals.md`
- `character-voices.md` includes Banter Role, Exposition Role, Humor Style, Pressure Response, and Status Behavior fields
- Important names still marked `[TBD]`, `[TENTATIVE]`, unnamed, or generic are documented as unresolved rather than silently invented

For `/planner`, specifically check whether `creative-plan.md` uses the current format:
- Definition, created date, updated date, current saga/arc position, and planning mode
- Nested `Saga -> Arc -> Chapters` hierarchy, or `Arc -> Chapters` when there is no saga
- Structural Approach
- Pacing & Tension as compact bullets that list chapter(s)
- Any required section or field may use `[N/A] — [brief reason]` if truly not applicable
- Strategic Reversal / Contest Design as a concise arc section, using `[N/A] — [brief reason]` when not applicable
- Foreshadowing Plan
- Character Arc Mapping
- Chapter headings nested under the active arc with pacing tag
- Chapter Summary, Flow, and Continuity Notes
- Unnamed important arcs, factions, places, systems, abilities, artifacts, and concepts use `[TBD]` or `[TENTATIVE]`, or include name options when the user asked for naming help
- Batch plan sections with Adds To and Definition

For `/task-manager`, specifically check whether `tasks.md` uses the current format:
- Header has total chapters planned, chapters written, and last updated
- No estimated total words, per-chapter word estimates, or effort estimates
- Tasks preserve the planner's `Saga -> Arc -> Chapter` order, or `Arc -> Chapter` when there is no saga
- Chapter tasks are one-line task-management entries: `- [ ] **Chapter [N]: [Title]** — brief chapter explanation`
- Chapter tasks do not duplicate planner Summary, Flow, Pacing & Tension, Foreshadowing, Character Arc Mapping, or Continuity Notes
- Batch sections include `Adds To`
- Status markers are `[ ]`, `[FOR_REVIEW]`, and `[DONE]`
- Contains `## Review & Editing Log`, initially `No editor/reviewer entries yet.` or populated by `/editor` and `/reviewer`
- Does not create separate character profile, worldbuilding, review, or editing task items

For `/utility-meta`, specifically check whether `meta.json` uses the current format:
- Required keys exist: `title`, `author`, `description`, `status`, `genre`, `tags`, `work-type`, `language`, `publishedAt`, and `updatedAt`
- `status` is one of `ongoing`, `completed`, or `hiatus`
- `genre`, `tags`, and `work-type` are arrays even when they contain one value
- `genre` values use the allowed display spelling: `Action`, `Adventure`, `Comedy`, `Contemporary`, `Drama`, `Fantasy`, `Historical`, `Horror`, `Mystery`, `Psychological`, `Romance`, `Satire`, `Sci-fi`, `Short Story`, `Thriller`, `Tragedy`
- `work-type` values use the allowed display spelling: `Original Ideas`, `Original Work`, `Doujin`, `AI Assisted`, `AI-generated`
- `tags` values use the allowed Royal Road-style display spelling from `/utility-meta`
- Dates use `YYYY-MM-DD`

For `/comics-planner`, specifically check whether `comics-plan.md` uses the current format:
- Header has Definition, Created, Updated, Comic Format, Source Chapters, and Layout Guidance Source
- Contains Adaptation Principles
- Comic chapters identify Source, Adaptation Decision, Target Pages, Visual Promise, Continuity Spine, and Required Sheets
- Each page has Purpose, Content, Continuity In, Panels / Scroll Beats, Dialogue Layer, Bubble Rhythm / Placement, Transition Indicator, Continuity Out, Layout Notes, and References
- Source novel chapters are visible for every comic chapter/page
- Continuous pages inherit previous page state: location, time, character positions, clothing/injury state, props, lighting, mood, and unresolved action/dialogue
- Discontinuous pages include a visible transition indicator, such as "Next day," "Few years later," "Elsewhere," "Meanwhile," a location caption, or an establishing beat
- Dialogue Layer shows speaker lines, captions/thoughts, subtext, and line purpose; sparse source prose may add faithful comic-native dialogue without new canon facts
- Bubble Rhythm / Placement uses scene staging to show missed, whispered, interrupted, or off-panel lines without explicit meta-notes about who hears what

For `/comics-task`, specifically check whether `comics-task.md` uses the current format:
- Header has Created, Updated, and Source Plan
- Uses chapter sections with page checklist entries
- Each page task has a compact Continuity note: opening state, continues from Page N, transition label, or handoff
- Page status markers are `[ ]`, `[PROMPTED]`, `[REVISED]`, and `[DONE]`
- Contains Sheet Tasks and Revision Log

For `/comics-chapter-pages-prompt`, specifically check whether page prompt files use the current format:
- Frontmatter includes novel, comic_chapter, page, source_chapters, created, updated, and prompt_type
- Headline follows `# Chapter [N] Page [N] — [Prompt Headline]`
- Body is clean prompt text, not a table
- Prompt includes sheet references, page/panel or scroll beats, dialogue/caption text, bubble rhythm and placement, scene staging for missed/whispered/interrupted lines, camera/framing, mood, continuity in/out, and transition indicator only when needed
- Prompt matches previous page Continuity Out and next page Continuity In when those exist
- Prompt adds or recommends a bridging page when compression would break scene flow
- Prompt uses dialogue unless deliberate silence is stronger and explained
- Prompt does not use blank/tiny/muffled/indistinct bubbles for important dialogue unless the words are intentionally hidden for mystery or background texture
- Prompt does not include explicit meta-notes such as "Reader sees/hears," "Heard by," or "Not heard by"

For sheet prompt utilities, specifically check whether files use the current format:
- Frontmatter includes novel, sheet_type, subject, created, updated, and prompt_type
- One headline identifies sheet type and subject
- Body is clean prompt text, not a table
- Character sheets include labeled front/side/back views, expressions, and detail callouts
- Setting sheets include key angles, landmarks, scale, lighting, mood, materials, and continuity notes
- Object sheets include multiple views, functional details, materials, scale, variants, and continuity notes
- NPC/general sheets include front/side/back views, variants, anatomy/silhouette, outfit/equipment, behavior, palette, and continuity notes

### 5. Output Report

Output:

```markdown
# Command Output Cross-Check: /[command]

| File | Status | Notes |
|------|--------|-------|
| [path] | current | Matches current command format |
| [path] | revise | Missing chapter Flow and compact pacing list |

## Recommended Revisions

1. [Concrete format update]
2. [Concrete format update]
```

Status values:
- `current` — no meaningful format update needed
- `revise` — file exists but uses an older or incomplete workflow format
- `missing` — expected file or side-effect file not found

### 6. Revision Guidance

If a file is stale, suggest revising it before continuing that workflow command.

Do not overwrite automatically unless the user explicitly asks.

If the user asks to revise:
- Preserve the user's story facts, prose, decisions, and custom notes.
- Knowledge files are the canonical rich-detail store. When updating format, preserve existing detail and only restructure, relabel, or add missing fields.
- Only restructure, relabel, or add missing required sections.
- Mark unknown values as `[TBD]`, `[TENTATIVE]`, or `[Needs User Input]`.
- For JSON files, preserve existing IDs and values unless a key is required by the current template.
