"use server"

import { getPerplexityClient } from "@/lib/perplexity"

/**
 * Acción del servidor para realizar consultas a Perplexity
 * Esta función es segura para llamar desde el cliente
 */
export async function queryPerplexity(prompt: string, options = {}) {
  try {
    const perplexity = getPerplexityClient()
    return await perplexity.query(prompt, options)
  } catch (error) {
    console.error("Error in perplexity action:", error)
    return { error: error.message }
  }
}

