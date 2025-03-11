"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Brain } from "lucide-react"

export function ChatTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-2 border-[#E50695] bg-[#1A1A1A]">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-[#E50695] flex items-center justify-center text-white font-bold">
                P
              </div>
              <div className="flex-1 rounded-lg bg-gray-800 p-3">
                <p className="text-sm text-gray-300">
                  ¿Cuáles son las carreras con mayor proyección en el sector tecnológico para los próximos 5 años?
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-[#25282A] flex items-center justify-center text-white font-bold">
                <Brain className="h-4 w-4" />
              </div>
              <div className="flex-1 rounded-lg bg-gray-800 p-3">
                <p className="text-sm text-gray-300">
                  Según nuestros análisis predictivos, las carreras con mayor proyección en el sector tecnológico para
                  los próximos 5 años son:
                </p>
                <ol className="list-decimal pl-5 mt-2 text-sm text-gray-300 space-y-1">
                  <li>Ingeniería en Inteligencia Artificial y Ciencia de Datos</li>
                  <li>Desarrollo de Software con especialización en Cloud Computing</li>
                  <li>Ciberseguridad</li>
                  <li>Ingeniería en Robótica y Automatización</li>
                  <li>Diseño de Experiencia de Usuario (UX/UI)</li>
                </ol>
                <p className="text-sm text-gray-300 mt-2">
                  Estas proyecciones se basan en el análisis de tendencias de contratación, inversión sectorial y
                  evolución tecnológica en Chile y Latinoamérica.
                </p>
                <div className="mt-2 text-xs text-gray-400">
                  Fuentes: Observatorio Laboral SENCE, Informes BID 2023, Análisis ProaLAB 2024
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

