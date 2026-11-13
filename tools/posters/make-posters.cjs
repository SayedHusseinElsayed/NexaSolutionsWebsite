// Builds poster (1080x1350) and link-preview (1200x630) HTML for each product.
// Rendered to PNG afterwards with headless Edge.
const fs = require('fs');
const path = require('path');
const QR = require('qrcode');
const SITE = path.resolve(__dirname, '../..').split(path.sep).join('/');
// Edit the poster texts in the P object below (features, steps, trial login), then run tools/posters/render.ps1
const OUT = path.join(__dirname, 'html');
fs.mkdirSync(OUT, { recursive: true });
const img = p => 'file:///' + SITE + '/' + p;

const P = {
  bexa: {
    name: 'Bexa POS', sub: 'نقاط البيع وإدارة المخزون', c: '#1d4ed8', c2: '#3d8bff',
    head: 'بيع أسرع، مخزون مضبوط،<br><em>وأرباح واضحة.</em>',
    shot: 'assets/img/bexa/dashboard.webp', phone: 'assets/img/bexa/pos-sizes-colors-picker.webp', phoneWide: true,
    feats: ['كاشير بالباركود وكل طرق الدفع', 'مخزون بالمقاسات والألوان', 'عروض ونقاط ولاء وعمولات', 'حسابات و14 تقرير مالي', 'ذكاء تحليلي وتوقع المبيعات', 'فروع وتطبيق للمالك'],
    badges: ['يعمل بدون إنترنت', 'تطبيق موبايل للمالك', 'عربي بالكامل'],
    stepsTitle: 'جرّبه مجاناً 7 أيام', steps: ['امسح الكود وافتح الصفحة', 'حمّل النسخة التجريبية', 'ثبّت وادخل: admin / admin123'],
    wa: 'واتساب للاستفسار والتركيب', url: 'nexamasr.com/bexa', link: 'https://nexamasr.com/bexa#download'
  },
  foodexa: {
    name: 'Foodexa', sub: 'نظام المطاعم والكافيهات', c: '#f97316', c2: '#ff9f45',
    head: 'مطعمك شغّال…<br><em>حتى وإنت مش فيه.</em>',
    shot: 'assets/img/foodexa/pos-dinein.webp', phone: 'assets/img/foodexa/guest-menu.webp',
    feats: ['كاشير صالة وتيك أواي وتوصيل', 'خريطة طاولات وحجوزات', 'منيو QR والزبون يطلب بنفسه', 'تطبيق الويتر وطباعة المطبخ', 'مخزون ووصفات وهالك', 'تطبيق المالك لكل الفروع'],
    badges: ['كاشير + 3 تطبيقات', 'كل فرع شغال لوحده', 'عربي بالكامل'],
    stepsTitle: 'جرّبه مجاناً 7 أيام', steps: ['امسح الكود وافتح الصفحة', 'حمّل Foodexa وثبّته بضغطة', 'ادخل بالمدير العام و PIN 1234'],
    wa: 'واتساب للاستفسار والتركيب', url: 'nexamasr.com/foodexa', link: 'https://nexamasr.com/foodexa#download'
  },
  storexa: {
    name: 'Storexa', sub: 'المتاجر الإلكترونية', c: '#7c3aed', c2: '#a78bfa',
    head: 'متجرك أونلاين…<br><em>من غير طلبات وهمية.</em>',
    shot: 'assets/img/storexa/store-home.webp', phone: 'assets/img/storexa/store-fashion.webp', phoneWide: true,
    feats: ['متجر بهويتك و8 قوالب', 'شحن مختلف لكل محافظة', 'تأكيد الطلب على واتساب', 'تنبيه قبل شحن الطلب المشكوك فيه', 'InstaPay والمحافظ', 'ربط مع Bexa POS'],
    badges: ['جاهز في 3 خطوات', 'إدارة من الموبايل', 'عربي بالكامل'],
    stepsTitle: 'متجرك جاهز في 3 خطوات', steps: ['امسح الكود واطلب التجربة', 'أضف منتجاتك وصمّم متجرك', 'ابدأ استقبال الطلبات'],
    wa: 'واتساب لطلب متجرك التجريبي', url: 'nexamasr.com/storexa', link: 'https://nexamasr.com/storexa'
  }
};

const check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
const waIcon = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35M12.05 21.79a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.86 9.86 0 0 1 9.88 9.89c0 5.45-4.44 9.88-9.89 9.88M20.46 3.49A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45c6.55 0 11.89-5.34 11.89-11.9 0-3.17-1.24-6.16-3.48-8.41Z"/></svg>';

const base = (p, w, h) => `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@500;700;800;900&display=block" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${w}px;height:${h}px;overflow:hidden}
body{font-family:Cairo,"Segoe UI",Tahoma,sans-serif;color:#fff;background:#0b1220;position:relative;--c:${p.c};--c2:${p.c2}}
.bg{position:absolute;inset:0;background:
 radial-gradient(700px 500px at 100% 0%, color-mix(in srgb,var(--c) 55%,transparent), transparent 70%),
 radial-gradient(600px 500px at 0% 100%, color-mix(in srgb,var(--c2) 35%,transparent), transparent 70%),
 linear-gradient(160deg,#0b1220,#111a2e)}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:44px 44px;mask-image:linear-gradient(#000,transparent 70%)}
.wrap{position:relative;height:100%;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:22px}
.brand img{border-radius:22px;background:#fff;box-shadow:0 12px 30px -10px var(--c)}
.brand b{display:block;font-weight:900;letter-spacing:-.5px;line-height:1.05}
.brand small{display:block;color:#cbd5e1;font-weight:700}
.nexa{display:flex;align-items:center;gap:10px;color:#cbd5e1;font-weight:700}
.nexa img{width:34px;height:34px}
h1{font-weight:900;line-height:1.2;letter-spacing:-.5px}
h1 em{font-style:normal;background:linear-gradient(90deg,var(--c2),#fff);-webkit-background-clip:text;background-clip:text;color:transparent}
.feats{display:grid;grid-template-columns:1fr 1fr;gap:12px 22px}
.feats div{display:flex;align-items:center;gap:12px;font-weight:700}
.feats svg{flex:none;width:30px;height:30px;padding:6px;border-radius:9px;background:var(--c);color:#fff}
.badges{display:flex;gap:10px;flex-wrap:wrap}
.badges span{border:1.5px solid rgba(255,255,255,.22);background:rgba(255,255,255,.06);border-radius:999px;padding:4px 16px;font-weight:700;color:#e2e8f0}
.screen{position:relative}
.screen .main{display:block;width:100%;border-radius:18px;border:2px solid rgba(255,255,255,.14);box-shadow:0 40px 80px -30px #000}
.screen .phone{position:absolute;border-radius:22px;border:5px solid #0b1220;outline:2px solid rgba(255,255,255,.2);box-shadow:0 30px 60px -20px #000;object-fit:cover;object-position:top}
</style></head><body><div class="bg"></div><div class="grid"></div>`;

async function poster(key) {
  const p = P[key];
  const qr = await QR.toString(p.link, { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: '#0b1220', light: '#ffffff' } });
  const phoneCss = p.phoneWide
    ? 'width:340px;height:210px;left:-30px;bottom:-34px;border-radius:16px'
    : 'width:160px;height:320px;left:-26px;bottom:-40px';
  return base(p, 1080, 1350) + `
<style>
.wrap{padding:52px 64px 48px}
.top{display:flex;justify-content:space-between;align-items:flex-start}
.brand img{width:104px;height:104px;padding:6px}
.brand b{font-size:62px}.brand small{font-size:24px}
h1{font-size:56px;margin:22px 0 14px}
.badges span{font-size:21px}
.screen{margin:30px 30px 0 70px;transform:rotate(-2deg)}
.screen .main{height:356px;object-fit:cover;object-position:top}
.feats{margin-top:46px;font-size:24px;gap:10px 22px}
.bottom{margin-top:28px;display:flex;gap:26px;align-items:stretch;background:rgba(255,255,255,.07);border:1.5px solid rgba(255,255,255,.14);border-radius:28px;padding:24px}
.steps{flex:1}
.steps h2{font-size:30px;font-weight:900;margin-bottom:10px}
.steps ol{list-style:none;display:grid;gap:6px}
.steps li{display:flex;align-items:center;gap:12px;font-size:21px;font-weight:700;color:#e2e8f0}
.steps li i{font-style:normal;flex:none;width:36px;height:36px;border-radius:50%;background:#fff;color:var(--c);display:grid;place-items:center;font-weight:900;font-size:20px}
.contact{display:flex;align-items:center;gap:10px;margin-top:12px;font-size:22px;font-weight:800;color:#86efac}
.contact svg{width:28px;height:28px}
.qr{width:220px;flex:none;background:#fff;border-radius:20px;padding:16px 16px 8px;text-align:center;color:#0b1220}
.qr svg{display:block;width:100%;height:auto}
.qr b{display:block;font-size:17px;margin-top:6px;font-weight:900}
.qr span{display:block;font-size:14px;color:${p.c};font-weight:800;direction:ltr}
</style>
<div class="wrap">
  <div class="top">
    <div class="brand"><img src="${img('assets/img/brand/' + key + '.svg')}"><div><b>${p.name}</b><small>${p.sub}</small></div></div>
    <div class="nexa"><img src="${img('assets/img/brand/nexa.svg')}">Nexa Solutions</div>
  </div>
  <h1>${p.head}</h1>
  <div class="badges">${p.badges.map(b => `<span>${b}</span>`).join('')}</div>
  <div class="screen"><img class="main" src="${img(p.shot)}"><img class="phone" style="${phoneCss}" src="${img(p.phone)}"></div>
  <div class="feats">${p.feats.map(f => `<div>${check}${f}</div>`).join('')}</div>
  <div class="bottom">
    <div class="steps"><h2>${p.stepsTitle}</h2><ol>${p.steps.map((s, i) => `<li><i>${i + 1}</i>${s}</li>`).join('')}</ol>
      <div class="contact">${waIcon}<span dir="ltr">01041213020</span> — ${p.wa}</div></div>
    <div class="qr">${qr}<b>امسح الكود</b><span>${p.url}</span></div>
  </div>
</div></body></html>`;
}

function og(key) {
  const p = P[key];
  return base(p, 1200, 630) + `
<style>
.wrap{padding:54px 60px;flex-direction:row;gap:40px;align-items:center}
.txt{flex:0 0 560px}
.brand img{width:84px;height:84px;padding:5px}
.brand b{font-size:50px}.brand small{font-size:20px}
h1{font-size:44px;margin:24px 0 22px}
.feats{font-size:21px;gap:10px;grid-template-columns:1fr}
.feats svg{width:26px;height:26px;padding:5px}
.foot{margin-top:24px;display:flex;align-items:center;gap:14px;font-size:20px;font-weight:800;color:#cbd5e1}
.foot b{color:#fff;direction:ltr}
.screen{flex:1;transform:rotate(-2deg);margin-left:-120px}
.screen .main{width:640px;max-width:none}
</style>
<div class="wrap">
  <div class="txt">
    <div class="brand"><img src="${img('assets/img/brand/' + key + '.svg')}"><div><b>${p.name}</b><small>${p.sub}</small></div></div>
    <h1>${p.head}</h1>
    <div class="feats">${p.feats.slice(0, 4).map(f => `<div>${check}${f}</div>`).join('')}</div>
    <div class="foot"><img src="${img('assets/img/brand/nexa.svg')}" width="30">Nexa Solutions · <b>${p.url}</b></div>
  </div>
  <div class="screen"><img class="main" src="${img(p.shot)}"></div>
</div></body></html>`;
}

(async () => {
  for (const k of Object.keys(P)) {
    fs.writeFileSync(path.join(OUT, k + '-poster.html'), await poster(k));
    fs.writeFileSync(path.join(OUT, k + '-og.html'), og(k));
  }
  console.log('ok', fs.readdirSync(OUT).join(' '));
})();
