---
name: utility-drafter
description: "Utility command for quick loose drafts from a user's idea. Creates, extends, redoes, or lightly revises draft files without treating them as canon."
tools:
  - "*"
kind: local
argument-hint: "[idea, chapter/arc target, draft file, redo/update/more request]"
---

# User Input: $ARGUMENTS

## Objective

Jumpstart the user's intention by drafting loose material from their idea. This is not `/writer` and not final prose. The draft is an editable idea dump that helps the user shape scenes, arcs, chapters, fragments, beats, or raw wording before the formal workflow uses it.

## Execution Steps

### 1. Identify Draft Target

Infer what the user wants from `$ARGUMENTS`:
- new draft from idea
- redo an existing draft
- update part of an existing draft
- generate more draft after an existing file
- brainstorm possible changes to a line, phrase, beat, or scene

Locate the draft output by checking, in order:
1. any explicit path from the user
2. current active file if the chat/tool context provides one
3. existing project draft folders such as `./draft/`, `./draft/chapters/`, `./draft/contents/`, `./draft/contents/saga_*/`, or similar
4. user-defined draft output convention in the project

If no target is clear, ask one short question for the target file or draft type.

Suggested defaults when creating new files:
- chapter draft: `./draft/chapters/chapter_[N].md`
- arc draft: `./draft/contents/saga_[NNN]/arc_[NNN].md`
- idea dump: `./draft/ideas/[short-slug].md`

Respect existing folder style. Do not force a new convention if the project already uses another draft layout.

### 2. Load Minimal Context

This command uses light context only. Skim, do not fully audit.

Read only context related to the user's drafting prompt:
- current target draft file, if it exists
- nearby draft chapter or arc files when continuity helps
- relevant `./stories/[novel-name]/knowledge/` entries for characters, places, terms, or rules named in the prompt
- relevant existing chapters in `./stories/[novel-name]/content/` only when the draft continues or references them
- relevant `specification.md`, `creative-plan.md`, or split `_main.md` only when needed to avoid obvious mismatch

Do not load every chapter, every knowledge file, or full tracking unless the user asks. Drafts may be loose and exploratory. Canon can be cleaned later by `/planner`, `/task-manager`, `/writer`, `/editor`, and `/reviewer`.

### 3. Choose Mode

If the target file does not exist, create a new draft from the user's idea.

If the target file exists and the user runs this utility again, infer the mode:
- **Redo**: user asks to restart, replace, redo, regenerate, rewrite from scratch, or make a different version. Generate a new full draft for the target. Ask before overwriting unless user explicitly says overwrite.
- **Update**: user asks to change a line, phrase, section, event, tone, POV, sequence, or beat. Propose or apply local draft changes depending on user wording.
- **More**: user asks to continue, expand, add more, draft next scene, draft next chapter, or extend. Append new material after the existing draft unless user specifies where.
- **View**: user asks to show, summarize, or inspect. Show the relevant draft content or summary.

### 4. Modification Suggestions

When the user asks what to change for a specific line, phrase, passage, or idea:

1. Show numbered suggestions.
2. Ask exactly:

```text
Please choose number(s):
```

3. The user may choose multiple numbers.
4. If the user chooses multiple numbers and did not already explain why, ask why they chose those numbers so the combined revision follows their intent.
5. If the user already gave the reason or direction, do not ask again.

Suggestion format:

```markdown
1. [Short suggestion title]
Current: [exact line/phrase/beat if available]
Draft Direction: [what would change]
Why: [short reason]

2. [Short suggestion title]
Current: [exact line/phrase/beat if available]
Draft Direction: [what would change]
Why: [short reason]
```

Do not apply numbered suggestions until the user chooses.

### 5. Draft Generation Rules

Draft freely, but preserve user intent.

Rules:
- Treat the user's idea as the strongest source.
- Keep draft voice flexible; the user may edit or discard it.
- Use placeholders such as `[TBD]`, `[Need Name]`, `[Need Motive]`, or `[Need User Choice]` when details are unknown.
- Do not silently lock new canon. Mark speculative additions as draft-only.
- If adding bridge material, label it as optional or draft bridge.
- If the draft references named characters, locations, items, factions, powers, or timeline facts, skim relevant knowledge/chapter context first.
- If the user wants messy idea-dump style, allow bullets, fragments, scene beats, raw dialogue, or outline prose.
- If the user wants prose, write loose prose but do not treat it as final chapter output.

### 6. Draft Output

Use plain drafted story text by default.

Rules:
- No required output format.
- Paragraphs and sentences are fine.
- Do not force headings, frontmatter, tables, or sections unless the user asks.
- Use bullets only when the user wants idea-dump, outline, options, or beat-list style.
- If useful, add a short working title, but avoid clutter.
- If there are important unknowns, put brief inline placeholders such as `[TBD]`, `[Need Name]`, or `[Need User Choice]` inside the draft text.

### 7. Save Behavior

If creating or extending a draft:
- Save to the inferred or user-specified draft file.
- If the file exists and overwrite is not explicit, append or create a dated/versioned alternate such as `[name]_redo_[YYYYMMDD].md`.
- Tell the user where the draft was saved.

If only brainstorming suggestions:
- Do not save until the user chooses suggestion number(s) or asks to save.

### 8. Handoff

After draft is useful, suggest the next relevant command:
- `/planner` when draft changes arc/chapter structure
- `/task-manager` when draft should become tasks
- `/writer` when user wants formal chapter prose from the draft
- `/editor` only after `/writer` creates finished chapter content
