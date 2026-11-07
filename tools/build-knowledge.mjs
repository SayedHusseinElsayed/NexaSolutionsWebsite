// Builds the AI assistant's knowledge base from the site itself.
//   node tools/build-knowledge.mjs
// Output:
//   knowledge/kb.md   — everything the assistant knows (read by functions/api/chat.js)
//   knowledge/kb.json — the same text split into small sections (offline search in the browser)
// Sources: every page's visible text, assets/js/data.js, assets/js/features.js,
// and every hand-written knowledge/*.md file (notes.md etc.).
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

// --- site data (window.NEXA / window.NEXA_FEATURES) ---
const sandbox = { window: {} };
vm.runInNewContext(read('assets/js/data.js'), sandbox);
vm.runInNewContext(read('assets/js/features.js'), sandbox);
const D = sandbox.window.NEXA, F = sandbox.window.NEXA_FEATURES;
const SITE = D.siteUrl || 'https://nexamasr.com';

// --- page text: <main> → light markdown ---
const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ' };
function pageText(file, sectionId) {
  let h = read(file);
  h = sectionId
    ? (h.match(new RegExp('<section[^>]*id="' + sectionId + '"[\\s\\S]*?</section>')) || [''])[0]
    : (h.match(/<main[\s\S]*?<\/main>/) || [h])[0];
  h = h.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style|svg|nav)[\s\S]*?<\/\1>/g, '');
  h = h.replace(/<summary[^>]*>([\s\S]*?)<\/summary>/g, '\n**س: $1**\n')
       .replace(/<h1[^>]*>/g, '\n# ').replace(/<h2[^>]*>/g, '\n## ').replace(/<h3[^>]*>/g, '\n### ')
       .replace(/<\/h[1-6]>/g, '\n').replace(/<li[^>]*>/g, '\n- ').replace(/<br\s*\/?>/g, ' ')
       .replace(/<\/(p|div|section|details|ul|ol|blockquote)>/g, '\n').replace(/<[^>]+>/g, '');
  h = h.replace(/&[a-z#0-9]+;/g, e => ENT[e] || e);
  return h.split('\n').map(l => l.replace(/\s+/g, ' ').trim()).filter(Boolean)
    .filter((l, i, a) => l !== a[i - 1]).join('\n');
}

const out = [];
out.push(`# قاعدة معرفة Nexa Solutions
(مولّدة تلقائياً من الموقع ${SITE} — ${new Date().toISOString().slice(0, 10)})

## بيانات التواصل
- الشركة: ${D.company} — شركة مصرية بتطوّر برامج عربية لإدارة المحلات والمطاعم والمتاجر الإلكترونية.
- الهاتف وواتساب: ${D.phone} — رابط واتساب: https://wa.me/${D.whatsapp}
- فيسبوك: ${D.facebook}
- العنوان: ${D.address}
- ${D.hours}
- المنتجات: ${Object.values(D.products).map(p => `${p.name} (${SITE}/${p.page.replace('.html', '')})`).join('، ')}`);

// trials
for (const [k, p] of Object.entries(D.products)) {
  out.push(`## ${p.name} — نبذة\n${p.tagline || ''}\nصفحة المنتج: ${SITE}/${k}`);
  if (p.trial) {
    const t = p.trial;
    out.push(`## تحميل النسخة التجريبية من ${p.name}
- رابط التحميل (Google Drive): ${t.url}
- الملف: ${t.file} — الإصدار ${t.version} — Windows 10/11 64-bit
- مدة التجربة: ${t.days} أيام مجاناً بكل المميزات
- بيانات الدخول التجريبية: ${t.login.map(r => `${r[0]}: ${r[1]}`).join('، ')}
${t.requires ? '- متطلب مهم: ' + t.requires + '\n' : ''}- خطوات التثبيت:
${t.steps.map((s, i) => `  ${i + 1}. ${s}`).join('\n')}
- لو Google Drive قال إنه مش قادر يفحص الملف من الفيروسات: اضغط «Download anyway». ولو ظهرت رسالة حماية Windows: «More info» ثم «Run anyway».
- خطوات التثبيت بالصور على: ${SITE}/${k}#download`);
  }
}

// features
const TAG = { pro: 'من الباقة الاحترافية', full: 'في الباقة الشاملة', new: 'جديد', soon: 'قريباً — لسه مش متاح' };
for (const [k, groups] of Object.entries(F)) {
  out.push(`## كل مميزات ${D.products[k].name}\n` + groups.map(g =>
    `### ${D.products[k].name} — ${g.title}\n` + g.items.map(it => `- ${it[0]}: ${it[1]}${it[2] ? ` (${TAG[it[2]]})` : ''}`).join('\n')).join('\n'));
}

// prices, straight from the pricing sections of the pages
for (const k of Object.keys(D.products)) {
  const t = pageText(D.products[k].page, 'pricing');
  if (t) out.push(`## أسعار وباقات ${D.products[k].name}\n` + t.replace(/^#+ /gm, '- '));
}

// pages
for (const [file, title] of [['index.html', 'الصفحة الرئيسية'], ['bexa.html', 'صفحة Bexa POS'], ['foodexa.html', 'صفحة Foodexa'], ['storexa.html', 'صفحة Storexa']]) {
  out.push(`## نص ${title} (${SITE}/${file === 'index.html' ? '' : file.replace('.html', '')})\n` + pageText(file).replace(/^# /gm, '### ').replace(/^## /gm, '### '));
}

// videos & customers
out.push('## الفيديوهات والشروحات\nكل الفيديوهات على ' + SITE + '/videos\n' +
  D.videos.map(v => `- [${D.products[v.product] ? D.products[v.product].name : 'Nexa'}] ${v.title}${v.duration ? ' (' + v.duration + ')' : ''}`).join('\n'));
out.push('## من عملائنا\n' + D.customers.map(c => `- ${c.name}${c.type ? ' — ' + c.type : ''}${c.city ? ' — ' + c.city : ''} (${[].concat(c.product).map(x => D.products[x] ? D.products[x].name : x).join(' + ')})`).join('\n'));

// hand-written notes
for (const f of fs.readdirSync(path.join(ROOT, 'knowledge')).filter(f => f.endsWith('.md') && f !== 'kb.md').sort()) {
  out.push(read('knowledge/' + f).replace(/<!--[\s\S]*?-->/g, '').trim());
}

const kb = out.join('\n\n') + '\n';
fs.writeFileSync(path.join(ROOT, 'knowledge/kb.md'), kb);

// sections for offline search
const chunks = [];
let head = '', parent = '', body = [];
const flush = () => { const t = body.join('\n').trim(); if (t) chunks.push({ h: head, p: parent, t }); body = []; };
for (const line of kb.split('\n')) {
  if (/^## /.test(line)) { flush(); head = parent = line.replace(/^#+ /, ''); }
  else if (/^### /.test(line)) { flush(); head = line.replace(/^#+ /, ''); }
  else if (/^\*\*س: /.test(line)) { flush(); head = line.replace(/^\*\*س: |\*\*$/g, ''); }
  else if (!/^# /.test(line)) body.push(line);
}
flush();
fs.writeFileSync(path.join(ROOT, 'knowledge/kb.json'), JSON.stringify(chunks));
console.log(`knowledge/kb.md: ${kb.length.toLocaleString()} chars · kb.json: ${chunks.length} sections`);
