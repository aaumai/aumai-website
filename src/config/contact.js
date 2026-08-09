// Single source of truth for AUM AI contact details across the marketing site.
//
// Build-time market switch (same React codebase, two deploys):
//   - US build   (aumyai.com,  REACT_APP_MARKET=us) → show the US office only.
//   - India build (aumai.co.in, default)            → show BOTH offices (India + US).
//
// Keep every contact surface (Footer, Contact page, standalone US pages,
// crawler prerender) reading from here so the numbers/addresses never drift.

export const IS_US = process.env.REACT_APP_MARKET === 'us';

export const US_OFFICE = {
  key: 'us',
  label: 'United States',
  entity: 'AUM AI Healthcare Technology LLC',
  address: '30 N Gould St, Ste N, Sheridan, WY 82801',
  email: 'jayesh@aumyai.com',
  phone: '+1 (307) 263-5098',
  phoneTel: 'tel:+13072635098',
};

export const INDIA_OFFICE = {
  key: 'india',
  label: 'India',
  entity: 'AUM AI Healthcare Solutions',
  address: 'Pune, Maharashtra, India',
  email: 'jayesh.chaudhari@aumai.co.in',
  phone: '+91 800 718 9868',
  phoneTel: 'tel:+918007189868',
};

// Click-to-WhatsApp target for the India site (floating button on every page).
export const INDIA_WHATSAPP = {
  number: '918007189868',
  display: '+91 80071 89868',
  prefill: "Hi! I'm on the AUM AI website and would like to chat.",
};

// India build lists India first (home market), then the US office.
export const OFFICES = IS_US ? [US_OFFICE] : [INDIA_OFFICE, US_OFFICE];

// The market's own office — the right single point of contact for legal /
// jurisdiction copy (US entity on the US build, India entity on the India build).
export const PRIMARY_OFFICE = OFFICES[0];

// Shared SVG path data for the contact icons (mail / phone / location pin).
export const ICON = {
  mail: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
  phone: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z',
  pin: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
};
