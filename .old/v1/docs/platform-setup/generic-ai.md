# Using Novel Writer with Generic AI (ChatGPT, Gemini, Claude Web)

You don't need a fancy IDE or terminal agent to use the Novel Writer methodology. You can use it perfectly well with standard web-based AI chatbots like ChatGPT, Google Gemini, or Claude.ai.

However, because these platforms cannot read or write files directly to your local computer, you will act as the bridge.

## Setup Instructions

1. Create a folder on your computer for your novel (e.g., `My-Novel/`).
2. Inside, create two subfolders: `memory/` and `stories/`.
3. Keep the `commands/` folder from this repository handy.

## How to Use

### Step 1: Constitution
1. Open `commands/constitution.md` in a text editor.
2. Copy the entire contents of the file.
3. Paste it into your AI chat, adding your own ideas at the top where it says `User Input: $ARGUMENTS`.
4. The AI will generate a Constitution document for you.
5. Copy the AI's output and save it as `memory/constitution.md` on your computer.

### Step 2: Specify
1. Open `commands/specify.md`.
2. Copy the contents and paste it into the AI.
3. **CRITICAL:** Also copy and paste the contents of your `memory/constitution.md` into the same prompt, telling the AI: "Here is my constitution for reference: [paste]".
4. Save the AI's output as `stories/My-Novel/specification.md`.

### Step 6: Write (The Pre-Write Checklist)
When using a web UI, the "Pre-Write Checklist" is entirely manual but crucial. Before asking the AI to write Chapter 1, you must assemble the prompt yourself:

```text
Please write Chapter 1. Before you write, review this context:

--- CONSTITUTION ---
[Paste memory/constitution.md here]

--- SPECIFICATION ---
[Paste stories/My-Novel/specification.md here]

--- PLAN ---
[Paste stories/My-Novel/creative-plan.md here]

Now, write the chapter adhering strictly to these rules.
```

## Pro Tips for Web UIs
- **Context Windows:** Modern models (like Gemini 3.1 Pro or Claude 3.5 Sonnet) have massive context windows. It is highly recommended to upload your `constitution.md`, `specification.md`, and `creative-plan.md` as attachments to every new chat session to ensure the AI stays on track.
- **Session Management:** Start a new chat session for every 3-5 chapters to prevent the AI from getting confused or slowing down. When starting a new session, always re-upload your planning documents.