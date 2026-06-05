---
name: writer
description: "Step 6: AI-assisted writing command. Implements Write Mode, Draft Detection, and a 13-item pre-write checklist to maintain consistency and context. Supports full-novel, per-arc, or batch writing."
tools:
  - "*"
kind: local
argument-hint: "[Chapter number or specific task to write]"
---

# User Input: $ARGUMENTS

## Objective

Draft a chapter of the novel while strictly maintaining consistency with the planning documents via the Pre-Write Checklist. The writer works with whatever plan is available — full novel, single arc, or a small batch.

## Execution Steps

### 1. Check Existing Chapter

Check if the target chapter already exists in `./stories/[novel-name]/content/`.
- If it exists, ask the user:
  - **Update** — modify the existing chapter while keeping the core structure intact.
  - **Replace** — discard the current chapter and rewrite from scratch.
  - **Increment** — extend the chapter by adding new scenes or content.
- If it does not exist, proceed to create a new chapter.

### 2. Determine Current Story Position

Check the creative plan, task list, and existing chapters to understand where the story is:
- Read `./stories/[novel-name]/tasks.md` to find the next pending chapter task.
- Check `./stories/[novel-name]/content/` for the last written chapter.
- Check `./stories/[novel-name]/creative-plan.md` to find the exact target chapter section under its saga/arc or batch.

For the target chapter, extract from `creative-plan.md` when available:
- chapter title
- chapter summary
- chapter Flow
- Continuity Notes
- pacing tag
- parent saga/arc goal and constraints
- any Strategic Reversal / Contest Design note

Use the task line only to choose what to write next and update status. Use the planner chapter section as the main idea source for what the chapter should contain.

If the plan only covers a few chapters (batch mode), that's fine — work with what's available. You can always replan later.

### 3. Write Mode Selection

Before writing anything, ask the user:

```
How would you like to write?

1. **One by one** — I write one chapter, show it to you, and wait for your approval before continuing.
2. **Batch** — I write several chapters in a row then pause. How many per batch?
3. **All at once** — I write all remaining unfinished chapters without stopping. ⚠️ Warning: this may consume significantly more tokens.
```

Store the chosen mode and follow it strictly.

### 4. Draft Detection & Processing

Before writing any chapter, check for draft files:
1. Look for a folder at `./draft/chapters/` (relative to project root).
2. Accept any of these naming conventions for chapter files: `chapter_00001.md` (preferred), `0001.md`, `1.md`, `01.md`, `chapter-1.md`, `chapter 1.md`, `ch1.md`, `[1-5].md` (range files cover multiple chapters), or any file whose name starts with a chapter number.
3. **If drafts are found**: inform the user — "I found draft files in `./draft/chapters/`. I'll use the draft together with the matching chapter section in `creative-plan.md`. The planner's chapter Summary, Flow, Continuity Notes, pacing, and arc constraints are the main guide; the draft supplies user-written scene material and wording direction. If the draft conflicts with core documents, core documents win."
4. **Draft Priority Rule**: Use the draft as an outline and prose/source-material guide, then align it to the matching planner chapter section. Verify every scene against core documents. If a draft contradicts the planner, specification, knowledge, or tracking, follow the core documents unless the user explicitly approves changing canon. After saving, tell the user directly which scenes were changed from the draft and why. Optionally, save these notes to `./stories/[novel-name]/content/chapter_[N].notes.md` if there are multiple deviations.
5. **Special Draft Tags**: Detect and process these tags in drafts:
   - `@#@ FILL @#@ [Description] @#@ END FILL @#@`: Replace with fully written prose based on the description.
   - `@#@ DESCRIBE @#@ [Description] @#@ END DESCRIBE @#@`: Rewrite with light-novel style sensory intensity. Do not change the core action.
   - `@#@ FLASHBACK @#@ [Description] @#@ END FLASHBACK @#@`: Write a full flashback sequence reading all available context before writing.

### 5. CRITICAL: Pre-Write Checklist

Before writing ANY chapter, silently run through all 13 items:

1. **Constitution** — Read `./memory/constitution.md`
2. **Specification** — Read `./stories/[novel-name]/specification.md`
3. **Plan** — Read the exact target chapter section in `./stories/[novel-name]/creative-plan.md`, including its parent saga/arc or batch. Use its Summary, Flow, Continuity Notes, pacing tag, Strategic Reversal note if present, and arc constraints as the main writing brief.
4. **Style Guide** — Check `./knowledge-base/styles/` if a specific style is defined
5. **Characters & Settings** — Read ONLY the character and location entries relevant to THIS chapter. Check `./stories/[novel-name]/knowledge/character-profiles.md`, `./stories/[novel-name]/knowledge/character-voices.md`, and `./stories/[novel-name]/knowledge/locations.md` for characters appearing or locations featured in the chapter. Do not load unrelated entries. If these files do not exist, look for any folder named `knowledge/` in the project. If still not found, ask the user to run the Specify step to generate the knowledge folder, or create it manually. Suggest a standard folder structure for easy future reference.
6. **World** — Read `./stories/[novel-name]/knowledge/world-setting.md` for world rules, magic/tech systems, and geography.
7. **Glossary** — Read `./stories/[novel-name]/knowledge/glossary.md` for defined terms, names, jargon, and in-world vocabulary. Use exact terminology from the glossary when referencing established concepts, factions, items, or locations. If you encounter a term in the draft or plan that isn't in the glossary, note it for the user to define later.
   - **Strategic Reference**: If the target chapter involves a contest, tactic, mind game, negotiation trap, clever win, hidden rule, bluff, or strategic reversal, read `./stories/[novel-name]/knowledge/strategic-reversals.md` if it exists. Skip this file when the plan marks strategic reversal as `[N/A]` or the chapter does not use that scene type.
8. **Previous Chapter** — Read the immediately preceding chapter in `./stories/[novel-name]/content/` to match tone and continuity.
   - **Continuation sequences**: If the pacing tag is numbered (e.g., `[Action 2]`, `[Action 3]`), also read the previous chapter in that sequence (e.g., `[Action 1]`) to ensure seamless continuity of action, character state, dialogue threads, and unresolved tension. The writer must pick up exactly where the previous chapter left off.
   - **Arc transitions**: If this is the first chapter of a new arc, read the **last chapter of the previous arc** to understand what was resolved and what carries over.
9. **Goals** — Identify what MUST be accomplished in THIS chapter from the planner chapter section first, then confirm the task line matches it.
10. **Risks** — Identify common pitfalls for this scene type based on genre and pacing tag.
11. **Emotional Goals** — What emotional arc does the POV character travel in this chapter? What emotional state should the reader reach by the end?
12. **Pacing Type** — Check the chapter's pacing tag in `./stories/[novel-name]/creative-plan.md` (`[Action]`, `[Reflection]`, `[Climax]`, `[Setup]`, etc.). Write accordingly.
    - **Numbered tags** (e.g., `[Action 2]`, `[Climax 3]`): This chapter is part of a multi-chapter sequence. Maintain continuity with the previous chapter(s) in the sequence. Do not resolve the arc unless this is the final number. Keep tension, character state, and scene momentum flowing from the previous chapter.
    - **Single tags** (e.g., `[Action]`, `[Reflection]`): Self-contained chapter. Resolve the scene's core beat within this chapter.
    - **No tag yet**: If the chapter hasn't been assigned a pacing tag, infer it from the plan or ask the user what tone they want for this chapter.
13. **Internal Reactions** — Plan at least 2–3 moments of character interiority. Do not let the chapter become pure external action.

### 6. Draft the Chapter

Write the chapter based on the planner chapter section, the user's instructions, and any compatible draft material.
Strictly adhere to the established tone, pacing, and constraints.
Do not rush the pacing; let the scene breathe. Show, don't tell.
- Vary sentence length. Avoid 3+ consecutive sentence fragments.
- After every significant event, include the POV character's internal reaction before moving to the next action.
- Show emotions through physical sensations and behavior, not by naming them directly.

Use punctuation for emotional effect deliberately. If available, load `[user_agent]/skills/writing-techniques/punctuation-emotional-effect/SKILL.md` and follow its rules for shouting, hesitation, interruption, silence, emphasis, and dialogue punctuation.

If the chapter depends on witty banter, comedic escalation, teasing, straight-man/chaos-speaker dynamics, or exposition through argument, load `[user_agent]/skills/writing-techniques/comedic-banter-rhythm/SKILL.md` when available. Make humor reveal character, shift status, or increase pressure.

If the chapter must introduce a proper noun that is still `[TBD]`, `[TENTATIVE]`, unnamed, or generic, load `[user_agent]/skills/writing-techniques/namecraft/SKILL.md` when available. For major characters, factions, systems, artifacts, and locations, propose options and ask before locking the name. For minor throwaway characters, choose a genre-fit name and record it in the relevant knowledge file.

If the chapter uses a Strategic Reversal / Contest Design note, load `[user_agent]/skills/writing-techniques/strategic-reversal/SKILL.md` when available. Make the visible rules clear, seed the hidden lever before payoff, let the opponent have a believable plan, and make the win change the story state with a cost or consequence.

### 7. Chapter Output Format

Every generated chapter MUST follow this exact structure:
Save the chapter file as `./stories/[novel-name]/content/chapter_[N].md` where `[N]` is zero-padded to 5 digits (e.g. `chapter_00001.md`, `chapter_00012.md`, `chapter_00100.md`).

```markdown
# Chapter [N]: [Chapter Title — if no title, use a thematic phrase from the chapter content]

[Chapter body]

---

*[Mini summary: 2–4 sentences. What happened, where it ended, and what changed. Written in present tense.]*
```

### 8. Task Status Update

After writing a chapter, update its status in `./stories/[novel-name]/tasks.md` from `[ ]` to `[FOR_REVIEW]`. Do NOT mark it as `[DONE]` — that is the reviewer's responsibility after editing and broad QA.

### 9. Handoff to Editor

After writing a chapter, suggest the user run `/editor Chapter [N]` to check that chapter, approve or skip suggested fixes, and apply approved edits. Periodically (e.g., every 3-5 chapters) or when requested, suggest `/reviewer` for broad QA, knowledge updates, and `[DONE]` approval.

## Supplement Skills

These skills enhance this command's output quality. Check if they are available before proceeding:

| Skill | File | Purpose |
|-------|------|---------|
| `pre-write-checklist` | `[user_agent]/skills/quality-assurance/pre-write-checklist/SKILL.md` | MANDATORY pre-flight check before writing. |
| `emotional-interiority` | `[user_agent]/skills/writing-techniques/emotional-interiority/SKILL.md` | Ensure internal reactions. |
| `dialogue-techniques` | `[user_agent]/skills/writing-techniques/dialogue-techniques/SKILL.md` | Ensure subtext in dialogue. |
| `comedic-banter-rhythm` | `[user_agent]/skills/writing-techniques/comedic-banter-rhythm/SKILL.md` | Use when drafting witty banter, comedic escalation, or exposition through argument. |
| `namecraft` | `[user_agent]/skills/writing-techniques/namecraft/SKILL.md` | Suggest or validate names for characters, factions, places, titles, systems, abilities, artifacts, and concepts. |
| `pacing-rhythm` | `[user_agent]/skills/writing-techniques/pacing-rhythm/SKILL.md` | Verify chapter matches its pacing tag. |
| `punctuation-emotional-effect` | `[user_agent]/skills/writing-techniques/punctuation-emotional-effect/SKILL.md` | Use punctuation deliberately for emotion, rhythm, silence, and intensity. |
| `strategic-reversal` | `[user_agent]/skills/writing-techniques/strategic-reversal/SKILL.md` | Write contest, tactic, mind-game, bluff, hidden-rule, or clever reversal scenes that feel surprising and fair. |
| `character-depth` | `[user_agent]/skills/writing-techniques/character-depth/SKILL.md` | Verify character voice matches their psychology. |
| `genre-knowledge` | `[user_agent]/skills/genre-knowledge/[genre]/SKILL.md` | Load the genre-specific skill matching the novel's genre. Ensure prose, pacing, and scene construction match genre expectations. |

If any skill file is not found, inform the user:
> "Supplement skills are available to enhance this command. Download them from:
> https://github.com/JeroTan/novel-writer-english.git
> I'll continue without them, but output quality will be reduced."
