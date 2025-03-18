"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Moon, Sun, X } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useAppContext } from "@/contexts/app-context"
import { smoothScroll } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion, AnimatePresence } from "framer-motion"

export function MobileNav() {
  const { isDarkMode, theme, setTheme } = useAppContext()
  const [isOpen, setIsOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    setIsOpen(false)
    smoothScroll(e, target)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Abrir menú">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-white dark:bg-[#25282A] dark:text-white w-[280px] sm:w-[350px] p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-[#25282A] dark:text-white">ProaLAB</SheetTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Cerrar menú">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <SheetDescription className="text-gray-500 dark:text-gray-300">
              Modelador de futuros educacionales
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-auto p-6">
            <nav className="flex flex-col gap-4">
              <Link
                href="#products"
                className="text-sm font-medium hover:text-[#EE3831] transition-colors"
                onClick={(e) => handleLinkClick(e, "#products")}
              >
                Productos
              </Link>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="soluciones" className="border-b-0">
                  <AccordionTrigger className="text-sm font-medium hover:text-[#EE3831] py-1">
                    Soluciones
                  </AccordionTrigger>
                  <AccordionContent>
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col gap-2 pl-4"
                      >
                        <Link
                          href="#features"
                          className="text-sm font-medium hover:text-[#EE3831] transition-colors py-1"
                          onClick={(e) => handleLinkClick(e, "#features")}
                        >
                          Características
                        </Link>
                        <Link
                          href="#tech-advantages"
                          className="text-sm font-medium hover:text-[#EE3831] transition-colors py-1"
                          onClick={(e) => handleLinkClick(e, "#tech-advantages")}
                        >
                          Ventajas Tecnológicas
                        </Link>
                        <Link
                          href="#use-cases"
                          className="text-sm font-medium hover:text-[#EE3831] transition-colors py-1"
                          onClick={(e) => handleLinkClick(e, "#use-cases")}
                        >
                          Casos de Éxito
                        </Link>
                      </motion.div>
                    </AnimatePresence>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="recursos" className="border-b-0">
                  <AccordionTrigger className="text-sm font-medium hover:text-[#EE3831] py-1">
                    Recursos
                  </AccordionTrigger>
                  <AccordionContent>
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col gap-2 pl-4"
                      >
                        <Link
                          href="#research"
                          className="text-sm font-medium hover:text-[#EE3831] transition-colors py-1"
                          onClick={(e) => handleLinkClick(e, "#research")}
                        >
                          Investigación
                        </Link>
                        <Link
                          href="#student-resources"
                          className="text-sm font-medium hover:text-[#EE3831] transition-colors py-1"
                          onClick={(e) => handleLinkClick(e, "#student-resources")}
                        >
                          Recursos
                        </Link>
                        <Link
                          href="#blog"
                          className="text-sm font-medium hover:text-[#EE3831] transition-colors py-1"
                          onClick={(e) => handleLinkClick(e, "#blog")}
                        >
                          Blog
                        </Link>
                      </motion.div>
                    </AnimatePresence>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Link
                href="#testimonials"
                className="text-sm font-medium hover:text-[#EE3831] transition-colors"
                onClick={(e) => handleLinkClick(e, "#testimonials")}
              >
                Testimonios
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium hover:text-[#EE3831] transition-colors"
                onClick={(e) => handleLinkClick(e, "#pricing")}
              >
                Planes
              </Link>
            </nav>
          </div>

          <div className="p-6 border-t">
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <span className="text-sm">{isDarkMode ? "Modo claro" : "Modo oscuro"}</span>
            </div>

            <div className="flex flex-col gap-3">
              <Link href="#" className="text-sm font-medium hover:text-[#EE3831] transition-colors">
                Iniciar sesión
              </Link>
              <Button className="w-full bg-[#EE3831] hover:bg-[#E50695]">Comenzar</Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

