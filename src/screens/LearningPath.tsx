import React from 'react';
import { Box, Group, Text, Paper, Button, Switch, Stack, Badge } from '@mantine/core';
import { IconPlus, IconSun } from '@tabler/icons-react';
import { paths } from '../data/demo';
import { useFocusMode } from '../context/focusMode';

const typeIcon = (t: string) => {
  switch (t) {
    case 'video': return '🎬';
    case 'book': return '📘';
    case 'quiz': return '❓';
    case 'pdf': return '📄';
    case 'checklist': return '✅';
    default: return '•';
  }
};

export default function LearningPath() {
  const { focusOn, setFocusOn } = useFocusMode();

  const statusBadge = (s: string) => {
    if (s === 'done') return <Badge color="green" variant="light">Erledigt</Badge>;
    if (s === 'doing') return <Badge color="brand" variant="light">In Bearbeitung</Badge>;
    return <Badge color="gray" variant="light">Noch offen</Badge>;
  };

  return (
    <Box style={{ flex: 1, padding: 24, paddingLeft: 72 + 24, background: 'var(--mantine-color-grayx-0)', minHeight: 'calc(100vh - 60px)' }}>
      <Text size="12px" c="grayx.4" mb={16}>
        MYnd <span style={{ opacity: 0.5 }}>›</span>{' '}
        <b style={{ color: 'var(--mantine-color-grayx-9)' }}>Lernpfade</b>
      </Text>

      <Group justify="space-between" mb={16}>
        <Text style={{ fontFamily: 'DM Serif Display' }} size="22px" fw={700}>Meine Lernpfade</Text>

        <Group gap={10}>
          {/* rein visuell: keine Interaktion */}
          <Box>
            <Switch
              checked={focusOn}
              onChange={(e) => setFocusOn(e.currentTarget.checked)}
              label={
                <Group gap={6} align="center">
                  <IconSun size={14} />
                  <span>Fokusmodus</span>
                </Group>
              }
              size="md"
              color="orange"
              styles={{
                label: { fontWeight: 700, color: focusOn ? '#ea580c' : undefined },
              }}
            />
          </Box>

          <Button variant="default" leftSection={<IconPlus size={14} />}>Neuer Pfad</Button>
        </Group>
      </Group>

      <Stack gap={16}>
        {paths.map((p) => (
          <Paper key={p.id} withBorder radius="md" style={{ overflow: 'hidden', boxShadow: '0 2px 16px rgba(60,90,140,0.08)' }}>
            <Group p={16} style={{ borderBottom: '1px solid var(--mantine-color-grayx-2)' }} gap={14} wrap="nowrap">
              <Box style={{ width: 40, height: 40, borderRadius: 10, display: 'grid', placeItems: 'center', background: 'rgba(74,144,217,0.12)', fontSize: 18 }}>
                {p.icon}
              </Box>

              <Box style={{ flex: 1 }}>
                <Text fw={700}>{p.title}</Text>
                <Text size="12px" c="grayx.5">{p.meta}</Text>
              </Box>

              <Box style={{ textAlign: 'right' }}>
                <Text fw={800} size="16px" c={p.id === 'mind' ? 'teal.5' : p.id === 'prod' ? 'grayx.4' : 'brand.6'}>
                  {p.progress}%
                </Text>
                <Text size="10px" c="grayx.4">abgeschlossen</Text>
              </Box>
            </Group>

            <Box p={16}>
              <Stack gap={10}>
                {p.sources.map((s) => {
                  const isTodo = s.status === 'todo';
                  const isDone = s.status === 'done';

                  const highlight = focusOn && isTodo;
                  const dim = focusOn && isDone;

                  return (
                    <Paper
                      key={s.id}
                      withBorder
                      radius="md"
                      p={12}
                      style={{
                        opacity: dim ? 0.4 : 1,
                        borderColor: highlight ? 'rgba(249,115,22,0.35)' : 'var(--mantine-color-grayx-2)',
                        background: highlight ? 'rgba(249,115,22,0.05)' : '#fff',
                      }}
                    >
                      <Group justify="space-between" align="flex-start" wrap="nowrap">
                        <Group gap={12} wrap="nowrap">
                          <Box
                            style={{
                              width: 22,
                              height: 22,
                              borderRadius: 999,
                              border: '2px solid',
                              borderColor:
                                s.status === 'done'
                                  ? 'var(--mantine-color-green-5)'
                                  : s.status === 'doing'
                                    ? 'var(--mantine-color-brand-6)'
                                    : 'rgba(100,120,160,0.30)',
                              background:
                                s.status === 'done'
                                  ? 'rgba(34,197,94,0.10)'
                                  : s.status === 'doing'
                                    ? 'rgba(74,144,217,0.12)'
                                    : 'transparent',
                              display: 'grid',
                              placeItems: 'center',
                              fontSize: 11,
                              color: s.status !== 'todo' ? 'inherit' : 'transparent',
                            }}
                          >
                            {s.status === 'done' ? '✓' : s.status === 'doing' ? '▶' : '•'}
                          </Box>

                          <Box
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: 8,
                              display: 'grid',
                              placeItems: 'center',
                              background:
                                s.type === 'video' ? '#fef2f2'
                                  : s.type === 'book' ? '#f0fdf4'
                                    : s.type === 'quiz' ? 'rgba(74,144,217,0.12)'
                                      : s.type === 'pdf' ? '#fff7ed'
                                        : 'rgba(46,191,165,0.14)',
                              fontSize: 16,
                            }}
                          >
                            {typeIcon(s.type)}
                          </Box>

                          <Box>
                            <Text fw={600} size="13px">{s.title}</Text>
                            <Text size="11px" c="grayx.5">{s.sub}</Text>
                          </Box>
                        </Group>

                        <Group gap={10} align="center" wrap="nowrap">
                          {statusBadge(s.status)}
                          {highlight && <Badge color="orange" variant="light">Fokus</Badge>}
                        </Group>
                      </Group>
                    </Paper>
                  );
                })}
              </Stack>
            </Box>
          </Paper>
        ))}
      </Stack>

      <Box h={80} hiddenFrom="sm" />
    </Box>
  );
}