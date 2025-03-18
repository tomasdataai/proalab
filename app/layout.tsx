import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppProvider } from "@/contexts/app-context"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ProaLAB - El Modelador de Futuros Educacionales más Avanzado de Hispanoamérica",
  description:
    "Cerrando la brecha entre Educación e Industria mediante Inteligencia Artificial, Procesamiento de Lenguaje Natural, Deep Learning, métodos econométricos y forecasting predictivo.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </AppProvider>
      </body>
    </html>
  )
}



import './globals.css'