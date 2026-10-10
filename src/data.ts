export interface IntroFrame { word: string; cap: string; bg: string }
export interface ClubEvent { n: string; title: string; kind: string; date: string; d: string; hue: number }
export interface Person { name: string; role: string; teamName?: string; members?: string[] }
export interface Social { label: string; handle: string; href: string }
export interface ContactInfo { email: string; socials: Social[]; address: string[] }

export const introFrames: IntroFrame[] = ([
  ['Code', '01 — PATCHES TO FIREFOX', 250],
  ['Docs', '02 — MDN WEB DOCS', 225],
  ['Hack', '03 — 24H HACKATHON', 270],
  ['L10n', '04 — FIREFOX IN HINDI', 205],
  ['Test', '05 — NIGHTLY, DAILY', 240],
  ['Ship', '06 — FIRST PATCH', 285],
  ['Open', '07 — THE OPEN WEB', 215],
] as [string, string, number][]).map(([word, cap, h]) => ({
  word, cap,
  bg: `radial-gradient(75% 65% at 50% 38%,oklch(0.56 0.11 ${h}),oklch(0.3 0.08 ${h + 10}) 45%,oklch(0.13 0.03 ${h + 15}) 85%)`,
}));

export const heroCopy: string = 'The official Mozilla campus club at VIT Bhopal. Late nights, loud ideas and a crew that turns them into something real.';

export const manifesto: string = "We're a room full of curious people — coders, designers, writers and storytellers. We share what we know, build things that matter, and make sure nobody on campus has to learn alone.";

export const events: ClubEvent[] = [
  { n: '01', title: 'Hack the Web 2026', kind: 'HACKATHON', date: '25.10', d: '25', hue: 290 },
  { n: '02', title: 'DevTools, deep dive', kind: 'WORKSHOP', date: '16.10', d: '16', hue: 255 },
  { n: '03', title: 'Firefox in Hindi', kind: 'L10N SPRINT', date: '05.11', d: '05', hue: 330 },
  { n: '04', title: 'Privacy by design', kind: 'TALK', date: '13.11', d: '13', hue: 220 },
  { n: '05', title: 'Your first patch', kind: 'MENTORING', date: '20.11', d: '20', hue: 310 },
];

export const marqueeWords: string[] = ['Learn', 'Build', 'Ship', 'Hack', 'Translate', 'Test', 'Belong'];

const placeholders = (count: number): string[] => Array.from({ length: count }, (_, i) => 'Member ' + String(i + 1).padStart(2, '0'));

// Replace placeholder members with real names: members: ['Name', 'Name', ...]
export const team: Person[] = [
  { name: 'Heeral Jiwnani', role: 'PRESIDENT' },
  { name: 'Vatsal Mahajan', role: 'VICE PRESIDENT' },
  { name: 'Deepti Singh', role: 'GENERAL SECRETARY' },
  { name: 'Prem Patro', role: 'TECHNICAL LEAD', teamName: 'TECHNICAL TEAM', members: placeholders(6) },
  { name: 'Aishwarya Masetty', role: 'EVENT LEAD', teamName: 'EVENTS TEAM', members: placeholders(5) },
  { name: 'Bhumika Gupta', role: 'PR LEAD', teamName: 'PR TEAM', members: placeholders(4) },
  { name: 'Vaishnavi Tiwary', role: 'CREATIVE LEAD', teamName: 'CREATIVE TEAM', members: placeholders(5) },
  { name: 'Ashwin Pillai', role: 'MEDIA LEAD', teamName: 'MEDIA TEAM', members: placeholders(4) },
  { name: 'Kevin George', role: 'CONTENT LEAD', teamName: 'CONTENT TEAM', members: placeholders(4) },
];

export const contact: ContactInfo = {
  email: 'mozilla.firefox@vitbhopal.ac.in',
  socials: [
    { label: 'Instagram', handle: '@firefoxclub.vitb', href: 'https://www.instagram.com/mozillafirefox.vitbhopal?vrfl=NHNlZGhweHB6cjE0' },
    { label: 'LinkedIn', handle: 'Firefox Club VITB', href: 'https://www.linkedin.com/company/mozilla-firefox-club-vit-bhopal/' },
    { label: 'GitHub', handle: 'firefoxclub-vitb', href: 'https://github.com/Mozilla-Firefox-Club-VIT-Bhopal' },
  ],
  address: ['VIT Bhopal University', 'Kothrikalan, Sehore', 'Madhya Pradesh 466114'],
};
