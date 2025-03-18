"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { Session, User } from "@supabase/supabase-js"
import { useToast } from "@/hooks/use-toast"
import {
  signInWithEmail,
  signUpWithEmail,
  signOut as serverSignOut,
  resetPassword as serverResetPassword,
  getSession as serverGetSession,
} from "@/app/actions/auth-actions"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signUp: (email: string, password: string, metadata?: { [key: string]: any }) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Función para obtener la sesión actual
  const refreshSession = async () => {
    try {
      const result = await serverGetSession()

      if (result.success && result.session) {
        setSession(result.session)
        setUser(result.session.user)
      } else {
        setSession(null)
        setUser(null)
      }
    } catch (error) {
      console.error("Error refreshing session:", error)
      setSession(null)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  // Cargar sesión al montar el componente
  useEffect(() => {
    refreshSession()
  }, [])

  const signUp = async (email: string, password: string, metadata?: { [key: string]: any }) => {
    setIsLoading(true)

    try {
      const result = await signUpWithEmail(email, password, metadata)

      if (!result.success) {
        throw new Error(result.error)
      }

      toast({
        title: "Registro exitoso",
        description: "Por favor, verifica tu correo electrónico para confirmar tu cuenta.",
      })

      router.push("/auth/verify")
    } catch (error: any) {
      toast({
        title: "Error en el registro",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      const result = await signInWithEmail(email, password)

      if (!result.success) {
        throw new Error(result.error)
      }

      // Actualizar estado con la nueva sesión
      if (result.data.session) {
        setSession(result.data.session)
        setUser(result.data.session.user)
      }

      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido de vuelta a ProaLAB.",
      })

      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setIsLoading(true)

    try {
      const result = await serverSignOut()

      if (!result.success) {
        throw new Error(result.error)
      }

      // Limpiar estado
      setSession(null)
      setUser(null)

      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente.",
      })

      router.push("/")
    } catch (error: any) {
      toast({
        title: "Error al cerrar sesión",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    setIsLoading(true)

    try {
      const result = await serverResetPassword(email)

      if (!result.success) {
        throw new Error(result.error)
      }

      toast({
        title: "Correo enviado",
        description: "Revisa tu bandeja de entrada para restablecer tu contraseña.",
      })
    } catch (error: any) {
      toast({
        title: "Error al enviar el correo",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    refreshSession,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

