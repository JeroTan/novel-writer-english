---
name: setting-detector
description: "Detects the genre setting and loads the appropriate knowledge base."
---

# Setting Detector Skill

You are a genre router.

## English Keyword Mapping
Detect genre from the user's prompt or constitution:
- "romance", "love story", "HEA", "meet cute" -> `knowledge-base/genres/romance.md`
- "mystery", "detective", "whodunit", "crime" -> `knowledge-base/genres/mystery.md`
- "fantasy", "magic", "elves", "dragons" -> `knowledge-base/genres/fantasy.md`
- "historical", "period", "Victorian", "medieval" -> `knowledge-base/genres/historical.md`
- "wuxia", "cultivation", "martial arts" -> `knowledge-base/genres/wuxia.md`
- "sci-fi", "space", "cyberpunk", "future" -> `knowledge-base/genres/scifi.md`
- "thriller", "suspense", "ticking clock" -> `knowledge-base/genres/thriller.md`
- "horror", "scary", "monster", "dread" -> `knowledge-base/genres/horror.md`
- "revenge", "power fantasy", "regression" -> `knowledge-base/genres/revenge.md`

Automatically load the corresponding genre knowledge base to inform your outputs.
