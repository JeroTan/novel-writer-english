import os
import re

agent_skills = {
    "constitution": [
        ("pacing-rhythm", "skills/writing-techniques/pacing-rhythm/SKILL.md", "Ask the user about their preferred pacing archetype."),
        ("character-depth", "skills/writing-techniques/character-depth/SKILL.md", "Ask the user about their preferred approach to character psychology.")
    ],
    "specify": [
        ("character-depth", "skills/writing-techniques/character-depth/SKILL.md", "Require Wound/Ghost and Origin of Motivation for every major character."),
        ("setting-detector", "skills/quality-assurance/setting-detector/SKILL.md", "Auto-detect genre and setting elements.")
    ],
    "clarify": [
        ("character-depth", "skills/writing-techniques/character-depth/SKILL.md", "Flag if any major character lacks psychological backstory."),
        ("requirement-detector", "skills/quality-assurance/requirement-detector/SKILL.md", "Identify missing core requirements.")
    ],
    "planner": [
        ("pacing-rhythm", "skills/writing-techniques/pacing-rhythm/SKILL.md", "Reference the chosen pacing archetype, assign pacing tags to chapters."),
        ("scene-structure", "skills/writing-techniques/scene-structure/SKILL.md", "Ensure Scene/Sequel rhythm.")
    ],
    "task-manager": [
        ("pacing-rhythm", "skills/writing-techniques/pacing-rhythm/SKILL.md", "Tag each task with its pacing type.")
    ],
    "writer": [
        ("pre-write-checklist", "skills/quality-assurance/pre-write-checklist/SKILL.md", "MANDATORY pre-flight check before writing."),
        ("emotional-interiority", "skills/writing-techniques/emotional-interiority/SKILL.md", "Ensure internal reactions."),
        ("dialogue-techniques", "skills/writing-techniques/dialogue-techniques/SKILL.md", "Ensure subtext in dialogue."),
        ("pacing-rhythm", "skills/writing-techniques/pacing-rhythm/SKILL.md", "Verify chapter matches its pacing tag."),
        ("character-depth", "skills/writing-techniques/character-depth/SKILL.md", "Verify character voice matches their psychology.")
    ],
    "reviewer": [
        ("consistency-checker", "skills/quality-assurance/consistency-checker/SKILL.md", "MANDATORY content consistency check."),
        ("forgotten-elements", "skills/quality-assurance/forgotten-elements/SKILL.md", "Check for dropped plot threads."),
        ("emotional-interiority", "skills/writing-techniques/emotional-interiority/SKILL.md", "Flag report-style narration."),
        ("pacing-rhythm", "skills/writing-techniques/pacing-rhythm/SKILL.md", "Flag fragment overuse, flag wrong pacing.")
    ],
    "novel-writer": [
        ("workflow-guide", "skills/quality-assurance/workflow-guide/SKILL.md", "Reference the 7-step methodology."),
        ("getting-started", "skills/quality-assurance/getting-started/SKILL.md", "Help the user if they are stuck.")
    ]
}

def build_table(skills_list):
    table = ""
    for skill, path, instruction in skills_list:
        table += f"| `{skill}` | `{path}` | {instruction} |\n"
    return table.strip()

vscode_template = """## Required Skills
This agent MUST incorporate the following skills during its workflow. Read each skill file and follow its guidance:

| Skill | File | How to Use |
|-------|------|-----------|
{table}

If the skill files are not found, inform the user:
> "This agent works best with the novel-writing skills installed. Run:
> ```bash
> npx skills add JeroTan/novel-writer-english
> ```
> I'll continue, but the output quality will be reduced without these skills."
"""

gemini_template = """## Required Skills
This agent MUST incorporate the following skills during its workflow. Read each skill file and follow its guidance:

| Skill | File | How to Use |
|-------|------|-----------|
{table}

If the skill files are not found, inform the user:
> "This agent works best with the novel-writing skills installed. Run:
> ```bash
> gemini skills install https://github.com/JeroTan/novel-writer-english.git
> ```
> I'll continue, but the output quality will be reduced without these skills."
"""

def update_file(filepath, template, agent_name):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    table = build_table(agent_skills[agent_name])
    new_section = template.replace("{table}", table)

    # Regex to match the old section
    pattern = re.compile(r"## Before Starting: Skill Check.*?(?=\n## |\Z)", re.DOTALL)
    
    if pattern.search(content):
        new_content = pattern.sub(new_section.strip(), content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    else:
        print(f"Section not found in {filepath}")

# Update VS Code agents
for agent_file in os.listdir("agents"):
    if agent_file.endswith(".agent.md"):
        agent_name = agent_file.split(".")[0]
        if agent_name in agent_skills:
            update_file(os.path.join("agents", agent_file), vscode_template, agent_name)

# Update Gemini CLI agents
for agent_file in os.listdir(".gemini/agents"):
    if agent_file.endswith(".md"):
        agent_name = agent_file.split(".")[0]
        if agent_name in agent_skills:
            update_file(os.path.join(".gemini/agents", agent_file), gemini_template, agent_name)

