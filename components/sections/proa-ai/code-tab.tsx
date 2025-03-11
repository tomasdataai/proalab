"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Zap } from "lucide-react"

export function CodeTab() {
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
              <h3 className="text-lg font-semibold text-white">Generación de Código</h3>
              <Code className="h-5 w-5 text-[#E50695]" />
            </div>

            <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`// Análisis predictivo de tendencias educativas
import { analyzeData, visualizeResults } from '@proalab/analytics';

async function predictEducationalTrends(sector, timeframe) {
  // Obtener datos históricos
  const historicalData = await fetchHistoricalData(sector);
  
  // Aplicar modelo predictivo
  const prediction = analyzeData({
    data: historicalData,
    timeframe: timeframe,
    factors: ['marketDemand', 'salaryTrends', 'jobGrowth']
  });
  
  // Visualizar resultados
  return visualizeResults(prediction);
}

// Ejemplo de uso
const techSectorForecast = await predictEducationalTrends(
  'technology', 
  { years: 5 }
);`}
              </pre>
            </div>

            <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#E50695]" />
                <span className="text-sm text-gray-300">Ejecutar análisis</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-[#E50695] text-[#E50695] hover:bg-[#E50695] hover:text-white"
              >
                Ejecutar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

