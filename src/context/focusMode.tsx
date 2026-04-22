import React, { createContext, useContext, useMemo, useState } from 'react';

type FocusModeCtx = {
  focusOn: boolean;
  setFocusOn: (v: boolean) => void;
  toggleFocus: () => void;
};

const Ctx = createContext<FocusModeCtx | null>(null);

export function FocusModeProvider({ children }: { children: React.ReactNode }) {
  const [focusOn, setFocusOn] = useState(true); // default = an

  const value = useMemo(
    () => ({
      focusOn,
      setFocusOn,
      toggleFocus: () => setFocusOn((v) => !v),
    }),
    [focusOn]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFocusMode() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useFocusMode must be used inside FocusModeProvider');
  return ctx;
}