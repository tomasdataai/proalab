"use server"

import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

// Crear un cliente de Supabase en el servidor
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    // No necesitamos especificar el dominio para las cookies
    // El dominio por defecto será el dominio actual
  },
})

/**
 * Acción del servidor para iniciar sesión
 */
export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    // Establecer cookies de sesión
    const { session } = data
    if (session) {
      cookies().set("supabase-auth-token", session.access_token, {
        path: "/",
        maxAge: session.expires_in,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error signing in:", error)
    return { success: false, error: error.message }
  }
}

/**
 * Acción del servidor para registrarse
 */
export async function signUpWithEmail(email: string, password: string, metadata?: any) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error("Error signing up:", error)
    return { success: false, error: error.message }
  }
}

/**
 * Acción del servidor para cerrar sesión
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) throw error

    // Eliminar cookies de sesión
    cookies().delete("supabase-auth-token")

    return { success: true }
  } catch (error) {
    console.error("Error signing out:", error)
    return { success: false, error: error.message }
  }
}

/**
 * Acción del servidor para restablecer contraseña
 */
export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_URL || ""}/auth/update-password`,
    })

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error("Error resetting password:", error)
    return { success: false, error: error.message }
  }
}

/**
 * Acción del servidor para actualizar usuario
 */
export async function updateUser(updates: any) {
  try {
    const { data, error } = await supabase.auth.updateUser(updates)

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error("Error updating user:", error)
    return { success: false, error: error.message }
  }
}

/**
 * Acción del servidor para obtener la sesión actual
 */
export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession()

    if (error) throw error

    return { success: true, session: data.session }
  } catch (error) {
    console.error("Error getting session:", error)
    return { success: false, error: error.message, session: null }
  }
}

