"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Logo } from "@/components/atoms/logo"
import { useAppContext } from "@/contexts/app-context"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { resetPassword, isLoading } = useAuth()
  const { isDarkMode } = useAppContext()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await resetPassword(email)
    setIsSubmitted(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#1F1F1F] p-4">
      <Card className="w-full max-w-md dark:bg-[#333333] dark:border-gray-700">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <Logo darkMode={isDarkMode} size="lg" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#25282A] dark:text-white">Recuperar contraseña</CardTitle>
          <CardDescription className="dark:text-gray-300">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="text-center space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-green-800 dark:text-green-300">
                  Si tu correo electrónico está registrado, recibirás un enlace para restablecer tu contraseña.
                </p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Revisa tu bandeja de entrada y sigue las instrucciones del correo.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <Button type="submit" className="w-full bg-[#EE3831] hover:bg-[#E50695]" disabled={isLoading}>
                {isLoading ? <LoadingSpinner size="sm" /> : "Enviar enlace de recuperación"}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link
            href="/auth/login"
            className="flex items-center text-sm text-[#EE3831] hover:text-[#E50695] dark:text-[#F1B434] dark:hover:text-[#E50695]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a iniciar sesión
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

