#!/usr/bin/env node

import { checkbox, confirm, select } from '@inquirer/prompts';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Configuration ───────────────────────────────────────────────────────────

const TOOLS = {
  claude: {
    name: 'Claude Code',
    dir: '.claude',
    commandsDir: 'commands',
    skillsDir: 'skills',
    templatesDir: 'templates',
    commandsFormat: 'md',
  },
  opencode: {
    name: 'OpenCode',
    dir: '.opencode',
    commandsDir: 'commands/novel',
    skillsDir: 'skills',
    templatesDir: 'templates',
    commandsFormat: 'md',
  },
  gemini: {
    name: 'Gemini CLI',
    dir: '.gemini',
    commandsDir: 'commands/novel',
    skillsDir: 'skills',
    templatesDir: 'templates',
    commandsFormat: 'toml',
  },
  codex: {
    name: 'Codex CLI',
    dir: '.agents',
    commandsDir: null,
    skillsDir: 'skills',
    templatesDir: 'templates',
    commandsFormat: null,
  },
};

const SRC_DIR = path.join(__dirname, '..', 'src');

// ─── Helpers ─────────────────────────────────────────────────────────────────

function log(msg) {
  console.log(chalk.white(msg));
}

function success(msg) {
  console.log(chalk.green(`✓ ${msg}`));
}

function warn(msg) {
  console.log(chalk.yellow(`⚠ ${msg}`));
}

function error(msg) {
  console.log(chalk.red(`✗ ${msg}`));
}

function header(msg) {
  console.log(chalk.cyan.bold(`\n${msg}`));
  console.log(chalk.cyan('─'.repeat(msg.length)));
}

// ─── TOML Conversion ─────────────────────────────────────────────────────────

function escapeTomlString(str) {
  if (str.includes('\n') || str.includes('"') || str.includes('\\')) {
    return '"""\n' + str.replace(/"""/g, '\\"\\"\\"') + '\n"""';
  }
  return '"' + str.replace(/"/g, '\\"') + '"';
}

function mdToToml(mdContent, filename) {
  const parsed = matter(mdContent);
  const description = parsed.data.description || `Novel writer: ${filename.replace('.md', '')}`;
  const prompt = parsed.content.trim();

  const toml = `description = ${escapeTomlString(description)}\nprompt = ${escapeTomlString(prompt)}\n`;
  return toml;
}

function mdCommandToSkill(mdContent, filename) {
  const parsed = matter(mdContent);
  const commandName = parsed.data.name || filename.replace('.md', '');
  const commandDescription = parsed.data.description || `Run the /${commandName} novel workflow command.`;
  const prompt = parsed.content.trim();
  const description = `Use when user types /${commandName} or asks for this novel workflow command. ${commandDescription}`;
  const body = `# /${commandName}

Treat text after \`/${commandName}\` as \`$ARGUMENTS\`.

${prompt}
`;

  return matter.stringify(body, {
    name: commandName,
    description,
  });
}

// ─── Conflict Resolution ────────────────────────────────────────────────────

async function resolveConflict(destPath) {
  if (!fs.existsSync(destPath)) return 'copy';

  const action = await select({
    message: `Conflict: ${path.basename(destPath)} already exists. What should I do?`,
    choices: [
      { name: 'Overwrite', value: 'overwrite' },
      { name: 'Skip', value: 'skip' },
      { name: 'Overwrite all remaining', value: 'overwrite-all' },
      { name: 'Skip all remaining', value: 'skip-all' },
    ],
  });

  return action;
}

// ─── Copy Functions ──────────────────────────────────────────────────────────

async function copyCommands(toolKey, toolConfig, overwriteAll, skipAll) {
  const srcCommands = path.join(SRC_DIR, 'commands');

  if (!toolConfig.commandsDir || !fs.existsSync(srcCommands)) {
    log(`  ${toolConfig.name}: No commands to install`);
    return { overwriteAll, skipAll, copied: 0, skipped: 0 };
  }

  const destDir = path.join(toolConfig.dir, toolConfig.commandsDir);

  fs.ensureDirSync(destDir);

  const files = fs.readdirSync(srcCommands).filter(f => f.endsWith('.md'));
  let copied = 0;
  let skipped = 0;
  let newOverwriteAll = overwriteAll;
  let newSkipAll = skipAll;

  for (const file of files) {
    const srcFile = path.join(srcCommands, file);
    let destFile;

    if (toolConfig.commandsFormat === 'toml') {
      const baseName = file.replace('.md', '');
      destFile = path.join(destDir, `${baseName}.toml`);
    } else {
      destFile = path.join(destDir, file);
    }

    if (newSkipAll) {
      skipped++;
      continue;
    }

    if (fs.existsSync(destFile) && !newOverwriteAll) {
      const action = await resolveConflict(destFile);
      if (action === 'skip') {
        skipped++;
        continue;
      } else if (action === 'skip-all') {
        newSkipAll = true;
        skipped++;
        continue;
      } else if (action === 'overwrite-all') {
        newOverwriteAll = true;
      }
    }

    let content = fs.readFileSync(srcFile, 'utf-8');
    if (toolConfig.commandsFormat === 'toml') {
      content = mdToToml(content, file);
    }

    // OpenCode: strip 'name:' from frontmatter — it obstructs command search
    if (toolKey === 'opencode') {
      content = content.replace(/^name: .*\n/m, '');
    }

    fs.writeFileSync(destFile, content, 'utf-8');
    copied++;
  }

  const format = toolConfig.commandsFormat === 'toml' ? 'TOML' : 'Markdown';
  success(`${toolConfig.name}: ${copied} commands copied (${format})${skipped > 0 ? `, ${skipped} skipped` : ''}`);
  return { overwriteAll: newOverwriteAll, skipAll: newSkipAll, copied, skipped };
}

async function copySkills(toolConfig, overwriteAll, skipAll) {
  const srcSkills = path.join(SRC_DIR, 'skills');
  const destDir = path.join(toolConfig.dir, toolConfig.skillsDir);

  if (!fs.existsSync(srcSkills)) {
    log(`  ${toolConfig.name}: No skills to install`);
    return { overwriteAll, skipAll, copied: 0, skipped: 0 };
  }

  fs.ensureDirSync(destDir);

  const skillDirs = fs.readdirSync(srcSkills).filter(f =>
    fs.statSync(path.join(srcSkills, f)).isDirectory()
  );

  let copied = 0;
  let skipped = 0;
  let newOverwriteAll = overwriteAll;
  let newSkipAll = skipAll;

  for (const skillDir of skillDirs) {
    const srcSkillPath = path.join(srcSkills, skillDir);
    const destSkillPath = path.join(destDir, skillDir);

    if (newSkipAll) {
      skipped++;
      continue;
    }

    if (fs.existsSync(destSkillPath) && !newOverwriteAll) {
      const action = await resolveConflict(destSkillPath);
      if (action === 'skip') {
        skipped++;
        continue;
      } else if (action === 'skip-all') {
        newSkipAll = true;
        skipped++;
        continue;
      } else if (action === 'overwrite-all') {
        newOverwriteAll = true;
      }
    }

    fs.copySync(srcSkillPath, destSkillPath, { overwrite: true });
    copied++;
  }

  success(`${toolConfig.name}: ${copied} skills copied${skipped > 0 ? `, ${skipped} skipped` : ''}`);
  return { overwriteAll: newOverwriteAll, skipAll: newSkipAll, copied, skipped };
}

async function copyCommandSkillsForCodex(toolConfig, overwriteAll, skipAll) {
  const srcCommands = path.join(SRC_DIR, 'commands');
  const destDir = path.join(toolConfig.dir, toolConfig.skillsDir, 'commands');

  if (!fs.existsSync(srcCommands)) {
    log(`  ${toolConfig.name}: No commands to convert`);
    return { overwriteAll, skipAll, copied: 0, skipped: 0 };
  }

  fs.ensureDirSync(destDir);

  const files = fs.readdirSync(srcCommands).filter(f => f.endsWith('.md'));
  let copied = 0;
  let skipped = 0;
  let newOverwriteAll = overwriteAll;
  let newSkipAll = skipAll;

  for (const file of files) {
    const srcFile = path.join(srcCommands, file);
    const baseName = file.replace('.md', '');
    const destSkillDir = path.join(destDir, baseName);
    const destFile = path.join(destSkillDir, 'SKILL.md');

    if (newSkipAll) {
      skipped++;
      continue;
    }

    if (fs.existsSync(destSkillDir) && !newOverwriteAll) {
      const action = await resolveConflict(destSkillDir);
      if (action === 'skip') {
        skipped++;
        continue;
      } else if (action === 'skip-all') {
        newSkipAll = true;
        skipped++;
        continue;
      } else if (action === 'overwrite-all') {
        newOverwriteAll = true;
      }
    }

    const content = mdCommandToSkill(fs.readFileSync(srcFile, 'utf-8'), file);
    fs.ensureDirSync(destSkillDir);
    fs.writeFileSync(destFile, content, 'utf-8');
    copied++;
  }

  success(`${toolConfig.name}: ${copied} commands converted to skills${skipped > 0 ? `, ${skipped} skipped` : ''}`);
  return { overwriteAll: newOverwriteAll, skipAll: newSkipAll, copied, skipped };
}

async function copyTemplates(toolConfig) {
  const srcTemplates = path.join(SRC_DIR, 'templates');
  const destDir = path.join(toolConfig.dir, toolConfig.templatesDir);

  if (!fs.existsSync(srcTemplates)) {
    log(`  ${toolConfig.name}: No templates to install`);
    return;
  }

  fs.ensureDirSync(destDir);
  fs.copySync(srcTemplates, destDir, { overwrite: true });

  success(`${toolConfig.name}: templates copied`);
}

// ─── Main Installer ──────────────────────────────────────────────────────────

async function main() {
  header('📖 Novel Writer English — Installer');
  log('');
  log('This will install the AI-assisted novel writing workflow into your project.');
  log('Select which AI tools you want to configure:');
  log('');

  const selectedTools = await checkbox({
    message: 'Which AI tools do you want to install the workflow for?',
    choices: [
      { name: 'Claude Code (.claude/)', value: 'claude', checked: true },
      { name: 'Gemini CLI (.gemini/)', value: 'gemini', checked: true },
      { name: 'OpenCode (.opencode/)', value: 'opencode', checked: true },
      { name: 'Codex CLI (.agents/)', value: 'codex', checked: true },
    ],
    required: true,
  });

  if (selectedTools.length === 0) {
    log(chalk.yellow('\nNo tools selected. Exiting.'));
    process.exit(0);
  }

  if (!fs.existsSync(SRC_DIR)) {
    error(`Source directory not found: ${SRC_DIR}`);
    error('Make sure you are running this from the novel-writer-english package directory.');
    process.exit(1);
  }

  const existingTools = selectedTools.filter(tool =>
    fs.existsSync(TOOLS[tool].dir)
  );

  let overwriteAll = false;
  let skipAll = false;

  if (existingTools.length > 0) {
    const names = existingTools.map(t => TOOLS[t].name).join(', ');
    warn(`Existing directories found for: ${names}`);
    log('');
  }

  header('📦 Installing workflow...');

  for (const toolKey of selectedTools) {
    const tool = TOOLS[toolKey];
    header(`Installing for ${tool.name}...`);

    if (tool.commandsDir) {
      const cmdResult = await copyCommands(toolKey, tool, overwriteAll, skipAll);
      overwriteAll = cmdResult.overwriteAll;
      skipAll = cmdResult.skipAll;
    }

    const skillResult = await copySkills(tool, overwriteAll, skipAll);
    overwriteAll = skillResult.overwriteAll;
    skipAll = skillResult.skipAll;

    if (toolKey === 'codex') {
      const commandSkillResult = await copyCommandSkillsForCodex(tool, overwriteAll, skipAll);
      overwriteAll = commandSkillResult.overwriteAll;
      skipAll = commandSkillResult.skipAll;
    }

    await copyTemplates(tool);

    log('');
  }

  header('✅ Installation complete!');
  log('');
  log('Installed for:');
  for (const toolKey of selectedTools) {
    const tool = TOOLS[toolKey];
    log(`  ${chalk.green('✓')} ${tool.name} → ./${tool.dir}/`);
  }
  log('');
  log('Next steps:');
  log('  1. Open your project in the selected AI tool');
  log('  2. The commands and skills will be automatically discovered');
  log('  3. Start with /constitution to set up your novel');
  log('');
  log('For more info: https://github.com/JeroTan/novel-writer-english');
  log('');
}

main().catch(err => {
  error(err.message);
  process.exit(1);
});
