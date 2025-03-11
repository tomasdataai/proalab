import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2, BarChart3 } from "lucide-react"

export function StudentResources() {
  return (
    <section
      id="student-resources"
      className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#25282A] to-[#3A3D3F] text-white"
    >
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge className="inline-flex bg-[#F1B434] text-[#25282A]">Acceso Libre</Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Recursos para Estudiantes</h2>
              <p className="max-w-[600px] text-gray-300 md:text-lg">
                Democratizando el acceso a la información educativa y laboral a través de dashboards intuitivos y datos
                actualizados.
              </p>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 mt-0.5 text-[#F1B434]" />
                <span className="text-gray-300">Acceso gratuito a datos de carreras genéricas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 mt-0.5 text-[#F1B434]" />
                <span className="text-gray-300">Dashboards interactivos y fáciles de usar</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 mt-0.5 text-[#F1B434]" />
                <span className="text-gray-300">Información actualizada del mercado laboral</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 mt-0.5 text-[#F1B434]" />
                <span className="text-gray-300">Recursos para estudiantes, familias y profesores</span>
              </li>
            </ul>
            <div className="flex flex-col gap-2 sm:flex-row pt-4">
              <Button size="lg" className="gap-1 bg-[#F1B434] text-[#25282A] hover:bg-[#E50695] hover:text-white">
                Acceder a recursos <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#25282A]"
              >
                Ver tutorial
              </Button>
            </div>
            <p className="text-xs text-gray-400">Solo requiere registro gratuito para acceder a todos los recursos</p>
          </div>
          <div className="relative rounded-xl overflow-hidden border-2 border-[#F1B434] bg-[#1A1A1A] p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Dashboard de Carreras</h3>
                <Badge variant="outline" className="border-[#F1B434] text-[#F1B434]">
                  Vista previa
                </Badge>
              </div>
              {/* Add a placeholder dashboard preview here */}
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-20 w-20 text-[#F1B434] opacity-50" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Empleabilidad</p>
                  <p className="text-2xl font-bold text-[#F1B434]">89%</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Rango Salarial</p>
                  <p className="text-2xl font-bold text-[#F1B434]">$800k - $1.2M</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

