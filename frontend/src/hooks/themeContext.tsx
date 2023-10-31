import { ReactNode, useState } from 'react'
import Dark from './dark'
import ThemeContextt from './themeContextts'



const ThemeContextindex = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("dark")

  return (
    <ThemeContextt.Provider value={theme}>
      {children}
    </ThemeContextt.Provider>
  )
}

export default ThemeContextindex
