import { useRef, useState } from 'react';
import { Box, Paper, Group, Text, SimpleGrid, Badge, Button, Switch, ActionIcon, Stack, TextInput, SegmentedControl } from '@mantine/core';
import { IconBrain, IconMessageCircle, IconMinus, IconPlus, IconSearch, IconTarget, IconWand, IconZoomIn } from '@tabler/icons-react';
import { mapEdges, mapNodes } from '../data/demo';
import { useFocusMode } from '../context/focusMode';

type NodeInfo = {
  category: string;
  level: string;
  progress: number;
  summary: string;
  points: string[];
  action: string;
};

const nodeNotes: Record<string, NodeInfo> = {
  html: {
    category: 'Web Basics',
    level: 'Beginner',
    progress: 100,
    summary: 'Grundlage fuer klare Webseiten-Struktur und barrierearme Inhalte.',
    points: ['Semantische Tags', 'Headings & Links'],
    action: 'Kurz wiederholen',
  },
  cssb: {
    category: 'Web Basics',
    level: 'Beginner',
    progress: 100,
    summary: 'Erste Styling-Regeln fuer Farben, Abstaende und einfache Layouts.',
    points: ['Selektoren', 'Box Model'],
    action: 'Praxisbeispiel ansehen',
  },
  dft: {
    category: 'Focus',
    level: 'Beginner',
    progress: 100,
    summary: 'Kurze Routinen, die beim konzentrierten Lernen helfen.',
    points: ['Tagesziel setzen', 'Ablenkungen reduzieren'],
    action: 'Routine pruefen',
  },
  resp: {
    category: 'CSS',
    level: 'Intermediate',
    progress: 20,
    summary: 'Layouts passen sich sauber an Smartphone, Tablet und Desktop an.',
    points: ['Media Queries', 'Flexible Grids'],
    action: 'Lerneinheit starten',
  },
  cssf: {
    category: 'CSS',
    level: 'Beginner',
    progress: 100,
    summary: 'Solides CSS-Verstaendnis fuer wiederverwendbare UI-Bausteine.',
    points: ['Layout-Systeme', 'Typografie'],
    action: 'Notizen ansehen',
  },
  mr: {
    category: 'Mindset',
    level: 'Beginner',
    progress: 0,
    summary: 'Strategien, um mit Rueckschlaegen und Lernstress besser umzugehen.',
    points: ['Reflexion', 'Geduld trainieren'],
    action: 'Als naechstes starten',
  },
  stoic: {
    category: 'Mindset',
    level: 'Intermediate',
    progress: 0,
    summary: 'Fokus auf Dinge, die man wirklich beeinflussen kann.',
    points: ['Kontrolle erkennen', 'Gelassen handeln'],
    action: 'Vormerken',
  },
  mp: {
    category: 'Productivity',
    level: 'Intermediate',
    progress: 0,
    summary: 'Produktiv arbeiten, ohne dauerhaft mental auszubrennen.',
    points: ['Priorisieren', 'Pausen planen'],
    action: 'Vormerken',
  },
  lph: {
    category: 'Learning',
    level: 'Intermediate',
    progress: 0,
    summary: 'Praktische Lerntechniken fuer schnelleren Fortschritt.',
    points: ['Active Recall', 'Spaced Repetition'],
    action: 'Als naechstes starten',
  },
  acss: {
    category: 'CSS',
    level: 'Advanced',
    progress: 0,
    summary: 'Fortgeschrittene CSS-Konzepte fuer komplexere Interfaces.',
    points: ['Animationen', 'Container Queries'],
    action: 'Nach Responsive Design starten',
  },
};

const verticalNodePositions: Record<string, { x: number; y: number }> = {
  html: { x: 590, y: 150 },
  cssb: { x: 590, y: 255 },
  dft: { x: 440, y: 340 },
  cssf: { x: 720, y: 340 },
  resp: { x: 590, y: 455 },
  lph: { x: 440, y: 590 },
  mr: { x: 720, y: 590 },
  acss: { x: 590, y: 720 },
  stoic: { x: 720, y: 720 },
  mp: { x: 805, y: 720 },
};

const horizontalNodePositions: Record<string, { x: number; y: number }> = {
  html: { x: 170, y: 155 },
  dft: { x: 170, y: 245 },
  cssf: { x: 170, y: 335 },
  cssb: { x: 380, y: 200 },
  resp: { x: 380, y: 300 },
  mr: { x: 600, y: 155 },
  lph: { x: 600, y: 335 },
  stoic: { x: 790, y: 145 },
  mp: { x: 790, y: 240 },
  acss: { x: 790, y: 370 },
};

const recommendedNodeIds = new Set(['mr', 'stoic', 'mp', 'lph', 'acss']);

const statusConfig = {
  done: { label: 'Completed', color: 'green', dot: 'var(--mantine-color-green-5)' },
  doing: { label: 'In Bearbeitung', color: 'brand', dot: 'var(--mantine-color-brand-6)' },
  todo: { label: 'Offen', color: 'gray', dot: 'var(--mantine-color-grayx-4)' },
} as const;

export default function JourneyMap() {
  const { focusOn, setFocusOn } = useFocusMode();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const didDragRef = useRef(false);
  const [viewMode, setViewMode] = useState<'vertical' | 'horizontal'>('vertical');
  const [mynaOpen, setMynaOpen] = useState(true);
  const [nodes, setNodes] = useState(() =>
    mapNodes.map((node) => ({ ...node, ...verticalNodePositions[node.id] }))
  );
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [dragging, setDragging] = useState<{ id: string; offsetX: number; offsetY: number; startX: number; startY: number } | null>(null);
  const HIT_SIZE = 54;
  const DOT_SIZE = 24;
  const selectedNode = selectedNodeId ? nodes.find((node) => node.id === selectedNodeId) : undefined;
  const selectedInfo = selectedNode ? nodeNotes[selectedNode.id] : undefined;

  const changeViewMode = (value: string) => {
    const nextMode = value as 'vertical' | 'horizontal';
    const positions = nextMode === 'vertical' ? verticalNodePositions : horizontalNodePositions;

    setViewMode(nextMode);
    setSelectedNodeId(null);
    setNodes(mapNodes.map((node) => ({ ...node, ...positions[node.id] })));
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

        const nextX = Math.min(
          bounds.width - 70,
          Math.max(20, clientX - bounds.left - dragging.offsetX)
        );
        const nextY = Math.min(
          bounds.height - 70,
          Math.max(105, clientY - bounds.top - dragging.offsetY)
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
      <Text size="12px" c="grayx.4" mb={6}>
        MYnd <span style={{ opacity: 0.5 }}>{'>'}</span>{' '}
        <b style={{ color: 'var(--mantine-color-grayx-9)' }}>Journey Map</b>
      </Text>

      <Group justify="space-between" align="flex-end" mb={16}>
        <Box>
          <Text size="26px" fw={800} c="grayx.9" lh={1.15}>
            Deine Journey Map
          </Text>
          <Text size="13px" c="grayx.5" mt={4}>
            Hallo User, hier siehst du deinen aktuellen Lernfortschritt und die naechsten Schritte.
          </Text>
        </Box>
      </Group>

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
        onClick={(event) => {
          const target = event.target as HTMLElement;
          if (!target.closest('[data-map-ui="true"]')) {
            setSelectedNodeId(null);
          }
        }}
        style={{
          position: 'relative',
          minHeight: viewMode === 'vertical' ? 820 : 560,
          overflow: 'hidden',
          boxShadow: '0 2px 16px rgba(60,90,140,0.08)',
          background: '#f8fafc',
        }}
      >
        <Group justify="space-between" mb={10}>
          <Group gap={10} data-map-ui="true">
            <Badge variant="filled" color="brand">Skilltree</Badge>
            <Badge variant="light" color="gray">{viewMode === 'vertical' ? 'Vertikal' : 'Horizontal'}</Badge>
            <Badge variant="light" color="orange">Myna aktiv</Badge>
          </Group>

          <Group gap={10} data-map-ui="true">
            <SegmentedControl
              size="xs"
              radius="md"
              value={viewMode}
              onChange={changeViewMode}
              data={[
                { label: 'Vertikal', value: 'vertical' },
                { label: 'Horizontal', value: 'horizontal' },
              ]}
            />

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

        <Paper
          radius="md"
          withBorder
          px={12}
          py={8}
          style={{
            position: 'absolute',
            top: 58,
            left: 20,
            zIndex: 2,
            background: 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(8px)',
          }}
          data-map-ui="true"
        >
          <Group gap={8} wrap="nowrap">
            <Badge size="xs" variant="light" color="brand">Tipp</Badge>
            <Text size="11px" c="grayx.6">
              Klicke eine Node fuer Details. Myna hilft dir, Inhalte zu finden und sinnvoll zu verknuepfen.
            </Text>
          </Group>
        </Paper>

        {(viewMode === 'vertical' ? [
          { label: 'Start', y: 111 },
          { label: 'Grundlagen', y: 211 },
          { label: 'Verknuepfung', y: 391 },
          { label: 'Vertiefung', y: 511 },
          { label: 'Advanced', y: 631 },
        ] : [
          { label: 'Basics', x: 145 },
          { label: 'Aktuell', x: 390 },
          { label: 'Naechste Schritte', x: 635 },
          { label: 'Advanced', x: 845 },
        ]).map((section) => (
          <Badge
            key={section.label}
            size="sm"
            variant="light"
            color="gray"
            style={{
              position: 'absolute',
              top: 'y' in section ? section.y : 96,
              left: 'x' in section ? section.x : 20,
              zIndex: 1,
              letterSpacing: '0.4px',
            }}
          >
            {section.label}
          </Badge>
        ))}

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

            const centerA = { x: na.x, y: na.y };
            const centerB = { x: nb.x, y: nb.y };

            return (
              <path
                key={idx}
                d={`M ${centerA.x} ${centerA.y} L ${centerB.x} ${centerB.y}`}
                stroke="rgba(30,41,59,0.48)"
                strokeWidth={2.25}
                fill="none"
                strokeDasharray="6 5"
                strokeLinecap="round"
              />
            );
          })}
        </Box>

        {nodes.map((n, index) => {
          const isDone = n.status === 'done';
          const isDoing = n.status === 'doing';
          const isTodo = n.status === 'todo';
          const isSelected = selectedNodeId === n.id;
          const isRecommended = focusOn && recommendedNodeIds.has(n.id);
          const status = statusConfig[n.status];
          const labelAbove = viewMode === 'vertical'
            ? ['html', 'cssb', 'resp', 'acss', 'mp'].includes(n.id)
            : index % 2 === 0;
          const opacity = focusOn ? (isTodo || isDoing ? 1 : 0.78) : 1;
          const dotColor = isRecommended ? '#ea580c' : status.dot;
          const dotSize = isSelected ? DOT_SIZE + 8 : isDoing ? DOT_SIZE + 4 : DOT_SIZE;
          const ringColor = isSelected
            ? 'rgba(249,115,22,0.28)'
            : isRecommended
              ? 'rgba(249,115,22,0.18)'
              : isDone
                ? 'rgba(34,197,94,0.16)'
                : isDoing
                  ? 'rgba(74,144,217,0.18)'
                  : 'rgba(148,163,184,0.14)';

          return (
            <Box
              key={n.id}
              component="button"
              type="button"
              data-map-ui="true"
              aria-label={`${n.label} oeffnen`}
              onPointerDown={(event) => {
                didDragRef.current = false;
                setSelectedNodeId(n.id);
                event.currentTarget.setPointerCapture(event.pointerId);
                if (!mapRef.current) return;
                const bounds = mapRef.current.getBoundingClientRect();
                setDragging({
                  id: n.id,
                  offsetX: event.clientX - bounds.left - n.x,
                  offsetY: event.clientY - bounds.top - n.y,
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
                if (!didDragRef.current) {
                  setSelectedNodeId(n.id);
                }
              }}
              style={{
                position: 'absolute',
                top: n.y - HIT_SIZE / 2,
                left: n.x - HIT_SIZE / 2,
                width: HIT_SIZE,
                height: HIT_SIZE,
                border: 0,
                padding: 0,
                background: 'transparent',
                outline: 'none',
                overflow: 'visible',
                opacity,
                zIndex: isSelected ? 3 : 1,
                cursor: dragging?.id === n.id ? 'grabbing' : 'grab',
                touchAction: 'none',
                userSelect: 'none',
              }}
            >
              <Box
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: dotSize,
                  height: dotSize,
                  borderRadius: 999,
                  transform: 'translate(-50%, -50%)',
                  background: dotColor,
                  border: '4px solid #fff',
                  boxShadow: `0 0 0 ${isSelected ? 8 : 6}px ${ringColor}, 0 12px 30px rgba(30,41,59,0.16)`,
                  transition: dragging?.id === n.id ? 'none' : 'width 140ms ease, height 140ms ease, box-shadow 140ms ease',
                }}
              />
              <Text
                size={isSelected ? '13px' : '12px'}
                fw={isSelected ? 850 : 750}
                c={isSelected ? 'orange.7' : 'grayx.8'}
                ta="center"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: labelAbove ? -30 : 40,
                  width: 170,
                  transform: 'translateX(-50%)',
                  lineHeight: 1.15,
                  letterSpacing: 0,
                  textShadow: '0 1px 0 rgba(255,255,255,0.95), 0 0 10px rgba(255,255,255,0.95)',
                  pointerEvents: 'none',
                }}
              >
                {n.label}
              </Text>
            </Box>
          );
        })}

        {selectedNode && selectedInfo && (
          <Paper
            radius="md"
            withBorder
            p={12}
            data-map-ui="true"
            style={{
              position: 'absolute',
              top: 118,
              right: 24,
              width: 270,
              zIndex: 3,
              borderColor: 'rgba(249,115,22,0.35)',
              boxShadow: '0 12px 42px rgba(60,90,140,0.16)',
              background: 'rgba(255,255,255,0.96)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Text size="10px" c="grayx.4" tt="uppercase" style={{ letterSpacing: '0.5px' }}>
              {selectedInfo.category} - {selectedInfo.level}
            </Text>
            <Text fw={800} mt={4} mb={6}>{selectedNode.label}</Text>
            <Group gap={6} mb={10}>
              <Badge variant="light" color={statusConfig[selectedNode.status].color}>
                {statusConfig[selectedNode.status].label}
              </Badge>
              {recommendedNodeIds.has(selectedNode.id) && (
                <Badge variant="light" color="orange">Empfohlen</Badge>
              )}
            </Group>
            <Text size="11px" c="grayx.6" lh={1.35} mb={8}>
              {selectedInfo.summary}
            </Text>
            <Box style={{ height: 6, background: 'var(--mantine-color-grayx-2)', borderRadius: 999, overflow: 'hidden' }}>
              <Box
                style={{
                  width: `${selectedInfo.progress}%`,
                  height: '100%',
                  background: selectedNode.status === 'done'
                    ? 'var(--mantine-color-green-5)'
                    : selectedNode.status === 'doing'
                      ? 'var(--mantine-color-brand-5)'
                      : 'var(--mantine-color-orange-5)',
                }}
              />
            </Box>
            <Text size="11px" c="grayx.4" mt={5} mb={8}>Progress: {selectedInfo.progress}%</Text>
            <Paper radius="md" p={8} mb={8} style={{ background: 'rgba(249,115,22,0.07)' }}>
              <Text size="10px" c="orange.7" fw={800} tt="uppercase" style={{ letterSpacing: '0.5px' }}>
                Next Best Action
              </Text>
              <Text size="12px" fw={700} mt={3}>{selectedInfo.action}</Text>
            </Paper>
            <Group gap={6} mb={8}>
              {selectedInfo.points.map((point) => (
                <Badge key={point} size="xs" variant="light" color="gray">
                  {point}
                </Badge>
              ))}
            </Group>
            <Button fullWidth radius="md" size="sm">
              {selectedNode.status === 'done' ? 'Review Node' : 'Start Node'}
            </Button>
          </Paper>
        )}

        <Paper
          radius="md"
          withBorder
          p={mynaOpen ? 12 : 10}
          data-map-ui="true"
          style={{
            position: 'absolute',
            top: selectedNode ? 438 : 118,
            right: 24,
            width: 270,
            zIndex: 3,
            borderColor: 'rgba(74,144,217,0.28)',
            boxShadow: '0 10px 34px rgba(60,90,140,0.12)',
            background: 'rgba(255,255,255,0.97)',
          }}
        >
          <Group gap={8} justify="space-between" mb={mynaOpen ? 10 : 0} wrap="nowrap">
            <Group gap={8} wrap="nowrap">
              <Box
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 999,
                  display: 'grid',
                  placeItems: 'center',
                  background: 'linear-gradient(135deg, #4a90d9, #2ebfa5)',
                  color: 'white',
                }}
              >
                <IconBrain size={17} />
              </Box>
              <Box>
                <Text fw={800} size="13px">Myna</Text>
                <Text size="10px" c="grayx.5">KI-Assistent fuer Inhalte</Text>
              </Box>
            </Group>
            <ActionIcon
              variant="subtle"
              color="gray"
              radius="md"
              aria-label={mynaOpen ? 'Myna einklappen' : 'Myna ausklappen'}
              onClick={() => setMynaOpen((open) => !open)}
            >
              {mynaOpen ? <IconMinus size={15} /> : <IconPlus size={15} />}
            </ActionIcon>
          </Group>

          {mynaOpen && (
            <>
              <TextInput
                leftSection={<IconSearch size={14} />}
                placeholder="Inhalte suchen..."
                radius="md"
                size="xs"
                mb={10}
              />

              <Paper radius="md" p={10} mb={10} style={{ background: 'rgba(74,144,217,0.08)' }}>
                <Group gap={7} mb={5}>
                  <IconMessageCircle size={14} color="var(--mantine-color-brand-6)" />
                  <Text size="11px" fw={800} c="brand.7">Vorschlag</Text>
                </Group>
                <Text size="11px" c="grayx.6" lh={1.45}>
                  Wenn du bei {selectedNode?.label ?? 'deinem Skilltree'} besser werden willst, verknuepfe zuerst PDF-Notizen mit einem kurzen Video.
                </Text>
              </Paper>

              <Stack gap={6}>
                {['Passende PDFs anzeigen', 'YouTube-Video verknuepfen', 'Podcast als Quelle finden'].map((item) => (
                  <Button key={item} size="xs" variant="default" radius="md" justify="flex-start">
                    {item}
                  </Button>
                ))}
              </Stack>
            </>
          )}
        </Paper>

        <Paper data-map-ui="true" radius="md" withBorder p={12} style={{ position: 'absolute', left: 20, bottom: 20, zIndex: 2 }}>
          <Stack gap={6}>
            {Object.values(statusConfig).map((item) => (
              <Group key={item.label} gap={8}>
                <Box style={{ width: 8, height: 8, borderRadius: 999, background: item.dot }} />
                <Text size="11px" c="grayx.6">{item.label}</Text>
              </Group>
            ))}
            <Group gap={8}>
              <Box style={{ width: 8, height: 8, borderRadius: 999, background: '#ea580c' }} />
              <Text size="11px" c="grayx.6">Empfohlen im Fokusmodus</Text>
            </Group>
          </Stack>
        </Paper>
      </Paper>

      <Box h={80} hiddenFrom="sm" />
    </Box>
  );
}
