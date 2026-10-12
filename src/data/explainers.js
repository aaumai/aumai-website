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
const HERO_VIDEO = {
  moduleId: 'automate-dental-clinic-operations',
  name: 'Aumy',
  line: 'One system for the whole patient journey — buy only what you need.',
  src: '/videos/explainers/aumy-explainer.mp4',
  poster: '/videos/explainers/aumy-explainer.jpg',
  duration: 'PT1M27S',
  description: 'How Aumy works across a dental clinic: Convert follows up new enquiries, Chat answers WhatsApp, Voice answers calls, Clinic runs the chair-side records and billing, and Journey brings patients back — sold separately or together as Aumy One.',
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

module.exports = { TITLE, SUB, HERO_VIDEO, VIDEOS, UPLOAD_DATE };
module.exports.default = module.exports;
