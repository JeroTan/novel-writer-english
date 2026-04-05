# Novel Writer English — AI-Powered Novel Writing System

> Free, open-source, seven-step methodology for writing novels with any AI assistant.
> English translation and re-architecture of [novel-writer-skills](https://github.com/wordflowlab/novel-writer-skills) by wordflowlab.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## What is this?
Novel Writer English is a comprehensive, modular AI-powered novel writing system. It transforms standard AI chat interfaces into a structured, step-by-step novel writing assistant. Rather than generating a novel in one go, it guides you through a proven seven-step workflow—from establishing core principles to executing chapters with a built-in pre-write checklist to avoid AI context degradation.

It's completely free, open-source, and platform-agnostic, designed to work smoothly with any popular AI coding tool or generic chat AI.

## Features
- **Seven-Step Methodology:** A structured approach moving from creative principles to chapter execution.
- **Pre-Write Checklist System:** Automatically gathers necessary story context before drafting to maintain consistency over long word counts.
- **Auto-Detection Architecture:** Built-in genre, style, and requirement detectors to tailor the AI's output.
- **Platform Agnostic:** Usable via IDE agents (VS Code, Cursor, Windsurf) or copy-pasting command prompts for ChatGPT/Gemini/Claude web interfaces.
- **Rich Knowledge Base:** Extensive guidelines covering diverse genres (Sci-Fi, Thriller, Romance, Fantasy, etc.) and writing styles.
- **Modular Skills:** Install only the components you need for your project.

## Quick Start

### Option A: Install as a Skill (VS Code / Cursor / Windsurf)

Skills are passive knowledge that the AI loads **automatically** when your prompt matches. No manual invocation needed — just install and chat naturally.

```bash
npx skills add JeroTan/novel-writer-workflow-guide-english
```

That's it. Now open your AI chat in Agent mode and try:

```
"I want to write a fantasy novel about a thief who accidentally steals a god's power."
```

The AI detects you're starting a novel project, loads the workflow guide skill, and walks you through the seven-step methodology. Genre knowledge (fantasy), writing style, and quality assurance skills activate automatically as needed.

**More examples of prompts that trigger the skills:**

```
"Help me revise the plot of chapter 12 — the pacing feels off."
"Check my manuscript for consistency issues across all chapters."
"I'm stuck on how my two leads should meet. Give me three options."
"Write chapter 5 following my specification and creative plan."
```

### Option B: Use Custom Agents (VS Code / Cursor / Windsurf)

Agents are **active workflow controllers** — you select one by name, and it guides you through structured steps with handoff buttons between each phase. They work alongside skills (skills still auto-load in the background).

**Setup (VS Code / Cursor / Windsurf):**

1. Create your novel project folder and set up the structure:
   ```
   my-novel/                          ← your project root (open this in VS Code)
   ├── .github/
   │   └── agents/                    ← paste the 8 agent files here
   │       ├── novel-writer.agent.md
   │       ├── constitution.agent.md
   │       ├── specify.agent.md
   │       ├── clarify.agent.md
   │       ├── planner.agent.md
   │       ├── task-manager.agent.md
   │       ├── writer.agent.md
   │       └── reviewer.agent.md
   ├── memory/                        ← created by @constitution agent
   │   ├── constitution.md
   │   └── personal-voice.md
   └── stories/                       ← created by @specify agent
       └── [your-novel-name]/
           ├── specification.md
           ├── creative-plan.md
           ├── tasks.md
           └── content/
               ├── chapter-01.md
               └── chapter-02.md
   ```
   > **Note:** You only need to create `my-novel/` and paste in the `.github/agents/` files manually. Everything else (`memory/`, `stories/`, all the `.md` files) is **generated automatically** by the agents as you work through the seven steps.

2. Install the skills for enhanced AI knowledge (strongly recommended):
   ```bash
   npx skills add JeroTan/novel-writer-english
   ```

3. Open `my-novel/` as a workspace in VS Code, then open the AI chat panel and select **`@novel-writer`** from the agent dropdown.

**Setup (Gemini CLI):**

Gemini CLI uses a different agent format and path. Pre-built compatible agents are included in the `.gemini/agents/` folder of this repo.

1. Copy the `.gemini/agents/` folder into your novel project:
   ```
   my-novel/
   └── .gemini/
       └── agents/              ← copy these 8 files from this repo
           ├── novel-writer.md
           ├── constitution.md
           ├── specify.md
           ├── clarify.md
           ├── planner.md
           ├── task-manager.md
           ├── writer.md
           └── reviewer.md
   ```

2. Install the skills:
   ```bash
   gemini skills install https://github.com/JeroTan/novel-writer-english.git
   ```

3. Open your novel project folder, start Gemini CLI, and type `@novel-writer` to begin.

3. The orchestrator agent will:
   - Check if novel-writing skills are installed (and recommend `npx skills add` if not)
   - Detect your project's current state (which steps are already done)
   - Present **handoff buttons** for each of the seven steps

**Example workflow session:**

```
You:      "I want to start a new novel."
@novel-writer: "Great! I see you don't have a creative constitution yet.
               Let's start with Step 1. Click below to begin:"
               [Step 1: Constitution]  [Step 2: Specify]  [Step 3: Clarify] ...

You:      (clicks "Step 1: Constitution")
@constitution: "Let's define your creative principles. First question:
                What is the core theme or message you want your story to convey?"

You:      "The cost of ambition — how far is too far?"
@constitution: "Good. Next: What are your absolute non-negotiables for this story?"
...
@constitution: "Your constitution is saved to memory/constitution.md.
                Ready for the next step?"
               [Step 2: Specify]
```

Each agent hands off to the next when its step is complete. The writer agent enforces the **9-item pre-write checklist** before every chapter to prevent AI context degradation.

### Option C: Use with Any AI Tool (ChatGPT, Gemini, Claude, etc.)

No IDE required. The `commands/` folder contains platform-agnostic prompt templates you can copy-paste into any AI chat.

1. Open the command file for the step you need (e.g., [`commands/write.md`](commands/write.md))
2. Copy the full content
3. Paste it into ChatGPT, Gemini, Claude, or any AI
4. The AI follows the structured instructions

**Example — using the write command in ChatGPT:**

```
1. Open commands/write.md
2. Paste the content into ChatGPT
3. ChatGPT responds: "Before writing, let me run through the pre-write checklist.
   Please share your constitution, story specification, and creative plan."
4. You paste your files
5. ChatGPT writes the chapter following all your specifications
```

> **Tip:** For long novels, upload your `memory/`, `tracking/`, and `stories/` files at the start of each session so the AI has full context.

### Option C (Gemini CLI): Use Native `/novel:*` Commands

Gemini CLI supports project-level custom commands in TOML format, invoked with a `/` prefix. Pre-built Gemini CLI commands are included in `.gemini/commands/novel/`.

**Setup:**
1. Copy the `.gemini/commands/` folder into your novel project root.
2. In Gemini CLI, run `/commands reload` to pick up the new commands.

**Available commands:**

| Command | What it does |
|---------|-------------|
| `/novel:constitution` | Step 1 — create or update your creative constitution |
| `/novel:specify` | Step 2 — build the story specification |
| `/novel:clarify` | Step 3 — resolve ambiguities in the spec |
| `/novel:plan` | Step 4 — create chapter structure and creative plan |
| `/novel:tasks` | Step 5 — break the plan into tracked writing tasks |
| `/novel:write` | Step 6 — write a chapter with the pre-write checklist |
| `/novel:analyze` | Step 7 — quality analysis of framework or chapters |
| `/novel:checklist` | Run a pre/post-write quality checklist |
| `/novel:expert` | Activate a specialized expert persona |
| `/novel:track-init` | Initialize JSON consistency tracking for a new novel |
| `/novel:track` | Update or query the tracking state |
| `/novel:timeline` | Manage the story's chronological timeline |
| `/novel:relations` | Manage and analyze character relationships |
| `/novel:authenticity-audit` | Flag AI-generated patterns in text |
| `/novel:authentic-voice` | Rewrite a passage to remove AI clichés |

**Example:**
```
/novel:write Chapter 3 — the confrontation between Mara and the High Council
```

### Skills vs Agents vs Commands — Which Should I Use?

| Method | Best for | How it works |
|--------|----------|--------------|
| **Skills** (`npx skills add`) | Quick help, natural chat | Auto-activates — just ask naturally |
| **Agents** (`.agent.md`) | Full guided workflow — VS Code / Cursor / Windsurf | Select `@novel-writer`, follow handoff steps |
| **Agents** (`.gemini/agents/`) | Full guided workflow — Gemini CLI | Type `@novel-writer`, follow `@agent-name` prompts || **Commands** (`.gemini/commands/`) | Quick step execution — Gemini CLI | Run `/novel:write`, `/novel:plan`, etc. || **Commands** (copy-paste) | ChatGPT / Gemini / any AI | Copy from `commands/`, paste into chat |

All three methods use the same methodology. Skills are the lightweight always-on layer. Agents add structured workflow on top. Commands are the portable version for any platform.

## The Seven-Step Methodology
1. **Constitution:** Define your core creative principles and non-negotiables.
2. **Specify:** Build a comprehensive story specification (logline -> premise -> one-page -> full spec).
3. **Clarify:** The AI reviews your spec and asks targeted questions to resolve ambiguities.
4. **Plan:** Create the chapter structure, pacing, and character arc mapping.
5. **Tasks:** Break the plan down into actionable, tracked writing tasks.
6. **Write:** Execute the chapters using the 9-item pre-write checklist.
7. **Analyze:** Run periodic quality assurance checks on the written content.

## Project Structure
A standard novel project using this system looks like this:
```
my-novel/
├── memory/
│   ├── constitution.md
│   └── personal-voice.md
├── templates/
├── knowledge/
├── tracking/
├── stories/
│   └── [novel-name]/
│       ├── specification.md
│       ├── creative-plan.md
│       ├── tasks.md
│       └── content/
│           └── chapter-01.md
```

## Available Skills
| Skill | Description |
|-------|-------------|
| `workflow-guide` | Orchestrates the seven-step methodology and coordinates sub-skills. |
| `genre-knowledge/*` | Tropes, expectations, and rules for specific genres (Fantasy, Sci-Fi, Thriller, Romance, Mystery, Horror). |
| `consistency-checker` | QA tool for verifying plot, character, and worldbuilding consistency. |
| `pre-write-checklist` | Ensures the AI has all necessary context loaded before drafting a chapter. |
| `style-detector` | Analyzes and enforces specific prose styles (Conversational, Ornate, Minimal, etc.). |

## Available Agents
| Agent | Role |
|-------|------|
| `novel-writer` | Main orchestrator; guides you through the process and hands off to specialized agents. |
| `constitution` | Helps establish your creative principles. |
| `specify` | Assists in creating the story specification document. |
| `clarify` | Interrogates the spec for ambiguities and helps resolve them. |
| `planner` | Formulates the creative writing plan. |
| `task-manager` | Breaks the plan into a task list. |
| `writer` | The actual writing agent utilizing the pre-write checklist. |
| `reviewer` | Quality analysis and QA agent. |

## Knowledge Bases
- **Genres:** Fantasy, Historical, Horror, Mystery, Power Fantasy/Revenge, Romance, Sci-Fi, Thriller, Wuxia.
- **Requirements:** Authentic Voice, Fast-Paced, Romance-Angst, Romance-Sweet, Serious Literature, Strong Emotion.
- **Styles:** Conversational, Literary, Minimal, Ornate, Web Serial.

## Platform Compatibility
| Platform | Support Level | Setup Guide |
|----------|---------------|-------------|
| VS Code (Copilot) | Full (Agents & Skills) | `docs/platform-setup/vscode-copilot.md` |
| Cursor | Full (Agents & Skills) | `docs/platform-setup/cursor.md` |
| Windsurf | Full (Agents & Skills) | `docs/platform-setup/windsurf.md` |
| Gemini CLI | Full (Agents & Skills) | `docs/platform-setup/gemini-cli.md` |
| Claude Code | Full (Commands) | `docs/platform-setup/claude-code.md` |
| ChatGPT / Gemini / Claude Web | Manual (Prompts) | `docs/platform-setup/generic-ai.md` |

## Attribution
This project is a translation and re-architecture of the incredible work done by the [wordflowlab](https://github.com/wordflowlab/novel-writer-skills) team. See `ATTRIBUTION.md` for full details.

## License
MIT

---

## Sources & References

Documentation consulted when building and verifying platform-specific setup and agent formats:

### Gemini CLI
- [Subagents — agent definition files, YAML schema, tool names, file locations](https://geminicli.com/docs/core/subagents/)
- [Agent Skills — discovery tiers, SKILL.md format, install commands](https://geminicli.com/docs/cli/skills/)
- [Custom Commands — TOML format, `{{args}}`, `!{...}`, file locations](https://geminicli.com/docs/cli/custom-commands/)
- [Building Extensions — extension structure, agent skills in extensions, GEMINI.md](https://geminicli.com/docs/extensions/writing-extensions/)

### VS Code Copilot
- [Custom Instructions](https://code.visualstudio.com/docs/copilot/copilot-customization)
- [Agent mode and tools](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode)

### Agent Skills Open Standard
- [agentskills.io — SKILL.md specification and npx skills tooling](https://agentskills.io)
