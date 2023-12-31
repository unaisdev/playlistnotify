import {useThemeContext} from '@app/containers/ThemeContext';

export function useTheme() {
  const context = useThemeContext();

  if (!context) {
    throw new Error('useTheme must be used wrapped inside <ThemeProvider>');
  }

  return context;
}
