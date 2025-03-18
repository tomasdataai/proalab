"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

export function UserProfile() {
  const { user, session } = useAuth()
  const [name, setName] = useState(user?.user_metadata?.name || "")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        data: { name },
      })

      if (error) {
        throw error
      }

      toast({
        title: "Perfil actualizado",
        description: "Tu información ha sido actualizada correctamente.",
      })
    } catch (error: any) {
      toast({
        title: "Error al actualizar el perfil",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return null

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.email?.charAt(0).toUpperCase() || "U"

  return (
    <Card className="w-full max-w-md dark:bg-[#333333] dark:border-gray-700">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="" alt={name || user.email || "Usuario"} />
            <AvatarFallback className="bg-[#EE3831] text-white text-xl">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl text-[#25282A] dark:text-white">{name || "Usuario"}</CardTitle>
            <CardDescription className="dark:text-gray-300">{user.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
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
              className="dark:bg-[#444444] dark:border-gray-600"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#25282A] dark:text-white">
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              value={user.email || ""}
              disabled
              className="bg-gray-100 dark:bg-[#333333] dark:border-gray-600"
            />
          </div>
          <Button type="submit" className="w-full bg-[#EE3831] hover:bg-[#E50695]" disabled={isLoading}>
            {isLoading ? <LoadingSpinner size="sm" /> : "Actualizar perfil"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

