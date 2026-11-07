/* =========================================================================
   مساعد Nexa الذكي — chat widget.
   1) Sends the conversation to /api/chat (functions/api/chat.js → Claude),
      which answers from knowledge/kb.md.
   2) If that endpoint isn't available (local preview, no API key, busy), it
      answers offline by searching knowledge/kb.json — the same knowledge base.
   ========================================================================= */
(function () {
  'use strict';
  var icon = window.nexaIcon, wa = window.nexaWa;
  var norm = window.nexaNorm || function (s) { return String(s).toLowerCase(); };
  if (!icon || !wa) return;
  var page = document.body.getAttribute('data-page') || 'home';

  var SUGGEST = {
    home: ['إيه الفرق بين Bexa وFoodexa وStorexa؟', 'أنهي برنامج يناسب محل ملابس؟', 'إزاي أحمّل النسخة التجريبية؟', 'البرامج بتشتغل من غير إنترنت؟'],
    bexa: ['أسعار باقات Bexa كام؟', 'Bexa بيدعم المقاسات والألوان؟', 'إزاي أحمّل Bexa وأدخل عليه؟', 'ينفع أربط أكتر من فرع؟'],
    foodexa: ['Foodexa فيه منيو QR؟', 'إزاي أثبّت Foodexa؟', 'تطبيق الويتر بيعمل إيه؟', 'سعر Foodexa كام؟'],
    storexa: ['أسعار Storexa كام؟', 'إزاي أقلل الطلبات الوهمية؟', 'المتجر بيدعم InstaPay؟', 'أبدأ متجري إزاي؟'],
    videos: ['فين دروس شرح Bexa؟', 'إزاي أحمّل النسخة التجريبية؟', 'أنهي برنامج يناسب مطعم؟', 'إزاي أكلم الدعم؟']
  };
  var suggestions = SUGGEST[page] || SUGGEST.home;
  var STORE = 'nexa-chat-v1';
  var history = [];
  try { history = JSON.parse(sessionStorage.getItem(STORE) || '[]'); } catch (e) { history = []; }
  var online = true, busy = false;

  /* ---------- UI ---------- */
  var btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'ai-fab'; btn.setAttribute('aria-label', 'اسأل مساعد Nexa الذكي'); btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = icon('sparkles') + '<span>اسأل المساعد</span>';
  var panel = document.createElement('section');
  panel.className = 'ai-panel'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'مساعد Nexa الذكي'); panel.hidden = true;
  panel.innerHTML =
    '<header class="ai-head"><span class="ai-avatar">' + icon('sparkles') + '</span><div><b>مساعد Nexa الذكي</b><small>بيجاوب من معلومات منتجاتنا</small></div>' +
      '<button type="button" class="ai-reset" aria-label="محادثة جديدة" title="محادثة جديدة">' + icon('refresh') + '</button>' +
      '<button type="button" class="ai-close" aria-label="إغلاق">' + icon('x') + '</button></header>' +
    '<div class="ai-log" aria-live="polite"></div>' +
    '<form class="ai-form"><textarea rows="1" maxlength="1000" placeholder="اكتب سؤالك هنا…" aria-label="سؤالك"></textarea>' +
      '<button type="submit" aria-label="إرسال">' + icon('send') + '</button></form>' +
    '<p class="ai-foot">المساعد ممكن يغلط — للتأكيد <a href="' + wa('مرحباً، عندي استفسار') + '" target="_blank" rel="noopener">كلّم فريقنا على واتساب</a></p>';
  document.body.appendChild(btn); document.body.appendChild(panel);
  var log = panel.querySelector('.ai-log'), form = panel.querySelector('.ai-form'), input = form.querySelector('textarea');

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  // tiny, safe markdown: **bold**, links, bullet/numbered lists, line breaks
  function md(text) {
    var lines = esc(text).split('\n'), html = '', list = null;
    function inline(s) {
      return s.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
        .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
        .replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, function (m, pre, url) {
          var label = url.replace(/^https?:\/\/(www\.)?/, '').replace(/^wa\.me\/\d+.*/, 'واتساب').slice(0, 42);
          return pre + '<a href="' + url + '" target="_blank" rel="noopener" dir="ltr">' + label + '</a>';
        });
    }
    lines.forEach(function (l) {
      var m = l.match(/^\s*(?:[-•*]|\d+[.)])\s+(.*)/);
      if (m) { if (!list) { list = /^\s*\d/.test(l) ? 'ol' : 'ul'; html += '<' + list + '>'; } html += '<li>' + inline(m[1]) + '</li>'; return; }
      if (list) { html += '</' + list + '>'; list = null; }
      l = l.replace(/^#+\s*/, '');
      if (l.trim()) html += '<p>' + inline(l) + '</p>';
    });
    if (list) html += '</' + list + '>';
    return html;
  }
  function bubble(role, text, extra) {
    var d = document.createElement('div');
    d.className = 'ai-msg ' + role;
    d.innerHTML = role === 'user' ? '<p>' + esc(text) + '</p>' : md(text) + (extra || '');
    log.appendChild(d); log.scrollTop = log.scrollHeight;
    return d;
  }
  function welcome() {
    log.innerHTML = '';
    bubble('assistant', 'أهلاً بيك 👋 أنا مساعد Nexa. اسألني عن **Bexa POS** أو **Foodexa** أو **Storexa**: المميزات، الأسعار، التحميل والتجربة، أو أنهي برنامج يناسب نشاطك.');
    var chips = document.createElement('div'); chips.className = 'ai-chips';
    chips.innerHTML = suggestions.map(function (q) { return '<button type="button">' + esc(q) + '</button>'; }).join('');
    log.appendChild(chips);
  }
  function restore() {
    welcome();
    history.forEach(function (m) { bubble(m.role, m.content); });
  }
  function save() { try { sessionStorage.setItem(STORE, JSON.stringify(history.slice(-12))); } catch (e) { /* private mode */ } }

  function open(state) {
    panel.hidden = !state; btn.setAttribute('aria-expanded', state ? 'true' : 'false');
    document.body.classList.toggle('ai-open', state);
    if (state) { if (!log.children.length) restore(); setTimeout(function () { input.focus(); }, 50); }
  }
  btn.addEventListener('click', function () { open(panel.hidden); });
  panel.querySelector('.ai-close').addEventListener('click', function () { open(false); btn.focus(); });
  panel.querySelector('.ai-reset').addEventListener('click', function () { history = []; save(); welcome(); input.focus(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) open(false); });
  log.addEventListener('click', function (e) { var c = e.target.closest('.ai-chips button'); if (c) ask(c.textContent); });
  form.addEventListener('submit', function (e) { e.preventDefault(); ask(input.value); });
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(input.value); } });
  input.addEventListener('input', function () { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 120) + 'px'; });
  // any link/button with data-ask="question" opens the assistant with that question
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-ask]'); if (!a) return;
    e.preventDefault(); open(true); if (a.getAttribute('data-ask')) ask(a.getAttribute('data-ask'));
  });

  /* ---------- Offline answers from knowledge/kb.json ---------- */
  var kb = null;
  function loadKb() {
    if (kb) return Promise.resolve(kb);
    return fetch('knowledge/kb.json').then(function (r) { return r.json(); }).then(function (list) {
      kb = list.map(function (c) { return { h: c.h, p: c.p || '', t: c.t, nh: norm(c.h), np: norm(c.p || ''), nt: norm(c.t) }; });
      return kb;
    });
  }
  var STOP = ['ايه', 'إيه', 'هل', 'كام', 'ازاي', 'إزاي', 'في', 'من', 'على', 'عن', 'الى', 'الي', 'او', 'و', 'يا', 'انا', 'عايز', 'محتاج', 'ممكن', 'ده', 'دي', 'بتاع', 'بيدعم', 'فيه', 'مع', 'لو', 'اللي', 'هو', 'هي', 'what', 'how', 'is', 'the', 'a', 'do', 'does', 'can', 'i'];
  var SYN = { 'سعر': ['سعر', 'اسعار'], 'اسعار': ['سعر', 'اسعار'], 'باقات': ['اسعار', 'باقه'], 'باقه': ['اسعار', 'باقه'], 'بكام': ['اسعار'], 'تكلفه': ['اسعار'], 'اشتراك': ['اسعار', 'اشتراك'], 'احمل': ['تحميل', 'حمل', 'تثبيت'], 'تحميل': ['تحميل', 'تثبيت'], 'اثبت': ['تثبيت', 'ثبت'], 'نت': ['انترنت'], 'مطعم': ['مطعم', 'foodexa'], 'كافيه': ['مطاعم', 'foodexa'], 'محل': ['محل', 'bexa'], 'ملابس': ['مقاسات', 'ملابس'], 'متجر': ['متجر', 'storexa'], 'اونلاين': ['اونلاين', 'storexa'] };
  function localAnswer(q) {
    return loadKb().then(function (list) {
      var words = norm(q).replace(/[؟?!.,،:]/g, ' ').split(/\s+/).map(function (w) { return w.replace(/^(و|ف|ب)?ال/, ''); })
        .filter(function (w) { return w.length > 1 && STOP.indexOf(w) < 0; });
      var terms = [];
      words.forEach(function (w) { terms.push(w); (SYN[w] || []).forEach(function (s) { terms.push(norm(s)); }); });
      var product = /bexa|بيكسا/.test(norm(q)) ? 'bexa' : /foodexa|فوديكسا|مطعم|كافيه/.test(norm(q)) ? 'foodexa' : /storexa|ستوريكسا|متجر|اونلاين/.test(norm(q)) ? 'storexa' : '';
      var scored = list.map(function (c) {
        var s = 0;
        terms.forEach(function (t) { if (c.nh.indexOf(t) > -1) s += 4; else if (c.np.indexOf(t) > -1) s += 2; if (c.nt.indexOf(t) > -1) s += 1; });
        if (product) s += (c.np + ' ' + c.nh).indexOf(product) > -1 ? 3 : (c.np + c.nh).match(/bexa|foodexa|storexa/) ? -3 : 0;
        if (/^(نص |الفيديوهات|من عملائنا)/.test(c.p)) s -= 2;
        return { c: c, s: s };
      }).filter(function (x) { return x.s > 3; }).sort(function (a, b) { return b.s - a.s; });
      if (!scored.length) return null;
      var top = scored.slice(0, 1);
      if (scored[1] && scored[1].s >= top[0].s * 0.8 && scored[1].c.p !== top[0].c.p) top.push(scored[1]);
      return top.map(function (x) {
        var lines = x.c.t.split('\n');
        // price sections: keep plan names, prices and notes, skip the long feature bullets
        if (/^اسعار/.test(x.c.nh)) lines = lines.filter(function (l) { return !/^- /.test(l) || /ج\.م|٪|%/.test(l) || l.length < 24; });
        var title = x.c.h === x.c.p || !x.c.p || /^نص /.test(x.c.p) || /Bexa|Foodexa|Storexa/.test(x.c.h) ? x.c.h : x.c.p + ' — ' + x.c.h;
        return '**' + title + '**\n' + lines.slice(0, 14).join('\n');
      }).join('\n\n');
    });
  }

  /* ---------- Ask ---------- */
  function ask(text) {
    text = String(text || '').trim();
    if (!text || busy) return;
    busy = true; input.value = ''; input.style.height = 'auto';
    var chips = log.querySelector('.ai-chips'); if (chips) chips.remove();
    bubble('user', text);
    history.push({ role: 'user', content: text }); save();
    var typing = bubble('assistant typing', '');
    typing.innerHTML = '<span></span><span></span><span></span>';

    var handoff = '<a class="ai-handoff" href="' + wa('مرحباً، سألت المساعد على الموقع: ' + text) + '" target="_blank" rel="noopener">' + icon('whatsapp') + 'اسأل فريقنا على واتساب</a>';
    function finish(answer, offline) {
      typing.remove();
      if (!answer) {
        answer = 'مش لاقي إجابة أكيدة للسؤال ده في معلومات الموقع. فريقنا هيرد عليك بسرعة على واتساب 👇';
        bubble('assistant', answer, handoff);
      } else {
        bubble('assistant', answer, offline ? '<p class="ai-note">إجابة من معلومات الموقع.</p>' + handoff : '');
      }
      history.push({ role: 'assistant', content: answer }); save();
      busy = false; input.focus();
    }
    function offline() { localAnswer(text).then(function (a) { finish(a, true); }, function () { finish(null, true); }); }

    if (!online) { offline(); return; }
    fetch('/api/chat', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ messages: history.slice(-12), page: page }) })
      .then(function (r) {
        if (r.status === 404 || r.status === 405 || r.status === 503 || r.status === 501) { online = false; throw 0; }
        if (!r.ok) throw 0;
        return r.json();
      })
      .then(function (d) { if (!d || !d.answer) throw 0; finish(d.answer, false); })
      .catch(offline);
  }
})();
