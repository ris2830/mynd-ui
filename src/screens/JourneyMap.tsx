import React from 'react';
import { Box, Paper, Group, Text, SimpleGrid, Badge, Button, Switch, ActionIcon, Stack } from '@mantine/core';
import { IconTarget, IconWand, IconZoomIn } from '@tabler/icons-react';
import { mapEdges, mapNodes } from '../data/demo';
import { useFocusMode } from '../context/focusMode';

export default function JourneyMap() {
  const { focusOn, setFocusOn } = useFocusMode();
  const estNodeW = (label: string) => Math.min(260, Math.max(150, label.length * 7.2 + 64));
const NODE_H = 34; // ungefähr Höhe der Pill

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
    const na = mapNodes.find((n) => n.id === a)!;
    const nb = mapNodes.find((n) => n.id === b)!;

    const wa = estNodeW(na.label);
    const wb = estNodeW(nb.label);

    const forward = nb.x >= na.x;

    // Start/End: am linken/rechten Rand der Pill (nicht in der Mitte)
    const x1 = forward ? na.x + wa : na.x;
    const y1 = na.y + NODE_H / 2;

    const x2 = forward ? nb.x : nb.x + wb;
    const y2 = nb.y + NODE_H / 2;

    const dx = Math.max(80, Math.min(180, Math.abs(x2 - x1) / 2));
    const c1x = x1 + (forward ? dx : -dx);
    const c2x = x2 - (forward ? dx : -dx);

    return (
      <path
        key={idx}
        d={`M ${x1} ${y1} C ${c1x} ${y1} ${c2x} ${y2} ${x2} ${y2}`}
        stroke="rgba(100,120,160,0.22)"
        strokeWidth={1.6}
        fill="none"
        strokeDasharray="5 3"
      />
    );
  })}
</Box>

        {mapNodes.map((n) => {
          const isDone = n.status === 'done';
          const isDoing = n.status === 'doing';
          const isTodo = n.status === 'todo';

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
              radius={999}
              withBorder
              style={{
                position: 'absolute',
                top: n.y,
                left: n.x,
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 12,
                fontWeight: 600,
                borderColor,
                background: bg,
                boxShadow: glow,
                whiteSpace: 'nowrap',
                opacity,
                zIndex: 1,
              }}
            >
              <Box style={{ width: 8, height: 8, borderRadius: 999, background: dot }} />
              {n.label}
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