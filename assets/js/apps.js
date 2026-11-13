/* =========================================================================
   Mobile apps of each product — content + renderer for <div data-apps="bexa">.
   Edit the text here; screens live in assets/img/apps (made by tools/app-shots.mjs
   from the real phone screenshots in the product folders).
   Each "panel" is one tab: a phone showing its screens + what it does.
   ========================================================================= */
window.NEXA_APPS = {
  bexa: {
    trust: [
      ['phone2', 'أندرويد وآيفون', 'بيتثبّت كتطبيق على الشاشة الرئيسية — من غير متجر تطبيقات'],
      ['building', 'كل فروعك في تطبيق واحد', 'إجمالي كل الفروع، وكل فرع بحالته وأرقامه'],
      ['shield', 'آمن ومشفّر', 'الموبايل بيتصل بالمحل عن طريق شبكة خاصة مشفّرة، وكل موبايل بيتفعّل لوحده'],
      ['wifioff', 'شغال حتى لو الفرع فصل', 'آخر بيانات بتفضل قدامك، وبتتحدّث أول ما الاتصال يرجع']
    ],
    note: 'تقدر تشغّل أو تقفل البيع وأدوات المخزون وإدارة الأصناف من الموبايل في أي وقت من إعدادات جهاز الكاشير.',
    panels: [
      {
        key: 'follow', label: 'تابع محلّك', icon: 'chart',
        title: 'كل أرقام محلّك لحظة بلحظة',
        sub: 'المبيعات والأرباح والمخزون والنقدية — اليوم، أمس، 7 أيام، الشهر، أو أي فترة تختارها.',
        screens: [
          ['bexa-owner-home', 'الرئيسية'],
          ['bexa-owner-chart', 'المبيعات باليوم'],
          ['bexa-owner-profit', 'الأرباح']
        ],
        points: [
          'صافي المبيعات والربح ومتوسط الفاتورة، ومقارنة بالفترة اللي قبلها',
          'من المبيعات للربح: تكلفة البضاعة، والمصروفات حسب البند، والربح حسب القسم',
          'المبيعات بالساعة وباليوم، والأصناف الأكثر مبيعاً',
          'تنبيهات الذكاء التحليلي: أصناف محتاجة طلب، والمتوقع بيعه النهارده',
          'الفواتير بالتفصيل، وأداء الكاشيرية، والورديات، والنقدية في الأدراج',
          'المديونيات والمشتريات، وعمولات البائعين، وطلبات المتجر الإلكتروني'
        ]
      },
      {
        key: 'sell', label: 'بيع من الموبايل', icon: 'store',
        title: 'فاتورة كاملة من موبايلك',
        sub: 'لما الكاشير مشغول، أو وإنت في المخزن أو في معرض — موبايلك بقى نقطة بيع.',
        screens: [
          ['bexa-owner-sell', 'السلة'],
          ['bexa-owner-sell-done', 'تم البيع']
        ],
        points: [
          'امسح باركود الصنف بكاميرا الموبايل، أو ابحث بالاسم أو الكود',
          'سلة ودفع: نقدي، بطاقة، محفظة، إنستاباي، أو تحويل',
          'الفاتورة بتتسجّل على جهاز المحل بنفس الأسعار والمخزون',
          'اطبعها على طابعة المحل بضغطة، وابدأ فاتورة جديدة'
        ]
      },
      {
        key: 'stock', label: 'المخزون بالكاميرا', icon: 'package',
        title: 'جرد واستلام وأسعار… بالكاميرا',
        sub: 'وجّه كاميرا الموبايل على الباركود — من غير أجهزة إضافية ولا ورق.',
        screens: [
          ['bexa-owner-stock', 'المخزون'],
          ['bexa-owner-check', 'فحص سعر'],
          ['bexa-owner-count', 'جرد'],
          ['bexa-owner-receive', 'استلام بضاعة']
        ],
        points: [
          'قيمة المخزون بالتكلفة وبسعر البيع، والأصناف القليلة والنافدة والراكدة',
          'فحص سعر: السعر والتكلفة وهامش الربح والرصيد في ثانية',
          'غيّر السعر واطبع ملصق جديد على طول',
          'جرد بالكاميرا: امسح كل قطعة، والفروقات بتظهر قبل ما تعتمد',
          'استلام بضاعة المورد بالمسح، وفاتورة الشراء بتتعمل لوحدها',
          'ضيف أصناف جديدة أو عدّل القديمة من الموبايل'
        ]
      }
    ]
  },

  foodexa: {
    flow: [
      ['qr', 'الزبون يطلب', 'من QR الطاولة'],
      ['check', 'الكاشير يوافق', 'بضغطة واحدة'],
      ['printer', 'المطبخ يطبع', 'تذكرة الطلب فوراً'],
      ['bell', 'الويتر يقدّم', 'ويرد على النداءات'],
      ['chart', 'المالك يتابع', 'كله لحظة بلحظة']
    ],
    note: 'كل تطبيق موبايل بيتفعّل على كل موبايل لوحده، ومنيو الزبون من غير تحميل أي حاجة. كلّمنا على واتساب ونبعتلك عرض سعر حسب احتياج مطعمك.',
    panels: [
      {
        key: 'guest', label: 'منيو الزبون (QR)', icon: 'qr',
        title: 'الزبون يطلب بنفسه من الطاولة',
        sub: 'يمسح QR الطاولة ويتصفح المنيو بالصور — من غير ما ينزّل أي تطبيق.',
        chips: ['من غير تحميل', 'أي موبايل'],
        screens: [
          ['foodexa-guest-menu', 'المنيو'],
          ['foodexa-guest-items', 'الأصناف'],
          ['foodexa-guest-options', 'الحجم والإضافات'],
          ['foodexa-guest-cart', 'الطلب'],
          ['foodexa-guest-accepted', 'تم التأكيد']
        ],
        points: [
          'منيو بالصور والأسعار على QR كل طاولة، ودايماً بآخر أسعارك',
          'يختار الحجم والإضافات ويكتب ملاحظة للمطبخ',
          'يبعت طلبه، والكاشير يوافق بضغطة قبل ما يوصل المطبخ',
          '«نداء الويتر» و«طلب الحساب» من الموبايل',
          'يتابع حالة طلبه وكل طلبات طاولته',
          'آمن: كل مسح QR مربوط بالطاولة، والأسعار بتتحسب على الكاشير مش على موبايل الزبون'
        ]
      },
      {
        key: 'waiter', label: 'تطبيق الويتر', icon: 'utensils',
        title: 'الويتر ياخد الطلب ويبعته للمطبخ',
        sub: 'من غير ورق ولا مشاوير للكاشير — الطلب بيتطبع في المطبخ من على الطاولة.',
        chips: ['أندرويد وآيفون', 'دخول بالـ PIN'],
        screens: [
          ['foodexa-waiter-tables', 'الطاولات'],
          ['foodexa-waiter-menu', 'المنيو'],
          ['foodexa-waiter-options', 'الإضافات'],
          ['foodexa-waiter-send', 'إرسال للمطبخ'],
          ['foodexa-waiter-calls', 'النداءات']
        ],
        points: [
          'خريطة الطاولات والصالات بألوان الحالة: فاضية، مشغولة، محجوزة',
          'ياخد الطلب: الحجم والإضافات وملاحظة للمطبخ على كل صنف',
          '«إرسال للمطبخ» بيطبع التذكرة في المطبخ فوراً',
          'حساب الطاولة، وطباعته على الكاشير بضغطة',
          'نداءات الزبائن وطلبات QR بتوصله لحظتها',
          'كل ويتر باسمه والـ PIN بتاعه، وطاولاته وطلباته النهارده',
          'بيشتغل جوه المطعم بس، وإنت تقفل أو تشيل أي موبايل في أي وقت'
        ]
      },
      {
        key: 'owner', label: 'تطبيق المالك', icon: 'chart',
        title: 'مطعمك وكل فروعك في جيبك',
        sub: 'تابع كل حاجة من أي مكان — حتى وإنت مسافر.',
        chips: ['كل الفروع', 'للمتابعة بأمان'],
        screens: [
          ['foodexa-owner-home', 'الرئيسية'],
          ['foodexa-owner-branches', 'كل الفروع'],
          ['foodexa-owner-charts', 'المبيعات'],
          ['foodexa-owner-switcher', 'اختيار الفرع']
        ],
        points: [
          'كل الفروع مع بعض، أو كل فرع لوحده',
          'صافي المبيعات وعدد الطلبات ومتوسط الفاتورة — اليوم، أمس، 7 أيام، الشهر، أو أي فترة',
          'الآن في المطعم: الطاولات المشغولة، والطلبات المفتوحة وقيمتها',
          'المبيعات بالساعة، وطرق الدفع، ونوع الطلب: صالة، توصيل، تيك أواي',
          'الورديات والنقدية المتوقعة، وأداء كل ويتر وكاشير',
          'المصروفات، والمخزون الناقص، والخسائر: خصومات، حذف، إلغاء، مرتجعات',
          'للمتابعة بس — التطبيق مايقدرش يعدّل حاجة على الكاشير'
        ]
      }
    ]
  }
};

(function () {
  if (typeof document === 'undefined') return; // read as data by tools/build-knowledge.mjs
  var icon = window.nexaIcon || function () { return ''; };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var src = function (name) { return 'assets/img/apps/' + name + '.webp'; };

  document.querySelectorAll('[data-apps]').forEach(function (box, n) {
    var key = box.getAttribute('data-apps');
    var data = (window.NEXA_APPS || {})[key];
    if (!data) return;
    var id = 'ax-' + key + '-' + n;

    var flow = data.flow ? '<ol class="ax-flow">' + data.flow.map(function (f, i) {
      return '<li><span class="ax-flow-ico">' + icon(f[0]) + '</span><b>' + esc(f[1]) + '</b><small>' + esc(f[2]) + '</small>' + (i < data.flow.length - 1 ? '<span class="ax-flow-arrow" aria-hidden="true">' + icon('arrow') + '</span>' : '') + '</li>';
    }).join('') + '</ol>' : '';

    var tabs = '<div class="ax-tabs" role="tablist" aria-label="اختار">' + data.panels.map(function (p, i) {
      return '<button type="button" role="tab" id="' + id + '-tab-' + i + '" aria-controls="' + id + '-panel-' + i + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" class="ax-tab">' +
        icon(p.icon) + '<span>' + esc(p.label) + '</span>' + '</button>';
    }).join('') + '</div>';

    var panels = data.panels.map(function (p, i) {
      var shots = p.screens.map(function (s, j) {
        return '<img src="' + src(s[0]) + '" alt="' + esc(p.label + ' — ' + s[1]) + '" width="480" height="1039" loading="lazy" decoding="async" class="' + (j === 0 ? 'on' : '') + '">';
      }).join('');
      var dots = p.screens.length > 1 ? '<div class="ax-dots">' + p.screens.map(function (s, j) {
        return '<button type="button" class="ax-dot' + (j === 0 ? ' on' : '') + '" data-shot="' + j + '" aria-label="' + esc(s[1]) + '"><span>' + esc(s[1]) + '</span></button>';
      }).join('') + '</div>' : '';
      var back = p.screens[1] ? '<div class="ax-phone ax-phone--back" aria-hidden="true"><img src="' + src(p.screens[1][0]) + '" alt="" loading="lazy" decoding="async"></div>' : '';
      return '<div class="ax-panel" role="tabpanel" id="' + id + '-panel-' + i + '" aria-labelledby="' + id + '-tab-' + i + '"' + (i === 0 ? '' : ' hidden') + '>' +
        '<div class="ax-stage">' + back +
          '<div class="ax-phone"><div class="ax-screen">' + shots + '</div></div>' + dots +
        '</div>' +
        '<div class="ax-copy">' +
          '<div class="ax-head"><span class="ax-ico">' + icon(p.icon) + '</span><div><h3>' + esc(p.title) + '</h3><p>' + esc(p.sub) + '</p></div></div>' +
          (p.chips ? '<div class="ax-chips">' + p.chips.map(function (c) { return '<span>' + esc(c) + '</span>'; }).join('') + '</div>' : '') +
          '<ul class="ax-points">' + p.points.map(function (t) { return '<li>' + icon('check') + '<span>' + esc(t) + '</span></li>'; }).join('') + '</ul>' +
        '</div>' +
      '</div>';
    }).join('');

    var trust = data.trust ? '<div class="ax-trust">' + data.trust.map(function (t) {
      return '<div class="ax-trust-item"><span class="ax-ico">' + icon(t[0]) + '</span><div><b>' + esc(t[1]) + '</b><p>' + esc(t[2]) + '</p></div></div>';
    }).join('') + '</div>' : '';

    box.innerHTML = flow + tabs + '<div class="ax-panels">' + panels + '</div>' + trust +
      (data.note ? '<p class="ax-note">' + icon('sparkles') + '<span>' + esc(data.note) + '</span></p>' : '');

    // ---- behaviour: tabs, screen dots, gentle auto-advance while visible ----
    var tabEls = [].slice.call(box.querySelectorAll('.ax-tab'));
    var panelEls = [].slice.call(box.querySelectorAll('.ax-panel'));
    var current = 0, timer = null, visible = false, paused = false;

    function show(panel, j) {
      var imgs = panel.querySelectorAll('.ax-screen img'), dots = panel.querySelectorAll('.ax-dot');
      var count = imgs.length, k = ((j % count) + count) % count;
      [].forEach.call(imgs, function (im, x) { im.classList.toggle('on', x === k); });
      [].forEach.call(dots, function (d, x) { d.classList.toggle('on', x === k); d.setAttribute('aria-pressed', x === k); });
      var back = panel.querySelector('.ax-phone--back img');
      if (back && imgs.length > 1) back.src = imgs[(k + 1) % count].getAttribute('src');
      panel._shot = k;
    }
    function select(i, focus) {
      current = i;
      tabEls.forEach(function (t, x) { t.setAttribute('aria-selected', x === i); t.tabIndex = x === i ? 0 : -1; });
      panelEls.forEach(function (p, x) { p.hidden = x !== i; });
      if (focus) tabEls[i].focus();
      show(panelEls[i], 0);
      restart();
    }
    function tick() { var p = panelEls[current]; if (p.querySelectorAll('.ax-screen img').length > 1) show(p, (p._shot || 0) + 1); }
    function restart() { clearInterval(timer); if (!reduce && visible && !paused) timer = setInterval(tick, 3800); }

    tabEls.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        // RTL: ArrowLeft moves forward
        var d = e.key === 'ArrowLeft' ? 1 : e.key === 'ArrowRight' ? -1 : 0;
        if (e.key === 'Home') d = -current; if (e.key === 'End') d = tabEls.length - 1 - current;
        if (d) { e.preventDefault(); select((current + d + tabEls.length) % tabEls.length, true); }
      });
    });
    box.addEventListener('click', function (e) {
      var dot = e.target.closest('.ax-dot');
      if (dot) { show(dot.closest('.ax-panel'), +dot.getAttribute('data-shot')); paused = true; restart(); }
    });
    box.addEventListener('mouseenter', function () { paused = true; restart(); });
    box.addEventListener('mouseleave', function () { paused = false; restart(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; restart(); }, { threshold: 0.35 }).observe(box);
    }
    panelEls.forEach(function (p) { show(p, 0); });
  });
})();
