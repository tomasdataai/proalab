import { initEnvCache } from "./env-service"
import { initSupabaseClient } from "./supabase"

/**
 * Inicializa la configuración de la aplicación
 * Esta función debe llamarse durante la inicialización del servidor
 */
export async function initConfig() {
  // Solo ejecutar en el servidor
  if (typeof window !== "undefined") return

  try {
    // Inicializar caché de variables de entorno
    await initEnvCache()

    // Inicializar cliente de Supabase
    await initSupabaseClient()

    console.log("Application configuration initialized")
  } catch (error) {
    console.error("Error initializing application configuration:", error)
  }
}

// Exportar función para uso en middleware o en archivos de configuración
export default initConfig

