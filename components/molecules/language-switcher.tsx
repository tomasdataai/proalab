"use client"

import { motion } from "framer-motion"
import { Globe } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { IconButton } from "@/components/atoms/icon-button"
import { useAppContext } from "@/contexts/app-context"

interface Language {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
]

export function LanguageSwitcher() {
  const { language, setLanguage } = useAppContext()

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as "es" | "en" | "pt")
  }

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0]

  return (
    <HoverCard openDelay={100} closeDelay={200}>
      <HoverCardTrigger asChild>
        <div>
          <IconButton
            icon={<Globe className="h-4 w-4" />}
            label="Change language"
            variant="ghost"
            aria-label={`Current language: ${currentLanguage.name}`}
          />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-48 p-2" align="end">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground mb-2">Select language</p>
          {languages.map((lang) => (
            <motion.button
              key={lang.code}
              className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm ${
                language === lang.code ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
              onClick={() => handleLanguageChange(lang.code)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </motion.button>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

