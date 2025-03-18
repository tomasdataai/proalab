"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { SimuladorData } from "../page"

interface ILAChartProps {
  data: SimuladorData
  selectedRegion: string
}

export default function ILAChart({ data, selectedRegion }: ILAChartProps) {
  // Preparar datos para el gráfico
  const chartData = selectedRegion === "Nacional"
    ? data.datos_nacionales.map((item) => ({
        trimestre: item.trimestre,
        ila: parseFloat(item.ila_regional.toFixed(1)),
      }))
    : data.datos_regionales
        .find((region) => region.region === selectedRegion)
        ?.datos_trimestrales
        ? Object.entries(data.datos_regionales.find((region) => region.region === selectedRegion)!.datos_trimestrales)
            .map(([trimestre, valores]) => ({
              trimestre,
              ila: parseFloat(valores.indicadores_derivados.ila.toFixed(1)),
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
        <CardTitle>Índice Laboral Ajustado (ILA)</CardTitle>
        <CardDescription>
          Evolución del ILA {selectedRegion === "Nacional" ? "en Chile" : `en ${selectedRegion}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" />
              <XAxis 
                dataKey="trimestre" 
                tick={{ fontSize: 12 }} 
                tickFormatter={(value) => value.split("-")[1]}
                minTickGap={15}
              />
              <YAxis 
                domain={['dataMin - 5', 'dataMax + 5']}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [value, "ILA"]}
                labelFormatter={(label) => `Período: ${label}`}
                contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #d4d4d8" }}
              />
              <Legend />
              <Bar 
                dataKey="ila" 
                name="Índice Laboral Ajustado" 
                fill="#E50695" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
