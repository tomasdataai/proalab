"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Logo } from "@/components/atoms/logo"
import { useAppContext } from "@/contexts/app-context"

export function AuthForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [activeTab, setActiveTab] = useState("login")
  const { signIn, signUp, isLoading } = useAuth()
  const { isDarkMode } = useAppContext()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    await signIn(email, password)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    await signUp(email, password, { name })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#1F1F1F] p-4">
      <Card className="w-full max-w-md dark:bg-[#333333] dark:border-gray-700">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <Logo darkMode={isDarkMode} size="lg" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#25282A] dark:text-white">Bienvenido a ProaLAB</CardTitle>
          <CardDescription className="dark:text-gray-300">
            El modelador de futuros educacionales más avanzado de Hispanoamérica
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="data-[state=active]:bg-[#EE3831] data-[state=active]:text-white">
                Iniciar sesión
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-[#EE3831] data-[state=active]:text-white">
                Registrarse
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#25282A] dark:text-white">
                    Correo electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="dark:bg-[#444444] dark:border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-[#25282A] dark:text-white">
                      Contraseña
                    </Label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm text-[#EE3831] hover:text-[#E50695] dark:text-[#F1B434] dark:hover:text-[#E50695]"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="dark:bg-[#444444] dark:border-gray-600"
                  />
                </div>
                <Button type="submit" className="w-full bg-[#EE3831] hover:bg-[#E50695]" disabled={isLoading}>
                  {isLoading ? <LoadingSpinner size="sm" /> : "Iniciar sesión"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#25282A] dark:text-white">
                    Nombre completo
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="dark:bg-[#444444] dark:border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-register" className="text-[#25282A] dark:text-white">
                    Correo electrónico
                  </Label>
                  <Input
                    id="email-register"
                    type="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="dark:bg-[#444444] dark:border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-register" className="text-[#25282A] dark:text-white">
                    Contraseña
                  </Label>
                  <Input
                    id="password-register"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="dark:bg-[#444444] dark:border-gray-600"
                  />
                </div>
                <Button type="submit" className="w-full bg-[#EE3831] hover:bg-[#E50695]" disabled={isLoading}>
                  {isLoading ? <LoadingSpinner size="sm" /> : "Registrarse"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-[#333333] px-2 text-gray-500 dark:text-gray-400">O continúa con</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="dark:border-gray-700 dark:text-white">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="dark:border-gray-700 dark:text-white">
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
              Facebook
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

