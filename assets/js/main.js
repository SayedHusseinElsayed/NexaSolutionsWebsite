/* =========================================================================
   Nexa Solutions — shared behaviour: icons, header/footer, videos,
   customers, modal player, scroll reveal and the WhatsApp contact form.
   ========================================================================= */
(function () {
  'use strict';
  var D = window.NEXA || {};
  var P = D.products || {};

  /* ---------- Icon sprite ---------- */
  var ICONS = {
    check: '<path d="M20 6 9 17l-5-5"/>',
    arrow: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    play: '<path d="M7 4v16l13-8z" fill="currentColor" stroke="none"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    whatsapp: '<path fill="currentColor" stroke="none" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>',
    facebook: '<path fill="currentColor" stroke="none" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z"/>',
    wifioff: '<path d="M2 2l20 20"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 4.17-2.65"/><path d="M10.66 5c4.01-.36 8.14.9 11.34 3.76"/><path d="M16.85 11.25a10 10 0 0 1 2.22 1.68"/><path d="M5 13a10 10 0 0 1 5.24-2.76"/><path d="M12 20h.01"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    sparkles: '<path d="M12 3l1.9 5.8L20 10.7l-6.1 1.9L12 18.5l-1.9-5.9L4 10.7l6.1-1.9z"/><path d="M19 3v4M17 5h4"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>',
    chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    store: '<path d="M3 9l1.5-5h15L21 9"/><path d="M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z"/><path d="M5 13v8h14v-8"/><path d="M10 21v-5h4v5"/>',
    truck: '<path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3"/>',
    phone2: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
    chat: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/>',
    refresh: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
    package: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
    printer: '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    tag: '<path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><path d="M7 7h.01"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    palette: '<circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2a10 10 0 0 0 0 20c.9 0 1.6-.7 1.6-1.6 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.7-1.6 1.6-1.6H16a6 6 0 0 0 6-6c0-4.9-4.5-8.6-10-8.6z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    windows: '<path fill="currentColor" stroke="none" d="M3 5.5 10.5 4.5v7H3zM11.5 4.3 21 3v8.5h-9.5zM3 12.5h7.5v7L3 18.5zM11.5 12.5H21V21l-9.5-1.3z"/>',
    key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
    send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
    bot: '<rect x="3" y="8" width="18" height="12" rx="3"/><path d="M12 8V4M8 4h8"/><circle cx="8.5" cy="14" r="1.2" fill="currentColor"/><circle cx="15.5" cy="14" r="1.2" fill="currentColor"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5"/>'
  };
  var sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">' +
    Object.keys(ICONS).map(function (k) { return '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + ICONS[k] + '</symbol>'; }).join('') + '</svg>';
  document.body.insertAdjacentHTML('afterbegin', sprite);
  function icon(name, cls) { return '<svg class="i ' + (cls || '') + '" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; }
  window.nexaIcon = icon;
  // <i data-i="name"></i> placeholders in the HTML become icons
  document.querySelectorAll('[data-i]').forEach(function (el) { el.outerHTML = icon(el.getAttribute('data-i'), el.className); });

  function wa(text) { return 'https://wa.me/' + D.whatsapp + (text ? '?text=' + encodeURIComponent(text) : ''); }
  window.nexaWa = wa;
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var page = document.body.getAttribute('data-page') || '';

  /* ---------- Header ---------- */
  var navLinks = [
    ['index.html', 'الرئيسية', 'home'],
    ['bexa.html', 'Bexa POS', 'bexa'],
    ['foodexa.html', 'Foodexa', 'foodexa'],
    ['storexa.html', 'Storexa', 'storexa'],
    ['videos.html', 'الفيديوهات', 'videos'],
    ['index.html#about', 'من نحن', 'about']
  ];
  var header = document.getElementById('site-header');
  if (header) {
    header.className = 'site-header';
    header.innerHTML =
      '<div class="container">' +
        '<a class="logo" href="index.html" aria-label="Nexa Solutions — الرئيسية"><img src="assets/img/brand/nexa.svg" alt="" width="40" height="40"><span>Nexa Solutions<small>حلول برمجية لإدارة أعمالك</small></span></a>' +
        '<nav class="nav" aria-label="القائمة الرئيسية">' + navLinks.map(function (l) {
          return '<a href="' + l[0] + '"' + (l[2] === page ? ' class="active" aria-current="page"' : '') + '>' + l[1] + '</a>';
        }).join('') + '</nav>' +
        '<div class="header-cta"><a class="btn btn-lime btn-sm" href="index.html#contact">' + icon('chat') + 'تواصل معنا</a></div>' +
        '<button class="menu-btn" type="button" aria-label="فتح القائمة" aria-expanded="false" aria-controls="mobile-nav">' + icon('menu') + '</button>' +
      '</div>';
    var mobile = document.createElement('div');
    mobile.className = 'mobile-nav'; mobile.id = 'mobile-nav';
    mobile.innerHTML =
      '<a href="index.html">الرئيسية</a>' +
      Object.keys(P).map(function (k) { return '<a href="' + P[k].page + '"><img src="' + P[k].logo + '" alt="">' + P[k].name + '</a>'; }).join('') +
      '<hr><a href="videos.html">' + icon('play') + 'الفيديوهات والشروحات</a>' +
      '<a href="index.html#customers">' + icon('users') + 'عملاؤنا</a>' +
      '<a href="index.html#about">' + icon('heart') + 'من نحن</a>' +
      '<a class="btn btn-wa btn-block" href="' + wa('مرحباً Nexa Solutions، أريد الاستفسار عن منتجاتكم') + '" target="_blank" rel="noopener">' + icon('whatsapp') + 'كلمنا على واتساب</a>' +
      '<a class="btn btn-ghost btn-block" href="tel:' + D.phone + '">' + icon('phone') + D.phone + '</a>';
    header.after(mobile);
    var btn = header.querySelector('.menu-btn');
    function toggle(open) {
      mobile.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.innerHTML = icon(open ? 'x' : 'menu');
    }
    btn.addEventListener('click', function () { toggle(!mobile.classList.contains('open')); });
    mobile.addEventListener('click', function (e) { if (e.target.closest('a')) toggle(false); });
    window.addEventListener('scroll', function () { header.classList.toggle('scrolled', window.scrollY > 8); }, { passive: true });
  }

  /* ---------- Footer ---------- */
  var footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML =
      '<div class="container"><div class="footer-grid">' +
        '<div><a class="logo" href="index.html"><img src="assets/img/brand/nexa.svg" alt="" width="40" height="40"><span>Nexa Solutions<small>حلول برمجية لإدارة أعمالك</small></span></a>' +
        '<p>شركة مصرية تطوّر برامج عربية بالكامل لإدارة المحلات والمطاعم والمتاجر الإلكترونية — من الكاشير حتى البيع أونلاين.</p>' +
        '<div class="social"><a href="' + wa() + '" target="_blank" rel="noopener" aria-label="واتساب">' + icon('whatsapp') + '</a>' +
        '<a href="' + D.facebook + '" target="_blank" rel="noopener" aria-label="فيسبوك">' + icon('facebook') + '</a>' +
        '<a href="tel:' + D.phone + '" aria-label="اتصل بنا">' + icon('phone') + '</a></div></div>' +
        '<div><h4>منتجاتنا</h4><ul>' + Object.keys(P).map(function (k) { return '<li><a href="' + P[k].page + '">' + P[k].name + '</a></li>'; }).join('') + '</ul></div>' +
        '<div><h4>روابط</h4><ul><li><a href="videos.html">الفيديوهات والشروحات</a></li><li><a href="index.html#customers">عملاؤنا</a></li><li><a href="index.html#about">من نحن</a></li><li><a href="index.html#faq">الأسئلة الشائعة</a></li></ul></div>' +
        '<div><h4>تواصل معنا</h4><ul><li><a href="tel:' + D.phone + '" dir="ltr">' + D.phone + '</a></li>' +
        (D.email ? '<li><a href="mailto:' + D.email + '">' + D.email + '</a></li>' : '') +
        '<li>' + D.address + '</li><li><a href="' + wa() + '" target="_blank" rel="noopener">واتساب</a></li></ul></div>' +
      '</div><div class="footer-bottom"><span>© ' + new Date().getFullYear() + ' Nexa Solutions. جميع الحقوق محفوظة.</span><span>صُنع في مصر 🇪🇬</span></div></div>';
  }

  /* floating WhatsApp */
  var waText = { bexa: 'مرحباً، أريد الاستفسار عن برنامج Bexa POS', foodexa: 'مرحباً، أريد الاستفسار عن نظام Foodexa للمطاعم', storexa: 'مرحباً، أريد عمل متجر إلكتروني على Storexa' }[page] || 'مرحباً Nexa Solutions، أريد الاستفسار عن منتجاتكم';
  document.body.insertAdjacentHTML('beforeend', '<a class="wa-float" href="' + wa(waText) + '" target="_blank" rel="noopener" aria-label="تواصل معنا على واتساب">' + icon('whatsapp') + '</a>');
  document.querySelectorAll('[data-wa]').forEach(function (a) { a.href = wa(a.getAttribute('data-wa') || waText); a.target = '_blank'; a.rel = 'noopener'; });
  document.querySelectorAll('[data-demo]').forEach(function (a) {
    var url = (D.storexaDemos || {})[a.getAttribute('data-demo')];
    if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; } else { a.remove(); }
  });
  document.querySelectorAll('[data-phone]').forEach(function (a) { a.href = 'tel:' + D.phone; if (!a.textContent.trim()) a.textContent = D.phone; });

  /* ---------- Free-trial download cards: <div data-trial="bexa" [data-compact]> ---------- */
  document.querySelectorAll('[data-trial]').forEach(function (box) {
    var key = box.getAttribute('data-trial'), p = P[key], t = p && p.trial;
    if (!t) { box.remove(); return; }
    var compact = box.hasAttribute('data-compact');
    var login = '<div class="trial-login"><div class="trial-login-head">' + icon('key') + 'بيانات الدخول التجريبية</div>' +
      t.login.map(function (r) {
        var inParens = r[1].match(/\(([^)]+)\)/);          // 'المدير العام (admin)' → copies 'admin'
        var copyValue = inParens ? inParens[1] : r[1];
        return '<div class="cred"><span>' + esc(r[0]) + '</span><code>' + esc(r[1]) + '</code>' +
          '<button type="button" class="copy" data-copy="' + esc(copyValue) + '" aria-label="نسخ ' + esc(r[0]) + '">' + icon('copy') + '</button></div>';
      }).join('') + '</div>';
    box.className = 'trial-card t-' + key + (compact ? ' compact' : '') + ' reveal';
    box.innerHTML =
      '<div class="trial-top"><img src="' + esc(p.logo) + '" alt="" width="56" height="56"><div><h3>نسخة ' + esc(p.name) + ' التجريبية</h3>' +
        '<div class="trial-meta"><span>' + icon('windows') + 'Windows 10 / 11 (64-bit)</span><span>' + icon('gift') + esc(t.days) + ' أيام مجاناً بكل المميزات</span><span dir="ltr">v' + esc(t.version) + '</span></div></div></div>' +
      (t.requires ? '<p class="trial-req">' + icon('shield') + esc(t.requires) + '</p>' : '') +
      login +
      (compact ? '' : '<ol class="trial-steps">' + t.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>' +
        '<p class="trial-note">لو ظهرت رسالة حماية من Windows، اضغط «More info» ثم «Run anyway». بعد انتهاء التجربة تقدر تفعّل البرنامج وتكمل بنفس بياناتك.</p>') +
      '<div class="trial-actions"><a class="btn btn-primary" href="' + esc(t.url) + '" target="_blank" rel="noopener">' + icon('download') + 'تحميل النسخة التجريبية</a>' +
      (compact ? '<a class="btn btn-ghost" href="' + esc(p.page) + '#download">خطوات التثبيت</a>'
               : '<a class="btn btn-ghost" href="' + wa('مرحباً، محتاج مساعدة في تثبيت النسخة التجريبية من ' + p.name) + '" target="_blank" rel="noopener">' + icon('whatsapp') + 'محتاج مساعدة في التثبيت؟</a>') +
      '</div>';
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy]'); if (!b) return;
    var text = b.getAttribute('data-copy');
    var done = function () { b.classList.add('ok'); b.innerHTML = icon('check'); setTimeout(function () { b.classList.remove('ok'); b.innerHTML = icon('copy'); }, 1500); };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done); else done();
  });

  /* ---------- Full feature catalog: <div data-features="bexa"> (data in features.js) ---------- */
  var TAGS = { new: 'جديد', soon: 'قريباً' };
  var norm = function (s) { return String(s).toLowerCase().replace(/[ً-ْـ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي'); };
  window.nexaNorm = norm;
  document.querySelectorAll('[data-features]').forEach(function (box) {
    var groups = (window.NEXA_FEATURES || {})[box.getAttribute('data-features')];
    if (!groups) { box.remove(); return; }
    var total = groups.reduce(function (n, g) { return n + g.items.length; }, 0);
    var SHOW = 5;
    var used = {}; groups.forEach(function (g) { g.items.forEach(function (it) { if (it[2]) used[it[2]] = 1; }); });
    box.className = 'fx';
    box.innerHTML =
      '<div class="fx-bar reveal"><label class="fx-search">' + icon('search') + '<input type="search" placeholder="ابحث عن ميزة… (مثلاً: باركود، واتساب، فروع)" aria-label="ابحث في المميزات"></label>' +
        '<span class="fx-count"><b>' + new Intl.NumberFormat('ar-EG').format(total) + '</b> ميزة في ' + new Intl.NumberFormat('ar-EG').format(groups.length) + ' أقسام</span>' +
        (Object.keys(used).length ? '<span class="fx-legend">' + Object.keys(used).map(function (t) { return '<em class="tag ' + t + '">' + TAGS[t] + '</em>'; }).join('') + '</span>' : '') +
      '</div>' +
      '<div class="fx-grid">' + groups.map(function (g, gi) {
        return '<div class="fx-group reveal" data-g="' + gi + '"><div class="fx-head"><span class="ico">' + icon(g.icon || 'check') + '</span><h3>' + esc(g.title) + '</h3><small>' + g.items.length + '</small></div>' +
          '<ul>' + g.items.map(function (it, ii) {
            return '<li' + (ii >= SHOW ? ' class="more"' : '') + ' data-s="' + esc(norm(it[0] + ' ' + it[1] + ' ' + g.title)) + '">' + icon('check') + '<div><b>' + esc(it[0]) + '</b>' + (it[2] ? ' <em class="tag ' + it[2] + '">' + TAGS[it[2]] + '</em>' : '') + '<span>' + esc(it[1]) + '</span></div></li>';
          }).join('') + '</ul>' +
          (g.items.length > SHOW ? '<button type="button" class="fx-more">عرض الكل (+' + (g.items.length - SHOW) + ')</button>' : '') + '</div>';
      }).join('') + '</div><p class="fx-empty" hidden>مش لاقي الميزة اللي بتدوّر عليها؟ <a href="' + wa('مرحباً، عندي سؤال عن ميزة في البرنامج') + '" target="_blank" rel="noopener">اسألنا على واتساب</a> أو <a href="#" data-ask="">اسأل المساعد الذكي</a>.</p>';
    box.addEventListener('click', function (e) {
      var b = e.target.closest('.fx-more'); if (!b) return;
      var grp = b.closest('.fx-group'); var open = grp.classList.toggle('open');
      b.textContent = open ? 'عرض أقل' : 'عرض الكل (+' + grp.querySelectorAll('li.more').length + ')';
    });
    var input = box.querySelector('input'), empty = box.querySelector('.fx-empty');
    input.addEventListener('input', function () {
      var q = norm(input.value.trim()).split(/\s+/).filter(Boolean), any = false;
      box.classList.toggle('searching', q.length > 0);
      box.querySelectorAll('.fx-group').forEach(function (grp) {
        var hits = 0;
        grp.querySelectorAll('li').forEach(function (li) {
          var s = li.getAttribute('data-s'), ok = q.every(function (w) { return s.indexOf(w) > -1 || s.indexOf(w.replace(/^ال/, '')) > -1; });
          li.classList.toggle('hit', ok); if (ok) hits++;
        });
        grp.hidden = q.length > 0 && !hits; if (hits) any = true;
      });
      empty.hidden = !q.length || any;
    });
  });

  /* ---------- Share a product: <div data-share="bexa"> ---------- */
  function shareUrl(key) { return (D.siteUrl || location.origin) + '/' + (key || ''); }
  document.querySelectorAll('[data-share]').forEach(function (box) {
    var key = box.getAttribute('data-share'), p = P[key];
    if (!p) { box.remove(); return; }
    var url = shareUrl(key), poster = 'assets/img/share/' + key + '-poster.png';
    var text = p.name + ' — ' + p.tagline + '\nكل التفاصيل والنسخة التجريبية والفيديوهات:';
    box.className = 'share-card t-' + key + ' reveal';
    box.innerHTML =
      '<button type="button" class="share-poster" data-zoom="' + poster + '" data-title="بطاقة ' + esc(p.name) + '"><img src="' + poster + '" alt="بطاقة تعريف ' + esc(p.name) + '" loading="lazy" width="1080" height="1350"></button>' +
      '<div class="share-body"><span class="eyebrow">شارك ' + esc(p.name) + '</span><h2 class="title">ابعت ' + esc(p.name) + ' لأي حد بيسأل</h2>' +
        '<p>صورة واحدة فيها أهم المميزات وخطوات التجربة وكود QR يفتح الصفحة دي. ابعتها على واتساب أو انشرها على فيسبوك — واللي يفتح الرابط يلاقي كل التفاصيل والفيديوهات والتحميل.</p>' +
        '<div class="share-link"><code dir="ltr">' + esc(url.replace(/^https?:\/\//, '')) + '</code><button type="button" class="copy" data-copy="' + esc(url) + '" aria-label="نسخ الرابط">' + icon('copy') + '</button></div>' +
        '<div class="share-actions">' +
          '<a class="btn btn-wa" href="https://wa.me/?text=' + encodeURIComponent(text + '\n' + url) + '" target="_blank" rel="noopener">' + icon('whatsapp') + 'شارك على واتساب</a>' +
          '<a class="btn btn-fb" href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '" target="_blank" rel="noopener">' + icon('facebook') + 'فيسبوك</a>' +
          '<a class="btn btn-ghost" href="' + poster + '" download="' + esc(p.name.replace(/\s+/g, '-')) + '.png">' + icon('image') + 'تحميل الصورة</a>' +
          (navigator.share ? '<button type="button" class="btn btn-ghost" data-native-share>' + icon('share') + 'مشاركة…</button>' : '') +
        '</div></div>';
    var ns = box.querySelector('[data-native-share]');
    if (ns) ns.addEventListener('click', function () {
      var payload = { title: p.name, text: text, url: url };
      fetch(poster).then(function (r) { return r.blob(); }).then(function (b) {
        var f = new File([b], key + '.png', { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [f] })) payload.files = [f];
      }).catch(function () {}).then(function () { navigator.share(payload).catch(function () {}); });
    });
  });

  /* ---------- Modal player ---------- */
  var modal = document.createElement('div');
  modal.className = 'modal'; modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true');
  modal.innerHTML = '<div class="modal-box"><button class="modal-close" type="button" aria-label="إغلاق">' + icon('x') + '</button><div class="modal-media"></div><div class="modal-title"></div></div>';
  document.body.appendChild(modal);
  var mBox = modal.querySelector('.modal-box'), mMedia = modal.querySelector('.modal-media'), mTitle = modal.querySelector('.modal-title'), lastFocus;
  function openModal(html, title, portrait) {
    lastFocus = document.activeElement;
    mMedia.innerHTML = html; mTitle.textContent = title || '';
    mBox.classList.toggle('portrait', !!portrait);
    modal.classList.add('open'); document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close').focus();
  }
  function closeModal() {
    modal.classList.remove('open'); mMedia.innerHTML = ''; document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  modal.addEventListener('click', function (e) { if (e.target === modal || e.target.closest('.modal-close')) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

  function playVideo(v) {
    var html = v.youtube
      ? '<iframe src="https://www.youtube-nocookie.com/embed/' + esc(v.youtube) + '?autoplay=1&rel=0" title="' + esc(v.title) + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>'
      : v.drive
      ? '<iframe src="https://drive.google.com/file/d/' + esc(v.drive) + '/preview" title="' + esc(v.title) + '" allow="autoplay; fullscreen" allowfullscreen></iframe>'
      : '<video src="' + esc(v.src) + '" poster="' + esc(v.poster || '') + '" controls autoplay playsinline></video>';
    openModal(html, v.title, v.portrait);
  }
  // image lightbox: <button data-zoom="img.webp" data-title="...">
  document.addEventListener('click', function (e) {
    var z = e.target.closest('[data-zoom]');
    if (z) { e.preventDefault(); openModal('<img src="' + esc(z.getAttribute('data-zoom')) + '" alt="' + esc(z.getAttribute('data-title') || '') + '">', z.getAttribute('data-title')); }
  });

  /* ---------- Videos ---------- */
  var TYPES = { tutorial: 'شرح', promo: 'فيديو تعريفي' };
  function productName(k) { return P[k] ? P[k].name : 'Nexa Solutions'; }
  function videoCard(v, i) {
    var poster = v.poster || (v.youtube ? 'https://i.ytimg.com/vi/' + v.youtube + '/hqdefault.jpg' : v.drive ? 'https://drive.google.com/thumbnail?id=' + v.drive + '&sz=w640' : '');
    var logo = P[v.product] ? P[v.product].logo : 'assets/img/brand/nexa.svg';
    return '<button class="video-card reveal" type="button" data-video="' + i + '">' +
      '<div class="thumb ' + (v.portrait ? 'portrait ' : '') + 't-' + esc(v.product || 'nexa') + '"><img class="fallback" src="' + esc(logo) + '" alt="">' +
      (poster ? '<img class="poster" src="' + esc(poster) + '" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">' : '') +
      '<div class="play"><span>' + icon('play') + '</span></div>' + (v.duration ? '<span class="dur">' + esc(v.duration) + '</span>' : '') + '</div>' +
      '<div class="meta"><div class="chips"><span class="chip ' + esc(v.product || 'nexa') + '">' + esc(productName(v.product)) + '</span><span class="chip">' + esc(TYPES[v.type] || 'فيديو') + '</span></div>' +
      '<h3>' + esc(v.title) + '</h3>' + (v.desc ? '<p>' + esc(v.desc) + '</p>' : '') + '</div></button>';
  }
  var videos = D.videos || [];
  document.querySelectorAll('[data-videos]').forEach(function (grid) {
    var only = grid.getAttribute('data-videos');     // '', 'bexa', 'foodexa', 'storexa'
    var limit = +grid.getAttribute('data-limit') || 0;
    var filterBar = grid.previousElementSibling && grid.previousElementSibling.classList.contains('filters') ? grid.previousElementSibling : null;
    var state = { product: only || 'all', type: 'all' };
    function render() {
      var list = videos.map(function (v, i) { return [v, i]; }).filter(function (p) {
        return (state.product === 'all' || p[0].product === state.product) && (state.type === 'all' || p[0].type === state.type);
      });
      if (limit) list = list.slice(0, limit);
      grid.innerHTML = list.length ? list.map(function (p) { return videoCard(p[0], p[1]); }).join('')
        : '<div class="empty" style="grid-column:1/-1">لا توجد فيديوهات هنا بعد — قريباً.</div>';
      observe(grid);
    }
    if (filterBar) {
      filterBar.addEventListener('click', function (e) {
        var b = e.target.closest('.filter'); if (!b) return;
        var key = b.getAttribute('data-key'), val = b.getAttribute('data-val');
        state[key] = val;
        filterBar.querySelectorAll('.filter[data-key="' + key + '"]').forEach(function (x) { x.classList.toggle('active', x === b); x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        render();
      });
      var q = new URLSearchParams(location.search).get('product');
      if (q && P[q]) { var fb = filterBar.querySelector('[data-key="product"][data-val="' + q + '"]'); if (fb) fb.click(); return; }
    }
    render();
  });
  document.addEventListener('click', function (e) {
    var c = e.target.closest('[data-video]');
    if (c) playVideo(videos[+c.getAttribute('data-video')]);
  });

  /* ---------- Customers ---------- */
  document.querySelectorAll('[data-customers]').forEach(function (grid) {
    var list = D.customers || [];
    var wrap = grid.closest('[data-customers-wrap]');
    if (!list.length) { if (wrap) wrap.classList.add('no-customers'); grid.remove(); return; }
    var only = grid.getAttribute('data-customers');   // '' = all, or a product key
    if (only) list = list.filter(function (c) { return [].concat(c.product).indexOf(only) > -1; });
    var counter = document.querySelector('[data-customers-count]');
    if (counter) counter.textContent = new Intl.NumberFormat('ar-EG').format(list.length);
    grid.innerHTML = list.map(function (c, i) {
      var words = (c.name || '?').trim().split(/\s+/).filter(function (w) { return !/^(ال)?(مطعم|سوبر|ماركت|محل)$/.test(w); });
      var initials = (words[0] || c.name || '?').replace(/^ال/, '').charAt(0).toUpperCase();
      var products = [].concat(c.product || []).filter(function (k) { return P[k]; });
      var tint = P[products[0]] ? P[products[0]].color : 'nexa';
      var inner = '<div class="logo-box">' + (c.logo ? '<img src="' + esc(c.logo) + '" alt="شعار ' + esc(c.name) + '" loading="lazy">' : '<span class="initials t-' + tint + '">' + esc(initials) + '</span>') + '</div>' +
        '<div><h3>' + esc(c.name) + '</h3><div class="where">' + esc([c.type, c.city].filter(Boolean).join(' · ')) + '</div></div>' +
        '<div class="chips">' + products.map(function (k) { return '<span class="chip ' + k + '">' + esc(P[k].name) + '</span>'; }).join('') + '</div>' +
        (c.quote ? '<blockquote>' + esc(c.quote) + '</blockquote>' : '');
      return c.link ? '<a class="customer reveal" href="' + esc(c.link) + '" target="_blank" rel="noopener">' + inner + '</a>' : '<div class="customer reveal">' + inner + '</div>';
    }).join('');
  });

  /* ---------- Contact form → WhatsApp ---------- */
  var form = document.getElementById('contact-form');
  if (form) {
    var pre = new URLSearchParams(location.search).get('product');
    if (pre && form.product) form.product.value = pre;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements;
      if (!f.name.value.trim() || !f.phone.value.trim()) { (f.name.value.trim() ? f.phone : f.name).focus(); return; }
      var lines = ['مرحباً Nexa Solutions 👋', 'الاسم: ' + f.name.value.trim()];
      if (f.business.value.trim()) lines.push('النشاط / الشركة: ' + f.business.value.trim());
      lines.push('الهاتف: ' + f.phone.value.trim());
      if (f.product.value) lines.push('المنتج: ' + f.product.options[f.product.selectedIndex].text);
      if (f.need.value) lines.push('الطلب: ' + f.need.options[f.need.selectedIndex].text);
      if (f.message.value.trim()) lines.push('', f.message.value.trim());
      window.open(wa(lines.join('\n')), '_blank', 'noopener');
    });
  }

  /* ---------- Sub-nav highlight + reveal ---------- */
  var subnav = document.querySelector('.subnav');
  if (subnav && 'IntersectionObserver' in window) {
    var links = subnav.querySelectorAll('a[href^="#"]');
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (a) { var s = document.querySelector(a.getAttribute('href')); if (s) so.observe(s); });
  }

  /* ---------- In-page links: land exactly on the section ----------
     Images/videos above the target load while scrolling and push it down,
     so after the smooth scroll we re-check and correct until it settles. */
  function topOffset() {
    var h = document.querySelector('.site-header, header');
    return (h ? h.getBoundingClientRect().height : 72) + (subnav ? subnav.getBoundingClientRect().height : 0) + 8;
  }
  var jumpId = 0;
  ['wheel', 'touchstart', 'keydown'].forEach(function (ev) { window.addEventListener(ev, function () { jumpId++; }, { passive: true }); });
  function goTo(el, smooth) {
    var tries = 0, id = ++jumpId;
    var go = function (beh) { window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + window.pageYOffset - topOffset()), behavior: beh }); };
    go(smooth ? 'smooth' : 'auto');
    (function fix() {
      setTimeout(function () {
        if (id !== jumpId) return;
        var off = el.getBoundingClientRect().top - topOffset();
        if (Math.abs(off) > 4) go('auto');
        if (++tries < 8) fix();
      }, tries ? 250 : 900);
    })();
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href').length < 2) return;
    var el = document.getElementById(a.getAttribute('href').slice(1));
    if (!el) return;
    e.preventDefault();
    history.pushState(null, '', a.getAttribute('href'));
    goTo(el, true);
  });
  if (location.hash.length > 1) {
    var hashEl = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (hashEl) window.addEventListener('load', function () { goTo(hashEl, false); });
  }

  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px' }) : null;
  function observe(root) {
    (root || document).querySelectorAll('.reveal:not(.in)').forEach(function (el) { if (io) io.observe(el); else el.classList.add('in'); });
  }
  observe(document);
})();
