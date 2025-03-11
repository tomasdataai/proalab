import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { CaseStudyTestimonial } from "./case-study-testimonial"

export function EducationCaseStudy() {
  return (
    <Card className="border-2 border-[#EE3831]">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Badge className="mb-4 bg-[#EE3831]">Caso de Estudio</Badge>
            <h3 className="text-2xl font-bold mb-4 text-[#25282A] dark:text-white">Universidad Nacional de Chile</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              La Universidad Nacional implementó ProaLAB para rediseñar su oferta académica basándose en proyecciones
              del mercado laboral, logrando:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-[#EE3831] font-bold">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Aumento del 27% en la empleabilidad de sus egresados
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EE3831] font-bold">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Creación de 5 nuevos programas alineados con demandas emergentes
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EE3831] font-bold">•</span>
                <span className="text-gray-600 dark:text-gray-300">Reducción del 35% en la deserción estudiantil</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EE3831] font-bold">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Mejora significativa en la satisfacción de empleadores
                </span>
              </li>
            </ul>
            <Button className="bg-[#EE3831] hover:bg-[#E50695]">
              Ver caso completo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <CaseStudyTestimonial
            quote="ProaLAB nos permitió anticipar las necesidades del mercado laboral y adaptar nuestra oferta académica de manera ágil y precisa. El resultado ha sido una mejora sustancial en la empleabilidad de nuestros egresados y un posicionamiento más sólido de nuestra institución."
            avatarInitials="MR"
            avatarBgColor="bg-[#EE3831]"
            name="Dra. María Rodríguez"
            role="Vicerrectora Académica"
          />
        </div>
      </CardContent>
    </Card>
  )
}

