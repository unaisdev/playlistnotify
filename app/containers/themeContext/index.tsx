import {APP_THEME, APP_THEME_TYPE} from '@app/features/commons/theme/types';
import {saveThemeOnStorage} from '@app/services/storage';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type ThemeContextType = {
  theme: APP_THEME_TYPE;
  toggleTheme: () => void;
  isDarkMode: boolean;
  setTheme: (theme: APP_THEME_TYPE) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: APP_THEME.LIGHT,
  toggleTheme: () => {},
  isDarkMode: false,
  setTheme: () => {},
});

export const ThemeProvider = ({children}: PropsWithChildren) => {
  const [theme, setTheme] = useState<APP_THEME_TYPE>(APP_THEME.DARK);

  useEffect(() => {

    const init = async () => {
      await saveThemeOnStorage(theme);
    };

    init();
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const putTheme = (theme: APP_THEME_TYPE) => {
    setTheme(theme);
  };

  const isDarkMode = theme === 'dark';

  const valuesProvider: ThemeContextType = {
    theme,
    toggleTheme: toggleTheme,
    isDarkMode: isDarkMode,
    setTheme: putTheme,
  };

  return (
    <ThemeContext.Provider value={valuesProvider}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const {theme, toggleTheme, isDarkMode, setTheme} = useContext(ThemeContext);
  return {theme, toggleTheme, isDarkMode, setTheme};
};
