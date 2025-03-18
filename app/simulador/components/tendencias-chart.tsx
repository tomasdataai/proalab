"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { SimuladorData } from "../page"

interface TendenciasChartProps {
  data: SimuladorData
  region?: string
  indicador: "desocupacion" | "ila" | "fuerzaTrabajo"
}

interface TendenciasData {
  periodo: string
  valor: number
  trimestre: string
}

export default function TendenciasChart({ data, region = "Nacional", indicador }: TendenciasChartProps) {
  if (!data) {
    return <Card><CardContent>Cargando datos...</CardContent></Card>
  }

  let chartData: TendenciasData[] = [];
  let titulo = "";
  let descripcion = "";
  let color = "#3b82f6";
  let unidad = "";
  
  if (region === "Nacional") {
    // Ordenar cronológicamente los datos nacionales
    const periodos = [...data.metadatos.periodos.disponibles].sort();
    
    chartData = periodos.map(periodo => {
      const datoNacional = data.datos_nacionales.find(d => d.trimestre === periodo);
      
      if (!datoNacional) return null;
      
      let valor = 0;
      switch (indicador) {
        case "desocupacion":
          valor = datoNacional.tasa_desocupacion * 100;
          break;
        case "ila":
          valor = datoNacional.ila_regional;
          break;
        case "fuerzaTrabajo":
          valor = datoNacional.fuerza_trabajo;
          break;
      }
      
      return {
        periodo: datoNacional.periodo,
        trimestre: periodo,
        valor: parseFloat(valor.toFixed(2))
      };
    }).filter(Boolean) as TendenciasData[];
  } else {
    // Buscar los datos para la región seleccionada
    const regionData = data.datos_regionales.find(r => r.region === region);
    
    if (regionData) {
      const periodos = Object.keys(regionData.datos_trimestrales).sort();
      
      chartData = periodos.map(periodo => {
        const datoRegional = regionData.datos_trimestrales[periodo];
        
        if (!datoRegional || !datoRegional.indicadores_base) return null;
        
        let valor = 0;
        switch (indicador) {
          case "desocupacion":
            valor = datoRegional.indicadores_base.tasa_desocupacion * 100;
            break;
          case "ila":
            if (datoRegional.indicadores_base.ila_regional) {
              valor = datoRegional.indicadores_base.ila_regional;
            }
            break;
          case "fuerzaTrabajo":
            valor = datoRegional.indicadores_base.fuerza_trabajo;
            break;
        }
        
        return {
          trimestre: periodo,
          periodo: periodo,  // Aquí podríamos buscar el periodo conceptual si está disponible
          valor: parseFloat(valor.toFixed(2))
        };
      }).filter(Boolean) as TendenciasData[];
    }
  }
  
  // Configuración según el indicador
  switch (indicador) {
    case "desocupacion":
      titulo = "Tendencia de Tasa de Desocupación";
      descripcion = `Evolución de la tasa de desocupación para ${region}`;
      color = "#ef4444";
      unidad = "%";
      break;
    case "ila":
      titulo = "Tendencia de Índice Laboral Ajustado (ILA)";
      descripcion = `Evolución del ILA para ${region}`;
      color = "#eab308";
      unidad = "";
      break;
    case "fuerzaTrabajo":
      titulo = "Tendencia de Fuerza de Trabajo";
      descripcion = `Evolución de la fuerza de trabajo para ${region}`;
      color = "#22c55e";
      unidad = "K";
      break;
  }

  return (
    <Card className="col-span-12 md:col-span-6">
      <CardHeader>
        <CardTitle>{titulo}</CardTitle>
        <CardDescription>{descripcion}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="trimestre" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value}${unidad}`, indicador === "desocupacion" ? "Tasa de Desocupación" : 
                                        indicador === "ila" ? "ILA" : "Fuerza de Trabajo"]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="valor"
                stroke={color}
                strokeWidth={2}
                activeDot={{ r: 8 }}
                name={indicador === "desocupacion" ? "Tasa de Desocupación" : 
                      indicador === "ila" ? "ILA" : "Fuerza de Trabajo"}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
