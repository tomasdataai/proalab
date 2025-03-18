"use client"

import { Badge } from "../../../../components/ui/badge";
import { DatoProyectado } from "../../lib/types";

interface ProyeccionTablaProps {
  datos: DatoProyectado[];
  indicadorActual: "desocupacion" | "ila";
  mostrarIntervalos: boolean;
  intervaloConfianza: number;
}

export default function ProyeccionTabla({
  datos,
  indicadorActual,
  mostrarIntervalos,
  intervaloConfianza
}: ProyeccionTablaProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Peru00edodo</th>
            <th className="border px-4 py-2 text-left">Trimestre</th>
            <th className="border px-4 py-2 text-right">
              {indicadorActual === "desocupacion" ? "Tasa de Desocupaciu00f3n (%)" : "ILA"}
            </th>
            {mostrarIntervalos && (
              <>
                <th className="border px-4 py-2 text-right">Lu00edmite Inferior</th>
                <th className="border px-4 py-2 text-right">Lu00edmite Superior</th>
              </>
            )}
            <th className="border px-4 py-2 text-center">Tipo</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((dato, idx) => (
            <tr key={idx} className={dato.proyectado ? "bg-blue-50" : ""} title={dato.proyectado ? `Dato proyectado` : `Dato histu00f3rico`}>
              <td className="border px-4 py-2">{dato.periodo}</td>
              <td className="border px-4 py-2">{dato.trimestre}</td>
              <td className="border px-4 py-2 text-right font-medium">
                {indicadorActual === "desocupacion" ? `${dato.valor}%` : dato.valor.toFixed(2)}
              </td>
              {mostrarIntervalos && (
                <>
                  <td className="border px-4 py-2 text-right text-gray-600">
                    {dato.proyectado && dato.valorMin ? dato.valorMin.toFixed(2) : "-"}
                  </td>
                  <td className="border px-4 py-2 text-right text-gray-600">
                    {dato.proyectado && dato.valorMax ? dato.valorMax.toFixed(2) : "-"}
                  </td>
                </>
              )}
              <td className="border px-4 py-2 text-center">
                <Badge variant={dato.proyectado ? "outline" : "secondary"}>
                  {dato.proyectado ? "Proyectado" : "Histu00f3rico"}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
