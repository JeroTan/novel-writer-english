---
name: utility-authentic-voice
description: "Rewrite a passage to remove AI cliches and enforce authentic human voice."
tools:
  - "*"
kind: local
argument-hint: "[chapter number | line range | paste text]"
---

# User Input: $ARGUMENTS

## Objective

Rewrite a passage to remove AI tells and enforce authentic, human-sounding prose.

## Execution Steps

### 1. Identify Target

Determine what text the user wants to rewrite:
- **Full chapter** — e.g., "Chapter 3" → read `./stories/[novel-name]/content/chapter_[N].md`
- **Line range** — e.g., "Chapter 3, lines 15–30" → read that section
- **Pasted text** — use the text provided directly in the command input

If the target is unclear, ask the user to specify.

### 2. Analyze for AI Tells

Scan the text for common AI patterns:
- Clichés: "a testament to", "shivers down the spine", "a stark reminder"
- Overly symmetrical or balanced paragraph structures
- Generic emotional descriptors instead of specific physical sensations
- Repetitive sentence openings or rhythm patterns
- Vague sensory details ("the room felt cold") instead of specific ones ("frost crept along the windowpane in jagged veins")

### 3. Rewrite

Apply the following transformations:
- Remove identified AI tells and replace with specific, grounded language
- Introduce varied sentence lengths — mix short, punchy sentences with longer, flowing ones
- Add specific sensory details unique to the scene (not generic)
- Introduce slight imperfections in dialogue — interruptions, trailing thoughts, awkward pauses
- Ensure the prose feels lived-in, not polished to sterility

### 4. Output

Present the revised text. Highlight what was changed and why, so the user understands the improvements.
