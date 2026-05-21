---
name: reviewer
description: "Step 7: Quality analysis command. Runs framework or content analysis to ensure consistency and compliance with the constitution."
tools:
  - "*"
kind: local
argument-hint: "[framework | content]"
---

# User Input: $ARGUMENTS

## Objective

Provide rigorous quality assurance on the user's story planning (framework) or execution (content).

## Execution Steps

### 1. Determine Analysis Type

Ask the user if they want:
- **Framework Analysis** — reviewing spec/plan/knowledge before writing starts
- **Content Analysis** — reviewing written chapters marked `[FOR_REVIEW]`

### 2. Framework Analysis

- Read `./memory/constitution.md`, `./stories/[novel-name]/specification.md`, `./stories/[novel-name]/creative-plan.md`.
- Read all files in `./stories/[novel-name]/knowledge/`.
- Check for: plot holes, pacing issues, weak motivations, constitution violations, character depth gaps.

### 3. Content Analysis

Read ALL of the following before generating the report:
- `./memory/constitution.md`
- `./stories/[novel-name]/specification.md`
- `./stories/[novel-name]/creative-plan.md`
- `./stories/[novel-name]/tasks.md` (identify chapters marked `[FOR_REVIEW]`)
- All files in `./stories/[novel-name]/knowledge/` (including `glossary.md`)
- All files in `./stories/[novel-name]/tracking/`
- All chapter files in `./stories/[novel-name]/content/`

Then verify:
- Constitution compliance
- Specification fulfillment
- Plan compliance (chapter pacing tags, chapter goals met)
- Tasks completion (how many `[FOR_REVIEW]` vs `[DONE]` vs `[ ]`)
- Internal consistency (per `consistency-checker` skill): timeline, character behavior, world rules
- Emotional depth (per `emotional-interiority` skill): internal reactions, no report-style narration
- Pacing quality (per `pacing-rhythm` skill): fragment overuse, pacing tag compliance
- Tracking accuracy: do the tracking JSONs accurately reflect the chapters written?
- Forgotten elements (per `forgotten-elements` skill): dropped threads, abandoned characters
- Knowledge gaps: are there characters/locations in chapters not documented in `knowledge/`?
- **Glossary consistency**: Are terms, names, and jargon used consistently with the glossary? Are there new terms introduced in chapters that should be added to the glossary?

### 4. Update Knowledge Files

For each chapter marked `[FOR_REVIEW]`, scan the chapter content for new information that should be recorded in the knowledge files:
- **Characters**: new traits revealed, voice quirks, backstory details, relationships → update `./stories/[novel-name]/knowledge/character-profiles.md` and `./stories/[novel-name]/knowledge/character-voices.md`
- **Locations**: new places introduced, physical descriptions, atmosphere → update `./stories/[novel-name]/knowledge/locations.md`
- **World**: new rules, magic/tech systems, cultural details, history → update `./stories/[novel-name]/knowledge/world-setting.md`
- **Glossary**: new terms, names, jargon, items, or concepts introduced → add to `./stories/[novel-name]/knowledge/glossary.md` with definition and context

This keeps the knowledge files accurate and up-to-date as the story grows. Process chapters incrementally — if Chapter 1 is `[FOR_REVIEW]`, update knowledge from it. Then when Chapter 2 is `[FOR_REVIEW]`, update knowledge again. Never batch all chapters at once.

### 5. Output Report

Output a structured report with sections:
- **Completion Status** (N of M chapters done, tasks: `[FOR_REVIEW]` count, `[DONE]` count)
- **Issues Found** (by category, specific references to chapter and line)
- **Recommended Actions** (prioritized)
- **Quality Score** (optional: a 0–10 rating per category)
- **Knowledge Updates** (summary of what was added/modified in knowledge files)

Do NOT auto-rewrite. Present findings and wait for user direction.

### 6. Mark as Done

After reviewing a chapter and updating the knowledge files, change its status in `./stories/[novel-name]/tasks.md` from `[FOR_REVIEW]` to `[DONE]`.

### 7. Next Steps

Tell the user: "Review complete. Knowledge files updated. Return to `/writer` to continue writing, or run `/utility-meta` to record novel metadata if the novel is finished."

## Supplement Skills

These skills enhance this command's output quality. Check if they are available before proceeding:

| Skill | File | Purpose |
|-------|------|---------|
| `consistency-checker` | `[user_agent]/skills/quality-assurance/consistency-checker/SKILL.md` | MANDATORY content consistency check. |
| `forgotten-elements` | `[user_agent]/skills/quality-assurance/forgotten-elements/SKILL.md` | Check for dropped plot threads. |
| `emotional-interiority` | `[user_agent]/skills/writing-techniques/emotional-interiority/SKILL.md` | Flag report-style narration. |
| `pacing-rhythm` | `[user_agent]/skills/writing-techniques/pacing-rhythm/SKILL.md` | Flag fragment overuse, flag wrong pacing. |
| `genre-knowledge` | `[user_agent]/skills/genre-knowledge/[genre]/SKILL.md` | Load the genre-specific skill matching the novel's genre. Check if the story fulfills genre conventions and reader expectations. |

If any skill file is not found, inform the user:
> "Supplement skills are available to enhance this command. Download them from:
> https://github.com/JeroTan/novel-writer-english.git
> I'll continue without them, but output quality will be reduced."
