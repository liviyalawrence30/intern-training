import { createContext, useContext, useState,type ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme:       Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)
/* createContext is initialised with null beacuse it's value comes from the theme provider.
If it is used outside the provider,it gives the error rather than incorrectly using the default value. */

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  function toggleTheme(): void {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside ThemeProvider')
  return context
}

/*explore section:
using usetheme() outside the component.
error: Invalid hook call .Hooks should not be called outside the function component.
Using them in a normal function violates the rules of hooks.
*/ 