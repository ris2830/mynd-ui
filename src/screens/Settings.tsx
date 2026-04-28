import { Box, Group, Paper, Stack, Switch, Text, TextInput, Badge, Button } from '@mantine/core';
import { IconBell, IconMoon, IconUser } from '@tabler/icons-react';

export default function Settings() {
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
        <b style={{ color: 'var(--mantine-color-grayx-9)' }}>Einstellungen</b>
      </Text>

      <Group justify="space-between" mb={18}>
        <Box>
          <Text style={{ fontFamily: 'DM Serif Display' }} size="24px" fw={700}>
            Einstellungen
          </Text>
          <Text size="13px" c="grayx.5">
            Profil, Lernmodus und Benachrichtigungen fuer den Prototyp.
          </Text>
        </Box>
        <Badge color="brand" variant="light">Demo</Badge>
      </Group>

      <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 980 }}>
        <Paper withBorder radius="md" p={18} style={{ boxShadow: '0 2px 16px rgba(60,90,140,0.06)' }}>
          <Group gap={10} mb={14}>
            <IconUser size={18} color="var(--mantine-color-brand-6)" />
            <Text fw={800}>Profil</Text>
          </Group>
          <Stack gap={12}>
            <TextInput label="Name" defaultValue="User Interface" radius="md" />
            <TextInput label="Rolle" defaultValue="Student" radius="md" />
            <TextInput label="Aktueller Fokus" defaultValue="Responsive Design" radius="md" />
          </Stack>
        </Paper>

        <Paper withBorder radius="md" p={18} style={{ boxShadow: '0 2px 16px rgba(60,90,140,0.06)' }}>
          <Group gap={10} mb={14}>
            <IconBell size={18} color="var(--mantine-color-brand-6)" />
            <Text fw={800}>Lernpraeferenzen</Text>
          </Group>
          <Stack gap={14}>
            <Switch defaultChecked label="Fokusmodus automatisch vorschlagen" color="orange" />
            <Switch defaultChecked label="Taegliche Lern-Erinnerung" color="brand" />
            <Switch label="Nur empfohlene Nodes anzeigen" color="teal" />
          </Stack>
        </Paper>

        <Paper withBorder radius="md" p={18} style={{ boxShadow: '0 2px 16px rgba(60,90,140,0.06)' }}>
          <Group gap={10} mb={14}>
            <IconMoon size={18} color="var(--mantine-color-brand-6)" />
            <Text fw={800}>Darstellung</Text>
          </Group>
          <Stack gap={14}>
            <Switch label="Kompakte Journey Map" color="brand" />
            <Switch defaultChecked label="Status-Badges anzeigen" color="brand" />
            <Switch defaultChecked label="Details beim Auswaehlen rechts anzeigen" color="orange" />
          </Stack>
        </Paper>

        <Paper withBorder radius="md" p={18} style={{ boxShadow: '0 2px 16px rgba(60,90,140,0.06)' }}>
          <Text fw={800} mb={8}>Demo-Aktionen</Text>
          <Text size="13px" c="grayx.5" mb={14}>
            Diese Einstellungen sind fuer die Praesentation vorbereitet und noch nicht persistent.
          </Text>
          <Group>
            <Button radius="md">Speichern</Button>
            <Button radius="md" variant="default">Zuruecksetzen</Button>
          </Group>
        </Paper>
      </Box>
    </Box>
  );
}
