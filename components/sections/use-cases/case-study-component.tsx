import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { CaseStudyTestimonial } from "./case-study-testimonial"

interface CaseStudyProps {
  title: string
  badgeColor: string
  badgeTextColor?: string
  borderColor: string
  description: string
  features: string[]
  buttonText: string
  buttonColor: string
  testimonial: {
    quote: string
    avatarInitials: string
    avatarBgColor: string
    avatarTextColor?: string
    name: string
    role: string
  }
}

export function CaseStudyComponent({
  title,
  badgeColor,
  badgeTextColor = "text-white",
  borderColor,
  description,
  features,
  buttonText,
  buttonColor,
  testimonial,
}: CaseStudyProps) {
  return (
    <Card className={`border-2 ${borderColor}`}>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Badge className={`mb-4 ${badgeColor} ${badgeTextColor}`}>Caso de Estudio</Badge>
            <h3 className="text-2xl font-bold mb-4 text-[#25282A] dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
            <ul className="space-y-2 mb-6">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className={`${borderColor.replace("border-", "text-")} font-bold`}>•</span>
                  <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            <Button className={buttonColor}>
              {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <CaseStudyTestimonial {...testimonial} />
        </div>
      </CardContent>
    </Card>
  )
}

