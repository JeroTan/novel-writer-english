---
description: "Break the creative plan into prioritized, dependency-tracked writing tasks."
argument-hint: "[Optional: specific arc or chapters to focus on]"
---

# User Input: $ARGUMENTS

## Objective
Break the creative plan into actionable, tracked tasks to guide the daily writing process.

## Execution Steps

### 1. Read Context
Read `stories/[novel-name]/creative-plan.md` and `stories/[novel-name]/specification.md`.

### 2. Generate Task List
Break down the plan into specific tasks. Types of tasks include:
- Chapter writing
- Character profile refinement
- Worldbuilding documentation
- Review/editing

### 3. Assign Markers
Assign markers to each task to manage workflow:
- `[P]` for tasks that can be done in parallel.
- `[Dep:X]` for tasks that depend on task X.
- `[High Priority]` for critical tasks.
- Include the pacing tag from the plan (e.g., `[Action]`, `[Reflection]`).

For character-heavy scenes, include a note on which characters' psychological depth should be showcased.

Provide an estimated word count or effort level for each task.

### 4. Output Format
The file should start with a header summary:
```markdown
# Task List — [Novel Name]

**Total chapters planned:** [N]
**Estimated total words:** [N]
**Last updated:** [Date]

---
```

Each task entry in `tasks.md` must be formatted as:

```markdown
- [ ] **Chapter X** — [Brief description of what happens] `[PacingTag]` `[P]`|`[Dep:X]`|`[High Priority]` — ~[est. word count] words
```

Example:
```markdown
- [ ] **Chapter 1** — Introduction of the protagonist in the market; first encounter with the antagonist's proxy. `[Setup]` `[High Priority]` — ~2,500 words
- [ ] **Chapter 2** — Protagonist discovers they have a rare ability; forced to flee the city. `[Action]` `[Dep:1]` — ~3,000 words
- [ ] **Chapter 3** — Breather: protagonist reaches a village and reflects on what they left behind. `[Reflection]` `[Dep:2]` — ~2,000 words
```

### 5. Output and Save
Save the task list to `stories/[novel-name]/tasks.md`.
Suggest the user run the `write` command next to begin execution.