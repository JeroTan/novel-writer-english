# Knowledge Base

Reference knowledge libraries for AI-assisted novel writing. These files provide genre conventions, writing style guides, and requirement specifications that the AI loads automatically based on your project's needs.

## Structure

### Genres (`genres/`)

Genre-specific knowledge including conventions, reader expectations, common pitfalls, and structural patterns.

| File | Genre | Description |
|------|-------|-------------|
| `fantasy.md` | Fantasy | Magic systems, worldbuilding, quest structures |
| `historical.md` | Historical Fiction | Period accuracy, research integration, anachronism avoidance |
| `horror.md` | Horror | Atmosphere, dread, pacing for scares |
| `mystery.md` | Mystery/Detective | Clue planting, fair play rules, red herrings |
| `revenge.md` | Power Fantasy / Revenge | Stakes escalation, satisfaction beats, face-slapping |
| `romance.md` | Romance | Relationship arcs, emotional beats, HEA/HFN |
| `scifi.md` | Science Fiction | Technology consistency, speculative worldbuilding |
| `thriller.md` | Thriller/Suspense | Tension mechanics, ticking clocks, stakes |
| `wuxia.md` | Wuxia (Martial Arts Fiction) | Jianghu, cultivation systems, honor codes |

### Writing Styles (`styles/`)

Style guides that control the AI's prose voice and writing approach.

| File | Style | Think... |
|------|-------|----------|
| `conversational.md` | Conversational | Contemporary fiction, dialogue-heavy, natural |
| `literary.md` | Literary | Thematic depth, layered prose, subtext |
| `minimal.md` | Minimal | Hemingway, Carver — spare and precise |
| `ornate.md` | Ornate | Tolkien, Rothfuss — rich and elaborate |
| `web-serial.md` | Web Serial | Royal Road, Wattpad — hooks and cliffhangers |

### Requirements (`requirements/`)

Constraint specifications that define non-negotiable rules for the writing.

| File | Requirement | Purpose |
|------|------------|---------|
| `authentic-voice.md` | Authentic Voice | Write naturally, avoid AI-sounding patterns |
| `fast-paced.md` | Fast-Paced | Maintain momentum, cut filler |
| `romance-angst.md` | Romance Angst | Emotional tension, meaningful conflict |
| `romance-sweet.md` | Sweet Romance | Warm, cozy, feel-good tone |
| `serious-literature.md` | Serious Literature | Depth, complexity, no shortcuts |
| `strong-emotion.md` | Strong Emotion | Visceral, impactful emotional writing |

## How These Get Used

1. **Auto-detection**: The `setting-detector` and `style-detector` skills scan your story specification and automatically load the relevant knowledge base files.
2. **Manual selection**: You can specify which style or requirements to use in your story specification or constitution.
3. **AI reference**: The AI reads these files to understand genre conventions and calibrate its writing output accordingly.

## Adding Custom Knowledge

Create new `.md` files in the appropriate subdirectory. Follow the existing format:
- Start with a heading describing the genre/style/requirement
- Include principles, conventions, and examples
- List common pitfalls to avoid
- Provide concrete "do this / not that" examples where possible
