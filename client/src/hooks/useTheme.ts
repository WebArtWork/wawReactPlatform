import {useState} from "react";

enum ThemeType {
    LIGHT = 'light',
    DARK = 'dark'
}

export const useTheme = () => {

    const [theme, setTheme] = useState<ThemeType>(ThemeType.LIGHT);

    const toggleTheme = () => {
        setTheme(theme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT);
        document.documentElement.classList.toggle(ThemeType.DARK);
    };

    return {
        theme,
        toggleTheme,
        ThemeType
    }
}