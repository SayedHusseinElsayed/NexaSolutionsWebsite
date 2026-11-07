// Builds the logo options: SVG icons, a preview sheet, and HTML pages that render.ps1 turns into PNGs.
// Run:  powershell -File tools\logo\render.ps1
const fs = require('fs');
const path = require('path');
const { concepts, AR_NAME, TAGLINE } = require('./logos.cjs');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'brand', 'logo-options');
const TMP = path.join(__dirname, 'html');
fs.mkdirSync(TMP, { recursive: true });

const fontLink = c => `<link href="https://fonts.googleapis.com/css2?family=${c.fontUrl}&family=Cairo:wght@400;600;700;800&display=block" rel="stylesheet">`;
const rel = p => path.relative(TMP, p).split(path.sep).join('/');
const PRODUCTS = ['bexa', 'foodexa', 'storexa'].map(k => path.join(ROOT, 'assets', 'img', 'brand', k + '.svg'));

/* ---------- Lockups ---------- */
// variant: color | white | black      layout: h | stack
function lockup(c, variant, layout, scale = 1) {
  const iconMode = variant === 'black' ? 'black' : 'tile';
  const ink = variant === 'white' ? '#fff' : variant === 'black' ? '#000' : c.ink;
  const sub = variant === 'white' ? 'rgba(255,255,255,.72)' : variant === 'black' ? '#000' : c.sub;
  const s = n => Math.round(n * scale) + 'px';
  const enGap = c.word.enLower ? '0' : '.18em';
  const words = `<div style="display:flex;flex-direction:column;gap:${s(6)};align-items:${layout === 'stack' ? 'center' : 'flex-start'}">
      <div style="font-family:'${c.font}';font-size:${s(84)};line-height:1;letter-spacing:-.02em;color:${ink};white-space:nowrap;display:flex;gap:${enGap};direction:ltr">${c.word.en}</div>
      <div style="font-family:'${c.font}','Cairo';font-weight:${c.word.arWeight};font-size:${s(37)};line-height:1.25;color:${sub};direction:rtl;white-space:nowrap">${AR_NAME}</div>
    </div>`;
  const icon = `<div style="width:${s(layout === 'stack' ? 200 : 150)};height:${s(layout === 'stack' ? 200 : 150)};flex:none">${c.icon(iconMode)}</div>`;
  return `<div class="lockup" style="display:inline-flex;direction:ltr;align-items:center;${layout === 'stack' ? `flex-direction:column;gap:${s(30)}` : `gap:${s(32)}`}">${icon}${words}</div>`;
}

function page(c, body, w, h, bg = 'transparent') {
  return `<!doctype html><html><head><meta charset="utf-8">${fontLink(c)}
<style>*{margin:0;box-sizing:border-box}html,body{width:${w}px;height:${h}px;background:${bg};overflow:hidden}
body{display:flex;align-items:center;justify-content:center}svg{display:block;width:100%;height:100%}</style></head><body>${body}</body></html>`;
}

function cover(c) {
  const [a, b] = c.tile;
  const prods = PRODUCTS.map(p => `<img src="${rel(p)}" style="width:92px;height:92px">`).join('');
  return `<div style="position:absolute;inset:0;background:linear-gradient(135deg,${a},${b})"></div>
  <div style="position:absolute;inset:0;background:radial-gradient(800px 400px at 85% 0%,rgba(255,255,255,.14),transparent),radial-gradient(700px 380px at 0% 100%,rgba(101,194,26,.22),transparent)"></div>
  <div style="position:relative;display:flex;flex-direction:column;align-items:center;gap:34px">
    ${lockup(c, 'white', 'h', 1.15)}
    <div style="font-family:'Cairo';font-weight:700;font-size:40px;color:#fff;direction:rtl">${TAGLINE} — كاشير، مطاعم، ومتاجر إلكترونية</div>
    <div style="display:flex;gap:26px;align-items:center;direction:ltr">${prods}
      <div style="font-family:'Cairo';font-weight:700;font-size:30px;color:rgba(255,255,255,.85);margin-left:10px">nexamasr.com</div></div>
  </div>`;
}

module.exports = { lockup, page, cover, rel, TMP, ROOT };
if (require.main === module) buildOptions();
function buildOptions() {
const jobs = [];
for (const c of concepts) {
  const dir = path.join(OUT, c.key);
  fs.mkdirSync(dir, { recursive: true });
  // Vector icons (pure paths — open in any design app, print shop, or browser)
  fs.writeFileSync(path.join(dir, 'icon.svg'), c.icon('tile'));
  fs.writeFileSync(path.join(dir, 'icon-on-light.svg'), c.icon('light'));
  fs.writeFileSync(path.join(dir, 'icon-black.svg'), c.icon('black'));
  fs.writeFileSync(path.join(dir, 'icon-white.svg'), c.icon('white'));

  const add = (name, body, w, h, bg) => {
    const f = path.join(TMP, `${c.key}__${name}.html`);
    fs.writeFileSync(f, page(c, body, w, h, bg));
    jobs.push({ html: f, out: path.join(dir, name + '.png'), w, h });
  };
  add('logo-horizontal', lockup(c, 'color', 'h'), 1500, 300);
  add('logo-horizontal-white', lockup(c, 'white', 'h'), 1500, 300);
  add('logo-horizontal-black', lockup(c, 'black', 'h'), 1500, 300);
  add('logo-stacked', lockup(c, 'color', 'stack'), 1000, 560);
  add('icon-1024', `<div style="width:1024px;height:1024px">${c.icon('tile')}</div>`, 1024, 1024);
  add('facebook-profile', `<div style="width:1080px;height:1080px">${c.icon('tile', true)}</div>`, 1080, 1080);
  add('facebook-cover', cover(c), 1640, 624, '#0B1220');
}
fs.writeFileSync(path.join(TMP, 'jobs.json'), JSON.stringify(jobs));

/* ---------- Preview sheet ---------- */
const P = f => f; // paths in the sheet are relative to brand/logo-options
const allFonts = `<link href="https://fonts.googleapis.com/css2?${concepts.map(c => 'family=' + c.fontUrl).join('&')}&family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">`;
const section = (c, i) => `
<section class="concept" id="${c.key}">
  <header class="ch">
    <div class="num">${i + 1}</div>
    <div><h2>${c.name} <small>· ${c.ar}</small></h2><p>${c.ideaAr}</p></div>
  </header>

  <div class="grid">
    <figure class="card light span2"><div class="stage">${lockup(c, 'color', 'h', 0.62)}</div><figcaption>الشعار الأساسي — على خلفية فاتحة</figcaption></figure>
    <figure class="card dark"><div class="stage">${lockup(c, 'white', 'stack', 0.5)}</div><figcaption>على خلفية غامقة</figcaption></figure>
    <figure class="card light"><div class="stage">${lockup(c, 'black', 'h', 0.42)}</div><figcaption>لون واحد أسود — أختام وطباعة أبيض وأسود</figcaption></figure>
    <figure class="card light"><div class="stage sizes">
      <div style="width:120px">${c.icon('tile')}</div><div style="width:64px">${c.icon('tile')}</div><div style="width:32px">${c.icon('tile')}</div><div style="width:16px">${c.icon('tile')}</div>
      <div style="width:56px;margin-inline-start:14px">${c.icon('light')}</div></div><figcaption>الأيقونة من 120 لحد 16 بكسل (أيقونة المتصفح)</figcaption></figure>
    <figure class="card light"><div class="stage"><div class="fb-avatar">${c.icon('tile', true)}</div></div><figcaption>صورة صفحة فيسبوك (بتتقص دائرة)</figcaption></figure>

    <figure class="card mock span3"><div class="fb">
      <img class="fb-cover" src="${P(c.key + '/facebook-cover.png')}" alt="">
      <div class="fb-row"><div class="fb-pp">${c.icon('tile', true)}</div><div class="fb-name"><b>Nexa Solutions</b><span>برمجيات · المنيا الجديدة</span></div></div>
    </div><figcaption>صفحة فيسبوك: الغلاف + الصورة الشخصية</figcaption></figure>

    <figure class="card mock span2"><div class="invoice">
      <div class="inv-head"><div class="inv-logo">${lockup(c, 'color', 'h', 0.36)}</div>
        <div class="inv-title"><b>فاتورة</b><span>رقم 2026-0147</span><span>7 نوفمبر 2026</span></div></div>
      <div class="inv-bar" style="background:${c.key === 'option-3' ? c.tile[1] : c.tile[0]}"></div>
      <table><tr><th>البيان</th><th>الكمية</th><th>الإجمالي</th></tr>
        <tr><td>Bexa POS — الباقة الاحترافية</td><td>1</td><td>3,500 ج.م</td></tr>
        <tr><td>تثبيت وتدريب</td><td>1</td><td>0 ج.م</td></tr></table>
      <div class="inv-foot">nexamasr.com · 01041213020 · المنيا الجديدة</div>
    </div><figcaption>فاتورة / عقد — رأس الورقة</figcaption></figure>

    <figure class="card mock"><div class="bcard" style="background:linear-gradient(135deg,${c.tile[0]},${c.tile[1]})">${lockup(c, 'white', 'stack', 0.36)}</div>
      <div class="bcard back"><b>اسم الموظف</b><span>مدير المبيعات</span><span dir="ltr">0104 121 3020</span><span>nexamasr.com</span><div class="bc-ic">${c.icon('light')}</div></div>
      <figcaption>كارت شخصي (وش وضهر)</figcaption></figure>
  </div>

  <div class="files">
    <b>ملفات الاختيار ${i + 1}:</b>
    ${['logo-horizontal', 'logo-horizontal-white', 'logo-horizontal-black', 'logo-stacked', 'icon-1024', 'facebook-profile', 'facebook-cover'].map(n => `<a href="${c.key}/${n}.png" download>${n}.png</a>`).join('')}
    ${['icon', 'icon-on-light', 'icon-black', 'icon-white'].map(n => `<a href="${c.key}/${n}.svg" download>${n}.svg</a>`).join('')}
  </div>
</section>`;

const sheet = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Nexa Solutions — اختيارات الشعار</title>${allFonts}
<style>
:root{--ink:#0b1220;--muted:#5b6678;--line:#e5e9f0;--soft:#f6f8fb}
*{box-sizing:border-box}body{margin:0;font-family:Cairo,system-ui,sans-serif;color:var(--ink);background:var(--soft)}
.wrap{max-width:1240px;margin:0 auto;padding:32px 16px 80px}
.top h1{font-size:30px;margin:0 0 6px}.top p{color:var(--muted);margin:0 0 20px;font-size:17px}
.pick{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:36px}
.pick a{background:#fff;border:1px solid var(--line);border-radius:18px;padding:22px 16px;display:flex;flex-direction:column;align-items:center;gap:12px;text-decoration:none;color:var(--ink)}
.pick a:hover{border-color:#65c21a}.pick .ic{width:84px}.pick b{font-size:18px}.pick span{color:var(--muted);font-size:14px}
.concept{background:#fff;border:1px solid var(--line);border-radius:24px;padding:26px;margin-bottom:30px}
.ch{display:flex;gap:16px;align-items:flex-start;margin-bottom:20px}.num{flex:none;width:44px;height:44px;border-radius:12px;background:var(--ink);color:#fff;display:grid;place-items:center;font-weight:800;font-size:20px}
.ch h2{margin:0 0 4px;font-size:24px}.ch h2 small{color:var(--muted);font-weight:600;font-size:17px}.ch p{margin:0;color:var(--muted);line-height:1.8;max-width:820px}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.span2{grid-column:span 2}.span3{grid-column:1/-1}
figure{margin:0}.card{border:1px solid var(--line);border-radius:18px;overflow:hidden;display:flex;flex-direction:column;background:#fff}
.card figcaption{font-size:13.5px;color:var(--muted);padding:10px 14px;border-top:1px solid var(--line);background:#fff}
.stage{flex:1;min-height:200px;display:flex;align-items:center;justify-content:center;padding:26px;overflow:hidden}
.dark .stage{background:#0b1220}.sizes{gap:16px;align-items:flex-end}.stage svg,.fb svg,.bcard svg,.invoice svg{display:block;width:100%;height:auto}
.fb-avatar{width:150px;height:150px;border-radius:50%;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,.15)}
.mock{background:#eef1f5}.fb{background:#fff;margin:18px;border-radius:12px;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,.08)}
.fb-cover{display:block;width:100%;aspect-ratio:1640/624;object-fit:cover}
.fb-row{display:flex;align-items:flex-end;gap:16px;padding:0 24px 18px;direction:ltr}.fb-pp{width:150px;height:150px;border-radius:50%;overflow:hidden;border:5px solid #fff;margin-top:-60px;flex:none}
.fb-name{display:flex;flex-direction:column;padding-bottom:12px}.fb-name b{font-size:26px}.fb-name span{color:var(--muted);direction:rtl}
.invoice{background:#fff;margin:18px;border-radius:6px;padding:24px 26px;box-shadow:0 4px 18px rgba(0,0,0,.08);font-size:14px}
.inv-head{display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap}.inv-logo{direction:ltr}
.inv-title{display:flex;flex-direction:column;text-align:left}.inv-title b{font-size:24px}.inv-title span{color:var(--muted);font-size:13px}
.inv-bar{height:4px;border-radius:4px;margin:16px 0}table{width:100%;border-collapse:collapse}th,td{padding:8px;border-bottom:1px solid var(--line);text-align:right}th{background:var(--soft);font-weight:700}
.inv-foot{margin-top:16px;color:var(--muted);font-size:12px;text-align:center}
.bcard{margin:18px 18px 0;aspect-ratio:1.75;border-radius:12px;display:grid;place-items:center;box-shadow:0 4px 18px rgba(0,0,0,.12)}
.bcard.back{background:#fff;place-items:start;align-content:center;padding:18px 22px;gap:2px;position:relative;margin-bottom:18px;font-size:13px;color:var(--muted)}
.bcard.back b{color:var(--ink);font-size:17px}.bc-ic{position:absolute;left:18px;bottom:16px;width:40px}
.files{margin-top:16px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-size:13.5px}
.files a{background:var(--soft);border:1px solid var(--line);border-radius:999px;padding:5px 12px;color:var(--ink);text-decoration:none;direction:ltr}.files a:hover{border-color:#65c21a}
@media(max-width:860px){.grid,.pick{grid-template-columns:1fr}.span2,.span3{grid-column:auto}.stage .lockup{zoom:.5}.card.dark .stage .lockup{zoom:.75}.inv-logo .lockup{zoom:.8}.concept{padding:18px 14px}.stage{padding:18px 10px}}
</style></head><body><div class="wrap">
<div class="top"><h1>شعار Nexa Solutions — 3 اختيارات</h1>
<p>كل اختيار معروض على فيسبوك وفاتورة وكارت شخصي، وبالأبيض والأسود. اختار واحد ونجهّز منه الملفات النهائية.</p></div>
<div class="pick">${concepts.map((c, i) => `<a href="#${c.key}"><div class="ic">${c.icon('tile')}</div><b>${i + 1}. ${c.name}</b><span>${c.ar}</span></a>`).join('')}</div>
${concepts.map(section).join('')}
</div></body></html>`;
fs.writeFileSync(path.join(OUT, 'index.html'), sheet);
console.log('ok', jobs.length, 'renders');
}
