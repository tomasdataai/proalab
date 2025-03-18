"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import type { EnvVariable } from "@/lib/supabase/schema"

export function EnvManager() {
  const [variables, setVariables] = useState<EnvVariable[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [newKey, setNewKey] = useState("")
  const [newValue, setNewValue] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Cargar variables al montar el componente
  useEffect(() => {
    fetchVariables()
  }, [])

  // Función para cargar variables
  const fetchVariables = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.from("env_variables").select("*").order("key")

      if (error) throw error

      setVariables(data || [])
    } catch (error: any) {
      toast({
        title: "Error al cargar variables",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Función para añadir o actualizar variable
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Verificar si la variable ya existe
      const existingVar = variables.find((v) => v.key === newKey)

      if (existingVar) {
        // Actualizar variable existente
        const { error } = await supabase
          .from("env_variables")
          .update({
            value: newValue,
            is_public: isPublic,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingVar.id)

        if (error) throw error

        toast({
          title: "Variable actualizada",
          description: `La variable ${newKey} ha sido actualizada.`,
        })
      } else {
        // Crear nueva variable
        const { error } = await supabase.from("env_variables").insert({
          key: newKey,
          value: newValue,
          is_public: isPublic,
        })

        if (error) throw error

        toast({
          title: "Variable creada",
          description: `La variable ${newKey} ha sido creada.`,
        })
      }

      // Limpiar formulario y recargar variables
      setNewKey("")
      setNewValue("")
      setIsPublic(false)
      fetchVariables()
    } catch (error: any) {
      toast({
        title: "Error al guardar variable",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Función para eliminar variable
  const handleDelete = async (id: number, key: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar la variable ${key}?`)) {
      return
    }

    try {
      const { error } = await supabase.from("env_variables").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Variable eliminada",
        description: `La variable ${key} ha sido eliminada.`,
      })

      // Recargar variables
      fetchVariables()
    } catch (error: any) {
      toast({
        title: "Error al eliminar variable",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Administración de Variables de Entorno</CardTitle>
          <CardDescription>
            Gestiona las variables de entorno almacenadas en Supabase. Las variables públicas son accesibles desde el
            cliente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="key">Nombre de la variable</Label>
                <Input
                  id="key"
                  placeholder="EXAMPLE_API_KEY"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Valor</Label>
                <Input
                  id="value"
                  type="password"
                  placeholder="valor_secreto"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="is-public" checked={isPublic} onCheckedChange={setIsPublic} />
              <Label htmlFor="is-public">Variable pública (accesible desde el cliente)</Label>
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <LoadingSpinner size="sm" /> : "Guardar Variable"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Variables Almacenadas</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : variables.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No hay variables almacenadas.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Actualizada</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {variables.map((variable) => (
                  <TableRow key={variable.id}>
                    <TableCell className="font-mono">{variable.key}</TableCell>
                    <TableCell className="font-mono">
                      {variable.value.replace(/./g, "•")}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 h-6 w-6 p-0"
                        onClick={() => {
                          navigator.clipboard.writeText(variable.value)
                          toast({
                            title: "Copiado al portapapeles",
                            description: `El valor de ${variable.key} ha sido copiado.`,
                          })
                        }}
                      >
                        <span className="sr-only">Copiar</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          variable.is_public
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                        }`}
                      >
                        {variable.is_public ? "Pública" : "Privada"}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(variable.updated_at).toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(variable.id, variable.key)}>
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={fetchVariables} disabled={isLoading}>
            Actualizar
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

