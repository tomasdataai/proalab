"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LabelList, ReferenceLine, Cell } from "recharts"
import { SimuladorData } from "../page"

interface RegionComparisonProps {
  data: SimuladorData
  selectedPeriod: string
}

interface RegionChartData {
  region: string
  desocupacion: number
  ilaRegional?: number
  fuerzaTrabajo: number
  macrozona: string
}

export default function RegionComparison({ data, selectedPeriod }: RegionComparisonProps) {
  if (!data || !data.datos_regionales) {
    return <Card><CardContent>Cargando datos...</CardContent></Card>
  }

  // Extraer los datos de cada región para el período seleccionado
  const regionsData = data.datos_regionales
    .map((region) => {
      const datosTrimestre = region.datos_trimestrales[selectedPeriod];
      if (!datosTrimestre || !datosTrimestre.indicadores_base) return null;
      
      return {
        region: region.region,
        desocupacion: parseFloat((datosTrimestre.indicadores_base.tasa_desocupacion * 100).toFixed(1)),
        ilaRegional: datosTrimestre.indicadores_base.ila_regional ? 
          parseFloat(datosTrimestre.indicadores_base.ila_regional.toFixed(1)) : undefined,
        fuerzaTrabajo: datosTrimestre.indicadores_base.fuerza_trabajo,
        macrozona: region.macrozona
      };
    });
    
  // Filtrar valores nulos y convertir a tipo correcto
  const chartData: RegionChartData[] = regionsData.filter(Boolean) as RegionChartData[];
  
  // Ordenar por tasa de desocupación (de mayor a menor)
  chartData.sort((a, b) => b.desocupacion - a.desocupacion);

  // Obtener el dato nacional para la línea de referencia
  const datoNacional = data.datos_nacionales.find(d => d.trimestre === selectedPeriod);
  const promedioNacionalDesocupacion = datoNacional 
    ? parseFloat((datoNacional.tasa_desocupacion * 100).toFixed(1))
    : null;

  // Obtener estadísticas por macrozona
  const macrozonas = [...new Set(chartData.map(item => item.macrozona))];
  const colorMap: Record<string, string> = {
    "Norte Grande": "#ef4444",
    "Norte Chico": "#f97316",
    "Zona Central": "#eab308",
    "Zona Sur": "#22c55e",
    "Zona Austral": "#3b82f6",
  };

  return (
    <Card className="col-span-12 md:col-span-6">
      <CardHeader>
        <CardTitle>Comparación Regional: Desocupación {selectedPeriod}</CardTitle>
        <CardDescription>
          Tasa de desocupación (%) por región para el período seleccionado.
          {promedioNacionalDesocupacion && 
            ` La línea punteada indica el promedio nacional: ${promedioNacionalDesocupacion}%`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[600px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis 
                type="number" 
                domain={[0, Math.ceil(Math.max(...chartData.map(d => d.desocupacion)))+2]} 
                tickFormatter={(tick) => `${tick}%`} 
              />
              <YAxis 
                type="category" 
                dataKey="region" 
                width={100} 
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === "desocupacion") return [`${value}%`, "Tasa de Desocupación"]
                  if (name === "ilaRegional") return [value, "Índice Laboral Ajustado"]
                  if (name === "fuerzaTrabajo") return [`${Number(value).toLocaleString()} miles`, "Fuerza de Trabajo"]
                  return [value, name]
                }}
              />
              <Legend />
              <Bar 
                dataKey="desocupacion" 
                name="Desocupación (%)" 
                radius={[0, 4, 4, 0]}
                fill="#ef4444"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colorMap[entry.macrozona] || "#ef4444"} />
                ))}
                <LabelList dataKey="desocupacion" position="right" formatter={(value: number) => `${value}%`} />
              </Bar>
              {promedioNacionalDesocupacion && (
                <ReferenceLine 
                  x={promedioNacionalDesocupacion} 
                  stroke="#000" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  label={{ 
                    value: `Nacional: ${promedioNacionalDesocupacion}%`, 
                    position: 'top',
                    fill: '#000',
                    fontSize: 12
                  }} 
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-5 gap-2">
          {macrozonas.map(macrozona => (
            <div key={macrozona} className="flex items-center gap-2 text-sm">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colorMap[macrozona] || "#777" }}></div>
              <span>{macrozona}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
