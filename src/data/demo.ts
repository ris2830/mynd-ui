export type Status = 'done' | 'doing' | 'todo';

// rein visuell (kein State): Fokus ist “an”
export const FOCUS_MODE_ON = true;

export const mapNodes = [
  { id: 'html',  label: 'HTML Basics',          status: 'done'  as const, x: 120, y: 100 },
  { id: 'cssb',  label: 'CSS Basics',           status: 'done'  as const, x: 260, y: 150 },
  { id: 'dft',   label: 'Daily Focus Tips',     status: 'done'  as const, x: 230, y: 220 },
  { id: 'resp',  label: 'Responsive Design',    status: 'doing' as const, x: 380, y: 190 },
  { id: 'cssf',  label: 'CSS Fundamentals',     status: 'done'  as const, x: 140, y: 285 },

  { id: 'mr',    label: 'Mental Resilience',    status: 'todo'  as const, x: 540, y: 80  },
  { id: 'stoic', label: 'Stoic Mindset',        status: 'todo'  as const, x: 620, y: 130 },
  { id: 'mp',    label: 'Mindful Productivity', status: 'todo'  as const, x: 610, y: 185 },

  { id: 'lph',   label: 'Learning Power-Hacks', status: 'todo'  as const, x: 520, y: 260 },
  { id: 'acss',  label: 'Advanced CSS',         status: 'todo'  as const, x: 580, y: 330 },
];

export const mapEdges = [
  ['html','cssb'],
  ['html','dft'],
  ['cssb','resp'],
  ['dft','resp'],
  ['resp','mr'],
  ['resp','lph'],
  ['mr','stoic'],
  ['mr','mp'],
  ['lph','acss'],
] as const;

export type SourceType = 'video' | 'book' | 'quiz' | 'pdf' | 'checklist';

export const paths = [
  {
    id: 'web',
    icon: '🌐',
    title: 'Web Development Fundamentals',
    meta: '8 Quellen · 3 abgeschlossen · Zuletzt aktiv: heute',
    progress: 62,
    sources: [
      { id:'s1', type:'video' as const, title:'HTML Grundlagen – Einführungsvideo', sub:'Video · 12 min · html.dev/basics', status:'done' as const },
      { id:'s2', type:'book'  as const, title:'CSS – Das umfassende Handbuch',       sub:'Buch · Kapitel 1–4 · PDF',        status:'done' as const },
      { id:'s3', type:'video' as const, title:'CSS Fundamentals – Responsive Design',sub:'Video · 7 min · 60% abgeschlossen',status:'doing'as const },
      { id:'s4', type:'quiz'  as const, title:'CSS Selektoren – Interaktives Quiz',  sub:'Quiz · ~10 Fragen · Beginner',     status:'todo' as const },
      { id:'s5', type:'pdf'   as const, title:'JavaScript Einführung – Cheatsheet',  sub:'PDF · 3 Seiten · Referenz',        status:'todo' as const },
    ],
  },
  {
    id: 'mind',
    icon: '🧠',
    title: 'Mindset & Mental Resilience',
    meta: '5 Quellen · 2 abgeschlossen · Zuletzt aktiv: gestern',
    progress: 40,
    sources: [
      { id:'m1', type:'book' as const, title:'Atomic Habits – Kapitel 1–5', sub:'Buch · James Clear · 45 min Lesen', status:'done' as const },
      { id:'m2', type:'video'as const, title:'Stoic Mindset – TED Talk',    sub:'Video · 18 min · ted.com',          status:'done' as const },
      { id:'m3', type:'checklist'as const, title:'Tägliche Reflexion – Checkliste', sub:'Checkliste · 10 Punkte · täglich', status:'todo' as const },
      { id:'m4', type:'quiz' as const, title:'Mindset Profil – Persönlichkeitstest', sub:'Quiz · 20 Fragen · 15 min', status:'todo' as const },
    ],
  },
  {
    id: 'prod',
    icon: '⚡',
    title: 'Produktivität & Deep Work',
    meta: '6 Quellen · 0 abgeschlossen · Neu hinzugefügt',
    progress: 0,
    sources: [
      { id:'p1', type:'book' as const, title:'Deep Work – Cal Newport', sub:'Buch · Kapitel 1 · 30 min', status:'todo' as const },
      { id:'p2', type:'video'as const, title:'Pomodoro-Technik erklärt', sub:'Video · 8 min · youtube.com', status:'todo' as const },
    ],
  },
];

export const dummyImageSvg = (w=800,h=450) =>
  `data:image/svg+xml;utf8,` +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#1e293b"/>
          <stop offset="0.55" stop-color="#2d3a55"/>
          <stop offset="1" stop-color="#1e3a5f"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" rx="18" fill="url(#g)"/>
      <rect x="24" y="24" width="240" height="160" rx="14" fill="rgba(255,255,255,0.06)"/>
      <rect x="290" y="30" width="280" height="22" rx="10" fill="rgba(255,255,255,0.10)"/>
      <rect x="290" y="64" width="340" height="18" rx="9" fill="rgba(255,255,255,0.07)"/>
      <rect x="290" y="94" width="320" height="18" rx="9" fill="rgba(255,255,255,0.06)"/>
      <circle cx="${w/2}" cy="${h/2}" r="34" fill="rgba(255,255,255,0.18)"/>
      <polygon points="${w/2-10},${h/2-14} ${w/2-10},${h/2+14} ${w/2+16},${h/2}" fill="white" opacity="0.9"/>
    </svg>`
  );