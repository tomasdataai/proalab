"use client"

import { Badge } from "../../../../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { FiltrosVisualizacion } from "../../lib/types";

interface FiltrosVisualizacionProps {
  filtros: FiltrosVisualizacion;
  setFiltros: (filtros: FiltrosVisualizacion) => void;
}

export default function FiltrosVisualizacionComponent({
  filtros,
  setFiltros
}: FiltrosVisualizacionProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50 p-4 rounded-lg">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium">Filtros:</span>
        
        <Badge 
          variant={filtros.mostrarHistoricos ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setFiltros({...filtros, mostrarHistoricos: !filtros.mostrarHistoricos})}
        >
          <span className="flex items-center gap-1">
            <span>Datos Histu00f3ricos</span>
            {filtros.mostrarHistoricos ? 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : null}
          </span>
        </Badge>
        
        <Badge 
          variant={filtros.mostrarProyeccion ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setFiltros({...filtros, mostrarProyeccion: !filtros.mostrarProyeccion})}
        >
          <span className="flex items-center gap-1">
            <span>Proyecciu00f3n</span>
            {filtros.mostrarProyeccion ? 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : null}
          </span>
        </Badge>
        
        <Badge 
          variant={filtros.mostrarIntervalos ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setFiltros({...filtros, mostrarIntervalos: !filtros.mostrarIntervalos})}
        >
          <span className="flex items-center gap-1">
            <span>Intervalos de Confianza</span>
            {filtros.mostrarIntervalos ? 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : null}
          </span>
        </Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Ordenar:</span>
        <Select 
          value={filtros.ordenarPor}
          onValueChange={(value) => setFiltros({...filtros, ordenarPor: value as "cronologico" | "ascendente" | "descendente"})}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cronologico">Cronolu00f3gico</SelectItem>
            <SelectItem value="ascendente">Valor Ascendente</SelectItem>
            <SelectItem value="descendente">Valor Descendente</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
