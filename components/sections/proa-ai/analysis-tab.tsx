"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, FileText } from "lucide-react"

export function AnalysisTab() {
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
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Análisis de Tendencias Educativas</h3>
              <Sparkles className="h-5 w-5 text-[#E50695]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Crecimiento Sectorial</p>
                <p className="text-2xl font-bold text-[#E50695]">+27%</p>
                <p className="text-xs text-gray-400">Tecnología e Innovación</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Demanda Laboral</p>
                <p className="text-2xl font-bold text-[#E50695]">Alta</p>
                <p className="text-xs text-gray-400">Próximos 5 años</p>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-white">Competencias más valoradas</p>
                <FileText className="h-4 w-4 text-[#E50695]" />
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span className="text-gray-300">Pensamiento analítico</span>
                  <span className="text-[#E50695]">95%</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-300">Programación avanzada</span>
                  <span className="text-[#E50695]">92%</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-300">Gestión de proyectos</span>
                  <span className="text-[#E50695]">88%</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-300">Comunicación efectiva</span>
                  <span className="text-[#E50695]">85%</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

