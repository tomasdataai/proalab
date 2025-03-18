"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { SimuladorData } from "../page"

interface DesocupacionChartProps {
  data: SimuladorData
  selectedRegion: string
}

export default function DesocupacionChart({ data, selectedRegion }: DesocupacionChartProps) {
  // Preparar datos para el gráfico
  const chartData = selectedRegion === "Nacional"
    ? data.datos_nacionales.map((item) => ({
        trimestre: item.trimestre,
        tasa: parseFloat((item.tasa_desocupacion * 100).toFixed(1)),
      }))
    : data.datos_regionales
        .find((region) => region.region === selectedRegion)
        ?.datos_trimestrales
        ? Object.entries(data.datos_regionales.find((region) => region.region === selectedRegion)!.datos_trimestrales)
            .map(([trimestre, valores]) => ({
              trimestre,
              tasa: parseFloat((valores.indicadores_base.tasa_desocupacion * 100).toFixed(1)),
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
        <CardTitle>Tasa de Desocupación</CardTitle>
        <CardDescription>
          Evolución de la tasa de desocupación {selectedRegion === "Nacional" ? "en Chile" : `en ${selectedRegion}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" />
              <XAxis 
                dataKey="trimestre" 
                tick={{ fontSize: 12 }} 
                tickFormatter={(value) => value.split("-")[1]}
                minTickGap={15}
              />
              <YAxis 
                domain={[0, 'dataMax + 2']}
                tickFormatter={(value) => `${value}%`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, "Tasa de Desocupación"]}
                labelFormatter={(label) => `Período: ${label}`}
                contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #d4d4d8" }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="tasa" 
                name="Tasa de Desocupación" 
                stroke="#EE3831" 
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
