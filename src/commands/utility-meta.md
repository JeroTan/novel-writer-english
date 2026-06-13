---
name: utility-meta
description: "Records novel metadata — title, author, genre, tags, work type, status, and publication dates — to meta.json. Useful for uploading to buckets, databases, Royal Road-style listings, or web novel platforms."
tools:
  - "*"
kind: local
argument-hint: "[Optional: field to update]"
---

# User Input: $ARGUMENTS

## Objective

Create or update the `meta.json` file with accurate information about the novel. This metadata is used for uploading to buckets, databases, or web novel viewer platforms.

## Execution Steps

### 1. Check Existing Metadata

Check if `./stories/[novel-name]/meta.json` exists.
- If it exists, read it and present the current values to the user. Ask if they want to update any fields.
- If it does not exist, create it.

### 2. Collect or Confirm Fields

Read `./stories/[novel-name]/specification.md` and `./memory/constitution.md` to pre-fill where possible:
- **title** — full novel title
- **author** — author's name or pen name
- **description** — 2–3 sentence summary for novel cards (compelling, not a spoiler dump). Pre-fill from the logline/premise in specification.md.
- **status** — `"ongoing"`, `"completed"`, or `"hiatus"`
- **genre** — array selected from the allowed genre list below. Infer from specification and ask the user to confirm.
- **tags** — array selected from the allowed tag list below. Infer from specification and ask the user to confirm.
- **work-type** — array selected from the allowed work-type list below. Infer when possible, but ask the user to confirm.
- **language** — language code (default `"en"`)
- **publishedAt** — date in `"YYYY-MM-DD"` format (when the first chapter was written)
- **updatedAt** — today's date in `"YYYY-MM-DD"` format

Allowed genres:

```text
Action
Adventure
Comedy
Contemporary
Drama
Fantasy
Historical
Horror
Mystery
Psychological
Romance
Satire
Sci-fi
Short Story
Thriller
Tragedy
```

Allowed tags:

```text
Anti-Hero Lead
Anti-Villain Lead
Apocalypse
Artificial Intelligence
Attractive Lead
Chivalry
Competing Love Interest
Cozy
Crafting
Cultivation
Cyberpunk
Deck Building
Dungeon Core
Dungeon Crawler
Dystopia
Female Lead
First Contact
GameLit
Gender Bender
Genetically Engineered
Grimdark
Hard Sci-fi
High Fantasy
Kingdom Building
Lesbian Romance
LitRPG
Local Protagonist
Low Fantasy
Magic
Magical Girl
Magitech
Male Gay Romance
Male Lead
Martial Arts
Mecha
Modern Knowledge
Monster Evolution
Multiple Lead Characters
Multiple Lovers
Mythos
Non-Human Lead
Non-Humanoid Lead
Otome
Portal Fantasy / Isekai
Post Apocalyptic
Progression
Reader Interactive
Reincarnation
Romance Subplot
Ruling Class
School Life
Secret Identity
Slice of Life
Soft Sci-fi
Space Opera
Sports
Steampunk
Strategy
Strong Lead
Super Heroes
Supernatural
Survival
System Invasion
Technologically Engineered
Time Loop
Time Travel
Tower
Urban Fantasy
Villainous Lead
Virtual Reality
War and Military
Wuxia
```

Allowed work-type values:

```text
Original Ideas
Original Work
Doujin
AI Assisted
AI-generated
```

Rules:
- Use the exact display spelling above for `genre`, `tags`, and `work-type`.
- Do not invent new genre, tag, or work-type values unless the user explicitly asks for a custom platform schema.
- If a fitting value is uncertain, propose the closest 2–4 allowed options and ask the user to choose.
- Keep `genre`, `tags`, and `work-type` as arrays even when there is only one value.

### 3. Output and Save

Save `./stories/[novel-name]/meta.json` using this exact structure:

```json
{
  "title": "The Wandering Immortal",
  "author": "Author Name",
  "description": "A captivating story of cultivation and adventure. This description appears on novel cards and the detail page. Keep it concise but compelling (2-3 sentences recommended).",
  "status": "ongoing",
  "genre": ["Fantasy", "Adventure"],
  "tags": ["Cultivation", "Reincarnation", "Progression"],
  "work-type": ["Original Work", "AI Assisted"],
  "language": "en",
  "publishedAt": "2024-01-15",
  "updatedAt": "2024-12-01"
}
```

Confirm: "meta.json saved. Your novel metadata is now recorded and ready for platform upload."
