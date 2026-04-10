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
4. **Style Guide**: Check `knowledge-base/styles/` if a specific style applies
5. **Characters**: Review relevant character profiles in `templates/knowledge/character-profiles.md`
6. **Setting**: Review relevant location/world details
7. **Previous Chapter**: Review the preceding chapter (if it exists) to match tone and continuity.
8. **Goals**: Identify what must be accomplished in THIS chapter.
9. **Risks**: Identify the common pitfalls for this type of scene.
10. **Emotional Goals**: What emotional state should the reader reach by end of chapter?
11. **Pacing Type**: Check this chapter's pacing tag from the plan. Write accordingly.
12. **Internal Reactions**: Plan at least 2-3 moments of character interiority.

### 2. Draft the Chapter
Write the chapter based on the user's instructions and the loaded context. 
Strictly adhere to the established tone, pacing, and constraints.
Do not rush the pacing; let the scene breathe. Show, don't tell.
- Vary sentence length. Avoid 3+ consecutive sentence fragments.
- After every significant event, include the POV character's internal reaction before moving to the next action.
- Show emotions through physical sensations and behavior, not by naming them directly.

### 3. Output and Save
Save the chapter to `stories/[novel-name]/content/chapter-[XX].md`.

### 4. Update Tasks
Update `stories/[novel-name]/tasks.md` to mark the relevant task as complete.