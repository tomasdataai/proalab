import { createClient } from "@supabase/supabase-js"

// Inicializar con variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""

// Creamos un cliente diferente según el entorno
let supabaseClient

// En el servidor, usamos las variables de entorno directamente
if (typeof window === "undefined") {
  // Estamos en el servidor
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ""
  supabaseClient = createClient(supabaseUrl, supabaseKey)
} else {
  // En el cliente, creamos un cliente con funcionalidad limitada
  // Este cliente solo podrá realizar operaciones que no requieran autenticación
  // Para operaciones autenticadas, usaremos Server Actions
  supabaseClient = createClient(supabaseUrl, "", {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })
}

// Exportamos el cliente
export const supabase = supabaseClient

// Función para obtener un cliente de administrador (solo en el servidor)
export function getAdminClient() {
  if (typeof window !== "undefined") {
    throw new Error("Admin client can only be used on the server")
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not defined")
  }

  return createClient(supabaseUrl, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Esta función ya no es necesaria, pero la mantenemos para compatibilidad
export async function initSupabaseClient() {
  // Función vacía para mantener compatibilidad
}

