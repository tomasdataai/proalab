import { DatoProyectado, ParametrosSimulacion, EscenarioProyeccion } from "./types";
import { SimuladorData } from "../page";

/**
 * Obtiene datos histu00f3ricos para la regiu00f3n e indicador especificados
 */
export function obtenerDatosHistoricos(
  data: SimuladorData, 
  region: string = "Nacional",
  indicadorActual: "desocupacion" | "ila"
): DatoProyectado[] {
  if (!data) return [];
  
  const periodos = [...data.metadatos.periodos.disponibles].sort();
  
  if (region === "Nacional") {
    return periodos.map(periodo => {
      const datoNacional = data.datos_nacionales.find(d => d.trimestre === periodo);
      
      if (!datoNacional) return null;
      
      let valor = 0;
      switch (indicadorActual) {
        case "desocupacion":
          valor = datoNacional.tasa_desocupacion * 100;
          break;
        case "ila":
          valor = datoNacional.ila_regional;
          break;
      }
      
      return {
        periodo: datoNacional.periodo || periodo,
        trimestre: periodo,
        valor: parseFloat(valor.toFixed(2)),
        proyectado: false
      };
    }).filter(Boolean) as DatoProyectado[];
  } else {
    // Buscar los datos para la regiu00f3n seleccionada
    const regionData = data.datos_regionales.find(r => r.region === region);
    
    if (regionData) {
      const periodos = Object.keys(regionData.datos_trimestrales).sort();
      
      return periodos.map(periodo => {
        const datoRegional = regionData.datos_trimestrales[periodo];
        
        if (!datoRegional || !datoRegional.indicadores_base) return null;
        
        let valor = 0;
        switch (indicadorActual) {
          case "desocupacion":
            valor = datoRegional.indicadores_base.tasa_desocupacion * 100;
            break;
          case "ila":
            if (datoRegional.indicadores_base.ila_regional) {
              valor = datoRegional.indicadores_base.ila_regional;
            }
            break;
        }
        
        return {
          trimestre: periodo,
          periodo: periodo,
          valor: parseFloat(valor.toFixed(2)),
          proyectado: false
        };
      }).filter(Boolean) as DatoProyectado[];
    }
  }
  
  return [];
}

/**
 * Genera proyecciones basadas en datos histu00f3ricos y paru00e1metros
 */
export function generarProyecciones(
  datosHistoricos: DatoProyectado[],
  parametros: ParametrosSimulacion,
  indicadorActual: "desocupacion" | "ila"
): DatoProyectado[] {
  if (datosHistoricos.length === 0) return [];
  
  // Obtener el u00faltimo periodo disponible
  const ultimoPeriodo = datosHistoricos[datosHistoricos.length - 1].trimestre;
  const [anioStr, trimestreStr] = ultimoPeriodo.split("-");
  let anio = parseInt(anioStr);
  let trimestre = parseInt(trimestreStr.replace("Q", ""));
  
  // Avanzar al siguiente trimestre
  trimestre++;
  if (trimestre > 4) {
    trimestre = 1;
    anio++;
  }
  
  // Obtener el u00faltimo valor como base para la proyecciu00f3n
  const ultimoValor = datosHistoricos[datosHistoricos.length - 1].valor;
  
  // Calcular factores de cambio segu00fan el escenario seleccionado
  let factorCambio = obtenerFactorCambioBase(parametros.escenario, indicadorActual);
  
  // Ajustar factor de cambio segu00fan el impacto seleccionado por el usuario
  factorCambio += parametros.impactoIndicador / 100;
  
  // Generar proyecciones para el horizonte especificado
  const proyecciones: DatoProyectado[] = [];
  let valorBase = ultimoValor;
  
  for (let i = 0; i < parametros.periodosProyectar; i++) {
    // Calcular nuevo valor proyectado con ajustes
    const ajusteEstacional = obtenerAjusteEstacional(trimestre);
    const ajusteVolatilidad = obtenerAjusteVolatilidad(parametros.volatilidad);
    
    // Aplicar cambios para calcular el nuevo valor
    let nuevoValor: number;
    if (indicadorActual === "desocupacion") {
      // Para desocupaciu00f3n, aseguramos que no baje de 3% ni suba de 20%
      nuevoValor = valorBase * (1 + factorCambio + ajusteEstacional + ajusteVolatilidad);
      nuevoValor = Math.max(3, Math.min(20, nuevoValor));
    } else {
      // Para ILA, aseguramos que no baje de 50 ni suba de 250
      nuevoValor = valorBase * (1 + factorCambio + ajusteEstacional + ajusteVolatilidad);
      nuevoValor = Math.max(50, Math.min(250, nuevoValor));
    }
    
    // Calcular intervalo de confianza
    const { valorMin, valorMax } = calcularIntervalosConfianza(
      nuevoValor, 
      parametros.intervaloConfianza,
      parametros.volatilidad
    );
    
    // Guardar proyecciu00f3n
    proyecciones.push({
      trimestre: `${anio}-Q${trimestre}`,
      periodo: `${anio} - Trimestre ${trimestre}`,
      valor: parseFloat(nuevoValor.toFixed(2)),
      valorMin: parseFloat(valorMin.toFixed(2)),
      valorMax: parseFloat(valorMax.toFixed(2)),
      proyectado: true
    });
    
    // Actualizar valor base para la siguiente iteraciu00f3n
    valorBase = nuevoValor;
    
    // Avanzar al siguiente trimestre
    trimestre++;
    if (trimestre > 4) {
      trimestre = 1;
      anio++;
    }
  }
  
  return proyecciones;
}

/**
 * Obtiene el factor de cambio base para un escenario e indicador
 */
function obtenerFactorCambioBase(
  escenario: EscenarioProyeccion,
  indicadorActual: "desocupacion" | "ila"
): number {
  switch (escenario) {
    case "optimista":
      return indicadorActual === "desocupacion" ? -0.05 : 0.03;
    case "pesimista":
      return indicadorActual === "desocupacion" ? 0.05 : -0.03;
    case "neutral":
      return 0.01;
  }
}

/**
 * Obtiene el ajuste estacional para un trimestre
 */
function obtenerAjusteEstacional(trimestre: number): number {
  return trimestre === 1 ? 0.02 : trimestre === 3 ? -0.02 : 0;
}

/**
 * Obtiene un ajuste basado en la volatilidad seleccionada
 */
function obtenerAjusteVolatilidad(volatilidad: number): number {
  const factorVolatilidad = volatilidad === 1 ? 0.02 : volatilidad === 2 ? 0.03 : 0.05;
  return (Math.random() * 2 - 1) * factorVolatilidad; // Valor entre -factor y +factor
}

/**
 * Calcula los intervalos de confianza para una proyecciu00f3n
 */
function calcularIntervalosConfianza(
  valor: number,
  intervaloConfianza: number,
  volatilidad: number
): { valorMin: number, valorMax: number } {
  // Ajustar z-score segu00fan el intervalo de confianza
  let zScore = 1.96; // Valor para 95%
  if (intervaloConfianza === 90) zScore = 1.645;
  if (intervaloConfianza === 99) zScore = 2.576;
  
  // Ajustar desviaciu00f3n estu00e1ndar segu00fan volatilidad
  const factorVolatilidad = volatilidad === 1 ? 1 : volatilidad === 2 ? 1.5 : 2.5;
  
  // Calcular margen de error adaptado al valor
  const desviacionBase = valor * 0.03 * factorVolatilidad; // 3% de desviaciu00f3n base ajustada por volatilidad
  const margenError = zScore * desviacionBase;
  
  return {
    valorMin: valor - margenError,
    valorMax: valor + margenError
  };
}

/**
 * Aplica filtros a los datos proyectados
 */
export function aplicarFiltros(
  datosProyectados: DatoProyectado[],
  filtros: {
    mostrarHistoricos: boolean;
    mostrarProyeccion: boolean;
    ordenarPor: "cronologico" | "ascendente" | "descendente";
  }
): DatoProyectado[] {
  if (datosProyectados.length === 0) return [];
  
  let datos = [...datosProyectados];
  
  // Filtrar segu00fan tipo de datos
  if (!filtros.mostrarHistoricos) {
    datos = datos.filter(d => d.proyectado);
  }
  
  if (!filtros.mostrarProyeccion) {
    datos = datos.filter(d => !d.proyectado);
  }
  
  // Ordenar datos
  if (filtros.ordenarPor === "ascendente") {
    datos = datos.sort((a, b) => a.valor - b.valor);
  } else if (filtros.ordenarPor === "descendente") {
    datos = datos.sort((a, b) => b.valor - a.valor);
  }
  // El orden cronolu00f3gico ya estu00e1 aplicado por defecto
  
  return datos;
}

/**
 * Exporta datos proyectados a un archivo CSV
 */
export function exportarCSV(
  datosProyectados: DatoProyectado[],
  indicadorActual: "desocupacion" | "ila",
  region: string,
  intervaloConfianza: number
): void {
  if (datosProyectados.length === 0) return;
  
  // Crear encabezados segu00fan el indicador actual
  const titulo = indicadorActual === "desocupacion" ? "Tasa de Desocupaciu00f3n" : "ILA";
  const encabezados = ["Periodo", "Trimestre", titulo, "Tipo"];
  
  // Au00f1adir encabezados de intervalos de confianza si hay datos proyectados
  if (datosProyectados.some(d => d.proyectado)) {
    encabezados.push(`Lu00edmite Inferior (${intervaloConfianza}%)`, `Lu00edmite Superior (${intervaloConfianza}%)`);
  }
  
  // Crear contenido CSV
  const contenido = [
    encabezados.join(","),
    ...datosProyectados.map(dato => {
      const tipo = dato.proyectado ? "Proyectado" : "Histu00f3rico";
      const valores = [
        dato.periodo,
        dato.trimestre,
        dato.valor,
        tipo
      ];
      
      if (datosProyectados.some(d => d.proyectado)) {
        valores.push(dato.valorMin || "", dato.valorMax || "");
      }
      
      return valores.join(",");
    })
  ].join("\n");
  
  // Crear archivo para descarga
  const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `proyeccion_${indicadorActual}_${region.toLowerCase().replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Obtiene informaciu00f3n del escenario para tooltips
 */
export function obtenerInfoEscenario(
  escenario: EscenarioProyeccion,
  indicadorActual: "desocupacion" | "ila"
): { titulo: string, descripcion: string } {
  switch (escenario) {
    case "optimista":
      return {
        titulo: "Escenario Optimista",
        descripcion: indicadorActual === "desocupacion" ? 
          "Contempla una mejora significativa en las condiciones econu00f3micas, con mayor generaciu00f3n de empleo y disminuciu00f3n de la tasa de desocupaciu00f3n." : 
          "Proyecta un aumento en la demanda laboral, con crecimiento sostenido del u00edndice laboral ajustado."
      };
    case "pesimista":
      return {
        titulo: "Escenario Pesimista",
        descripcion: indicadorActual === "desocupacion" ? 
          "Considera un deterioro de las condiciones econu00f3micas, con aumento de la tasa de desocupaciu00f3n y menor generaciu00f3n de empleo." :
          "Proyecta una disminuciu00f3n en la demanda laboral, con contracciones significativas en el u00edndice laboral ajustado."
      };
    default: // neutral
      return {
        titulo: "Escenario Neutral",
        descripcion: indicadorActual === "desocupacion" ? 
          "Mantiene una relativa estabilidad en las condiciones actuales del mercado laboral, sin cambios bruscos en la tasa de desocupaciu00f3n." :
          "Proyecta un comportamiento estable del u00edndice laboral ajustado, siguiendo la tendencia reciente."
      };
  }
}
