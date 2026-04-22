
import { MantineProvider, AppShell } from '@mantine/core';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { theme } from './theme';

import Sidebar from './components/Sidebar';
import AppHeader from './components/AppHeader';
import BottomNav from './components/BottomNav';

import JourneyMap from './screens/JourneyMap';
import NoteDetailView from './screens/NoteDetailView';
import LearningPath from './screens/LearningPath';
import BuilderMode from './screens/BuilderMode';

import { FocusModeProvider } from './context/focusMode';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <FocusModeProvider>
        <HashRouter>
          <Sidebar />
          <AppHeader />

          <AppShell
            header={{ height: 60 }}
            navbar={{ width: 72, breakpoint: 'sm', collapsed: { mobile: true } }}
            padding={0}
            styles={{ main: { padding: 0 } }}
          >
            <AppShell.Main>
              <Routes>
                <Route path="/" element={<Navigate to="/learning" replace />} />
                <Route path="/journey" element={<JourneyMap />} />
                <Route path="/note" element={<NoteDetailView />} />
                <Route path="/learning" element={<LearningPath />} />
                <Route path="/builder" element={<BuilderMode />} />
                <Route path="/settings" element={<LearningPath />} />
              </Routes>
            </AppShell.Main>
          </AppShell>

          <BottomNav />
        </HashRouter>
      </FocusModeProvider>
    </MantineProvider>
  );
}