---
name: planner
description: "Step 4: Creates chapter structure, pacing, foreshadowing plan, and character arc mapping."
tools:
  - "*"
kind: local
argument-hint: "[Optional: structural preference, e.g., 3-act, Save the Cat]"
---

# User Input: $ARGUMENTS

## Objective

Create a detailed technical and creative plan based on the clarified specification. This document defines HOW the story will be told.

## Execution Steps

### 1. Check Existing Plan

Check if `./stories/[novel-name]/creative-plan.md` already exists.
- If it exists, ask the user:
  - **Update** — modify existing sections while keeping the rest intact.
  - **Replace** — discard the current plan and start fresh.
  - **Increment** — append new chapters/arcs to the end without changing existing content.
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
- Ask the user:
  - **Follow draft** — use the draft structure as the foundation for the creative plan, filling in gaps where needed.
  - **Use as reference** — read the drafts for context but build the plan independently from the specification and constitution.
  - **Ignore drafts** — build the plan from scratch without considering the drafts.

**If no drafts are found**: proceed to build the plan from the specification and constitution.

### 3. Draft the Creative Plan

Help the user design the technical implementation of their story by creating a document with the following sections:

**1. Structural Approach**
- State the chosen narrative structure (e.g., 3-Act, 7-Point, Hero's Journey).

**2. Chapter Breakdown**
- A high-level outline of the chapters (or at least the next major arc).
- What happens in each chapter?

**3. Pacing & Tension**
- Where are the high-tension action moments?
- Where are the quiet, reflective scenes?
- Read the pacing preference from `./memory/constitution.md` (Chapter 7: Pacing Strategy).
- Apply that pacing archetype to the chapter breakdown.
- Assign a **pacing tag** to every chapter: `[Action]`, `[Reflection]`, `[Transition]`, `[Climax]`, `[Breather]`, `[Setup]`.
- If pacing preference is "Balanced", ensure at least 1 reflection/breather chapter for every 2-3 action chapters.
- If pacing preference is "Relentless Action", acknowledge but still recommend at least one brief cooldown per arc.

**4. Foreshadowing Plan**
- What elements need to be set up early for later payoffs?

**5. Character Arc Mapping**
- How do the characters change over the course of these planned chapters?

### 4. Output and Save

Save the document to `./stories/[novel-name]/creative-plan.md`.

### 5. Post-Plan: Initialize Tracking Folder

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
6. Tell the user: "Tracking folder initialized at `./stories/[novel-name]/tracking/`. These JSON files will be updated by the Write command after each chapter and cross-checked by the Analyze command."

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
