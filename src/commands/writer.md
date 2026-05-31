---
name: writer
description: "Step 6: AI-assisted writing command. Implements Write Mode, Draft Detection, and a 12-item pre-write checklist to maintain consistency and context. Supports full-novel, per-arc, or batch writing."
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
- Read `./stories/[novel-name]/tasks.md` to find the next pending task.
- Check `./stories/[novel-name]/content/` for the last written chapter.
- Check `./stories/[novel-name]/creative-plan.md` to understand:
  - **Are we in a saga with multiple arcs?** If so, which arc is this chapter part of?
  - **Is this a batch plan?** If so, what's the scope of this batch?
  - **What's the pacing tag for this chapter?** (e.g., `[Setup]`, `[Action]`, `[Reflection]`)

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
3. **If drafts are found**: inform the user — "I found draft files in `./draft/chapters/`. I'll use them as structural guidance, but `specification.md`, `creative-plan.md`, `knowledge/`, and `tracking/` take priority. If the draft conflicts with core documents, core documents win."
4. **Draft Priority Rule**: Use the draft as an outline. Verify every scene against core documents. If a draft contradicts a core document, follow the core document. After saving, tell the user directly which scenes were changed from the draft and why. Optionally, save these notes to `./stories/[novel-name]/content/chapter_[N].notes.md` if there are multiple deviations.
5. **Special Draft Tags**: Detect and process these tags in drafts:
   - `@#@ FILL @#@ [Description] @#@ END FILL @#@`: Replace with fully written prose based on the description.
   - `@#@ DESCRIBE @#@ [Description] @#@ END DESCRIBE @#@`: Rewrite with light-novel style sensory intensity. Do not change the core action.
   - `@#@ FLASHBACK @#@ [Description] @#@ END FLASHBACK @#@`: Write a full flashback sequence reading all available context before writing.

### 5. CRITICAL: Pre-Write Checklist

Before writing ANY chapter, silently run through all 12 items:

1. **Constitution** — Read `./memory/constitution.md`
2. **Specification** — Read `./stories/[novel-name]/specification.md`
3. **Plan** — Read the relevant section of `./stories/[novel-name]/creative-plan.md`. If the plan is a batch plan, read only the section covering this chapter's range.
4. **Style Guide** — Check `./knowledge-base/styles/` if a specific style is defined
5. **Characters & Settings** — Read ONLY the character and location entries relevant to THIS chapter. Check `./stories/[novel-name]/knowledge/character-profiles.md`, `./stories/[novel-name]/knowledge/character-voices.md`, and `./stories/[novel-name]/knowledge/locations.md` for characters appearing or locations featured in the chapter. Do not load unrelated entries. If these files do not exist, look for any folder named `knowledge/` in the project. If still not found, ask the user to run the Specify step to generate the knowledge folder, or create it manually. Suggest a standard folder structure for easy future reference.
6. **World** — Read `./stories/[novel-name]/knowledge/world-setting.md` for world rules, magic/tech systems, and geography.
7. **Glossary** — Read `./stories/[novel-name]/knowledge/glossary.md` for defined terms, names, jargon, and in-world vocabulary. Use exact terminology from the glossary when referencing established concepts, factions, items, or locations. If you encounter a term in the draft or plan that isn't in the glossary, note it for the user to define later.
8. **Previous Chapter** — Read the immediately preceding chapter in `./stories/[novel-name]/content/` to match tone and continuity.
   - **Continuation sequences**: If the pacing tag is numbered (e.g., `[Action 2]`, `[Action 3]`), also read the previous chapter in that sequence (e.g., `[Action 1]`) to ensure seamless continuity of action, character state, dialogue threads, and unresolved tension. The writer must pick up exactly where the previous chapter left off.
   - **Arc transitions**: If this is the first chapter of a new arc, read the **last chapter of the previous arc** to understand what was resolved and what carries over.
9. **Goals** — Identify what MUST be accomplished in THIS chapter per the plan and tasks.
10. **Risks** — Identify common pitfalls for this scene type based on genre and pacing tag.
11. **Emotional Goals** — What emotional arc does the POV character travel in this chapter? What emotional state should the reader reach by the end?
12. **Pacing Type** — Check the chapter's pacing tag in `./stories/[novel-name]/tasks.md` (`[Action]`, `[Reflection]`, `[Climax]`, `[Setup]`, etc.). Write accordingly.
    - **Numbered tags** (e.g., `[Action 2]`, `[Climax 3]`): This chapter is part of a multi-chapter sequence. Maintain continuity with the previous chapter(s) in the sequence. Do not resolve the arc unless this is the final number. Keep tension, character state, and scene momentum flowing from the previous chapter.
    - **Single tags** (e.g., `[Action]`, `[Reflection]`): Self-contained chapter. Resolve the scene's core beat within this chapter.
    - **No tag yet**: If the chapter hasn't been assigned a pacing tag, infer it from the plan or ask the user what tone they want for this chapter.
13. **Internal Reactions** — Plan at least 2–3 moments of character interiority. Do not let the chapter become pure external action.

### 6. Draft the Chapter

Write the chapter based on the user's instructions and the loaded context.
Strictly adhere to the established tone, pacing, and constraints.
Do not rush the pacing; let the scene breathe. Show, don't tell.
- Vary sentence length. Avoid 3+ consecutive sentence fragments.
- After every significant event, include the POV character's internal reaction before moving to the next action.
- Show emotions through physical sensations and behavior, not by naming them directly.

#### Punctuation for Emotional Effect

Use punctuation deliberately to convey emotion, tone, and rhythm. Match punctuation choices to the character's psychological state and the scene's intensity:

**Shouting / Intense Voice:**
- `ALL CAPS` for shouted dialogue or internal screams. Use sparingly — one or two words per outburst, not entire paragraphs.
- `!!!` for high intensity, shock, or rage. Max one per sentence. `What are you doing?!` beats `What are you doing!!!` for most cases.
- `?!` or `!?` for incredulity, disbelief, or panicked questions. `You did WHAT?!`

**Fear / Panic / Shyness:**
- Jagged, fragmented sentences. Short. Broken. Like this. Each fragment a heartbeat.
- Stuttering with hyphens: `I-I didn't mean to—` or `W-wait, please—`
- Trailing off with ellipsis: `I just thought maybe...` (hesitation, uncertainty)
- Extended ellipsis for longer pauses: `. . .` or `... ...` (shock, processing, dread)
- Parentheses for whispered asides or internal flinches: `(don't look at me)` or `(please don't)`

**Pause / Hesitation / Thought:**
- `...` for a standard pause, trailing thought, or hesitation in dialogue.
- `. . .` (spaced) for a longer, heavier pause — silence that carries weight.
- Em dash `—` for interruption, sudden shift, or abrupt thought: `I was going to say—` or `Wait—no, that's not right.`
- Double em dash `——` for a longer break or trailing silence in narration.

**Calm / Reflection / Flow:**
- Long, flowing sentences with commas and semicolons for peaceful or contemplative scenes.
- Semicolons `;` for connected thoughts, measured pacing, formal or intellectual voice.
- Colons `:` for deliberate, structured explanation or revelation.

**Internal Monologue / Emphasis:**
- *Italics* for internal thoughts, emphasis, or words that carry special weight.
- **Bold** rarely — only for extreme emphasis or a voice that isn't the character's own (e.g., a system message, a god's voice, a memory that intrudes).
- Repetition for obsession, fear, or fixation: `No no no no.` or `Again. Again. Again.`

**Silence / Tension:**
- A line break with no text. Just white space. Let the reader feel the gap.
- `—` alone on a line for a hard cut or abrupt silence.
- Single words on their own line for impact: `Dead.`

**Dialogue-Specific:**
- Interrupted speech: `"But I thought—"` (em dash, no closing quote if cut off mid-sentence)
- Overlapping speech: Use action beats to show interruption rather than punctuation alone.
- Whispered dialogue: Lowercase or italics, not just punctuation: *`please`* or `please`
- Sarcastic or ironic tone: Let the context carry it. Punctuation alone (`?` or `!`) rarely conveys sarcasm without supporting prose.

**Rules of Thumb:**
- Less is more. One strong punctuation choice beats three weak ones.
- Match punctuation to character voice. A formal character doesn't use `!!!` — they use measured prose that conveys intensity through word choice.
- Don't stack punctuation: `?!?!` or `!!!...` looks amateurish. Pick one.
- Ellipsis is not a crutch for weak writing. Use it for genuine hesitation, trailing thought, or silence — not because you don't know how to end a sentence.
- In action scenes, short sentences and fragments create urgency. In reflection scenes, longer sentences create calm.

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
| `pacing-rhythm` | `[user_agent]/skills/writing-techniques/pacing-rhythm/SKILL.md` | Verify chapter matches its pacing tag. |
| `character-depth` | `[user_agent]/skills/writing-techniques/character-depth/SKILL.md` | Verify character voice matches their psychology. |
| `genre-knowledge` | `[user_agent]/skills/genre-knowledge/[genre]/SKILL.md` | Load the genre-specific skill matching the novel's genre. Ensure prose, pacing, and scene construction match genre expectations. |

If any skill file is not found, inform the user:
> "Supplement skills are available to enhance this command. Download them from:
> https://github.com/JeroTan/novel-writer-english.git
> I'll continue without them, but output quality will be reduced."
