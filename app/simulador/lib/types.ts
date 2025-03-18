// Tipos para el simulador de escenarios laborales

// Define los tipos para los diferentes escenarios de proyección
export type EscenarioProyeccion = "optimista" | "neutral" | "pesimista";

// Define los parámetros para la simulación
export interface ParametrosSimulacion {
  escenario: EscenarioProyeccion;
  impactoIndicador: number; // Reemplaza impactoILA e impactoDesocupacion por un solo campo
  periodosProyectar: number; // Antes horizonteTrimestres
  volatilidad: number; // Reemplaza ajusteSectorial por un nivel de volatilidad
  intervaloConfianza: number;
  periodoInicial?: string;
}

// Define la estructura para los datos proyectados
export interface DatoProyectado {
  periodo: string;
  trimestre: string;
  valor: number;
  valorMin?: number;
  valorMax?: number;
  proyectado: boolean;
}

// Define la estructura para los filtros de visualización
export interface FiltrosVisualizacion {
  mostrarHistoricos: boolean;
  mostrarProyeccion: boolean;
  mostrarIntervalos: boolean;
  ordenarPor: "cronologico" | "ascendente" | "descendente";
}
