---
name: novel-cover-art-creation
description: >
  AI image prompt creation tool for novel cover art. AUTOMATICALLY ACTIVATE when the user says anything like
  "make a cover art prompt", "generate a cover art for my novel", "create a book cover prompt", "prompt for
  cover art", "I need cover art", "design the cover", "cover illustration prompt", or "visual for the book".
  This skill reads the actual story content — chapters, specification, character design sheets — and then
  crafts a detailed, ready-to-use AI image generation prompt tuned for the novel's specific tone, genre,
  protagonist, and setting. Output is compatible with ChatGPT Image, Midjourney, DALL-E, Stable Diffusion,
  Ideogram, and similar tools. Do NOT skip reading the story — the quality of the prompt depends entirely
  on deep story knowledge.
metadata:
  author: jerow
  version: "1.0"
---

# Novel Cover Art Creation Skill

This skill transforms a written story into a precise, professional AI image generation prompt for cover art. The goal is to produce cover art prompts that feel earned — grounded in the actual story's tone, character, setting, and emotional truth — not generic templates.

Every prompt you generate must reach the quality bar defined in this skill. Specificity, visual intentionality, and narrative weight are non-negotiable — the sections below show you exactly what that means with annotated examples.

---

## When to Use This Skill

- User asks for a cover art prompt for their novel
- User wants to visualize their story as a book cover
- User wants to generate cover variations or chapter headers
- User mentions their "favorite AI image tool" and wants something to paste in
- User says "what should the cover look like?"

---

## The Core Principle

**Read first. Prompt second.**

A generic cover art prompt produces generic results. A great cover art prompt is practically a short story itself — it communicates the protagonist's soul, the story's visual atmosphere, and the genre's visual grammar all in one image description.

Every decision in the prompt (lighting, color palette, character posture, composition) should be traceable back to something real in the story. Do not invent details that contradict the narrative. Ground every choice.

---

## Phase 1 — Story Discovery

Before writing a single word of the prompt, gather story knowledge. Do this methodically.

### Step 1.1 — Locate Story Files

Look for the story in this order. Use file search to locate files if you're unsure of the exact paths — do not assume a fixed folder structure, as different projects organize content differently.

1. **Story spec** — search for a file named `specification.md`, `spec.md`, or similar. This contains the logline, premise, and arc structure.
2. **Opening chapters** — find chapter files (often named `chapter-01.md`, `01.md`, `ch01.md`, or sequentially numbered). Read at least the first three chapters in full.
3. **Later chapters** — if the story has more than 10 chapters, also read the most recent one to understand how the story has evolved since the opening.
4. **Character design sheets** — search for files with names like `{character-name}-design-sheet.md` or `{character-name}.prompt.md` anywhere in the project. Read the protagonist's first, then 1–2 key secondary characters.
5. **Prior cover art or illustration prompts** — search specifically in `stories/[novel-name]/assets/**` for any markdown files with words like `cover`, `illustration`, `prompt`, or `art` in their filename. If found, read them for **visual consistency only** (matching an established style or palette the project has already committed to). Do not treat them as a quality calibration bar — the quality bar is defined in this skill's Reference section.

If you cannot find story files, ask the user where their story content lives before continuing.

### Step 1.2 — Read With Visual Intent

While reading, extract and note:

| Category | What to Extract |
|---|---|
| **Protagonist** | Physical description, clothing style, posture, one defining expression |
| **Setting** | Primary location, time of day, architectural/environmental character |
| **Tone** | Dark? Funny? Epic? Melancholic? Grounded? The emotional register |
| **Genre Visual Language** | Manhwa/manga action? Literary fiction? Fantasy epic? Office satire? |
| **Color Palette (implied)** | What colors dominate the world? What lighting does the author describe? |
| **Key Visual Motif** | One object, symbol, or visual element that recurs and means something |
| **Central Tension** | The core conflict — ideally something that can be shown in a single image |
| **Signature Moment** | The scene that best crystallizes the entire story in one image |

### Step 1.3 — Identify the Cover Concept

Choose ONE of these cover concepts based on story analysis:

- **The Quiet Power** — Protagonist alone, calm, in an environment that says everything about the world they inhabit. Best for introspective or slow-burn stories.
- **The Moment Before** — Protagonist at the edge of a pivotal action, about to change everything. High tension, cinematic framing. Best for action/thriller.
- **The World Revealed** — The setting is the star. Protagonist is present but small. The world's strangeness or scale is the hook. Best for world-heavy stories.
- **The Confrontation** — Two forces (protagonist + antagonist, or protagonist + their world) in one frame. Oppositional composition. Best for stories with a clear enemy.
- **The Ensemble** — Key characters arranged in deliberate hierarchy. Best for ensemble casts or later books in a series.

State your concept choice and the reason before writing the prompt.

---

## Phase 2 — Prompt Architecture

Build the prompt in exactly this structure. Each section serves a different purpose.

### Section A — Genre + Medium Declaration (1–2 sentences)

Declare what kind of image this is before describing anything. This sets the AI model's entire interpretation.

**Pattern:** `[Style descriptor], [medium], [genre visual language]. [One sentence of tone setting.]`

**Examples:**
- `Digital illustration, novel cover art style. Inspired by Solo Leveling's visual language but set in a modern corporate office — every element of fantasy epic replaced by its corporate equivalent.`
- `Painterly fantasy book cover, oil-on-canvas texture. The atmosphere of a dying empire, rendered in the color palette of autumn.`
- `Manga-influenced ink illustration, vertical cover format. High contrast, sparse background, emotional weight carried entirely through character expression and lighting.`

### Section B — Protagonist Description (3–5 sentences)

Describe the protagonist as if you are directing a film. Not a list of features — a living presence.

Include:
- Age, physical build, ethnicity (be specific, avoid generic descriptors)
- Clothing — what they are actually wearing in the story, not an idealized version
- Posture and expression — the single most important visual element; it communicates character instantly
- One detail that is uniquely theirs (the notebook, the scar, the worn-down shoes, the specific lanyard)
- Eye direction — are they looking at the viewer, past them, or away?

**Avoid:**
- "Beautiful" or "handsome" without specifics
- Generic fantasy armor on characters who don't wear armor
- Expressions that don't match the character's established personality

### Section C — Setting and Environment (3–4 sentences)

Describe what surrounds the protagonist. This is the world of the story in visual form.

Include:
- The location (specific, named if appropriate — not just "a forest" but "a dying conifer forest in late October, stripped bare")
- The background architecture, natural features, or atmospheric elements
- What is happening in the far distance vs. close foreground
- Any secondary figures or presences in the environment (silhouettes, shadows, crowds, creatures)

### Section D — Lighting and Color Palette (2–3 sentences)

Lighting is mood. Color palette is theme. Be precise.

Include:
- Primary light source (fluorescent? golden hour? cold moonlight? single lamp?)
- The shadow quality (harsh and sharp? soft and diffuse? directional?)
- Named color palette: use painter-style language ("cold navy and charcoal gray", "amber and deep crimson", "pale lilac and bone white")
- Any color accent that creates focal point or symbolic contrast

### Section E — Atmosphere and Mood (1–2 sentences)

One sentence of pure mood. What does this image *feel* like? Not what it shows — what it means.

**Examples:**
- `The image carries the feeling of someone who has already won but has not yet been told.`
- `Quiet dread that looks indistinguishable from ordinary morning light.`
- `The loneliness of being the only person in a crowded room who can see what's coming.`

### Section F — Composition and Format (2–3 sentences)

Describe the image as a photographer or director would.

Include:
- Orientation (vertical portrait for book covers — almost always 2:3 ratio)
- Camera/viewer position (close-up, mid-shot, wide establishing shot; slightly below to give protagonist height, or level for intimacy)
- Where the protagonist is placed in frame (lower-center, off-center, centered)
- Where the title text will go — always preserve space at top and/or bottom

### Section G — Style and Technical Qualifiers (1–2 sentences)

Final art direction: the rendering style, line quality, and what to avoid.

Include:
- Style references ("cinematic manhwa illustration", "Studio Ghibli background painting style", "painterly realism with stylized outlines")
- Rendering quality ("high contrast", "photorealistic shading", "graphic flat colors")
- Negative constraints: what should NOT appear (no text, no watermarks, no logos, no anachronistic elements, etc.)

---

## Phase 3 — Output: Save as cover_art_prompt.md

The final output is a **file**, not just a chat response. By default, save the file to `stories/[novel-name]/assets/cover_art_prompt.md`.

Before writing, inform the user of the intended path:
> "I'll save `cover_art_prompt.md` to `stories/[novel-name]/assets/`. Let me know if you'd like it stored elsewhere."

Unless the user explicitly provides a different path, proceed with the default `stories/[novel-name]/assets/` location. Resolve the `[novel-name]` from the project's directory structure (e.g., the folder name within `stories/`). Then create (or overwrite) the file at that path using the structure below.

Do not display the full prompt twice — write the file, then show the user a short confirmation with the file path and a brief summary of which cover concept was chosen and why.

---

### File Structure — `cover_art_prompt.md`

```markdown
# Cover Art Prompt — [Story Title]

> Paste the following prompt into [recommended AI tool, e.g., ChatGPT Image / Midjourney].

---

## Cover Concept
[Name the chosen concept type from Phase 1.3 and a 1-sentence reason why it fits this story]

---

## Prompt

[Full assembled prompt — Sections A through G, written as flowing, connected prose paragraphs, not a bulleted list. Approximately 200–400 words. Each section flows into the next without headers in the final prompt text.]

**No text. No watermarks. No logos.**

---

## Title Placement Note

[Instruct the user where to place the title, what font style is appropriate for the genre, and what visual breathing room to leave in the composition.]

---

## Optional Variation Prompts

**Variant A — [Name]:**
[One paragraph variation — same character, different moment, posture, or lighting]

**Variant B — [Name]:**
[One paragraph variation — tighter crop, more focused, or different compositional approach]

**Variant C — [Name] (if applicable):**
[Optional third variant — character close-up, environment focus, or symbolic/abstract approach]
```

---

## Phase 4 — Recommended AI Tools by Feature

After delivering the prompt, include this brief recommendation based on the prompt's style needs:

| Story Style | Best Tool |
|---|---|
| Manhwa / Anime / High-detail character | **Midjourney v6+** or **Niji mode** |
| Realistic / Painterly / Cinematic | **ChatGPT Image (GPT-4o)** or **DALL-E 3** |
| Typography integration (title in image) | **Ideogram v2** |
| Iterative refinement / control | **Stable Diffusion (ComfyUI)** with LoRAs |
| Quick draft / conceptual exploration | **Adobe Firefly** or **Leonardo.ai** |

Recommend 1–2 tools for the specific prompt, and if the story has existing character design sheets, note that those can be used as reference images in Midjourney or as LoRA training data.

---

## Quality Checklist

Before delivering the prompt, verify every item:

- [ ] Every visual detail in the prompt traces back to something from the actual story
- [ ] Protagonist's appearance matches the story's character design sheet exactly
- [ ] The setting is the story's real setting — not a generic version of that setting type
- [ ] The color palette matches the story's described atmosphere (not default fantasy colors)
- [ ] Composition leaves title placement space at the top
- [ ] The chosen Cover Concept matches the story's dominant tone
- [ ] Negative constraints (`No text. No watermarks.`) are present at the end
- [ ] At least two variants are provided
- [ ] The prompt reads as cinematic, intentional prose — not a bulleted feature list

---

## Reference: What a Gold-Standard Prompt Looks Like

This section shows you the exact prose quality, specificity, and structure to target regardless of what project you are working in. There is no external file to read — everything you need is here.

### Anatomy of a Great Cover Art Prompt

A gold-standard prompt has five recognizable qualities. Study each one.

---

#### Quality 1 — The Conceptual Frame Opens It

The first sentence does not describe what the image looks like. It explains *what world this image belongs to* — the genre contract, the visual lineage, and what makes this story's take on that genre unique.

**Weak (generic):**
> "Dark fantasy book cover. A young man stands alone in front of a large building at night."

**Strong (specific, conceptually grounded):**
> "This is cover art for a Filipino office parody novel directly inspired by the visual language of manhwa action epics — where raids become project deadlines, shadow soldiers become burned-out coworkers, and the dark gate is the elevator to the eleventh floor. The visual grammar of the epic action genre applies, but every element is replaced with its corporate equivalent."

Notice: the strong version tells the AI model *how to interpret everything that follows*. It establishes a conceptual lens that governs tone, lighting, and character weight.

---

#### Quality 2 — The Setting Is Named, Not Gestured At

Weak prompts say "a city" or "an office building." Strong prompts name the world.

**Weak:**
> "An office at night with city lights outside."

**Strong:**
> "The open-plan office floor stretches into shadow behind him: rows of dark cubicles, glowing monitors, a flickering fluorescent tube overhead. Through the far windows, the nighttime skyline of BGC, Taguig — glass towers, orange city glow — bleeds in from outside."

The named city changes the entire read of the image. BGC (Bonifacio Global City) implies a specific socioeconomic context, a Filipino corporate world, a certain kind of aspirational-but-grinding atmosphere. "A city" implies nothing.

Apply this principle to every genre:
- Not "a forest" → "a dying conifer forest in northern autumn, stripped to gray skeleton branches against a pale overcast sky"
- Not "a castle" → "a keep built into a cliffside, half-collapsed on the seaward face, still inhabited on the landward side"
- Not "a spaceship" → "the cargo bay of a decommissioned colony hauler — low ceiling, exposed hydraulic lines, oxygen canisters welded to the walls as afterthought survival equipment"

---

#### Quality 3 — Character Posture Carries the Story's Emotional Core

The single most powerful element in character description is not appearance — it is posture combined with expression. This is where the story's thematic argument lives.

**Weak:**
> "A man with a determined expression."

**Strong:**
> "His posture is utterly still — not triumphant, not tense. Just calm. The kind of calm that comes after surviving something no one else did. His eyes carry a cold, quiet intensity staring directly forward."

The weak version says "this person wants to win." The strong version says "this person has already decided what they are, and they are waiting for the world to catch up." That is a completely different story, told through body language alone.

Map the posture to the story's argument:
- A story about quiet resilience → still, controlled, weight evenly distributed, no tension in the shoulders
- A story about grief under a mask → straight posture, controlled expression, but the hands are doing something wrong — gripping too hard, folded too tightly
- A story about someone on the edge of a decision → leaning slightly forward, weight shifted to one foot, mid-breath
- A story about someone who has lost → slightly bowed, looking up instead of forward, exhaustion in the eyes that the expression tries to hide

---

#### Quality 4 — The Color Palette is Named Like a Painter, Not a Decorator

Art direction for AI models works the same way it works for human painters: you name the palette like a painter would. This requires specificity beyond basic color names.

**Weak:**
> "Dark blue and gray color palette."

**Strong:**
> "The overall color palette is cold: deep navy, charcoal gray, white fluorescent, with one streak of amber from the city outside."

**More examples of painter-precise palette descriptions:**
- `Muted earth tones — raw umber, warm ochre, and dried grass yellow — broken only by a single point of cold steel blue in the weapon at his side.`
- `Desaturated lilac and ash white in the foreground; deep midnight blue and void black in the background. The only warm color is a single candle flame reflected in her eyes.`
- `Warm amber and fox-fur orange dominate the upper half; the lower half fades into cool shadow — slate blue and charcoal — as if the warmth has not yet reached the ground.`
- `Clinical white and sterile gray, the palette of a hospital or a government building. Against this, her red coat functions as a wound.`

Always ask: what is the one accent color that breaks the palette and why does it mean something?

---

#### Quality 5 — The Mood Is Stated as Human Experience, Not Adjective

The mood sentence at the end of your prompt is not art criticism. It is the emotional residue you want the viewer to carry away. Write it as an experience, not a descriptor.

**Weak (adjectives):**
> "The mood is dark, mysterious, and epic."

**Strong (experience):**
> "The image carries the feeling of someone who has already won but has not yet been told."

More examples of strong mood statements:
- `The quiet dignity of someone who has been underestimated for so long they stopped needing anyone else to understand.`
- `The moment before a choice that cannot be undone — not dread, but a strange, cold clarity.`
- `The grief of a world that kept moving even when it should have stopped.`
- `The exhaustion of someone who fought and won and found the winning wasn't what they thought it would be.`
- `The loneliness of being the only person in a crowded room who can see what is coming.`

---

### Complete Annotated Example

Below is a complete, annotated cover art prompt for a fictional story ("The Department") that demonstrates all five qualities assembled into a whole. Use this as your benchmark — not as a template to copy, but as a bar to clear.

```
[CONCEPTUAL FRAME]
This is cover art for a slow-burn corporate thriller set in a Manila government agency — 
where bureaucratic red tape is treated with the visual weight of a spy thriller, and the 
protagonist's invisible competence is the most dangerous thing in a building full of people 
who believe power is visible.

[PROTAGONIST — posture carrying the theme]
A Filipino woman in her early 30s stands at the center of a long corridor lit by overhead 
fluorescent bars, surrounded by filing cabinets that stretch to both walls. She wears a 
plain white blouse, dark pencil skirt, low heels. Her posture is deliberate stillness — 
hands at her sides, no tension, no performance. She is not looking at the camera. She is 
looking slightly to the left, as if she has heard something the viewer has not. Her 
expression is blank in the specific way that means she is computing.

[SETTING — named, not gestured at]
The corridor is in a government building in Quezon City — high ceilings, cracked linoleum, 
pale yellow walls bearing a decade of sun damage. The overhead lights cast a merciless 
downward white. In the distance, at the far end of the corridor, a door is open — and 
through it, daylight. Between her and that door: shadows. Between the filing cabinets: 
more shadows.

[LIGHTING + PALETTE — painter-precise]
Lighting is full fluorescent, overhead, directional — shadows fall straight down, cutting 
her face into planes of harsh white and deep gray. No warmth anywhere in the building. 
The palette is institutional: pale lemon yellow from the walls, stark white from the lights, 
charcoal and shadow everywhere else. The single exception is the open door at the end of 
the corridor — it glows warm amber, a destination that may or may not be safety.

[MOOD — human experience]
The image carries the specific unease of a building that knows all your secrets and has 
decided to say nothing yet.

Vertical portrait, 2:3 ratio. Character centered in the lower half of the frame, the 
corridor receding dramatically above and behind her, creating title space at the top. 
Cinematic realist illustration, photorealistic shading with subtle graphic line treatment. 
No text, no watermarks, no logos.
```

Study what this example does:
- The first sentence explains the genre contract before any visual appears
- Every location detail is traceable to a real place with real cultural associations
- The posture description tells the story's argument in two sentences
- The color palette names specific hues and explains the symbolism of the accent color
- The mood sentence is an experience the viewer can feel, not an adjective they can agree with

---

## Common Mistakes to Avoid

**Generic worldbuilding** — "a city at night" is not a setting. "The nighttime skyline of BGC, Taguig — glass towers, orange city glow" is a setting.

**Protagonist as archetype** — Don't describe "a young warrior with determination in his eyes." Describe the specific person this story is about.

**Mismatched tone** — A dark, quiet office thriller should not have a prompt calling for epic fantasy lighting. Match the genre visual language to the actual story genre.

**Skipping the chapters** — The specification summary is not enough. Read chapters. The specific sensory details authors use — the weight of a bag, the flicker of a light tube, the exact brand of coffee — are the details that make a prompt feel real rather than generated.

**Overstuffing the prompt** — More detail is not always better. After 300 words, AI models begin to average over conflicting descriptors. Prioritize the 10 most essential visual facts.

**Forgetting variants** — The user may run this prompt 20 times. Give them 2–3 meaningfully different approaches so they have options, not just iterations of the same shot.
