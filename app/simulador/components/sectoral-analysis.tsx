"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { SimuladorData } from "../page"

interface SectoralAnalysisProps {
  data: SimuladorData
  selectedRegion: string
  selectedPeriod: string
}

interface SectorData {
  name: string;
  value: number;
  color: string;
}

export default function SectoralAnalysis({ data, selectedRegion, selectedPeriod }: SectoralAnalysisProps) {
  // Datos de ejemplo para la distribución sectorial (en una aplicación real, estos vendrían del backend)
  const sectorData: SectorData[] = [
    { name: "Agricultura", value: 12, color: "#10B981" },
    { name: "Minería", value: 8, color: "#F1B434" },
    { name: "Industria", value: 15, color: "#EE3831" },
    { name: "Construcción", value: 10, color: "#E50695" },
    { name: "Comercio", value: 20, color: "#3B82F6" },
    { name: "Servicios", value: 35, color: "#8B5CF6" }
  ];

  // Ajustar los datos según la región seleccionada (simulado)
  const adjustedData = selectedRegion === "Nacional" 
    ? sectorData 
    : sectorData.map(item => {
        // Simulamos variaciones regionales
        const randomFactor = 0.8 + Math.random() * 0.4; // Factor entre 0.8 y 1.2
        return {
          ...item,
          value: Math.round(item.value * randomFactor)
        };
      });

  // Calcular el total para los porcentajes
  const total = adjustedData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análisis Sectorial</CardTitle>
        <CardDescription>
          Distribución de la fuerza laboral por sector en {selectedRegion === "Nacional" ? "Chile" : selectedRegion} ({selectedPeriod})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={adjustedData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {adjustedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} (${((value / total) * 100).toFixed(1)}%)`, "Participación"]}
                contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #d4d4d8" }}
              />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>* Los datos sectoriales son simulados con fines ilustrativos</p>
        </div>
      </CardContent>
    </Card>
  )
}
