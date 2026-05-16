---
description: "AI-assisted chapter writing utilizing the Pre-Write Checklist to maintain consistency."
argument-hint: "[Chapter number or specific task to write]"
---

# User Input: $ARGUMENTS

## Objective
Draft a chapter of the novel while strictly maintaining consistency with the planning documents via the Pre-Write Checklist.

## Execution Steps

### 1. Write Mode Selection
Before writing anything, ask the user:

```
How would you like to write?

1. **One by one** — I write one chapter, show it to you, and wait for your approval before continuing.
2. **Batch** — I write several chapters in a row then pause. How many per batch?
3. **All at once** — I write all remaining unfinished chapters without stopping. ⚠️ Warning: this may consume significantly more tokens.
```

Store the chosen mode and follow it strictly.

### 2. Draft Detection & Processing
Before writing any chapter, check for draft files:
1. Look for a folder at `draft/chapters/` (relative to project root).
2. Accept any of these naming conventions for chapter files: `chapter_00001.md` (preferred), `0001.md`, `1.md`, `01.md`, `chapter-1.md`, `chapter 1.md`, `ch1.md`, `[1-5].md` (range files cover multiple chapters), or any file whose name starts with a chapter number.
3. **If drafts are found**: inform the user — "I found draft files in `draft/chapters/`. I'll use them as structural guidance, but `specification.md`, `creative-plan.md`, `knowledge/`, and `tracking/` take priority. If the draft conflicts with core documents, core documents win."
4. **Draft Priority Rule**: Use the draft as an outline. Verify every scene against core documents. If a draft contradicts a core document, follow the core document. After saving, tell the user directly which scenes were changed from the draft and why. Optionally, save these notes to `stories/[novel-name]/content/chapter_[N].notes.md` if there are multiple deviations.
5. **Special Draft Tags**: Detect and process these tags in drafts:
   - `@#@ FILL @#@ [Description] @#@ END FILL @#@`: Replace with fully written prose based on the description.
   - `@#@ DESCRIBE @#@ [Description] @#@ END DESCRIBE @#@`: Rewrite with light-novel style sensory intensity. Do not change the core action.
   - `@#@ FLASHBACK @#@ [Description] @#@ END FLASHBACK @#@`: Write a full flashback sequence reading all available context before writing.

### 3. CRITICAL: Pre-Write Checklist
Before writing ANY chapter, silently run through all 12 items:

1. **Constitution** — Read `memory/constitution.md`
2. **Specification** — Read `stories/[novel-name]/specification.md`
3. **Plan** — Read the relevant section of `stories/[novel-name]/creative-plan.md`
4. **Style Guide** — Check `knowledge-base/styles/` if a specific style is defined
5. **Characters & Settings** — Read `stories/[novel-name]/knowledge/characters.md`, `knowledge/character-voices.md`, and `knowledge/locations.md`. If these files do not exist, look for any folder named `knowledge/` in the project. If still not found, ask the user to run the Specify step to generate the knowledge folder, or create it manually. Suggest a standard folder structure for easy future reference.
6. **World** — Read `stories/[novel-name]/knowledge/world-setting.md` for world rules, magic/tech systems, and geography.
7. **Previous Chapter** — Read the immediately preceding chapter in `stories/[novel-name]/content/` to match tone and continuity.
8. **Goals** — Identify what MUST be accomplished in THIS chapter per the plan and tasks.
9. **Risks** — Identify common pitfalls for this scene type based on genre and pacing tag.
10. **Emotional Goals** — What emotional arc does the POV character travel in this chapter? What emotional state should the reader reach by the end?
11. **Pacing Type** — Check the chapter's pacing tag in `tasks.md` (`[Action]`, `[Reflection]`, `[Climax]`, etc.). Write accordingly.
12. **Internal Reactions** — Plan at least 2–3 moments of character interiority. Do not let the chapter become pure external action.

### 4. Draft the Chapter
Write the chapter based on the user's instructions and the loaded context.
Strictly adhere to the established tone, pacing, and constraints.
Do not rush the pacing; let the scene breathe. Show, don't tell.
- Vary sentence length. Avoid 3+ consecutive sentence fragments.
- After every significant event, include the POV character's internal reaction before moving to the next action.
- Show emotions through physical sensations and behavior, not by naming them directly.

### 5. Chapter Output Format
Every generated chapter MUST follow this exact structure:
Save the chapter file as `stories/[novel-name]/content/chapter_[N].md` where `[N]` is zero-padded to 5 digits (e.g. `chapter_00001.md`, `chapter_00012.md`).

```markdown
# Chapter [N]: [Chapter Title — if no title, use a thematic phrase from the chapter content]

[Chapter body]

---

*[Mini summary: 2–4 sentences. What happened, where it ended, and what changed. Written in present tense.]*
```

### 6. Update Tracking After Writing
After saving each completed chapter, update the tracking files:
- `tracking/character-state.json` — update protagonist's current location, chapter, status, and any new possessions or knowledge. Update the `lastSeen` for supporting characters that appeared.
- `tracking/plot-tracker.json` — update `currentState.chapter`, mark completed plot nodes, add new foreshadowing entries if any.
- `tracking/timeline.json` — add new events from the chapter with in-story dates.
- `tracking/relationships.json` — if any relationships changed or new meetings occurred, log the change.

### 7. Task Checklist Update
After writing a chapter, also mark the corresponding task in `stories/[novel-name]/tasks.md` as complete by changing `- [ ]` to `- [x]`.