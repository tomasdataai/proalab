import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { CaseStudyTestimonial } from "./case-study-testimonial"

export function EnterpriseCaseStudy() {
  return (
    <Card className="border-2 border-[#E50695]">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Badge className="mb-4 bg-[#E50695]">Caso de Estudio</Badge>
            <h3 className="text-2xl font-bold mb-4 text-[#25282A] dark:text-white">
              Corporación Tecnológica Internacional
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              La corporación implementó ProaLAB para alinear sus programas de capacitación interna con las tendencias
              tecnológicas emergentes, logrando:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-[#E50695] font-bold">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Reducción del 30% en tiempo de adaptación a nuevas tecnologías
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E50695] font-bold">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Aumento del 25% en la retención de talento especializado
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E50695] font-bold">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Desarrollo de un pipeline de talento alineado con necesidades futuras
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E50695] font-bold">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Mejora en la competitividad en mercados emergentes
                </span>
              </li>
            </ul>
            <Button className="bg-[#E50695] hover:bg-[#EE3831]">
              Ver caso completo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <CaseStudyTestimonial
            quote="Como empresa, encontramos en ProaLAB un aliado estratégico para identificar y desarrollar el talento que necesitaremos en los próximos años. Su capacidad para anticipar tendencias tecnológicas nos ha dado una ventaja competitiva significativa."
            avatarInitials="AM"
            avatarBgColor="bg-[#E50695]"
            name="Ana Martínez"
            role="Directora de RRHH"
          />
        </div>
      </CardContent>
    </Card>
  )
}

