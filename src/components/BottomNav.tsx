import React from 'react';
import { Paper, Group, Text, UnstyledButton, Stack } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { IconMap2, IconRoute, IconListCheck, IconLayoutGrid } from '@tabler/icons-react';

// Referenz: Bottom Nav Mobile
export default function BottomNav() {
  const { pathname } = useLocation();
  const items = [
    { to: '/journey', label: 'Map', icon: IconMap2 },
    { to: '/note', label: 'Detail', icon: IconRoute },
    { to: '/learning', label: 'Pfade', icon: IconListCheck },
    { to: '/builder', label: 'Builder', icon: IconLayoutGrid },
  ];

  return (
    <Paper
      hiddenFrom="sm"
      radius={0}
      withBorder
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        zIndex: 120,
        background: 'white',
      }}
    >
      <Group justify="space-around" h="100%" px="md">
        {items.map((it) => {
          const active = pathname === it.to;
          const Icon = it.icon;

          return (
            <UnstyledButton key={it.to} component={Link} to={it.to}>
              <Stack gap={3} align="center">
                <Icon
                  size={20}
                  color={active ? 'var(--mantine-color-brand-6)' : 'var(--mantine-color-grayx-5)'}
                />
                <Text size="10px" c={active ? 'brand.6' : 'grayx.5'}>
                  {it.label}
                </Text>
              </Stack>
            </UnstyledButton>
          );
        })}
      </Group>
    </Paper>
  );
}