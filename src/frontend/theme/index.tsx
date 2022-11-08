import {
  createTheme,
  CssBaseline,
  PaletteMode,
  StyledEngineProvider,
  ThemeOptions,
  ThemeProvider
} from '@mui/material';
import { ReactNode, useMemo, useState } from 'react';
import breakpoints from './breakpoints';
import palette from './palette';
import shadows, { customShadows } from './shadows';

import shape from './shape';
import typography from './typography';

// ----------------------------------------------------------------------

type ThemeConfigProps = {
  children: ReactNode;
};

export default function ThemeConfig({ children }: ThemeConfigProps) {
  const [isLight, setIsLight] = useState<PaletteMode>('dark');

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette:
        isLight === 'light'
          ? { ...palette.light, mode: 'light' }
          : { ...palette.dark, mode: 'dark' },
      shape,
      typography,
      breakpoints,
      shadows: isLight === 'light' ? shadows.light : shadows.dark,
      customShadows: isLight === 'light' ? customShadows.light : customShadows.dark
    }),
    [isLight]
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
