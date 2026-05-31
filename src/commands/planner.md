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

**Important**: The AI is a tool. You control the direction. You can always replan, add arcs, or change course later.

### 4. Draft the Creative Plan

Help the user design the technical implementation of their story. The plan structure adapts based on the chosen mode:

#### For Full Novel Plan or Arc Plan:

**1. Structural Approach**
- State the chosen narrative structure (e.g., 3-Act, 7-Point, Hero's Journey).
- For saga/arc mode: identify which arc this is and its role in the larger story.

**2. Arc Overview** (for saga/arc mode)
- Arc name and chapter range (e.g., "Arc 1: The Awakening — Chapters 1–12")
- Arc goal: what must be accomplished by the end of this arc
- How this arc connects to the larger story

**3. Chapter Breakdown**
- A high-level outline of the chapters in this plan.
- What happens in each chapter?
- Assign a **pacing tag** to every chapter (see below).

**4. Pacing & Tension**
- Where are the high-tension action moments?
- Where are the quiet, reflective scenes?
- Read the pacing preference from `./memory/constitution.md` (Chapter 7: Pacing Strategy).
- Apply that pacing archetype to the chapter breakdown.

**5. Foreshadowing Plan**
- What elements need to be set up early for later payoffs?

**6. Character Arc Mapping**
- How do the characters change over the course of these planned chapters?

#### For Batch Plan or Light Plan:

**1. Next Chapters Overview**
- List the next N chapters with a 1–2 sentence beat summary each.
- Assign a **pacing tag** to each chapter:
  - `[Setup]` — introducing characters, world, or situation
  - `[Action]` — conflict, chase, fight, confrontation
  - `[Reflection]` — processing events, character growth, quiet moments
  - `[Transition]` — moving between locations, time skips, bridging scenes
  - `[Climax]` — peak tension, major confrontation, turning point
  - `[Breather]` — cooldown, humor, slice-of-life, recovery
- You don't need a full 7-point structure for a batch. Just suggest the right tag based on where the story is.

**2. Continuity Notes**
- What needs to carry over from the previous chapter(s)?
- Any unresolved threads, character states, or open questions?

**3. Open Questions**
- What might need to be decided before or during writing?
- Flag anything that could benefit from a `/clarify` session.

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
| `genre-knowledge` | `[user_agent]/skills/genre-knowledge/[genre]/SKILL.md` | Load the genre-specific skill matching the novel's genre. Apply genre-specific pacing patterns, structural conventions, and trope placement. |

If any skill file is not found, inform the user:
> "Supplement skills are available to enhance this command. Download them from:
> https://github.com/JeroTan/novel-writer-english.git
> I'll continue without them, but output quality will be reduced."
