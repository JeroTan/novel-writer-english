---
description: "Run a quality analysis on written content or the story framework."
argument-hint: "[framework | content]"
---

# User Input: $ARGUMENTS

## Objective
Provide rigorous quality assurance on the user's story planning (framework) or execution (content).

## Execution Steps

### 1. Determine Analysis Type
Determine if the user wants a **Framework Analysis** (reviewing the spec/plan) or a **Content Analysis** (reviewing written chapters).

### 2. Framework Analysis
- Read `memory/constitution.md`, `specification.md`, and `creative-plan.md`.
- Check for plot holes, pacing issues, weak motivations, or violations of the constitution.

### 3. Content Analysis
- Read the target chapters in `stories/[novel-name]/content/`.
- Verify compliance with the Constitution.
- Verify fulfillment of the Specification and Plan.
- Check for internal consistency (timeline, character behavior, setting details).
- Evaluate against quality standards (e.g., show-don't-tell, dialogue naturalness).
- **Fragment Check**: Scan for 3+ consecutive sentence fragments.
- **Report-Style Check**: Scan for 3+ consecutive "Subject did X" sentences with no interior reaction.
- **Emotional Depth Check**: Does the POV character have at least 2 internal reactions per chapter?
- **Pacing Compliance**: Does the chapter's tone match its assigned pacing tag from the plan?

### 4. Output Report
Provide a structured report with actionable feedback. Do NOT rewrite the text automatically unless the user explicitly asks you to fix the identified issues.