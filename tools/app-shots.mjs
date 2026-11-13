// Turns the real phone screenshots from the product folders into small WebP images for the
// mobile-apps sections (assets/img/apps). Run when the apps change: node tools/app-shots.mjs
// Sources: E:\Bexa\marketing\reels\source\shots (Bexa Owner, captured by capture-owner.mjs)
//          E:\Foodexa\marketing\screenshots       (Foodexa waiter, guest and owner apps)
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const OUT = path.join(ROOT, 'assets', 'img', 'apps');
const BEXA = 'E:/Bexa/marketing/reels/source/shots';
const FOODEXA = 'E:/Foodexa/marketing/screenshots';

const shots = {
  // Bexa Owner
  'bexa-owner-home': `${BEXA}/o-week.jpg`,
  'bexa-owner-chart': `${BEXA}/o-week-chart.jpg`,
  'bexa-owner-profit': `${BEXA}/o-profit.jpg`,
  'bexa-owner-sell': `${BEXA}/o-sell.jpg`,
  'bexa-owner-sell-done': `${BEXA}/o-sell-done.jpg`,
  'bexa-owner-stock': `${BEXA}/o-stock.jpg`,
  'bexa-owner-check': `${BEXA}/o-check.jpg`,
  'bexa-owner-count': `${BEXA}/o-count.jpg`,
  'bexa-owner-receive': `${BEXA}/o-receive.jpg`,
  // Foodexa customer menu (QR)
  'foodexa-guest-menu': `${FOODEXA}/20-guest-menu.png`,
  'foodexa-guest-items': `${FOODEXA}/21-guest-menu-items.png`,
  'foodexa-guest-options': `${FOODEXA}/22-guest-product-options.png`,
  'foodexa-guest-cart': `${FOODEXA}/23-guest-cart.png`,
  'foodexa-guest-accepted': `${FOODEXA}/25-guest-order-accepted.png`,
  // Foodexa waiter
  'foodexa-waiter-tables': `${FOODEXA}/10-waiter-app-tables.png`,
  'foodexa-waiter-menu': `${FOODEXA}/11-waiter-app-menu.png`,
  'foodexa-waiter-options': `${FOODEXA}/12-waiter-app-product-options.png`,
  'foodexa-waiter-send': `${FOODEXA}/13-waiter-app-send-to-kitchen.png`,
  'foodexa-waiter-calls': `${FOODEXA}/15-waiter-app-guest-calls.png`,
  'foodexa-waiter-signin': `${FOODEXA}/17-waiter-app-sign-in.png`,
  // Foodexa owner
  'foodexa-owner-home': `${FOODEXA}/30-owner-app-dashboard.png`,
  'foodexa-owner-branches': `${FOODEXA}/31-owner-app-all-branches.png`,
  'foodexa-owner-charts': `${FOODEXA}/32-owner-app-sales-charts.png`,
  'foodexa-owner-switcher': `${FOODEXA}/33-owner-app-branch-switcher.png`,
};

fs.mkdirSync(OUT, { recursive: true });
let total = 0;
for (const [name, src] of Object.entries(shots)) {
  if (!fs.existsSync(src)) { console.warn('missing:', src); continue; }
  const file = path.join(OUT, `${name}.webp`);
  // 1170×2532 phone captures → 480 wide is sharp on a 260–300 px phone frame on retina screens.
  await sharp(src).resize({ width: 480 }).webp({ quality: 78, effort: 6 }).toFile(file);
  total += fs.statSync(file).size;
}
console.log(`${Object.keys(shots).length} screens → assets/img/apps (${Math.round(total / 1024)} KB)`);
