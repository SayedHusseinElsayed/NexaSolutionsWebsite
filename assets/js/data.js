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

  // Live Storexa demo stores. Update these when the e-commerce app moves to its own address.
  storexaDemos: {
    home: 'https://nexamasr.com/demo/loma-home',
    fashion: 'https://nexamasr.com/demo/sidra'
  },

  products: {
    bexa:    { name: 'Bexa POS', ar: 'بيكسا', page: 'bexa.html',    logo: 'assets/img/brand/bexa.svg',    color: 'bexa',
      tagline: 'برنامج كاشير ومخزون وحسابات عربي — يعمل بدون إنترنت ودفعة واحدة',
      // Free trial download (public Google Drive file). Update url + version on every new release.
      trial: {
        url: 'https://drive.google.com/file/d/10XxT0K_iwLDavQTpz339DwXKWJzF9KEk/view?usp=sharing',
        file: 'Bexa Setup 1.3.2.exe', version: '1.3.2', days: 7,
        login: [['اسم المستخدم', 'admin'], ['كلمة المرور', 'admin123']],
        steps: [
          'حمّل ملف التثبيت من Google Drive (زر «تنزيل» أعلى الصفحة).',
          'شغّل الملف واتبع خطوات التثبيت.',
          'افتح Bexa وادخل ببيانات الدخول التجريبية.'
        ]
      } },
    foodexa: { name: 'Foodexa',  ar: 'فوديكسا', page: 'foodexa.html', logo: 'assets/img/brand/foodexa.svg', color: 'foodexa',
      tagline: 'نظام مطاعم وكافيهات: كاشير + منيو QR + تطبيق الويتر + تطبيق المالك',
      trial: {
        url: 'https://drive.google.com/file/d/1O2_FJzonAUprL89NEMh9czsOVQGoSBV2/view?usp=drive_link',
        file: 'Foodexa Setup 1.3.9.exe', version: '1.3.9', days: 7,
        login: [['الحساب', 'المدير العام (admin)'], ['الرمز (PIN)', '1234']],
        steps: [
          'حمّل ملف تثبيت Foodexa من Google Drive.',
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
