import { useState } from 'react';
import { Box, Group, Text, Paper, Badge, ActionIcon, Button, Stack, Tabs } from '@mantine/core';
import {
  IconBrain,
  IconBrandYoutube,
  IconChevronRight,
  IconDownload,
  IconExternalLink,
  IconFileText,
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
    type: 'Video',
    meta: 'YouTube - 7:06 min - 60% angesehen',
    status: 'In Bearbeitung',
    color: 'brand' as const,
    icon: IconVideo,
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
    icon: IconFileText,
    action: 'PDF herunterladen',
    detail: 'Kompakte Referenz zu Margin, Border, Padding und Content-Box. Gut zum Nachschlagen.',
  },
  {
    id: 'youtube',
    title: 'CSS Grid Crashkurs',
    type: 'YouTube',
    meta: 'Weblink - youtube.com - 14 min',
    status: 'Neu',
    color: 'red' as const,
    icon: IconBrandYoutube,
    action: 'Weblink oeffnen',
    detail: 'Externer YouTube-Link fuer ein tieferes Beispiel zu CSS Grid und responsiven Kartenlayouts.',
  },
];

const visualPositions = [
  { x: 58, y: 92 },
  { x: 492, y: 92 },
  { x: 255, y: 348 },
];

const topicNode = { x: 250, y: 216, w: 220, h: 70 };
const materialCard = { w: 210, h: 78 };

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
          width: 760,
          height: 500,
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
          viewBox="0 0 760 500"
          style={{ position: 'absolute', inset: 0, width: 760, height: 500, pointerEvents: 'none' }}
        >
          {visualPositions.map((pos, index) => {
            const fromX = topicNode.x + topicNode.w / 2;
            const fromY = topicNode.y + topicNode.h / 2;
            const toX = pos.x + materialCard.w / 2;
            const toY = pos.y + materialCard.h / 2;

            return (
              <path
                key={materials[index].title}
                d={`M ${fromX} ${fromY} L ${toX} ${toY}`}
                stroke="rgba(30,41,59,0.58)"
                strokeWidth={2.6}
                strokeDasharray="6 5"
                strokeLinecap="round"
              />
            );
          })}
        </Box>

        <Paper
          radius={999}
          withBorder
          style={{
            position: 'absolute',
            left: topicNode.x,
            top: topicNode.y,
            zIndex: 2,
            width: topicNode.w,
            height: topicNode.h,
            display: 'grid',
            placeItems: 'center',
            borderColor: 'var(--mantine-color-brand-6)',
            boxShadow: '0 0 0 6px rgba(74,144,217,0.10), 0 8px 28px rgba(60,90,140,0.14)',
            background: '#fff',
          }}
        >
          <Text size="13px" fw={800}>CSS Fundamentals</Text>
        </Paper>

        {materials.map((item, index) => {
          const Icon = item.icon;
          const pos = visualPositions[index];
          const selected = selectedId === item.id;

          return (
            <Paper
              key={item.title}
              radius="md"
              withBorder
              p={12}
              onClick={() => onSelect(item.id)}
              style={{
                position: 'absolute',
                left: pos.x,
                top: pos.y,
                zIndex: 2,
                width: materialCard.w,
                minHeight: materialCard.h,
                cursor: 'pointer',
                background: selected ? '#eef6ff' : '#fff',
                borderColor: selected ? 'var(--mantine-color-brand-6)' : 'var(--mantine-color-grayx-2)',
                boxShadow: selected
                  ? '0 0 0 4px rgba(74,144,217,0.12), 0 10px 26px rgba(60,90,140,0.16)'
                  : '0 5px 20px rgba(60,90,140,0.10)',
              }}
            >
              <Group gap={8} wrap="nowrap">
                <Box style={{ width: 34, height: 34, borderRadius: 9, background: '#fff', display: 'grid', placeItems: 'center', border: '1px solid var(--mantine-color-grayx-2)' }}>
                  <Icon size={18} />
                </Box>
                <Box style={{ minWidth: 0 }}>
                  <Badge size="xs" variant="light" color={item.color}>{item.type}</Badge>
                  <Text size="12px" fw={800} truncate>{item.title}</Text>
                  <Text size="10px" c="grayx.5" truncate>{item.meta}</Text>
                </Box>
              </Group>
            </Paper>
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
      <Text size="12px" c="grayx.4" mb={16}>
        <span style={{ color: 'var(--mantine-color-brand-6)' }}>Skilltree</span>
        <span style={{ opacity: 0.5 }}> {'>'} </span>
        <b style={{ color: 'var(--mantine-color-grayx-9)' }}>CSS Fundamentals</b>
      </Text>

      <Text className="myndPageTitle" size="22px" fw={800} mb={16} c="grayx.9">
        Hallo User
      </Text>

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
