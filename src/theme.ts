import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'brand',
  colors: {
    brand: ['#f0f7ff','#dceeff','#bbddff','#99ccff','#77bbff','#5aa5ee','#4a90d9','#2f7ec8','#2366a6','#1b5287'],
    teal:  ['#e0f7f4','#c8f1ea','#a4e7db','#7edbcc','#57cfbd','#2ebfa5','#1aa592','#138b7a','#0f6f62','#0b554b'],
    grayx: ['#f6f7fb','#eef1f6','#e5e7eb','#cbd5e1','#94a3b8','#6b7280','#475569','#334155','#1e293b','#0f172a'],
  },
  fontFamily: 'DM Sans, Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
  headings: { fontFamily: 'DM Serif Display, DM Sans, Inter, system-ui, sans-serif' },
  defaultRadius: 14,
});