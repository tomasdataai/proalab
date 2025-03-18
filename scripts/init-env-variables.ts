import { getAdminClient } from "../lib/supabase"

/**
 * Script para inicializar variables de entorno en Supabase
 * Este script debe ejecutarse con permisos de administrador
 * NOTA: Este script solo debe ejecutarse en el servidor
 */
async function initEnvVariables() {
  // Verificar que estamos en el servidor
  if (typeof window !== "undefined") {
    console.error("This script can only be run on the server")
    return
  }

  try {
    // Obtener cliente de administrador
    const adminClient = getAdminClient()

    // Lista de variables a almacenar
    const variables = [
      // Variables públicas (accesibles desde el cliente)
      { key: "NEXT_PUBLIC_SUPABASE_URL", value: process.env.NEXT_PUBLIC_SUPABASE_URL || "", isPublic: true },
      { key: "NEXT_PUBLIC_URL", value: process.env.NEXT_PUBLIC_URL || "", isPublic: true },

      // Variables privadas (solo accesibles desde el servidor)
      { key: "NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY", value: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || "", isPublic: false },
      { key: "NEXT_PUBLIC_SUPABASE_JWT_SECRET", value: process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET || "", isPublic: false },
      { key: "PERPLEXITY_API_KEY", value: process.env.PERPLEXITY_API_KEY || "", isPublic: false },

      // Almacenamos la clave anónima con un nombre seguro (sin NEXT_PUBLIC_)
      { key: "NEXT_PUBLIC_SUPABASE_ANON_KEY", value: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "", isPublic: false },

      // Variables de base de datos PostgreSQL
      { key: "POSTGRES_URL", value: process.env.POSTGRES_URL || "", isPublic: false },
      { key: "POSTGRES_PRISMA_URL", value: process.env.POSTGRES_PRISMA_URL || "", isPublic: false },
      { key: "POSTGRES_URL_NON_POOLING", value: process.env.POSTGRES_URL_NON_POOLING || "", isPublic: false },
      { key: "POSTGRES_USER", value: process.env.POSTGRES_USER || "", isPublic: false },
      { key: "POSTGRES_HOST", value: process.env.POSTGRES_HOST || "", isPublic: false },
      { key: "POSTGRES_PASSWORD", value: process.env.POSTGRES_PASSWORD || "", isPublic: false },
      { key: "POSTGRES_DATABASE", value: process.env.POSTGRES_DATABASE || "", isPublic: false },
    ]

    // Almacenar variables en Supabase
    for (const { key, value, isPublic } of variables) {
      if (value) {
        console.log(`Setting ${key}...`)
        await storeEnvVariable(adminClient, key, value, isPublic)
      } else {
        console.warn(`Skipping ${key} (empty value)`)
      }
    }

    console.log("Environment variables initialized successfully")
  } catch (error) {
    console.error("Error initializing environment variables:", error)
  }
}

// Función auxiliar para almacenar variables
async function storeEnvVariable(client, key, value, isPublic) {
  try {
    // Verificar si la variable ya existe
    const { data, error } = await client.from("env_variables").select("id").eq("key", key).single()

    if (error && error.code !== "PGRST116") {
      throw error
    }

    if (data) {
      // Actualizar variable existente
      const { error: updateError } = await client
        .from("env_variables")
        .update({ value, is_public: isPublic, updated_at: new Date().toISOString() })
        .eq("id", data.id)

      if (updateError) throw updateError
    } else {
      // Crear nueva variable
      const { error: insertError } = await client.from("env_variables").insert({ key, value, is_public: isPublic })

      if (insertError) throw insertError
    }
  } catch (error) {
    console.error(`Error setting env variable ${key}:`, error)
    throw error
  }
}

// Ejecutar script
initEnvVariables()
