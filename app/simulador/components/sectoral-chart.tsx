"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts"
import { SimuladorData } from "../page"

interface SectoralChartProps {
  data: SimuladorData
  selectedRegion: string
  selectedPeriod: string
}

interface SectorData {
  sector: string
  valor: number
  valor_normalizado: number
}

export default function SectoralChart({ data, selectedRegion, selectedPeriod }: SectoralChartProps) {
  if (!data) {
    return <Card><CardContent>Cargando datos...</CardContent></Card>
  }

  // Obtener datos sectoriales
  let chartData: SectorData[] = [];
  
  if (selectedRegion !== "Nacional") {
    const regionData = data.datos_regionales.find(r => r.region === selectedRegion);
    if (regionData && regionData.datos_trimestrales[selectedPeriod] && 
        regionData.datos_trimestrales[selectedPeriod].indices_ocupacionales) {
      
      const indices = regionData.datos_trimestrales[selectedPeriod].indices_ocupacionales;
      
      if (indices) {
        // Convertir los sectores a un formato adecuado para el gráfico
        Object.entries(indices).forEach(([sector, valores]) => {
          if (valores) {
            chartData.push({
              sector: formatSectorName(sector),
              valor: valores.valor,
              valor_normalizado: valores.valor_normalizado
            });
          }
        });
        
        // Ordenar los sectores por valor normalizado (de mayor a menor)
        chartData.sort((a, b) => b.valor_normalizado - a.valor_normalizado);
      }
    }
  }
  
  // Función para dar formato al nombre del sector
  function formatSectorName(sector: string): string {
    // Reemplazar guiones bajos por espacios y capitalizar primera letra
    return sector.replace(/_/g, ' ')
      .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }
  
  // Colores para los diferentes sectores
  const colors = [
    "#ef4444", "#f97316", "#eab308", "#22c55e", 
    "#3b82f6", "#a855f7", "#ec4899", "#64748b"
  ];

  return (
    <Card className="col-span-12 md:col-span-6">
      <CardHeader>
        <CardTitle>Análisis Sectorial: {selectedRegion}</CardTitle>
        <CardDescription>
          Índices ocupacionales por sector para el periodo {selectedPeriod}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 'dataMax + 5']} />
                <YAxis 
                  type="category" 
                  dataKey="sector" 
                  width={120} 
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === "valor_normalizado") {
                      return [`${typeof value === 'number' ? value.toFixed(1) : value}`, "índice Normalizado"];
                    }
                    return [`${typeof value === 'number' ? value.toFixed(1) : value}`, "Valor Original"];
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="valor_normalizado" 
                  name="Índice Normalizado" 
                  radius={[0, 4, 4, 0]}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[400px]">
            <p className="text-muted-foreground">No hay datos sectoriales disponibles para esta región y periodo</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
