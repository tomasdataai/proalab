import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { CaseStudyTestimonial } from "./case-study-testimonial"

export function ResearchCaseStudy() {
  return (
    <Card className="border-2 border-[#25282A]">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Badge className="mb-4 bg-[#25282A]">Caso de Estudio</Badge>
            <h3 className="text-2xl font-bold mb-4 text-[#25282A] dark:text-white">
              Centro de Investigación Educativa
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              El centro utilizó ProaLAB para analizar grandes volúmenes de datos educativos y laborales, consiguiendo:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-[#25282A] dark:text-white font-bold">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Identificación de patrones ocultos en trayectorias educativas
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#25282A] dark:text-white font-bold">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Publicación de 12 papers en revistas científicas de alto impacto
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#25282A] dark:text-white font-bold">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Desarrollo de nuevos modelos predictivos de trayectorias educativas
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#25282A] dark:text-white font-bold">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Colaboraciones internacionales con centros de investigación líderes
                </span>
              </li>
            </ul>
            <Button className="bg-[#25282A] hover:bg-[#EE3831]">
              Ver caso completo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <CaseStudyTestimonial
            quote="La capacidad de ProaLAB para procesar y analizar grandes volúmenes de datos educativos nos ha permitido descubrir patrones y correlaciones que antes eran imposibles de detectar. Esto ha revolucionado nuestra forma de entender las trayectorias educativas y su relación con el mundo laboral."
            avatarInitials="JP"
            avatarBgColor="bg-[#25282A]"
            name="Dr. Javier Pérez"
            role="Director de Investigación"
          />
        </div>
      </CardContent>
    </Card>
  )
}

