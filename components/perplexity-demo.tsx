"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { queryPerplexity } from "@/app/actions/perplexity-actions"

export function PerplexityDemo() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!prompt.trim()) return

    setIsLoading(true)
    setResponse("")

    try {
      // Llamar a la acción del servidor
      const result = await queryPerplexity(prompt)

      if (result.error) {
        setResponse(`Error: ${result.error}`)
      } else {
        // Extraer la respuesta del modelo
        const responseText = result.choices?.[0]?.message?.content || "No response"
        setResponse(responseText)
      }
    } catch (error) {
      console.error("Error querying Perplexity:", error)
      setResponse(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Perplexity AI Demo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Escribe tu pregunta aquí..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px]"
          />
          <Button type="submit" disabled={isLoading || !prompt.trim()}>
            {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
            {isLoading ? "Consultando..." : "Enviar consulta"}
          </Button>
        </form>

        {response && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
            <h3 className="font-medium mb-2">Respuesta:</h3>
            <div className="whitespace-pre-wrap">{response}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

