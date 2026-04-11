---
name: novel-writer-english
description: "Use when user starts a novel project, asks how to organize their writing, or wants help with any aspect of fiction writing. Provides the seven-step methodology for systematic novel creation, project file conventions, and knowledge of how the sub-skills, templates, and tracking systems fit together."
---

# Novel Writer — Seven-Step Methodology Reference

This skill contains the core knowledge of a proven seven-step methodology for writing novels with AI assistance. It covers the workflow structure, project file conventions, and how the companion sub-skills relate to each step.

## The Seven Steps

| Step | Name | Purpose | Output File |
|------|------|---------|-------------|
| 1 | Constitution | Define creative principles and non-negotiables | `memory/constitution.md` |
| 2 | Specify | Build a story specification (logline → full spec) | `stories/[name]/specification.md` |
| 3 | Clarify | Resolve ambiguities in the specification | Updated `specification.md` |
| 4 | Plan | Design chapter structure, pacing, foreshadowing, arcs | `stories/[name]/creative-plan.md` |
| 5 | Tasks | Break the plan into prioritized, dependency-tracked tasks | `stories/[name]/tasks.md` |
| 6 | Write | Draft chapters using the pre-write checklist | `stories/[name]/content/chapter-XX.md` |
| 7 | Analyze | Run quality verification on framework or content | Analysis report |
| 8 | Meta | Record novel metadata (title, author, genre, tags, status) | `stories/[name]/meta.json` |

## Project File Structure

A novel project using this methodology usually maintains these files:

```
project-root/
├── stories/
│   └── [novel-name]/
│       ├── specification.md     ← Step 2 output
│       ├── creative-plan.md     ← Step 4 output
│       ├── tasks.md             ← Step 5 output (checkbox checklist)
│       ├── meta.json            ← Step 8 output
│       ├── knowledge/           ← Created by Step 2
│       │   ├── characters.md
│       │   ├── character-voices.md
│       │   ├── locations.md
│       │   └── world-setting.md
│       ├── tracking/            ← Created by Step 4
│       │   ├── character-state.json
│       │   ├── plot-tracker.json
│       │   ├── relationships.json
│       │   ├── timeline.json
│       │   └── validation-rules.json
│       └── content/
│           ├── chapter_00001.md   ← Step 6 output
│           └── chapter_00001.notes.md  ← optional draft deviation notes
├── draft/                       ← optional user-provided drafts
│   └── chapters/
│       └── 0001.md
├── memory/
│   ├── constitution.md          ← Step 1 output
│   └── personal-voice.md        ← optional voice reference
├── templates/                   ← bundled templates for tracking and knowledge
└── knowledge-base/              ← genre, style, and requirement references
```

## Step Details

### Step 1: Constitution
Establishes the creative rules all subsequent work must follow.

**Covers**: core values (theme/message), quality baseline (non-negotiables), style principles (language, pacing, atmosphere), content principles (character, plot, worldbuilding norms). *Note: This step now also captures pacing preference and character psychology depth.*

**Why it matters**: Prevents creative drift over long projects. Every decision references this document.

### Step 2: Specify
Creates a story specification using progressive detail levels.

**Levels**: Logline (one sentence) → Premise (paragraph: protagonist, goal, conflict, stakes) → One-Page (core conflict, characters, audience, success criteria) → Full Spec (setting, major plot points, themes). *Note: Major characters now require Wound/Ghost and Origin of Motivation. This step now also initializes `stories/[novel-name]/knowledge/` from templates.*

**Markers**: `[Needs Clarification]` for vague points, `[Core Requirement]` for non-negotiables, `[Optional Feature]` for nice-to-haves.

### Step 3: Clarify
Identifies up to 5 ambiguities in the specification and resolves them through targeted questions. Resolved markers are removed from the specification. *Note: Clarification now reads the `knowledge/` folder for additional context.*

### Step 4: Plan
Turns the specification into a concrete implementation plan: chapter breakdown, pacing/tension distribution, foreshadowing setup, and character arc mapping. *Note: Every chapter gets a pacing tag based on the constitution's pacing strategy. This step initializes `stories/[novel-name]/tracking/` from templates.*

### Step 5: Tasks
Breaks the plan into actionable items with markers: `[P]` (parallel), `[Dep:X]` (depends on task X), `[High Priority]`. Includes estimated word counts or effort. *Note: Tasks are tagged with pacing type, and task output format is now a checkbox checklist.*

### Step 6: Write
Drafts chapters one at a time. **The pre-write checklist must be followed before every chapter** — this is the key mechanism that prevents AI context degradation over long manuscripts. The expanded 12-item checklist reloads the constitution, specification, plan, character context, and previous chapter before generating new text, ensuring emotional goals, pacing verification, and internal reactions are covered. *Note: Features write mode selection, draft detection, draft tags, and chapter output format with a mini summary.*

### Step 7: Analyze
Two modes: **Framework Analysis** (validates planning documents before writing) and **Content Analysis** (validates written chapters against constitution, specification, plan, and internal consistency).

**Run frequency**: After the first 3 chapters, then every 5 chapters, and after completing the full draft.

### Step 8: Meta
Records the novel's bibliographic metadata. Creates or updates `stories/[novel-name]/meta.json` with title, author, description, genre tags, status (ongoing/completed/hiatus), language, and publication dates.

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
| `scene-structure` | Writing a scene — provides beat structure and pacing guidance |

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
| `skills/quality-assurance/workflow-guide/SKILL.md` | `workflow-guide` | Provides the seven-step methodology overview and step navigation |

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
| `skills/writing-techniques/scene-structure/SKILL.md` | `scene-structure` | Scene/sequel framework (Goal, Conflict, Disaster, Reaction, Dilemma, Decision) |
| `skills/writing-techniques/character-depth/SKILL.md` | `character-depth` | Psychological backstory, Wound/Ghost, internal contradictions, defense mechanisms |
| `skills/writing-techniques/emotional-interiority/SKILL.md` | `emotional-interiority` | Internal reactions, sensory-emotional responses, flags report-style narration |
| `skills/writing-techniques/pacing-rhythm/SKILL.md` | `pacing-rhythm` | Pacing archetypes, sentence-level pacing, fragment detection, chapter pacing tags |

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
| Short Story (10k–30k) | Specify → Clarify → Write → Analyze | Clear core conflict and turning points |
| Novel (50k–100k) | Full seven steps | Planning and task breakdown |
| Web Serial (200k+) | Repeat Plan → Tasks → Write → Analyze per arc | Continuous consistency verification |

## Minimum Viable Workflow

If the user wants a lighter process, the minimum that still works is:

**Constitution → Specify → Write**

Writing without at least a specification means consistency must be tracked manually, which becomes impractical beyond ~30k words.