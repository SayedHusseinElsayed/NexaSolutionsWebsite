// Nexa Solutions — three logo concepts, defined once and reused by every export.
// Each icon lives in a 512×512 box. Modes:
//   tile  — full-colour app-style tile (Facebook profile, favicon, lockups)
//   light — glyph only, for white paper / light backgrounds
//   black — one-colour black (stamps, fax, B&W print)
//   white — one-colour white (on photos / dark backgrounds)
const NAVY = ['#1E293B', '#0B1220'];
const LIME = ['#65C21A', '#B5F04A'];

const AR_NAME = 'نيكسا للحلول البرمجية';
const TAGLINE = 'حلول برمجية لإدارة أعمالك';

function defs(id, extra = '') {
  return `<defs>
    <linearGradient id="${id}-lime" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="${LIME[0]}"/><stop offset="1" stop-color="${LIME[1]}"/></linearGradient>${extra}
  </defs>`;
}
function gradTile(id, a, b) {
  return `<linearGradient id="${id}-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
    <radialGradient id="${id}-glow" cx="0.2" cy="0.1" r="0.85"><stop offset="0" stop-color="#fff" stop-opacity="0.16"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>`;
}
function tileRect(id, full) {
  return full
    ? `<rect width="512" height="512" fill="url(#${id}-bg)"/><rect width="512" height="512" fill="url(#${id}-glow)"/>`
    : `<rect x="16" y="16" width="480" height="480" rx="112" fill="url(#${id}-bg)"/><rect x="16" y="16" width="480" height="480" rx="112" fill="url(#${id}-glow)"/>
       <rect x="18" y="18" width="476" height="476" rx="110" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="4"/>`;
}

const concepts = [
  {
    key: 'option-1', name: 'Rising N', ar: 'الحرف الصاعد',
    idea: 'Refines the mark you already use: a bold N whose last stroke keeps climbing as three “growth” squares. The same squares are in the Bexa, Foodexa and Storexa icons, so the family stays connected.',
    ideaAr: 'تطوير للعلامة الحالية: حرف N قوي آخر ضلع فيه بيكمّل طالع على شكل 3 مربعات «نمو» — نفس المربعات اللي في أيقونات Bexa وFoodexa وStorexa.',
    font: 'Cairo', fontUrl: 'Cairo:wght@400;600;700;800;900',
    word: { en: '<b style="font-weight:800">Nexa</b> <span style="font-weight:600">Solutions</span>', enLower: false, arWeight: 700 },
    tile: NAVY, accent: '#65C21A', ink: '#0B1220', sub: '#5B6678',
    icon(mode, full) {
      const id = 'c1' + mode + (full ? 'f' : '');
      const c = {
        tile: { ink: '#fff', p1: `url(#${id}-lime)`, p3: '#fff', p3o: 0.85 },
        light: { ink: '#0B1220', p1: `url(#${id}-lime)`, p3: '#0B1220', p3o: 0.35 },
        black: { ink: '#000', p1: '#000', p3: '#000', p3o: 1 },
        white: { ink: '#fff', p1: '#fff', p3: '#fff', p3o: 1 }
      }[mode];
      // Solid geometric N; its right stem stops short and "breaks up" into three rising squares.
      const g = `<g transform="translate(-56 30)">
        <path d="M132 380 V160 H196 L316 318 V252 H380 V380 H318 L196 222 V380 Z" fill="${c.ink}" stroke="${c.ink}" stroke-width="16" stroke-linejoin="round"/>
        <rect x="316" y="172" width="64" height="64" rx="14" fill="${c.p1}"/>
        <rect x="396" y="116" width="48" height="48" rx="11" fill="${c.p1}"/>
        <rect x="460" y="72" width="32" height="32" rx="8" fill="${c.p3}" fill-opacity="${c.p3o}"/></g>`;
      return svg(mode === 'tile' ? defs(id, gradTile(id, ...this.tile)) + tileRect(id, full) + g : defs(id) + g, mode === 'tile' ? '0 0 512 512' : '62 90 388 344');
    }
  },
  {
    key: 'option-2', name: 'Connected', ar: 'المنظومة المتصلة',
    idea: 'An N drawn as one line through four connected points: green for Nexa, then blue, orange and purple for Bexa, Foodexa and Storexa. It says “one company, one connected system”, and the colours already match your product logos.',
    ideaAr: 'حرف N مرسوم كخط واحد بيوصل 4 نقاط: الأخضر لـ Nexa، والأزرق والبرتقالي والبنفسجي لـ Bexa وFoodexa وStorexa — «شركة واحدة ومنظومة متصلة»، وبألوان منتجاتك نفسها.',
    font: 'Readex Pro', fontUrl: 'Readex+Pro:wght@300;400;500;600;700',
    word: { en: '<b style="font-weight:600">nexa</b><span style="font-weight:300">solutions</span>', enLower: true, arWeight: 500 },
    tile: ['#16213F', '#0B1220'], accent: '#3D8BFF', ink: '#0B1220', sub: '#5B6678',
    icon(mode, full) {
      const id = 'c2' + mode + (full ? 'f' : '');
      const cols = { tile: ['#7AD32A', '#3D8BFF', '#FF8A3D', '#A78BFA'], light: ['#65C21A', '#1D4ED8', '#F97316', '#7C3AED'] }[mode];
      const line = { tile: '#fff', light: '#0B1220', black: '#000', white: '#fff' }[mode];
      const nodeFill = i => cols ? cols[i] : line;
      const ring = mode === 'tile' ? '#111a33' : mode === 'light' ? '#fff' : mode === 'black' ? '#fff' : 'transparent';
      const P = [[156, 372], [156, 140], [356, 372], [356, 140]];
      const g = `<g>
        <path d="M156 372 L156 140 L356 372 L356 140" fill="none" stroke="${line}" stroke-opacity="${mode === 'tile' ? 0.92 : 1}" stroke-width="30" stroke-linejoin="round"/>
        ${P.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="48" fill="${ring === 'transparent' ? 'none' : ring}"/><circle cx="${x}" cy="${y}" r="${mode === 'black' || mode === 'white' ? 40 : 40}" fill="${nodeFill(i)}"/>`).join('')}
      </g>`;
      return svg(mode === 'tile' ? defs(id, gradTile(id, ...this.tile)) + tileRect(id, full) + g : defs(id) + g, mode === 'tile' ? '0 0 512 512' : '90 74 332 364');
    }
  },
  {
    key: 'option-3', name: 'Family n', ar: 'حرف العائلة',
    idea: 'A friendly lowercase n, shaped like a shop doorway, with two rising squares. It is drawn exactly like the Bexa “b”, so the company logo and the product logos look like one family. The green tile makes it stand out in Facebook feeds.',
    ideaAr: 'حرف n صغير ودود على شكل باب محل، ومعاه مربعين صاعدين — مرسوم بنفس طريقة حرف «b» في Bexa، فشعار الشركة وشعارات المنتجات يبانوا عيلة واحدة. والبلاطة الخضرا بتلفت النظر على فيسبوك.',
    font: 'Alexandria', fontUrl: 'Alexandria:wght@300;400;500;600;700;800',
    word: { en: '<b style="font-weight:700">Nexa</b> <span style="font-weight:300">Solutions</span>', enLower: false, arWeight: 600 },
    tile: ['#6BCB1F', '#2E7D0A'], accent: '#3F9A0E', ink: '#0B1220', sub: '#5B6678',
    icon(mode, full) {
      const id = 'c3' + mode + (full ? 'f' : '');
      const c = {
        tile: { ink: '#fff', p1: '#fff', p1o: 1, p2: '#fff', p2o: 0.6 },
        light: { ink: '#0B1220', p1: `url(#${id}-lime)`, p1o: 1, p2: `url(#${id}-lime)`, p2o: 0.7 },
        black: { ink: '#000', p1: '#000', p1o: 1, p2: '#000', p2o: 1 },
        white: { ink: '#fff', p1: '#fff', p1o: 1, p2: '#fff', p2o: 1 }
      }[mode];
      const g = `<g transform="translate(256 258) scale(0.88) translate(-315 -252)">
        <path d="M184 392 V270 A80 80 0 0 1 344 270 V392" fill="none" stroke="${c.ink}" stroke-width="74" stroke-linecap="round"/>
        <rect x="366" y="128" width="60" height="60" rx="14" fill="${c.p1}" fill-opacity="${c.p1o}"/>
        <rect x="440" y="76" width="44" height="44" rx="10" fill="${c.p2}" fill-opacity="${c.p2o}"/></g>`;
      return svg(mode === 'tile' ? defs(id, gradTile(id, ...this.tile)) + tileRect(id, full) + g : defs(id) + g, mode === 'tile' ? '0 0 512 512' : '96 92 324 334');
    }
  }
];

function svg(inner, viewBox) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${inner}</svg>`;
}

module.exports = { concepts, AR_NAME, TAGLINE };
