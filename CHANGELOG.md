# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Added `/editor` command for one-chapter revision, approve/skip tracking, and confirmed application of approved edits.
- Added `punctuation-emotional-effect` writing technique skill.
- Added Codex command-to-skill conversion during install so `/constitution`, `/writer`, `/editor`, and other commands are available as Codex skills.
- Added `/utility-command-cross-check` for checking whether a project file created by a workflow command is stale against the current command format.

### Changed
- Updated workflow docs from seven core steps to eight core steps: `/writer` -> `/editor` -> `/reviewer`.
- Refocused `/reviewer` on broad project QA, continuity, tracking, knowledge, and final readiness.
- Moved punctuation-for-emotion guidance out of `/writer` into the new writing technique skill.
- Expanded `/planner` creative-plan output with metadata, saga/arc position, nested saga/arc maps, flexible pacing tags mapped to chapter numbers, chapter flow, and continuity notes.

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
