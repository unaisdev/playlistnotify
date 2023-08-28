import {APP_THEME, APP_THEME_TYPE} from '@app/features/commons/theme/types';
import {PropsWithChildren, createContext, useContext, useState} from 'react';

type ThemeContextType = {
  theme: APP_THEME_TYPE;
  toggleTheme: () => void;
  isDarkMode: boolean;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: APP_THEME.DEFAULT,
  toggleTheme: () => {},
  isDarkMode: false,
});

export const ThemeProvider = ({children}: PropsWithChildren) => {
  const [theme, setTheme] = useState<APP_THEME_TYPE>(APP_THEME.DEFAULT);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'default' : 'dark'));
  };

  const isDarkMode = theme === 'dark';

  const valuesProvider: ThemeContextType = {
    theme,
    toggleTheme: toggleTheme,
    isDarkMode: isDarkMode,
  };

  return (
    <ThemeContext.Provider value={valuesProvider}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const {theme, toggleTheme, isDarkMode} = useContext(ThemeContext);
  return {theme, toggleTheme, isDarkMode};
};
