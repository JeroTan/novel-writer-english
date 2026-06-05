---
name: reviewer
description: "Step 8: Broad quality review command. Reviews project health, cross-chapter consistency, tracking accuracy, and final readiness after chapter-level editing."
tools:
  - "*"
kind: local
argument-hint: "[framework | content | final]"
---

# User Input: $ARGUMENTS

## Objective

Provide broad quality assurance on the user's story planning, written chapters, tracking files, and final readiness. The reviewer is not a line editor. Use `/editor` for one-chapter corrections and prose-level fixes.

## Execution Steps

### 1. Determine Analysis Type

Ask the user if they want:
- **Framework Analysis** — reviewing spec/plan/knowledge before writing starts
- **Content Analysis** — reviewing written chapters marked `[FOR_REVIEW]` after `/editor` has handled chapter-level fixes
- **Final Analysis** — reviewing the whole manuscript and project state before completion or metadata/upload work

### 2. Framework Analysis

- Read `./memory/constitution.md`, `./stories/[novel-name]/specification.md`, and `./stories/[novel-name]/creative-plan.md`.
- Read all files in `./stories/[novel-name]/knowledge/`.
- Read all files in `./stories/[novel-name]/tracking/` if they exist.
- Check for: plot holes, pacing plan gaps, weak motivations, constitution violations, character depth gaps, missing setup/payoff logic, and unresolved planning contradictions.

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
- Cross-chapter consistency (per `consistency-checker` skill): timeline, character behavior, relationship state, world rules
- Chapter readiness: any chapter that still needs `/editor` before approval
- Pacing continuity: pacing tag sequence, tension balance, missing breathers or weak escalation
- Punctuation for emotional effect (per `punctuation-emotional-effect` skill): punctuation supports emotion, rhythm, silence, and intensity without stacking or voice mismatch
- Dialogue and banter health: character voices stay distinct, exposition is carried by conflict or pressure, and humor changes status, emotion, information, tactics, affection, or stakes
- Naming health: major names fit genre, faction, sector, symbolism, pronunciation, glossary records, and existing sound families; important `[TBD]` names are flagged
- Strategic reversal quality when the story uses contests, tactics, bluffs, hidden rules, or clever wins: visible rules are clear, hidden levers are seeded, opponents act believably, wins have cost/aftermath, and reversals match `strategic-reversals.md`
- Tracking accuracy: do the tracking JSONs accurately reflect the chapters written?
- Forgotten elements (per `forgotten-elements` skill): dropped threads, abandoned characters
- Knowledge gaps: are there characters/locations in chapters not documented in `knowledge/`?
- **Glossary consistency**: Are terms, names, and jargon used consistently with the glossary? Are there new terms introduced in chapters that should be added to the glossary?
- Final readiness signals: unresolved tasks, unreviewed chapters, missing metadata, incomplete tracking, or open continuity risks

Do not create a line-edit table. If prose-level or single-chapter edits are needed, cite the chapter and line range briefly and recommend `/editor Chapter [N]`.

### 4. Update Knowledge Files

For each chapter marked `[FOR_REVIEW]`, scan the chapter content for new information that should be recorded in the knowledge files:
- **Characters**: new traits revealed, voice quirks, backstory details, relationships -> update `./stories/[novel-name]/knowledge/character-profiles.md` and `./stories/[novel-name]/knowledge/character-voices.md`
- **Locations**: new places introduced, physical descriptions, atmosphere -> update `./stories/[novel-name]/knowledge/locations.md`
- **World**: new rules, magic/tech systems, cultural details, history -> update `./stories/[novel-name]/knowledge/world-setting.md`
- **Glossary**: new terms, names, jargon, items, or concepts introduced -> add to `./stories/[novel-name]/knowledge/glossary.md` with definition and context
- **Strategic Reversals**: new contest rules, tactics, opponent assumptions, hidden levers, fairness seeds, clever wins, or reversal consequences -> update `./stories/[novel-name]/knowledge/strategic-reversals.md`

This keeps the knowledge files accurate and up-to-date as the story grows. Process chapters incrementally. If Chapter 1 is `[FOR_REVIEW]`, update knowledge from it. Then when Chapter 2 is `[FOR_REVIEW]`, update knowledge again. Never batch all chapters at once.

### 5. Output Report

Output a structured report with sections:
- **Completion Status** (N of M chapters done, tasks: `[FOR_REVIEW]` count, `[DONE]` count)
- **Project Health** (framework, content, tracking, knowledge, glossary)
- **Issues Found** (by category, with chapter/line evidence when useful)
- **Recommended Actions** (prioritized)
- **Editor Handoffs** (chapters that need `/editor`, with short reason)
- **Quality Score** (optional: a 0-10 rating per category)
- **Knowledge Updates** (summary of what was added/modified in knowledge files)

Do NOT rewrite prose or output replacement text. Present findings and wait for user direction.

### 6. Mark as Done

After broad review runs, append a dated entry to `./stories/[novel-name]/tasks.md` under `## Review & Editing Log`.

If the log section does not exist, create it at the bottom of `tasks.md`. If the placeholder `No editor/reviewer entries yet.` exists, remove it.

Use this format:
```markdown
- [YYYY-MM-DD] `/reviewer` Chapter [N or range] — [passed/needs editor/needs knowledge update]; [short result].
```

After broad review passes for a chapter and knowledge files are updated, change its status in `./stories/[novel-name]/tasks.md` from `[FOR_REVIEW]` to `[DONE]`.

Do not mark a chapter `[DONE]` if:
- It has unresolved continuity issues.
- It needs `/editor` for chapter-level fixes.
- Required knowledge or tracking updates cannot be completed.

### 7. Next Steps

Tell the user: "Review complete. Knowledge and tracking checked. Run `/editor Chapter [N]` for any chapter-level fixes, return to `/writer` to continue writing, or run `/utility-meta` if the novel is finished."

## Supplement Skills

These skills enhance this command's output quality. Check if they are available before proceeding:

| Skill | File | Purpose |
|-------|------|---------|
| `consistency-checker` | `[user_agent]/skills/quality-assurance/consistency-checker/SKILL.md` | MANDATORY content consistency check. |
| `forgotten-elements` | `[user_agent]/skills/quality-assurance/forgotten-elements/SKILL.md` | Check for dropped plot threads. |
| `dialogue-techniques` | `[user_agent]/skills/writing-techniques/dialogue-techniques/SKILL.md` | Check subtext, voice distinction, and exposition through conflict. |
| `comedic-banter-rhythm` | `[user_agent]/skills/writing-techniques/comedic-banter-rhythm/SKILL.md` | Check witty banter, comedic escalation, and humor under pressure. |
| `namecraft` | `[user_agent]/skills/writing-techniques/namecraft/SKILL.md` | Check names for genre, faction, symbolism, pronunciation, glossary records, and sound-family consistency. |
| `pacing-rhythm` | `[user_agent]/skills/writing-techniques/pacing-rhythm/SKILL.md` | Check chapter-level pacing tags and manuscript-level tension flow. |
| `punctuation-emotional-effect` | `[user_agent]/skills/writing-techniques/punctuation-emotional-effect/SKILL.md` | Check punctuation supports emotion, rhythm, silence, and intensity without overuse. |
| `strategic-reversal` | `[user_agent]/skills/writing-techniques/strategic-reversal/SKILL.md` | Check contest, tactic, bluff, hidden-rule, and clever-reversal scenes for fair setup and payoff. |
| `genre-knowledge` | `[user_agent]/skills/genre-knowledge/[genre]/SKILL.md` | Load the genre-specific skill matching the novel's genre. Check if the story fulfills genre conventions and reader expectations. |

If any skill file is not found, inform the user:
> "Supplement skills are available to enhance this command. Download them from:
> https://github.com/JeroTan/novel-writer-english.git
> I'll continue without them, but output quality will be reduced."
