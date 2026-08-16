/**
 * Build the Dental Clinic Revenue Leak Checklist as a FILLABLE PDF.
 *
 * Replaces the old HTML → Chrome --print-to-pdf pipeline (see
 * dental-clinic-revenue-leak-checklist.html, kept as the design reference):
 * Chrome flattens everything, so the checklist's boxes were just drawn
 * squares nobody could tick. This generator lays the page out with pdf-lib
 * and places REAL AcroForm checkbox fields, so the download is tickable in
 * Adobe/Chrome/Edge/Preview and still prints cleanly.
 *
 * Layout: A4 portrait, 6 section cards in a 2-column grid, 4 checkbox items
 * each. Standard Helvetica (WinAnsi) — so no →/≠/emoji in the copy.
 *
 * Run from the repo root:
 *   node print-src/build-checklist-pdf.mjs
 * Writes: public/downloads/dental-clinic-revenue-leak-checklist.pdf
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, '..', 'public', 'downloads', 'dental-clinic-revenue-leak-checklist.pdf');
const LOGO = path.join(HERE, '..', 'public', 'aumy-lockup-light.png');

// Brand palette (HomeClinic.css tokens)
const INK = rgb(0x16 / 255, 0x32 / 255, 0x4f / 255);
const SOFT = rgb(0x55 / 255, 0x63 / 255, 0x6e / 255);
const ACCENT = rgb(0x2a / 255, 0x9d / 255, 0x8f / 255);
const ACCENT_DARK = rgb(0x21 / 255, 0x87 / 255, 0x79 / 255);
const LINE = rgb(0xec / 255, 0xe9 / 255, 0xe3 / 255);
const TINT = rgb(0xed / 255, 0xf6 / 255, 0xf4 / 255);
const WHITE = rgb(1, 1, 1);

const SECTIONS = [
  ['1 - Missed Calls & New Enquiries', [
    'Every call is answered live - including lunch hours, evenings and Sundays',
    'Every missed call gets a call-back or WhatsApp reply the same day, logged',
    'WhatsApp / Instagram / website enquiries get a first reply within 5 minutes',
    'After-hours enquiries never wait until morning - someone owns them',
  ]],
  ['2 - Lead Follow-Up', [
    'Every enquiry from every channel lands in one list with a status',
    '"I\'ll think about it" triggers a planned follow-up sequence - not silence',
    'Follow-up messages are written per treatment (an implant lead is not a cleaning lead)',
    'We know last month\'s enquiry-to-booked conversion rate',
  ]],
  ['3 - No-Shows & Appointments', [
    'Every booking gets a confirmation and a day-before reminder',
    'Patients can reschedule in one reply - no phone-tag',
    'Every no-show gets a rebooking attempt within the same week',
    'Cancelled slots get refilled from a waitlist instead of sitting empty',
  ]],
  ['4 - Recall & After-Treatment Care', [
    'Patients due for recall are contacted every week - automatically, not "when free"',
    'Recall messages are personal ("Dr. recommends..."), never bulk promo blasts',
    'Treatment plans that stall get a follow-up within two weeks',
    'Every major treatment has a care plan: day-1 check-in, care tips, one-month review',
  ]],
  ['5 - Dormant Patients', [
    'We know exactly how many patients haven\'t visited in 12+ months',
    'Dormant patients get a genuine re-invitation at least every quarter',
    'Returning patients hear "your records are still here - no starting over"',
    'We stop after two unanswered touches - the patient list is never spammed',
  ]],
  ['6 - Measurement', [
    'Missed calls are counted weekly, straight from the phone log',
    'Enquiries-to-bookings is tracked weekly, per channel',
    'We know our average first-treatment value',
    'Ad spend is judged on booked patients - not on leads or clicks',
  ]],
];

const doc = await PDFDocument.create();
doc.setTitle('Dental Clinic Revenue Leak Checklist');
doc.setAuthor('AUM AI Healthcare Solutions');
const page = doc.addPage([595.28, 841.89]); // A4 portrait, points
const font = await doc.embedFont(StandardFonts.Helvetica);
const bold = await doc.embedFont(StandardFonts.HelveticaBold);
const form = doc.getForm();

const M = 34; // page margin
const W = 595.28 - 2 * M;
let y = 841.89 - M;

const wrap = (text, f, size, maxWidth) => {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    const t = cur ? cur + ' ' + w : w;
    if (f.widthOfTextAtSize(t, size) <= maxWidth) cur = t;
    else { if (cur) lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);
  return lines;
};

// ── Header: logo + byline + share pill ─────────────────────────────────────
const logoImg = await doc.embedPng(fs.readFileSync(LOGO));
const logoH = 24;
const logoW = (logoImg.width / logoImg.height) * logoH;
page.drawImage(logoImg, { x: M, y: y - logoH, width: logoW, height: logoH });
page.drawText('an AUM AI product  ·  aumai.co.in', {
  x: M + logoW + 10, y: y - logoH + 7, size: 8, font, color: SOFT,
});
const pillText = 'Free tool - share it with your practice manager';
const pillW = bold.widthOfTextAtSize(pillText, 7.5) + 16;
page.drawRectangle({ x: M + W - pillW, y: y - 20, width: pillW, height: 16, color: TINT, borderColor: LINE, borderWidth: 0.5 });
page.drawText(pillText, { x: M + W - pillW + 8, y: y - 15, size: 7.5, font: bold, color: ACCENT_DARK });
y -= logoH + 16;

// ── Title + intro ──────────────────────────────────────────────────────────
page.drawText('Dental Clinic Revenue Leak Checklist', { x: M, y: y - 18, size: 19, font: bold, color: INK });
y -= 26;
const intro =
  'Tick each statement that is true in your clinic today - not "we plan to." Every unticked box is a place where revenue you already earned quietly leaks away. Fillable: tick the boxes right in this PDF, or print it.';
for (const line of wrap(intro, font, 8.6, W)) {
  page.drawText(line, { x: M, y: y - 9, size: 8.6, font, color: SOFT });
  y -= 11.4;
}
y -= 6;

// ── Section cards: 2 columns x 3 rows, fixed geometry ─────────────────────
const GAP = 12;
const colW = (W - GAP) / 2;
const PAD = 10;
const BOX = 10.5;             // checkbox side
const ITEM_TEXT_W = colW - 2 * PAD - BOX - 7;
const LINE_H = 9.6;
const ITEM_GAP = 5;

// Pre-measure so each grid row is as tall as its taller card.
const measured = SECTIONS.map(([title, items]) => {
  const itemLines = items.map((t) => wrap(t, font, 7.8, ITEM_TEXT_W));
  const h = PAD + 13 + itemLines.reduce((a, ls) => a + Math.max(ls.length * LINE_H, BOX) + ITEM_GAP, 0) + PAD - ITEM_GAP;
  return { title, items, itemLines, h };
});

let fieldNo = 0;
const drawCard = (mx, x, yTop, rowH) => {
  page.drawRectangle({ x, y: yTop - rowH, width: colW, height: rowH, color: WHITE, borderColor: LINE, borderWidth: 0.8 });
  page.drawRectangle({ x, y: yTop - rowH, width: 3, height: rowH, color: ACCENT });
  let cy = yTop - PAD;
  page.drawText(mx.title, { x: x + PAD, y: cy - 9, size: 9.5, font: bold, color: ACCENT_DARK });
  cy -= 17;
  mx.itemLines.forEach((lines, idx) => {
    const itemH = Math.max(lines.length * LINE_H, BOX);
    const cb = form.createCheckBox(`leak_${++fieldNo}`);
    cb.addToPage(page, {
      x: x + PAD, y: cy - itemH + (itemH - BOX) / 2, width: BOX, height: BOX,
      borderColor: ACCENT, borderWidth: 1.1, backgroundColor: WHITE,
    });
    lines.forEach((line, li) => {
      page.drawText(line, { x: x + PAD + BOX + 7, y: cy - 7.5 - li * LINE_H, size: 7.8, font, color: SOFT });
    });
    cy -= itemH + ITEM_GAP;
    void idx;
  });
};

for (let row = 0; row < 3; row++) {
  const a = measured[row * 2];
  const b = measured[row * 2 + 1];
  const rowH = Math.max(a.h, b.h);
  drawCard(a, M, y, rowH);
  drawCard(b, M + colW + GAP, y, rowH);
  y -= rowH + GAP;
}

// ── Score box ──────────────────────────────────────────────────────────────
const scoreLines = wrap(
  'Count your ticks.  20-24: a tight ship - growth spend will actually compound.  ·  12-19: real money is leaking every month; fix the leaks before buying more ads.  ·  Under 12: your growth problem isn\'t marketing - it\'s leaks.',
  font, 8.4, W - 2 * PAD,
);
const scoreH = scoreLines.length * 11 + 2 * 8;
page.drawRectangle({ x: M, y: y - scoreH, width: W, height: scoreH, color: TINT, borderColor: LINE, borderWidth: 0.5 });
scoreLines.forEach((line, i) => {
  page.drawText(line, { x: M + PAD, y: y - 8 - 8.5 - i * 11, size: 8.4, font, color: INK });
});
y -= scoreH + 12;

// ── Footer ─────────────────────────────────────────────────────────────────
page.drawLine({ start: { x: M, y }, end: { x: M + W, y }, thickness: 1, color: INK });
y -= 14;
page.drawText('Want every unticked box measured, in rupees, for your clinic?', { x: M, y, size: 9, font: bold, color: INK });
page.drawText('More guides & calculators:  aumai.co.in/growth', {
  x: M + W - font.widthOfTextAtSize('More guides & calculators:  aumai.co.in/growth', 8.4), y, size: 8.4, font, color: SOFT,
});
y -= 13;
page.drawText('Free Revenue Leak Audit:  aumai.co.in/growth-audit', { x: M, y, size: 9, font: bold, color: ACCENT_DARK });
const demo = 'See the fix live - WhatsApp our demo clinic:  +91 80071 89868';
page.drawText(demo, { x: M + W - font.widthOfTextAtSize(demo, 8.4), y, size: 8.4, font, color: SOFT });

form.updateFieldAppearances(font);
fs.writeFileSync(OUT, await doc.save());
console.log(`wrote ${OUT} — ${fieldNo} interactive checkboxes`);
