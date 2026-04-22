import React from 'react';
import { Box, Group, Text, Paper, SimpleGrid, Image, Badge, SegmentedControl, ActionIcon } from '@mantine/core';
import { IconGridDots, IconList, IconSearch } from '@tabler/icons-react';
import { dummyImageSvg } from '../data/demo';

// Referenz: Bilder-Modus – rein visuell
export default function ImageMode() {
  const imgs = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    title: `Asset ${i + 1}`,
    status: i % 3 === 0 ? 'done' : i % 3 === 1 ? 'doing' : 'todo',
  }));

  const badge = (s: string) =>
    s === 'done' ? <Badge color="green" variant="light">abgeschlossen</Badge> :
    s === 'doing' ? <Badge color="brand" variant="light">in Bearbeitung</Badge> :
    <Badge color="gray" variant="light">noch offen</Badge>;

  return (
    <Box style={{ flex: 1, padding: 24, paddingLeft: 72 + 24, background: 'var(--mantine-color-grayx-0)', minHeight: 'calc(100vh - 60px)' }}>
      <Text size="12px" c="grayx.4" mb={16}>
        MYnd <span style={{ opacity: 0.5 }}>›</span>{' '}
        <b style={{ color: 'var(--mantine-color-grayx-9)' }}>Bilder-Modus</b>
      </Text>

      <Group justify="space-between" mb={14}>
        <Text style={{ fontFamily: 'DM Serif Display' }} size="22px" fw={700}>Assets</Text>
        <Group gap={10}>
          {/* rein visuell */}
          <Box style={{ pointerEvents: 'none' }}>
            <SegmentedControl
              data={[
                {
                  label: (
                    <Group gap={6} align="center">
                      <IconGridDots size={14} />
                      <span>Grid</span>
                    </Group>
                  ),
                  value: 'grid',
                },
                {
                  label: (
                    <Group gap={6} align="center">
                      <IconList size={14} />
                      <span>List</span>
                    </Group>
                  ),
                  value: 'list',
                },
              ]}
              value="grid"
              radius="md"
              styles={{
                root: {
                  background: 'var(--mantine-color-grayx-0)',
                  border: '1px solid var(--mantine-color-grayx-2)',
                },
              }}
            />
          </Box>

          <ActionIcon variant="default" radius="md">
            <IconSearch size={16} />
          </ActionIcon>
        </Group>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={12}>
        {imgs.map((it) => (
          <Paper key={it.id} withBorder radius="md" p={12} style={{ boxShadow: '0 2px 16px rgba(60,90,140,0.06)' }}>
            <Image radius="md" src={dummyImageSvg(800, 450)} alt="dummy" />
            <Group justify="space-between" mt={10}>
              <Text fw={700} size="13px">{it.title}</Text>
              {badge(it.status)}
            </Group>
            <Text size="11px" c="grayx.5" mt={4}>
              Lorem ipsum · 16:9 · 2.4 MB
            </Text>
          </Paper>
        ))}
      </SimpleGrid>

      <Box h={80} hiddenFrom="sm" />
    </Box>
  );
}