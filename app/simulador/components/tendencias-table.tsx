"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { SimuladorData } from "../page"

interface TendenciasTableProps {
  data: SimuladorData
  selectedRegion: string
}

interface TableDataItem {
  trimestre: string;
  tasa_desocupacion: number;
  ila: number;
  fuerza_trabajo: number;
  poblacion_total?: number;
}

interface TableDataWithChanges extends TableDataItem {
  var_tasa: number | null;
  var_ila: number | null;
  var_fuerza: number | null;
}

export default function TendenciasTable({ data, selectedRegion }: TendenciasTableProps) {
  // Verificar que los datos existan antes de procesarlos
  if (!data || !data.datos_nacionales || !data.datos_regionales) {
    return <div>Cargando datos...</div>;
  }

  // Preparar datos para la tabla de tendencias
  let tableData: TableDataItem[] = [];
  
  if (selectedRegion === "Nacional") {
    // Datos nacionales
    tableData = data.datos_nacionales.map((item) => ({
      trimestre: item.trimestre,
      tasa_desocupacion: parseFloat((item.tasa_desocupacion * 100).toFixed(1)),
      ila: parseFloat(item.ila_regional.toFixed(1)),
      fuerza_trabajo: parseFloat((item.fuerza_trabajo / 1000).toFixed(1))
    }));
  } else {
    // Datos regionales
    const regionData = data.datos_regionales.find((region) => region.region === selectedRegion);
    
    if (regionData && regionData.datos_trimestrales) {
      tableData = Object.entries(regionData.datos_trimestrales).map(([trimestre, valores]) => ({
        trimestre,
        tasa_desocupacion: parseFloat((valores.indicadores_base.tasa_desocupacion * 100).toFixed(1)),
        ila: parseFloat(valores.indicadores_derivados.ila.toFixed(1)),
        fuerza_trabajo: parseFloat(valores.indicadores_base.fuerza_trabajo.toFixed(1)),
        poblacion_total: parseFloat((valores.indicadores_base.poblacion_total / 1000).toFixed(1)) // Convertir a miles
      }));
    }
  }

  // Ordenar por trimestre (del más reciente al más antiguo)
  tableData.sort((a, b) => {
    const [yearA, quarterA] = a.trimestre.split("-");
    const [yearB, quarterB] = b.trimestre.split("-");
    return yearB.localeCompare(yearA) || quarterB.localeCompare(quarterA);
  });

  // Calcular variaciones entre periodos
  const tableDataWithChanges: TableDataWithChanges[] = tableData.map((item, index) => {
    if (index === tableData.length - 1) {
      // Para el último registro (el más antiguo después de ordenar), no hay variación
      return {
        ...item,
        var_tasa: null,
        var_ila: null,
        var_fuerza: null
      };
    }

    const nextItem = tableData[index + 1]; // El período anterior
    return {
      ...item,
      var_tasa: parseFloat((item.tasa_desocupacion - nextItem.tasa_desocupacion).toFixed(1)),
      var_ila: parseFloat((item.ila - nextItem.ila).toFixed(1)),
      var_fuerza: parseFloat((item.fuerza_trabajo - nextItem.fuerza_trabajo).toFixed(1))
    };
  });

  // Función para obtener clase de color según variación
  const getVariationClass = (value: number | null) => {
    if (value === null) return "";
    if (value > 0) return "text-red-600 font-medium";
    if (value < 0) return "text-green-600 font-medium";
    return "text-gray-500";
  };

  // Función para mostrar flechas de tendencia
  const getTrendArrow = (value: number | null) => {
    if (value === null) return "";
    if (value > 0) return "↑";
    if (value < 0) return "↓";
    return "→";
  };

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Período</TableHead>
            <TableHead className="text-right">Tasa Desocupación</TableHead>
            <TableHead className="text-right">Var.</TableHead>
            <TableHead className="text-right">ILA</TableHead>
            <TableHead className="text-right">Var.</TableHead>
            <TableHead className="text-right">Fuerza Trabajo (miles)</TableHead>
            <TableHead className="text-right">Var.</TableHead>
            {selectedRegion !== "Nacional" && (
              <TableHead className="text-right">Población Total (miles)</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableDataWithChanges.map((row) => (
            <TableRow key={row.trimestre}>
              <TableCell className="font-medium">{row.trimestre}</TableCell>
              <TableCell className="text-right">{row.tasa_desocupacion}%</TableCell>
              <TableCell className={`text-right ${getVariationClass(row.var_tasa)}`}>
                {row.var_tasa !== null ? `${row.var_tasa > 0 ? '+' : ''}${row.var_tasa}% ${getTrendArrow(row.var_tasa)}` : '-'}
              </TableCell>
              <TableCell className="text-right">{row.ila}</TableCell>
              <TableCell className={`text-right ${getVariationClass(row.var_ila)}`}>
                {row.var_ila !== null ? `${row.var_ila > 0 ? '+' : ''}${row.var_ila} ${getTrendArrow(row.var_ila)}` : '-'}
              </TableCell>
              <TableCell className="text-right">{row.fuerza_trabajo}</TableCell>
              <TableCell className={`text-right ${getVariationClass(row.var_fuerza)}`}>
                {row.var_fuerza !== null ? `${row.var_fuerza > 0 ? '+' : ''}${row.var_fuerza} ${getTrendArrow(row.var_fuerza)}` : '-'}
              </TableCell>
              {selectedRegion !== "Nacional" && (
                <TableCell className="text-right">{row.poblacion_total}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
