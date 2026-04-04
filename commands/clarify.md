---
description: "Review the specification, identify up to 5 ambiguities, and ask targeted questions to resolve them."
argument-hint: "[Optional: specific area to clarify]"
---

# User Input: $ARGUMENTS

## Objective
Eliminate vagueness from the story specification by identifying and resolving ambiguities.

## Execution Steps

### 1. Read Context
Read `memory/constitution.md` and `stories/[novel-name]/specification.md`.

### 2. Identify Ambiguities
Analyze the specification for:
- Plot holes
- Weak character motivations
- Vague worldbuilding
- Conflicting tones
- Any tags marked `[Needs Clarification]`

### 3. Ask Questions
Present exactly 1 to 5 highly specific, targeted questions to the user. Do not ask more than 5.
Wait for the user to answer.

### 4. Update Specification
Once the user answers, update `stories/[novel-name]/specification.md` directly based on their answers. Remove any resolved `[Needs Clarification]` markers.

### 5. Next Steps
Suggest the user run the `plan` command next.