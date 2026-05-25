import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({children}){
    const [theme, setTheme] = useState("light")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        // Get theme from local storage
        const storedTheme = localStorage.getItem("theme")
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        const initialTheme = storedTheme || (prefersDark ? "dark" : "light")

        setTheme(initialTheme)
        applyTheme(initialTheme)
        setMounted(true)
    }, [])

    const applyTheme = newTheme => {
      const html = document.documentElement
      if (newTheme === "dark") {
        html.classList.add("dark")
      }
      else {
        html.classList.remove("dark")
      }
      localStorage.setItem("theme", newTheme)
    }

    const toggleTheme = () => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme)
      applyTheme(newTheme)
    }

    // if (!mounted) return null

    return(
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
      </ThemeContext.Provider>
    )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
