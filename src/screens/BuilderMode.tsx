import { Box, Paper, Text, Group, TextInput, Button, Stack, Badge, Select } from '@mantine/core';
import {
  IconChecklist,
  IconFileText,
  IconLink,
  IconPlus,
  IconSearch,
  IconVideo,
} from '@tabler/icons-react';

const builderNodes = [
  { id: 'html', label: 'HTML Basics', x: 80, y: 80, w: 150, status: 'done', tags: ['HTML', 'Beginner'] },
  { id: 'css', label: 'CSS Fundamentals', x: 285, y: 145, w: 190, status: 'active', tags: ['CSS', '100XP'] },
  { id: 'content', label: 'Add Content', x: 535, y: 145, w: 145, status: 'placeholder', tags: ['URL', 'PDF'] },
  { id: 'responsive', label: 'Responsive Design', x: 285, y: 255, w: 190, status: 'todo', tags: ['CSS', 'Intermediate'] },
  { id: 'advanced', label: 'Advanced CSS', x: 535, y: 270, w: 150, status: 'todo', tags: ['Advanced'] },
];

const builderEdges = [
  ['html', 'css'],
  ['css', 'content'],
  ['css', 'responsive'],
  ['responsive', 'advanced'],
] as const;

const nodeStyle = (status: string) => {
  if (status === 'done') {
    return {
      borderColor: 'var(--mantine-color-green-5)',
      background: '#fff',
      dot: 'var(--mantine-color-green-5)',
      shadow: '0 4px 18px rgba(34,197,94,0.12)',
    };
  }
  if (status === 'active') {
    return {
      borderColor: 'var(--mantine-color-brand-6)',
      background: 'rgba(74,144,217,0.10)',
      dot: 'var(--mantine-color-brand-6)',
      shadow: '0 0 0 5px rgba(74,144,217,0.10), 0 8px 26px rgba(60,90,140,0.14)',
    };
  }
  if (status === 'placeholder') {
    return {
      borderColor: 'rgba(249,115,22,0.45)',
      background: 'rgba(249,115,22,0.06)',
      dot: '#ea580c',
      shadow: '0 8px 24px rgba(249,115,22,0.10)',
    };
  }
  return {
    borderColor: 'rgba(100,120,160,0.26)',
    background: '#fff',
    dot: 'var(--mantine-color-grayx-4)',
    shadow: '0 4px 18px rgba(60,90,140,0.08)',
  };
};

export default function BuilderMode() {
  const getNode = (id: string) => builderNodes.find((node) => node.id === id)!;

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
        <b style={{ color: 'var(--mantine-color-grayx-9)' }}>Builder Mode</b>
      </Text>

      <Box
        style={{
          display: 'grid',
          gridTemplateColumns: '240px minmax(520px, 1fr) 300px',
          gap: 16,
          minHeight: 'calc(100vh - 60px - 24px - 24px - 30px)',
        }}
      >
        <Paper withBorder radius="md" p={14} style={{ overflow: 'auto' }}>
          <TextInput
            leftSection={<IconSearch size={14} />}
            placeholder="Nodes suchen..."
            radius="md"
            styles={{ input: { background: 'var(--mantine-color-grayx-0)' } }}
            mb={12}
          />

          <Button fullWidth radius="md" leftSection={<IconPlus size={14} />}>
            Create Node
          </Button>

          <Stack gap={10} mt={14}>
            {builderNodes.filter((node) => node.status !== 'placeholder').map((node) => {
              const visual = nodeStyle(node.status);

              return (
                <Paper
                  key={node.id}
                  withBorder
                  radius="md"
                  p={10}
                  style={{
                    background: node.status === 'active' ? 'rgba(74,144,217,0.10)' : 'var(--mantine-color-grayx-0)',
                    borderColor: visual.borderColor,
                  }}
                >
                  <Group gap={8} wrap="nowrap">
                    <Box style={{ width: 8, height: 8, borderRadius: 999, background: visual.dot }} />
                    <Box style={{ minWidth: 0 }}>
                      <Text size="12px" fw={700} truncate>{node.label}</Text>
                      <Text size="10px" c="grayx.4">
                        {node.status === 'active' ? 'Selected · editable' : node.status === 'done' ? 'Completed' : 'Draft node'}
                      </Text>
                    </Box>
                  </Group>
                  <Group gap={6} mt={7}>
                    {node.tags.map((tag) => (
                      <Badge key={tag} variant="light" color={tag === 'CSS' ? 'brand' : 'gray'} size="xs">
                        {tag}
                      </Badge>
                    ))}
                  </Group>
                </Paper>
              );
            })}
          </Stack>
        </Paper>

        <Paper
          withBorder
          radius="md"
          p={18}
          style={{
            position: 'relative',
            overflow: 'auto',
            background: '#fff',
            borderStyle: 'dashed',
            borderWidth: 2,
            borderColor: 'rgba(100,120,160,0.22)',
          }}
        >
          <Group justify="space-between" mb={12}>
            <Box>
              <Text fw={800}>Path Canvas</Text>
              <Text size="11px" c="grayx.5">Arrange nodes and connect learning steps.</Text>
            </Box>
            <Group gap={6}>
              <Badge variant="light" color="green">Completed</Badge>
              <Badge variant="light" color="brand">Selected</Badge>
              <Badge variant="light" color="orange">New content</Badge>
            </Group>
          </Group>

          <Box
            style={{
              position: 'relative',
              width: 720,
              height: 420,
              margin: '0 auto',
              backgroundImage: 'radial-gradient(circle, rgba(100,120,160,0.16) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              borderRadius: 12,
            }}
          >
            <Box
              component="svg"
              viewBox="0 0 720 420"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            >
              {builderEdges.map(([from, to]) => {
                const a = getNode(from);
                const b = getNode(to);
                const x1 = a.x + a.w;
                const y1 = a.y + 17;
                const x2 = b.x;
                const y2 = b.y + 17;
                const curve = Math.max(42, Math.min(90, Math.abs(x2 - x1) / 2));

                return (
                  <path
                    key={`${from}-${to}`}
                    d={`M ${x1} ${y1} C ${x1 + curve} ${y1} ${x2 - curve} ${y2} ${x2} ${y2}`}
                    stroke={to === 'content' ? 'rgba(249,115,22,0.42)' : 'rgba(74,144,217,0.36)'}
                    strokeWidth={to === 'content' ? 2 : 1.6}
                    strokeDasharray={to === 'content' ? '5 5' : undefined}
                    fill="none"
                    strokeLinecap="round"
                  />
                );
              })}
            </Box>

            {builderNodes.map((node) => {
              const visual = nodeStyle(node.status);

              return (
                <Paper
                  key={node.id}
                  radius={999}
                  withBorder
                  style={{
                    position: 'absolute',
                    top: node.y,
                    left: node.x,
                    width: node.w,
                    height: 34,
                    padding: '0 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    borderColor: visual.borderColor,
                    background: visual.background,
                    boxShadow: visual.shadow,
                  }}
                >
                  <Box style={{ width: 8, height: 8, borderRadius: 999, background: visual.dot }} />
                  <Text size="12px" fw={node.status === 'active' ? 800 : 650} truncate>
                    {node.label}
                  </Text>
                  {node.status === 'placeholder' && (
                    <IconPlus size={14} color="#ea580c" style={{ marginLeft: 'auto' }} />
                  )}
                </Paper>
              );
            })}
          </Box>
        </Paper>

        <Paper withBorder radius="md" p={14} style={{ overflow: 'auto' }}>
          <Text fw={800} mb={4}>Add Content</Text>
          <Text size="11px" c="grayx.5" mb={14}>
            Attach a source to the selected node and define how learners should work through it.
          </Text>

          <Stack gap={12}>
            <div>
              <Text size="11px" fw={700} c="grayx.5" tt="uppercase" style={{ letterSpacing: '0.6px' }}>
                Source
              </Text>
              <TextInput
                placeholder="URL, PDF oder Titel..."
                radius="md"
                styles={{ input: { background: 'var(--mantine-color-grayx-0)' } }}
              />
            </div>

            <div>
              <Text size="11px" fw={700} c="grayx.5" tt="uppercase" style={{ letterSpacing: '0.6px' }}>
                Category
              </Text>
              <Select
                data={['Web Basics', 'CSS', 'Mindset', 'Productivity']}
                defaultValue="CSS"
                radius="md"
                styles={{ input: { background: 'var(--mantine-color-grayx-0)' } }}
              />
            </div>

            <div>
              <Text size="11px" fw={700} c="grayx.5" tt="uppercase" style={{ letterSpacing: '0.6px' }}>
                Content Type
              </Text>
              <Stack gap={8} mt={6}>
                {[
                  { t: 'URL', bg: '#e8f5e9', icon: IconLink },
                  { t: 'Video', bg: '#fef2f2', icon: IconVideo },
                  { t: 'PDF', bg: '#fff7ed', icon: IconFileText },
                  { t: 'Checklist', bg: 'rgba(46,191,165,0.14)', icon: IconChecklist },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <Paper key={item.t} withBorder radius="md" p={10} style={{ background: 'var(--mantine-color-grayx-0)' }}>
                      <Group justify="space-between">
                        <Group gap={10}>
                          <Box style={{ width: 28, height: 28, borderRadius: 8, background: item.bg, display: 'grid', placeItems: 'center' }}>
                            <Icon size={15} />
                          </Box>
                          <Text size="13px" fw={600}>{item.t}</Text>
                        </Group>
                        <Text c="grayx.4">›</Text>
                      </Group>
                    </Paper>
                  );
                })}
              </Stack>
            </div>

            <Group gap={6}>
              <Badge variant="light" color="brand">CSS</Badge>
              <Badge variant="light" color="gray">Intermediate</Badge>
              <Badge variant="outline" color="gray">+ Add Tag</Badge>
            </Group>

            <Button radius="md" mt="auto">Attach to CSS Fundamentals</Button>
          </Stack>
        </Paper>
      </Box>

      <Box h={80} hiddenFrom="sm" />
    </Box>
  );
}
