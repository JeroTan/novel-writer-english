# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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