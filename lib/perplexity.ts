import { getServerEnv } from "./env-config"

/**
 * Cliente para la API de Perplexity
 * Este cliente debe usarse solo en el servidor
 */
export class PerplexityClient {
  private apiKey: string
  private baseUrl = "https://api.perplexity.ai"

  constructor() {
    // Verificar que estamos en el servidor
    if (typeof window !== "undefined") {
      throw new Error("PerplexityClient can only be used on the server")
    }

    // Obtener API key de las variables de entorno
    this.apiKey = getServerEnv("PERPLEXITY_API_KEY", "")

    if (!this.apiKey) {
      console.warn("Perplexity API key not found")
    }
  }

  /**
   * Realiza una consulta a la API de Perplexity
   * @param prompt El prompt para la consulta
   * @param options Opciones adicionales
   * @returns La respuesta de la API
   */
  async query(
    prompt: string,
    options: {
      model?: string
      max_tokens?: number
      temperature?: number
    } = {},
  ) {
    if (!this.apiKey) {
      throw new Error("Perplexity API key not configured")
    }

    const { model = "llama-3-sonar-small-online", max_tokens = 1000, temperature = 0.7 } = options

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: prompt }],
          max_tokens,
          temperature,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`Perplexity API error: ${error.message || response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error querying Perplexity API:", error)
      throw error
    }
  }

  /**
   * Verifica si el cliente está configurado correctamente
   * @returns true si el cliente está configurado, false en caso contrario
   */
  isConfigured(): boolean {
    return Boolean(this.apiKey)
  }
}

// Función para obtener una instancia del cliente (solo en el servidor)
export function getPerplexityClient() {
  // Verificar que estamos en el servidor
  if (typeof window !== "undefined") {
    throw new Error("getPerplexityClient can only be used on the server")
  }

  return new PerplexityClient()
}

