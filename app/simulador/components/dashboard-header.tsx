"use client"

import { SimuladorData } from "../page"

interface DashboardHeaderProps {
  data: SimuladorData
  selectedRegion: string
  selectedPeriod: string
}

type NacionalPeriodData = {
  trimestre: string;
  tasa_desocupacion: number;
  ila_regional: number;
  fuerza_trabajo: number;
  poblacion_total: number;
}

type RegionalPeriodData = {
  indicadores_base: {
    tasa_desocupacion: number;
    fuerza_trabajo: number;
    poblacion_total: number;
  };
  indicadores_derivados: {
    ila: number;
    ocupados_formales?: number;
    salario_promedio?: number;
  };
}

export default function DashboardHeader({ data, selectedRegion, selectedPeriod }: DashboardHeaderProps) {
  // Verificar que los datos existan
  if (!data || !data.metadatos || !data.datos_nacionales || !data.datos_regionales) {
    return <div>Cargando datos...</div>;
  }

  // Obtener datos del período seleccionado
  let currentPeriodData: NacionalPeriodData | RegionalPeriodData | undefined;
  
  if (selectedRegion === "Nacional") {
    currentPeriodData = data.datos_nacionales.find((item: any) => item.trimestre === selectedPeriod) as NacionalPeriodData;
  } else {
    const regionData = data.datos_regionales.find((region: any) => region.region === selectedRegion);
    if (regionData && regionData.datos_trimestrales && regionData.datos_trimestrales[selectedPeriod]) {
      currentPeriodData = regionData.datos_trimestrales[selectedPeriod] as RegionalPeriodData;
    }
  }

  // Obtener el período conceptual (Pre-pandemia, Pandemia, etc.)
  const getPeriodoConceptual = () => {
    if (!data.metadatos.periodos.conceptuales) return null;
    
    const conceptuales = data.metadatos.periodos.conceptuales;
    for (const [nombre, periodos] of Object.entries(conceptuales)) {
      if (periodos.includes(selectedPeriod)) {
        return nombre;
      }
    }
    return null;
  };

  const periodoConceptual = getPeriodoConceptual();

  // Obtener la macrozona si es una región específica
  const macrozona = selectedRegion !== "Nacional"
    ? data.datos_regionales.find((region: any) => region.region === selectedRegion)?.macrozona
    : null;

  // Calcular estadísticas clave para el período seleccionado
  const getKeyStats = () => {
    if (!currentPeriodData) return null;
    
    if (selectedRegion === "Nacional") {
      const nacional = currentPeriodData as NacionalPeriodData;
      return {
        tasa_desocupacion: (nacional.tasa_desocupacion * 100).toFixed(1),
        ila: nacional.ila_regional.toFixed(1),
        fuerza_trabajo: (nacional.fuerza_trabajo / 1000).toFixed(2)
      };
    } else {
      const regional = currentPeriodData as RegionalPeriodData;
      return {
        tasa_desocupacion: (regional.indicadores_base.tasa_desocupacion * 100).toFixed(1),
        ila: regional.indicadores_derivados.ila.toFixed(1),
        fuerza_trabajo: (regional.indicadores_base.fuerza_trabajo / 1000).toFixed(2),
        poblacion: (regional.indicadores_base.poblacion_total / 1000).toFixed(2)
      };
    }
  };

  const keyStats = getKeyStats();

  // Si no hay datos disponibles, mostrar un mensaje
  if (!currentPeriodData) {
    return (
      <div className="p-4 bg-muted rounded-lg">
        <p>No hay datos disponibles para {selectedRegion} en el período {selectedPeriod}.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2 md:space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Escenario Laboral: {selectedRegion}
          </h1>
          <p className="text-muted-foreground">
            Período: {selectedPeriod} 
            {periodoConceptual && <span className="ml-2 px-2 py-0.5 bg-muted rounded-md text-xs">{periodoConceptual}</span>}
            {macrozona && <span className="ml-2 text-muted-foreground">| Macrozona: {macrozona}</span>}
          </p>
        </div>
      </div>

      {keyStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg p-3 border shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">Tasa de Desocupación</p>
            <h2 className="text-2xl font-bold mt-1">{keyStats.tasa_desocupacion}%</h2>
          </div>
          <div className="bg-card rounded-lg p-3 border shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">Índice Laboral Ajustado</p>
            <h2 className="text-2xl font-bold mt-1">{keyStats.ila}</h2>
          </div>
          <div className="bg-card rounded-lg p-3 border shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">Fuerza de Trabajo</p>
            <h2 className="text-2xl font-bold mt-1">{keyStats.fuerza_trabajo}M</h2>
          </div>
          {selectedRegion !== "Nacional" && keyStats.poblacion && (
            <div className="bg-card rounded-lg p-3 border shadow-sm">
              <p className="text-sm font-medium text-muted-foreground">Población Total</p>
              <h2 className="text-2xl font-bold mt-1">{keyStats.poblacion}M</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
