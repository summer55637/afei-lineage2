import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const BASE = '/afei-lineage2';
const TEXT_EXTS = new Set(['.html', '.js', '.css', '.json', '.webmanifest', '.xml', '.txt', '.svg']);

if (!fs.existsSync(DIST)) {
  throw new Error('dist/ not found. Run the Vite build first.');
}

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

const topEntries = fs.readdirSync(DIST, { withFileTypes: true })
  .filter((entry) => !['index.html', '404.html', '.nojekyll'].includes(entry.name))
  .map((entry) => ({ name: entry.name, isDirectory: entry.isDirectory() }))
  .sort((a, b) => b.name.length - a.name.length);

const delimiters = ['"', "'", String.fromCharCode(96), '(', '=', ':', ' ', '\n', '\t'];

function rewriteRootAssets(content) {
  for (const entry of topEntries) {
    const suffix = entry.isDirectory ? '/' : '';
    const rootRef = '/' + entry.name + suffix;
    const basedRef = BASE + rootRef;

    for (const delimiter of delimiters) {
      content = content.split(delimiter + rootRef).join(delimiter + basedRef);
    }
  }
  return content;
}

for (const file of walk(DIST)) {
  const ext = path.extname(file).toLowerCase();
  if (!TEXT_EXTS.has(ext)) continue;

  const before = fs.readFileSync(file, 'utf8');
  const after = rewriteRootAssets(before);
  if (after !== before) {
    fs.writeFileSync(file, after, 'utf8');
  }
}

const manifestPath = path.join(DIST, 'manifest.webmanifest');
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.start_url = BASE + '/';
  manifest.scope = BASE + '/';
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
}

fs.writeFileSync(path.join(DIST, '.nojekyll'), '', 'utf8');

const indexPath = path.join(DIST, 'index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf8');

if (indexHtml.includes('/src/main.tsx')) {
  throw new Error('GitHub Pages build still references /src/main.tsx instead of compiled assets.');
}

if (!indexHtml.includes(BASE + '/assets/')) {
  throw new Error('GitHub Pages build is missing the expected ' + BASE + '/assets/ Vite path.');
}

const leftovers = [];
for (const file of walk(DIST)) {
  const ext = path.extname(file).toLowerCase();
  if (!TEXT_EXTS.has(ext)) continue;

  const content = fs.readFileSync(file, 'utf8');
  for (const entry of topEntries) {
    const suffix = entry.isDirectory ? '/' : '';
    const rootRef = '/' + entry.name + suffix;
    for (const delimiter of delimiters) {
      if (content.includes(delimiter + rootRef)) {
        leftovers.push(path.relative(DIST, file) + ' -> ' + rootRef);
        if (leftovers.length >= 25) break;
      }
    }
    if (leftovers.length >= 25) break;
  }
  if (leftovers.length >= 25) break;
}

if (leftovers.length) {
  throw new Error('Unfixed root-absolute public asset paths remain:\n' + leftovers.join('\n'));
}

fs.copyFileSync(indexPath, path.join(DIST, '404.html'));

console.log('GitHub Pages build prepared and validated for ' + BASE + '/');
