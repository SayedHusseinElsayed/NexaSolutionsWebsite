/* =========================================================================
   Site data — edit this file to update the site without touching the pages.
   ========================================================================= */
window.NEXA = {
  company: 'Nexa Solutions',
  siteUrl: 'https://nexamasr.com',      // used for share links, QR codes and link previews
  phone: '01041213020',
  whatsapp: '201041213020',            // international format, no "+"
  email: '',                            // e.g. 'info@nexamasr.com' — leave empty to hide
  facebook: 'https://facebook.com/NexaSolutitions',
  address: 'المنيا الجديدة، مصر',
  hours: 'متاحون يومياً — الرد على واتساب طوال اليوم',

  // The Storexa platform (merchant dashboards, store sign-up) and its live demo stores.
  storexaApp: 'https://storexa.nexamasr.com',
  storexaDemos: {
    home: 'https://storexa.nexamasr.com/demo/loma-home',
    fashion: 'https://storexa.nexamasr.com/demo/sidra'
  },

  products: {
    bexa:    { name: 'Bexa POS', ar: 'بيكسا', page: 'bexa.html',    logo: 'assets/img/brand/bexa.svg',    color: 'bexa',
      tagline: 'برنامج كاشير ومخزون وحسابات عربي — يعمل بدون إنترنت ودفعة واحدة',
      // Free trial download: the signed installer on the updates server (the same file
      // the app's auto-update uses). Update url + file + version + size after every `npm run release`.
      trial: {
        url: 'https://updates.nexamasr.com/bexa/Bexa-Setup-1.3.10.exe',
        file: 'Bexa-Setup-1.3.10.exe', version: '1.3.10', size: '194 MB', days: 7,
        login: [['اسم المستخدم', 'admin'], ['كلمة المرور', 'admin123']],
        steps: [
          'اضغط «تحميل النسخة التجريبية» والملف هيتحمّل على جهازك على طول.',
          'شغّل الملف واتبع خطوات التثبيت.',
          'افتح Bexa وادخل ببيانات الدخول التجريبية.'
        ]
      } },
    foodexa: { name: 'Foodexa',  ar: 'فوديكسا', page: 'foodexa.html', logo: 'assets/img/brand/foodexa.svg', color: 'foodexa',
      tagline: 'نظام مطاعم وكافيهات: كاشير + منيو QR + تطبيق الويتر + تطبيق المالك',
      trial: {
        url: 'https://updates.nexamasr.com/foodexa/Foodexa-Setup-1.3.9.exe',
        file: 'Foodexa-Setup-1.3.9.exe', version: '1.3.9', size: '109 MB', days: 7,
        login: [['الحساب', 'المدير العام (admin)'], ['الرمز (PIN)', '1234']],
        steps: [
          'اضغط «تحميل النسخة التجريبية» والملف هيتحمّل على جهازك على طول.',
          'شغّل الملف واتبع خطوات التثبيت — كل اللي البرنامج محتاجه بيتثبّت ويشتغل تلقائياً في الخلفية.',
          'افتح Foodexa وادخل بحساب المدير العام والرمز التجريبي.'
        ]
      } },
    storexa: { name: 'Storexa',  ar: 'ستوريكسا', page: 'storexa.html', logo: 'assets/img/brand/storexa.svg', color: 'storexa',
      tagline: 'متجرك الإلكتروني في مصر: دفع عند الاستلام بدون خسارة، InstaPay، وشحن لكل محافظة' }
  },

  /* ---------------------------------------------------------------------
     VIDEOS
     product: 'bexa' | 'foodexa' | 'storexa' | 'nexa'
     type:    'tutorial' (شرح) | 'promo' (إعلاني)
     Source — use ONE of:
       youtube: 'VIDEO_ID'              (recommended for long tutorials)
       src: 'assets/video/file.mp4'     (self-hosted file)
     poster: thumbnail image (optional when youtube is set)
     portrait: true for vertical (reels) videos
     --------------------------------------------------------------------- */
  videos: [
    // ---- Promo videos (shown first; the home page shows the first 3) ----
    { product: 'foodexa', type: 'promo', title: 'Foodexa: من QR الطاولة لحد الحساب', desc: 'الزبون يمسح ويطلب، الويتر يستلم، والمطبخ يجهّز — كله في نظام واحد.', src: 'assets/video/foodexa-film.mp4', poster: 'assets/video/foodexa-film.webp', duration: '0:43', portrait: true },
    { product: 'foodexa', type: 'promo', title: 'Foodexa: كاشير ومعاه 3 تطبيقات', desc: 'اتمسح. اتطلب. اتطبخ. اتحسب — الزبون يطلب من QR الطاولة، والويتر يستلم، وإنت تتابع من أي مكان.', src: 'assets/video/foodexa-reel.mp4', poster: 'assets/video/foodexa-reel.webp', duration: '0:43', portrait: true },
    { product: 'bexa', type: 'promo', title: 'Bexa POS في دقيقة', desc: 'بيع أسرع، مخزون مضبوط، وأرباح واضحة.', src: 'assets/video/bexa-promo.mp4', poster: 'assets/video/bexa-promo.webp', duration: '1:16' },
    { product: 'storexa', type: 'promo', title: 'متجرك الإلكتروني جاهز', desc: 'اختار نشاطك، والتصميم يتجهز لوحده — وابدأ استقبال الطلبات.', src: 'assets/video/storexa-film.mp4', poster: 'assets/video/storexa-film.webp', duration: '0:35' },
    { product: 'foodexa', type: 'promo', title: 'ودّع الورقة والقلم', desc: 'طلبات الصالة والتيك أواي والتوصيل من شاشة واحدة.', src: 'assets/video/foodexa-promo.mp4', poster: 'assets/video/foodexa-promo.webp', duration: '0:38', portrait: true },
    { product: 'bexa', type: 'promo', title: 'Bexa — ريل قصير', desc: 'أهم مميزات Bexa في أقل من دقيقة.', src: 'assets/video/bexa-reel.mp4', poster: 'assets/video/bexa-reel.webp', duration: '0:46', portrait: true },

    // ---- Bexa POS tutorials — played from the public Google Drive folder "Nexa POS شرح" ----
    { product: 'bexa', type: 'tutorial', title: 'الدرس 1: شاشة الدخول ولوحة التحكم', drive: '1wnDxSZ5Cr93FestKjkLP6N4q3SIwVRyT' },
    { product: 'bexa', type: 'tutorial', title: 'الدرس 2: لوحة التحكم وشاشة المبيعات', drive: '1_Lc0kw9N2DVZ0q2aBKUx2Mz0joUTDQCP' },
    { product: 'bexa', type: 'tutorial', title: 'الدرس 3: شاشة المبيعات (1)', drive: '1fCyZPmZSFASYiyiHvslTygxokPFxMAh3' },
    { product: 'bexa', type: 'tutorial', title: 'الدرس 4: شاشة المبيعات (2)', drive: '1Bx4yLmrV9RRlluCScBrfKdLbqN86YlmD' },
    { product: 'bexa', type: 'tutorial', title: 'الدرس 5: شاشة المبيعات (3)', drive: '1M3e8Q8NMFCdlknWbYPwNxG4Il7CXBqJm' },
    { product: 'bexa', type: 'tutorial', title: 'الدرس 6: شاشة المبيعات (4)', drive: '1M_DHpni2IZoYRmNHjngri2wC37P7SxvH' },
    { product: 'bexa', type: 'tutorial', title: 'الدرس 7: شاشة المبيعات (5)', drive: '1mg8ejX422rvKB9AtEjgcXht4-1e7iOw9' },
    { product: 'bexa', type: 'tutorial', title: 'الدرس 8: المشتريات', drive: '1ouGoZNNagdCQou4iHnR0mgv74Kz8cEN-' },
    { product: 'bexa', type: 'tutorial', title: 'الدرس 9: المرتجعات', drive: '1slzSkqUknhsmc0oSzQg0cn_ocQk3A__Z' },
    { product: 'bexa', type: 'tutorial', title: 'الدرس 10: المنتجات (1)', drive: '1UCvV2OHSFEe4kTXsLnqwhT51rrDMnUjT' },
    { product: 'bexa', type: 'tutorial', title: 'الدرس 11: المنتجات (2)', drive: '1gvr4sVNltiXHFEyK5tfXThOsxikNTSAp' },
    { product: 'bexa', type: 'tutorial', title: 'الدرس 12: المنتجات (3)', drive: '1PFFp8PlqdOYUtVoOHuuXPvCUSoYBnMEN' },
    { product: 'bexa', type: 'tutorial', title: 'الدرس 13: حركة المخزون', drive: '1B2SyAB6v4AdT-xSbktwVVlJCzSiPttCL' },
    { product: 'bexa', type: 'tutorial', title: 'الدرس 14: الفئات والأقسام', drive: '1xqz27DdF3Q0qED4bBdhqc15E3QpMN1IP' },
    { product: 'bexa', type: 'tutorial', title: 'الدرس 15: العروض الترويجية', drive: '1qnwKezvyDNWBVJUnYA0N3WWFI0Q-JdsK' },
    { product: 'bexa', type: 'tutorial', title: 'الدرس 16: العملاء والذمم', drive: '1pFob-ui78Ad0opQ22QlNZKd2_XXsP2DD' },
    { product: 'bexa', type: 'tutorial', title: 'الدرس 17: الموردون والمستحقات', drive: '1SFBdUxZFUGN6RGwOYW-3gqeHppYD9seG' },
    { product: 'bexa', type: 'tutorial', title: 'الدرس 18: المصروفات', drive: '1DCTYQ7XIW2pdyVcbSh7JAXTit-zqlf03' },
    { product: 'bexa', type: 'tutorial', title: 'الدرس 19: التقارير', drive: '1tz1sYo6iiqn_nhCD4A__6VevBTayQZWv' },
    { product: 'bexa', type: 'tutorial', title: 'الدرس 20: المستخدمون والصلاحيات', drive: '1feZmRPBfONVp7C5jvxsArxtkq7SXcEPd' },
    { product: 'bexa', type: 'tutorial', title: 'الدرس 21: سجل الأنشطة', drive: '1wNWA8xvzBExpn0tJUTO1g51tTkwhO9fZ' },
    { product: 'bexa', type: 'tutorial', title: 'الدرس 22: إعدادات النظام', drive: '1RneXduPNk1PZKqOxCxUxDeWzkPEqVKt3' },
    { product: 'bexa', type: 'tutorial', title: 'الدرس 23: إعدادات الفاتورة', drive: '1dWUUlt4_yITjnLlZdAP__D0DzoVAuHp0' },
    { product: 'bexa', type: 'tutorial', title: 'شاشة المبيعات — شرح شامل', drive: '1jPwN3POcrbMF7f0HcFnoIpL5M7UyVeBd' }

    // Other sources:
    //   youtube: 'VIDEO_ID'   → { product: 'bexa', type: 'tutorial', title: '...', youtube: 'dQw4w9WgXcQ' }
    //   drive:   'FILE_ID'    → the file must be shared as "Anyone with the link"
  ],

  /* ---------------------------------------------------------------------
     UPDATES — the «آخر التحديثات» page (updates.html) and the home section.
     Newest first. Customer-facing wording only: no internal security
     details, prices or plans.
     { date: 'YYYY-MM-DD', product: 'bexa'|'foodexa'|'storexa'|'nexa',
       title, body, tag: 'new'|'improved' (optional, default 'new') }
     --------------------------------------------------------------------- */
  updates: [
    { date: '2026-11-16', product: 'bexa', title: 'خدمات الدفع الإلكتروني: فوري وأمان ومصاري', body: 'شاشة جديدة لماكينات الدفع الإلكتروني: سجّل عمليات الشحن والسداد، وتابع رصيد كل ماكينة وحركتها جنب حسابات المحل.' },
    { date: '2026-11-16', product: 'bexa', title: 'نسيت كلمة المرور؟ رمز على واتساب', body: 'استرجع كلمة المرور بنفسك برمز يوصلك على واتساب، من غير ما تستنى الدعم الفني.' },
    { date: '2026-11-15', product: 'storexa', title: '«مراجعة متجرك»', body: 'صفحة جديدة للتاجر فيها مراجعة كاملة لمتجره: إيه الناقص وإيه اللي محتاج يتحسن، مع رابط مباشر لكل نقطة علشان يصلّحها بضغطة.' },
    { date: '2026-11-15', product: 'bexa', title: 'الشاشات المفتوحة تفضل تبويبات', body: 'افتح أكتر من شاشة وتنقّل بينهم زي المتصفح، ورتّب أيقونات الصفحة الرئيسية بالسحب والإفلات زي ما تحب.', tag: 'improved' },
    { date: '2026-11-13', product: 'storexa', title: 'صورة لكل لون ومقاس، وبوستر QR للمتجر', body: 'العميل يختار اللون فتظهر صورته على طول، والتاجر يطبع بوستر QR يوصّل الزباين لمتجره، ولوحة التحكم بقت بالكروت أو القائمة الجانبية حسب اختيارك.' },
    { date: '2026-11-12', product: 'bexa', title: 'سداد مديونية العميل من نفس الفاتورة', body: 'وإنت بتبيع لعميل عليه فلوس قديمة، تقدر تحصّل جزء من المديونية أو كلها في نفس شاشة الدفع.' },
    { date: '2026-11-11', product: 'bexa', title: 'قيّم Bexa وشوف تقييم العملاء', body: 'صفحة تقييم على review.nexamasr.com يقدر أي عميل يكتب فيها رأيه، والتقييم الحالي بيظهر في البرنامج نفسه.' },
    { date: '2026-11-11', product: 'bexa', title: 'أمان أعلى للبيانات وفتح أسرع', body: 'الفواتير محمية لو الكهرباء قطعت فجأة، والبرنامج بيرجع لوحده بعد أي عطل، وبيفتح أسرع من الأول.', tag: 'improved' },
    { date: '2026-11-11', product: 'bexa', title: 'فاتورة الآجل توضّح حساب العميل', body: 'فاتورة البيع الآجل بقت توضّح الرصيد السابق وقيمة الفاتورة دي والإجمالي المستحق، فالعميل يفهم حسابه من غير أسئلة.', tag: 'improved' },
    { date: '2026-11-10', product: 'bexa', title: 'إدارة المنتجات من موبايل المالك', body: 'من تطبيق Bexa Owner تقدر تضيف المنتجات وتعدّلها وتغيّر أسعارها وإنت بره المحل.' },
    { date: '2026-11-10', product: 'bexa', title: 'تسعير بنسبة ربح وإرسال أسرع على واتساب', body: 'حدد سعر البيع كنسبة ربح فوق التكلفة، وشوف الفاتورة قبل ما تطبعها، والفاتورة بتتبعت على واتساب في الخلفية من غير ما توقف البيع.' },
    { date: '2026-11-10', product: 'bexa', title: 'يوم العمل وإقفال الورديات', body: 'اليوم بيتفتح مع أول وردية ويتقفل مع آخرها، والمالك يقدر يقفل وردية أي كاشير، مع تنبيه لو فيه وردية قديمة متقفلتش.' },
    { date: '2026-11-09', product: 'bexa', title: 'شكل جديد: صفحة رئيسية بالكروت', body: 'كل شاشات البرنامج قدامك ككروت واضحة، ولو بتحب القائمة الجانبية تقدر ترجع لها بضغطة من الشريط العلوي.' },
    { date: '2026-11-09', product: 'bexa', title: 'طباعة قائمة المنتجات وبحث في الإعدادات', body: 'اطبع قائمة المنتجات A4 بالأعمدة اللي تختارها أو صدّرها PDF، وابحث عن أي إعداد بكلمة واحدة وروح له على طول.' },
    { date: '2026-11-08', product: 'bexa', title: 'استيراد فاتورة المشتريات من Excel', body: 'ارفع فاتورة المورد كملف Excel، راجعها، والبرنامج يضيف الأصناف الجديدة لوحده.' },
    { date: '2026-11-07', product: 'nexa', title: 'موقعنا الجديد nexamasr.com', body: 'كل منتجات Nexa Solutions في مكان واحد، ومنصة Storexa اتنقلت على storexa.nexamasr.com.' },
    { date: '2026-11-04', product: 'bexa', title: 'الجرد الفعلي بالباركود', body: 'شاشة جرد كاملة: امسح الأصناف بالباركود أو بكاميرا موبايل المالك، راجع الفروقات، واعتمد الجرد.' },
    { date: '2026-11-03', product: 'bexa', title: 'خصم بالنسبة أو بالمبلغ في المشتريات', body: 'سجّل خصم المورد على الصنف أو على الفاتورة كلها، كنسبة أو كمبلغ.', tag: 'improved' },
    { date: '2026-11-03', product: 'bexa', title: 'تطبيق المالك: فحص الأسعار واستلام البضاعة', body: 'امسح أي صنف من موبايلك تعرف سعره وتكلفته وربحه ورصيده، واطبع ليبل السعر، واستلم بضاعة المورد.' },
    { date: '2026-11-02', product: 'foodexa', title: 'أرقام طلبات يومية وإقفال منظّم للوردية', body: 'رقم الطلب بيبدأ من جديد كل يوم، وعند إقفال الوردية البرنامج بينبّهك بالطلبات اللي لسه مفتوحة.' },
    { date: '2026-10-30', product: 'bexa', title: 'بيع من موبايل المالك', body: 'امسح الباركود من الموبايل، اعمل الفاتورة، واطبعها على طابعة المحل.' },
    { date: '2026-10-30', product: 'bexa', title: 'تقرير الأصناف والأقسام المباعة', body: 'اعرف أكتر الأصناف والأقسام بيعًا في أي فترة تختارها.' },
    { date: '2026-10-29', product: 'storexa', title: 'الربط مع كاشير Bexa', body: 'المنتجات والصور والأقسام بتتنقل من Bexa للمتجر الإلكتروني لوحدها، والطلبات الأونلاين بتوصل الكاشير، وعملاء المتجر بيتسجلوا في البرنامج.' },
    { date: '2026-10-29', product: 'bexa', title: 'ربط المتجر الإلكتروني', body: 'اختار الأصناف اللي تظهر أونلاين على متجرك في Storexa، والطلب اللي يتسلّم بيتسجل بيع حقيقي ويخصم من المخزون.' },
    { date: '2026-10-27', product: 'foodexa', title: 'جرد الكاش عند الإقفال وتايمر للطاولات', body: 'رصيد افتتاحي وعدّ الكاش عند إقفال الوردية (اختياري)، وتايمر على كل طاولة، وطلب الطاولة يفضل عليها لحد ما تتحاسب.', tag: 'improved' },
    { date: '2026-10-26', product: 'foodexa', title: 'تطبيق الويتر يشتغل من أي مكان', body: 'الويتر يستخدم التطبيق على الإنترنت من غير ما يكون على شبكة المطعم، ويعدّل الطلبات اللي اتبعتت من موبايله.' },
    { date: '2026-10-26', product: 'foodexa', title: 'لوحة تحكم أوضح', body: 'كارت لمبيعات النهارده شامل الضريبة، وتفاصيل كل وردية مفتوحة، وبداية يوم العمل في التقارير بالساعة اللي تناسبك.', tag: 'improved' },
    { date: '2026-10-25', product: 'nexa', title: 'أسماء جديدة لمنتجاتنا', body: 'Nexa POS بقى Bexa POS، وNexa Rest بقى Foodexa. نفس البرامج اللي تعرفها بهوية أوضح.' },
    { date: '2026-10-25', product: 'foodexa', title: 'تطبيق الويتر', body: 'الويتر يستلم طاولاته وطلباته على موبايله، وكل طلب بيتسجل باسم الويتر اللي أخده.' },
    { date: '2026-10-24', product: 'foodexa', title: 'مخزون ووصفات أدق', body: 'إدارة الوحدات والمخازن والأقسام، والوصفات بتخصم من المخزون دايمًا، مع تقارير للوصفات والخصم والمرتجعات.', tag: 'improved' },
    { date: '2026-10-22', product: 'foodexa', title: 'صلاحيات تفصيلية لكل موظف', body: 'حدد مين يقدر يعمل كل عملية حساسة، ومين يقفل الوردية، وكل مستخدم يبدأ من الشاشة اللي تناسبه.' },
    { date: '2026-10-22', product: 'bexa', title: 'دفع الفاتورة بأكتر من طريقة', body: 'العميل يدفع جزء كاش وجزء فيزا أو محفظة في نفس الفاتورة، وصورة الفاتورة تتبعت على واتساب بضغطة.' },
    { date: '2026-10-21', product: 'foodexa', title: 'الزبون يتابع طلبه من QR الطاولة', body: 'الطلب من QR متاح بس من جوه المطعم، والزبون يتابع طلبه ويطلب تعديل عليه من موبايله. وكمان شاشة موظفين جديدة بالسُلف.' },
    { date: '2026-10-20', product: 'foodexa', title: 'استيراد المنيو من Excel وطلبات التوصيل', body: 'ارفع المنيو كله من ملف Excel، وتابع طلبات التوصيل على لوحة بالمراحل من التحضير للتسليم.' },
    { date: '2026-10-19', product: 'foodexa', title: 'الطلب من QR الطاولة ومنيو أونلاين', body: 'الزبون يمسح QR الطاولة ويطلب بنفسه، والمنيو بيتنشر أونلاين على رابط خاص بمطعمك.' },
    { date: '2026-10-19', product: 'foodexa', title: 'إدارة مالية كاملة للمطعم', body: 'حسابات آجلة للعملاء، ضريبة القيمة المضافة، المصروفات، تسوية حساب الطيارين، وتكلفة الأكل.' },
    { date: '2026-10-18', product: 'bexa', title: 'محاسبة كاملة: دليل حسابات وقوائم مالية', body: 'قيود يومية تلقائية، دليل حسابات، قوائم مالية، أصول ثابتة وإهلاك، وإقفال السنة المالية.' },
    { date: '2026-10-17', product: 'bexa', title: 'الذكاء التحليلي و«اسأل محلك»', body: 'توقع المبيعات، اقتراح الطلبيات قبل ما الصنف يخلص، الأصناف اللي بتتشترى مع بعض، واسأل البرنامج عن محلك بالعربي.' },
    { date: '2026-10-17', product: 'foodexa', title: 'طباعة مباشرة وأقسام للمطبخ', body: 'كل قسم في المطبخ يستلم أصنافه على طابعته، والطباعة بقت أسرع.' },
    { date: '2026-10-15', product: 'foodexa', title: 'تطبيق المالك لـ Foodexa', body: 'تابع مبيعات مطعمك وورديّاته من موبايلك وإنت في أي مكان.' },
    { date: '2026-10-15', product: 'bexa', title: 'تقرير الزكاة وثيم أسود وذهبي', body: 'تقرير زكاة عروض التجارة حسب دار الإفتاء المصرية، وثيم جديد بالأسود والذهبي.' },
    { date: '2026-10-14', product: 'foodexa', title: 'فروع متعددة ونسخة احتياطية يومية', body: 'تنقّل بين فروعك بسهولة، والبيانات بتتاخد لها نسخة احتياطية كل يوم لوحدها.' },
    { date: '2026-10-11', product: 'storexa', title: '«المصمم الذكي» و12 قالب جديد', body: 'الذكاء الاصطناعي يصمم متجرك كله من كام اختيار سريع، ومعاه 12 قالب جديد لكل واحد شكله الخاص.' },
    { date: '2026-10-07', product: 'storexa', title: 'إشعارات الطلبات على الموبايل', body: 'إشعار بكل طلب جديد على موبايلك، حتى لو التطبيق مقفول.' },
    { date: '2026-10-06', product: 'storexa', title: '«انتشار متجرك»', body: 'خطوات واضحة تنشر بيها متجرك، وأدوات مشاركة، وروابط وعناوين لكل منتج وقسم تظهر في جوجل.' },
    { date: '2026-10-04', product: 'storexa', title: 'لكل متجر رابطه الخاص', body: 'كل متجر على رابط باسمه، بصفحات أقسام تظهر في جوجل، والعميل يبعت طلبه على واتساب المتجر بضغطة.' }
  ],

  /* ---------------------------------------------------------------------
     CUSTOMERS — public info only: business name, type, product, city.
     Never put owner names, phones, addresses, contract/payment values,
     device IDs or activation keys here (source: Nexa Clients app).
     { name, type, product: 'bexa'|'foodexa'|'storexa' or ['bexa','storexa'],
       city (optional), logo: 'assets/img/customers/x.webp' (optional),
       quote: 'رأي العميل' (optional), link: 'https://...' (optional) }
     --------------------------------------------------------------------- */
  customers: [
    { name: 'الأسمر للأثاث', type: 'أثاث ومفروشات', product: ['bexa', 'storexa'], logo: 'assets/img/customers/al-asmar.webp' },
    { name: 'مطعم بركة', type: 'مطعم', product: 'foodexa', city: 'العاشر من رمضان' },
    { name: 'أرينا كافيه ومطعم', type: 'كافيه ومطعم', product: 'foodexa' },
    { name: 'أرينا لاونج', type: 'كافيه', product: 'foodexa' },
    { name: 'مكتبة سندي', type: 'مكتبة', product: 'bexa' },
    { name: 'صاحب السعادة', type: 'سوبر ماركت', product: 'bexa' },
    { name: 'سوبر ماركت دريم', type: 'سوبر ماركت', product: 'bexa', city: 'المنيا' },
    { name: 'كيدز فايب', type: 'ملابس أطفال', product: 'bexa', city: 'التجمع' },
    { name: 'جاكار للمفروشات', type: 'مفروشات', product: 'bexa', city: 'المنيا' },
    { name: 'لانا للعرايس', type: 'ملابس', product: 'bexa' },
    { name: 'جوري بوتيك', type: 'ملابس', product: 'bexa' },
    { name: 'Lool', type: 'ملابس', product: 'bexa' },
    { name: 'Teacherone', type: 'ملابس', product: 'bexa' },
    { name: 'الهادي للمنظفات', type: 'منظفات', product: 'bexa' },
    { name: 'المختار للتشطيبات', type: 'تشطيبات', product: 'bexa' }
  ]
};
