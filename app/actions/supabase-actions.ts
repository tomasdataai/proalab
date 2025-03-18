"use server"

import { createClient } from "@supabase/supabase-js"

// Crear un cliente de Supabase en el servidor
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || ""
const serverSupabase = createClient(supabaseUrl, supabaseKey)

/**
 * Acción del servidor para iniciar sesión
 */
export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await serverSupabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

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
    const { data, error } = await serverSupabase.auth.signUp({
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
    const { error } = await serverSupabase.auth.signOut()

    if (error) throw error

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
    const { error } = await serverSupabase.auth.resetPasswordForEmail(email, {
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
    const { data, error } = await serverSupabase.auth.updateUser(updates)

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error("Error updating user:", error)
    return { success: false, error: error.message }
  }
}
