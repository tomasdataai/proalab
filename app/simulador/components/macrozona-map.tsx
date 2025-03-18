"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { SimuladorData } from "../page"

interface MacrozonaMapProps {
  data: SimuladorData
  selectedPeriod: string
}

interface MacrozonaData {
  nombre: string;
  tasa_desocupacion: number;
  ila: number;
  color: string;
  regiones: string[];
}

export default function MacrozonaMap({ data, selectedPeriod }: MacrozonaMapProps) {
  // Definir las macrozonas de Chile
  const macrozonas: MacrozonaData[] = [
    {
      nombre: "Norte Grande",
      tasa_desocupacion: 0,
      ila: 0,
      color: "#EE3831",
      regiones: ["Arica y Parinacota", "Tarapacá", "Antofagasta"]
    },
    {
      nombre: "Norte Chico",
      tasa_desocupacion: 0,
      ila: 0,
      color: "#F1B434",
      regiones: ["Atacama", "Coquimbo"]
    },
    {
      nombre: "Zona Central",
      tasa_desocupacion: 0,
      ila: 0,
      color: "#E50695",
      regiones: ["Valparaíso", "Metropolitana", "O'Higgins", "Maule"]
    },
    {
      nombre: "Zona Sur",
      tasa_desocupacion: 0,
      ila: 0,
      color: "#3B82F6",
      regiones: ["Ñuble", "Biobío", "La Araucanía", "Los Ríos", "Los Lagos"]
    },
    {
      nombre: "Zona Austral",
      tasa_desocupacion: 0,
      ila: 0,
      color: "#10B981",
      regiones: ["Aysén", "Magallanes"]
    }
  ];

  // Calcular los promedios por macrozona
  const macrozonasProcesadas = macrozonas.map(macrozona => {
    let sumaTasas = 0;
    let sumaILA = 0;
    let regionesEncontradas = 0;

    // Buscar datos de las regiones que pertenecen a esta macrozona
    macrozona.regiones.forEach(nombreRegion => {
      const regionData = data.datos_regionales.find(r => r.region === nombreRegion);
      if (regionData && regionData.datos_trimestrales[selectedPeriod]) {
        const datosTrimestre = regionData.datos_trimestrales[selectedPeriod];
        sumaTasas += datosTrimestre.indicadores_base.tasa_desocupacion;
        sumaILA += datosTrimestre.indicadores_derivados.ila;
        regionesEncontradas++;
      }
    });

    // Calcular promedios si se encontraron regiones
    if (regionesEncontradas > 0) {
      return {
        ...macrozona,
        tasa_desocupacion: parseFloat((sumaTasas / regionesEncontradas * 100).toFixed(1)),
        ila: parseFloat((sumaILA / regionesEncontradas).toFixed(1))
      };
    }
    
    return macrozona;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mapa de Macrozonas</CardTitle>
        <CardDescription>
          Indicadores laborales por macrozona en {selectedPeriod}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {macrozonasProcesadas.map((macrozona) => (
            <div 
              key={macrozona.nombre}
              className="p-4 rounded-lg flex flex-col items-center text-center"
              style={{ backgroundColor: `${macrozona.color}20` }} // Color con transparencia
            >
              <h3 className="font-medium mb-2">{macrozona.nombre}</h3>
              <div className="space-y-2 w-full">
                <div className="bg-white bg-opacity-80 p-2 rounded">
                  <p className="text-xs text-muted-foreground">Desocupación</p>
                  <p className="text-lg font-bold">{macrozona.tasa_desocupacion}%</p>
                </div>
                <div className="bg-white bg-opacity-80 p-2 rounded">
                  <p className="text-xs text-muted-foreground">ILA</p>
                  <p className="text-lg font-bold">{macrozona.ila}</p>
                </div>
              </div>
              <div className="mt-2 text-xs">
                <p>{macrozona.regiones.length} regiones</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t pt-4">
          <h3 className="font-medium mb-2">Regiones por Macrozona</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {macrozonasProcesadas.map((macrozona) => (
              <div key={`list-${macrozona.nombre}`} className="space-y-1">
                <h4 className="text-sm font-medium" style={{ color: macrozona.color }}>
                  {macrozona.nombre}
                </h4>
                <ul className="text-sm">
                  {macrozona.regiones.map((region) => (
                    <li key={region}>{region}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
