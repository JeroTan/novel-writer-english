---
name: novel-writer-english
description: "Use when user starts a novel project, asks how to organize their writing, or wants help with any aspect of fiction writing. Provides the eight-step methodology for systematic novel creation, project file conventions, and knowledge of how the sub-skills, templates, and tracking systems fit together."
---

# Novel Writer — Eight-Step Methodology Reference

This skill contains the core knowledge of a proven eight-step methodology for writing novels with AI assistance. It covers the workflow structure, project file conventions, and how the companion sub-skills relate to each step.

## The Eight Steps

| Step | Name | Purpose | Output File |
|------|------|---------|-------------|
| 1 | Constitution | Define creative principles and non-negotiables | `memory/constitution.md` |
| 2 | Specify | Build a lean story specification and knowledge map | `stories/[name]/specification.md` or split `specification/` |
| 3 | Clarify | Resolve ambiguities in the specification | Updated spec file or shard |
| 4 | Plan | Design chapter structure, pacing, foreshadowing, arcs | `stories/[name]/creative-plan.md` or split `creative-plan/` |
| 5 | Tasks | Break the plan into prioritized, dependency-tracked tasks | `stories/[name]/tasks.md` or split `tasks/` |
| 6 | Write | Draft chapters using the pre-write checklist | `stories/[name]/content/chapter-XX.md` |
| 7 | Edit | Review one chapter, propose line-level fixes, approve/skip items, apply approved edits after confirmation | Updated chapter |
| 8 | Review | Run broad QA on framework, cross-chapter continuity, tracking, knowledge, and final readiness | Review report |

## Project File Structure

A novel project using this methodology usually maintains these files:

```
project-root/
├── stories/
│   └── [novel-name]/
│       ├── specification.md     ← Step 2 output
│       ├── creative-plan.md     ← Step 4 output
│       ├── tasks.md             ← Step 5 output (checkbox checklist)
│       ├── comics-plan.md       ← optional comics adaptation plan
│       ├── comics-task.md       ← optional comics prompt checklist
│       ├── meta.json            ← optional `/utility-meta` output
│       ├── knowledge/           ← Created by Step 2
│       │   ├── character-profiles.md
│       │   ├── character-voices.md
│       │   ├── glossary.md
│       │   ├── locations.md
│       │   ├── strategic-reversals.md
│       │   └── world-setting.md
│       ├── tracking/            ← Created by Step 4
│       │   ├── character-state.json
│       │   ├── plot-tracker.json
│       │   ├── relationships.json
│       │   ├── timeline.json
│       │   └── validation-rules.json
│       ├── content/
│       │   ├── chapter_00001.md   ← Step 6 output
│       │   └── chapter_00001.notes.md  ← optional draft deviation notes
│       ├── comic/               ← optional comics page prompts
│       │   └── chapter_0001/
│       │       └── ch_0001_page_001.md
│       └── sheets/              ← optional visual reference sheet prompts
│           ├── characters/
│           ├── place/
│           ├── object/
│           └── npc/
├── draft/                       ← optional user-provided drafts
│   └── chapters/
│       └── 0001.md
├── memory/
│   ├── constitution.md          ← Step 1 output
│   └── personal-voice.md        ← optional voice reference
├── templates/                   ← bundled templates for tracking and knowledge
└── knowledge-base/              ← genre, style, and requirement references
```

## Large Document Split Mode

When `specification.md`, `creative-plan.md`, or `tasks.md` grows past about 500 lines, keep the root `.md` as a short index and move details into a matching folder:

- `specification.md` -> `specification/_main.md` plus shards such as `core.md`, `cast.md`, `world.md`, and `plot.md`.
- `creative-plan.md` -> `creative-plan/_main.md` plus shards such as `saga_0001.md`, `saga_0001_arc_0001.md`, and `ch_00001-00005.md`.
- `tasks.md` -> `tasks/_main.md` plus task shards and optional `tasks/review-editing-log.md`.

Read `_main.md` first, then only relevant shard(s). Keep every active file or shard below about 500 lines; split again by saga, arc, batch, or chapter range when needed.

## Step Details

### Step 1: Constitution
Establishes the creative rules all subsequent work must follow.

**Covers**: core values (theme/message), quality baseline (non-negotiables), style principles (language, pacing, atmosphere), content principles (character, plot, worldbuilding norms). *Note: This step now also captures pacing preference and character psychology depth.*

**Why it matters**: Prevents creative drift over long projects. Every decision references this document.

### Step 2: Specify
Creates a lean story specification using progressive detail levels. The specification captures core purpose, premise, story promise, and a knowledge map; detailed canon lives in `stories/[novel-name]/knowledge/`. If the specification grows too large, use split mode: `specification.md` stays a short index, `specification/_main.md` maps shards, and details live in focused shard files.

**Levels**: Logline (one sentence) -> Core Premise (paragraph: protagonist, goal, conflict, stakes) -> Story Promise (core purpose, conflict, themes, audience, success criteria) -> Knowledge Map (pointers to character profiles, voices, locations, world-setting, glossary, and strategic reversals). *Note: Major characters keep only snapshots in the specification; full details go in `stories/[novel-name]/knowledge/`.*

**Markers**: `[Needs Clarification]` for vague points, `[Core Requirement]` for non-negotiables, `[Optional Feature]` for nice-to-haves.

### Step 3: Clarify
Identifies up to 5 ambiguities in the specification and resolves them through targeted questions. Resolved markers are removed from the specification. *Note: Clarification now reads the `knowledge/` folder for additional context.*

### Step 4: Plan
Turns the specification into a concrete implementation plan: chapter breakdown, pacing/tension distribution, foreshadowing setup, and character arc mapping. Large plans use split mode: `creative-plan.md` stays a short index, `creative-plan/_main.md` maps saga/arc/batch shards, and chapter details live in focused files. *Note: Every chapter gets a pacing tag based on the constitution's pacing strategy. This step initializes `stories/[novel-name]/tracking/` from templates.*

### Step 5: Tasks
Breaks the plan into actionable one-line chapter tasks with markers: `[P]` (parallel), `[Dep:X]` (depends on task X), `[High Priority]`. Large task ledgers use split mode: `tasks.md` stays a short dashboard, `tasks/_main.md` tracks progress and shard map, and chapter tasks live in saga/arc/batch shards. *Note: Tasks mirror the planner's saga/arc/chapter hierarchy and do not repeat planner details or word-count estimates.*

### Step 6: Write
Drafts chapters one at a time. **The pre-write checklist must be followed before every chapter** — this is the key mechanism that prevents AI context degradation over long manuscripts. The expanded 13-item checklist reloads the constitution, specification, plan, character context, and previous chapter before generating new text, ensuring emotional goals, pacing verification, and internal reactions are covered. *Note: Features write mode selection, draft detection, draft tags, and chapter output format with a mini summary.*

### Step 7: Edit
Runs after `/writer` and before `/reviewer`. The editor checks one chapter at a time, shows a selectable reference checklist, outputs a numbered list of line-specific suggested changes, and tracks each item as `approve`, `skip`, or `for_discussion`. It applies nothing until all items are resolved and the user confirms.

**Run frequency**: After each chapter that needs refinement, or whenever the user wants to double-check a specific chapter.

### Step 8: Review
Runs broad project QA after chapter-level edits. Two main modes: **Framework Analysis** (validates planning documents before writing) and **Content/Final Analysis** (validates written chapters against constitution, specification, plan, tracking, knowledge, and internal consistency). It can recommend `/editor Chapter [N]` for line-level fixes, but it does not rewrite prose.

**Run frequency**: After chapter edits, after the first 3 chapters, every 5 chapters, and after completing the full draft.

### Utility: Meta
Records the novel's bibliographic metadata. `/utility-meta` creates or updates `stories/[novel-name]/meta.json` with title, author, description, allowed genre values, Royal Road-style tags, `work-type`, status (ongoing/completed/hiatus), language, and publication dates.

### Bonus: Comics Prompt Workflow
After novel chapters exist, `/comics-planner` can adapt them into manga, manhwa, manhua, or webtoon chapter/page plans. `/comics-task` creates page checklist tracking. `/comics-chapter-pages-prompt` creates clean page prompt files. `/comics-revise-prompt` revises page or sheet prompts. Sheet utilities create character, setting/place, object, and NPC/general reference sheet prompts.

## Companion Sub-Skills

These skills activate automatically based on context when installed:

| Skill | Activates when... |
|-------|-------------------|
| `pre-write-checklist` | Writing a chapter — ensures context is loaded |
| `consistency-checker` | Reviewing or analyzing text — catches contradictions |
| `forgotten-elements` | Analyzing chapters — finds dropped plot threads |
| `style-detector` | User specifies a prose style — enforces style rules |
| `setting-detector` | User describes a setting — loads location knowledge |
| `requirement-detector` | User states preferences — maps to requirement guides |
| `getting-started` | User is stuck or facing blank-page syndrome |
| `workflow-guide` | User asks about the process or which step to do next |
| `genre-knowledge/*` | User mentions a genre — loads tropes, conventions, pitfalls |
| `dialogue-techniques` | Writing dialogue — provides subtext, voice, pacing rules |
| `comedic-banter-rhythm` | Writing, editing, or reviewing witty banter, comedic escalation, argument exposition, or humor under pressure |
| `comics-prompting` | Adapting novel chapters into manga, manhwa, manhua, webtoon, comic page prompts, revision prompts, or visual reference sheets |
| `namecraft` | Naming characters, factions, places, titles, abilities, systems, artifacts, arcs, concepts, or unresolved TBD proper nouns |
| `punctuation-emotional-effect` | Writing, editing, or reviewing emotional punctuation — controls punctuation intensity, silence, hesitation, interruption, and emphasis |
| `scene-structure` | Writing a scene — provides beat structure and pacing guidance |
| `strategic-reversal` | Planning, writing, editing, or reviewing contests, tactics, bluffs, hidden rules, clever wins, or fair reversals |

### Sub-Skill Locations

**Quality Assurance** (`skills/quality-assurance/`):

| File | Skill Name | Description |
|------|-----------|-------------|
| `skills/quality-assurance/pre-write-checklist/SKILL.md` | `pre-write-checklist` | Ensures the AI loads constitution, spec, plan, and character context before every chapter |
| `skills/quality-assurance/consistency-checker/SKILL.md` | `consistency-checker` | Checks for plot holes, character inconsistencies, timeline errors, constitution violations |
| `skills/quality-assurance/forgotten-elements/SKILL.md` | `forgotten-elements` | Identifies dropped plot threads and forgotten characters or items |
| `skills/quality-assurance/style-detector/SKILL.md` | `style-detector` | Detects the requested writing style and enforces it |
| `skills/quality-assurance/setting-detector/SKILL.md` | `setting-detector` | Detects the genre setting and loads the appropriate knowledge base |
| `skills/quality-assurance/requirement-detector/SKILL.md` | `requirement-detector` | Detects and enforces specific plot or content requirements (e.g., fast-paced, high emotion) |
| `skills/quality-assurance/getting-started/SKILL.md` | `getting-started` | Helps users overcome blank page syndrome with prompts and hooks |
| `skills/quality-assurance/workflow-guide/SKILL.md` | `workflow-guide` | Provides the eight-step methodology overview and step navigation |

**Genre Knowledge** (`skills/genre-knowledge/`):

| File | Skill Name | Description |
|------|-----------|-------------|
| `skills/genre-knowledge/fantasy/SKILL.md` | `genre-knowledge-fantasy` | Magic systems, worldbuilding, fantasy tropes and conventions |
| `skills/genre-knowledge/romance/SKILL.md` | `genre-knowledge-romance` | Romance arcs, tropes, emotional beats, HEA/HFN structures |
| `skills/genre-knowledge/thriller/SKILL.md` | `genre-knowledge-thriller` | Suspense mechanics, pacing, stakes escalation, misdirection |
| `skills/genre-knowledge/horror/SKILL.md` | `genre-knowledge-horror` | Dread, atmosphere, fear mechanics, horror subgenres |
| `skills/genre-knowledge/mystery/SKILL.md` | `genre-knowledge-mystery` | Clue planting, red herrings, fair-play rules, reveal structure |
| `skills/genre-knowledge/scifi/SKILL.md` | `genre-knowledge-scifi` | Speculative worldbuilding, technology consistency, hard vs soft sci-fi |

**Writing Techniques** (`skills/writing-techniques/`):

| File | Skill Name | Description |
|------|-----------|-------------|
| `skills/writing-techniques/dialogue-techniques/SKILL.md` | `dialogue-techniques` | Subtext-heavy, distinctive, character-driven dialogue |
| `skills/writing-techniques/comedic-banter-rhythm/SKILL.md` | `comedic-banter-rhythm` | Witty banter, comedic escalation, argument-driven exposition, and humor under pressure |
| `skills/writing-techniques/comics-prompting/SKILL.md` | `comics-prompting` | Manga, manhwa, manhua, webtoon, comic page, revision, and visual reference sheet prompting |
| `skills/writing-techniques/namecraft/SKILL.md` | `namecraft` | Names for characters, factions, places, titles, abilities, systems, artifacts, arcs, and concepts |
| `skills/writing-techniques/scene-structure/SKILL.md` | `scene-structure` | Scene/sequel framework (Goal, Conflict, Disaster, Reaction, Dilemma, Decision) |
| `skills/writing-techniques/character-depth/SKILL.md` | `character-depth` | Psychological backstory, Wound/Ghost, internal contradictions, defense mechanisms |
| `skills/writing-techniques/emotional-interiority/SKILL.md` | `emotional-interiority` | Internal reactions, sensory-emotional responses, flags report-style narration |
| `skills/writing-techniques/pacing-rhythm/SKILL.md` | `pacing-rhythm` | Pacing archetypes, sentence-level pacing, fragment detection, chapter pacing tags |
| `skills/writing-techniques/punctuation-emotional-effect/SKILL.md` | `punctuation-emotional-effect` | Punctuation for emotion, rhythm, silence, hesitation, interruption, intensity, and emphasis |
| `skills/writing-techniques/strategic-reversal/SKILL.md` | `strategic-reversal` | Contest, tactic, bluff, hidden-rule, clever-win, and strategic reversal scene design |

## Specification Markers Reference

| Marker | Meaning |
|--------|---------|
| `[Needs Clarification]` | Vague or ambiguous — resolve before writing |
| `[Core Requirement]` | Non-negotiable — must be present in the final work |
| `[Optional Feature]` | Nice-to-have — can be dropped without harming the story |

## Task Markers Reference

| Marker | Meaning |
|--------|---------|
| `[P]` | Can be done in parallel with other tasks |
| `[Dep:X]` | Depends on task X being completed first |
| `[High Priority]` | Critical path — do this before lower-priority items |

## Project Size Guidelines

| Project Size | Recommended Flow | Focus |
|--------------|-----------------|-------|
| Short Story (10k–30k) | Specify → Clarify → Write → Edit → Review | Clear core conflict and turning points |
| Novel (50k–100k) | Full eight steps | Planning, editing, and broad QA |
| Web Serial (200k+) | Repeat Plan → Tasks → Write → Edit → Review per arc | Continuous consistency verification |

## Minimum Viable Workflow

If the user wants a lighter process, the minimum that still works is:

**Constitution → Specify → Write**

Writing without at least a specification means consistency must be tracked manually, which becomes impractical beyond ~30k words.
