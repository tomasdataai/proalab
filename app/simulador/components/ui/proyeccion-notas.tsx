"use client"

import { Button } from "../../../../components/ui/button";
import { toast } from "../../../../components/ui/use-toast";
import { Textarea } from "../../../../components/ui/textarea";

interface ProyeccionNotasProps {
  notasProyeccion: string;
  setNotasProyeccion: (notas: string) => void;
  indicadorActual: "desocupacion" | "ila";
  region: string;
  parametros: {
    horizonteTrimestres?: number;
    periodosProyectar?: number;
    escenario: string;
    intervaloConfianza: number;
  };
}

export default function ProyeccionNotas({
  notasProyeccion,
  setNotasProyeccion,
  indicadorActual,
  region,
  parametros
}: ProyeccionNotasProps) {
  const horizonteProyeccion = parametros.horizonteTrimestres || parametros.periodosProyectar || 4;
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Notas y Observaciones</h3>
        <Textarea
          className="min-h-[150px]"
          value={notasProyeccion}
          onChange={(e) => setNotasProyeccion(e.target.value)}
          placeholder="Agregar notas sobre la proyecciu00f3n actual..."
        />
        <div className="flex justify-end mt-2">
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
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Implicancias de la Proyecciu00f3n</h3>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-base mb-2">Contexto de la proyecciu00f3n</h4>
          <p className="text-sm text-gray-700 mb-4">
            Esta proyecciu00f3n utiliza datos histu00f3ricos del mercado laboral {region !== "Nacional" ? `de ${region}` : "nacional"} 
            para estimar la evolucciu00f3n futura del {indicadorActual === "desocupacion" ? "desempleo" : "ILA"} en los 
            pru00f3ximos {horizonteProyeccion} {horizonteProyeccion === 1 ? 'trimestre' : 'trimestres'}, 
            bajo un escenario {parametros.escenario}.
          </p>
          
          <h4 className="font-medium text-base mb-2">Interpretaciu00f3n de resultados</h4>
          {indicadorActual === "desocupacion" ? (
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <strong>Tasa de desocupaciu00f3n por encima del 7%:</strong> Indica condiciones desfavorables en el
                mercado laboral, posibles contracciones econu00f3micas y necesidad de polu00edticas activas de empleo.
              </p>
              <p>
                <strong>Tasa de desocupaciu00f3n por debajo del 7%:</strong> Sugiere un mercado laboral relativamente saludable,
                aunque es importante considerar otros indicadores como calidad del empleo y participaciu00f3n laboral.
              </p>
            </div>
          ) : (
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <strong>ILA por encima de 100:</strong> Indica un aumento en la demanda laboral y potencial
                crecimiento en la contrataciu00f3n futura.
              </p>
              <p>
                <strong>ILA por debajo de 100:</strong> Sugiere una disminuciu00f3n en la demanda laboral,
                posible estancamiento o contraccciu00f3n en contrataciones futuras.
              </p>
            </div>
          )}
          
          <h4 className="font-medium text-base mt-4 mb-2">Intervalos de Confianza ({parametros.intervaloConfianza}%)</h4>
          <p className="text-sm text-gray-700">
            El u00e1rea sombreada representa el intervalo de confianza de la proyecciu00f3n al {parametros.intervaloConfianza}%. 
            Existe un {parametros.intervaloConfianza}% de probabilidad de que el valor real se encuentre dentro de este rango, 
            considerando la incertidumbre inherente a cualquier ejercicio de proyecciu00f3n.
          </p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-base mb-2 text-blue-800">Factores de riesgo e incertidumbre</h4>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>Cambios en polu00edticas pu00fablicas laborales y econu00f3micas</li>
            <li>Shocks externos a la econoumu00eda nacional o regional</li>
            <li>Transformaciones estructurales en sectores productivos clave</li>
            <li>Eventos climatoluu00f3gicos o catu00e1strofes naturales que afecten la actividad econu00f3mica</li>
            <li>Cambios demogru00e1ficos o migratorios significativos</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
