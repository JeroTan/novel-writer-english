---
name: utility-meta
description: "Records novel metadata — title, author, genre, tags, status, and publication dates — to meta.json. Useful for uploading to buckets, databases, or web novel platforms."
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
- **genre** — array of genre strings (e.g., `["fantasy", "cultivation"]`). Infer from specification.
- **tags** — array of tag strings (e.g., `["reincarnation", "weak-to-strong"]`). Infer from specification.
- **language** — language code (default `"en"`)
- **publishedAt** — date in `"YYYY-MM-DD"` format (when the first chapter was written)
- **updatedAt** — today's date in `"YYYY-MM-DD"` format

### 3. Output and Save

Save `./stories/[novel-name]/meta.json` using this exact structure:

```json
{
  "title": "The Wandering Immortal",
  "author": "Author Name",
  "description": "A captivating story of cultivation and adventure. This description appears on novel cards and the detail page. Keep it concise but compelling (2-3 sentences recommended).",
  "status": "ongoing",
  "genre": ["fantasy", "cultivation"],
  "tags": ["reincarnation", "magic-system", "weak-to-strong"],
  "language": "en",
  "publishedAt": "2024-01-15",
  "updatedAt": "2024-12-01"
}
```

Confirm: "meta.json saved. Your novel metadata is now recorded and ready for platform upload."
