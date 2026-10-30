// Countries on the masterclass WhatsApp field (owner 2026-10-30: clinic owners in Dubai buy too).
// Keep in step with the site backend's lib/phone.js (same ISO codes): the backend checks the length.
export const WHATSAPP_COUNTRIES = [
  { code: 'IN', flag: '🇮🇳', name: 'India', dial: '91', example: '98765 43210' },
  { code: 'AE', flag: '🇦🇪', name: 'UAE', dial: '971', example: '50 123 4567' },
  { code: 'SA', flag: '🇸🇦', name: 'Saudi Arabia', dial: '966', example: '51 234 5678' },
  { code: 'QA', flag: '🇶🇦', name: 'Qatar', dial: '974', example: '3312 3456' },
  { code: 'OM', flag: '🇴🇲', name: 'Oman', dial: '968', example: '9212 3456' },
  { code: 'KW', flag: '🇰🇼', name: 'Kuwait', dial: '965', example: '5001 2345' },
  { code: 'BH', flag: '🇧🇭', name: 'Bahrain', dial: '973', example: '3600 1234' },
  { code: 'NP', flag: '🇳🇵', name: 'Nepal', dial: '977', example: '984 1234567' },
  { code: 'BD', flag: '🇧🇩', name: 'Bangladesh', dial: '880', example: '1812 345678' },
  { code: 'LK', flag: '🇱🇰', name: 'Sri Lanka', dial: '94', example: '71 234 5678' },
  { code: 'SG', flag: '🇸🇬', name: 'Singapore', dial: '65', example: '8123 4567' },
  { code: 'GB', flag: '🇬🇧', name: 'UK', dial: '44', example: '7400 123456' },
  { code: 'US', flag: '🇺🇸', name: 'USA', dial: '1', example: '201 555 0123' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada', dial: '1', example: '506 234 5678' },
  { code: 'AU', flag: '🇦🇺', name: 'Australia', dial: '61', example: '412 345 678' },
];

const BY_TIMEZONE = {
  'Asia/Dubai': 'AE', 'Asia/Riyadh': 'SA', 'Asia/Qatar': 'QA', 'Asia/Muscat': 'OM', 'Asia/Kuwait': 'KW',
  'Asia/Bahrain': 'BH', 'Asia/Kathmandu': 'NP', 'Asia/Katmandu': 'NP', 'Asia/Dhaka': 'BD', 'Asia/Colombo': 'LK',
  'Asia/Singapore': 'SG', 'Europe/London': 'GB',
};

/** The likely country from the visitor's clock, so a visitor in Dubai starts on UAE; India otherwise. */
export function defaultWhatsappCountry() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (BY_TIMEZONE[tz]) return BY_TIMEZONE[tz];
    if (tz.startsWith('Australia/')) return 'AU';
  } catch (e) { /* India */ }
  return 'IN';
}

export const whatsappCountry = (code) => WHATSAPP_COUNTRIES.find((c) => c.code === code) || WHATSAPP_COUNTRIES[0];
