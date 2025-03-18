import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section
      id="contact"
      className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#EE3831] to-[#E50695] text-white"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              ¿Listo para transformar el futuro educacional?
            </h2>
            <p className="mx-auto max-w-[700px] text-white/90 md:text-xl">
              Únase a las instituciones líderes que ya están modelando el futuro con ProaLAB.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" className="gap-1 bg-white text-[#EE3831] hover:bg-gray-100">
              Solicitar demostración <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#EE3831]">
              Hablar con un consultor
            </Button>
          </div>
          <p className="text-xs text-white/80">
            Descubra cómo la ciencia de datos puede transformar su institución educativa.
          </p>
        </div>
      </div>
    </section>
  )
}

