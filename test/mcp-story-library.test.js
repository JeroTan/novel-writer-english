import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { createNovelWorkflowServer } from '../bin/mcp-server.js';
import { installMcpConfig } from '../src/installer/mcp-config.js';
import { StoryLibrary, WorkflowDataError } from '../src/mcp/story-library.js';

function makeProject() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'novel-writer-mcp-'));
  const storyRoot = path.join(root, 'stories', 'clockwork-city');
  fs.mkdirSync(path.join(storyRoot, 'knowledge'), { recursive: true });
  fs.mkdirSync(path.join(storyRoot, 'tracking'), { recursive: true });

  fs.writeFileSync(path.join(storyRoot, 'knowledge', 'character-profiles.md'), `# Character Profiles

## Mara Voss
- **Role**: Protagonist
- **Aliases/Nicknames**: Gearwitch
- **Core Motivation**: Find her missing brother.

## Inspector Hale
- **Role**: Rival investigator
- **Core Motivation**: Protect the city archive.
`);

  fs.writeFileSync(path.join(storyRoot, 'knowledge', 'locations.md'), `# Location Database

## Brass Market
- **Type**: District
- **Significance**: Mara finds the broken key here.
- **Sensory Details**: Hot oil, bells, and copper dust.

## Moon Archive
- **Type**: Library
- **Significance**: Hale guards the forbidden records.
`);

  fs.writeFileSync(path.join(storyRoot, 'knowledge', 'glossary.md'), `# Glossary

## World & Setting Terms

### Ghost Gear
- **Definition**: A machine part that remembers its last owner.
- **Context**: Illegal salvage.

## Character Names & Titles

### Gearwitch
- **Full Name**: Mara Voss
- **Aliases/Nicknames**: Gearwitch
`);

  fs.writeFileSync(path.join(storyRoot, 'tracking', 'character-state.json'), JSON.stringify({
    schemaVersion: '1.0',
    novel: 'Clockwork City',
    lastUpdated: '2026-08-09',
    protagonist: {
      name: 'Mara Voss',
      currentStatus: {
        alive: true,
        health: 'Bruised',
        mentalState: 'Focused',
        location: 'Brass Market',
        chapter: 3,
        possessions: ['broken key'],
      },
      development: { currentPhase: 'Investigation' },
      relationships: {},
    },
    supportingCharacters: {
      'Inspector Hale': {
        role: 'Rival investigator',
        status: { alive: true, currentLocation: 'Moon Archive' },
        arc: { current: 'Distrust' },
        motivations: ['Protect archive'],
        secrets: [],
      },
    },
  }, null, 2));

  return root;
}

test('story library lists and searches canonical files', t => {
  const root = makeProject();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const library = new StoryLibrary(root);

  assert.deepEqual(library.listNovels(), ['clockwork-city']);
  assert.equal(library.listCharacters().count, 2);
  assert.equal(library.searchCharacters('gearwitch').characters[0].name, 'Mara Voss');
  assert.equal(library.searchSettings('copper').settings[0].name, 'Brass Market');
  assert.equal(library.listGlossary('remember owner').glossary[0].name, 'Ghost Gear');
  assert.equal(library.characterStates('broken key').states[0].name, 'Mara Voss');
  assert.equal(library.validate().valid, true);
});

test('story library reports deterministic format errors', t => {
  const root = makeProject();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const filePath = path.join(root, 'stories', 'clockwork-city', 'knowledge', 'character-profiles.md');
  fs.writeFileSync(filePath, '# Character Profiles\n\n## Mara Voss\n- **Core Motivation**: Escape.\n');

  assert.throws(
    () => new StoryLibrary(root).listCharacters(),
    error => error instanceof WorkflowDataError && error.code === 'FORMAT_ERROR' && error.message.includes('**Role**')
  );
});

test('installer merges MCP configs and keeps unrelated settings', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'novel-writer-config-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, '.gemini'), { recursive: true });
  fs.writeFileSync(path.join(root, '.gemini', 'settings.json'), '{\n  // keep this\n  "ui": { "theme": "GitHub" }\n}\n');
  fs.mkdirSync(path.join(root, '.codex'), { recursive: true });
  fs.writeFileSync(path.join(root, '.codex', 'config.toml'), `model = "gpt-test"

[mcp_servers.novel-writer]
command = "old-command"

[mcp_servers.novel-writer.env]
OLD_VALUE = "remove-me"

[mcp_servers.keep-me]
command = "keep-command"
`);

  for (const tool of ['claude', 'gemini', 'opencode', 'codex']) {
    installMcpConfig(tool, root, '9.8.7', 'linux');
    installMcpConfig(tool, root, '9.8.7', 'linux');
  }

  assert.match(fs.readFileSync(path.join(root, '.mcp.json'), 'utf8'), /novel-writer/);
  const gemini = fs.readFileSync(path.join(root, '.gemini', 'settings.json'), 'utf8');
  assert.match(gemini, /keep this/);
  assert.match(gemini, /"theme": "GitHub"/);
  assert.match(gemini, /novel-writer/);
  const opencode = JSON.parse(fs.readFileSync(path.join(root, 'opencode.json'), 'utf8'));
  assert.deepEqual(opencode.mcp.servers['novel-writer'].command.slice(0, 2), ['npx', '--yes']);
  const codex = fs.readFileSync(path.join(root, '.codex', 'config.toml'), 'utf8');
  assert.equal((codex.match(/\[mcp_servers\.novel-writer\]/g) || []).length, 1);
  assert.match(codex, /model = "gpt-test"/);
  assert.doesNotMatch(codex, /remove-me/);
  assert.match(codex, /\[mcp_servers\.keep-me\]/);
});

test('MCP server exposes and executes story lookup tools', async t => {
  const root = makeProject();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const server = createNovelWorkflowServer(root, 'test');
  const client = new Client({ name: 'test-client', version: '1.0.0' });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  t.after(async () => {
    await client.close();
    await server.close();
  });

  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  const tools = await client.listTools();
  assert.deepEqual(tools.tools.map(tool => tool.name).sort(), [
    'character_states',
    'list_novels',
    'list_of_characters',
    'list_of_glossary',
    'list_of_settings',
    'search_character',
    'search_settings',
    'validate_story_files',
  ]);

  const result = await client.callTool({ name: 'search_character', arguments: { query: 'Gearwitch' } });
  assert.equal(result.isError, undefined);
  assert.equal(result.structuredContent.characters[0].name, 'Mara Voss');

  const missing = await client.callTool({ name: 'search_settings', arguments: { query: 'sunken palace' } });
  assert.equal(missing.isError, true);
  assert.match(missing.content[0].text, /NOT_FOUND/);
  assert.match(missing.content[0].text, /partial spelling/);

  const profilePath = path.join(root, 'stories', 'clockwork-city', 'knowledge', 'character-profiles.md');
  fs.writeFileSync(profilePath, '# Old Character File\n\nMara Voss\n');
  const malformed = await client.callTool({ name: 'list_of_characters', arguments: {} });
  assert.equal(malformed.isError, true);
  assert.match(malformed.content[0].text, /FORMAT_ERROR/);
  assert.match(malformed.content[0].text, /utility-command-cross-check specify/);
});
