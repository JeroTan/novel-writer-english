# Version History

> **Format Note**: This file is additive only. New versions are appended below existing content. Existing entries are never modified or removed.

---

## v1.0.0 — 2026-04-04

**Initial Release — English Translation & Re-Architecture**

Translated and re-architected the original Chinese [novel-writer-skills](https://github.com/wordflowlab/novel-writer-skills) by wordflowlab into a platform-agnostic English system.

### Added

**Core System**
- Seven-step methodology: Constitution → Specify → Clarify → Plan → Tasks → Write → Analyze
- Root `SKILL.md` with full methodology reference, companion sub-skill tables, markers reference, and project size guidelines
- `metadata.json` with project metadata
- `README.md` with platform setup guides, Quick Start (Skills / Agents / Commands), comparison table

**8 VS Code Agents** (`agents/*.agent.md`)
- `novel-writer.agent.md` — main orchestrator with handoffs to all 7 step agents
- `constitution.agent.md` — Step 1: creative principles
- `specify.agent.md` — Step 2: story specification (logline → full spec)
- `clarify.agent.md` — Step 3: resolve ambiguities
- `planner.agent.md` — Step 4: chapter structure and pacing
- `task-manager.agent.md` — Step 5: task breakdown with markers
- `writer.agent.md` — Step 6: chapter writing with 9-item pre-write checklist
- `reviewer.agent.md` — Step 7: quality analysis (framework + content)

**8 Gemini CLI Agents** (`.gemini/agents/*.md`)
- Mirrored all 8 VS Code agents in Gemini CLI-compatible format
- Slug names, `tools: ["*"]`, `kind: local`, no `handoffs` (uses `@agent-name` text prompts instead)

**13 Copy-Paste Commands** (`commands/*.md`)
- `constitution.md`, `specify.md`, `clarify.md`, `plan.md`, `tasks.md`, `write.md`, `analyze.md`
- `checklist.md`, `expert.md`, `track-init.md`, `track.md`, `timeline.md`, `relations.md`

**15 Gemini CLI Commands** (`.gemini/commands/novel/*.toml`)
- Mirrored all 13 copy-paste commands in TOML format
- Added `authentic-voice.toml` and `authenticity-audit.toml` from plugin

**16 Sub-Skills** (`skills/**/SKILL.md`)
- Quality Assurance (8): `pre-write-checklist`, `consistency-checker`, `forgotten-elements`, `style-detector`, `setting-detector`, `requirement-detector`, `getting-started`, `workflow-guide`
- Genre Knowledge (6): `fantasy`, `romance`, `thriller`, `horror`, `mystery`, `scifi`
- Writing Techniques (2): `dialogue-techniques`, `scene-structure`

**Plugin** (`plugins/authentic-voice/`)
- `commands/authentic-voice.md` — rewrite passages to remove AI clichés
- `commands/authenticity-audit.md` — audit text for AI-generated patterns
- `experts/authentic-editor.md` — ruthless literary editor persona
- `config.yaml` and `README.md`

**Knowledge Base** (`knowledge-base/`)
- Genres (9): fantasy, historical, horror, mystery, revenge, romance, scifi, thriller, wuxia
- Styles (5): conversational, literary, minimal, ornate, web-serial
- Requirements (6): authentic-voice, fast-paced, romance-angst, romance-sweet, serious-literature, strong-emotion

**Templates** (`templates/`)
- Tracking templates: character-state, plot-tracker, relationships, timeline, validation-rules
- Knowledge and memory templates

**Documentation** (`docs/`)
- Platform setup guides: vscode-copilot, cursor, windsurf, claude-code, gemini-cli, generic-ai
- Commands guide, getting started, project structure, skills guide

**Scripts** (`scripts/`)
- Bash and PowerShell helper scripts

**Other**
- `ATTRIBUTION.md` — credits to original wordflowlab project
- `CHANGELOG.md` — formal changelog
- `LICENSE` — MIT

---

## v2.0.0 — 2026-04-11

**Reader Feedback Overhaul — Emotional Depth, Character Psychology, Pacing Control & Forced Skill Usage**

Based on feedback from a personal reader who tested AI-generated novel chapters, identified and fixed 4 critical quality problems in the output. Also restructured agent architecture to force mandatory skill usage instead of passive skill checking.

### Reader Feedback — The 4 Problems

1. **Excessive Sentence Fragments** — AI generated too many dramatic two-word fragments ("He ran. Fast. Through the darkness.") instead of varied sentence structure with compound sentences and semicolons.
2. **Emotionally Shallow / Third-Person Detachment** — Scenes read as action reports with no internal emotional reactions, no sensory-emotional responses, no character interiority.
3. **Manhwa Pacing (No Breather Scenes)** — Every chapter was high-tension action with no quiet reflection or processing scenes. No pacing variety.
4. **Shallow Character Psychology** — Characters had goals and conflicts but no psychological depth — no Wound/Ghost, no origin of motivation, no internal contradictions.

### Added

**3 New Sub-Skills** (`skills/writing-techniques/`)
- `character-depth/SKILL.md` — Requires Wound/Ghost, psychological backstory, origin of motivation, internal contradictions, defense mechanisms, vulnerability triggers for every major character
- `emotional-interiority/SKILL.md` — Enforces internal reactions at key moments, sensory-emotional responses, flags report-style narration, shows internal conflict, avoids naming emotions directly
- `pacing-rhythm/SKILL.md` — Defines 4 pacing archetypes (Relentless Action, Balanced, Literary Slow-Burn, Rollercoaster), sentence-level pacing rules, chapter pacing tags (`[Action]`, `[Reflection]`, `[Transition]`, `[Climax]`, `[Breather]`, `[Setup]`), fragment overuse detection (flags 3+ consecutive fragments), tension tracking across chapters

### Changed

**Architecture: Forced Skill Usage in All Agents**

Replaced passive "Before Starting: Skill Check" sections in all 16 agents (8 VS Code + 8 Gemini CLI) with mandatory "Required Skills" tables. Agents now MUST read and follow specific skill files, not just check if they exist.

| Agent | Required Skills |
|-------|----------------|
| `novel-writer` | `workflow-guide`, `getting-started` |
| `constitution` | `pacing-rhythm` (ask pacing preference), `character-depth` (ask psychology approach) |
| `specify` | `character-depth` (require Wound/Ghost per character), `setting-detector` |
| `clarify` | `character-depth` (flag missing backstory), `requirement-detector` |
| `planner` | `pacing-rhythm` (assign chapter pacing tags), `scene-structure` |
| `task-manager` | `pacing-rhythm` (tag tasks with pacing type) |
| `writer` | `pre-write-checklist`, `emotional-interiority`, `dialogue-techniques`, `pacing-rhythm`, `character-depth` |
| `reviewer` | `consistency-checker`, `forgotten-elements`, `emotional-interiority`, `pacing-rhythm` |

**Pre-Write Checklist Expanded: 9 → 12 Items**
- Item 10: **Emotional Goals** — what emotional state the reader should reach by chapter end
- Item 11: **Pacing Type** — verify chapter's pacing tag from the plan
- Item 12: **Internal Reactions** — plan at least 2-3 moments of character interiority

**Constitution Step (Step 1) Now Captures:**
- **Pacing Preference** — user chooses: Relentless Action, Balanced (2:1), Literary Slow-Burn, Rollercoaster, or Custom (saved as `## Chapter 4: Pacing Strategy`)
- **Character Psychology Depth** — user chooses: Surface, Standard, or Deep (saved as `## Chapter 5: Character Depth`)

**Specify Step (Step 2) Now Requires:**
- Wound/Ghost for each major character
- Origin of Motivation (WHY, not just WHAT)
- Internal Contradiction (belief vs. truth)

**Plan Step (Step 4) Now Assigns:**
- Pacing tag to every chapter based on constitution's pacing strategy
- Balanced pacing enforces 1 reflection per 2-3 action chapters
- Relentless Action still recommended at least one cooldown per arc

**Tasks Step (Step 5) Now Tags:**
- Each task with pacing type from the plan
- Character-heavy scenes note which characters' depth to showcase

**Write Step (Step 6) Drafting Rules Added:**
- "Vary sentence length. Avoid 3+ consecutive sentence fragments."
- "After every significant event, include the POV character's internal reaction."
- "Show emotions through physical sensations and behavior, not by naming them directly."

**Analyze Step (Step 7) New Checks:**
- Fragment Check: 3+ consecutive sentence fragments
- Report-Style Check: 3+ consecutive "Subject did X" with no interior reaction
- Emotional Depth Check: POV character must have 2+ internal reactions per chapter
- Pacing Compliance: chapter tone must match assigned pacing tag

**Enhanced Existing Skills:**
- `pre-write-checklist` — added Emotional Goals, Pacing Type Verification, Character Interiority Reminder
- `consistency-checker` — added Sentence Fragment Overuse, Report-Style Narration, and Emotional Flatness detection
- `scene-structure` — Sequel/Reaction phase now explicitly requires internal emotional processing; added note about depth living in the Sequel

**Root `SKILL.md` Updated:**
- Step details updated with v2 notes (pacing preference, Wound/Ghost, pacing tags, 12-item checklist)
- Companion Sub-Skills table: added `character-depth`, `emotional-interiority`, `pacing-rhythm`
- Sub-Skill Locations table: added all 3 new writing techniques skills

**README.md Updated:**
- Available Skills table: added 3 new skills
- All references to "9-item pre-write checklist" changed to "12-item"
- Seven-Step Methodology description updated

**URL Fix:**
- All instances of `novel-writer-workflow-guide-english` replaced with `novel-writer-english` across the entire project (metadata.json, README.md, all agents, all install commands)

---

## v3.0.0 — 2026-04-11

**Workflow Depth Upgrade — Templates, Knowledge Scaffolding, Tracking, Draft Processing & Novel Metadata**

Version 3 adds structural depth to every step of the workflow. Agents now use proper templates, scaffold knowledge and tracking folders automatically, support draft-based writing with special processing tags, and record final novel metadata.

### Added

**New Step 8: Meta Agent**
- `agents/meta.agent.md` — collects and saves `stories/[novel-name]/meta.json`
- `.gemini/agents/meta.md` — Gemini CLI equivalent
- `commands/meta.md` and `.gemini/commands/novel/meta.toml`
- Saves: title, author, description, status, genre, tags, language, publishedAt, updatedAt

**Draft System in Writer**
- Writer now detects draft files in `draft/chapters/` (accepts varied naming conventions)
- Core documents (spec, clarify, plan, knowledge) take priority over draft content
- Three special inline tags for draft processing:
  - `@#@ FILL @#@` — generate missing prose/scenes
  - `@#@ DESCRIBE @#@` — enhance descriptions with light-novel sensory intensity
  - `@#@ FLASHBACK @#@` — generate flashbacks reading all available context
- Deviation Note appended to each chapter explaining differences from the draft

**Write Mode Selection**
- Users now choose a write mode each session: One by One / Batch (N chapters) / All at Once

**Knowledge Scaffolding**
- Specify now creates `stories/[novel-name]/knowledge/` from templates after saving the specification
- Files created: `characters.md`, `character-voices.md`, `locations.md`, `world-setting.md`
- Pre-filled from specification; suggestions offered for unfilled fields

**Tracking Initialization**
- Plan now initializes `stories/[novel-name]/tracking/` from templates after saving the creative plan
- Files created: `character-state.json`, `plot-tracker.json`, `relationships.json`, `timeline.json`, `validation-rules.json`
- Populated with known protagonist, plot state, and validation rules from spec and knowledge

### Changed

**Constitution**: Now uses `templates/memory/constitution.md` as document scaffold.

**Clarify**: Now reads `stories/[novel-name]/knowledge/` as part of analysis. Alerts user if knowledge folder is missing.

**Tasks**: Output format changed to markdown checkbox checklist (`- [ ]`).

**Writer — Pre-Write Checklist**: Item 5 now reads `knowledge/characters.md` and `knowledge/character-voices.md`. Item 6 reads `knowledge/locations.md` and `knowledge/world-setting.md`. Old standalone "Check Setting" item removed (now merged into items 5–6).

**Writer — Chapter Format**: Every chapter now follows: `# Chapter [N]: [Title]` → body → `---` → `*mini summary*`. Saved as `chapter_00001.md` (zero-padded 5-digit numbering).

**Writer — Tracking Updates**: After each chapter, updates all 4 relevant tracking JSON files and marks the task complete in `tasks.md`.

**Analyze (Reviewer)**: Now performs a full cross-document review — reads constitution, specification, plan, all knowledge files, all tracking files, all chapters, and task completion status before generating a report. Adds a novel completion status section to the report.

**`novel-writer` Orchestrator**: Added Step 8 handoff. Detects completion (all tasks checked) and guides user to Steps 7 → 8.

**Root `SKILL.md`**: Updated project file structure diagram, step details for Steps 2–6 + new Step 8, seven-step → eight-step.

**README.md**: Updated to eight-step methodology, new agent in table, new feature bullets.