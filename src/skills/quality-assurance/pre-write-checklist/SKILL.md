---
name: pre-write-checklist
description: "Activates automatically before writing a chapter. Ensures the AI loads the Constitution, Specification, Plan, and relevant character/setting context to prevent hallucination and maintain consistency."
---

# Pre-Write Checklist Skill

**TRIGGER**: Whenever the user asks to "write chapter X" or execute a writing task.

## Instructions for AI
Before generating any story text, you MUST perform this internal checklist:

1. **Verify Constitution:** Have you read `memory/constitution.md`? If not, ask the user for it or read it if available.
2. **Verify Specification:** Have you read the story specification? What are the core requirements?
3. **Verify Plan:** Have you read the creative plan for THIS specific chapter? What is the goal of this scene?
4. **Verify Context:** Do you know who is in this scene? Do you know where they are?
5. **Verify Previous Chapter:** Do you know how the previous chapter ended?
6. **Emotional Goals:** What emotional state should the reader be in at the END of this chapter? What emotional journey does the POV character take?
7. **Pacing Type Verification:** Check the chapter's assigned pacing tag from `creative-plan.md`. Is this an action chapter? Reflection? Transition? Write accordingly.
8. **Character Interiority Reminder:** Plan at least 2-3 moments of internal reaction per chapter. Don't let the scene become pure external action.

**If you lack this context, you must ask the user to provide it or use your file reading tools to acquire it before writing.**

Never write "blind." Long-form novel generation fails because the AI forgets the core rules established in the planning phase. This checklist prevents that degradation.