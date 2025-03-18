// Este archivo maneja las variables de entorno de manera segura

// Función para obtener variables de entorno del servidor
export function getServerEnv(key: string, defaultValue = ""): string {
  // Verificar que estamos en el servidor
  if (typeof window !== "undefined") {
    console.warn(`Attempted to access server environment variable ${key} from the client`)
    return defaultValue
  }

  return process.env[key] || defaultValue
}

// Función para obtener variables de entorno públicas (seguras para el cliente)
export function getPublicEnv(key: string, defaultValue = ""): string {
  // Verificar que la clave comienza con NEXT_PUBLIC_
  if (!key.startsWith("NEXT_PUBLIC_")) {
    console.warn(`Attempted to access non-public environment variable ${key} as public`)
    return defaultValue
  }

  return process.env[key] || defaultValue
}

// Exportamos las variables públicas para uso en el cliente
export const publicEnv = {
  SUPABASE_URL: getPublicEnv("NEXT_PUBLIC_SUPABASE_URL", ""),
  // No exportamos la clave anónima directamente como una constante
  // En su lugar, se accede a través de process.env en tiempo de ejecución
}

