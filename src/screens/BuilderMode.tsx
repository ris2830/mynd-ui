
import { Box, Paper, Text, Group, TextInput, Button, Stack, Badge, Select } from '@mantine/core';
import { IconSearch, IconPlus } from '@tabler/icons-react';

// Referenz: Builder Mode (links Liste, Mitte Canvas, rechts Panel) – rein visuell
export default function BuilderMode() {
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
          gridTemplateColumns: '220px 1fr 300px',
          gap: 16,
          height: 'calc(100vh - 60px - 24px - 24px - 30px)',
        }}
      >
        {/* Left */}
        <Paper withBorder radius="md" p={14} style={{ overflow: 'auto' }}>
          <TextInput
            leftSection={<IconSearch size={14} />}
            placeholder="Nodes suchen…"
            radius="md"
            styles={{ input: { background: 'var(--mantine-color-grayx-0)' } }}
            mb={12}
          />

          <Button fullWidth radius="md" leftSection={<IconPlus size={14} />}>
            Create Node
          </Button>

          <Stack gap={10} mt={14}>
            <Paper withBorder radius="md" p={10} style={{ background: 'var(--mantine-color-grayx-0)' }}>
              <Text size="12px" fw={700}>HTML Basics</Text>
              <Text size="10px" c="grayx.4">Beginner · Beginner</Text>
              <Group gap={6} mt={6}>
                <Badge variant="light" color="brand" size="xs">HTML</Badge>
                <Badge variant="light" color="teal" size="xs">CSS</Badge>
                <Badge variant="light" color="gray" size="xs">Beginner</Badge>
              </Group>
            </Paper>

            <Paper
              withBorder
              radius="md"
              p={10}
              style={{
                background: 'rgba(74,144,217,0.10)',
                borderColor: 'rgba(74,144,217,0.35)',
              }}
            >
              <Text size="12px" fw={700} c="brand.7">CSS Fundamentals</Text>
              <Text size="10px" c="grayx.4">Activatable · 100XP</Text>
              <Group gap={6} mt={6}>
                <Badge variant="light" color="brand" size="xs">HTML</Badge>
                <Badge variant="light" color="teal" size="xs">CSS</Badge>
                <Badge variant="light" color="gray" size="xs">Beginner</Badge>
              </Group>
            </Paper>

            <Paper withBorder radius="md" p={10} style={{ background: 'var(--mantine-color-grayx-0)' }}>
              <Text size="12px" fw={700}>Intro to JavaScript</Text>
              <Text size="10px" c="grayx.4">Advance · Beginner</Text>
              <Group gap={6} mt={6}>
                <Badge variant="light" color="brand" size="xs">HTML</Badge>
                <Badge variant="light" color="teal" size="xs">CSS</Badge>
              </Group>
            </Paper>

            <Paper withBorder radius="md" p={10} style={{ background: 'var(--mantine-color-grayx-0)' }}>
              <Text size="12px" fw={700}>Advanced CSS</Text>
              <Text size="10px" c="grayx.4">Intermediate · 25 min</Text>
              <Group gap={6} mt={6}>
                <Badge variant="light" color="brand" size="xs">CSS</Badge>
                <Badge variant="light" color="gray" size="xs">Intermediate</Badge>
              </Group>
            </Paper>
          </Stack>
        </Paper>

        {/* Canvas */}
        <Paper
          withBorder
          radius="md"
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: 'var(--mantine-color-grayx-0)',
            borderStyle: 'dashed',
            borderWidth: 2,
            borderColor: 'rgba(100,120,160,0.22)',
          }}
        >
          {/* dotted background */}
          <Box
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(circle, rgba(100,120,160,0.18) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              opacity: 0.55,
            }}
          />

          {/* connectors */}
          <Box
            component="svg"
            viewBox="0 0 500 460"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          >
            <path d="M 120 120 C 160 120 190 150 220 160" stroke="rgba(74,144,217,0.30)" strokeWidth="1.5" fill="none" strokeDasharray="6 3"/>
            <path d="M 220 160 C 270 160 300 190 320 190" stroke="rgba(74,144,217,0.55)" strokeWidth="2" fill="none"/>
            <path d="M 320 190 C 360 190 390 240 400 240" stroke="rgba(100,120,160,0.22)" strokeWidth="1.5" fill="none" strokeDasharray="6 3"/>
            <path d="M 320 190 C 350 160 370 130 400 120" stroke="rgba(100,120,160,0.22)" strokeWidth="1.5" fill="none" strokeDasharray="6 3"/>
          </Box>

          {/* nodes */}
          <Paper radius={999} withBorder style={{ position: 'absolute', top: 100, left: 60, padding: '8px 14px', display: 'flex', gap: 8, alignItems: 'center' }}>
            <Box style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--mantine-color-green-5)' }} />
            <Text size="12px" fw={600}>HTML Basics</Text>
          </Paper>

          <Paper
            radius={999}
            withBorder
            style={{
              position: 'absolute',
              top: 140,
              left: 175,
              padding: '8px 14px',
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              background: 'rgba(74,144,217,0.10)',
              borderColor: 'rgba(74,144,217,0.35)',
            }}
          >
            <Box style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--mantine-color-brand-6)' }} />
            <Text size="12px" fw={700} c="brand.7">CSS Fundamentals</Text>
            <Box style={{ marginLeft: 6, opacity: 0.6 }}>＋</Box>
          </Paper>

          <Paper
            radius={999}
            withBorder
            style={{
              position: 'absolute',
              top: 170,
              left: 320,
              padding: '8px 14px',
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              borderStyle: 'dashed',
              color: 'var(--mantine-color-grayx-4)',
              background: 'transparent',
            }}
          >
            ＋ <Text size="12px" fw={600} c="grayx.4">Add Content</Text>
          </Paper>

          <Paper radius={999} withBorder style={{ position: 'absolute', top: 100, left: 340, padding: '8px 14px', display: 'flex', gap: 8, alignItems: 'center' }}>
            <Box style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--mantine-color-grayx-4)' }} />
            <Text size="12px" fw={600}>Advanced CSS</Text>
          </Paper>

          <Paper radius={999} withBorder style={{ position: 'absolute', top: 220, left: 340, padding: '8px 14px', display: 'flex', gap: 8, alignItems: 'center' }}>
            <Box style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--mantine-color-grayx-4)' }} />
            <Text size="12px" fw={600}>Advanced…</Text>
          </Paper>

          <Text
            size="11px"
            c="grayx.4"
            tt="uppercase"
            fw={600}
            style={{
              position: 'absolute',
              bottom: 14,
              left: '50%',
              transform: 'translateX(-50%)',
              letterSpacing: '0.8px',
            }}
          >
            UX/UI Design Moodboard
          </Text>
        </Paper>

        {/* Right */}
        <Paper withBorder radius="md" p={14} style={{ overflow: 'auto' }}>
          <Text fw={700} mb={12}>Add Content</Text>

          <Stack gap={12}>
            <div>
              <Text size="11px" fw={700} c="grayx.5" tt="uppercase" style={{ letterSpacing: '0.6px' }}>
                Add Content
              </Text>
              <TextInput
                placeholder="Content URL oder Titel…"
                radius="md"
                styles={{ input: { background: 'var(--mantine-color-grayx-0)' } }}
              />
            </div>

            <div>
              <Text size="11px" fw={700} c="grayx.5" tt="uppercase" style={{ letterSpacing: '0.6px' }}>
                Category
              </Text>
              <Select
                data={['Mindfulness', 'Productivity', 'Growth']}
                defaultValue="Mindfulness"
                radius="md"
                styles={{ input: { background: 'var(--mantine-color-grayx-0)' } }}
              />
            </div>

            <div>
              <Text size="11px" fw={700} c="grayx.5" tt="uppercase" style={{ letterSpacing: '0.6px' }}>
                Tags
              </Text>
              <Group gap={6}>
                <Badge variant="light" color="brand">Beginner</Badge>
                <Badge variant="light" color="teal">+Boo…</Badge>
                <Badge variant="outline" color="gray">+ Add Tag</Badge>
              </Group>
            </div>

            <div>
              <Text size="11px" fw={700} c="grayx.5" tt="uppercase" style={{ letterSpacing: '0.6px' }}>
                Content Type
              </Text>
              <Stack gap={8} mt={6}>
                {[
                  { t: 'URL', bg: '#e8f5e9', ico: '🔗' },
                  { t: 'Video', bg: '#fef2f2', ico: '🎬' },
                  { t: 'PDF', bg: '#fff7ed', ico: '📄' },
                  { t: 'Checklist', bg: 'rgba(46,191,165,0.14)', ico: '✅' },
                ].map((x) => (
                  <Paper key={x.t} withBorder radius="md" p={10} style={{ background: 'var(--mantine-color-grayx-0)' }}>
                    <Group justify="space-between">
                      <Group gap={10}>
                        <Box style={{ width: 28, height: 28, borderRadius: 8, background: x.bg, display: 'grid', placeItems: 'center' }}>
                          {x.ico}
                        </Box>
                        <Text size="13px" fw={600}>{x.t}</Text>
                      </Group>
                      <Text c="grayx.4">›</Text>
                    </Group>
                  </Paper>
                ))}
              </Stack>
            </div>

            <Button radius="md" mt="auto">Start Node</Button>
          </Stack>
        </Paper>
      </Box>

      <Box h={80} hiddenFrom="sm" />
    </Box>
  );
}