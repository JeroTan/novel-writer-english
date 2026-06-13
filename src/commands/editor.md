---
name: editor
description: "Step 7: Chapter-level editing command. Reviews one chapter, proposes line-specific fixes, tracks approval status, then applies approved changes only after final confirmation."
tools:
  - "*"
kind: local
argument-hint: "[Chapter number or chapter file]"
---

# User Input: $ARGUMENTS

## Objective

Edit one finished chapter after `/writer` and before `/reviewer`. The editor is a middle pass: precise chapter improvement, not whole-project review. It finds line-level issues, proposes fixes, tracks user decisions, and edits the chapter only after every suggestion is resolved and the user confirms.

## Execution Steps

### 1. Identify Target Chapter

Determine the target chapter from `$ARGUMENTS` or ask which chapter to edit.

Use `./stories/[novel-name]/content/` as the source folder. Accept these chapter references:
- `chapter_00001.md`
- `chapter-01.md`
- `chapter 1`
- `ch1`
- `1`
- any exact chapter filename in the content folder

If multiple novels exist under `./stories/`, ask which novel to use.

### 2. Show Reference Checklist

Before editing, show this checklist and let the user unselect or add references.

Default checked references:

| Checked | Reference | Purpose |
|---------|-----------|---------|
| `[x]` | `./memory/constitution.md` | Creative principles, style rules, non-negotiables |
| `[x]` | `./stories/[novel-name]/specification.md` | Story facts, promises, genre, characters |
| `[x]` | `./stories/[novel-name]/creative-plan.md` | Chapter intent, pacing, arc role |
| `[x]` | `./stories/[novel-name]/tasks.md` | Chapter task and status |
| `[x]` | `./stories/[novel-name]/tracking/` | Continuity state |
| `[x]` | `./stories/[novel-name]/content/` | Chapter references selected below |

For `tracking/`, show a nested checklist if files exist:
- `[x] character-state.json`
- `[x] plot-tracker.json`
- `[x] relationships.json`
- `[x] timeline.json`
- `[x] validation-rules.json`
- `[x] any other tracking file present`

For chapter references, do not show one checkbox per chapter. Ask the user to type chapter refs instead:
- `target only`
- `previous`
- `next`
- `1-3`
- `1,3,5`
- `all`

Default chapter refs: target chapter plus previous chapter if it exists.

Optional unchecked references:

| Checked | Reference | Purpose |
|---------|-----------|---------|
| `[ ]` | `[user_agent]/skills/writing-techniques/emotional-interiority/SKILL.md` | Deepen internal reactions and sensory-emotional response |
| `[ ]` | `[user_agent]/skills/writing-techniques/dialogue-techniques/SKILL.md` | Improve subtext, voice distinction, action beats |
| `[ ]` | `[user_agent]/skills/writing-techniques/comedic-banter-rhythm/SKILL.md` | Check witty banter, comedic escalation, and argument-driven exposition |
| `[ ]` | `[user_agent]/skills/writing-techniques/namecraft/SKILL.md` | Check names for genre, faction, symbolism, pronunciation, and canon fit |
| `[ ]` | `[user_agent]/skills/writing-techniques/pacing-rhythm/SKILL.md` | Check pacing tag, rhythm, fragment overuse |
| `[ ]` | `[user_agent]/skills/writing-techniques/punctuation-emotional-effect/SKILL.md` | Check punctuation for emotion, rhythm, silence, and intensity |
| `[ ]` | `[user_agent]/skills/writing-techniques/strategic-reversal/SKILL.md` | Check contests, tactics, bluffs, hidden rules, and clever reversals |
| `[ ]` | `[user_agent]/skills/writing-techniques/character-depth/SKILL.md` | Check motivation, contradiction, defense mechanisms |
| `[ ]` | `[user_agent]/skills/quality-assurance/consistency-checker/SKILL.md` | Check contradictions, logic, continuity |
| `[ ]` | `[user_agent]/skills/genre-knowledge/[detected-genre]/SKILL.md` | Apply detected genre expectations |
| `[ ]` | `[user_agent]/skills/genre-knowledge/*/SKILL.md` | Manually chosen genre references |

Detect the likely genre from `specification.md`, `creative-plan.md`, and metadata if available. Pre-fill `[detected-genre]` only when one matching folder exists under `[user_agent]/skills/genre-knowledge/`.

### 3. Load Selected References

Read only selected references. If a selected file is missing, report it and continue without it unless it is the target chapter.

When reading chapter files:
- Use line numbers.
- Preserve exact current text in findings.
- Treat the target chapter as the only editable file.
- Treat other chapters as references only.

### 4. Edit Review Pass

Check the target chapter for:
- Conflict with constitution, specification, creative plan, tasks, tracking, or selected chapter references
- Pacing tag mismatch
- Missing chapter goal
- Timeline or logistics issue
- Character motivation or voice drift
- Dialogue too direct, flat, or same-voice
- Dialogue exposition that could become disagreement, teasing, challenge, panic, or argument
- Banter that does not change status, emotion, information, tactics, affection, or pressure
- Joke that interrupts tension without revealing character or increasing pressure
- Placeholder, generic, confusing, hard-to-pronounce, same-sounding, or off-faction names when namecraft is selected
- Report-style narration
- Missing internal reaction after major beats
- Weak sensory-emotional response
- Fragment overuse or monotonous rhythm
- Repetition, unclear phrasing, awkward line flow
- Strategic reversal weakness when the strategic-reversal skill is selected or the plan marks the chapter as a contest/reversal scene: unclear visible rules, unseeded hidden lever, unbelievable opponent behavior, unearned win, or no cost/aftermath
- Genre expectation miss when genre skill is selected

Do not rewrite the whole chapter. Suggest local edits only unless a larger structural issue blocks chapter quality.

### 5. Output Suggestion List

Output one persistent numbered list:

```markdown
1. Line 12-14
Current: Full exact current text from the cited line(s).
Suggest: Full exact replacement text.
Reason: Why this improves the chapter or concise action.
Status: for_discussion

2. Line 18
Current: Full exact current text from the cited line(s).
Suggest: Full exact replacement text.
Reason: Why this improves the chapter or concise action.
Status: for_discussion
```

Rules:
- Every new item starts as `for_discussion`.
- Status must be exactly one of `approve`, `skip`, or `for_discussion`.
- Always show the full current text for the cited line(s). Do not use fragments, summaries, or ellipses to save tokens.
- Always show the full suggested replacement text. Do not use partial replacements, vague instructions, or "change this part" wording.
- If an issue spans a long passage, cite the full line range and include the complete current passage plus the complete replacement passage.
- Do not apply edits yet.

After the list, ask the user to update statuses, for example:
- `approve 1,2`
- `skip 4`
- `discuss 3`
- `approve all except 5`

### 6. Discussion Loop

Keep the numbered list persistent across replies.

Before answering any follow-up after the first suggestion list, update the stored list from the user's latest message and show the full current list first. Then provide any broader details, negotiation notes, revised wording, or explanation below the list.

If the user asks to discuss an item, respond using this format:

```markdown
1. Line 12-14
Current: [full exact current text]
Suggest: [full exact suggested replacement]
Reason: [reason]
Status: for_discussion

2. Line 18
Current: [full exact current text]
Suggest: [full exact suggested replacement]
Reason: [reason]
Status: approve

#3

**Title:** [short label for this item]

**Current issue:** [short issue or negotiation point]

**Suggestion:** [current or revised suggested change]

**Reason:** [why this version fits better]
```

For multiple items, show the full numbered list first, then one broad detail block per relevant item:

```markdown
#23 [Title]

[Body/content of suggestion, negotiation context, tradeoff, or revised wording.]
```

Keep item detail blocks concise but complete enough for the user to decide. Always let the list status reflect the latest conversation.

### 7. Apply Approved Edits

When every item is either `approve` or `skip`, tell the user:

> All editor items are resolved. Ready to edit `./stories/[novel-name]/content/[chapter-file]` with approved changes only. Confirm and I will apply them.

Apply changes only after the user confirms.

When applying:
- Edit only the target chapter file.
- Apply `approve` items only.
- Do not apply `skip` items.
- Preserve markdown structure, chapter title, separators, and mini summary unless an approved item targets them.
- If line numbers shifted during editing, match against exact current text before replacing. If exact text cannot be found, stop and ask before guessing.

### 8. Completion Output

After applying edits:
1. Append a dated entry to `./stories/[novel-name]/tasks.md` under `## Review & Editing Log`.
2. If the log section does not exist, create it at the bottom of `tasks.md`.
3. If the placeholder `No editor/reviewer entries yet.` exists, remove it.
4. Use this format:

```markdown
- [YYYY-MM-DD] `/editor` Chapter [N] — applied [X] approved edit(s); skipped [Y]; unresolved [Z].
```

Then report:
- Chapter edited
- Approved items applied
- Skipped items ignored
- Any items that could not be applied exactly

Suggest `/reviewer` when the user wants broad project QA or final approval.
