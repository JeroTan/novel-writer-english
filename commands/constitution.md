---
description: "Create or update your novel's creative constitution — defining non-negotiable creative principles"
argument-hint: "[describe your creative principles]"
---

# User Input: $ARGUMENTS

## Objective

Establish the core principles and values for your novel writing, forming a "constitution" document. These principles will guide all subsequent creative decisions.

## Execution Steps

### 1. Check Existing Documents

**First, check if a constitution already exists:**
- Look for `memory/constitution.md`.
- If it exists, read it and prepare to update it based on the user's input.
- If it doesn't exist, proceed to create a new one.

### 2. Gather Creative Principles

Based on the user's input, gather principles across the following dimensions (if not provided, ask the user or infer from context):

#### Core Values
- What core message or theme should the work convey?
- What are the absolute bottom lines that cannot be crossed?
- What is the fundamental purpose of this creation?

#### Quality Standards
- Requirements for logical consistency.
- Standards for prose quality.
- Commitments to pacing and completion.

#### Style Principles
- Narrative style (concise / ornate / conversational / poetic).
- Pacing control (fast / slow-burn / balanced).
- Emotional tone (action-packed / profound / lighthearted / serious).
- Linguistic features (period-accurate / modern / colloquial / literary).

#### Content Principles
- **Characterization:**
  - Every character must have a complete motivation.
  - Character growth must be logical.
  - Dialogue must match the character's identity.
- **Plot Design:**
  - Principles for designing conflict.
  - Requirements for logical plot twists.
  - Rules for setting up and paying off foreshadowing.
- **Worldbuilding:**
  - Requirements for internal consistency.
  - Standards for realistic details.
  - Rules for cultural or historical accuracy.

#### Reader-Oriented Principles
- Target audience definition.
- Guarantees for reader experience.

### 3. Draft the Constitution Document

Use the following template structure:

```markdown
# Novel Creative Constitution

## Metadata
- Version: [e.g., 1.0.0]
- Creation Date: [YYYY-MM-DD]
- Last Revised: [YYYY-MM-DD]
- Author: [Author Name]
- Project: [Novel Name or "General"]

## Preface
[Explain why this constitution is needed and its binding nature]

## Chapter 1: Core Values

### Principle 1: [Principle Name]
**Declaration**: [Clear statement of the principle]
**Reasoning**: [Why this principle matters]
**Execution**: [How it manifests in the writing]

### Principle 2: [Principle Name]
[Same format as above]

## Chapter 2: Quality Standards

### Standard 1: Logical Consistency
**Requirement**: [Specific requirement]
**Verification**: [How to verify it]
**Consequence**: [Must be fixed if violated]

[More standards...]

## Chapter 3: Creative Style

### Style Principle 1: [Name]
**Definition**: [What this style entails]
**Examples**: [Specific examples]
**Taboos**: [What absolutely NOT to do]

[More style principles...]

## Chapter 4: Content Norms

### Characterization Norms
[Specific norms]

### Plot Design Norms
[Specific norms]

### Worldbuilding Norms
[Specific norms]

## Chapter 5: Reader Contract

### Promises to the Reader
- [Promise 1]
- [Promise 2]

### Bottom Line Guarantees
- [Guarantee 1]
- [Guarantee 2]

## Chapter 6: Revision Procedures

### Triggers for Revision
- Major shift in creative direction.
- Accumulation of beta reader feedback.
- Evolution in personal understanding.

### Revision Process
1. Propose revision.
2. Evaluate impact.
3. Update version.
4. Record changes.

## Appendix: Version History
- v1.0.0 (Date): Initial version
```

### 4. Version Management
- **Major Version**: Significant changes or removal of core principles.
- **Minor Version**: Addition of new principles or chapters.
- **Patch Version**: Phrasing optimizations, clarifications.

### 5. Output and Save
- Save the drafted constitution to `memory/constitution.md`.
- Output a success message detailing the new or updated principles.
- Suggest the next step: Use the `specify` command to define the story specification.

## Execution Rules

### Must Follow
- Principles must be verifiable, not overly abstract.
- Use definitive words like "must," "shall," or "prohibited."
- Every principle must have a clear rationale.

### Should Include
- At least 3-5 core values.
- A clear quality baseline.
- Actionable creative norms.

### Avoid
- Empty slogans (e.g., "strive for excellence").
- Unverifiable requirements.
- Clauses that excessively restrict creativity.

## Example Principles

**Good Principles**:
- "Major characters' actions must have a clear chain of motivation; they must never act 'because the plot requires it'."
- "Every piece of foreshadowing must be paid off or explained within a reasonable timeframe (max 10 chapters)."
- "Never use modern internet slang, as it breaks immersion in a historical setting."

**Bad Principles**:
- "Write well." (Too vague)
- "Pursue artistry." (Unverifiable)
- "Make the reader happy." (Standard is unclear)

## Subsequent Workflow

Once the constitution is established, all subsequent steps MUST follow it:
1. `specify` - Specifications must align with constitutional values.
2. `plan` - Planning must follow constitutional principles.
3. `write` - Drafting must obey constitutional norms.
4. `analyze` - Verification must check constitutional compliance.

Remember: **The Constitution is the highest law, but it can be revised to keep pace with the story's evolution.**