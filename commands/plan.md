---
description: "Create chapter structure, pacing, foreshadowing plan, and character arc mapping."
argument-hint: "[Optional: structural preference, e.g., 3-act, Save the Cat]"
---

# User Input: $ARGUMENTS

## Objective
Create a detailed technical and creative plan based on the clarified specification. This document defines HOW the story will be told.

## Execution Steps

### 1. Read Context
Read `memory/constitution.md` and `stories/[novel-name]/specification.md`.

### 2. Draft the Creative Plan
Help the user design the technical implementation of their story by creating a document with the following sections:

**1. Structural Approach**
- State the chosen narrative structure (e.g., 3-Act, 7-Point, Hero's Journey).

**2. Chapter Breakdown**
- A high-level outline of the chapters (or at least the next major arc).
- What happens in each chapter?

**3. Pacing & Tension**
- Where are the high-tension action moments?
- Where are the quiet, reflective scenes?
- Read the pacing preference from `memory/constitution.md` (Chapter 4: Pacing Strategy).
- Apply that pacing archetype to the chapter breakdown.
- Assign a **pacing tag** to every chapter: `[Action]`, `[Reflection]`, `[Transition]`, `[Climax]`, `[Breather]`, `[Setup]`.
- If pacing preference is "Balanced", ensure at least 1 reflection/breather chapter for every 2-3 action chapters.
- If pacing preference is "Relentless Action", acknowledge but still recommend at least one brief cooldown per arc.

**4. Foreshadowing Plan**
- What elements need to be set up early for later payoffs?

**5. Character Arc Mapping**
- How do the characters change over the course of these planned chapters?

### 3. Output and Save
Save the document to `stories/[novel-name]/creative-plan.md`.
Suggest the user run the `tasks` command next.