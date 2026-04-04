# Using Novel Writer with Cursor

Novel Writer is fully compatible with Cursor via its custom `.agent.md` and `.cursor/rules/` (or skills) system.

## Setup Instructions

### 1. Install the Skill
Open your Cursor terminal and run:
```bash
npx skills add JeroTan/novel-writer-workflow-guide-english
```
This will download the necessary skill files into your project.

### 2. Install the Agents
Copy the `agents/` directory from this repository into your project's `.cursor/agents/` directory (or wherever your Cursor configuration expects custom agents to live).

Your project structure should look like this:
```
my-novel/
├── .cursor/
│   ├── agents/
│   │   ├── novel-writer.agent.md
│   │   ├── constitution.agent.md
│   │   └── ...
│   └── rules/
│       └── ...
```

## How to Use

1. Open the **Cursor Chat** panel (Cmd+L / Ctrl+L).
2. Mention the Novel Writer agent using `@Novel Writer` (depending on Cursor's current UI for custom agents).
3. Tell the agent: "Help me write a novel using the 7-step methodology."
4. Follow the agent's guidance. It will walk you through creating your constitution, specifying your story, planning, and finally writing.

## Pro Tips for Cursor
- Use **Composer (Cmd+I)** for Step 6 (Writing). The Composer is excellent at generating multiple files or large chunks of code/text simultaneously, making it perfect for drafting chapters.
- Ensure Cursor's context window settings are maximized, as novel writing requires the AI to remember your Constitution, Specification, and Plan simultaneously.