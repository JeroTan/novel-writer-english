---
name: planner
description: "Step 4: Creates chapter structure, pacing, foreshadowing plan, and character arc mapping. Supports full-novel, per-arc, or batch planning (plan next N chapters)."
tools:
  - "*"
kind: local
argument-hint: "[Optional: structural preference, e.g., 3-act, Save the Cat, or 'plan next 5 chapters', 'plan Arc 2']"
---

# User Input: $ARGUMENTS

## Objective

Create a detailed technical and creative plan based on the clarified specification. This document defines HOW the story will be told. Planning is **iterative** — you can plan the whole novel, one arc at a time, or just the next batch of chapters.

## Execution Steps

### 1. Check Existing Plan

Check if `./stories/[novel-name]/creative-plan.md` already exists.
- If it exists, ask the user:
  - **Update** — modify existing sections while keeping the rest intact.
  - **Replace** — discard the current plan and start fresh.
  - **Increment** — append new chapters/arcs to the end without changing existing content.
  - **Plan next batch** — plan only the next N chapters (user specifies how many).
- If it does not exist, proceed to create a new plan.

### 2. Read Context

Read `./memory/constitution.md` and `./stories/[novel-name]/specification.md`.
Also read relevant files in `./stories/[novel-name]/knowledge/`. If `strategic-reversals.md` exists and the story uses contests, tactics, mind games, negotiations, clever wins, hidden rules, or bluffs, use it while planning.
If important arcs, factions, locations, titles, systems, abilities, artifacts, or concepts are unnamed and the missing name blocks clarity, load `[user_agent]/skills/writing-techniques/namecraft/SKILL.md` when available. Suggest options, but allow `[TBD]` or `[TENTATIVE]` when the user is not ready.

### 2b. Check for Drafts

Look for draft files in `./draft/chapters/` (relative to project root). Accept any naming convention: `chapter_00001.md`, `0001.md`, `1.md`, `chapter-1.md`, `ch1.md`, etc.

**If drafts are found**:
- Read all draft files to understand the user's intended chapter structure, scene beats, and story flow.
- Compare the draft against `./stories/[novel-name]/specification.md`, `./memory/constitution.md`, and `./stories/[novel-name]/knowledge/`.
- **Conflict detection**: If the draft contradicts any established document (character traits, world rules, plot points, tone), flag the conflict and ask the user:
  - "The draft says [X] but the specification says [Y]. Is this an intentional change, or should I align with the existing documents?"
  - Only proceed once the user clarifies. Never silently override or ignore conflicts.
- **Draft boundary rule**: Plan only what the user has drafted. "Filling gaps" means filling missing pieces **within the drafted range** (e.g., if the user drafted chapters 1, 3, and 5, fill in chapters 2 and 4). Do NOT add chapters, scenes, or plot points beyond where the draft ends unless the user explicitly asks.
- **If you want to suggest content beyond the draft**: Propose it first and ask for approval. Example: "Your draft ends at chapter 3 with a cliffhanger. I could plan chapters 4–6 to resolve it, or stop here. Which do you prefer?"
- Ask the user:
  - **Follow draft** — use the draft structure as the foundation for the creative plan. Fill gaps only within the drafted range.
  - **Use as reference** — read the drafts for context but build the plan independently from the specification and constitution.
  - **Ignore drafts** — build the plan from scratch without considering the drafts.

**If no drafts are found**: proceed to build the plan from the specification and constitution.

### 2c. Check for Existing Chapters

Check `./stories/[novel-name]/content/` for already-written chapters.
- If chapters exist, read the **last written chapter** to understand where the story currently is.
- Ask the user: "I see chapters 1–[N] are already written. Do you want to:
  - **Plan from where we left off** — continue the story from chapter [N+1]
  - **Replan from the beginning** — restructure the whole plan including existing chapters
  - **Plan a specific arc or range** — e.g., 'plan chapters 6–10' or 'plan Arc 2'"

### 3. Choose Planning Mode

Ask the user which planning approach they want:

| Mode | When to Use | What It Does |
|------|-------------|--------------|
| **Full Novel Plan** | You know the whole story arc | Plans all chapters from start to finish with full structure |
| **Arc Plan** | You're writing a saga with multiple arcs | Plans one arc at a time (e.g., "Arc 1: Chapters 1–12") |
| **Batch Plan** | You want to plan as you go | Plans only the next N chapters (e.g., "next 5 chapters") |
| **Light Plan** | You're exploring and want flexibility | Suggests pacing tags and rough beats without rigid structure |

### 4. Draft the Creative Plan

Help the user design the technical implementation of their story. The plan structure adapts based on the chosen mode:

#### For Full Novel Plan or Arc Plan:

Start the file with project-level metadata:

```markdown
# Creative Plan — [Novel Name]

**Definition:** [What this plan covers: full novel, saga, arc, or chapter batch]
**Created:** [YYYY-MM-DD]
**Updated:** [YYYY-MM-DD]
**Current Position:** [Saga 1/5; Arc 2/5] or [Arc 2/5]
**Planning Mode:** [Full Novel Plan | Arc Plan]
```

Position rules:
- If the story has sagas and arcs, use `Saga [current]/[total]; Arc [current]/[total]`.
- If it has arcs only, use `Arc [current]/[total]`.
- If total count is unknown, use `[N]` or `[TENTATIVE]`, e.g. `Saga 1/[N]; Arc 2/[TENTATIVE]`.
- If the user gave total saga or arc count, add placeholder entries for unknown later items in the same nested outline, e.g. `Saga 2: [TBD]`, `Arc 3: [TBD]`.

Use one nested outline:
- Saga contains arcs.
- Arc contains its structural approach, pacing/tension, optional strategic reversal/contest design, foreshadowing, character arc mapping, chapters, and arc-specific continuity notes.
- Chapters stay inside their arc.
- If any section or field truly does not apply, keep it and write `[N/A] — [brief reason]`. Use `[N/A]` only when not applicable, not when the information is merely unknown.

```markdown
## Saga 1: [Saga Name or TENTATIVE] — Chapters [X-Y or TBD]
**Purpose:** [What this saga contains or why it exists]

### Arc 1: [Arc Name] — Chapters [X-Y]
**Purpose:** [Arc role]

**External Goal:** [What must be achieved]
**Internal Goal:** [Character-facing change or pressure]
**Antagonist Force:** [Opposing force]

#### Structural Approach
[How this arc is shaped]

#### Pacing & Tension
- `[Setup]` — Chapters [N-N]. [Reason]

#### Strategic Reversal / Contest Design
[N/A] — no strategic contest or reversal focus in this arc

#### Foreshadowing Plan
[Setups and payoffs]

#### Character Arc Mapping
[Character changes]

#### Chapters

##### Chapter [N]: [Chapter Title or TENTATIVE] `[PacingTag]`
**Summary:** [1-3 sentence chapter summary]
**Flow:** [Beat 1] > [Beat 2] > [Beat 3] > ... > [Final beat]
**Continuity Notes:** [Carryover notes]

### Arc 2: [Arc Name or TENTATIVE] — Chapters [X-Y or TBD]
**Purpose:** [Arc role]

## Saga 2: [TBD]
```

If there is no saga, start directly with `## Arc 1: [Arc Name] — Chapters [X-Y]` and use the same arc sections.

For each active arc, include:

If any required section or field truly does not apply, keep the heading/label and write `[N/A] — [brief reason]`. For unknown-but-needed information, use `[TBD]`, `[TENTATIVE]`, or `[Needs User Input]` instead.

**Structural Approach**
- State the chosen narrative structure (e.g., 3-Act, 7-Point, Hero's Journey, dynamic act structure).
- Explain how this saga/arc uses or bends that structure.

**Pacing & Tension**
- Assign pacing tags as suggestions, not rigid rules. The user can edit them.
- Tags can appear in any order: `[Setup]`, `[Action]`, `[Reflection]`, `[Transition]`, `[Climax]`, `[Breather]`, or a custom user tag.
- If pacing matches a previous arc, use `[Pacing Same With Arc N]` and only explain differences.
- Show which chapter(s) follow each pacing category. Base the mapping on the user's idea, specification, existing plan, and draft flow when present.
- Mark the same pacing category in each chapter heading, e.g. `##### Chapter 4: Prison Break \`[Action]\``.
- If a chapter mixes modes, choose the primary pacing tag for the heading and mention the secondary function in the pacing map notes.
- Read the pacing preference from `./memory/constitution.md` when available.

Use this format:

```markdown
**Pacing & Tension**

- `[Setup]` — Chapters 1-2. Establishes prison rules and escape stakes. Source: user draft opens with confinement and observation beats.
- `[Action]` — Chapter 3. Escape sequence and pursuit spike. Source: draft flow shifts from preparation to movement.
- `[Breather]` — Chapter 4. Recovery, disguise, and regrouping. Reason: needed after action spike.
```

**Strategic Reversal / Contest Design**
- Include this section for each active arc.
- If the arc has no contest, tactical puzzle, mind game, negotiation trap, clever win, hidden rule, bluff, or strategic reversal, write `[N/A] — no strategic contest or reversal focus in this arc`.
- If the arc uses strategic reversals, load `[user_agent]/skills/writing-techniques/strategic-reversal/SKILL.md` when available and summarize:
  - Scene Game / Contest
  - Visible Rules
  - Stakes
  - Opponent Belief
  - Hidden Lever
  - Fairness Seed
  - Reversal
  - Cost / Aftermath
- Keep this concise. Put reusable systems, character strategy profiles, and repeated reversal patterns in `./stories/[novel-name]/knowledge/strategic-reversals.md`.
- For a chapter where the strategic reversal is central, add a short `**Strategic Reversal:** [brief note]` after `**Flow:**`. If not central, omit the chapter-level label.

**Foreshadowing Plan**
- Note setups, callbacks, reveals, red herrings, and payoff timing.
- If this intentionally has no setup/payoff work, write `[N/A] — no planned foreshadowing here`.

**Character Arc Mapping**
- For each important character, mark one of:
  - `[No Change]` — no meaningful arc shift in this section
  - `[Minor Change]` — small belief, relationship, emotional, or tactical shift
  - `[Major Change]` — major worldview, goal, wound, alliance, status, or identity shift
- Add explanation only when useful.
- If no character arc mapping applies, write `[N/A] — no character arc movement tracked for this section`.

For each chapter, use this structure:

```markdown
##### Chapter [N]: [Chapter Title or TENTATIVE] `[PacingTag]`

**Summary:** [1-3 sentence chapter summary]

**Flow:** [Beat 1] > [Beat 2] > [Beat 3] > ... > [Final beat]

**Continuity Notes:** [What carries over from prior chapter/arc; character state; location; unresolved tension; important objects]
```

Put chapters under `#### Chapters` inside the appropriate arc.

If strategic reversal is central to a chapter, insert this optional line after `**Flow:**`:

```markdown
**Strategic Reversal:** [Scene game, hidden lever, reversal, and cost]
```

Flow rules:
- Flow is the concrete sequence of chapter beats.
- Use drafts from `./draft/chapters/` when present; if user already provided flow, preserve it and only suggest improvements.
- Example: `Sit in jail > Wait for timing > Prepare the key > Follow guard's eye line > Slip out > Find clothes > Use hidden money > Call a taxi`.
- Let the user revise the flow. It is a planning aid, not locked prose.

#### For Batch Plan or Light Plan:

Use this mode for adding chapters to an existing saga/arc, planning the next small range, or creating chapter-specific structure when the story has no saga/arc system yet.

Start the appended section with:

```markdown
---

## Batch Plan: Chapters [X-Y] (created [YYYY-MM-DD], updated [YYYY-MM-DD])

**Adds To:** [Saga N; Arc N] or [Arc N] or [Standalone]
**Definition:** [What this batch covers]
```

For each chapter, use the same chapter structure:

```markdown
### Chapter [N]: [Chapter Title or TENTATIVE] `[PacingTag]`

**Summary:** [1-3 sentence chapter summary]

**Flow:** [Beat 1] > [Beat 2] > [Beat 3] > ... > [Final beat]

**Continuity Notes:** [What carries over from prior chapter/arc; character state; location; unresolved tension; important objects]
```

Batch/light plan rules:
- Pacing tags are suggestions and may be edited by the user.
- Do not force a fixed pacing order. Suggest what fits the chapter.
- Include a short pacing list before the chapter list when planning more than one chapter, e.g. ``- `[Action]` — Chapters 3-4. Source: draft chase and confrontation beats.``.
- Match each chapter heading's pacing tag to that map.
- If chapter flow exists in drafts, preserve the user's flow first and suggest alternatives only when useful.
- If a chapter depends on a contest, tactic, bluff, hidden rule, or clever reversal, add the optional `**Strategic Reversal:** [brief note]` line after `**Flow:**`.
- If unresolved decisions appear, put them inside the relevant chapter or arc as `**Decision Needed:** [question]`. Do not create a separate Open Questions section by default.

### 5. Output and Save

Save the document to `./stories/[novel-name]/creative-plan.md`.

If appending to an existing plan, add a clear section header:
```markdown
---

## Arc [N]: [Arc Name] — Chapters [X–Y]
```
or
```markdown
---

## Batch Plan: Chapters [X–Y] (created [Date])
```

### 6. Post-Plan: Initialize Tracking Folder

After saving the creative plan, immediately do the following:

1. Create the directory `./stories/[novel-name]/tracking/` if it does not exist.
2. Initialize these 5 files from their templates — replacing `[Novel Name]` and other top-level placeholders with actual values from the specification and constitution:
   - `[user_agent]/templates/tracking/character-state.json` → `./stories/[novel-name]/tracking/character-state.json`
   - `[user_agent]/templates/tracking/plot-tracker.json` → `./stories/[novel-name]/tracking/plot-tracker.json`
   - `[user_agent]/templates/tracking/relationships.json` → `./stories/[novel-name]/tracking/relationships.json`
   - `[user_agent]/templates/tracking/timeline.json` → `./stories/[novel-name]/tracking/timeline.json`
   - `[user_agent]/templates/tracking/validation-rules.json` → `./stories/[novel-name]/tracking/validation-rules.json`
3. In `character-state.json`: populate the protagonist's name and any major supporting characters already defined in `knowledge/character-profiles.md`.
4. In `plot-tracker.json`: populate the main plot name and first chapter's expected story state from the creative plan.
5. In `validation-rules.json`: populate the protagonist's name, aliases, and any known forbidden terms for that character.
6. Tell the user: "Tracking folder initialized at `./stories/[novel-name]/tracking/`. These JSON files will be updated as chapters are written and cross-checked by the Reviewer command."

Suggest the user run the `/task-manager` command next.

## Supplement Skills

These skills enhance this command's output quality. Check if they are available before proceeding:

| Skill | File | Purpose |
|-------|------|---------|
| `pacing-rhythm` | `[user_agent]/skills/writing-techniques/pacing-rhythm/SKILL.md` | Reference the chosen pacing archetype, assign pacing tags to chapters. |
| `scene-structure` | `[user_agent]/skills/writing-techniques/scene-structure/SKILL.md` | Ensure Scene/Sequel rhythm. |
| `namecraft` | `[user_agent]/skills/writing-techniques/namecraft/SKILL.md` | Suggest names for unnamed arcs, factions, places, titles, abilities, systems, artifacts, and concepts. |
| `strategic-reversal` | `[user_agent]/skills/writing-techniques/strategic-reversal/SKILL.md` | Design contest, tactic, mind-game, bluff, hidden-rule, or clever reversal scenes. |
| `genre-knowledge` | `[user_agent]/skills/genre-knowledge/[genre]/SKILL.md` | Load the genre-specific skill matching the novel's genre. Apply genre-specific pacing patterns, structural conventions, and trope placement. |

If any skill file is not found, inform the user:
> "Supplement skills are available to enhance this command. Download them from:
> https://github.com/JeroTan/novel-writer-english.git
> I'll continue without them, but output quality will be reduced."
