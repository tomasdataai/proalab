import React from "react"
import { Metadata } from "next"
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
  metadataBase: new URL('https://proalab.cloud'),
  openGraph: {
    title: "ProaLAB - Modelador de Futuros Educacionales",
    description: "Cerrando la brecha entre Educación e Industria mediante IA",
    url: 'https://proalab.cloud',
    siteName: 'ProaLAB',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ProaLAB - Modelador de Futuros Educacionales",
    description: "Cerrando la brecha entre Educación e Industria mediante IA",
  },
  generator: 'Next.js'
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