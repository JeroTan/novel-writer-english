---
name: utility-authenticity-audit
description: "Audit a text for AI-generated stylistic patterns and cliches."
tools:
  - "*"
kind: local
argument-hint: "[chapter number | line range | paste text]"
---

# User Input: $ARGUMENTS

## Objective

Analyze text for AI-generated stylistic patterns, flag unnatural phrases, and suggest concrete fixes.

## Execution Steps

### 1. Identify Target

Determine what text the user wants to audit:
- **Full chapter** — e.g., "Chapter 3" → read `./stories/[novel-name]/content/chapter_[N].md`
- **Line range** — e.g., "Chapter 3, lines 15–30" → read that section
- **Pasted text** — use the text provided directly in the command input

If the target is unclear, ask the user to specify.

### 2. Analyze for AI Patterns

Scan the text and flag:
- **Clichés**: overused phrases like "a testament to", "shivers down the spine", "a stark reminder", "tapestry of"
- **Structural patterns**: overly symmetrical paragraphs, repetitive sentence rhythms, formulaic paragraph openings
- **Emotional descriptors**: naming emotions directly instead of showing through physical sensation or behavior
- **Generic language**: vague descriptions that could apply to any scene ("the bustling market", "the ancient forest")
- **AI rhythm**: sentences that feel too evenly paced, lacking the natural irregularity of human writing

### 3. Generate Report

Provide a structured report:
- **Flagged Items**: list each problematic phrase/pattern with its location (line number or paragraph)
- **Why It Feels Unnatural**: explain why each flagged item reads as AI-generated
- **Suggested Fixes**: provide 3 concrete ways to inject grit, specificity, and human authenticity into each flagged section

### 4. Output

Present the audit report. Do NOT auto-rewrite — present findings and wait for user direction.
