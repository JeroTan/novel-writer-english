# Novel Workflow

## Core Workflow

1. `/constitution` - Set writing principles.
2. `/specify` - Define story core and canonical knowledge.
3. `/clarify` - Resolve important unknowns.
4. `/planner` - Build saga, arc, and chapter plan.
5. `/task-manager` - Create chapter task checklist.
6. `/writer` - Write chapter from plan and relevant draft.
7. `/editor` - Propose and approve chapter-level changes.
8. `/reviewer` - Check continuity, tracking, knowledge, and readiness.

Use `/utility-guide-me` for command selection. Use `/utility-command-cross-check [command]` when project files may use an older format.

## Utilities

- `/utility-drafter` - Create or revise loose draft prose.
- `/utility-scene-maker` - Draft one focused scene.
- `/utility-checklist` - Run project checklist.
- `/utility-track-init` - Initialize tracking JSON.
- `/utility-track` - Query or update tracking state.
- `/utility-timeline` - Manage timeline events.
- `/utility-relations` - Manage relationship state.
- `/utility-meta` - Create novel metadata.
- `/utility-expert` - Request focused expert analysis.
- `/utility-authentic-voice` - Refine prose voice.
- `/utility-authenticity-audit` - Audit prose authenticity.
- `/utility-character-sheets-prompt` - Create character-sheet prompt.
- `/utility-settings-sheets-prompt` - Create setting-sheet prompt.
- `/utility-object-sheets-prompt` - Create object-sheet prompt.
- `/utility-npc-sheets-prompt` - Create NPC/general-sheet prompt.

## Comics Bonus

- `/comics-planner` - Adapt novel chapters into comic pages.
- `/comics-task` - Track comic page work.
- `/comics-chapter-pages-prompt` - Generate page image prompts.
- `/comics-revise-prompt` - Revise page or sheet prompts.

## Story Lookup Tools

Installed MCP server name: `novel-writer`.

- `list_novels`
- `list_chapters` - Recursively counts/lists chapters under `content/`, including saga/arc/custom nesting.
- `list_of_characters`
- `search_character`
- `list_of_settings`
- `search_settings`
- `list_of_glossary`
- `character_states`
- `validate_story_files`

Tools are read-only. Use `list_chapters` for current, existing, written, latest, or chapter-count questions; use `offset` for later pages or descending order for latest records first. `list_novels` only selects a story folder. Pass `novel` when `stories/` contains multiple novels. Search accepts exact names, partial names, aliases, and context terms. Results include source paths and lines when available.

## Starting MCP Server

No separate server terminal is needed during normal use. Installer adds project MCP configuration bound to exact installation project root, and selected agent starts `novel-writer` automatically when project opens. MCP uses an isolated project-bound npm cache; rerunning installer replaces old managed bindings and rebuilds that cache. Restart agent after installation. Rerun installer if project folder moves or is renamed.

Check automatic connection with agent MCP screen or command:

- Claude Code: `/mcp`
- Gemini CLI: `/mcp` or `gemini mcp list`
- OpenCode: MCP status or `opencode2 mcp list`
- Codex CLI: `/mcp` or `codex mcp list`

Manual diagnostic only:

```shell
npx --yes novel-writer-english@__PACKAGE_VERSION__ mcp --project-root .
```

This command does not open a prompt, port, or web page. Server waits for MCP messages over stdio, so terminal appears idle until an MCP client connects. Stop manual diagnostic with `Ctrl+C`.

## Tool Errors

- `FORMAT_ERROR`: Run `/utility-command-cross-check specify` for knowledge files or `/utility-command-cross-check utility-track` for tracking files.
- `NOT_FOUND`: Try partial spelling, broader text, another context term, or correct novel name.
- `TOOL_ERROR`: Reinstall `novel-writer-english`, restart agent, then check MCP connection again.
