import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ProductFeature } from "./product-feature"
import type { ReactNode } from "react"

interface ProductCardProps {
  title: string
  icon: ReactNode
  description: string
  features: string[]
  buttonText: string
  buttonColor: string
  borderColor: string
  headerBgColor: string
  tooltipText: string
}

export function ProductCard({
  title,
  icon,
  description,
  features,
  buttonText,
  buttonColor,
  borderColor,
  headerBgColor,
  tooltipText,
}: ProductCardProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card
          className={`flex flex-col overflow-hidden border-2 ${borderColor} dark:bg-[#333333] transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
        >
          <div className={`${headerBgColor} p-4`}>
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
          <CardContent className="flex-1 p-6">
            <div className="mb-4 flex justify-center">{icon}</div>
            <p className="mb-4 text-[#25282A] dark:text-white">{description}</p>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <ProductFeature key={index}>{feature}</ProductFeature>
              ))}
            </ul>
            <div className="mt-6">
              <Button className={`w-full ${buttonColor} transition-all duration-300 transform hover:scale-105`}>
                {buttonText}
              </Button>
            </div>
          </CardContent>
        </Card>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  )
}

