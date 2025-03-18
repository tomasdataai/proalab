"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { es, en, pt } from "@/messages"

type Language = "es" | "en" | "pt"
type Theme = "light" | "dark" | "system"

interface AppContextType {
  language: Language
  setLanguage: (lang: Language) => void
  messages: typeof es
  theme: Theme
  setTheme: (theme: Theme) => void
  isDarkMode: boolean
}

const defaultContext: AppContextType = {
  language: "es",
  setLanguage: () => {},
  messages: es,
  theme: "system",
  setTheme: () => {},
  isDarkMode: false,
}

const AppContext = createContext<AppContextType>(defaultContext)

export const useAppContext = () => useContext(AppContext)

interface AppProviderProps {
  children: ReactNode
  defaultTheme?: Theme
  defaultLanguage?: Language
}

export function AppProvider({ children, defaultTheme = "system", defaultLanguage = "es" }: AppProviderProps) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage)
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Obtener mensajes según el idioma
  const getMessages = (lang: Language) => {
    switch (lang) {
      case "en":
        return en
      case "pt":
        return pt
      default:
        return es
    }
  }

  const messages = getMessages(language)

  // Cambiar idioma
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== "undefined") {
      localStorage.setItem("proa-language", lang)
    }
  }

  // Cambiar tema
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    if (typeof window !== "undefined") {
      localStorage.setItem("proa-theme", newTheme)
    }
  }

  // Efecto para cargar preferencias guardadas
  useEffect(() => {
    if (typeof window === "undefined") return

    // Cargar idioma guardado
    const savedLanguage = localStorage.getItem("proa-language") as Language | null
    if (savedLanguage && ["es", "en", "pt"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }

    // Cargar tema guardado
    const savedTheme = localStorage.getItem("proa-theme") as Theme | null
    if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
      setThemeState(savedTheme)
    }

    setIsInitialized(true)
  }, [])

  // Efecto para aplicar el tema
  useEffect(() => {
    if (typeof window === "undefined") return

    const applyTheme = () => {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

      if (theme === "dark" || (theme === "system" && prefersDark)) {
        document.documentElement.classList.add("dark")
        setIsDarkMode(true)
      } else {
        document.documentElement.classList.remove("dark")
        setIsDarkMode(false)
      }
    }

    applyTheme()

    // Escuchar cambios en las preferencias del sistema
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      if (theme === "system") {
        applyTheme()
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        messages,
        theme,
        setTheme,
        isDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

