// Builds the final Nexa Solutions logo kit (chosen: option 1 «Rising N») into brand/nexa-logo-kit,
// and installs the icon on the website (assets/img/brand). Run:  powershell -File tools\logo\render-kit.ps1
const fs = require('fs');
const path = require('path');
const { concepts, AR_NAME, TAGLINE } = require('./logos.cjs');
const { lockup, page, cover, TMP, ROOT } = require('./build.cjs');

const c = concepts.find(x => x.key === 'option-1');
const KIT = path.join(ROOT, 'brand', 'nexa-logo-kit');
const SITE = path.join(ROOT, 'assets', 'img', 'brand');
for (const d of ['svg', 'png', 'print']) fs.mkdirSync(path.join(KIT, d), { recursive: true });

const CONTACT = { phone: '01041213020', web: 'nexamasr.com', city: 'المنيا الجديدة، مصر', fb: 'facebook.com/NexaSolutitions' };

/* ---------- Vector icons ---------- */
const head = '<?xml version="1.0" encoding="UTF-8"?>\n<!-- Nexa Solutions — Rising N logo. Colours: navy #0B1220/#1E293B, lime #65C21A/#B5F04A -->\n';
const svgs = { 'icon.svg': c.icon('tile'), 'icon-on-light.svg': c.icon('light'), 'icon-black.svg': c.icon('black'), 'icon-white.svg': c.icon('white'), 'icon-square.svg': c.icon('tile', true) };
for (const [n, s] of Object.entries(svgs)) fs.writeFileSync(path.join(KIT, 'svg', n), head + s);
fs.writeFileSync(path.join(SITE, 'nexa.svg'), head + c.icon('tile'));

/* ---------- Letterhead (A4 = 794×1123 CSS px) ---------- */
const letterhead = (forPdf) => `
<div style="position:relative;width:794px;height:${forPdf ? 1123 : 150}px;background:#fff;font-family:Cairo">
  <div style="position:absolute;top:0;left:0;right:0;height:6px;background:linear-gradient(90deg,#0B1220 0 70%,#65C21A 70% 88%,#B5F04A 88%)"></div>
  <div style="position:absolute;top:34px;left:48px">${lockup(c, 'color', 'h', 0.42)}</div>
  <div style="position:absolute;top:40px;right:48px;text-align:right;direction:rtl;font-size:12.5px;line-height:1.75;color:#5B6678">
    <b style="color:#0B1220;font-size:14px">${TAGLINE}</b><br>
    <span dir="ltr">${CONTACT.phone}</span> · ${CONTACT.web}<br>${CONTACT.city}</div>
  <div style="position:absolute;top:128px;left:48px;right:48px;height:1px;background:#E5E9F0"></div>
  ${forPdf ? `<div style="position:absolute;bottom:0;left:0;right:0;height:56px;background:#0B1220;color:rgba(255,255,255,.85);display:flex;align-items:center;justify-content:center;gap:22px;font-size:12.5px;direction:rtl">
    <span>Nexa Solutions — ${AR_NAME}</span><span>·</span><span dir="ltr">${CONTACT.phone}</span><span>·</span><span>${CONTACT.web}</span><span>·</span><span>${CONTACT.city}</span></div>` : ''}
</div>`;

/* ---------- Jobs ---------- */
fs.mkdirSync(TMP, { recursive: true });
const jobs = [];
const add = (out, body, w, h, opts = {}) => {
  const f = path.join(TMP, 'kit__' + path.basename(out).replace(/\W/g, '_') + '.html');
  let html = page(c, body, w, h, opts.bg || 'transparent');
  if (opts.pdf) html = html.replace('</style>', `@page{size:${w}px ${h}px;margin:0}html,body{-webkit-print-color-adjust:exact;print-color-adjust:exact}</style>`);
  fs.writeFileSync(f, html);
  jobs.push({ html: f, out, w, h, pdf: !!opts.pdf });
};
const K = (...p) => path.join(KIT, ...p);
const box = (n, inner) => `<div style="width:${n}px;height:${n}px">${inner}</div>`;

add(K('png', 'logo-horizontal.png'), lockup(c, 'color', 'h'), 1500, 300);
add(K('png', 'logo-horizontal-white.png'), lockup(c, 'white', 'h'), 1500, 300);
add(K('png', 'logo-horizontal-black.png'), lockup(c, 'black', 'h'), 1500, 300);
add(K('png', 'logo-stacked.png'), lockup(c, 'color', 'stack'), 1000, 560);
add(K('png', 'logo-stacked-white.png'), lockup(c, 'white', 'stack'), 1000, 560);
add(K('png', 'icon-1024.png'), box(1024, c.icon('tile')), 1024, 1024);
add(K('png', 'icon-512.png'), box(512, c.icon('tile')), 512, 512);
add(K('png', 'facebook-profile.png'), box(1080, c.icon('tile', true)), 1080, 1080);
add(K('png', 'facebook-cover.png'), cover(c), 1640, 624, { bg: '#0B1220' });
add(K('png', 'whatsapp-profile.png'), box(640, c.icon('tile', true)), 640, 640);
add(K('png', 'letterhead-header.png'), `<div style="zoom:3">${letterhead(false)}</div>`, 2382, 450, { bg: '#fff' });

add(K('print', 'logo-horizontal.pdf'), lockup(c, 'color', 'h'), 1500, 300, { pdf: true });
add(K('print', 'logo-horizontal-black.pdf'), lockup(c, 'black', 'h'), 1500, 300, { pdf: true });
add(K('print', 'logo-stacked.pdf'), lockup(c, 'color', 'stack'), 1000, 560, { pdf: true });
add(K('print', 'letterhead-A4.pdf'), letterhead(true), 794, 1123, { pdf: true, bg: '#fff' });

// Website: raster copies for Google, iPhone home screen and link previews
add(path.join(SITE, 'nexa-512.png'), box(512, c.icon('tile', true)), 512, 512);
add(path.join(SITE, 'apple-touch-icon.png'), box(180, c.icon('tile', true)), 180, 180);
fs.writeFileSync(path.join(TMP, 'jobs.json'), JSON.stringify(jobs));

/* ---------- Usage guide ---------- */
const files = {
  'png': [['logo-horizontal.png', 'الفواتير، العقود، عروض الأسعار، الإيميل'], ['logo-horizontal-white.png', 'فوق خلفية غامقة أو صورة'], ['logo-horizontal-black.png', 'الأختام وطباعة الأبيض والأسود'], ['logo-stacked.png', 'الفلايرات واليافطات ونهاية الفيديوهات'], ['logo-stacked-white.png', 'نفس السابق على خلفية غامقة'], ['facebook-profile.png', 'صورة صفحة فيسبوك'], ['facebook-cover.png', 'غلاف صفحة فيسبوك'], ['whatsapp-profile.png', 'صورة واتساب بيزنس'], ['icon-1024.png', 'أيقونة التطبيقات والبرامج'], ['icon-512.png', 'أيقونة صغيرة'], ['letterhead-header.png', 'رأس الصفحة في Word أو Excel']],
  'print': [['logo-horizontal.pdf', 'للمطبعة (فيكتور — أي مقاس)'], ['logo-horizontal-black.pdf', 'للأختام والطباعة بلون واحد'], ['logo-stacked.pdf', 'لليافطات والفلايرات'], ['letterhead-A4.pdf', 'ورق رسمي A4 للعقود والخطابات']],
  'svg': [['icon.svg', 'الأيقونة الأساسية (فيكتور)'], ['icon-square.svg', 'أيقونة مربعة بدون حواف مدورة'], ['icon-on-light.svg', 'الرمز بدون بلاطة على خلفية فاتحة'], ['icon-black.svg', 'الرمز بالأسود'], ['icon-white.svg', 'الرمز بالأبيض']]
};
const sw = (hex, name, use) => `<div class="sw"><i style="background:${hex}"></i><b>${name}</b><code>${hex}</code><span>${use}</span></div>`;
const guide = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>شعار Nexa Solutions — دليل الاستخدام</title>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}body{margin:0;font-family:Cairo,system-ui,sans-serif;color:#0B1220;background:#F6F8FB;line-height:1.7}
.wrap{max-width:1040px;margin:0 auto;padding:32px 16px 80px}h1{font-size:30px;margin:0}h2{font-size:21px;margin:0 0 14px}.lead{color:#5B6678;margin:4px 0 24px}
.card{background:#fff;border:1px solid #E5E9F0;border-radius:20px;padding:24px;margin-bottom:18px}
.hero{display:grid;grid-template-columns:1.4fr 1fr;gap:14px}.stage{border-radius:16px;display:flex;align-items:center;justify-content:center;padding:34px 16px;min-height:220px;border:1px solid #E5E9F0;overflow:hidden}.stage.dark{background:#0B1220;border:0}
svg{display:block;width:100%;height:auto}
.sws{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px}.sw{display:flex;flex-direction:column;gap:2px;font-size:14px}.sw i{height:70px;border-radius:12px;border:1px solid #E5E9F0;margin-bottom:6px}.sw code{direction:ltr;text-align:right;color:#5B6678}.sw span{color:#5B6678;font-size:13px}
.rules{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}.rule{border:1px solid #E5E9F0;border-radius:14px;padding:14px}.rule b{display:block}.rule span{color:#5B6678;font-size:14px}
.no{border-color:#FECACA;background:#FEF2F2}.no b{color:#B91C1C}
.clear{display:flex;justify-content:center}.clear-box{position:relative;padding:28px;outline:1.5px dashed #65C21A;outline-offset:0;border-radius:6px}
table{width:100%;border-collapse:collapse;font-size:14.5px}td{padding:9px 8px;border-bottom:1px solid #E5E9F0;vertical-align:top}td:first-child{white-space:nowrap}td a{direction:ltr;color:#1D4ED8;text-decoration:none;font-weight:700}
.dir{color:#5B6678;font-size:13px;margin:16px 0 6px;font-weight:700}
@media(max-width:760px){.hero{grid-template-columns:1fr}.stage .lockup{zoom:.5}}
</style></head><body><div class="wrap">
<h1>شعار Nexa Solutions</h1><p class="lead">الحرف الصاعد — حرف N آخر ضلع فيه بيكمّل طالع على شكل مربعات «نمو»، نفس المربعات اللي في أيقونات Bexa وFoodexa وStorexa.</p>

<div class="card hero"><div class="stage">${lockup(c, 'color', 'h', 0.55)}</div><div class="stage dark">${lockup(c, 'white', 'stack', 0.5)}</div></div>

<div class="card"><h2>الألوان</h2><div class="sws">
${sw('#0B1220', 'كحلي Nexa', 'الأساسي: النصوص والخلفيات الغامقة')}${sw('#1E293B', 'كحلي فاتح', 'تدرّج البلاطة')}${sw('#65C21A', 'أخضر النمو', 'المربعات والأزرار والتمييز')}${sw('#B5F04A', 'أخضر فاتح', 'تدرّج المربعات')}${sw('#5B6678', 'رمادي', 'النصوص الثانوية')}
</div><p style="margin:16px 0 0;color:#5B6678">الخط: <b style="color:#0B1220">Cairo</b> (مجاني من Google Fonts) — Bold للاسم وSemiBold لكلمة Solutions والسطر العربي.</p></div>

<div class="card"><h2>المساحة الفاضية والحجم الأصغر</h2>
<div class="clear"><div class="clear-box">${lockup(c, 'color', 'h', 0.4)}</div></div>
<div class="rules" style="margin-top:16px">
<div class="rule"><b>سيب مساحة فاضية حوالين الشعار</b><span>على الأقل قد ارتفاع المربع الأخضر الكبير من كل ناحية — ما تحطش نص أو صور لازقة فيه.</span></div>
<div class="rule"><b>أصغر مقاس للشعار الأفقي</b><span>عرض 3 سم في الطباعة، أو 140 بكسل على الشاشة. أصغر من كده استخدم الأيقونة لوحدها.</span></div>
<div class="rule"><b>أصغر مقاس للأيقونة</b><span>16 بكسل (أيقونة المتصفح) — والأفضل 24 بكسل وأكبر.</span></div>
</div></div>

<div class="card"><h2>اعمل / ما تعملش</h2><div class="rules">
<div class="rule"><b>✓ على خلفية فاتحة</b><span>استخدم logo-horizontal الملوّن.</span></div>
<div class="rule"><b>✓ على خلفية غامقة أو صورة</b><span>استخدم النسخة البيضا (white).</span></div>
<div class="rule"><b>✓ أختام وفاكس وطباعة أبيض وأسود</b><span>استخدم النسخة السودا (black).</span></div>
<div class="rule no"><b>✗ ما تمطّش الشعار</b><span>كبّر وصغّر من الركن عشان النسب تفضل ثابتة.</span></div>
<div class="rule no"><b>✗ ما تغيّرش الألوان</b><span>ولا تضيف ظل أو حدود أو تأثيرات.</span></div>
<div class="rule no"><b>✗ ما تكتبش الاسم بخط تاني</b><span>استخدم ملفات الشعار الجاهزة بدل ما تكتب «Nexa Solutions» بإيدك.</span></div>
</div></div>

<div class="card"><h2>الملفات</h2>
${Object.entries(files).map(([d, list]) => `<div class="dir">${{ png: 'صور PNG (خلفية شفافة) — للاستخدام اليومي', print: 'ملفات PDF — للمطبعة', svg: 'ملفات SVG — فيكتور للمصممين' }[d]}</div>
<table>${list.map(([f, u]) => `<tr><td><a href="${d}/${f}" download>${f}</a></td><td>${u}</td></tr>`).join('')}</table>`).join('')}
</div>
</div></body></html>`;
fs.writeFileSync(path.join(KIT, 'index.html'), guide);
console.log('ok', jobs.length, 'jobs');
