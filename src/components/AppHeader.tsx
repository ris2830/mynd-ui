 
import { Paper, Box, SegmentedControl, TextInput, ActionIcon, Avatar } from '@mantine/core';
import { IconSearch, IconBell, IconCalendar } from '@tabler/icons-react';

// Referenzbild: Header mit Tabs + Search + Icons
export default function AppHeader() {
  return (
    <Paper
      radius={0}
      withBorder
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 72 + 24,
        paddingRight: 24,
        gap: 16,
        boxShadow: '0 1px 8px rgba(60,90,140,0.05)',
        background: 'white',
      }}
    >
      <Box style={{ pointerEvents: 'none' }}>
        <SegmentedControl
          data={['Mindset', 'Productivity', 'Growth']}
          value="Mindset"
          radius="md"
          styles={{
            root: {
              background: 'var(--mantine-color-grayx-0)',
              border: '1px solid var(--mantine-color-grayx-2)',
            },
            control: { fontWeight: 500, fontSize: 12 },
          }}
        />
      </Box>

      <Box style={{ flex: 1 }} />

      <TextInput
        leftSection={<IconSearch size={14} />}
        placeholder="Nodes suchen…"
        w={220}
        radius="md"
        styles={{
          input: {
            background: 'var(--mantine-color-grayx-0)',
            borderColor: 'var(--mantine-color-grayx-2)',
          },
        }}
      />

      <ActionIcon variant="default" radius="md" size={34}>
        <IconBell size={16} />
      </ActionIcon>

      <ActionIcon variant="default" radius="md" size={34}>
        <IconCalendar size={16} />
      </ActionIcon>

      <Avatar
        radius="xl"
        size={32}
        style={{ background: 'linear-gradient(135deg, #4a90d9, #2ebfa5)' }}
      >
        MK
      </Avatar>
    </Paper>
  );
}