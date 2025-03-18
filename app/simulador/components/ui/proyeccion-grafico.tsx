"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  Area
} from "recharts";
import { DatoProyectado } from "../../lib/types";

interface ProyeccionGraficoProps {
  datos: DatoProyectado[];
  indicadorActual: "desocupacion" | "ila";
  filtros: {
    mostrarHistoricos: boolean;
    mostrarProyeccion: boolean;
    mostrarIntervalos: boolean;
  };
  intervaloConfianza: number;
}

export default function ProyeccionGrafico({
  datos,
  indicadorActual,
  filtros,
  intervaloConfianza
}: ProyeccionGraficoProps) {
  // Obtener color seguu00fan el indicador
  const obtenerColor = () => {
    return indicadorActual === "desocupacion" ? "#ef4444" : "#eab308";
  };

  return (
    <div className="h-[500px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={datos}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="trimestre" 
            angle={-45} 
            textAnchor="end" 
            height={70} 
            interval={0}
          />
          <YAxis 
            domain={indicadorActual === "desocupacion" ? [0, 'auto'] : ['auto', 'auto']}
            label={{
              value: indicadorActual === "desocupacion" ? "Tasa (%)" : "u00cdndice",
              angle: -90,
              position: 'insideLeft'
            }}
          />
          <Tooltip 
            formatter={(value, name, props) => {
              if (name === "Datos Histu00f3ricos") {
                return [indicadorActual === "desocupacion" ? `${value}%` : value, 
                indicadorActual === "desocupacion" ? "Tasa de Desocupaciu00f3n" : "ILA"];
              } else if (name === "Proyecciu00f3n") {
                const item = props.payload;
                const min = item.valorMin !== undefined ? item.valorMin.toFixed(2) : null;
                const max = item.valorMax !== undefined ? item.valorMax.toFixed(2) : null;
                
                return [
                  <span>
                    {indicadorActual === "desocupacion" ? `${value}%` : value}
                    {min && max ? ` (IC ${intervaloConfianza}%: ${min}-${max})` : ''}
                  </span>, 
                  indicadorActual === "desocupacion" ? "Tasa de Desocupaciu00f3n Proyectada" : "ILA Proyectado"
                ];
              }
              return [value, name];
            }}
            labelFormatter={(label) => `Peru00edodo: ${label}`}
            contentStyle={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '4px', padding: '10px' }}
          />
          <Legend />
          
          {/* Una lu00ednea para histu00f3rico y otra para proyecciu00f3n */}
          {filtros.mostrarHistoricos && (
            <Line
              name="Datos Histu00f3ricos"
              type="monotone"
              dataKey="valor"
              stroke={obtenerColor()}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
              isAnimationActive={true}
              connectNulls={true}
              data={datos.filter(d => !d.proyectado)}
            />
          )}
          
          {filtros.mostrarProyeccion && (
            <Line
              name="Proyecciu00f3n"
              type="monotone"
              dataKey="valor"
              stroke={obtenerColor()}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 4 }}
              connectNulls={true}
              data={datos.filter(d => d.proyectado)}
            />
          )}
          
          {filtros.mostrarIntervalos && filtros.mostrarProyeccion && (
            <>
              <Area
                name="Intervalo de Confianza"
                type="monotone"
                dataKey="valorMin"
                stroke="transparent"
                fillOpacity={0.2}
                fill={obtenerColor()}
                connectNulls={true}
                data={datos.filter(d => d.proyectado)}
              />
              
              <Area
                name="Intervalo de Confianza"
                type="monotone"
                dataKey="valorMax"
                stroke="transparent"
                fillOpacity={0.2}
                fill={obtenerColor()}
                connectNulls={true}
                data={datos.filter(d => d.proyectado)}
              />
            </>
          )}
          
          {indicadorActual === "desocupacion" && (
            <ReferenceLine y={7} stroke="#888" strokeDasharray="3 3" label="Referencia 7%" />
          )}
          {indicadorActual === "ila" && (
            <ReferenceLine y={100} stroke="#888" strokeDasharray="3 3" label="Referencia 100" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
