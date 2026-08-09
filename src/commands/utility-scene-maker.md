---
name: utility-scene-maker
description: "Utility command for making focused scene drafts from user ideas, chapter needs, arc needs, or impromptu scenario requests."
tools:
  - "*"
kind: local
argument-hint: "[scene idea, chapter/arc target, draft name, redo/update/more request]"
---

# User Input: $ARGUMENTS

## Objective

Create a focused scene draft from what the user wants. The scene can belong to a chapter, arc, or impromptu idea. It is draft material only: useful, editable, and non-canon until the user moves it into planning or writing.

Use this when the user wants a scene such as (but not limited to):
- flashback
- detailed fight
- dramatic tension
- trap or counter-trap scenario
- consequence scene
- emotional confrontation
- nerdy explanation of why something happened
- discovery, reveal, chase, negotiation, banter, quiet aftermath, or transition scene

Keep the scene aligned with the user's requested purpose. Do not turn it into a full chapter unless the user asks.

## Execution Steps

### 1. Identify Scene Target

Infer target placement from `$ARGUMENTS`, active file context, or project structure.

Use these rules:
- If user names a path, use that path.
- If user names a chapter, place the scene draft under the matching draft chapter folder or nearest existing `draft/chapters/` convention.
- If user names an arc or saga, place it near the matching draft arc/saga folder such as `./draft/contents/saga_001/`.
- If user asks impromptu scene with no project target, use `./draft/scenes/`.
- If active file is a draft file, collocate new scene draft beside it.
- If active file is a chapter/content file, infer matching draft folder when obvious.
- Ask one short question only when target cannot be inferred safely.

Filename rules:
- Prefer `[DraftName]_scene_draft.md` when user gives a draft name.
- Use next-number prefix when folder already has scene drafts: `0001_[DraftName]_scene_draft.md`, `0002_[DraftName]_scene_draft.md`, etc.
- If no draft name exists, infer a short slug from scene purpose, such as `trap_consequence_scene_draft.md` or `0003_flashback_scene_draft.md`.
- Keep filenames lowercase, hyphen/underscore friendly, and filesystem-safe.

### 2. Load Relevant Context Only

Skim only what the scene needs.

Possible context:
- `./memory/constitution.md` for writing style, tone, pacing, and non-negotiables
- relevant draft file(s) near the target chapter or arc
- relevant existing chapter(s) only when the scene continues, references, or must match them
- relevant `./stories/[novel-name]/knowledge/character-profiles.md`
- relevant `./stories/[novel-name]/knowledge/character-voices.md`
- relevant `./stories/[novel-name]/knowledge/locations.md`
- relevant `./stories/[novel-name]/knowledge/world-setting.md`
- relevant `./stories/[novel-name]/knowledge/glossary.md`
- relevant `./stories/[novel-name]/knowledge/strategic-reversals.md` for traps, tactics, contests, bluffs, or consequence logic

Use split documents only when needed:
- `specification/_main.md` plus relevant shard
- `creative-plan/_main.md` plus relevant chapter/arc shard
- `tasks/_main.md` plus relevant task shard

Do not load the whole project. Do not audit canon unless the user asks. Draft can stay loose.

### 3. Optional Technique References

Load or apply only relevant technique knowledge when available:
- dialogue technique for dialogue-heavy scenes
- emotional interiority for dramatic tension, trauma, grief, fear, awe, or confession
- pacing/rhythm for fight, chase, suspense, transition, or breather scenes
- scene structure for goal/conflict/disaster or reaction/dilemma/decision scenes
- namecraft when scene needs an unnamed character, place, faction, item, power, or concept
- strategic reversal when scene involves trap, contest, trick, bluff, hidden rule, tactic, or clever consequence
- genre knowledge when scene relies on genre-specific promise

Do not load optional skills that do not matter to the requested scene.

### 4. Choose Mode

If no existing scene draft is targeted, create a new scene draft.

If target scene draft exists, infer mode:
- **Redo**: user asks redo, restart, regenerate, replace, alternate version, or different take. Create a new version unless overwrite is explicit.
- **Update**: user asks to change a line, paragraph, beat, dialogue, staging, tone, or logic. Update only that part when clear.
- **More**: user asks continue, expand, add more, follow-up beat, aftermath, or next movement. Append or create next numbered scene draft.
- **View**: user asks inspect, show, summarize, or compare. Do not edit.

Ask only if mode is ambiguous and the wrong choice could overwrite user material.

### 5. Scene Draft Rules

Write scene draft as plain story text by default.

Rules:
- Match constitution style when available.
- Keep user intent first.
- Use relevant character voice, place, glossary, and world rules when named or implied.
- Keep scope focused on the requested scene purpose.
- Do not silently make new canon. Use `[TBD]`, `[Need Name]`, `[Need Rule]`, or `[Need User Choice]` for unknowns.
- For fights, track bodies, positions, weapons, distance, injuries, rhythm, and cause-effect.
- For dramatic tension, use pressure, delay, silence, subtext, body response, and internal reaction.
- For traps or clever scenarios, make visible rules clear, seed the lever, make cause-effect fair, and show consequence.
- For nerdy explanation scenes, make explanation character-voiced, motivated, and tied to stakes instead of a detached lecture.
- For flashbacks, mark the transition clearly in the draft text if needed.
- For dialogue scenes, make lines reveal character, shift pressure/status, hide subtext, or move the scene.
- Stop when the scene's requested beat lands. Do not force chapter ending, mini summary, frontmatter, or formal structure.

### 6. Save Behavior

When generating a scene:
- Save plain draft text to the inferred or user-provided draft file.
- If file exists and user did not request overwrite, create next numbered variant or append under a simple separator.
- Tell the user the saved path.

When editing existing scene draft:
- Preserve user-written material outside the requested change.
- If exact target text is unclear, show 2-4 numbered options and ask:

```text
Please choose number(s):
```

- Apply chosen option(s) only after user chooses.

### 7. Handoff

After scene draft is created:
- Suggest `/utility-drafter` if user wants broader chapter/arc draft material.
- Suggest `/planner` if scene changes arc/chapter structure.
- Suggest `/writer` if user wants formal chapter prose using this scene.
- Suggest `/editor` only after the scene becomes finished chapter content.
