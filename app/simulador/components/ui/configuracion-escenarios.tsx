"use client"

import { Button } from "../../../../components/ui/button";
import { Slider } from "../../../../components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { Switch } from "../../../../components/ui/switch";
import { Label } from "../../../../components/ui/label";
import { HelpCircle } from "lucide-react";
import { ParametrosSimulacion, EscenarioProyeccion } from "../../lib/types";
import { obtenerInfoEscenario } from "../../lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import { Textarea } from "../../../../components/ui/textarea";
import { toast } from "../../../../components/ui/use-toast";

interface ConfiguracionEscenariosProps {
  parametros: ParametrosSimulacion;
  setParametros: (parametros: ParametrosSimulacion) => void;
  indicadorActual: "desocupacion" | "ila";
  setIndicadorActual: (indicador: "desocupacion" | "ila") => void;
  escenarioActual: EscenarioProyeccion;
  setEscenarioActual: (escenario: EscenarioProyeccion) => void;
  notasProyeccion: string;
  setNotasProyeccion: (notas: string) => void;
  generarProyecciones: () => void;
  region: string;
}

export default function ConfiguracionEscenarios({
  parametros,
  setParametros,
  indicadorActual,
  setIndicadorActual,
  escenarioActual,
  setEscenarioActual,
  notasProyeccion,
  setNotasProyeccion,
  generarProyecciones,
  region
}: ConfiguracionEscenariosProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Indicador a proyectar</h3>
        <div className="flex space-x-4">
          <Button 
            variant={indicadorActual === "desocupacion" ? "default" : "outline"}
            onClick={() => setIndicadorActual("desocupacion")}
          >
            Tasa de Desocupaciu00f3n
          </Button>
          <Button 
            variant={indicadorActual === "ila" ? "default" : "outline"}
            onClick={() => setIndicadorActual("ila")}
          >
            u00cdndice Laboral Ajustado
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="escenarios">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="escenarios">Escenarios</TabsTrigger>
          <TabsTrigger value="parametros">Paru00e1metros</TabsTrigger>
          <TabsTrigger value="notas">Notas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="escenarios">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {["optimista", "neutral", "pesimista"].map((esc) => {
                const escenarioTipo = esc as EscenarioProyeccion;
                const infoEscenario = obtenerInfoEscenario(escenarioTipo, indicadorActual);
                
                return (
                  <div 
                    key={esc} 
                    className={`border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      escenarioActual === escenarioTipo ? "border-primary bg-primary/5" : "border-gray-200"
                    }`}
                    onClick={() => setEscenarioActual(escenarioTipo)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-md">{infoEscenario.titulo}</h4>
                        <p className="text-xs text-gray-500 mt-1 max-w-xs">{infoEscenario.descripcion}</p>
                      </div>
                      
                      <div className="flex h-4 w-4 items-center justify-center rounded-full border border-primary">
                        {escenarioActual === escenarioTipo && (
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="impactoIndicador" className="flex items-center gap-2">
                  Impacto en {indicadorActual === "desocupacion" ? "Desocupaciu00f3n" : "ILA"}
                  <HelpCircle 
                    size={16} 
                    className="text-gray-400 cursor-help"  
                    title={`Define el impacto porcentual en ${indicadorActual === "desocupacion" ? "la tasa de desocupaciu00f3n" : "el u00edndice ILA"} para este escenario, relativo a la tendencia actual.`}
                  />
                </Label>
                <span className="text-xs text-gray-500">
                  {parametros.impactoIndicador > 0 ? `+${parametros.impactoIndicador}%` : `${parametros.impactoIndicador}%`}
                </span>
              </div>
              
              <Slider
                id="impactoIndicador"
                min={indicadorActual === "desocupacion" ? -50 : -30}
                max={indicadorActual === "desocupacion" ? 50 : 30}
                step={1}
                value={[parametros.impactoIndicador]}
                onValueChange={(value) => setParametros({...parametros, impactoIndicador: value[0]})}
              />
              
              <div className="grid grid-cols-3 text-center text-xs text-gray-500 mt-1">
                <div>Disminuciu00f3n</div>
                <div>Estable</div>
                <div>Aumento</div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="parametros">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="periodosProyectar" className="flex items-center gap-2">
                    Peru00edodos a proyectar
                    <HelpCircle 
                      size={16} 
                      className="text-gray-400 cursor-help" 
                      title="Nu00famero de trimestres a proyectar a partir del u00faltimo dato disponible."
                    />
                  </Label>
                  <span className="text-sm">{parametros.periodosProyectar}</span>
                </div>
                <Slider
                  id="periodosProyectar"
                  min={1}
                  max={12}
                  step={1}
                  value={[parametros.periodosProyectar]}
                  onValueChange={(value) => setParametros({...parametros, periodosProyectar: value[0]})}
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="intervaloConfianza" className="flex items-center gap-2">
                    Intervalo de confianza (%)
                    <HelpCircle 
                      size={16} 
                      className="text-gray-400 cursor-help" 
                      title="Nivel de confianza para el intervalo estadiu0301stico de las proyecciones. Un mayor porcentaje resulta en intervalos mu00e1s amplios."
                    />
                  </Label>
                  <span className="text-sm">{parametros.intervaloConfianza}%</span>
                </div>
                <Slider
                  id="intervaloConfianza"
                  min={70}
                  max={99}
                  step={1}
                  value={[parametros.intervaloConfianza]}
                  onValueChange={(value) => setParametros({...parametros, intervaloConfianza: value[0]})}
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="volatilidad" className="flex items-center gap-2">
                    Volatilidad
                    <HelpCircle 
                      size={16} 
                      className="text-gray-400 cursor-help" 
                      title="Define la variabilidad esperada en las proyecciones. Mayor volatilidad genera intervalos de confianza mu00e1s amplios."
                    />
                  </Label>
                  <span className="text-sm">
                    {parametros.volatilidad === 1 ? "Baja" : parametros.volatilidad === 2 ? "Media" : "Alta"}
                  </span>
                </div>
                <Slider
                  id="volatilidad"
                  min={1}
                  max={3}
                  step={1}
                  value={[parametros.volatilidad]}
                  onValueChange={(value) => setParametros({...parametros, volatilidad: value[0]})}
                />
                <div className="grid grid-cols-3 text-center text-xs text-gray-500 mt-1">
                  <div>Baja</div>
                  <div>Media</div>
                  <div>Alta</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notas">
          <Textarea 
            placeholder="Ingrese notas, observaciones o implicaciones de las proyecciones realizadas..."
            className="min-h-[150px]"
            value={notasProyeccion}
            onChange={(e) => setNotasProyeccion(e.target.value)}
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">
              * Las notas se guardan localmente en su navegador.
            </p>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => {
                try {
                  if (typeof window !== "undefined") {
                    localStorage.setItem("simulador_notas_" + indicadorActual + "_" + region, notasProyeccion);
                    toast({
                      title: "Notas guardadas",
                      description: "Las notas se han guardado correctamente",
                    });
                  }
                } catch (error) {
                  console.error("Error al guardar notas:", error);
                }
              }}
            >
              Guardar Notas
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6">
        <Button onClick={generarProyecciones} className="w-full">
          Generar Proyecciu00f3n
        </Button>
      </div>
    </div>
  );
}
