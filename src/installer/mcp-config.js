import fs from 'fs-extra';
import path from 'node:path';
import { applyEdits, modify, parse } from 'jsonc-parser';
import { parse as parseToml } from 'smol-toml';

const SERVER_NAME = 'novel-writer';
const TOML_START = '# >>> novel-writer-english MCP >>>';
const TOML_END = '# <<< novel-writer-english MCP <<<';

export function encodeProjectRoot(projectRoot) {
  return Buffer.from(path.resolve(projectRoot), 'utf8').toString('base64url');
}

export function decodeProjectRoot(encodedRoot) {
  if (typeof encodedRoot !== 'string' || !/^[A-Za-z0-9_-]+$/.test(encodedRoot)) {
    throw new Error('--project-root-base64 is invalid.');
  }

  const decodedRoot = Buffer.from(encodedRoot, 'base64url').toString('utf8');
  if (!decodedRoot
    || Buffer.from(decodedRoot, 'utf8').toString('base64url') !== encodedRoot
    || !path.isAbsolute(decodedRoot)) {
    throw new Error('--project-root-base64 must encode an absolute project path.');
  }

  return path.resolve(decodedRoot);
}

export function buildMcpCommand(version, platform = process.platform, projectRoot = process.cwd()) {
  const packageSpec = `novel-writer-english@${version}`;
  const boundProjectRoot = path.resolve(projectRoot);
  const encodedProjectRoot = encodeProjectRoot(boundProjectRoot);
  const args = ['--yes', '--quiet', packageSpec, 'mcp', '--project-root-base64', encodedProjectRoot];

  if (platform === 'win32') {
    return { command: 'cmd', args: ['/c', 'npx', ...args], cwd: boundProjectRoot };
  }

  return { command: 'npx', args, cwd: boundProjectRoot };
}

function updateJsoncFile(filePath, propertyPath, value) {
  const source = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '{}\n';
  const errors = [];
  parse(source, errors, { allowTrailingComma: true, disallowComments: false });
  if (errors.length > 0) {
    throw new Error(`Cannot configure MCP because ${filePath} is not valid JSON/JSONC.`);
  }

  const edits = modify(source, propertyPath, value, {
    formattingOptions: { insertSpaces: true, tabSize: 2, eol: '\n' },
  });
  fs.ensureDirSync(path.dirname(filePath));
  fs.writeFileSync(filePath, applyEdits(source, edits), 'utf8');
}

function updateOpenCodeConfig(filePath, command) {
  const source = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '{}\n';
  const errors = [];
  const config = parse(source, errors, { allowTrailingComma: true, disallowComments: false });
  if (errors.length > 0) {
    throw new Error(`Cannot configure MCP because ${filePath} is not valid JSON/JSONC.`);
  }

  const legacyServers = config?.mcp?.servers;
  if (legacyServers && Object.hasOwn(legacyServers, SERVER_NAME)) {
    const legacyPath = Object.keys(legacyServers).length === 1
      ? ['mcp', 'servers']
      : ['mcp', 'servers', SERVER_NAME];
    updateJsoncFile(filePath, legacyPath, undefined);
  }

  updateJsoncFile(filePath, ['mcp', SERVER_NAME], {
    type: 'local',
    command: [command.command, ...command.args],
    cwd: command.cwd,
    enabled: true,
  });
}

function quoteToml(value) {
  return JSON.stringify(value);
}

function buildCodexBlock(command) {
  const args = command.args.map(quoteToml).join(', ');
  return `${TOML_START}
[mcp_servers.${SERVER_NAME}]
command = ${quoteToml(command.command)}
args = [${args}]
cwd = ${quoteToml(command.cwd)}
enabled = true
${TOML_END}`;
}

function removeExistingCodexEntry(source) {
  const lines = source.split(/\r?\n/);
  const targetPattern = /^\s*\[mcp_servers\.(?:novel-writer|"novel-writer"|'novel-writer')(?:\.[^\]]+)?\]\s*(?:#.*)?$/;
  const tablePattern = /^\s*\[[^\]]+\]\s*(?:#.*)?$/;
  const kept = [];
  let skipTable = false;

  for (const line of lines) {
    if (tablePattern.test(line)) skipTable = targetPattern.test(line);
    if (!skipTable) kept.push(line);
  }

  return kept.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd();
}

function updateCodexConfig(filePath, command) {
  let source = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
  if (source.trim()) {
    try {
      parseToml(source);
    } catch (error) {
      throw new Error(`Cannot configure MCP because ${filePath} is not valid TOML: ${error.message}`);
    }
  }

  const managedPattern = new RegExp(`${TOML_START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${TOML_END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'm');
  const block = buildCodexBlock(command);
  if (managedPattern.test(source)) {
    source = source.replace(managedPattern, block);
  } else {
    source = removeExistingCodexEntry(source);
    source = `${source.trimEnd()}${source.trim() ? '\n\n' : ''}${block}\n`;
  }

  fs.ensureDirSync(path.dirname(filePath));
  fs.writeFileSync(filePath, source, 'utf8');
}

export function installMcpConfig(toolKey, projectRoot, version, platform = process.platform) {
  const boundProjectRoot = path.resolve(projectRoot);
  const command = buildMcpCommand(version, platform, boundProjectRoot);

  if (toolKey === 'claude') {
    const filePath = path.join(boundProjectRoot, '.mcp.json');
    updateJsoncFile(filePath, ['mcpServers', SERVER_NAME], {
      command: command.command,
      args: command.args,
    });
    return filePath;
  }

  if (toolKey === 'gemini') {
    const filePath = path.join(boundProjectRoot, '.gemini', 'settings.json');
    updateJsoncFile(filePath, ['mcpServers', SERVER_NAME], { ...command, timeout: 30000, trust: false });
    return filePath;
  }

  if (toolKey === 'opencode') {
    const filePath = path.join(boundProjectRoot, 'opencode.json');
    updateOpenCodeConfig(filePath, command);
    return filePath;
  }

  if (toolKey === 'codex') {
    const filePath = path.join(boundProjectRoot, '.codex', 'config.toml');
    updateCodexConfig(filePath, command);
    return filePath;
  }

  throw new Error(`Unsupported MCP configuration target: ${toolKey}`);
}
