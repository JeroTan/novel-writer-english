import fs from 'node:fs';
import path from 'node:path';

const PLACEHOLDER_NAME = /^\[[^\]]+\]$/;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

export class WorkflowDataError extends Error {
  constructor(code, message, details = {}) {
    super(message);
    this.name = 'WorkflowDataError';
    this.code = code;
    this.details = details;
  }
}

function toPortablePath(projectRoot, filePath) {
  return path.relative(projectRoot, filePath).split(path.sep).join('/');
}

function readRequiredFile(projectRoot, filePath, command) {
  if (!fs.existsSync(filePath)) {
    throw new WorkflowDataError(
      'FORMAT_ERROR',
      `Required file not found: ${toPortablePath(projectRoot, filePath)}`,
      { command, path: toPortablePath(projectRoot, filePath) }
    );
  }

  return fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
}

function isPlaceholder(name) {
  return PLACEHOLDER_NAME.test(name.trim());
}

function parseFields(lines) {
  const fields = {};

  for (const line of lines) {
    const match = line.match(/^\s*-\s+\*\*([^*]+)\*\*:\s*(.*)$/);
    if (!match) continue;
    fields[match[1].trim()] = match[2].trim();
  }

  return fields;
}

function parseLevelTwoEntries(projectRoot, filePath, expectedTitle, requiredFields, command) {
  const source = readRequiredFile(projectRoot, filePath, command);
  const lines = source.split(/\r?\n/);
  const titleIndex = lines.findIndex(line => line.trim().startsWith('# '));

  if (titleIndex === -1 || lines[titleIndex].trim() !== `# ${expectedTitle}`) {
    throw new WorkflowDataError(
      'FORMAT_ERROR',
      `${toPortablePath(projectRoot, filePath)} must start with "# ${expectedTitle}".`,
      { command, path: toPortablePath(projectRoot, filePath) }
    );
  }

  const headings = [];
  for (let index = titleIndex + 1; index < lines.length; index++) {
    const match = lines[index].match(/^##\s+(?!#)(.+?)\s*$/);
    if (match) headings.push({ name: match[1].trim(), index });
  }

  const entries = [];
  const seen = new Set();
  for (let index = 0; index < headings.length; index++) {
    const heading = headings[index];
    if (isPlaceholder(heading.name)) continue;

    const normalizedName = normalizeText(heading.name);
    if (seen.has(normalizedName)) {
      throw new WorkflowDataError(
        'FORMAT_ERROR',
        `Duplicate entry "${heading.name}" in ${toPortablePath(projectRoot, filePath)}.`,
        { command, path: toPortablePath(projectRoot, filePath), line: heading.index + 1 }
      );
    }
    seen.add(normalizedName);

    const endIndex = index + 1 < headings.length ? headings[index + 1].index : lines.length;
    const bodyLines = lines.slice(heading.index + 1, endIndex);
    const fields = parseFields(bodyLines);
    const missing = requiredFields.filter(field => !fields[field]);
    if (missing.length > 0) {
      throw new WorkflowDataError(
        'FORMAT_ERROR',
        `Entry "${heading.name}" in ${toPortablePath(projectRoot, filePath)} is missing ${missing.map(field => `**${field}**`).join(', ')}.`,
        { command, path: toPortablePath(projectRoot, filePath), line: heading.index + 1 }
      );
    }

    entries.push({
      name: heading.name,
      fields,
      text: bodyLines.join('\n').trim(),
      source: {
        path: toPortablePath(projectRoot, filePath),
        line: heading.index + 1,
      },
    });
  }

  return entries;
}

export function parseCharacterProfiles(projectRoot, storyRoot) {
  return parseLevelTwoEntries(
    projectRoot,
    path.join(storyRoot, 'knowledge', 'character-profiles.md'),
    'Character Profiles',
    ['Role'],
    'specify'
  );
}

export function parseSettings(projectRoot, storyRoot) {
  return parseLevelTwoEntries(
    projectRoot,
    path.join(storyRoot, 'knowledge', 'locations.md'),
    'Location Database',
    ['Type', 'Significance'],
    'specify'
  );
}

export function parseGlossary(projectRoot, storyRoot) {
  const filePath = path.join(storyRoot, 'knowledge', 'glossary.md');
  const source = readRequiredFile(projectRoot, filePath, 'specify');
  const lines = source.split(/\r?\n/);
  const titleIndex = lines.findIndex(line => line.trim().startsWith('# '));

  if (titleIndex === -1 || lines[titleIndex].trim() !== '# Glossary') {
    throw new WorkflowDataError(
      'FORMAT_ERROR',
      `${toPortablePath(projectRoot, filePath)} must start with "# Glossary".`,
      { command: 'specify', path: toPortablePath(projectRoot, filePath) }
    );
  }

  let category = null;
  const headings = [];
  const boundaries = [];
  for (let index = titleIndex + 1; index < lines.length; index++) {
    const categoryMatch = lines[index].match(/^##\s+(?!#)(.+?)\s*$/);
    if (categoryMatch) {
      boundaries.push(index);
      category = categoryMatch[1].trim();
      continue;
    }

    const termMatch = lines[index].match(/^###\s+(?!#)(.+?)\s*$/);
    if (termMatch) {
      boundaries.push(index);
      headings.push({ name: termMatch[1].trim(), category, index });
    }
  }

  const entries = [];
  const seen = new Set();
  for (let index = 0; index < headings.length; index++) {
    const heading = headings[index];
    if (isPlaceholder(heading.name)) continue;
    if (!heading.category) {
      throw new WorkflowDataError(
        'FORMAT_ERROR',
        `Glossary term "${heading.name}" must be nested under a level-2 category.`,
        { command: 'specify', path: toPortablePath(projectRoot, filePath), line: heading.index + 1 }
      );
    }

    const identity = `${normalizeText(heading.category)}:${normalizeText(heading.name)}`;
    if (seen.has(identity)) {
      throw new WorkflowDataError(
        'FORMAT_ERROR',
        `Duplicate glossary term "${heading.name}" in category "${heading.category}".`,
        { command: 'specify', path: toPortablePath(projectRoot, filePath), line: heading.index + 1 }
      );
    }
    seen.add(identity);

    const endIndex = boundaries.find(boundary => boundary > heading.index) ?? lines.length;
    const bodyLines = lines.slice(heading.index + 1, endIndex);
    const fields = parseFields(bodyLines);
    const definition = fields.Definition || fields.Meaning || fields.Description || fields['Full Name'];
    if (!definition) {
      throw new WorkflowDataError(
        'FORMAT_ERROR',
        `Glossary term "${heading.name}" needs **Definition**, **Meaning**, **Description**, or **Full Name**.`,
        { command: 'specify', path: toPortablePath(projectRoot, filePath), line: heading.index + 1 }
      );
    }

    entries.push({
      name: heading.name,
      category: heading.category,
      definition,
      fields,
      text: bodyLines.join('\n').trim(),
      source: {
        path: toPortablePath(projectRoot, filePath),
        line: heading.index + 1,
      },
    });
  }

  return entries;
}

export function parseCharacterStates(projectRoot, storyRoot) {
  const filePath = path.join(storyRoot, 'tracking', 'character-state.json');
  const source = readRequiredFile(projectRoot, filePath, 'utility-track');
  let data;

  try {
    data = JSON.parse(source);
  } catch (error) {
    throw new WorkflowDataError(
      'FORMAT_ERROR',
      `${toPortablePath(projectRoot, filePath)} is not valid JSON: ${error.message}`,
      { command: 'utility-track', path: toPortablePath(projectRoot, filePath) }
    );
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new WorkflowDataError('FORMAT_ERROR', 'character-state.json root must be an object.', {
      command: 'utility-track',
      path: toPortablePath(projectRoot, filePath),
    });
  }
  if (data.schemaVersion !== '1.0') {
    throw new WorkflowDataError('FORMAT_ERROR', 'character-state.json requires schemaVersion "1.0".', {
      command: 'utility-track',
      path: toPortablePath(projectRoot, filePath),
    });
  }
  if (typeof data.novel !== 'string' || typeof data.lastUpdated !== 'string') {
    throw new WorkflowDataError('FORMAT_ERROR', 'character-state.json requires string novel and lastUpdated fields.', {
      command: 'utility-track',
      path: toPortablePath(projectRoot, filePath),
    });
  }
  if (!data.protagonist || typeof data.protagonist !== 'object' || typeof data.protagonist.name !== 'string') {
    throw new WorkflowDataError('FORMAT_ERROR', 'character-state.json requires protagonist.name.', {
      command: 'utility-track',
      path: toPortablePath(projectRoot, filePath),
    });
  }
  if (!data.protagonist.currentStatus || typeof data.protagonist.currentStatus !== 'object') {
    throw new WorkflowDataError('FORMAT_ERROR', 'character-state.json requires protagonist.currentStatus.', {
      command: 'utility-track',
      path: toPortablePath(projectRoot, filePath),
    });
  }
  if (!data.supportingCharacters || typeof data.supportingCharacters !== 'object' || Array.isArray(data.supportingCharacters)) {
    throw new WorkflowDataError('FORMAT_ERROR', 'character-state.json requires supportingCharacters object.', {
      command: 'utility-track',
      path: toPortablePath(projectRoot, filePath),
    });
  }

  const sourceInfo = { path: toPortablePath(projectRoot, filePath) };
  const entries = [];
  if (!isPlaceholder(data.protagonist.name)) {
    entries.push({
      name: data.protagonist.name,
      role: 'Protagonist',
      currentStatus: data.protagonist.currentStatus,
      development: data.protagonist.development || {},
      relationships: data.protagonist.relationships || {},
      source: sourceInfo,
    });
  }

  for (const [name, value] of Object.entries(data.supportingCharacters)) {
    if (isPlaceholder(name)) continue;
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      throw new WorkflowDataError('FORMAT_ERROR', `State for supporting character "${name}" must be an object.`, {
        command: 'utility-track',
        path: sourceInfo.path,
      });
    }
    entries.push({
      name,
      role: value.role || 'Supporting Character',
      currentStatus: value.status || {},
      development: value.arc || {},
      motivations: value.motivations || [],
      secrets: value.secrets || [],
      source: sourceInfo,
    });
  }

  return entries;
}

export function normalizeText(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

function scoreEntry(entry, query) {
  const normalizedQuery = normalizeText(query);
  const normalizedName = normalizeText(entry.name);
  const haystack = normalizeText(`${entry.name} ${entry.category || ''} ${JSON.stringify(entry.fields || {})} ${entry.text || ''}`);
  const tokens = normalizedQuery.split(' ').filter(Boolean);

  if (normalizedName === normalizedQuery) return 1000;
  if (normalizedName.startsWith(normalizedQuery)) return 900;
  if (normalizedName.includes(normalizedQuery)) return 800;
  if (haystack.includes(normalizedQuery)) return 700;
  if (tokens.length > 0 && tokens.every(token => haystack.includes(token))) return 600 + tokens.length;
  if (tokens.some(token => normalizedName.includes(token))) return 400;
  if (tokens.some(token => haystack.includes(token))) return 200;
  return 0;
}

function boundedLimit(limit) {
  const numeric = Number(limit || DEFAULT_LIMIT);
  if (!Number.isFinite(numeric)) return DEFAULT_LIMIT;
  return Math.max(1, Math.min(MAX_LIMIT, Math.floor(numeric)));
}

function searchEntries(entries, query, limit) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) {
    throw new WorkflowDataError('INPUT_ERROR', 'Search text cannot be empty.');
  }

  return entries
    .map(entry => ({ entry, score: scoreEntry(entry, normalizedQuery) }))
    .filter(result => result.score > 0)
    .sort((left, right) => right.score - left.score || left.entry.name.localeCompare(right.entry.name))
    .slice(0, boundedLimit(limit))
    .map(({ entry, score }) => ({ ...entry, matchScore: score }));
}

export function listNovels(projectRoot) {
  const storiesRoot = path.join(projectRoot, 'stories');
  if (!fs.existsSync(storiesRoot)) return [];

  return fs.readdirSync(storiesRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort((left, right) => left.localeCompare(right));
}

export function resolveStory(projectRoot, requestedNovel) {
  const resolvedRoot = path.resolve(projectRoot);
  const novels = listNovels(resolvedRoot);
  if (novels.length === 0) {
    throw new WorkflowDataError('NOT_FOUND', 'No novels found under stories/.');
  }

  let novel;
  if (requestedNovel) {
    const normalized = normalizeText(requestedNovel);
    const matches = novels.filter(candidate => normalizeText(candidate) === normalized);
    if (matches.length !== 1) {
      throw new WorkflowDataError('NOT_FOUND', `Novel "${requestedNovel}" not found.`, { availableNovels: novels });
    }
    [novel] = matches;
  } else if (novels.length === 1) {
    [novel] = novels;
  } else {
    throw new WorkflowDataError('INPUT_ERROR', 'Multiple novels found. Pass novel explicitly.', {
      availableNovels: novels,
    });
  }

  return { novel, storyRoot: path.join(resolvedRoot, 'stories', novel) };
}

export class StoryLibrary {
  constructor(projectRoot) {
    this.projectRoot = path.resolve(projectRoot);
  }

  listNovels() {
    return listNovels(this.projectRoot);
  }

  listCharacters(novel, limit) {
    const story = resolveStory(this.projectRoot, novel);
    const profiles = parseCharacterProfiles(this.projectRoot, story.storyRoot);
    let states = [];
    try {
      states = parseCharacterStates(this.projectRoot, story.storyRoot);
    } catch (error) {
      if (!(error instanceof WorkflowDataError) || error.code !== 'FORMAT_ERROR' || fs.existsSync(path.join(story.storyRoot, 'tracking', 'character-state.json'))) throw error;
    }

    const stateNames = new Map(states.map(entry => [normalizeText(entry.name), entry]));
    const results = profiles.map(profile => ({
      name: profile.name,
      role: profile.fields.Role,
      hasTrackedState: stateNames.has(normalizeText(profile.name)),
      source: profile.source,
    }));

    for (const state of states) {
      if (!results.some(entry => normalizeText(entry.name) === normalizeText(state.name))) {
        results.push({ name: state.name, role: state.role, hasTrackedState: true, source: state.source });
      }
    }

    results.sort((left, right) => left.name.localeCompare(right.name));
    return { novel: story.novel, count: results.length, characters: results.slice(0, boundedLimit(limit)) };
  }

  searchCharacters(query, novel, limit) {
    const story = resolveStory(this.projectRoot, novel);
    const profiles = parseCharacterProfiles(this.projectRoot, story.storyRoot);
    const matches = searchEntries(profiles, query, limit);
    if (matches.length === 0) throw new WorkflowDataError('NOT_FOUND', `No character matched "${query}".`);

    let states = [];
    const statePath = path.join(story.storyRoot, 'tracking', 'character-state.json');
    if (fs.existsSync(statePath)) states = parseCharacterStates(this.projectRoot, story.storyRoot);
    const stateMap = new Map(states.map(entry => [normalizeText(entry.name), entry]));

    return {
      novel: story.novel,
      count: matches.length,
      characters: matches.map(match => ({ ...match, state: stateMap.get(normalizeText(match.name)) || null })),
    };
  }

  listSettings(novel, limit) {
    const story = resolveStory(this.projectRoot, novel);
    const settings = parseSettings(this.projectRoot, story.storyRoot)
      .map(entry => ({ name: entry.name, type: entry.fields.Type, significance: entry.fields.Significance, source: entry.source }))
      .sort((left, right) => left.name.localeCompare(right.name));
    return { novel: story.novel, count: settings.length, settings: settings.slice(0, boundedLimit(limit)) };
  }

  searchSettings(query, novel, limit) {
    const story = resolveStory(this.projectRoot, novel);
    const matches = searchEntries(parseSettings(this.projectRoot, story.storyRoot), query, limit);
    if (matches.length === 0) throw new WorkflowDataError('NOT_FOUND', `No setting matched "${query}".`);
    return { novel: story.novel, count: matches.length, settings: matches };
  }

  listGlossary(query, novel, category, limit) {
    const story = resolveStory(this.projectRoot, novel);
    let entries = parseGlossary(this.projectRoot, story.storyRoot);
    if (category) {
      const normalizedCategory = normalizeText(category);
      entries = entries.filter(entry => normalizeText(entry.category).includes(normalizedCategory));
    }
    if (query) entries = searchEntries(entries, query, limit);
    else {
      entries = entries.slice(0, boundedLimit(limit)).map(entry => ({
        name: entry.name,
        category: entry.category,
        definition: entry.definition,
        source: entry.source,
      }));
    }
    if (entries.length === 0) throw new WorkflowDataError('NOT_FOUND', 'No glossary entries matched request.');
    return { novel: story.novel, count: entries.length, glossary: entries };
  }

  characterStates(query, novel, limit) {
    const story = resolveStory(this.projectRoot, novel);
    const states = parseCharacterStates(this.projectRoot, story.storyRoot);
    const matches = searchEntries(states.map(entry => ({ ...entry, text: JSON.stringify(entry) })), query, limit);
    if (matches.length === 0) throw new WorkflowDataError('NOT_FOUND', `No character state matched "${query}".`);
    return { novel: story.novel, count: matches.length, states: matches };
  }

  validate(novel) {
    const story = resolveStory(this.projectRoot, novel);
    const checks = [
      ['character-profiles.md', () => parseCharacterProfiles(this.projectRoot, story.storyRoot)],
      ['locations.md', () => parseSettings(this.projectRoot, story.storyRoot)],
      ['glossary.md', () => parseGlossary(this.projectRoot, story.storyRoot)],
      ['character-state.json', () => parseCharacterStates(this.projectRoot, story.storyRoot)],
    ].map(([file, check]) => {
      try {
        const entries = check();
        return { file, status: 'valid', entries: entries.length };
      } catch (error) {
        if (!(error instanceof WorkflowDataError)) throw error;
        return { file, status: 'invalid', code: error.code, message: error.message, details: error.details };
      }
    });

    return { novel: story.novel, valid: checks.every(check => check.status === 'valid'), checks };
  }
}
