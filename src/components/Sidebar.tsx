 
import { Box, Group, Text, Stack, NavLink as MNavLink, Paper, Avatar, Image } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { IconRoute, IconMap2, IconLayoutGrid, IconListCheck, IconSettings } from '@tabler/icons-react';
import logo from '../assets/logo.png';

// Referenzbild: Sidebar schmal, on-hover aufklappen (global.css)
export default function Sidebar() {
  const { pathname } = useLocation();

  const links = [
    { to: '/journey', label: 'Journey Map', icon: IconMap2 },
    { to: '/note', label: 'Node Detail', icon: IconRoute },
    { to: '/learning', label: 'Lernpfade', icon: IconListCheck },
    { to: '/builder', label: 'Builder Mode', icon: IconLayoutGrid },
  ];

  return (
    <Box style={{ position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 100 }}>
      <Paper
        className="myndSidebar"
        radius={0}
        style={{
          position: 'absolute',
          inset: 0,
          borderRight: '1px solid var(--mantine-color-grayx-2)',
          boxShadow: '0 2px 16px rgba(60,90,140,0.08)',
          background: 'white',
        }}
      >
        <Stack gap={6} p={12} h="100%">
          <Group gap={10} h={48} px={6} wrap="nowrap">
            <Image
  src={logo}
  alt="MYnd Logo"
  w={36}
  h={36}
  fit="contain"
  radius={10}
/>

            <Box className="myndSidebarLogoText" style={{ lineHeight: 1.1 }}>
              <Text fw={700} style={{ fontFamily: 'DM Serif Display' }}>MYnd</Text>
              <Text size="10px" c="grayx.4" tt="uppercase" style={{ letterSpacing: '0.8px' }}>
                Train your Brain
              </Text>
            </Box>
          </Group>

          <Box style={{ height: 8 }} />

          <Stack gap={4} style={{ flex: 1 }}>
            {links.map((l) => {
              const active =
                pathname === l.to || (pathname === '/' && l.to === '/learning');
              const Icon = l.icon;

              return (
                <MNavLink
                  key={l.to}
                  component={Link}
                  to={l.to}
                  active={active}
                  label={
                    <Text className="myndSidebarLabel" size="sm" fw={500}>
                      {l.label}
                    </Text>
                  }
                  leftSection={<Icon size={20} />}
                  styles={{
                    root: {
                      borderRadius: 0,
                      padding: '10px 12px',
                      color: 'var(--mantine-color-grayx-5)',
                    },
                    section: {
                      color: active
                        ? 'var(--mantine-color-brand-6)'
                        : 'var(--mantine-color-grayx-5)',
                    },
                  }}
                  style={{
                    position: 'relative',
                    background: active ? 'rgba(74,144,217,0.12)' : undefined,
                  }}
                />
              );
            })}
          </Stack>

          <Box>
            <MNavLink
              component={Link}
              to="/settings"
              active={pathname === '/settings'}
              label={
                <Text className="myndSidebarLabel" size="sm" fw={500}>
                  Einstellungen
                </Text>
              }
              leftSection={<IconSettings size={20} />}
              styles={{
                root: { padding: '10px 12px' },
                section: {
                  color: pathname === '/settings'
                    ? 'var(--mantine-color-brand-6)'
                    : 'var(--mantine-color-grayx-5)',
                },
              }}
            />

            <Group justify="center" mt={10}>
              <Avatar
                radius="xl"
                size={36}
                style={{
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #4a90d9, #2ebfa5)',
                }}
              >
                UI
              </Avatar>
              <Box className="myndSidebarLabel" style={{ lineHeight: 1.1 }}>
                <Text fw={700} size="sm">User Interface</Text>
                <Text size="xs" c="grayx.4">Student</Text>
              </Box>
            </Group>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}