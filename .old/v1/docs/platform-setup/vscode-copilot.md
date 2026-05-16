# Using Novel Writer with VS Code and GitHub Copilot

Novel Writer is fully compatible with GitHub Copilot in VS Code via the Agent and Skills system. This provides the most integrated and guided experience.

## Setup Instructions

### 1. Install the Skill
Open your VS Code terminal and run:
```bash
npx skills add JeroTan/novel-writer-english
```
This will download the necessary skill files (genre knowledge, quality assurance, writing techniques) into your `.github/skills/` directory.

### 2. Install the Agents
Copy the `agents/` directory from this repository into your project's `.github/agents/` directory.

Your project structure should look like this:
```
my-novel/
├── .github/
│   ├── agents/
│   │   ├── novel-writer.agent.md
│   │   ├── constitution.agent.md
│   │   └── ...
│   └── skills/
│       ├── genre-knowledge/
│       └── ...
```

## How to Use

1. Open the **GitHub Copilot Chat** panel.
2. In the chat input, type `@` and select `Novel Writer`.
3. Type your request, e.g., "I want to start a new fantasy novel."
4. The orchestrator agent will guide you through the 7-step methodology.
5. It will offer interactive buttons ("Handoffs") to switch to the specialized agents (like `@constitution` or `@specify`) for each step.

## Model Recommendations
- **Planning & Analysis (Steps 1-5, 7):** We recommend using **Gemini 3.1 Pro** (if available) or **Claude 3.5 Sonnet** via Copilot for their strong reasoning and large context windows.
- **Writing (Step 6):** We recommend **Claude 3 Opus** or **Claude 3.5 Sonnet** for their superior creative writing prose and adherence to stylistic instructions.