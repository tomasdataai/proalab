"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Button } from "../../../components/ui/button";
import { SimuladorData } from "../page";
import { Download } from "lucide-react";

// Importar tipos refactorizados
import { DatoProyectado, ParametrosSimulacion, EscenarioProyeccion, FiltrosVisualizacion } from "../lib/types";

// Importar funciones de utilidad
import { 
  obtenerDatosHistoricos, 
  generarProyecciones,
  aplicarFiltros,
  exportarCSV,
} from "../lib/utils";

// Importar componentes de UI refactorizados
import ProyeccionGrafico from "./ui/proyeccion-grafico";
import ProyeccionTabla from "./ui/proyeccion-tabla";
import ConfiguracionEscenarios from "./ui/configuracion-escenarios";
import FiltrosVisualizacionComponent from "./ui/filtros-visualizacion";
import ProyeccionNotas from "./ui/proyeccion-notas";

interface EscenariosSimuladorProps {
  data: SimuladorData;
  region?: string;
}

export default function EscenariosSimulador({ data, region = "Nacional" }: EscenariosSimuladorProps) {
  // Estado para los parámetros de la simulación
  const [parametros, setParametros] = useState<ParametrosSimulacion>({
    escenario: "neutral",
    impactoIndicador: 0,       // Reemplaza impactoILA e impactoDesocupacion
    periodosProyectar: 4,      // Antes horizonteTrimestres
    volatilidad: 2,            // Reemplaza ajusteSectorial por un nivel de volatilidad
    intervaloConfianza: 95,
  });
  
  // Estado para el escenario y el indicador seleccionado
  const [escenarioActual, setEscenarioActual] = useState<EscenarioProyeccion>("neutral");
  const [indicadorActual, setIndicadorActual] = useState<"desocupacion" | "ila">("desocupacion");
  
  // Estado para los datos proyectados
  const [datosProyectados, setDatosProyectados] = useState<DatoProyectado[]>([]);
  
  // Estado para las notas y observaciones
  const [notasProyeccion, setNotasProyeccion] = useState<string>("");
  
  // Estado para filtros de visualización
  const [filtrosVisualizacion, setFiltrosVisualizacion] = useState<FiltrosVisualizacion>({
    mostrarHistoricos: true,
    mostrarProyeccion: true,
    mostrarIntervalos: true,
    ordenarPor: "cronologico"
  });
  
  // Sincronizar escenario actual con los parámetros
  useEffect(() => {
    setParametros(prev => ({ ...prev, escenario: escenarioActual }));
  }, [escenarioActual]);
  
  // Cargar notas guardadas
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const notasGuardadas = localStorage.getItem("simulador_notas_" + indicadorActual + "_" + region);
        if (notasGuardadas) {
          setNotasProyeccion(notasGuardadas);
        }
      }
    } catch (error) {
      console.error("Error al cargar notas:", error);
    }
  }, [indicadorActual, region]);
  
  // Función para generar proyecciones usando las utilidades
  const generarProyeccionesHandler = () => {
    const datosHistoricos = obtenerDatosHistoricos(data, region, indicadorActual);
    if (datosHistoricos.length === 0) return;
    
    const proyecciones = generarProyecciones(datosHistoricos, parametros, indicadorActual);
    
    // Combinar datos históricos con proyecciones
    setDatosProyectados([...datosHistoricos, ...proyecciones]);
  };
  
  // Función para exportar datos usando la utilidad
  const exportarDatosCSV = () => {
    if (datosProyectados.length === 0) return;
    exportarCSV(datosProyectados, indicadorActual, region, parametros.intervaloConfianza);
  };
  
  // Obtener datos filtrados para visualización
  const datosFiltrados = aplicarFiltros(datosProyectados, filtrosVisualizacion);
  
  // Obtener título y descripción según el indicador
  const obtenerTitulo = () => {
    return indicadorActual === "desocupacion" ? 
      "Proyección de Tasa de Desocupación" : 
      "Proyección de Índice Laboral Ajustado (ILA)";
  };
  
  const obtenerDescripcion = () => {
    return indicadorActual === "desocupacion" ? 
      `Escenarios de evolución futura de la tasa de desocupación para ${region}` : 
      `Escenarios de evolución futura del ILA para ${region}`;
  };
  
  return (
    <Card className="col-span-12">
      <CardHeader>
        <CardTitle>{obtenerTitulo()}</CardTitle>
        <CardDescription>{obtenerDescripcion()}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="configuracion">
          <TabsList className="mb-4">
            <TabsTrigger value="configuracion">Configuración</TabsTrigger>
            <TabsTrigger value="visualizacion">Visualización</TabsTrigger>
            <TabsTrigger value="notas">Notas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="configuracion" className="space-y-4">
            <ConfiguracionEscenarios
              parametros={parametros}
              setParametros={setParametros}
              indicadorActual={indicadorActual}
              setIndicadorActual={setIndicadorActual}
              escenarioActual={escenarioActual}
              setEscenarioActual={setEscenarioActual}
              notasProyeccion={notasProyeccion}
              setNotasProyeccion={setNotasProyeccion}
              generarProyecciones={generarProyeccionesHandler}
              region={region}
            />
          </TabsContent>
          
          <TabsContent value="visualizacion">
            {datosProyectados.length > 0 ? (
              <div className="space-y-4">
                <FiltrosVisualizacionComponent
                  filtros={filtrosVisualizacion}
                  setFiltros={setFiltrosVisualizacion}
                />
                
                <Tabs defaultValue="grafico" className="w-full">
                  <TabsList>
                    <TabsTrigger value="grafico">Gráfico</TabsTrigger>
                    <TabsTrigger value="tabla">Tabla de Datos</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="grafico">
                    <ProyeccionGrafico
                      datos={datosFiltrados}
                      indicadorActual={indicadorActual}
                      filtros={filtrosVisualizacion}
                      intervaloConfianza={parametros.intervaloConfianza}
                    />
                  </TabsContent>
                  
                  <TabsContent value="tabla">
                    <ProyeccionTabla
                      datos={datosFiltrados}
                      indicadorActual={indicadorActual}
                      mostrarIntervalos={filtrosVisualizacion.mostrarIntervalos}
                      intervaloConfianza={parametros.intervaloConfianza}
                    />
                  </TabsContent>
                </Tabs>
                
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">
                    * Las proyecciones son estimaciones basadas en tendencias históricas y escenarios modelados.
                    Intervalo de confianza: {parametros.intervaloConfianza}%
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={exportarDatosCSV}
                    className="flex items-center gap-1"
                  >
                    <Download size={14} />
                    Exportar Datos
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center p-8">
                <p className="text-gray-500">No hay datos proyectados disponibles. Configure los parámetros y genere una proyección.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="notas">
            <ProyeccionNotas
              notasProyeccion={notasProyeccion}
              setNotasProyeccion={setNotasProyeccion}
              indicadorActual={indicadorActual}
              region={region}
              parametros={parametros}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
