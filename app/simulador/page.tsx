"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

import RegionComparison from "./components/region-comparison"
import TendenciasChart from "./components/tendencias-chart"
import StatsCard from "./components/stats-card"
import SectoralChart from "./components/sectoral-chart"
import EscenariosSimulador from "./components/escenarios-simulador"

// Definir la estructura de los datos
export interface SimuladorData {
  metadatos: {
    fecha_generacion: string;
    periodos: {
      disponibles: string[];
      conceptuales: Record<string, string[]>;
    };
    regiones: {
      total: number;
      lista: string[];
    };
  };
  datos_nacionales: Array<{
    trimestre: string;
    tasa_desocupacion: number;
    ila_regional: number;
    fuerza_trabajo: number;
    poblacion_total: number;
    fecha: string;
    periodo: string;
    tasa_desocupacion_pct: number;
  }>;
  datos_regionales: Array<{
    region: string;
    region_id: number;
    region_codigo: string;
    macrozona: string;
    datos_trimestrales: Record<string, {
      indicadores_base: {
        fuerza_trabajo: number;
        tasa_desocupacion: number;
        poblacion_total: number;
        edad_promedio?: number;
        ila_regional?: number;
      };
      indices_ocupacionales?: {
        Administrativos?: { valor: number; valor_normalizado: number };
        Artesanos?: { valor: number; valor_normalizado: number };
        Directores?: { valor: number; valor_normalizado: number };
        Elementales?: { valor: number; valor_normalizado: number };
        Operadores?: { valor: number; valor_normalizado: number };
        Profesionales?: { valor: number; valor_normalizado: number };
        Servicios?: { valor: number; valor_normalizado: number };
        Tecnicos?: { valor: number; valor_normalizado: number };
      };
      indices_calificacion?: {
        Alta_calificacion?: number;
        Media_calificacion?: number;
        Baja_calificacion?: number;
      };
      metadata?: {
        periodo: string;
        anno: number;
        trimestre_num: number;
        fecha_referencia: string;
      };
    }>;
    estadisticas?: {
      ila_promedio: number;
      desocupacion_promedio: number;
      fuerza_trabajo_promedio: number;
    };
  }>;
}

export default function SimuladorPage() {
  const [data, setData] = useState<SimuladorData | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [selectedPeriodGroup, setSelectedPeriodGroup] = useState<string>("todos");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Cargar los datos
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('/data/simulador/simulador_escenarios_laborales.json');
        if (!response.ok) {
          throw new Error('No se pudieron cargar los datos');
        }
        const jsonData: SimuladorData = await response.json();
        setData(jsonData);
        
        // Establecer el periodo por defecto (el más reciente)
        if (jsonData.metadatos?.periodos?.disponibles?.length > 0) {
          const periodos = jsonData.metadatos.periodos.disponibles;
          setSelectedPeriod(periodos[periodos.length - 1]); // Último periodo disponible
        }
      } catch (err) {
        console.error('Error al cargar los datos:', err);
        setError('Ocurrió un error al cargar los datos. Por favor, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filtrar periodos según el grupo seleccionado
  const filteredPeriods = data?.metadatos?.periodos?.disponibles.filter(periodo => {
    if (selectedPeriodGroup === 'todos') return true;
    
    const conceptuales = data.metadatos.periodos.conceptuales;
    return Object.entries(conceptuales).some(([grupo, periodos]) => {
      return grupo === selectedPeriodGroup && periodos.includes(periodo);
    });
  }) || [];

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Cargando datos...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center h-64">
              <p className="text-destructive">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">No hay datos disponibles</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Simulador de Escenarios Laborales</CardTitle>
            <CardDescription>
              Analiza indicadores del mercado laboral por región y periodo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Grupo de Periodos</label>
                <Select 
                  value={selectedPeriodGroup} 
                  onValueChange={setSelectedPeriodGroup}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un grupo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los periodos</SelectItem>
                    {Object.keys(data.metadatos.periodos.conceptuales).map(grupo => (
                      <SelectItem key={grupo} value={grupo}>{grupo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Periodo</label>
                <Select 
                  value={selectedPeriod} 
                  onValueChange={setSelectedPeriod}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un periodo" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredPeriods.map(periodo => (
                      <SelectItem key={periodo} value={periodo}>{periodo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-4 border-b">
          <Tabs defaultValue="dashboard">
            <TabsList className="justify-start">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="comparacion">Comparación Regional</TabsTrigger>
              <TabsTrigger value="tendencias">Tendencias</TabsTrigger>
              <TabsTrigger value="simulacion">Simulación</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Dashboard Header con estadísticas nacionales */}
                <Card className="col-span-12">
                  <CardHeader>
                    <CardTitle>Indicadores Nacionales - {selectedPeriod}</CardTitle>
                    <CardDescription>
                      Resumen de los principales indicadores a nivel nacional
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {data.datos_nacionales
                        .filter(d => d.trimestre === selectedPeriod)
                        .map((datoNacional, idx) => {
                          // Buscar datos del periodo anterior para mostrar tendencia
                          const periodos = [...data.metadatos.periodos.disponibles].sort();
                          const currentIndex = periodos.findIndex(p => p === selectedPeriod);
                          const prevPeriod = currentIndex > 0 ? periodos[currentIndex - 1] : null;
                          const datoAnterior = prevPeriod ? 
                            data.datos_nacionales.find(d => d.trimestre === prevPeriod) : null;
                          
                          // Calcular tendencias
                          const desocupacionTrend = datoAnterior ? 
                            ((datoNacional.tasa_desocupacion - datoAnterior.tasa_desocupacion) / datoAnterior.tasa_desocupacion) * 100 : undefined;
                            
                          const ilaTrend = datoAnterior ? 
                            ((datoNacional.ila_regional - datoAnterior.ila_regional) / datoAnterior.ila_regional) * 100 : undefined;
                            
                          const fuerzaTrabajoTrend = datoAnterior ? 
                            ((datoNacional.fuerza_trabajo - datoAnterior.fuerza_trabajo) / datoAnterior.fuerza_trabajo) * 100 : undefined;
                          
                          return (
                            <div key={idx} className="grid grid-cols-1 gap-4">
                              <StatsCard 
                                title="Tasa de Desocupación" 
                                value={`${(datoNacional.tasa_desocupacion * 100).toFixed(1)}%`}
                                trend={desocupacionTrend}
                                subtitle={`Periodo: ${datoNacional.periodo}`}
                              />
                              <StatsCard 
                                title="Índice Laboral Ajustado" 
                                value={datoNacional.ila_regional.toFixed(1)}
                                trend={ilaTrend}
                                subtitle={`Base nacional`}
                              />
                              <StatsCard 
                                title="Fuerza de Trabajo" 
                                value={`${datoNacional.fuerza_trabajo.toLocaleString()} miles`}
                                trend={fuerzaTrabajoTrend}
                                subtitle={`Población: ${(datoNacional.poblacion_total / 1000).toFixed(1)}M`}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </CardContent>
                </Card>

                {/* Desocupación Regional */}
                <RegionComparison data={data} selectedPeriod={selectedPeriod} />

                {/* Análisis Sectorial */}
                {selectedRegion && selectedRegion !== "Nacional" && (
                  <SectoralChart data={data} selectedRegion={selectedRegion} selectedPeriod={selectedPeriod} />
                )}
                
                {/* Espacio para otros componentes */}
              </div>
            </TabsContent>

            <TabsContent value="comparacion" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <Card className="col-span-12">
                  <CardHeader>
                    <CardTitle>Comparación Regional</CardTitle>
                    <CardDescription>
                      Analiza y compara indicadores entre regiones
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <label className="text-sm font-medium mb-2 block">Región</label>
                        <Select 
                          value={selectedRegion || "Nacional"} 
                          onValueChange={(value) => setSelectedRegion(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una región" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Nacional">Nacional</SelectItem>
                            {data.metadatos.regiones.lista.map(region => (
                              <SelectItem key={region} value={region}>{region}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <RegionComparison data={data} selectedPeriod={selectedPeriod} />
                
                {selectedRegion && selectedRegion !== "Nacional" && (
                  <SectoralChart data={data} selectedRegion={selectedRegion} selectedPeriod={selectedPeriod} />
                )}
              </div>
            </TabsContent>

            <TabsContent value="tendencias" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <Card className="col-span-12">
                  <CardHeader>
                    <CardTitle>Tendencias Históricas</CardTitle>
                    <CardDescription>
                      Evolución de indicadores en el tiempo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <label className="text-sm font-medium mb-2 block">Región</label>
                        <Select 
                          value={selectedRegion || "Nacional"} 
                          onValueChange={(value) => setSelectedRegion(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una región" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Nacional">Nacional</SelectItem>
                            {data.metadatos.regiones.lista.map(region => (
                              <SelectItem key={region} value={region}>{region}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <TendenciasChart data={data} region={selectedRegion || "Nacional"} indicador="desocupacion" />
                <TendenciasChart data={data} region={selectedRegion || "Nacional"} indicador="ila" />
                <TendenciasChart data={data} region={selectedRegion || "Nacional"} indicador="fuerzaTrabajo" />
              </div>
            </TabsContent>

            <TabsContent value="simulacion" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <Card className="col-span-12">
                  <CardHeader>
                    <CardTitle>Simulador de Escenarios Laborales</CardTitle>
                    <CardDescription>
                      Proyecta indicadores laborales bajo distintos escenarios y simulaciones
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <label className="text-sm font-medium mb-2 block">Región</label>
                        <Select 
                          value={selectedRegion || "Nacional"} 
                          onValueChange={(value) => setSelectedRegion(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una región" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Nacional">Nacional</SelectItem>
                            {data.metadatos.regiones.lista.map(region => (
                              <SelectItem key={region} value={region}>{region}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <EscenariosSimulador data={data} region={selectedRegion || "Nacional"} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
