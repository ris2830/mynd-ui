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
  html: { x: 520, y: 130 },
  cssb: { x: 520, y: 230 },
  dft: { x: 340, y: 310 },
  cssf: { x: 700, y: 310 },
  resp: { x: 520, y: 410 },
  lph: { x: 340, y: 530 },
  mr: { x: 700, y: 530 },
  acss: { x: 520, y: 650 },
  stoic: { x: 700, y: 650 },
  mp: { x: 880, y: 650 },
};

const horizontalNodePositions: Record<string, { x: number; y: number }> = {
  html: { x: 145, y: 135 },
  dft: { x: 145, y: 225 },
  cssf: { x: 145, y: 315 },
  cssb: { x: 390, y: 180 },
  resp: { x: 390, y: 275 },
  mr: { x: 635, y: 135 },
  lph: { x: 635, y: 315 },
  stoic: { x: 845, y: 125 },
  mp: { x: 845, y: 220 },
  acss: { x: 845, y: 350 },
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
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(() => new Set());
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [dragging, setDragging] = useState<{ id: string; offsetX: number; offsetY: number; startX: number; startY: number } | null>(null);
  const getNodeWidth = (label: string) => Math.min(260, Math.max(150, label.length * 7.2 + 64));
  const NODE_H = 34;
  const EXPANDED_NODE_H = 146;
  const getNodeHeight = (id: string) => (expandedNodes.has(id) ? EXPANDED_NODE_H : NODE_H);
  const selectedNode = selectedNodeId ? nodes.find((node) => node.id === selectedNodeId) : undefined;
  const selectedInfo = selectedNode ? nodeNotes[selectedNode.id] : undefined;

  const changeViewMode = (value: string) => {
    const nextMode = value as 'vertical' | 'horizontal';
    const positions = nextMode === 'vertical' ? verticalNodePositions : horizontalNodePositions;

    setViewMode(nextMode);
    setSelectedNodeId(null);
    setExpandedNodes(new Set());
    setNodes(mapNodes.map((node) => ({ ...node, ...positions[node.id] })));
  };

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
      <Text size="12px" c="grayx.4" mb={16}>
        MYnd <span style={{ opacity: 0.5 }}>{'>'}</span>{' '}
        <b style={{ color: 'var(--mantine-color-grayx-9)' }}>Journey Map</b>
      </Text>

      <Text size="22px" fw={800} mb={16} c="grayx.9">
        Hallo User
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
                stroke="rgba(30,41,59,0.42)"
                strokeWidth={2.1}
                fill="none"
                strokeDasharray="6 5"
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
          const isSelected = selectedNodeId === n.id;
          const isRecommended = focusOn && recommendedNodeIds.has(n.id);
          const note = nodeNotes[n.id];
          const nodeWidth = getNodeWidth(n.label);
          const nodeHeight = getNodeHeight(n.id);
          const status = statusConfig[n.status];

          const opacity = focusOn ? (isTodo || isDoing ? 1 : 0.35) : 1;

          const borderColor =
            isSelected ? 'var(--mantine-color-orange-5)'
              : isRecommended ? '#ea580c'
              : isDone ? 'var(--mantine-color-green-5)'
              : isDoing ? 'var(--mantine-color-brand-6)'
                : 'rgba(100,120,160,0.28)';

          const bg = isRecommended
            ? 'rgba(249,115,22,0.07)'
            : isDoing
              ? '#eef6ff'
              : '#fff';

          const dot = status.dot;

          const glow =
            isSelected
              ? '0 0 0 4px rgba(249,115,22,0.16), 0 12px 34px rgba(60,90,140,0.18)'
              : isRecommended
              ? '0 0 0 6px rgba(249,115,22,0.08), 0 8px 40px rgba(60,90,140,0.13)'
              : '0 2px 16px rgba(60,90,140,0.08)';

          return (
            <Paper
              key={n.id}
              radius={isExpanded ? 'md' : 999}
              withBorder
              data-map-ui="true"
              onPointerDown={(event) => {
                didDragRef.current = false;
                setSelectedNodeId(n.id);
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
                if (!didDragRef.current) {
                  setSelectedNodeId(n.id);
                }
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
                borderWidth: isSelected ? 2 : 1,
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
              {isSelected && (
                <Badge
                  size="xs"
                  color="orange"
                  variant="filled"
                  style={{ position: 'absolute', top: -11, right: 12, pointerEvents: 'none' }}
                >
                  Ausgewaehlt
                </Badge>
              )}

              <Group gap={8} wrap="nowrap" justify="space-between">
                <Group gap={8} wrap="nowrap" style={{ minWidth: 0 }}>
                  <Box style={{ width: 8, height: 8, borderRadius: 999, background: dot, flex: '0 0 auto' }} />
                  <Text size="12px" fw={700} truncate>{n.label}</Text>
                </Group>
                <ActionIcon
                  size={20}
                  radius="xl"
                  variant={isExpanded ? 'light' : 'subtle'}
                  color={isExpanded ? 'orange' : 'gray'}
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedNodeId(n.id);
                    toggleNode(n.id);
                  }}
                >
                  {isExpanded ? <IconMinus size={13} /> : <IconPlus size={13} />}
                </ActionIcon>
              </Group>

              {isExpanded && note && (
                <Box style={{ borderTop: '1px solid var(--mantine-color-grayx-2)', paddingTop: 8 }}>
                  <Group gap={6} mb={7}>
                    <Badge size="xs" variant="light" color={status.color}>
                      {status.label}
                    </Badge>
                    {isRecommended && (
                      <Badge size="xs" variant="light" color="orange">
                        Empfohlen
                      </Badge>
                    )}
                  </Group>
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
