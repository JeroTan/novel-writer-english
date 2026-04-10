# Implementation Prompt — Novel Writer Workflow Improvements

> **For**: Gemini with 1M context window
> **Project**: `novel-writer-english` — AI-powered novel writing system (seven-step methodology)
> **Repo**: https://github.com/JeroTan/novel-writer-english.git
> **Date**: 2026-04-10

---

## Background

This project is a modular AI-assisted novel writing system that provides:
- **8 VS Code agents** in `agents/*.agent.md` (YAML frontmatter with `name`, `tools`, `handoffs`)
- **8 Gemini CLI agents** in `.gemini/agents/*.md` (YAML frontmatter with `name`, `tools: ["*"]`, `kind: local`)
- **13 copy-paste commands** in `commands/*.md` (YAML frontmatter with `description`, `argument-hint`)
- **15 Gemini CLI commands** in `.gemini/commands/novel/*.toml` (TOML with `description` and `prompt` fields)
- **18 sub-skills** in `skills/**/SKILL.md` (YAML frontmatter with `name`, `description`)
- **1 root skill** `SKILL.md` (the seven-step methodology reference)
- **1 plugin** in `plugins/authentic-voice/` (commands + expert persona)
- `README.md` and `metadata.json`

The seven-step methodology is: Constitution → Specify → Clarify → Plan → Tasks → Write → Analyze.

### CRITICAL: Dual-Format Architecture

The **canonical codebase uses `.github`-style layout** (root-level `agents/`, `commands/`, `skills/`, `plugins/`). The `.gemini/` folder is a **parallel mirror** that provides Gemini CLI-compatible versions of the same content.

**The mirroring rule**: Every file that exists at root level MUST also have a `.gemini/` equivalent in the correct format. When you add, modify, or create ANY file in the root structure, you MUST also add/modify/create its `.gemini/` equivalent.

Current mirror mapping:

| Root (`.github`-style) | `.gemini/` equivalent | Status |
|---|---|---|
| `agents/*.agent.md` (8 files) | `.gemini/agents/*.md` (8 files) | ✅ Fully mirrored |
| `commands/*.md` (13 files) | `.gemini/commands/novel/*.toml` (13 of 15) | ✅ Fully mirrored |
| `plugins/authentic-voice/commands/*.md` (2 files) | `.gemini/commands/novel/authentic-voice.toml` + `authenticity-audit.toml` | ✅ Mirrored |
| `plugins/authentic-voice/experts/authentic-editor.md` | ❌ **MISSING** — no `.gemini/` equivalent | ❌ Needs creation |
| `skills/**/SKILL.md` (18 files) | N/A — skills are platform-agnostic, SKILL.md works on all platforms | ✅ No mirror needed |

### What's Missing in `.gemini/`

1. **`plugins/authentic-voice/experts/authentic-editor.md`** — This expert persona file has no Gemini CLI equivalent. Create a `.gemini/commands/novel/authentic-editor.toml` command that activates this persona, OR incorporate the persona instructions into the existing `.gemini/commands/novel/authentic-voice.toml` and `.gemini/commands/novel/authenticity-audit.toml` prompts so they invoke the "ruthless literary editor" persona automatically.

**Rule going forward**: Any new command, agent, or plugin created in the root structure MUST also get a `.gemini/commands/novel/*.toml` or `.gemini/agents/*.md` equivalent in the same commit.

---

## What Happened — Feedback From Our Personal Reader

We had a real human reader test chapters generated using this system. The reader identified **4 critical problems** with the AI-generated output. These are not theoretical — these are real issues observed in actual generated novel chapters.

### Issue 1: Excessive Sentence Fragments
The AI generates too many dramatic two-word sentence fragments with periods where commas or semicolons belong. Example:
> "He ran. Fast. Through the darkness. Heart pounding."

This reads like a manhwa panel layout, not prose. Real novels use varied sentence structure — compound sentences, subordinate clauses, semicolons. The current system has ZERO rules about sentence fragment overuse.

### Issue 2: Emotionally Shallow / Third-Person Detachment
Scenes read like action reports — "She walked to the door. She opened it. The man stood there." — with no internal emotional reaction, no sensory-emotional responses, no character interiority. The `pre-write-checklist` skill has zero items about emotional goals or character interiority. The writer agent doesn't check for emotional depth before or after writing.

### Issue 3: Manhwa Pacing (No Breather Scenes)
Every chapter is high-tension action. There are no quiet reflection scenes, no breather chapters, no moments where characters process what happened. The `plan` step mentions "pacing" but doesn't enforce any specific pacing strategy. The `tasks` step doesn't distinguish action chapters from reflection chapters.

**IMPORTANT**: For this issue, the fix should NOT force a specific pacing style. Instead, **ask the writer what kind of pacing they want** during Step 1 (Constitution) and Step 4 (Plan). Some writers WANT manhwa-style relentless pacing. Others want literary pacing with breather scenes. The system should:
1. Ask the user their pacing preference during Constitution (e.g., "relentless action", "balanced action/reflection", "literary slow-burn", "web serial cliffhanger-heavy")
2. During Plan, reference that pacing preference and generate the chapter breakdown accordingly
3. During Tasks, tag chapters with their pacing type (e.g., `[Action]`, `[Reflection]`, `[Transition]`, `[Climax]`)
4. During Write, the pre-write checklist should verify the chapter's pacing type matches the plan

### Issue 4: Shallow Character Psychology
The `specify` step asks for "protagonist, goal, conflict, stakes" but never asks about:
- **Psychological backstory** (what shaped this person?)
- **The Wound / Ghost** (what past trauma drives their behavior?)
- **Origin of motivation** (WHY do they want what they want — not just what they want)
- **Internal contradictions** (what do they believe vs. what's actually true?)

Without this, characters feel like game avatars — they have quests but no souls.

---

## What You Must Do

You will implement improvements across the entire project to address all 4 issues above. Every change must be applied to ALL FOUR formats where applicable:

1. **VS Code agents** (`agents/*.agent.md`)
2. **Gemini CLI agents** (`.gemini/agents/*.md`)
3. **Copy-paste commands** (`commands/*.md`)
4. **Gemini CLI commands** (`.gemini/commands/novel/*.toml`)
5. **Skills** (`skills/**/SKILL.md`)
6. **Root SKILL.md**

### Format Rules — READ CAREFULLY

**VS Code agents** (`agents/*.agent.md`):
```yaml
---
name: Agent Name With Spaces
description: "Description here"
tools: ['editFiles', 'readFile', 'search', 'runTerminal']
handoffs:
  - label: "Step X: Name"
    agent: agent-slug
    prompt: "Description"
    send: false
---
```

**Gemini CLI agents** (`.gemini/agents/*.md`):
```yaml
---
name: slug-name
description: "Description here"
tools:
  - "*"
kind: local
---
```
- Names must be slugs (lowercase, hyphens/underscores only)
- NO `handoffs` key (not supported). Use `@agent-name` text prompts instead.
- Tools must use `"*"` wildcard.

**Copy-paste commands** (`commands/*.md`):
```yaml
---
description: "Description"
argument-hint: "[hint]"
---
```

**Gemini CLI commands** (`.gemini/commands/novel/*.toml`):
```toml
description = "Description"

prompt = """
...content here...
"""
```
- Uses `{{args}}` for user input placeholder.
- No YAML — pure TOML.

**Skills** (`skills/**/SKILL.md`):
```yaml
---
name: skill-name
description: "Auto-activation description"
---
```

---

## TASK A: Create 3 New Sub-Skills

### A1: `skills/writing-techniques/character-depth/SKILL.md`

Create a new skill called `character-depth`. This skill activates when the user is creating character profiles, working on the specification, or asking about character development.

It must cover:
- **The Wound / Ghost**: Every major character should have a defining past event that shapes their worldview and drives their fears.
- **Psychological Backstory**: Childhood, formative relationships, status wounds, class anxiety — the unseen history that explains current behavior.
- **Origin of Motivation**: WHY they want what they want. Not "she wants revenge" but "she wants revenge because her father's murder was covered up by people she trusted, so now trust itself is her enemy."
- **Internal Contradictions**: What the character believes about themselves vs. what's actually true. What they say they want vs. what they actually need.
- **Defense Mechanisms**: How do they protect themselves emotionally? Humor? Withdrawal? Aggression? Over-competence?
- **Vulnerability Triggers**: Specific situations that crack their armor and reveal the real person underneath.

### A2: `skills/writing-techniques/emotional-interiority/SKILL.md`

Create a new skill called `emotional-interiority`. This skill activates when the user is writing a chapter or scene, especially dialogue-heavy or action-heavy scenes.

It must cover:
- **Internal Reactions**: After every significant event, the POV character should have an internal response — a thought, a sensation, an emotion. Not every paragraph, but at key moments.
- **Sensory-Emotional Responses**: Emotions manifest physically — tight chest, cold hands, the taste of copper, stomach dropping. Map emotions to physical sensations.
- **Flag Report-Style Narration**: If the prose reads like "She did X. Then she did Y. He said Z." — that's report-style narration. Flag it. The fix is to interleave action with interior reaction.
- **Show Internal Conflict**: When characters make decisions, show the war inside — the competing impulses, the hesitation, the moment of commitment.
- **Avoid Naming Emotions Directly**: "She felt sad" is weak. "Her throat tightened and she couldn't look at the photograph" is strong. Show the emotion through physical and behavioral cues.

### A3: `skills/writing-techniques/pacing-rhythm/SKILL.md`

Create a new skill called `pacing-rhythm`. This skill activates when the user is planning chapters, working on pacing, or when consecutive chapters have similar energy levels.

It must cover:
- **Pacing Archetypes**: Define the common pacing styles:
  - **Relentless Action** (manhwa/web serial style): Nearly every chapter ends on a cliffhanger. Minimal downtime. Reader is constantly on edge.
  - **Balanced**: Action scenes followed by reflection scenes. The 2:1 or 3:1 action-to-reflection ratio.
  - **Literary Slow-Burn**: Long stretches of character development and internal conflict, punctuated by sharp action beats.
  - **Rollercoaster**: Alternating high/low tension with increasing amplitude toward the climax.
- **Sentence-Level Pacing**: Short sentences = fast pace. Long, compound sentences = slow pace. Fragment overuse breaks immersion. Vary sentence length deliberately.
- **Chapter-Level Pacing Tags**: Every chapter should have a pacing tag: `[Action]`, `[Reflection]`, `[Transition]`, `[Climax]`, `[Breather]`, `[Setup]`.
- **Fragment Overuse Detection**: Flag when more than 3 consecutive sentences are fragments. Suggest converting some to compound sentences.
- **Tension Tracking**: After N consecutive high-tension chapters (where N depends on the chosen pacing archetype), flag that a breather or transition may be needed — unless the writer chose "Relentless Action" pacing.

---

## TASK B: Enhance Existing Skills

### B1: Update `skills/quality-assurance/pre-write-checklist/SKILL.md`

Add these items to the checklist:
- **Emotional Goals**: What emotional state should the reader be in at the END of this chapter? What emotional journey does the POV character take?
- **Pacing Type Verification**: Check the chapter's assigned pacing tag from `creative-plan.md`. Is this an action chapter? Reflection? Transition? Write accordingly.
- **Character Interiority Reminder**: At least 2-3 moments of internal reaction per chapter. Don't let the scene become pure external action.

### B2: Update `skills/quality-assurance/consistency-checker/SKILL.md`

Add a new check:
- **Sentence Fragment Overuse**: Flag passages with 3+ consecutive sentence fragments. Suggest converting at least one to a compound or complex sentence.
- **Report-Style Narration**: Flag passages that read as "Subject did X. Subject did Y. Subject did Z." with no internal reaction between actions.
- **Emotional Flatness**: Flag chapters where the POV character has zero internal reactions or emotional responses to major events.

### B3: Update `skills/writing-techniques/scene-structure/SKILL.md`

Add to the Scene/Sequel framework:
- In the **Reaction** phase, explicitly require internal emotional processing — not just external response.
- Add a note: "The Sequel (Reaction) is where character depth lives. Skipping or rushing it produces shallow, report-style prose."

---

## TASK C: Update Agents — Force Skill Usage

This is a critical architectural change. Currently, agents say "Check if skills are installed" and then "Proceed regardless." This is too passive. **Agents must actively USE the relevant skills during their step.**

### New Pattern for ALL Agents

Replace the current "Skill Check" section in every agent with a **"Required Skills"** section that lists which skills MUST be consulted during that agent's step. The agent should:
1. Read the skill file content (or instruct the AI to load it)
2. Follow the skill's instructions as part of the agent's workflow
3. Not just check if skills exist — actually incorporate their guidance

Here's what each agent requires:

| Agent | Required Skills to USE |
|-------|----------------------|
| `constitution` | `pacing-rhythm` (ask pacing preference), `character-depth` (ask about character psychology approach) |
| `specify` | `character-depth` (require Wound/Ghost and Origin of Motivation for every major character), `setting-detector` (auto-detect genre) |
| `clarify` | `character-depth` (flag if any major character lacks psychological backstory), `requirement-detector` |
| `planner` | `pacing-rhythm` (reference the chosen pacing archetype, assign pacing tags to chapters), `scene-structure` (ensure Scene/Sequel rhythm) |
| `task-manager` | `pacing-rhythm` (tag each task with its pacing type) |
| `writer` | `pre-write-checklist` (MANDATORY — already exists), `emotional-interiority` (ensure internal reactions), `dialogue-techniques` (ensure subtext), `pacing-rhythm` (verify chapter matches its pacing tag), `character-depth` (verify character voice matches their psychology) |
| `reviewer` | `consistency-checker` (MANDATORY), `forgotten-elements`, `emotional-interiority` (flag report-style narration), `pacing-rhythm` (flag fragment overuse, flag wrong pacing) |
| `novel-writer` (orchestrator) | `workflow-guide` (reference methodology), `getting-started` (if user is stuck) |

### Implementation for VS Code Agents (`agents/*.agent.md`)

In each agent file, replace the "Before Starting: Skill Check" section with:

```markdown
## Required Skills
This agent MUST incorporate the following skills during its workflow. Read each skill file and follow its guidance:

| Skill | File | How to Use |
|-------|------|-----------|
| `skill-name` | `skills/path/to/SKILL.md` | Brief instruction on when/how to apply |

If the skill files are not found, inform the user:
> "This agent works best with the novel-writing skills installed. Run:
> ```bash
> npx skills add JeroTan/novel-writer-english
> ```
> I'll continue, but the output quality will be reduced without these skills."
```

### Implementation for Gemini CLI Agents (`.gemini/agents/*.md`)

Same pattern but with Gemini install command:
```bash
gemini skills install https://github.com/JeroTan/novel-writer-english.git
```

And use `@agent-name` for next-step prompts instead of handoffs.

---

## TASK D: Update Commands

### D1: Update `commands/constitution.md` AND `.gemini/commands/novel/constitution.toml`

Add a new section to the constitution creation flow:

**Pacing Preference** — Ask the user:
> "What pacing style do you want for your novel?"
> - **Relentless Action**: Nearly every chapter ends on a cliffhanger. Minimal downtime.
> - **Balanced (2:1)**: Two action/tension chapters for every one reflection/breather chapter.
> - **Literary Slow-Burn**: Long character-driven stretches punctuated by sharp action beats.
> - **Rollercoaster**: Alternating high/low tension with increasing amplitude toward climax.
> - **Custom**: Describe your own pacing vision.

Save the chosen pacing preference in the constitution document under a new section: `## Chapter 4: Pacing Strategy`.

**Character Psychology Approach** — Ask the user:
> "How deep should character psychology go?"
> - **Surface**: Goals, conflicts, basic motivation. Good for fast-paced action stories.
> - **Standard**: Goals, motivation origin, one defining backstory event per major character.
> - **Deep**: Full psychological profiles — Wound/Ghost, defense mechanisms, internal contradictions, vulnerability triggers.

Save under `## Chapter 5: Character Depth`.

### D2: Update `commands/specify.md` AND `.gemini/commands/novel/specify.toml`

In the Level 2 (Premise) and Level 4 (Full Spec) sections, add for each major character:
- **Wound / Ghost**: What past event defines them?
- **Origin of Motivation**: WHY they want their goal (not just what the goal is).
- **Internal Contradiction**: What they believe vs. what's true.

Reference the `character-depth` skill if available.

### D3: Update `commands/plan.md` AND `.gemini/commands/novel/plan.toml`

In the "Pacing & Tension" section:
1. Read the pacing preference from `memory/constitution.md` (Chapter 4: Pacing Strategy).
2. Apply that pacing archetype to the chapter breakdown.
3. Assign a **pacing tag** to every chapter: `[Action]`, `[Reflection]`, `[Transition]`, `[Climax]`, `[Breather]`, `[Setup]`.
4. If pacing preference is "Balanced", ensure at least 1 reflection/breather chapter for every 2-3 action chapters.
5. If pacing preference is "Relentless Action", acknowledge but still recommend at least one brief cooldown per arc.

### D4: Update `commands/tasks.md` AND `.gemini/commands/novel/tasks.toml`

Each task should include:
- The pacing tag from the plan (e.g., `[Action]`, `[Reflection]`).
- For character-heavy scenes, note which characters' psychological depth should be showcased.

### D5: Update `commands/write.md` AND `.gemini/commands/novel/write.toml`

Add to the Pre-Write Checklist:
- **Item 10: Emotional Goals** — What emotional state should the reader reach by end of chapter?
- **Item 11: Pacing Type** — Check this chapter's pacing tag from the plan. Write accordingly.
- **Item 12: Internal Reactions** — Plan at least 2-3 moments of character interiority.

Add to the drafting instructions:
- "Vary sentence length. Avoid 3+ consecutive sentence fragments."
- "After every significant event, include the POV character's internal reaction before moving to the next action."
- "Show emotions through physical sensations and behavior, not by naming them directly."

### D6: Update `commands/analyze.md` AND `.gemini/commands/novel/analyze.toml`

Add to Content Analysis:
- **Fragment Check**: Scan for 3+ consecutive sentence fragments.
- **Report-Style Check**: Scan for 3+ consecutive "Subject did X" sentences with no interior reaction.
- **Emotional Depth Check**: Does the POV character have at least 2 internal reactions per chapter?
- **Pacing Compliance**: Does the chapter's tone match its assigned pacing tag from the plan?

---

## TASK E: Update Root `SKILL.md`

### E1: Update the Step Details

- **Step 1 (Constitution)**: Add note that this step now also captures pacing preference and character psychology depth.
- **Step 2 (Specify)**: Add note that major characters now require Wound/Ghost and Origin of Motivation.
- **Step 4 (Plan)**: Add note that every chapter gets a pacing tag based on the constitution's pacing strategy.
- **Step 5 (Tasks)**: Add note that tasks are tagged with pacing type.
- **Step 6 (Write)**: Add note about emotional goals, pacing verification, and internal reactions in the expanded pre-write checklist (now 12 items, not 9).

### E2: Update the Companion Sub-Skills Table

Add the 3 new skills:

| Skill | Activates when... |
|-------|-------------------|
| `character-depth` | Creating characters or specifications — ensures psychological backstory |
| `emotional-interiority` | Writing chapters — ensures internal reactions and shows emotions physically |
| `pacing-rhythm` | Planning or writing — enforces chosen pacing archetype and detects fragment overuse |

### E3: Update the Sub-Skill Locations

Add under **Writing Techniques** (`skills/writing-techniques/`):

| File | Skill Name | Description |
|------|-----------|-------------|
| `skills/writing-techniques/character-depth/SKILL.md` | `character-depth` | Psychological backstory, Wound/Ghost, internal contradictions, defense mechanisms |
| `skills/writing-techniques/emotional-interiority/SKILL.md` | `emotional-interiority` | Internal reactions, sensory-emotional responses, flags report-style narration |
| `skills/writing-techniques/pacing-rhythm/SKILL.md` | `pacing-rhythm` | Pacing archetypes, sentence-level pacing, fragment detection, chapter pacing tags |

---

## TASK F: Update `README.md`

### F1: Update the "Available Skills" table

Add the 3 new skills to the table.

### F2: Update the Seven-Step Methodology description

Mention that:
- Step 1 now captures pacing preference and character depth level
- Step 6 now uses a 12-item pre-write checklist (not 9-item)

Update any references to "9-item pre-write checklist" to "12-item pre-write checklist" throughout the README.

---

## TASK G: Fix Old GitHub URL

The repo was renamed. Search the entire project for `novel-writer-workflow-guide-english` and replace with `novel-writer-english` everywhere. This includes:
- `metadata.json` (`githubUrl` field)
- `README.md` (install commands)
- All VS Code agents (`agents/*.agent.md`) — the `npx skills add` lines
- Any other files that reference the old URL

---

## TASK H: Sync Missing `.gemini/` Equivalents

The canonical codebase is the root-level `.github`-style structure (`agents/`, `commands/`, `plugins/`, `skills/`). The `.gemini/` folder must always mirror the root content in Gemini CLI-compatible format.

### H1: Fix the missing expert persona

`plugins/authentic-voice/experts/authentic-editor.md` exists in root but has NO `.gemini/` equivalent. Fix this by either:
- **(Option A — preferred)**: Creating `.gemini/commands/novel/authentic-editor.toml` as a standalone TOML command that activates the ruthless literary editor persona. OR
- **(Option B)**: Merging the persona instructions from `authentic-editor.md` into the existing `.gemini/commands/novel/authentic-voice.toml` and `.gemini/commands/novel/authenticity-audit.toml` prompts so they invoke the persona automatically.

Pick whichever option produces a cleaner result. If Option A, the TOML format is:
```toml
description = "Activate the ruthless literary editor persona for line editing."

prompt = """
...persona instructions here...
"""
```

### H2: Full parity audit

After completing Tasks A-F, do a **final parity check**:
1. List every `.agent.md` file in `agents/` — verify each has a matching `.gemini/agents/*.md`
2. List every `.md` file in `commands/` — verify each has a matching `.gemini/commands/novel/*.toml`
3. List every `.md` file in `plugins/*/commands/` — verify each has a matching `.gemini/commands/novel/*.toml`
4. If any new commands were created during Tasks A-F that only exist in `commands/` but not `.gemini/commands/novel/`, create the TOML equivalents.

### H3: Keep formats correct

Reminders:
- `.gemini/agents/*.md` files use `name` (slug), `tools: ["*"]`, `kind: local`, NO `handoffs`
- `.gemini/commands/novel/*.toml` files use pure TOML with `description` and `prompt` fields, `{{args}}` for user input
- Root `agents/*.agent.md` files use `name` (can have spaces), platform-specific `tools`, and `handoffs`
- Root `commands/*.md` files use `$ARGUMENTS` for user input

---

## Execution Order

1. **TASK G** first — fix the URLs so everything is consistent
2. **TASK H** — sync missing `.gemini/` equivalents (see below)
3. **TASK A** — create the 3 new sub-skills
4. **TASK B** — enhance existing skills
5. **TASK C** — update all 16 agent files (8 VS Code + 8 Gemini CLI) to force skill usage
6. **TASK D** — update all commands (13 copy-paste + 15 TOML)
7. **TASK E** — update root SKILL.md
8. **TASK F** — update README.md
9. **Final pass** — re-verify `.gemini/` mirror parity (see Validation Checklist)

---

## Validation Checklist

After completing all tasks, verify:

- [ ] All 3 new skill files exist and have valid YAML frontmatter
- [ ] All 8 VS Code agents have "Required Skills" sections (not the old "Skill Check")
- [ ] All 8 Gemini CLI agents have "Required Skills" sections (not the old "Skill Check")
- [ ] Gemini CLI agents use `tools: ["*"]` and `kind: local` — NO `handoffs` key
- [ ] VS Code agents keep their `handoffs` key intact
- [ ] `commands/constitution.md` asks about pacing preference and character depth
- [ ] `commands/specify.md` requires Wound/Ghost and Origin of Motivation for characters
- [ ] `commands/plan.md` assigns pacing tags to chapters
- [ ] `commands/write.md` has 12-item checklist with emotional goals, pacing type, internal reactions
- [ ] `.gemini/commands/novel/constitution.toml` mirrors the copy-paste version
- [ ] `.gemini/commands/novel/specify.toml` mirrors the copy-paste version
- [ ] `.gemini/commands/novel/plan.toml` mirrors the copy-paste version
- [ ] `.gemini/commands/novel/write.toml` mirrors the 12-item checklist
- [ ] Root `SKILL.md` has all 3 new skills in companion tables
- [ ] Root `SKILL.md` step details are updated
- [ ] `README.md` references 12-item checklist throughout
- [ ] `README.md` has 3 new skills in Available Skills table
- [ ] No instance of `novel-writer-workflow-guide-english` remains anywhere in the project
- [ ] No broken YAML frontmatter in any `.md` file
- [ ] No `handoffs` key in any `.gemini/agents/*.md` file
- [ ] All Gemini CLI agent names are valid slugs (lowercase, hyphens, underscores only)

### `.gemini/` Mirror Parity
- [ ] Every file in `agents/*.agent.md` has a corresponding `.gemini/agents/*.md` with equivalent content
- [ ] Every file in `commands/*.md` has a corresponding `.gemini/commands/novel/*.toml` with equivalent content
- [ ] Every plugin command in `plugins/*/commands/*.md` has a corresponding `.gemini/commands/novel/*.toml`
- [ ] `plugins/authentic-voice/experts/authentic-editor.md` persona is incorporated into `.gemini/` (either as its own TOML or merged into existing `authentic-voice.toml` / `authenticity-audit.toml`)
- [ ] No root-level command or agent exists without a `.gemini/` counterpart
- [ ] All `.gemini/commands/novel/*.toml` files use valid TOML syntax (not YAML)
- [ ] All `.gemini/agents/*.md` files use `tools: ["*"]` and `kind: local`
