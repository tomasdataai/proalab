"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/layout/mobile-nav"
import { smoothScroll } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useInView } from "react-intersection-observer"
import { Logo } from "@/components/atoms/logo"
import { LanguageSwitcher } from "@/components/molecules/language-switcher"

interface SiteHeaderProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

export function SiteHeader({ darkMode, toggleDarkMode }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  const navItems = [
    { href: "#products", label: "Productos" },
    { href: "#features", label: "Características" },
    { href: "#research", label: "Investigación" },
    { href: "#student-resources", label: "Recursos" },
    { href: "#testimonials", label: "Testimonios" },
    { href: "#pricing", label: "Planes" },
  ]

  return (
    <motion.header
      ref={ref}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className={`fixed top-0 z-50 w-full border-b bg-background/80 transition-all ${
        isScrolled ? "backdrop-blur-sm shadow-sm" : ""
      }`}
    >
      <Container className="relative">
        <div className="flex h-16 items-center justify-between">
          <Logo darkMode={darkMode} />

          <AnimatePresence>
            {isScrolled && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute left-1/2 transform -translate-x-1/2 hidden md:block"
              >
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#" onClick={(e) => smoothScroll(e, "#hero")}>
                        Inicio
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#products" onClick={(e) => smoothScroll(e, "#products")}>
                        Productos
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#features" onClick={(e) => smoothScroll(e, "#features")}>
                        Características
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="md:hidden">
            <MobileNav />
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item, i) => (
              <motion.div key={item.href} custom={i} initial="hidden" animate="visible" variants={navItemVariants}>
                <Link
                  href={item.href}
                  onClick={(e) => smoothScroll(e, item.href)}
                  className="text-sm font-medium transition-colors hover:text-[#EE3831] text-[#25282A] dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EE3831]"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors hover:bg-gray-300 dark:hover:bg-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EE3831]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? "☀️" : "🌙"}
            </motion.button>
            <LanguageSwitcher />
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="#"
              className="text-sm font-medium transition-colors hover:text-[#EE3831] hover:underline underline-offset-4 text-[#25282A] dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EE3831]"
            >
              Iniciar sesión
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-[#EE3831] hover:bg-[#E50695] transition-colors">Comenzar</Button>
            </motion.div>
          </div>
        </div>
      </Container>
    </motion.header>
  )
}

