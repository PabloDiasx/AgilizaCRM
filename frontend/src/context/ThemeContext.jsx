import React, { createContext, useContext, useState, useLayoutEffect } from 'react';

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

// Aplica o tema imediatamente antes do React renderizar (evita flash)
const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    // Padrão: sempre tema claro (não usa preferência do sistema)
    return 'light';
};

// Aplica a classe no body ANTES do React carregar (evita flash)
const initialTheme = getInitialTheme();
if (initialTheme === 'dark') {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.remove('dark-mode');
}

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(initialTheme);

    // useLayoutEffect roda ANTES do paint do navegador
    useLayoutEffect(() => {
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
