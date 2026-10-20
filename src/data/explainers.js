/**
 * Home: one short explainer video per module (owner 2026-10-12: "use these video explainers for each module
 * on our home page"). ONE copy of the words: the React section (src/components/HomeExplainers.js) and the
 * crawler HTML + VideoObject JSON-LD (scripts/prerender.js) both read this file. Edit here, never there.
 *
 * Videos are made in the EHR repo: marketing/explainers-90s (HTML scenes + ElevenLabs narration -> MP4),
 * then copied to public/videos/explainers/. Posters are a frame from each video.
 */

const TITLE = 'See each module in under two minutes';
const SUB = 'A real clinic day, before and after Aumy. Sound on.';

// The whole-Aumy film plays in the home hero (owner 2026-10-12: the Aumy loop is retired, this film replaces it).
// Home hero (owner 2026-10-20: "make this hero in our marketing website"): the whole Sterling team on Aumy,
// upright (9:16). Was the whole-Aumy explainer (aumy-explainer.mp4), which still serves the BM day-3 nurture history.
const HERO_VIDEO = {
  moduleId: 'automate-dental-clinic-operations',
  name: 'The Sterling Dental Clinic',
  line: '26 years in Delhi. Their whole team on what changed with Aumy.',
  src: '/videos/testimonials/sterling-testimonial.mp4',
  poster: '/videos/testimonials/sterling-testimonial.jpg',
  duration: 'PT2M11S',
  vertical: true,
  youtube: 'https://youtube.com/shorts/OVR7LEnd96k',
  description: 'The Sterling Dental Clinic, Delhi (26 years): the founder, the doctor, the CRM and the MIS on moving to Aumy. Almost half of appointments confirmed by patients on WhatsApp in the first two weeks, no more Google Sheets, and everything the doctor needs on one screen.',
};

// The full Aumy demo film (owner 2026-10-20), on YouTube; shown on the home page under the hero and leads /demos.
const FULL_DEMO = {
  youtubeId: '0LE0iwNvcZQ',
  tag: 'Full demo · 9 min',
  title: 'Watch Aumy run a dental clinic, start to finish',
  blurb: 'Every enquiry answered on WhatsApp and phone, appointments confirmed and reminded, missed visits rebooked, advised treatment started, lab cases and unfinished treatment tracked, patients brought back, and a weekly report of what is working.',
};

const VIDEOS = [
  {
    moduleId: 'ai-voice-receptionist-for-dentists',
    name: 'Aumy Voice',
    line: 'Every call answered — even when your desk is busy.',
    src: '/videos/explainers/aumy-voice-explainer.mp4',
    poster: '/videos/explainers/aumy-voice-explainer.jpg',
    duration: 'PT1M30S',
    description: 'How Aumy Voice, the AI voice receptionist for dental clinics, answers the calls your desk cannot pick up, books by your doctors\' free slots and rings your staff for anything urgent.',
  },
  {
    moduleId: 'whatsapp-ai-receptionist-for-dentists',
    name: 'Aumy Chat',
    line: 'Every WhatsApp answered in seconds, day and night.',
    src: '/videos/explainers/aumy-chat-explainer.mp4',
    poster: '/videos/explainers/aumy-chat-explainer.jpg',
    duration: 'PT1M34S',
    description: 'How Aumy Chat, the AI WhatsApp receptionist for dental clinics, replies in seconds on your own number, understands voice notes and photos, and books real free slots.',
  },
  {
    moduleId: 'dental-patient-follow-up',
    name: 'Aumy Journey',
    line: 'Stop your clinic leaking revenue.',
    src: '/videos/explainers/aumy-journey-explainer.mp4',
    poster: '/videos/explainers/aumy-journey-explainer.jpg',
    duration: 'PT2M4S',
    description: 'How Aumy Journey answers and nurtures new enquiries, reads every patient reply, rebooks missed visits and follows up advised and planned treatments, recalls, cleanings and patients who have not visited in a long time.',
  },
  {
    moduleId: 'dental-lead-management',
    name: 'Aumy Convert',
    line: 'Every ad enquiry followed up until it books.',
    src: '/videos/explainers/aumy-convert-explainer.mp4',
    poster: '/videos/explainers/aumy-convert-explainer.jpg',
    duration: 'PT1M48S',
    description: 'How Aumy Convert answers every ad enquiry in seconds, follows up for weeks and months, shows your team the hottest leads and tells Meta which enquiries turned out serious, so your ads find more like them.',
  },
];

const UPLOAD_DATE = '2026-10-12';

module.exports = { FULL_DEMO, TITLE, SUB, HERO_VIDEO, VIDEOS, UPLOAD_DATE };
module.exports.default = module.exports;
