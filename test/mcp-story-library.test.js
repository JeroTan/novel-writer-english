import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { parse as parseJsonc } from 'jsonc-parser';
import { parse as parseToml } from 'smol-toml';
import { createNovelWorkflowServer } from '../bin/mcp-server.js';
import {
  buildMcpCommand,
  decodeProjectRoot,
  getMcpCachePath,
  installMcpConfig,
  resetMcpCache,
} from '../src/installer/mcp-config.js';
import { StoryLibrary, WorkflowDataError } from '../src/mcp/story-library.js';

function makeProject() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'novel-writer-mcp-'));
  const storyRoot = path.join(root, 'stories', 'clockwork-city');
  fs.mkdirSync(path.join(storyRoot, 'knowledge'), { recursive: true });
  fs.mkdirSync(path.join(storyRoot, 'tracking'), { recursive: true });
  fs.mkdirSync(path.join(storyRoot, 'content', 'saga_0001', 'arc_0001'), { recursive: true });

  fs.writeFileSync(path.join(storyRoot, 'content', 'chapter_00002.md'), `# Chapter 2: The Broken Key

Mara studies the key in the Brass Market.
`);
  fs.writeFileSync(path.join(storyRoot, 'content', 'saga_0001', 'arc_0001', 'chapter_00001.md'), `# Chapter 1: Sparks in Brass

Mara enters the Brass Market.
`);
  fs.writeFileSync(path.join(storyRoot, 'content', 'saga_0001', 'arc_0001', 'chapter_00010.md'), `# Chapter 10: The Moon Archive

Mara confronts Hale in the archive.
`);
  fs.writeFileSync(path.join(storyRoot, 'content', 'saga_0001', 'arc_0001', 'chapter_00001.notes.md'), '# Chapter 1: Notes\n');
  fs.writeFileSync(path.join(storyRoot, 'content', 'saga_0001', 'index.md'), '# Saga index\n');
  fs.writeFileSync(path.join(storyRoot, 'content', 'saga_0001', 'arc_0001', 'chapter_00003.txt'), 'Not a Markdown chapter.\n');

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

test('story library discovers flat and nested chapters with hierarchy metadata', t => {
  const root = makeProject();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const library = new StoryLibrary(root);

  const result = library.listChapters();

  assert.equal(result.novel, 'clockwork-city');
  assert.equal(result.count, 3);
  assert.equal(result.chapterFileCount, 3);
  assert.equal(result.uniqueChapterCount, 3);
  assert.equal(result.returned, 3);
  assert.equal(result.truncated, false);
  assert.equal(result.latestChapterNumber, 10);
  assert.equal(result.gapCount, 7);
  assert.deepEqual(result.gaps, [3, 4, 5, 6, 7, 8, 9]);
  assert.equal(result.gapsTruncated, false);
  assert.deepEqual(result.gapRanges, [{ start: 3, end: 9, count: 7 }]);
  assert.deepEqual(result.duplicates, []);
  assert.deepEqual(result.chapters.map(chapter => chapter.number), [1, 2, 10]);
  assert.deepEqual(result.chapters.map(chapter => chapter.title), [
    'Sparks in Brass',
    'The Broken Key',
    'The Moon Archive',
  ]);

  assert.deepEqual(result.chapters[0], {
    number: 1,
    title: 'Sparks in Brass',
    path: 'stories/clockwork-city/content/saga_0001/arc_0001/chapter_00001.md',
    relativeContentPath: 'saga_0001/arc_0001/chapter_00001.md',
    groupPath: 'saga_0001/arc_0001',
    hierarchy: [
      { type: 'saga', name: 'saga_0001' },
      { type: 'arc', name: 'arc_0001' },
    ],
  });
  assert.deepEqual(result.chapters[1], {
    number: 2,
    title: 'The Broken Key',
    path: 'stories/clockwork-city/content/chapter_00002.md',
    relativeContentPath: 'chapter_00002.md',
    groupPath: '',
    hierarchy: [],
  });

  const limited = library.listChapters(undefined, 2);
  assert.equal(limited.count, 3);
  assert.equal(limited.returned, 2);
  assert.equal(limited.truncated, true);
  assert.equal(limited.hasMore, true);
  assert.equal(limited.nextOffset, 2);
  assert.equal(limited.latestChapterNumber, 10);
  assert.deepEqual(limited.chapters.map(chapter => chapter.number), [1, 2]);

  const descending = library.listChapters(undefined, 2, 1, 'descending');
  assert.equal(descending.order, 'descending');
  assert.equal(descending.offset, 1);
  assert.deepEqual(descending.chapters.map(chapter => chapter.number), [2, 1]);
  assert.equal(descending.hasMore, false);
  assert.equal(descending.nextOffset, null);
});

test('story library handles ranges, duplicates, heading fallback, and large gaps safely', t => {
  const root = makeProject();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const contentRoot = path.join(root, 'stories', 'clockwork-city', 'content');
  const customRoot = path.join(contentRoot, 'volume_alpha', 'part_beta');
  fs.mkdirSync(customRoot, { recursive: true });

  fs.writeFileSync(path.join(contentRoot, 'saga_0001', 'arc_0001', 'chapter_00002.md'), '# Chapter 2: Duplicate\n');
  fs.writeFileSync(path.join(customRoot, '[20-22].md'), '# Chapter 20: Combined Chapters\n');
  fs.writeFileSync(path.join(customRoot, 'finale.md'), '# Chapter 30 — Heading Fallback\n');
  fs.writeFileSync(path.join(customRoot, 'chapter_01000.md'), '# Chapter 1000: Far Future\n');
  fs.writeFileSync(path.join(customRoot, 'chapter_999999999999999999999.md'), '# Not a chapter\n');

  const result = new StoryLibrary(root).listChapters(undefined, 50);

  assert.equal(result.chapterFileCount, 7);
  assert.equal(result.uniqueChapterCount, 8);
  assert.equal(result.count, 8);
  assert.equal(result.latestChapterNumber, 1000);
  assert.equal(result.gapCount, 992);
  assert.equal(result.gaps.length, 100);
  assert.equal(result.gapsTruncated, true);
  assert.deepEqual(result.duplicates, [{
    start: 2,
    end: 2,
    paths: [
      'stories/clockwork-city/content/chapter_00002.md',
      'stories/clockwork-city/content/saga_0001/arc_0001/chapter_00002.md',
    ],
  }]);

  const range = result.chapters.find(chapter => chapter.endNumber === 22);
  assert.equal(range.number, 20);
  assert.equal(range.title, 'Combined Chapters');
  assert.deepEqual(range.hierarchy, [
    { type: 'group', name: 'volume_alpha' },
    { type: 'group', name: 'part_beta' },
  ]);

  const headingFallback = result.chapters.find(chapter => chapter.number === 30);
  assert.equal(headingFallback.relativeContentPath, 'volume_alpha/part_beta/finale.md');
});

test('descending chapter order uses represented range end', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'novel-writer-range-order-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const contentRoot = path.join(root, 'stories', 'range-story', 'content');
  fs.mkdirSync(contentRoot, { recursive: true });
  fs.writeFileSync(path.join(contentRoot, '[1-100].md'), '# Chapter 1: Collected Edition\n');
  fs.writeFileSync(path.join(contentRoot, 'chapter_00099.md'), '# Chapter 99: Single Chapter\n');

  const result = new StoryLibrary(root).listChapters(undefined, 1, 0, 'descending');

  assert.equal(result.chapters[0].number, 1);
  assert.equal(result.chapters[0].endNumber, 100);
});

test('story library returns an empty chapter inventory when content is missing', t => {
  const root = makeProject();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.rmSync(path.join(root, 'stories', 'clockwork-city', 'content'), { recursive: true, force: true });

  assert.deepEqual(new StoryLibrary(root).listChapters(), {
    novel: 'clockwork-city',
    contentRoot: 'stories/clockwork-city/content',
    count: 0,
    chapterFileCount: 0,
    uniqueChapterCount: 0,
    latestChapterNumber: null,
    gapCount: 0,
    gaps: [],
    gapsTruncated: false,
    gapRanges: [],
    gapRangesTruncated: false,
    duplicates: [],
    duplicateRangeCount: 0,
    duplicatesTruncated: false,
    offset: 0,
    order: 'ascending',
    returned: 0,
    truncated: false,
    hasMore: false,
    nextOffset: null,
    chapters: [],
  });
});

test('chapter lookup reports wrong bound project without exposing its absolute path', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'novel-writer-empty-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));

  assert.throws(
    () => new StoryLibrary(root).listChapters(),
    error => error instanceof WorkflowDataError
      && error.code === 'NOT_FOUND'
      && error.details.inspectedProject === path.basename(root)
      && error.details.expectedStoriesRoot === 'stories/'
      && !JSON.stringify(error.details).includes(path.dirname(root))
  );
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

test('installer merges MCP configs, keeps settings, and binds the installation root', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'novel &^%! writer config '));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.writeFileSync(path.join(root, '.mcp.json'), JSON.stringify({
    mcpServers: {
      'novel-writer': { command: 'old-command' },
      'keep-me': { command: 'keep-command' },
    },
  }, null, 2));
  fs.mkdirSync(path.join(root, '.gemini'), { recursive: true });
  fs.writeFileSync(path.join(root, '.gemini', 'settings.json'), `{
  // keep this
  "ui": { "theme": "GitHub" },
  "mcpServers": {
    "novel-writer": { "command": "old-command" },
    "keep-me": { "command": "keep-command" }
  }
}
`);
  fs.writeFileSync(path.join(root, 'opencode.json'), JSON.stringify({
    $schema: 'https://opencode.ai/config.json',
    theme: 'system',
    mcp: {
      servers: {
        'novel-writer': { type: 'local', command: ['old-command'] },
      },
      'keep-me': { type: 'local', command: ['keep-command'], enabled: true },
    },
  }, null, 2));
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

  const assertProjectRootArgument = args => {
    const rootIndex = args.indexOf('--project-root-base64');
    assert.notEqual(rootIndex, -1);
    assert.match(args[rootIndex + 1], /^[A-Za-z0-9_-]+$/);
    assert.equal(Buffer.from(args[rootIndex + 1], 'base64url').toString('utf8'), root);
    assert.equal(args.includes('--project-root'), false);
    assert.equal(args.includes('--prefer-online'), true);
    const cacheIndex = args.indexOf('--cache');
    assert.notEqual(cacheIndex, -1);
    assert.equal(args[cacheIndex + 1], getMcpCachePath(root, 'linux'));
  };

  const claude = JSON.parse(fs.readFileSync(path.join(root, '.mcp.json'), 'utf8'));
  assertProjectRootArgument(claude.mcpServers['novel-writer'].args);
  assert.equal(claude.mcpServers['novel-writer'].cwd, undefined);
  assert.equal(claude.mcpServers['novel-writer'].command, 'npx');
  assert.equal(claude.mcpServers['keep-me'].command, 'keep-command');

  const gemini = fs.readFileSync(path.join(root, '.gemini', 'settings.json'), 'utf8');
  assert.match(gemini, /keep this/);
  assert.match(gemini, /"theme": "GitHub"/);
  assert.match(gemini, /novel-writer/);
  const geminiConfig = parseJsonc(gemini);
  assertProjectRootArgument(geminiConfig.mcpServers['novel-writer'].args);
  assert.equal(geminiConfig.mcpServers['novel-writer'].cwd, root);
  assert.equal(geminiConfig.mcpServers['novel-writer'].command, 'npx');
  assert.equal(geminiConfig.mcpServers['keep-me'].command, 'keep-command');

  const opencode = JSON.parse(fs.readFileSync(path.join(root, 'opencode.json'), 'utf8'));
  assert.deepEqual(opencode.mcp['novel-writer'].command.slice(0, 2), ['npx', '--yes']);
  assertProjectRootArgument(opencode.mcp['novel-writer'].command);
  assert.equal(opencode.mcp['novel-writer'].cwd, root);
  assert.equal(opencode.mcp['novel-writer'].enabled, true);
  assert.equal(opencode.mcp.servers, undefined);
  assert.deepEqual(opencode.mcp['keep-me'].command, ['keep-command']);
  assert.equal(opencode.theme, 'system');
  const codex = fs.readFileSync(path.join(root, '.codex', 'config.toml'), 'utf8');
  assert.equal((codex.match(/\[mcp_servers\.novel-writer\]/g) || []).length, 1);
  assert.match(codex, /model = "gpt-test"/);
  assert.doesNotMatch(codex, /remove-me/);
  assert.match(codex, /\[mcp_servers\.keep-me\]/);
  const codexConfig = parseToml(codex);
  assertProjectRootArgument(codexConfig.mcp_servers['novel-writer'].args);
  assert.equal(codexConfig.mcp_servers['novel-writer'].cwd, root);
});

test('Windows MCP command shell-proofs special characters in bound project root', () => {
  const root = path.resolve(os.tmpdir(), 'Novel &^%! Project With Spaces');
  const command = buildMcpCommand('9.8.7', 'win32', root);
  const rootIndex = command.args.indexOf('--project-root-base64');

  assert.equal(command.command, 'cmd');
  assert.deepEqual(command.args.slice(0, 2), ['/c', 'npx']);
  assert.equal(command.cwd, root);
  assert.notEqual(rootIndex, -1);
  assert.match(command.args[rootIndex + 1], /^[A-Za-z0-9_-]+$/);
  assert.equal(decodeProjectRoot(command.args[rootIndex + 1]), root);
  assert.throws(() => decodeProjectRoot('not+a+base64url'), /invalid/);
  assert.throws(() => decodeProjectRoot(Buffer.from('relative/path').toString('base64url')), /absolute/);
});

test('installer resets only the project-bound MCP cache', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'novel-writer-cache-project-'));
  const cachePath = getMcpCachePath(root);
  const siblingCache = getMcpCachePath(`${root}-other`);
  t.after(() => {
    fs.rmSync(root, { recursive: true, force: true });
    fs.rmSync(cachePath, { recursive: true, force: true });
    fs.rmSync(siblingCache, { recursive: true, force: true });
  });

  fs.mkdirSync(cachePath, { recursive: true });
  fs.writeFileSync(path.join(cachePath, 'broken-package.json'), 'broken');
  fs.mkdirSync(siblingCache, { recursive: true });
  fs.writeFileSync(path.join(siblingCache, 'keep.txt'), 'keep');

  assert.equal(resetMcpCache(root), cachePath);
  assert.equal(fs.existsSync(path.join(cachePath, 'broken-package.json')), false);
  assert.equal(fs.existsSync(cachePath), true);
  assert.equal(fs.readFileSync(path.join(siblingCache, 'keep.txt'), 'utf8'), 'keep');
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
    'list_chapters',
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

  const novels = await client.callTool({ name: 'list_novels', arguments: {} });
  assert.equal(novels.structuredContent.count, 1);
  assert.equal(novels.structuredContent.project, path.basename(root));
  assert.equal(novels.structuredContent.storiesRoot, 'stories/');

  const chapters = await client.callTool({ name: 'list_chapters', arguments: {} });
  assert.equal(chapters.isError, undefined);
  assert.equal(chapters.structuredContent.count, 3);
  assert.equal(chapters.structuredContent.chapterFileCount, 3);
  assert.deepEqual(chapters.structuredContent.chapters.map(chapter => chapter.number), [1, 2, 10]);

  const latestChapters = await client.callTool({
    name: 'list_chapters',
    arguments: { limit: 2, order: 'descending' },
  });
  assert.deepEqual(latestChapters.structuredContent.chapters.map(chapter => chapter.number), [10, 2]);
  assert.equal(latestChapters.structuredContent.nextOffset, 2);

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
