import { supabase } from "./supabase"
import type { EnvVariable } from "./supabase/schema"

// Cache para almacenar variables y reducir consultas a Supabase
let envCache: Record<string, string> = {}
let cacheInitialized = false

/**
 * Inicializa la caché de variables de entorno
 * Esta función debe llamarse en el servidor durante la inicialización
 */
export async function initEnvCache(): Promise<void> {
  if (cacheInitialized) return

  try {
    // Usar el cliente con rol de servicio para acceder a todas las variables
    const serviceClient = supabase.auth.admin

    // Si no estamos en el servidor, solo obtenemos variables públicas
    if (typeof window !== "undefined") {
      const { data, error } = await supabase.from("env_variables").select("key, value").eq("is_public", true)

      if (error) throw error

      if (data) {
        data.forEach((variable: EnvVariable) => {
          envCache[variable.key] = variable.value
        })
      }
    } else {
      // En el servidor, obtenemos todas las variables
      const { data, error } = await supabase.from("env_variables").select("key, value")

      if (error) throw error

      if (data) {
        data.forEach((variable: EnvVariable) => {
          envCache[variable.key] = variable.value
        })
      }
    }

    cacheInitialized = true
  } catch (error) {
    console.error("Error initializing env cache:", error)
    // Fallback a variables de entorno normales
    envCache = process.env as Record<string, string>
  }
}

/**
 * Obtiene una variable de entorno
 * @param key Nombre de la variable
 * @param defaultValue Valor por defecto si la variable no existe
 * @returns El valor de la variable o el valor por defecto
 */
export function getEnv(key: string, defaultValue = ""): string {
  // Si la caché no está inicializada, usamos las variables de entorno normales
  if (!cacheInitialized) {
    return process.env[key] || defaultValue
  }

  return envCache[key] || process.env[key] || defaultValue
}

/**
 * Establece una variable de entorno en Supabase
 * Esta función solo debe usarse en el servidor con permisos de administrador
 */
export async function setEnv(key: string, value: string, isPublic = false): Promise<void> {
  try {
    // Verificar si la variable ya existe
    const { data, error } = await supabase.from("env_variables").select("id").eq("key", key).single()

    if (error && error.code !== "PGRST116") {
      throw error
    }

    if (data) {
      // Actualizar variable existente
      const { error: updateError } = await supabase
        .from("env_variables")
        .update({ value, is_public: isPublic, updated_at: new Date().toISOString() })
        .eq("id", data.id)

      if (updateError) throw updateError
    } else {
      // Crear nueva variable
      const { error: insertError } = await supabase.from("env_variables").insert({ key, value, is_public: isPublic })

      if (insertError) throw insertError
    }

    // Actualizar caché
    envCache[key] = value
  } catch (error) {
    console.error(`Error setting env variable ${key}:`, error)
    throw error
  }
}

/**
 * Elimina una variable de entorno de Supabase
 * Esta función solo debe usarse en el servidor con permisos de administrador
 */
export async function deleteEnv(key: string): Promise<void> {
  try {
    const { error } = await supabase.from("env_variables").delete().eq("key", key)

    if (error) throw error

    // Actualizar caché
    delete envCache[key]
  } catch (error) {
    console.error(`Error deleting env variable ${key}:`, error)
    throw error
  }
}

