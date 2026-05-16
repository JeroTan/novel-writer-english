---
name: chapter-illustration-prompter
description: "Generates chapter illustration prompt files (assets/chapters/chapter-XX.illustration-prompt.md). Activates when the user asks to create illustration prompts, scene art guides, or visual references for a chapter. Produces a Master Chapter Prompt, 3–6 scene-specific prompts, and technical notes."
---

# Chapter Illustration Prompter Skill

**TRIGGER**: Whenever the user asks to create illustration prompts, scene art, or visual guides for a chapter.

## Instructions for AI

You generate `assets/chapters/chapter-XX.illustration-prompt.md` files. Before generating, you MUST:

1. **Read the chapter** — know every scene, character, and setting that appears.
2. **Read character design sheets** — check `assets/characters/` for every character in the chapter. Pull their skin tone, clothing, and design notes.
3. **Read the constitution** — confirm the visual tone (dead serious, epic mundane, Solo Leveling aesthetic).
4. **Scan for knowledge sources** — check all of the following locations for any relevant reference material and incorporate what you find into the prompts:

| Location                           | What to look for                                                        |
| ---------------------------------- | ----------------------------------------------------------------------- |
| `memory/constitution.md`           | Core visual tone, style rules, non-negotiables                          |
| `stories/[novel]/specification.md` | Character descriptions, world details, setting facts                    |
| `stories/[novel]/creative-plan.md` | Chapter intent, mood targets, foreshadowing goals                       |
| `assets/characters/`               | Character design sheets (skin tone, clothing, build)                    |
| `.gemini/skills/genre-knowledge/`  | Genre-specific visual conventions (manhwa, anime, etc.)                 |
| `knowledge/`                       | Any project-specific visual references, world-building notes, lore docs |
| `knowledge-base/`                  | Same — alternative folder name                                          |
| `references/`                      | Same — alternative folder name                                          |
| `docs/`                            | Same — scan for any visual or lore reference files                      |
| `memory/`                          | Any additional reference files beyond constitution                      |

If a folder does not exist, skip it silently. If any relevant file is found, read it and extract any detail that improves visual accuracy — character descriptions, location layouts, color palettes, cultural details, technology descriptions, or tone references. Do NOT ignore these sources even if the user did not explicitly mention them.

### Missing Design Sheet Protocol

For every character in the chapter, check if a corresponding design sheet exists in `assets/characters/[slug]-design-sheet.md`.

**If a design sheet is NOT found:**

- Notify the user immediately before generating: `⚠️ No design sheet found for [Character Name]. Guessing appearance from chapter context. For better consistency, create a design sheet at assets/characters/[slug]-design-sheet.md.`
- Proceed anyway — infer their appearance from all available chapter text, their rank, role, and any description in the specification.
- Make the guessed appearance explicit in the prompt (do not leave it vague).
- List all characters missing design sheets at the top of the output file as a warning block.

## Output File Structure

Every illustration prompt file MUST contain these sections in order:

```
1. YAML frontmatter
2. Illustration Overview table
3. Master Chapter Prompt
4. Individual Scene Prompts (3–6)
5. Technical Notes
6. Placement Format
```

### 1. Frontmatter

```yaml
---
name: chapter-XX-illustration-guide
description: "Visual illustration guide for Chapter XX of Solo Working."
---
```

### 2. Illustration Overview Table

Summarize all scenes before writing prompts. Anchor each to a direct quote from the chapter text.

```markdown
| #   | Scene        | Character(s)     | Placement                  | Purpose                   |
| --- | ------------ | ---------------- | -------------------------- | ------------------------- |
| 1   | [Scene name] | [Character name] | At "[exact chapter quote]" | [One-line visual purpose] |
```

### 3. Master Chapter Prompt

One cinematic cover-style image summarizing the chapter's emotional arc.

**Critical rule: The Master Chapter Prompt must be a fully self-contained image generation prompt. An AI with no other context — no design sheets, no chapter text — must be able to generate the correct image from the Master Prompt alone. It is NOT a brief summary. It is the most important single prompt in the file and must be the most detailed.**

Apply ALL Detail Depth Rules (see Section 4) to every element in the Master Prompt — the same exhaustive standard used for individual scene prompts. Never leave characters, objects, or environment vague.

**Structure:**

- **Foreground:** Primary character(s) fully described per Detail Depth Rules — exact skin tone, exact clothing (fabric, color, condition), hair color/length/style, eye color, pose, expression, any props. Include Rank label and any floating System UI elements.
- **Midground:** Secondary characters or elements — full Detail Depth description for each character present. Spatial relationship to foreground. Any System windows, overlays, or environmental phenomena.
- **Background:** Full environment breakdown — room type, dimensions, wall/floor/ceiling materials and colors, every light source (type, position, color temperature, shadow direction), furniture and fixtures, atmospheric effects (glow, dust, heat distortion), depth layers.
- **Mood & Style:** 2–3 sentences on emotional tone and visual atmosphere. Reference Solo Leveling manhwa aesthetic. State dominant color clash.
- **Composition:** Camera angle (low-angle / eye-level / high-angle), framing (tight / medium / wide), focal hierarchy (what draws the eye first, second, third).
- End with: `**No text. No watermarks. No logos.**`

### 4. Individual Scene Prompts

Repeat for each scene in the overview table. Each prompt has exactly 5 sections:

- **Location in Chapter:** Exact quote trigger from the chapter text.
- **Scene Description:** 2–4 sentences — what is happening, who is present, what is visible.
- **Visual Elements:** Exhaustive bullet list — see Detail Depth Rules below.
- **Mood:** 1–3 sentences — visual emotion, not plot summary.
- **Composition:** Camera angle, framing, focal hierarchy.

#### Detail Depth Rules (MANDATORY)

Every Visual Elements section MUST describe objects, characters, and environment at full resolution. Never leave anything vague. Apply these rules:

**For every CHARACTER present:**

- Full name + Rank label
- Exact skin tone (from design sheet or inferred)
- Exact clothing — fabric, color, condition, fit, any wear or damage
- Hair color, length, style
- Eye color and expression
- Pose — what are they doing with their hands, body weight, facing direction
- Emotional state visible on face and body
- Any props they are holding or wearing

**For every OBJECT in the scene:**

- Material (metal, paper, glass, fabric, plastic)
- Color and finish (matte, glossy, worn, new)
- Size relative to the character
- Condition (pristine, worn, damaged, aged)
- Position in the frame (foreground, mid, background; left, center, right)
- Any text or markings visible on the object (if relevant to the scene)

**For the ENVIRONMENT:**

- Room type and approximate dimensions (cramped, spacious, corridor-narrow)
- Wall, floor, ceiling materials and colors
- Every light source — type, position, color temperature, direction of cast shadows
- Furniture and fixtures — describe each present item briefly
- Atmospheric effects — dust, steam, heat distortion, digital glow, smoke
- Depth layers — what is near, middle, far

**Negative space:** Note what is deliberately empty or dark to create contrast.

### 5. Technical Notes

Include at the end of every file:

- **Color Palette:** Primary neutrals, secondary tones, accent/glow colors. State warm/cold rule for this chapter.
- **Lighting Consistency:** Map each light source to its color temperature (fluorescent → harsh white, monitor → blue-green, System UI → neon blue, city glow → warm amber).
- **Character Design References:** List every character in the chapter. For each: link to design sheet if it exists, or write a full inferred appearance description. Mark missing sheets with `⚠️ No design sheet — appearance inferred`.
- **Artistic Style:** Cinematic manhwa, high contrast, anime character design, Solo Leveling visual language, no caricature.

### 6. Placement Format

Fixed block — copy exactly into every file:

```markdown
[ILLUSTRATION #X: {Title}]
_{One-line caption}_
```

## Scene Selection Rules

**Prefer these scene types:**

- Character introduction (first appearance)
- Spatial anchor (first time a key location appears)
- Power dynamic (hierarchy/rank made visible)
- Turning point (catalyst or revelation)
- Internal moment (protagonist thinking/calculating)
- System event (UI appearance, awakening, quest notification)
- Confrontation (direct conflict between characters)

**Avoid:**

- Generic dialogue with no visual hooks
- Scenes already captured by the Master Prompt
- More than 6 illustrations per chapter

## Character Design Rules

These are mandatory for every prompt:

1. Never write "Filipino facial features." Always use "anime character design aesthetic" or "anime protagonist aesthetic."
2. Always include the character's Rank next to their name: `Juan dela Cruz (Rank-F)`.
3. Always state skin tone — pull from `assets/characters/[slug]-design-sheet.md`.
4. Background characters default to: `anime-style proportions, face ambiguous or silhouetted`.
5. System UI elements render as: `semi-transparent neon-blue, geometric, clean-edged, no decorative borders`.
6. Always end Master Prompt with: `**No text. No watermarks. No logos.**`

## Mood Vocabulary

Use this language in Mood sections to maintain the Solo Working tone:

- **Rising:** quiet competence, coiled readiness, contained intensity, predatory focus, invisible preparation
- **Falling:** institutional indifference, crushing hierarchy, the silence of being overlooked, bureaucratic inevitability
- **Turning:** the moment before catastrophe, the pivot point, foreshadowing made visual, before everything changes
- **System:** the mundane rendered epic, the dungeon in the office, awakening rendered clinical, power discovered in fluorescent light

## Composition Quick Reference

| Type                  | When to Use                         |
| --------------------- | ----------------------------------- |
| **Wide establishing** | First appearance of a space         |
| **Low angle hero**    | Protagonist empowerment             |
| **Over-shoulder**     | Power dynamic, two-character scenes |
| **Close-up**          | Internal moments, System UI         |
| **Top-down**          | Planning, calculation, overview     |
| **Split-light**       | Duality, tension between two worlds |
| **Silhouette**        | Background/mystery characters       |

## Global Style Block (for External AI Tools)

When prompting an external AI (Midjourney, DALL-E, Stable Diffusion, Gemini Imagen) without project context, prepend:

```
Visual style for "Solo Working" (web novel series):
- Aesthetic: Manhwa/anime hybrid. Solo Leveling visual language.
- Characters: Anime character design. Expressive eyes. Stylized proportions. High-contrast shading.
- Setting: Modern Philippine corporate office (BGC/Makati). Rendered with epic dungeon weight.
- Tone: Dead serious. No comedy. Mundane details treated as life-or-death.
- Lighting: Cold fluorescent dominant. Neon-blue for System events. Warm amber only from city lights.
- Color: Dark gray, charcoal, deep navy base. Neon-blue/red accents. High contrast.
- NO text, watermarks, logos, or speech bubbles.
```

## Output Checklist

Before finalizing, verify:

1. Frontmatter YAML present and correct
2. Missing design sheet warnings shown to user before generation begins
3. Overview table anchors every illustration to a chapter quote
4. Master Chapter Prompt covers the full emotional arc
5. All scene prompts have the 5 required sections
6. Every Visual Elements section fully describes all characters, objects, and environment — nothing is vague or generic
7. Every character in a scene has: name + Rank, skin tone, exact clothing, hair, eyes, pose, expression
8. Every object has: material, color, condition, size, position in frame
9. Technical Notes include chapter-specific color/light additions
10. Character Design References list every character — with design sheet link or full inferred description + warning
11. Placement Format block present
12. No "Filipino facial features" language anywhere
13. All Rank labels present in character descriptions
14. Master Prompt ends with no-text declaration
