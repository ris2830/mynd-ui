 
import { useRef, useState } from 'react';
import { Box, Paper, Group, Text, SimpleGrid, Badge, Button, Switch, ActionIcon, Stack } from '@mantine/core';
import { IconTarget, IconWand, IconZoomIn } from '@tabler/icons-react';
import { mapEdges, mapNodes } from '../data/demo';
import { useFocusMode } from '../context/focusMode';

const nodeNotes: Record<string, { summary: string; points: string[] }> = {
  html: {
    summary: 'Grundlage fuer klare Webseiten-Struktur und barrierearme Inhalte.',
    points: ['Semantische Tags', 'Headings & Links'],
  },
  cssb: {
    summary: 'Erste Styling-Regeln fuer Farben, Abstaende und einfache Layouts.',
    points: ['Selektoren', 'Box Model'],
  },
  dft: {
    summary: 'Kurze Routinen, die beim konzentrierten Lernen helfen.',
    points: ['Tagesziel setzen', 'Ablenkungen reduzieren'],
  },
  resp: {
    summary: 'Layouts passen sich sauber an Smartphone, Tablet und Desktop an.',
    points: ['Media Queries', 'Flexible Grids'],
  },
  cssf: {
    summary: 'Solides CSS-Verstaendnis fuer wiederverwendbare UI-Bausteine.',
    points: ['Layout-Systeme', 'Typografie'],
  },
  mr: {
    summary: 'Strategien, um mit Rueckschlaegen und Lernstress besser umzugehen.',
    points: ['Reflexion', 'Geduld trainieren'],
  },
  stoic: {
    summary: 'Fokus auf Dinge, die man wirklich beeinflussen kann.',
    points: ['Kontrolle erkennen', 'Gelassen handeln'],
  },
  mp: {
    summary: 'Produktiv arbeiten, ohne dauerhaft mental auszubrennen.',
    points: ['Priorisieren', 'Pausen planen'],
  },
  lph: {
    summary: 'Praktische Lerntechniken fuer schnelleren Fortschritt.',
    points: ['Active Recall', 'Spaced Repetition'],
  },
  acss: {
    summary: 'Fortgeschrittene CSS-Konzepte fuer komplexere Interfaces.',
    points: ['Animationen', 'Container Queries'],
  },
};

export default function JourneyMap() {
  const { focusOn, setFocusOn } = useFocusMode();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const didDragRef = useRef(false);
  const [nodes, setNodes] = useState(() => mapNodes.map((node) => ({ ...node })));
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(() => new Set());
  const [dragging, setDragging] = useState<{ id: string; offsetX: number; offsetY: number; startX: number; startY: number } | null>(null);
  const getNodeWidth = (label: string) => Math.min(260, Math.max(150, label.length * 7.2 + 64));
  const NODE_H = 34;
  const EXPANDED_NODE_H = 118;
  const getNodeHeight = (id: string) => (expandedNodes.has(id) ? EXPANDED_NODE_H : NODE_H);

  const toggleNode = (id: string) => {
    setExpandedNodes((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const moveNode = (clientX: number, clientY: number) => {
    if (!dragging || !mapRef.current) return;

    const bounds = mapRef.current.getBoundingClientRect();
    if (Math.abs(clientX - dragging.startX) > 3 || Math.abs(clientY - dragging.startY) > 3) {
      didDragRef.current = true;
    }

    setNodes((current) =>
      current.map((node) => {
        if (node.id !== dragging.id) return node;

        const width = getNodeWidth(node.label);
        const height = getNodeHeight(node.id);
        const nextX = Math.min(
          bounds.width - width - 20,
          Math.max(20, clientX - bounds.left - dragging.offsetX)
        );
        const nextY = Math.min(
          bounds.height - height - 20,
          Math.max(60, clientY - bounds.top - dragging.offsetY)
        );

        return { ...node, x: nextX, y: nextY };
      })
    );
  };

  return (
    <Box
      style={{
        flex: 1,
        padding: 24,
        paddingLeft: 72 + 24,
        background: 'var(--mantine-color-grayx-0)',
        minHeight: 'calc(100vh - 60px)',
      }}
    >
      <Text size="12px" c="grayx.4" mb={16}>
        MYnd <span style={{ opacity: 0.5 }}>›</span>{' '}
        <b style={{ color: 'var(--mantine-color-grayx-9)' }}>Journey Map</b>
      </Text>

      <SimpleGrid cols={{ base: 2, md: 4 }} spacing={12} mb={20}>
        <Paper p={16} radius="md" withBorder>
          <Text fw={800} size="24px">12</Text>
          <Text size="11px" c="grayx.4" tt="uppercase" style={{ letterSpacing: '0.6px' }}>
            Abgeschlossen
          </Text>
        </Paper>
        <Paper p={16} radius="md" withBorder>
          <Text fw={800} size="24px" c="brand.6">3</Text>
          <Text size="11px" c="grayx.4" tt="uppercase" style={{ letterSpacing: '0.6px' }}>
            In Bearbeitung
          </Text>
        </Paper>
        <Paper p={16} radius="md" withBorder>
          <Text fw={800} size="24px" c="teal.5">840</Text>
          <Text size="11px" c="grayx.4" tt="uppercase" style={{ letterSpacing: '0.6px' }}>
            XP Gesammelt
          </Text>
        </Paper>
        <Paper p={16} radius="md" withBorder>
          <Text fw={800} size="24px" c="yellow.7">5</Text>
          <Text size="11px" c="grayx.4" tt="uppercase" style={{ letterSpacing: '0.6px' }}>
            Streak Tage
          </Text>
        </Paper>
      </SimpleGrid>

      <Paper
        ref={mapRef}
        withBorder
        radius="md"
        p={20}
        style={{
          position: 'relative',
          minHeight: 480,
          overflow: 'hidden',
          boxShadow: '0 2px 16px rgba(60,90,140,0.08)',
          background:
            'radial-gradient(circle at 30% 40%, rgba(74,144,217,0.05) 0%, transparent 55%),' +
            'radial-gradient(circle at 70% 70%, rgba(46,191,165,0.05) 0%, transparent 55%),' +
            '#fff',
        }}
      >
        <Group justify="space-between" mb={10}>
          <Group gap={10}>
            <Badge variant="light" color="brand">Mindset</Badge>
            <Badge variant="light" color="gray">Productivity</Badge>
            <Badge variant="light" color="gray">Growth</Badge>
          </Group>

          <Group gap={10}>
            {/* rein visuell */}
            <Box>
              <Switch
                checked={focusOn}
                onChange={(e) => setFocusOn(e.currentTarget.checked)}
                label="Fokusmodus"
                size="md"
                color="orange"
                styles={{
                  label: { fontSize: 13, fontWeight: 600, color: focusOn ? '#ea580c' : undefined },
                }}
              />
            </Box>

            <ActionIcon variant="default" radius="md"><IconTarget size={16} /></ActionIcon>
            <ActionIcon variant="default" radius="md"><IconWand size={16} /></ActionIcon>
            <ActionIcon variant="default" radius="md"><IconZoomIn size={16} /></ActionIcon>
          </Group>
        </Group>

        <Box
  component="svg"
  style={{
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 0,
  }}
>
  {mapEdges.map(([a, b], idx) => {
    const na = nodes.find((n) => n.id === a)!;
    const nb = nodes.find((n) => n.id === b)!;

    const wa = getNodeWidth(na.label);
    const wb = getNodeWidth(nb.label);
    const ha = getNodeHeight(na.id);
    const hb = getNodeHeight(nb.id);

    const centerA = { x: na.x + wa / 2, y: na.y + ha / 2 };
    const centerB = { x: nb.x + wb / 2, y: nb.y + hb / 2 };

    return (
      <path
        key={idx}
        d={`M ${centerA.x} ${centerA.y} L ${centerB.x} ${centerB.y}`}
        stroke="rgba(100,120,160,0.24)"
        strokeWidth={1.3}
        fill="none"
        strokeDasharray="5 6"
        strokeLinecap="round"
      />
    );
  })}
</Box>

        {nodes.map((n) => {
          const isDone = n.status === 'done';
          const isDoing = n.status === 'doing';
          const isTodo = n.status === 'todo';
          const isExpanded = expandedNodes.has(n.id);
          const note = nodeNotes[n.id];
          const nodeWidth = getNodeWidth(n.label);
          const nodeHeight = getNodeHeight(n.id);

          const opacity = focusOn ? (isTodo ? 1 : isDoing ? 0.75 : 0.35) : 1;

          const borderColor =
            isDone ? 'var(--mantine-color-green-5)'
              : isDoing ? 'var(--mantine-color-brand-6)'
                : 'rgba(100,120,160,0.28)';

          const bg = isDoing ? 'rgba(74,144,217,0.10)' : '#fff';

          const dot =
            isDone ? 'var(--mantine-color-green-5)'
              : isDoing ? 'var(--mantine-color-brand-6)'
                : 'var(--mantine-color-grayx-4)';

          const glow =
            focusOn && isTodo
              ? '0 0 0 6px rgba(249,115,22,0.08), 0 8px 40px rgba(60,90,140,0.13)'
              : '0 2px 16px rgba(60,90,140,0.08)';

          return (
            <Paper
              key={n.id}
              radius={isExpanded ? 'md' : 999}
              withBorder
              onPointerDown={(event) => {
                didDragRef.current = false;
                event.currentTarget.setPointerCapture(event.pointerId);
                setDragging({
                  id: n.id,
                  offsetX: event.clientX - event.currentTarget.getBoundingClientRect().left,
                  offsetY: event.clientY - event.currentTarget.getBoundingClientRect().top,
                  startX: event.clientX,
                  startY: event.clientY,
                });
              }}
              onPointerMove={(event) => moveNode(event.clientX, event.clientY)}
              onPointerUp={(event) => {
                event.currentTarget.releasePointerCapture(event.pointerId);
                setDragging(null);
              }}
              onPointerCancel={() => setDragging(null)}
              onClick={() => {
                if (!didDragRef.current) toggleNode(n.id);
              }}
              style={{
                position: 'absolute',
                top: n.y,
                left: n.x,
                width: nodeWidth,
                height: nodeHeight,
                padding: isExpanded ? '12px 14px' : '0 14px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                justifyContent: isExpanded ? 'flex-start' : 'center',
                gap: 8,
                fontSize: 12,
                fontWeight: 600,
                borderColor,
                background: bg,
                boxShadow: glow,
                whiteSpace: 'nowrap',
                opacity,
                zIndex: 1,
                cursor: dragging?.id === n.id ? 'grabbing' : 'grab',
                touchAction: 'none',
                userSelect: 'none',
                transition: dragging?.id === n.id ? 'none' : 'height 160ms ease, border-radius 160ms ease, box-shadow 160ms ease',
              }}
            >
              <Group gap={8} wrap="nowrap" justify="space-between">
                <Group gap={8} wrap="nowrap" style={{ minWidth: 0 }}>
                  <Box style={{ width: 8, height: 8, borderRadius: 999, background: dot, flex: '0 0 auto' }} />
                  <Text size="12px" fw={700} truncate>{n.label}</Text>
                </Group>
                <Text size="13px" c="grayx.4" fw={800} style={{ lineHeight: 1 }}>
                  {isExpanded ? '-' : '+'}
                </Text>
              </Group>

              {isExpanded && note && (
                <Box style={{ borderTop: '1px solid var(--mantine-color-grayx-2)', paddingTop: 8 }}>
                  <Text size="10px" c="grayx.5" lh={1.35} style={{ whiteSpace: 'normal' }}>
                    {note.summary}
                  </Text>
                  <Group gap={6} mt={8}>
                    {note.points.map((point) => (
                      <Badge key={point} size="xs" variant="light" color={isDone ? 'green' : isDoing ? 'brand' : 'gray'}>
                        {point}
                      </Badge>
                    ))}
                  </Group>
                </Box>
              )}
            </Paper>
          );
        })}

        <Paper
          radius="md"
          withBorder
          p={16}
          style={{
            position: 'absolute',
            top: 250,
            right: 24,
            width: 240,
            boxShadow: '0 8px 40px rgba(60,90,140,0.13)',
          }}
        >
          <Text size="10px" c="grayx.4" tt="uppercase" style={{ letterSpacing: '0.5px' }}>
            CSS · Intermediate
          </Text>
          <Text fw={700} mt={4} mb={8}>Responsive Design</Text>
          <Group gap={6} mb={10}>
            <Badge variant="light" color="brand">CSS</Badge>
            <Badge variant="light" color="gray">Intermediate</Badge>
          </Group>
          <Box style={{ height: 6, background: 'var(--mantine-color-grayx-2)', borderRadius: 999, overflow: 'hidden' }}>
            <Box style={{ width: '20%', height: '100%', background: 'var(--mantine-color-brand-5)' }} />
          </Box>
          <Text size="11px" c="grayx.4" mt={6} mb={12}>Progress: 20%</Text>
          <Button fullWidth radius="md">Start Node</Button>
        </Paper>

        <Paper radius="md" withBorder p={12} style={{ position: 'absolute', left: 20, bottom: 20 }}>
          <Stack gap={6}>
            <Group gap={8}><Box style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--mantine-color-green-5)' }} /><Text size="11px" c="grayx.6">Completed</Text></Group>
            <Group gap={8}><Box style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--mantine-color-brand-6)' }} /><Text size="11px" c="grayx.6">In Bearbeitung</Text></Group>
            <Group gap={8}><Box style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--mantine-color-grayx-4)' }} /><Text size="11px" c="grayx.6">Offen</Text></Group>
            <Group gap={8}><Box style={{ width: 8, height: 8, borderRadius: 999, background: '#ea580c' }} /><Text size="11px" c="grayx.6">Fokus (Todo)</Text></Group>
          </Stack>
        </Paper>
      </Paper>

      <Box h={80} hiddenFrom="sm" />
    </Box>
  );
}
