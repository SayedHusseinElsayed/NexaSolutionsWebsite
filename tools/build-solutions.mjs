// Builds the «حلول حسب النشاط» pages from tools/solutions.mjs:
//   <slug>.html        one landing page per business type (site root → nexamasr.com/<slug>)
//   solutions.html     the hub that links to all of them
//   index.html         the block between <!-- solutions:start --> and <!-- solutions:end -->
//   sitemap.xml        every public page, with today's date as lastmod
// Run by `npm run build` before build-knowledge and build-site.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { SOLUTIONS } from './solutions.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const write = (f, s) => fs.writeFileSync(path.join(ROOT, f), s);

const sandbox = { window: {} };
vm.runInNewContext(read('assets/js/data.js'), sandbox);
const D = sandbox.window.NEXA;
const SITE = D.siteUrl || 'https://nexamasr.com';
const P = D.products;

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const plain = (s) => String(s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const bySlug = Object.fromEntries(SOLUTIONS.map((s) => [s.slug, s]));
const ld = (obj) => `  <script type="application/ld+json">\n  ${JSON.stringify(obj)}\n  </script>`;

function head({ title, description, url, image, jsonld }) {
  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="theme-color" content="#0b1220">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="ar_EG">
  <meta property="og:site_name" content="Nexa Solutions">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${image}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="favicon.ico?v=2" sizes="any">
  <link rel="icon" href="assets/img/brand/nexa.svg?v=2" type="image/svg+xml">
  <link rel="icon" href="assets/img/brand/favicon-32.png?v=2" sizes="32x32" type="image/png">
  <link rel="apple-touch-icon" href="assets/img/brand/apple-touch-icon.png?v=2">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css">
${jsonld.map(ld).join('\n')}
</head>`;
}

const foot = `
  <footer id="site-footer"></footer>
  <script src="assets/js/data.js"></script>
  <script src="assets/js/main.js"></script>
  <script src="assets/js/assistant.js"></script>
</body>
</html>
`;

function customersFor(s) {
  if (!s.customerTypes.length) return [];
  return D.customers.filter((c) => [].concat(c.product).includes(s.product) &&
    s.customerTypes.some((t) => (c.type || '').includes(t) || c.name.includes(t)));
}

function customerCard(c, product) {
  const logo = c.logo
    ? `<div class="logo-box"><img src="${esc(c.logo)}" alt="${esc(c.name)}" width="64" height="64" loading="lazy"></div>`
    : `<div class="logo-box"><span class="initials t-${product}">${esc([...c.name.replace(/^(ال)/, '')][0])}</span></div>`;
  return `<div class="customer reveal">${logo}<div><h3>${esc(c.name)}</h3><p>${esc(c.type)}${c.city ? ' — ' + esc(c.city) : ''}</p></div></div>`;
}

const breadcrumb = (items) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: url }))
});

function page(s) {
  const p = P[s.product];
  const url = `${SITE}/${s.slug}`;
  const image = `${SITE}/assets/img/share/${s.product}-og.png`;
  const custs = customersFor(s);
  const jsonld = [
    {
      '@context': 'https://schema.org', '@type': 'SoftwareApplication',
      name: p.name, alternateName: `${p.name} — ${s.keyword}`,
      applicationCategory: 'BusinessApplication', operatingSystem: 'Windows 10, Windows 11',
      inLanguage: 'ar', description: s.description, url, image,
      downloadUrl: p.trial ? p.trial.url : undefined, softwareVersion: p.trial ? p.trial.version : undefined,
      publisher: { '@type': 'Organization', name: 'Nexa Solutions', url: SITE + '/' }
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: s.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
    },
    breadcrumb([['الرئيسية', SITE + '/'], ['حلول حسب النشاط', SITE + '/solutions'], [s.keyword, url]])
  ];
  return `${head({ title: s.title, description: s.description, url, image, jsonld })}
<body data-page="solutions" class="t-${s.product}">
  <a class="skip" href="#main">تخطَّ إلى المحتوى</a>
  <header id="site-header"></header>

  <main id="main">
    <section class="page-head sol-head">
      <div class="container">
        <nav class="crumbs" aria-label="مسار الصفحة"><a href="index.html">الرئيسية</a> ‹ <a href="solutions.html">حلول حسب النشاط</a> ‹ <span>${esc(s.keyword)}</span></nav>
        <span class="eyebrow">${esc(s.eyebrow)}</span>
        <h1>${s.h1}</h1>
        <p>${esc(s.lead)}</p>
        <div class="hero-actions sol-actions">
          <a class="btn btn-lime" href="#download"><i data-i="download"></i> جرّب ${esc(p.name)} مجاناً</a>
          <a class="btn btn-ghost-light" href="${p.page}"><img src="${p.logo}" alt="" width="20" height="20"> كل مميزات ${esc(p.name)}</a>
          <a class="btn btn-ghost-light" data-wa="مرحباً، بسأل عن ${esc(s.keyword)} (${esc(p.name)})" href="#"><i data-i="whatsapp"></i> كلّمنا على واتساب</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head reveal"><span class="eyebrow">مشاكل بنحلّها</span><h2 class="title">${esc(s.keyword)} بيحل إيه بالظبط؟</h2></div>
        <div class="features sol-pains">
${s.pains.map(([t, d]) => `          <div class="feature reveal"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('\n')}
        </div>
      </div>
    </section>

    <section class="section section-soft">
      <div class="container">
        <div class="section-head reveal"><span class="eyebrow">المميزات</span><h2 class="title">كل اللي نشاطك محتاجه في ${esc(p.name)}</h2></div>
        <div class="features">
${s.features.map(([i, t, d]) => `          <div class="feature reveal"><div class="ico"><i data-i="${i}"></i></div><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('\n')}
        </div>
        <p class="sol-more"><a class="btn btn-ghost" href="${p.page}#all-features">شوف كل مميزات ${esc(p.name)} <i data-i="arrow"></i></a></p>
      </div>
    </section>
${custs.length ? `
    <section class="section">
      <div class="container">
        <div class="section-head reveal"><span class="eyebrow">عملاؤنا</span><h2 class="title">شغالين فعلاً على ${esc(p.name)}</h2></div>
        <div class="customers-grid">
${custs.map((c) => '          ' + customerCard(c, s.product)).join('\n')}
        </div>
      </div>
    </section>
` : ''}
    <section class="section section-soft" id="download">
      <div class="container">
        <div class="section-head reveal"><span class="eyebrow">التجربة المجانية</span><h2 class="title">جرّب ${esc(p.name)} ${esc(p.trial.days)} أيام مجاناً</h2><p>حمّل البرنامج مباشرة، من غير حساب ومن غير بيانات دفع.</p></div>
        <div data-trial="${s.product}"></div>
      </div>
    </section>

    <section class="section" id="faq">
      <div class="container">
        <div class="section-head reveal"><span class="eyebrow">أسئلة شائعة</span><h2 class="title">أسئلة عن ${esc(s.keyword)}</h2></div>
        <div class="faq">
${s.faq.map(([q, a]) => `          <details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n')}
        </div>
      </div>
    </section>

    <section class="section section-soft">
      <div class="container">
        <div class="section-head reveal"><span class="eyebrow">حلول تانية</span><h2 class="title">برامج لأنشطة تانية</h2></div>
        <div class="sol-links">
${s.related.map((r) => bySlug[r]).filter(Boolean).map((r) => `          <a class="sol-link t-${r.product}" href="${r.slug}.html"><img src="${P[r.product].logo}" alt="" width="36" height="36"><span><b>${esc(r.keyword)}</b><small>${esc(r.sub || r.eyebrow)}</small></span></a>`).join('\n')}
          <a class="sol-link" href="solutions.html"><img src="assets/img/brand/nexa.svg" alt="" width="36" height="36"><span><b>كل الحلول</b><small>اختار نشاطك</small></span></a>
        </div>
        <div class="join-card reveal" style="margin-top:48px">
          <div><h3>نشاطك مش في القايمة؟</h3><p>بنصمّم كمان أنظمة على مقاس شغلك. احكيلنا عن نشاطك على واتساب، ونقولك أنسب حل.</p></div>
          <a class="btn btn-wa" data-wa="مرحباً، عندي نشاط ومحتاج برنامج مناسب له:" href="#"><i data-i="whatsapp"></i> احكيلنا عن نشاطك</a>
        </div>
      </div>
    </section>
  </main>
${foot}`;
}

function linksGrid(indent) {
  return SOLUTIONS.map((s) => `${indent}<a class="sol-link t-${s.product}" href="${s.slug}.html"><img src="${P[s.product].logo}" alt="" width="36" height="36"><span><b>${esc(s.keyword)}</b><small>${esc(s.sub || s.eyebrow)}</small></span></a>`).join('\n');
}

function hub() {
  const url = `${SITE}/solutions`;
  const description = 'برامج كاشير وإدارة لكل نشاط في مصر: سوبر ماركت، محلات ملابس، موبايلات، مكتبات، عطور، منظفات، أثاث، مطاعم، وكافيهات — من Nexa Solutions. اختار نشاطك وجرّب مجاناً.';
  const jsonld = [
    {
      '@context': 'https://schema.org', '@type': 'ItemList', name: 'حلول Nexa Solutions حسب النشاط',
      itemListElement: SOLUTIONS.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.keyword, url: `${SITE}/${s.slug}` }))
    },
    breadcrumb([['الرئيسية', SITE + '/'], ['حلول حسب النشاط', url]])
  ];
  return `${head({ title: 'برامج كاشير وإدارة لكل نشاط | حلول حسب النشاط — Nexa Solutions', description, url, image: `${SITE}/assets/img/bexa/dashboard.webp`, jsonld })}
<body data-page="solutions">
  <a class="skip" href="#main">تخطَّ إلى المحتوى</a>
  <header id="site-header"></header>

  <main id="main">
    <section class="page-head">
      <div class="container">
        <span class="eyebrow">حلول حسب النشاط</span>
        <h1>برنامج لكل نشاط</h1>
        <p>اختار نشاطك وشوف إزاي برامجنا بتحل مشاكله بالظبط — وكل برنامج تقدر تجرّبه مجاناً قبل ما تقرر.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="sol-links sol-links-lg">
${linksGrid('          ')}
          <a class="sol-link t-storexa" href="storexa.html"><img src="${P.storexa.logo}" alt="" width="36" height="36"><span><b>عمل متجر إلكتروني</b><small>المتاجر الأونلاين</small></span></a>
        </div>
        <div class="join-card reveal" style="margin-top:56px">
          <div><h3>نشاطك مش في القايمة؟</h3><p>بنصمّم ونطوّر أنظمة مخصصة على مقاس شغلك. احكيلنا عن نشاطك ونقولك أنسب حل.</p></div>
          <a class="btn btn-wa" data-wa="مرحباً، عندي نشاط ومحتاج برنامج مناسب له:" href="#"><i data-i="whatsapp"></i> احكيلنا عن نشاطك</a>
        </div>
      </div>
    </section>
  </main>
${foot}`;
}

// --- write pages ---
for (const s of SOLUTIONS) write(`${s.slug}.html`, page(s));
write('solutions.html', hub());

// --- home page links block ---
let home = read('index.html');
const start = '<!-- solutions:start -->', end = '<!-- solutions:end -->';
if (home.includes(start) && home.includes(end)) {
  home = home.replace(new RegExp(start + '[\\s\\S]*?' + end), `${start}\n${linksGrid('          ')}\n          ${end}`);
  write('index.html', home);
} else {
  console.warn('index.html: solutions markers not found — home links block not updated');
}

// --- sitemap ---
const today = new Date().toISOString().slice(0, 10);
const urls = [
  ['', '1.0'], ['bexa', '0.9'], ['foodexa', '0.9'], ['storexa', '0.9'], ['solutions', '0.8'],
  ...SOLUTIONS.map((s) => [s.slug, '0.8']),
  ['updates', '0.6'], ['videos', '0.6']
];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, pr]) => `  <url><loc>${SITE}/${u}</loc><lastmod>${today}</lastmod><priority>${pr}</priority></url>`).join('\n')}
</urlset>
`);

console.log(`solutions: ${SOLUTIONS.length} pages + hub, sitemap: ${urls.length} URLs`);

// --- structured data on the hand-written pages ---
// Between <!-- jsonld:start --> and <!-- jsonld:end --> in <head> (added once, refreshed every build).
// FAQPage comes from the page's own <details><summary> questions, so it never drifts from the text.
const faqOf = (html) => [...html.matchAll(/<details><summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p><\/details>/g)]
  .map(([, q, a]) => ({ '@type': 'Question', name: plain(q), acceptedAnswer: { '@type': 'Answer', text: plain(a) } }));
const ORG = {
  '@type': 'Organization', '@id': SITE + '/#org', name: 'Nexa Solutions', alternateName: 'نيكسا سوليوشنز',
  url: SITE + '/', logo: SITE + '/assets/img/brand/nexa-512.png',
  description: 'شركة مصرية بتصمّم وتطوّر برامج كاشير ونقاط بيع وإدارة مطاعم ومتاجر إلكترونية وأنظمة مخصصة لكل نشاط.',
  telephone: '+201041213020', areaServed: { '@type': 'Country', name: 'Egypt' },
  address: { '@type': 'PostalAddress', addressLocality: 'المنيا الجديدة', addressRegion: 'المنيا', addressCountry: 'EG' },
  contactPoint: { '@type': 'ContactPoint', telephone: '+201041213020', contactType: 'sales', areaServed: 'EG', availableLanguage: ['ar'] },
  sameAs: [D.facebook].filter(Boolean)
};
const productLd = (key, file) => {
  const p = P[key];
  const html = read(file);
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || p.tagline;
  return {
    '@type': 'SoftwareApplication', name: p.name, url: `${SITE}/${key}`,
    applicationCategory: 'BusinessApplication', operatingSystem: key === 'storexa' ? 'Web' : 'Windows 10, Windows 11',
    inLanguage: 'ar', description: desc, image: `${SITE}/assets/img/share/${key}-og.png`,
    downloadUrl: p.trial ? p.trial.url : undefined, softwareVersion: p.trial ? p.trial.version : undefined,
    publisher: { '@id': SITE + '/#org' }
  };
};
const PAGE_LD = {
  'index.html': () => [ORG, { '@type': 'WebSite', '@id': SITE + '/#site', name: 'Nexa Solutions', url: SITE + '/', inLanguage: 'ar', publisher: { '@id': SITE + '/#org' } }],
  'bexa.html': () => [ORG, productLd('bexa', 'bexa.html')],
  'foodexa.html': () => [ORG, productLd('foodexa', 'foodexa.html')],
  'storexa.html': () => [ORG, productLd('storexa', 'storexa.html')]
};
let ldPages = 0;
for (const [file, build] of Object.entries(PAGE_LD)) {
  let html = read(file);
  const graph = build();
  const faq = faqOf(html);
  if (faq.length) graph.push({ '@type': 'FAQPage', mainEntity: faq });
  const block = `<!-- jsonld:start -->\n${ld({ '@context': 'https://schema.org', '@graph': graph })}\n  <!-- jsonld:end -->`;
  if (/<!-- jsonld:start -->[\s\S]*?<!-- jsonld:end -->/.test(html)) html = html.replace(/<!-- jsonld:start -->[\s\S]*?<!-- jsonld:end -->/, block);
  else html = html.replace(/\n<\/head>/, `\n  ${block}\n</head>`);
  write(file, html);
  ldPages++;
}
console.log(`structured data: ${ldPages} hand-written pages`);
