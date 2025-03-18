import { NextResponse } from "next/server"
import { initEnvCache } from "@/lib/env-service"
import { setEnv } from "@/lib/env-service"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    // Verificar autenticación y permisos
    const { data: sessionData } = await supabase.auth.getSession()

    if (!sessionData.session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verificar si el usuario es administrador
    const { data: userData } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", sessionData.session.user.id)
      .single()

    if (!userData || userData.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Obtener variables del cuerpo de la solicitud
    const body = await request.json()
    const { variables } = body

    if (!variables || !Array.isArray(variables)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    // Inicializar caché de variables
    await initEnvCache()

    // Almacenar variables en Supabase
    for (const { key, value, isPublic } of variables) {
      if (key && value) {
        await setEnv(key, value, isPublic)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error initializing environment variables:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

