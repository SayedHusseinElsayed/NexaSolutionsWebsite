// Copies only the public website into dist/ (the Cloudflare Pages "Build output directory").
// Tools, node_modules, package files and logo drafts stay out of the published site.
// functions/ is picked up by Pages from the project root, not from dist/.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const OUT = path.join(ROOT, 'dist');
const PUBLIC = [
  'index.html', 'bexa.html', 'foodexa.html', 'storexa.html', 'videos.html', '404.html',
  'robots.txt', 'sitemap.xml', '_redirects', '_headers', 'sw.js', 'favicon.ico',
  'assets', 'knowledge/kb.json', 'knowledge/kb.md', 'brand/nexa-logo-kit',
];

fs.rmSync(OUT, { recursive: true, force: true });
let files = 0;
for (const item of PUBLIC) {
  const from = path.join(ROOT, item);
  if (!fs.existsSync(from)) { console.warn('missing:', item); continue; }
  fs.cpSync(from, path.join(OUT, item), { recursive: true });
  files += fs.statSync(from).isDirectory() ? fs.readdirSync(from, { recursive: true }).length : 1;
}
console.log(`dist/: ${files} entries`);
