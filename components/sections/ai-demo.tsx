import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export function AIDemo() {
  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-r from-[#25282A] to-[#3A3D3F] text-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge className="inline-flex bg-[#E50695]">Inteligencia Artificial</Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Proa AI: Inteligencia Artificial al servicio de la educación
              </h2>
              <p className="max-w-[600px] text-gray-300 md:text-lg">
                Nuestra plataforma de IA especializada permite acceder a insights educativos y laborales mediante
                tecnología de vanguardia.
              </p>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 mt-0.5 text-[#E50695]" />
                <span className="text-gray-300">
                  Recuperación aumentada de información (RAG) para reducir alucinaciones
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 mt-0.5 text-[#E50695]" />
                <span className="text-gray-300">Arquitectura de mezcla de expertos para consultas especializadas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 mt-0.5 text-[#E50695]" />
                <span className="text-gray-300">Personalización de embeddings para su organización o institución</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 mt-0.5 text-[#E50695]" />
                <span className="text-gray-300">Generación de reportes y análisis con fuentes verificadas</span>
              </li>
            </ul>
            <div className="flex flex-col gap-2 sm:flex-row pt-4">
              <Button size="lg" className="gap-1 bg-[#E50695] hover:bg-[#EE3831]">
                Solicitar acceso anticipado <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden border-2 border-[#E50695] bg-[#1A1A1A] p-6">
            <div className="absolute top-4 right-4 flex space-x-2">
              <div className="h-3 w-3 rounded-full bg-[#EE3831]"></div>
              <div className="h-3 w-3 rounded-full bg-[#F1B434]"></div>
              <div className="h-3 w-3 rounded-full bg-[#E50695]"></div>
            </div>
            <div className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#E50695] flex items-center justify-center text-white font-bold">
                    P
                  </div>
                  <div className="flex-1 rounded-lg bg-gray-800 p-3">
                    <p className="text-sm text-gray-300">
                      ¿Cuáles son las carreras con mayor proyección en el sector tecnológico para los próximos 5 años?
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#25282A] flex items-center justify-center text-white font-bold">
                    AI
                  </div>
                  <div className="flex-1 rounded-lg bg-gray-800 p-3">
                    <p className="text-sm text-gray-300">
                      Según nuestros análisis predictivos, las carreras con mayor proyección en el sector tecnológico
                      para los próximos 5 años son:
                    </p>
                    <ol className="list-decimal pl-5 mt-2 text-sm text-gray-300 space-y-1">
                      <li>Ingeniería en Inteligencia Artificial y Ciencia de Datos</li>
                      <li>Desarrollo de Software con especialización en Cloud Computing</li>
                      <li>Ciberseguridad</li>
                      <li>Ingeniería en Robótica y Automatización</li>
                      <li>Diseño de Experiencia de Usuario (UX/UI)</li>
                    </ol>
                    <p className="text-sm text-gray-300 mt-2">
                      Estas proyecciones se basan en el análisis de tendencias de contratación, inversión sectorial y
                      evolución tecnológica en Chile y Latinoamérica.
                    </p>
                    <div className="mt-2 text-xs text-gray-400">
                      Fuentes: Observatorio Laboral SENCE, Informes BID 2023, Análisis ProaLAB 2024
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

