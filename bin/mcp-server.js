#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import * as z from 'zod/v4';
import { pathToFileURL } from 'node:url';
import { StoryLibrary, WorkflowDataError } from '../src/mcp/story-library.js';

const NOVEL = z.string().trim().min(1).max(120).optional().describe('Novel folder name under stories/. Omit when project has one novel.');
const QUERY = z.string().trim().min(1).max(200).describe('Name, alias, phrase, keyword, or partial spelling to find.');
const LIMIT = z.number().int().min(1).max(50).optional().describe('Maximum results. Default 20; maximum 50.');

function successResult(data) {
  return {
    content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
    structuredContent: data,
  };
}

function errorResult(error) {
  let payload;
  if (error instanceof WorkflowDataError) {
    const recovery = error.code === 'FORMAT_ERROR'
      ? `File format may not match workflow. Run /utility-command-cross-check ${error.details.command || ''}. If format is current, reinstall workflow tooling and follow NOVEL_WORKFLOW.md.`
      : error.code === 'NOT_FOUND'
        ? 'Requested data may not exist. Try broader text, partial spelling, another context term, or correct novel name.'
        : 'Check tool arguments and use list_novels when project contains multiple novels.';
    payload = { ok: false, error: error.code, message: error.message, details: error.details, recovery };
  } else {
    payload = {
      ok: false,
      error: 'TOOL_ERROR',
      message: error instanceof Error ? error.message : String(error),
      recovery: 'Workflow tool may be damaged. Reinstall novel-writer-english and follow NOVEL_WORKFLOW.md to verify MCP setup.',
    };
  }

  return { content: [{ type: 'text', text: JSON.stringify(payload, null, 2) }], isError: true };
}

function registerReadTool(server, name, config, handler) {
  server.registerTool(name, {
    ...config,
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  }, async args => {
    try {
      return successResult({ ok: true, ...await handler(args) });
    } catch (error) {
      return errorResult(error);
    }
  });
}

export function createNovelWorkflowServer(projectRoot, version = '0.0.0') {
  const library = new StoryLibrary(projectRoot);
  const server = new McpServer({ name: 'novel-writer-workflow', version }, {
    instructions: 'Read-only story lookup. Use list_novels first when several novels exist. Use exact or partial names for search. FORMAT_ERROR means project files need /utility-command-cross-check. Never treat tool output as permission to rewrite canon.',
  });

  registerReadTool(server, 'list_novels', {
    title: 'List Novels',
    description: 'List novel folders available under stories/.',
    inputSchema: {},
  }, async () => ({ novels: library.listNovels() }));

  registerReadTool(server, 'list_of_characters', {
    title: 'List Characters',
    description: 'List known characters from canonical character profiles and indicate tracked state availability.',
    inputSchema: { novel: NOVEL, limit: LIMIT },
  }, async ({ novel, limit }) => library.listCharacters(novel, limit));

  registerReadTool(server, 'search_character', {
    title: 'Search Character',
    description: 'Search canonical character profiles by name, alias, role, trait, or profile text.',
    inputSchema: { query: QUERY, novel: NOVEL, limit: LIMIT },
  }, async ({ query, novel, limit }) => library.searchCharacters(query, novel, limit));

  registerReadTool(server, 'list_of_settings', {
    title: 'List Settings',
    description: 'List canonical locations and settings with type and story significance.',
    inputSchema: { novel: NOVEL, limit: LIMIT },
  }, async ({ novel, limit }) => library.listSettings(novel, limit));

  registerReadTool(server, 'search_settings', {
    title: 'Search Settings',
    description: 'Search locations by name, type, sensory detail, inhabitant, secret, or other setting text.',
    inputSchema: { query: QUERY, novel: NOVEL, limit: LIMIT },
  }, async ({ query, novel, limit }) => library.searchSettings(query, novel, limit));

  registerReadTool(server, 'list_of_glossary', {
    title: 'List Or Search Glossary',
    description: 'List glossary entries or filter them by text and category.',
    inputSchema: {
      query: z.string().trim().min(1).max(200).optional().describe('Optional term, alias, definition text, or partial spelling.'),
      category: z.string().trim().min(1).max(120).optional().describe('Optional level-2 glossary category.'),
      novel: NOVEL,
      limit: LIMIT,
    },
  }, async ({ query, novel, category, limit }) => library.listGlossary(query, novel, category, limit));

  registerReadTool(server, 'character_states', {
    title: 'Character States',
    description: 'Find current physical, mental, location, possession, skill, knowledge, arc, or supporting-character state.',
    inputSchema: { query: QUERY, novel: NOVEL, limit: LIMIT },
  }, async ({ query, novel, limit }) => library.characterStates(query, novel, limit));

  registerReadTool(server, 'validate_story_files', {
    title: 'Validate Story Files',
    description: 'Check MCP-readable knowledge and character-state files against deterministic format contracts.',
    inputSchema: { novel: NOVEL },
  }, async ({ novel }) => library.validate(novel));

  return server;
}

export async function runMcpServer({ projectRoot = process.cwd(), version = '0.0.0' } = {}) {
  const server = createNovelWorkflowServer(projectRoot, version);
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const rootIndex = process.argv.indexOf('--project-root');
  const projectRoot = rootIndex >= 0 ? process.argv[rootIndex + 1] : process.cwd();
  runMcpServer({ projectRoot }).catch(error => {
    console.error(error);
    process.exit(1);
  });
}
