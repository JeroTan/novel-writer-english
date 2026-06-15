# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Added `/editor` command for one-chapter revision, approve/skip tracking, and confirmed application of approved edits.
- Added `punctuation-emotional-effect` writing technique skill.
- Added `strategic-reversal` writing technique skill for contests, tactics, bluffs, hidden rules, clever wins, and fair reversals.
- Added `strategic-reversals.md` knowledge template for contest systems, character strategy profiles, and reversal ledgers.
- Added `comedic-banter-rhythm` writing technique skill for witty banter, comedic escalation, argument-driven exposition, and humor under pressure.
- Added `namecraft` writing technique skill with naming sources and a naming brief for characters, factions, places, titles, abilities, systems, artifacts, arcs, and concepts.
- Added Codex command-to-skill conversion during install so `/constitution`, `/writer`, `/editor`, and other commands are available as Codex skills.
- Added `/utility-command-cross-check` for checking whether a project file created by a workflow command is stale against the current command format.
- Added bonus comics prompt workflow commands: `/comics-planner`, `/comics-task`, `/comics-chapter-pages-prompt`, and `/comics-revise-prompt`.
- Added visual reference sheet prompt utility commands for characters, settings/places, objects/props, and NPC/general designs.
- Added `comics-prompting` writing technique skill for manga, manhwa, manhua, webtoon, comic page prompts, revision prompts, and visual reference sheet prompts.

### Changed
- Updated workflow docs from seven core steps to eight core steps: `/writer` -> `/editor` -> `/reviewer`.
- Refocused `/reviewer` on broad project QA, continuity, tracking, knowledge, and final readiness.
- Moved punctuation-for-emotion guidance out of `/writer` into the new writing technique skill.
- Expanded `/planner` creative-plan output with metadata, saga/arc position, nested saga -> arc -> chapter hierarchy, flexible pacing tags mapped to chapter numbers, chapter flow, continuity notes, and `[N/A]` markers for any truly non-applicable section or field.
- Updated `/task-manager` output to mirror planner saga/arc/chapter hierarchy with simple one-line chapter tasks, remove planner-detail repetition and word estimates, and add a Review & Editing Log for `/editor` and `/reviewer` entries.
- Updated `/writer` to use the matching `creative-plan.md` chapter section as the main writing brief alongside compatible draft material.
- Updated `/specify` to keep `specification.md` lean and move detailed canon into `stories/[novel-name]/knowledge/`, with a Knowledge Map and glossary file initialization.
- Updated `/planner`, `/writer`, `/editor`, and `/reviewer` to optionally use strategic reversal guidance only when relevant, with `[N/A]` allowed in plans.
- Expanded `dialogue-techniques` and `character-voices.md` with banter roles, exposition roles, humor style, pressure response, status behavior, and status-flip dialogue checks.
- Updated `/specify`, `/planner`, `/writer`, `/editor`, and `/reviewer` to use naming guidance when important proper nouns are missing, generic, or off-pattern.
- Updated `/utility-command-cross-check` to preserve rich knowledge-file detail when revising stale formats.
- Updated README, root skill reference, guide command, and command cross-check to include comics adaptation outputs and sheet prompt formats.
- Updated comics planning and page prompting to treat dialogue as required comic structure, infer faithful dialogue from sparse prose, and stage missed/whispered/interrupted lines visually instead of adding meta-notes.
- Updated comics planning, task tracking, page prompting, revise prompting, and cross-check to enforce page-to-page continuity, carryover state, transition indicators, and extra pages when scene flow would otherwise break.
- Updated `/editor` suggestion output from a wide table to a numbered line-item list with Current, Suggest, Reason, and Status fields.
- Updated `/editor` suggestions to require full exact Current text and full exact Suggest replacement text, with no fragments, summaries, or ellipses.
- Updated `/utility-meta` with allowed Royal Road-style genre/tag lists and a new `work-type` array.
- Added Anti-God-File split mode for large `specification.md`, `creative-plan.md`, and `tasks.md` files over about 500 lines, with `_main.md` maps and focused shards.

## [1.0.0] - 2026-04-04
### Added
- Complete English translation of all skills, templates, knowledge bases, and commands from the original `novel-writer-skills` repository.
- Re-architected directory structure for platform-agnostic use.
- Removed Claude Code-specific model dependencies and YAML frontmatter constraints.
- Western genre knowledge bases: Science Fiction, Thriller, and Horror.
- Adapted English equivalent writing styles: Conversational, Ornate, Web Serial, Literary, and Minimal.
- Adapted English equivalent requirements and guidelines (replacing Chinese-specific anti-AI rules with universal authentic voice rules).
- Integrated `.agent.md` files for direct VS Code Copilot, Cursor, and Windsurf usage.
- Comprehensive platform setup guides (`vscode-copilot.md`, `cursor.md`, `windsurf.md`, `claude-code.md`, `generic-ai.md`).
- Self-bootstrapping skill detection in agent files.
