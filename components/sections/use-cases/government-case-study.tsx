import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { CaseStudyTestimonial } from "./case-study-testimonial"

export function GovernmentCaseStudy() {
  return (
    <Card className="border-2 border-[#F1B434]">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Badge className="mb-4 bg-[#F1B434] text-[#25282A]">Caso de Estudio</Badge>
            <h3 className="text-2xl font-bold mb-4 text-[#25282A] dark:text-white">Ministerio de Educación Regional</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              El Ministerio utilizó ProaLAB para desarrollar políticas educativas basadas en evidencia y proyecciones de
              demanda laboral, consiguiendo:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-[#F1B434] font-bold">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Reducción del 42% en la brecha entre formación y empleo
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#F1B434] font-bold">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Optimización de la inversión pública en programas educativos
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#F1B434] font-bold">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Creación de un observatorio laboral con actualización en tiempo real
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#F1B434] font-bold">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Mejora en la coordinación entre instituciones educativas y sector productivo
                </span>
              </li>
            </ul>
            <Button className="bg-[#F1B434] hover:bg-[#E50695] text-[#25282A] hover:text-white">
              Ver caso completo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <CaseStudyTestimonial
            quote="La precisión de los modelos predictivos de ProaLAB nos ha permitido diseñar políticas educativas con un enfoque prospectivo, anticipándonos a las necesidades del mercado laboral. Esto ha resultado en una asignación más eficiente de recursos y mejores resultados para nuestros estudiantes."
            avatarInitials="CM"
            avatarBgColor="bg-[#F1B434]"
            avatarTextColor="text-[#25282A]"
            name="Carlos Mendoza"
            role="Secretario de Educación"
          />
        </div>
      </CardContent>
    </Card>
  )
}

