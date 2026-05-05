import { useState } from 'react';
import { Box, Group, Text, Paper, Badge, ActionIcon, Button, Stack, Tabs } from '@mantine/core';
import {
  IconBrain,
  IconBrandSpotify,
  IconBrandYoutube,
  IconChevronRight,
  IconDownload,
  IconExternalLink,
  IconFileTypePdf,
  IconMessageCircle,
  IconMinus,
  IconPencil,
  IconPlus,
  IconShare,
  IconVideo,
} from '@tabler/icons-react';

const materials = [
  {
    id: 'video',
    title: 'Responsive Design Grundlagen',
    type: 'YouTube',
    meta: 'YouTube - 7:06 min - 60% angesehen',
    status: 'In Bearbeitung',
    color: 'red' as const,
    icon: IconBrandYoutube,
    action: 'Video anschauen',
    detail: 'Kurzes Einstiegsvideo mit Fokus auf Breakpoints, flexible Layouts und typische CSS-Fehler.',
  },
  {
    id: 'pdf',
    title: 'CSS Box Model Cheatsheet',
    type: 'PDF',
    meta: 'PDF - 3 Seiten - Referenz',
    status: 'Gespeichert',
    color: 'orange' as const,
    icon: IconFileTypePdf,
    action: 'PDF herunterladen',
    detail: 'Kompakte Referenz zu Margin, Border, Padding und Content-Box. Gut zum Nachschlagen.',
  },
  {
    id: 'spotify',
    title: 'Layout Thinking Podcast',
    type: 'Spotify',
    meta: 'Spotify - Podcast - 18 min',
    status: 'Neu',
    color: 'teal' as const,
    icon: IconBrandSpotify,
    action: 'Podcast oeffnen',
    detail: 'Kurzer Audio-Impuls zu Layout-Denken, visueller Hierarchie und responsiven Entscheidungen.',
  },
];

const visualPositions = [
  { x: 170, y: 132, label: 'below' as const },
  { x: 550, y: 132, label: 'below' as const },
  { x: 170, y: 382, label: 'below' as const },
];

const topicNode = { x: 360, y: 258 };

type Material = (typeof materials)[number];

function MaterialsList({ selectedId, onSelect }: { selectedId: string; onSelect: (id: string) => void }) {
  return (
    <Stack gap={10}>
      {materials.map((item) => {
        const Icon = item.icon;
        const selected = selectedId === item.id;

        return (
          <Paper
            key={item.title}
            withBorder
            radius="md"
            p={12}
            onClick={() => onSelect(item.id)}
            style={{
              cursor: 'pointer',
              background: selected ? '#eef6ff' : 'var(--mantine-color-grayx-0)',
              borderColor: selected ? 'var(--mantine-color-brand-6)' : 'var(--mantine-color-grayx-2)',
              boxShadow: selected ? '0 0 0 3px rgba(74,144,217,0.10)' : undefined,
            }}
          >
            <Group justify="space-between" align="center" wrap="nowrap">
              <Group gap={10} wrap="nowrap" style={{ minWidth: 0 }}>
                <Box style={{ width: 38, height: 38, borderRadius: 9, background: 'white', display: 'grid', placeItems: 'center', border: '1px solid var(--mantine-color-grayx-2)' }}>
                  <Icon size={18} />
                </Box>
                <Box style={{ minWidth: 0 }}>
                  <Group gap={6} mb={3}>
                    <Badge size="xs" variant="light" color={item.color}>{item.type}</Badge>
                    <Badge size="xs" variant="outline" color="gray">{item.status}</Badge>
                  </Group>
                  <Text size="13px" fw={700} truncate>{item.title}</Text>
                  <Text size="11px" c="grayx.5">{item.meta}</Text>
                </Box>
              </Group>
              <ActionIcon variant="subtle" color="gray" radius="md">
                <IconDownload size={15} />
              </ActionIcon>
            </Group>
          </Paper>
        );
      })}
    </Stack>
  );
}

function MaterialDetail({ material }: { material: Material }) {
  const Icon = material.icon;

  return (
    <Paper withBorder radius="md" p={16} style={{ boxShadow: '0 2px 16px rgba(60,90,140,0.06)', borderColor: 'rgba(74,144,217,0.32)' }}>
      <Group gap={10} mb={10} wrap="nowrap">
        <Box style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--mantine-color-grayx-0)', display: 'grid', placeItems: 'center', border: '1px solid var(--mantine-color-grayx-2)' }}>
          <Icon size={19} />
        </Box>
        <Box style={{ minWidth: 0 }}>
          <Group gap={6} mb={3}>
            <Badge size="xs" color={material.color} variant="light">{material.type}</Badge>
            <Badge size="xs" color="gray" variant="outline">{material.status}</Badge>
          </Group>
          <Text fw={800} size="13px" truncate>{material.title}</Text>
        </Box>
      </Group>

      <Text size="12px" c="grayx.6" lh={1.45} mb={12}>
        {material.detail}
      </Text>

      {material.id === 'video' && (
        <Paper radius="md" p={10} mb={12} style={{ background: '#0f172a', color: 'white' }}>
          <Group justify="center" h={78}>
            <IconVideo size={24} />
            <Text size="12px" fw={700}>Video Preview</Text>
          </Group>
        </Paper>
      )}

      <Button
        fullWidth
        radius="md"
        leftSection={material.id === 'pdf' ? <IconDownload size={15} /> : <IconExternalLink size={15} />}
      >
        {material.action}
      </Button>
    </Paper>
  );
}

function VisualTopicMap({ selectedId, onSelect }: { selectedId: string; onSelect: (id: string) => void }) {
  return (
    <Box style={{ overflowX: 'auto' }}>
      <Box
        style={{
          position: 'relative',
          width: 720,
          height: 540,
          margin: '0 auto',
          borderRadius: 12,
          overflow: 'hidden',
          background: '#f8fafc',
          border: '1px solid var(--mantine-color-grayx-2)',
          backgroundImage: 'radial-gradient(circle, rgba(100,120,160,0.16) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      >
        <Box
          component="svg"
          viewBox="0 0 720 540"
          style={{ position: 'absolute', inset: 0, width: 720, height: 540, pointerEvents: 'none' }}
        >
          {visualPositions.map((pos, index) => {
            return (
              <path
                key={materials[index].title}
                d={`M ${topicNode.x} ${topicNode.y} L ${pos.x} ${pos.y}`}
                stroke="rgba(30,41,59,0.62)"
                strokeWidth={2.4}
                strokeDasharray="7 6"
                strokeLinecap="round"
              />
            );
          })}
        </Box>

        <Box
          style={{
            position: 'absolute',
            left: topicNode.x - 28,
            top: topicNode.y - 28,
            zIndex: 2,
            width: 56,
            height: 56,
            borderRadius: 999,
            display: 'grid',
            placeItems: 'center',
            background: '#111827',
            color: 'white',
            border: '5px solid #fff',
            boxShadow: '0 0 0 8px rgba(17,24,39,0.10), 0 14px 34px rgba(30,41,59,0.20)',
          }}
        >
          <Text size="13px" fw={900}>CSS</Text>
        </Box>

        <Text
          size="14px"
          fw={850}
          ta="center"
          c="grayx.9"
          style={{
            position: 'absolute',
            left: topicNode.x - 90,
            top: topicNode.y + 38,
            width: 180,
            lineHeight: 1.15,
            textShadow: '0 1px 0 rgba(255,255,255,0.95), 0 0 10px rgba(255,255,255,0.95)',
          }}
        >
          CSS Fundamentals
        </Text>

        {materials.map((item, index) => {
          const Icon = item.icon;
          const pos = visualPositions[index];
          const selected = selectedId === item.id;
          const iconColor =
            item.type === 'PDF' ? '#f97316'
              : item.type === 'Spotify' ? '#1db954'
                : '#ef4444';

          return (
            <Box
              key={item.title}
              component="button"
              type="button"
              aria-label={`${item.title} oeffnen`}
              onClick={() => onSelect(item.id)}
              style={{
                position: 'absolute',
                left: pos.x - 34,
                top: pos.y - 34,
                zIndex: 2,
                width: 68,
                height: 68,
                border: 0,
                padding: 0,
                borderRadius: 999,
                cursor: 'pointer',
                background: '#fff',
                overflow: 'visible',
                display: 'grid',
                placeItems: 'center',
                color: iconColor,
                boxShadow: selected
                  ? `0 0 0 7px ${item.type === 'PDF' ? 'rgba(249,115,22,0.16)' : item.type === 'Spotify' ? 'rgba(29,185,84,0.16)' : 'rgba(239,68,68,0.16)'}, 0 14px 34px rgba(30,41,59,0.18)`
                  : '0 0 0 5px rgba(148,163,184,0.12), 0 10px 28px rgba(30,41,59,0.12)',
                outline: 'none',
                transition: 'box-shadow 140ms ease, transform 140ms ease',
                transform: selected ? 'scale(1.06)' : 'scale(1)',
              }}
            >
              <Icon size={32} stroke={2.1} />
              <Text
                size="12px"
                fw={selected ? 850 : 750}
                ta="center"
                c={selected ? 'brand.7' : 'grayx.8'}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: pos.label === 'below' ? 78 : -38,
                  width: 160,
                  transform: 'translateX(-50%)',
                  lineHeight: 1.15,
                  textShadow: '0 1px 0 rgba(255,255,255,0.95), 0 0 10px rgba(255,255,255,0.95)',
                  pointerEvents: 'none',
                }}
              >
                {item.title}
              </Text>
              <Box
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: pos.label === 'below' ? 112 : -64,
                  transform: 'translateX(-50%)',
                  pointerEvents: 'none',
                  minWidth: item.type === 'PDF' ? 62 : 96,
                  padding: '5px 12px',
                  borderRadius: 999,
                  background: item.type === 'PDF' ? '#fff7ed' : item.type === 'Spotify' ? '#ecfdf5' : '#fef2f2',
                  border: `1px solid ${item.type === 'PDF' ? 'rgba(249,115,22,0.34)' : item.type === 'Spotify' ? 'rgba(29,185,84,0.34)' : 'rgba(239,68,68,0.34)'}`,
                  boxShadow: '0 5px 16px rgba(30,41,59,0.12)',
                }}
              >
                <Text
                  size="11px"
                  fw={850}
                  ta="center"
                  c={item.type === 'PDF' ? 'orange.7' : item.type === 'Spotify' ? 'teal.7' : 'red.7'}
                  style={{ lineHeight: 1, whiteSpace: 'nowrap' }}
                >
                  {item.type}
                </Text>
              </Box>
            </Box>
          );
        })}

       
      </Box>
    </Box>
  );
}

export default function NoteDetailView() {
  const [selectedMaterialId, setSelectedMaterialId] = useState(materials[0].id);
  const [mynaOpen, setMynaOpen] = useState(true);
  const selectedMaterial = materials.find((item) => item.id === selectedMaterialId) ?? materials[0];

  return (
    <Box className="myndPage">
      <Text size="12px" c="grayx.4" mb={6}>
        <span style={{ color: 'var(--mantine-color-brand-6)' }}>Skilltree</span>
        <span style={{ opacity: 0.5 }}> {'>'} </span>
        <b style={{ color: 'var(--mantine-color-grayx-9)' }}>CSS Fundamentals</b>
      </Text>

      <Box mb={16}>
        <Text size="26px" fw={800} c="grayx.9" lh={1.15}>
          Topic oeffnen
        </Text>
        <Text size="13px" c="grayx.5" mt={4}>
          Hallo User, hier findest du die gespeicherten Materialien und Verknuepfungen zu diesem Thema.
        </Text>
      </Box>

      <Box className="topicLayout">
        <Paper className="topicMainPanel" withBorder radius="md" p={20} style={{ boxShadow: '0 2px 16px rgba(60,90,140,0.08)' }}>
          <Group justify="space-between" align="flex-start" mb={16}>
            <Box>
              <Group gap={6} mb={6}>
                <Badge variant="filled" color="brand">Topic</Badge>
                <Badge variant="light" color="teal">CSS</Badge>
                <Badge variant="light" color="gray">Beginner</Badge>
              </Group>

              <Text size="28px" fw={800} lh={1.18} c="grayx.9">
                CSS Fundamentals
              </Text>

              <Text size="13px" c="grayx.5" mt={8}>
                Kurzer Ueberblick ueber die gespeicherten Materialien und die visuelle Verknuepfung dieses Topics.
              </Text>
            </Box>

            <Group gap={8}>
              <ActionIcon variant="default" radius="md"><IconPencil size={15} /></ActionIcon>
              <ActionIcon variant="default" radius="md"><IconShare size={15} /></ActionIcon>
            </Group>
          </Group>

          <Tabs defaultValue="visual" variant="outline" radius="md">
            <Tabs.List>
              <Tabs.Tab value="visual">Visuell</Tabs.Tab>
              <Tabs.Tab value="notes">Notizen</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="visual" pt={16}>
              <Paper radius="md" p={14} mb={14} style={{ background: 'rgba(74,144,217,0.08)' }}>
                <Text size="11px" c="brand.7" tt="uppercase" fw={800} style={{ letterSpacing: '0.7px' }} mb={6}>
                  Visuelle Sicht
                </Text>
                <Text size="13px" c="grayx.6" lh={1.6}>
                  Das Thema steht in der Mitte. Die gespeicherten Dateien rechts sind hier als direkte Verknuepfungen sichtbar.
                </Text>
              </Paper>
              <VisualTopicMap selectedId={selectedMaterialId} onSelect={setSelectedMaterialId} />
            </Tabs.Panel>

            <Tabs.Panel value="notes" pt={16}>
              <Paper radius="md" p={14} style={{ background: 'var(--mantine-color-grayx-0)' }}>
                <Text size="13px" c="grayx.6" lh={1.6}>
                  Eigene Notizen koennen hier spaeter gesammelt werden, z. B. wichtigste Regeln, offene Fragen oder Myna-Zusammenfassungen.
                </Text>
              </Paper>
            </Tabs.Panel>
          </Tabs>

          <Group mt={18} pt={14} style={{ borderTop: '1px solid var(--mantine-color-grayx-2)', overflowX: 'auto' }} gap={8} wrap="nowrap">
            <Paper withBorder radius="md" px={12} py={6} style={{ background: 'var(--mantine-color-grayx-0)' }}>
              <Group gap={6} wrap="nowrap">
                <Text size="11px">{'<'}</Text>
                <Text size="11px">Back to Skilltree</Text>
              </Group>
            </Paper>

            <Text c="grayx.4" size="12px">{'>'}</Text>

            <Paper withBorder radius="md" px={12} py={6} style={{ background: 'rgba(74,144,217,0.12)', borderColor: 'rgba(74,144,217,0.35)' }}>
              <Group gap={6} wrap="nowrap">
                <Box style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--mantine-color-brand-6)' }} />
                <Text size="11px" c="brand.7" fw={600}>CSS Fundamentals</Text>
              </Group>
            </Paper>

            <Text c="grayx.4" size="12px">{'>'}</Text>

            <Paper withBorder radius="md" px={12} py={6} style={{ background: 'var(--mantine-color-grayx-0)' }}>
              <Group gap={6} wrap="nowrap">
                <Box style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--mantine-color-grayx-4)' }} />
                <Text size="11px">Advanced CSS</Text>
              </Group>
            </Paper>

            <IconChevronRight size={14} color="var(--mantine-color-grayx-4)" />
          </Group>
        </Paper>

          <Stack className="topicRail" gap={16}>
          <Paper withBorder radius="md" p={16} style={{ boxShadow: '0 2px 16px rgba(60,90,140,0.06)' }}>
            <Group justify="space-between" mb={10}>
              <Text size="11px" c="grayx.4" tt="uppercase" fw={800} style={{ letterSpacing: '0.8px' }}>Gespeicherte Dateien</Text>
              <Badge size="xs" variant="light" color="brand">{materials.length}</Badge>
            </Group>
            <MaterialsList selectedId={selectedMaterialId} onSelect={setSelectedMaterialId} />
          </Paper>

          <MaterialDetail material={selectedMaterial} />

          <Paper withBorder radius="md" p={mynaOpen ? 16 : 12} style={{ boxShadow: '0 2px 16px rgba(60,90,140,0.06)', borderColor: 'rgba(74,144,217,0.28)' }}>
            <Group justify="space-between" mb={mynaOpen ? 12 : 0} wrap="nowrap">
              <Group gap={8} wrap="nowrap">
                <Box
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 999,
                    display: 'grid',
                    placeItems: 'center',
                    background: 'linear-gradient(135deg, #4a90d9, #2ebfa5)',
                    color: 'white',
                  }}
                >
                  <IconBrain size={18} />
                </Box>
                <Box>
                  <Text fw={800} size="14px">Myna</Text>
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
                <Paper radius="md" p={12} style={{ background: 'rgba(74,144,217,0.08)' }}>
                  <Group gap={7} mb={5}>
                    <IconMessageCircle size={14} color="var(--mantine-color-brand-6)" />
                    <Text size="11px" fw={800} c="brand.7">Vorschlag</Text>
                  </Group>
                  <Text size="13px" c="grayx.6" lh={1.5}>
                    Myna kann die gespeicherten Dateien zusammenfassen und passende naechste Quellen vorschlagen.
                  </Text>
                </Paper>
                <Button variant="default" fullWidth mt={10}>Myna fragen</Button>
              </>
            )}
          </Paper>

          <Button radius="md" fullWidth>Start Topic</Button>
        </Stack>
      </Box>

      <Box h={80} hiddenFrom="sm" />
    </Box>
  );
}
