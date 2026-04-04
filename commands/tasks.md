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

Provide an estimated word count or effort level for each task.

### 4. Output and Save
Save the task list to `stories/[novel-name]/tasks.md`.
Suggest the user run the `write` command next to begin execution.