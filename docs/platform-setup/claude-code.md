# Using Novel Writer with Claude Code

This system was originally inspired by the Chinese `novel-writer-skills` project built specifically for Claude Code. This English adaptation remains fully compatible.

## Setup Instructions

### 1. Structure Your Directories
Instead of using `.agent.md` files, Claude Code relies on its native `.claude/` directory structure for prompts and tools.

Copy the `commands/` directory from this repository to your `.claude/commands/` directory:
```bash
cp -r commands/ .claude/commands/
```

If you wish to use the modular skills, copy the `skills/` directory to `.claude/skills/`.

Your project should look like this:
```
my-novel/
├── .claude/
│   ├── commands/
│   │   ├── constitution.md
│   │   ├── specify.md
│   │   └── ...
│   └── skills/
│       ├── genre-knowledge/
│       └── ...
```

## How to Use

Claude Code allows you to execute these markdown files as slash commands in the terminal.

1. Open your terminal and start Claude Code (`claude`).
2. Run `/constitution` to start Step 1.
3. Run `/specify` to start Step 2.
4. Run `/clarify` to start Step 3.
5. Run `/plan` to start Step 4.
6. Run `/tasks` to start Step 5.
7. Run `/write` to start Step 6.
8. Run `/analyze` periodically for Step 7.

Because Claude Code operates natively in your terminal, it will automatically read and write the necessary files in your `memory/` and `stories/` directories.