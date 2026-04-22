import React from 'react';
import { Box, Group, Text, Paper, Badge, ActionIcon, Tabs, Button, Image, Stack } from '@mantine/core';
import { IconPencil, IconShare, IconChevronRight, IconPlayerPlay } from '@tabler/icons-react';
import { dummyImageSvg } from '../data/demo';

// Referenz: Node Detail View (Titel, Tags, Video, Tabs, Sidepanel)
export default function NoteDetailView() {
  return (
    <Box style={{ flex: 1, padding: 24, paddingLeft: 72 + 24, background: 'var(--mantine-color-grayx-0)', minHeight: 'calc(100vh - 60px)' }}>
      <Text size="12px" c="grayx.4" mb={16}>
        <span style={{ color: 'var(--mantine-color-brand-6)' }}>Journey Map</span>
        <span style={{ opacity: 0.5 }}> › </span>
        <b style={{ color: 'var(--mantine-color-grayx-9)' }}>CSS Fundamentals</b>
      </Text>

      <Box style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
        {/* Main */}
        <Box>
          <Paper withBorder radius="md" p={20} style={{ boxShadow: '0 2px 16px rgba(60,90,140,0.08)' }}>
            <Group justify="space-between" align="flex-start" mb={12}>
              <Box>
                <Group gap={6} mb={6}>
                  <Badge variant="light" color="brand">HTML</Badge>
                  <Badge variant="light" color="teal">CSS</Badge>
                  <Badge variant="light" color="gray">Beginner</Badge>
                </Group>

                <Text style={{ fontFamily: 'DM Serif Display' }} size="26px" fw={700} lh={1.2}>
                  CSS Fundamentals
                </Text>

                <Group gap={10} mt={10}>
                  <Badge variant="outline" color="gray">⏱ 10 min</Badge>
                  <Badge variant="outline" color="gray">◯ Beginner</Badge>
                  <Badge variant="light" color="yellow">⚡ +10 XP</Badge>
                </Group>
              </Box>

              <Group gap={8}>
                <ActionIcon variant="default" radius="md"><IconPencil size={15} /></ActionIcon>
                <ActionIcon variant="default" radius="md"><IconShare size={15} /></ActionIcon>
              </Group>
            </Group>

            {/* Video */}
            <Box style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', marginBottom: 14 }}>
              <Image src={dummyImageSvg(900, 506)} alt="video" />
              <Box style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.10) 100%)' }} />
              <Box
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 52,
                  height: 52,
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.20)',
                  border: '2px solid rgba(255,255,255,0.40)',
                  backdropFilter: 'blur(6px)',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <IconPlayerPlay size={18} color="white" />
              </Box>

              <Text size="11px" c="rgba(255,255,255,0.85)" style={{ position: 'absolute', right: 10, bottom: 10, fontWeight: 600 }}>
                7:06 · Watched Yesterday · 60%
              </Text>

              <Box style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 4, background: 'rgba(255,255,255,0.18)' }}>
                <Box style={{ width: '60%', height: '100%', background: 'var(--mantine-color-brand-4)' }} />
              </Box>
            </Box>

            {/* Tabs (rein visuell, keine Interaktion) */}
            <Box style={{ pointerEvents: 'none' }}>
              <Tabs defaultValue="video" variant="outline">
                <Tabs.List>
                  <Tabs.Tab value="video">Video</Tabs.Tab>
                  <Tabs.Tab value="checklist">Checklist</Tabs.Tab>
                  <Tabs.Tab value="notes">Notes</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="video" pt={12}>
                  <Text size="14px" c="grayx.6" lh={1.7}>
                    This tutorial covers the basics of responsive web design, including media queries, flexible layouts, and adaptive elements.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                </Tabs.Panel>
              </Tabs>
            </Box>

            {/* Path Nav */}
            <Group mt={18} pt={14} style={{ borderTop: '1px solid var(--mantine-color-grayx-2)', overflowX: 'auto' }} gap={8} wrap="nowrap">
              <Paper withBorder radius="md" px={12} py={6} style={{ background: 'var(--mantine-color-grayx-0)' }}>
                <Group gap={6} wrap="nowrap">
                  <Text size="11px">←</Text>
                  <Text size="11px">Back to Map</Text>
                </Group>
              </Paper>

              <Text c="grayx.4" size="12px">→</Text>

              <Paper withBorder radius="md" px={12} py={6} style={{ background: 'rgba(74,144,217,0.12)', borderColor: 'rgba(74,144,217,0.35)' }}>
                <Group gap={6} wrap="nowrap">
                  <Box style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--mantine-color-brand-6)' }} />
                  <Text size="11px" c="brand.7" fw={600}>CSS Fundamentals</Text>
                </Group>
              </Paper>

              <Text c="grayx.4" size="12px">→</Text>

              <Paper withBorder radius="md" px={12} py={6} style={{ background: 'var(--mantine-color-grayx-0)' }}>
                <Group gap={6} wrap="nowrap">
                  <Box style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--mantine-color-grayx-4)' }} />
                  <Text size="11px">Advanced CSS</Text>
                </Group>
              </Paper>

              <IconChevronRight size={14} color="var(--mantine-color-grayx-4)" />
            </Group>
          </Paper>
        </Box>

        {/* Side Panel */}
        <Stack gap={16}>
          <Paper withBorder radius="md" p={16} style={{ boxShadow: '0 2px 16px rgba(60,90,140,0.06)' }}>
            <Group justify="space-between" mb={10}>
              <Text size="11px" c="grayx.4" tt="uppercase" fw={800} style={{ letterSpacing: '0.8px' }}>Categories</Text>
              <Text c="grayx.4">⌄</Text>
            </Group>
            <Group gap={8} style={{ padding: '8px 10px', borderRadius: 10, background: 'rgba(46,191,165,0.14)', color: '#1a9a88', fontWeight: 600 }}>
              <Text>Mindfulness</Text>
              <Text c="grayx.4" ml="auto">›</Text>
            </Group>
          </Paper>

          <Paper withBorder radius="md" p={16} style={{ boxShadow: '0 2px 16px rgba(60,90,140,0.06)' }}>
            <Text size="11px" c="grayx.4" tt="uppercase" fw={800} style={{ letterSpacing: '0.8px' }} mb={10}>Related Nodes</Text>

            {[
              { title: 'HTML Basics', tags: ['HTML','Beginner'], progress: 100, color: 'green' as const },
              { title: 'Advanced CSS', tags: ['Beginner'], progress: 20, color: 'yellow' as const },
            ].map((r) => (
              <Paper key={r.title} withBorder radius="md" p={10} mb={8} style={{ background: 'var(--mantine-color-grayx-0)' }}>
                <Group justify="space-between" align="flex-start" wrap="nowrap">
                  <Box style={{ flex: 1 }}>
                    <Text fw={700} size="13px">{r.title}</Text>
                    <Group gap={6} mt={6}>
                      {r.tags.map(t => (
                        <Badge key={t} variant="light" color={t === 'HTML' ? 'brand' : 'gray'} size="xs">{t}</Badge>
                      ))}
                    </Group>
                    <Box style={{ height: 4, background: 'var(--mantine-color-grayx-2)', borderRadius: 999, overflow: 'hidden', marginTop: 8 }}>
                      <Box style={{ width: `${r.progress}%`, height: '100%', background: r.color === 'green' ? 'var(--mantine-color-green-5)' : 'var(--mantine-color-yellow-5)' }} />
                    </Box>
                  </Box>
                  <Text c="grayx.4">›</Text>
                </Group>
              </Paper>
            ))}
          </Paper>

          <Paper withBorder radius="md" p={16} style={{ boxShadow: '0 2px 16px rgba(60,90,140,0.06)' }}>
            <Text size="11px" c="grayx.4" tt="uppercase" fw={800} style={{ letterSpacing: '0.8px' }} mb={10}>Personal Insights</Text>
            <Paper radius="md" p={12} style={{ background: 'linear-gradient(135deg, rgba(74,144,217,0.10) 0%, rgba(46,191,165,0.12) 100%)' }}>
              <Text size="13px" c="grayx.6" lh={1.5}>
                How could this topic improve your work or life?
              </Text>
            </Paper>
            <Button variant="default" fullWidth mt={10}>+ Add Insight</Button>
          </Paper>

          <Button radius="md" fullWidth>Start Node</Button>
        </Stack>
      </Box>

      <Box h={80} hiddenFrom="sm" />
    </Box>
  );
}