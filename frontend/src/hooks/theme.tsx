import React, { createContext, useCallback, useState, useContext, PropsWithChildren } from 'react';
import { ThemeProvider as Provider, DefaultTheme } from 'styled-components';
import defaultTheme from '../styles/themes/default';
//import api from '../services/api'

export class Theme {
    primary = '';
    secundary = '';
    background = '';
    text = '';
    info = '#ebf8ff';
    success = '#e6fffa';
    error = '#fddede';
    warn = '#fef3de';
}

interface ThemeContextData {
    changeTheme(theme: Theme): void;
    resetTheme(): void;
}

const themeContext = createContext<ThemeContextData>({} as ThemeContextData);

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [theme, setTheme] = useState<DefaultTheme>(defaultTheme);

    const changeTheme = useCallback((theme: Theme) => {
        setTheme(theme);
      }, []);

      const resetTheme = useCallback(() => {
        setTheme(defaultTheme);
      }, []);

    // useEffect(() => {
    //     api.get('/themes/getActiveTheme', {

    //     })
    // }, [])

    return (
        <themeContext.Provider value={{ changeTheme, resetTheme }}>
            <Provider theme={theme}>
                {children}
            </Provider>
        </themeContext.Provider>
    )
};

function useTheme(): ThemeContextData {
  const context = useContext(themeContext);

  if (!context) {
    throw new Error('useTheme must be used within an ThemeProvider');
  }

  return context;
}

export { ThemeProvider, useTheme };
