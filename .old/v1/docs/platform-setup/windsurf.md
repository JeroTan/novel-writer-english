# Using Novel Writer with Windsurf

Novel Writer works seamlessly with Windsurf, leveraging its powerful AI agents and deep workspace understanding.

## Setup Instructions

### 1. Install the Skill
Open your Windsurf terminal and run:
```bash
npx skills add JeroTan/novel-writer-english
```
This will download the necessary skill files into your project.

### 2. Install the Agents
Copy the `agents/` directory from this repository into your project's designated custom agent directory for Windsurf.

## How to Use

1. Open the **Windsurf Chat** or **Cascade**.
2. Select the `Novel Writer` agent or include its instructions in your context.
3. Start by saying: "I want to write a novel. Let's begin Step 1."
4. Windsurf's deep workspace integration will automatically read your `memory/constitution.md` and `stories/` directory as they are created, ensuring perfect continuity without needing to manually attach files to every message.

## Pro Tips for Windsurf
- **Cascade Mode:** Use Cascade for Step 5 (Tasks) and Step 6 (Write). Cascade is highly effective at autonomously running through a checklist of tasks (like writing sequential chapters) while reading the necessary context files (Constitution, Plan, Spec) automatically.