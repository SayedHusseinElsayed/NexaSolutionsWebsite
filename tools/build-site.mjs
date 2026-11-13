// Copies only the public website into dist/ (the Cloudflare Pages "Build output directory").
// Tools, node_modules, package files and logo drafts stay out of the published site.
// functions/ is picked up by Pages from the project root, not from dist/.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

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

// Cache-busting: browsers keep style.css and the scripts for hours, so a page could load a new
// script with an old stylesheet. Every CSS/JS link in the published pages gets ?v=<content hash>,
// which changes only when that file changes.
const hashOf = (rel) => {
  const file = path.join(OUT, rel);
  return fs.existsSync(file) ? crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex').slice(0, 10) : null;
};
let stamped = 0;
for (const page of fs.readdirSync(OUT).filter((f) => f.endsWith('.html'))) {
  const file = path.join(OUT, page);
  const html = fs.readFileSync(file, 'utf8').replace(/((?:href|src)=")(\/?)(assets\/(?:css|js)\/[\w.-]+\.(?:css|js))(?:\?v=[\w]+)?(")/g, (m, a, slash, rel, b) => {
    const v = hashOf(rel);
    if (!v) return m;
    stamped++;
    return `${a}${slash}${rel}?v=${v}${b}`;
  });
  fs.writeFileSync(file, html);
}
console.log(`cache-busting: ${stamped} CSS/JS links versioned`);
