"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { UserProfile } from "@/components/auth/user-profile"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Container } from "@/components/ui/container"

export default function DashboardPage() {
  const { signOut } = useAuth()

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 py-12 md:py-24">
          <Container>
            <div className="mx-auto max-w-4xl">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-[#25282A] dark:text-white">Panel de control</h1>
                <p className="text-gray-500 dark:text-gray-300">Bienvenido a tu panel de control de ProaLAB</p>
              </div>

              <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
                <div>
                  <UserProfile />
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      className="w-full dark:border-gray-700 dark:text-white hover:bg-[#EE3831] hover:text-white"
                      onClick={() => signOut()}
                    >
                      Cerrar sesión
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-lg border p-6 dark:border-gray-700 dark:bg-[#333333]">
                    <h2 className="text-xl font-semibold mb-4 text-[#25282A] dark:text-white">Actividad reciente</h2>
                    <p className="text-gray-500 dark:text-gray-300">No hay actividad reciente para mostrar.</p>
                  </div>

                  <div className="rounded-lg border p-6 dark:border-gray-700 dark:bg-[#333333]">
                    <h2 className="text-xl font-semibold mb-4 text-[#25282A] dark:text-white">Recursos disponibles</h2>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#EE3831]"></div>
                        <span className="text-gray-700 dark:text-gray-300">Simulador de Escenarios Laborales</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#F1B434]"></div>
                        <span className="text-gray-700 dark:text-gray-300">Pertinencia Educativa</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#E50695]"></div>
                        <span className="text-gray-700 dark:text-gray-300">Proa AI</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </main>
        <SiteFooter />
      </div>
    </ProtectedRoute>
  )
}

