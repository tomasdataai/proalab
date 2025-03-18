import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { initConfig } from "./lib/config"

// Inicializar configuración
let configInitialized = false

export async function middleware(request: NextRequest) {
  // Inicializar configuración si no se ha hecho
  if (!configInitialized) {
    await initConfig()
    configInitialized = true
  }

  // Continuar con la solicitud
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}

