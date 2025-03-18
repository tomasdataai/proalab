"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Logo } from "@/components/atoms/logo"
import { useAppContext } from "@/contexts/app-context"
import { useToast } from "@/hooks/use-toast"
import { updateUser } from "@/app/actions/supabase-actions"

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { isDarkMode } = useAppContext()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await updateUser({ password })

      if (!result.success) {
        throw new Error(result.error)
      }

      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido actualizada correctamente.",
      })

      router.push("/auth/login")
    } catch (error: any) {
      toast({
        title: "Error al actualizar la contraseña",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#1F1F1F] p-4">
      <Card className="w-full max-w-md dark:bg-[#333333] dark:border-gray-700">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <Logo darkMode={isDarkMode} size="lg" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#25282A] dark:text-white">Actualizar contraseña</CardTitle>
          <CardDescription className="dark:text-gray-300">Ingresa tu nueva contraseña para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#25282A] dark:text-white">
                Nueva contraseña
              </Label>
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
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-[#25282A] dark:text-white">
                Confirmar contraseña
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="dark:bg-[#444444] dark:border-gray-600"
              />
            </div>
            <Button type="submit" className="w-full bg-[#EE3831] hover:bg-[#E50695]" disabled={isLoading}>
              {isLoading ? <LoadingSpinner size="sm" /> : "Actualizar contraseña"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

