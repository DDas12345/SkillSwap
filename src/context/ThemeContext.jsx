import { useEffect, useState } from 'react'
import { ThemeContext } from './theme-context'

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('skillswap-theme')

        return savedTheme === 'light' ? 'light' : 'dark'
    })

    useEffect(() => {
        localStorage.setItem('skillswap-theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((currentTheme) =>
            currentTheme === 'dark' ? 'light' : 'dark'
        )
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className="theme-root" data-theme={theme}>
                {children}

                <button
                    className="theme-toggle"
                    type="button"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === 'dark' ? 'Rishihood Light' : 'Galaxy Dark'}`}
                    title={`Switch to ${theme === 'dark' ? 'Rishihood Light' : 'Galaxy Dark'}`}
                >
                    {theme === 'dark' ? '🧡 Rishihood Light' : '🌌 Galaxy Dark'}
                </button>
            </div>
        </ThemeContext.Provider>
    )
}
