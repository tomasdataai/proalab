"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { SimuladorData } from "../page"

interface FuerzaTrabajoChartProps {
  data: SimuladorData
  selectedRegion: string
}

export default function FuerzaTrabajoChart({ data, selectedRegion }: FuerzaTrabajoChartProps) {
  // Preparar datos para el gráfico
  const chartData = selectedRegion === "Nacional"
    ? data.datos_nacionales.map((item) => ({
        trimestre: item.trimestre,
        fuerza: parseFloat((item.fuerza_trabajo / 1000).toFixed(1)),
      }))
    : data.datos_regionales
        .find((region) => region.region === selectedRegion)
        ?.datos_trimestrales
        ? Object.entries(data.datos_regionales.find((region) => region.region === selectedRegion)!.datos_trimestrales)
            .map(([trimestre, valores]) => ({
              trimestre,
              fuerza: parseFloat(valores.indicadores_base.fuerza_trabajo.toFixed(1)),
            }))
        : []

  // Ordenar por trimestre
  chartData.sort((a, b) => {
    const [yearA, quarterA] = a.trimestre.split("-")
    const [yearB, quarterB] = b.trimestre.split("-")
    return yearA === yearB ? quarterA.localeCompare(quarterB) : yearA.localeCompare(yearB)
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fuerza de Trabajo</CardTitle>
        <CardDescription>
          Evolución de la fuerza de trabajo {selectedRegion === "Nacional" ? "en Chile" : `en ${selectedRegion}`} (miles de personas)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" />
              <XAxis 
                dataKey="trimestre" 
                tick={{ fontSize: 12 }} 
                tickFormatter={(value) => value.split("-")[1]}
                minTickGap={15}
              />
              <YAxis 
                domain={['dataMin - 50', 'dataMax + 50']}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [`${value}K`, "Fuerza de Trabajo"]}
                labelFormatter={(label) => `Período: ${label}`}
                contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #d4d4d8" }}
              />
              <Legend />
              <Area 
                type="monotone"
                dataKey="fuerza" 
                name="Fuerza de Trabajo" 
                fill="#0369a1" 
                stroke="#0284c7"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
