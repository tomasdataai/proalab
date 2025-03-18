"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/atoms/logo"
import { useAppContext } from "@/contexts/app-context"
import { CheckCircle2 } from "lucide-react"

export default function VerifyPage() {
  const { isDarkMode } = useAppContext()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#1F1F1F] p-4">
      <Card className="w-full max-w-md dark:bg-[#333333] dark:border-gray-700">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <Logo darkMode={isDarkMode} size="lg" />
          </div>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-[#25282A] dark:text-white">
            Verifica tu correo electrónico
          </CardTitle>
          <CardDescription className="dark:text-gray-300">
            Hemos enviado un enlace de verificación a tu correo electrónico. Por favor, revisa tu bandeja de entrada y
            sigue las instrucciones para completar el registro.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Si no recibes el correo en unos minutos, revisa tu carpeta de spam o solicita un nuevo enlace de
            verificación.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            variant="outline"
            className="w-full dark:border-gray-700 dark:text-white"
            onClick={() => window.location.reload()}
          >
            Reenviar correo de verificación
          </Button>
          <Link href="/auth/login" className="w-full">
            <Button className="w-full bg-[#EE3831] hover:bg-[#E50695]">Volver a iniciar sesión</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

