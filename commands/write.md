---
description: "AI-assisted chapter writing utilizing the Pre-Write Checklist to maintain consistency."
argument-hint: "[Chapter number or specific task to write]"
---

# User Input: $ARGUMENTS

## Objective
Draft a chapter of the novel while strictly maintaining consistency with the planning documents via the Pre-Write Checklist.

## Execution Steps

### 1. The Pre-Write Checklist (CRITICAL)
Before writing ANY chapter, you MUST review this context:
1. **Constitution**: Read `memory/constitution.md`
2. **Specification**: Read `stories/[novel-name]/specification.md`
3. **Plan**: Read `stories/[novel-name]/creative-plan.md` (specifically the section for this chapter)
4. **Characters**: Review relevant character profiles in `templates/knowledge/character-profiles.md`
5. **Previous Chapter**: Review the preceding chapter (if it exists) to match tone and continuity.
6. **Goals**: Identify what must be accomplished in THIS chapter.

### 2. Draft the Chapter
Write the chapter based on the user's instructions and the loaded context. 
Strictly adhere to the established tone, pacing, and constraints.
Do not rush the pacing; let the scene breathe. Show, don't tell.

### 3. Output and Save
Save the chapter to `stories/[novel-name]/content/chapter-[XX].md`.

### 4. Update Tasks
Update `stories/[novel-name]/tasks.md` to mark the relevant task as complete.