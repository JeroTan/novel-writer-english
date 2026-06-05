---
name: specify
description: "Step 2: Creates a lean story specification and initializes knowledge files for detailed characters, worldbuilding, locations, voices, and glossary."
tools:
  - "*"
kind: local
argument-hint: "[Working Title]"
---

# User Input: $ARGUMENTS

## Objective

Create a lean story specification for the novel. The specification captures the core purpose, promise, and direction of the story. Detailed character profiles, voices, locations, worldbuilding, factions, terms, strategic reversals, and other reference data belong in `./stories/[novel-name]/knowledge/`.

## Execution Steps

### 1. Read Constitution

Always read `./memory/constitution.md` first to ensure alignment.

### 1b. Gather Novel Name and Genre

Ask the user for:
- **Novel name or working title** — used to create the directory `./stories/[novel-name]/`.
- **Primary genre** — e.g., fantasy, scifi, romance, mystery, thriller, horror. This determines which genre-knowledge skill to activate.
- **Subgenres or tags** — e.g., "urban fantasy", "space opera", "enemies to lovers".

If the user is unsure of the genre, use the `setting-detector` skill to auto-detect it from their description.
If the user does not have a novel title, character name, faction name, place name, system name, or important concept name yet, load `[user_agent]/skills/writing-techniques/namecraft/SKILL.md` when available and offer 3-6 options based on genre, sector, faction, tone, symbolism, humor role, and sound profile. Do not force a final choice; `[TBD]` is acceptable.

### 2. Information Gathering

If the user hasn't provided enough information, ask targeted questions to build the 4 levels of specification:

**Level 1: Logline**
- A one-sentence summary of the story.

**Level 2: Core Premise**
- A short paragraph covering: Protagonist, Goal, Conflict, and Stakes.
- For each major character, include:
  - **Wound / Ghost**: What past event defines them?
  - **Origin of Motivation**: WHY they want their goal (not just what the goal is).
  - **Internal Contradiction**: What they believe vs. what's true.

Keep character psychology here as a brief snapshot only. Put the detailed profile in `knowledge/character-profiles.md`.

**Level 3: Story Promise**
- Core conflict
- Core purpose of the novel
- Main characters as one-line role snapshots (Protagonist, Antagonist, Key Allies)
- Primary themes
- Genre promise and reader expectations
- Target audience
- Success criteria for the novel

**Level 4: Knowledge Map**
- Map detailed information to the correct knowledge file:
  - `./stories/[novel-name]/knowledge/character-profiles.md`
  - `./stories/[novel-name]/knowledge/character-voices.md`
  - `./stories/[novel-name]/knowledge/locations.md`
  - `./stories/[novel-name]/knowledge/world-setting.md`
  - `./stories/[novel-name]/knowledge/glossary.md`
  - `./stories/[novel-name]/knowledge/strategic-reversals.md`
- In `specification.md`, include only short pointers and summaries.
- Do not duplicate full character profiles, full worldbuilding, location databases, faction databases, magic/technology rules, or glossary entries in the specification.

### 3. Draft the Specification

Draft the document using the information gathered.

Use this lean structure:

```markdown
# Specification - [Novel Name]

## Definition
- **Created:** [YYYY-MM-DD]
- **Updated:** [YYYY-MM-DD]
- **Primary Genre:** [Genre]
- **Subgenres / Tags:** [Tags]

## Logline
[One sentence.]

## Core Premise
[One paragraph covering protagonist, goal, conflict, and stakes.]

## Core Purpose
[Why this novel exists; the emotional, thematic, or entertainment promise.]

## Story Promise
- **Core Conflict:** [Brief]
- **Primary Themes:** [Brief]
- **Target Audience:** [Brief]
- **Success Criteria:** [Brief]

## Core Cast Snapshot
- **[Character Name]** — [Role, one-line motivation/conflict]. Full profile: `./knowledge/character-profiles.md`

## World Snapshot
[One short paragraph only.] Full worldbuilding: `./knowledge/world-setting.md`

## Knowledge Map
- **Characters:** `./knowledge/character-profiles.md`
- **Character Voices:** `./knowledge/character-voices.md`
- **Locations:** `./knowledge/locations.md`
- **World & Setting:** `./knowledge/world-setting.md`
- **Glossary:** `./knowledge/glossary.md`
- **Strategic Reversals:** `./knowledge/strategic-reversals.md` or `[N/A] — no strategic contest/reversal focus`

## Open Clarifications
- [Needs Clarification] [Question or vague item]
```

Use the following markers for elements that need work:
- `[Needs Clarification]` for vague points.
- `[Core Requirement]` for non-negotiables.
- `[Optional Feature]` for nice-to-haves.

Do not expand the specification into a full encyclopedia. If a section becomes long, move the details into the matching knowledge file and keep a short pointer in the specification.

### 4. Output and Save

Save the specification to `./stories/[novel-name]/specification.md`.

### 5. Post-Specification: Initialize Knowledge Folder

1. Create the directory `./stories/[novel-name]/knowledge/` if it does not exist.
2. Copy and populate from templates:
   - `[user_agent]/templates/knowledge/character-profiles.md` → `./stories/[novel-name]/knowledge/character-profiles.md`
   - `[user_agent]/templates/knowledge/character-voices.md` → `./stories/[novel-name]/knowledge/character-voices.md`
   - `[user_agent]/templates/knowledge/locations.md` → `./stories/[novel-name]/knowledge/locations.md`
   - `[user_agent]/templates/knowledge/world-setting.md` → `./stories/[novel-name]/knowledge/world-setting.md`
   - `[user_agent]/templates/knowledge/glossary.md` → `./stories/[novel-name]/knowledge/glossary.md`
   - `[user_agent]/templates/knowledge/strategic-reversals.md` → `./stories/[novel-name]/knowledge/strategic-reversals.md`
3. Pre-fill each file with everything already established during specification gathering. Replace `[Protagonist Name]` with the actual name, fill out known locations, add known terms, etc.
4. For fields the user has not yet defined, leave the placeholder text (e.g., `[TBD]`) but offer 2–3 concrete suggestions based on the genre and logline.
5. If the user says "maybe later" or skips a field, leave the placeholder and move on. Do NOT block the workflow.
6. Tell the user: "Knowledge folder created at `./stories/[novel-name]/knowledge/`. The specification stays lean; detailed canon lives in these knowledge files. They will be used by Clarify, Plan, Write, Edit, and Review."

Inform the user that the specification is ready and suggest they run the `/clarify` command next.

## Supplement Skills

These skills enhance this command's output quality. Check if they are available before proceeding:

| Skill | File | Purpose |
|-------|------|---------|
| `character-depth` | `[user_agent]/skills/writing-techniques/character-depth/SKILL.md` | Require Wound/Ghost and Origin of Motivation for every major character. |
| `namecraft` | `[user_agent]/skills/writing-techniques/namecraft/SKILL.md` | Suggest names for unnamed characters, factions, places, titles, systems, abilities, artifacts, arcs, and concepts. |
| `setting-detector` | `[user_agent]/skills/quality-assurance/setting-detector/SKILL.md` | Auto-detect genre and setting elements. |
| `strategic-reversal` | `[user_agent]/skills/writing-techniques/strategic-reversal/SKILL.md` | Use when the novel relies on contests, tactics, clever wins, hidden rules, bluffs, or strategic reversals. |
| `genre-knowledge` | `[user_agent]/skills/genre-knowledge/[genre]/SKILL.md` | Load the genre-specific skill matching the user's chosen genre (fantasy, scifi, romance, mystery, thriller, horror). Suggest genre-appropriate tropes, structures, and conventions. |

If any skill file is not found, inform the user:
> "Supplement skills are available to enhance this command. Download them from:
> https://github.com/JeroTan/novel-writer-english.git
> I'll continue without them, but output quality will be reduced."
