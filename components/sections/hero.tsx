import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/ui/container"
import { AspectRatio } from "@/components/ui/aspect-ratio"

export function Hero() {
  return (
    <section
      id="hero"
      className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-[#25282A] to-[#3A3D3F] text-white"
      aria-labelledby="hero-heading"
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px]">
          <div className="flex flex-col justify-center space-y-4 order-2 lg:order-1">
            <div className="space-y-2">
              <Badge className="inline-flex bg-[#F1B434] text-[#25282A]">Innovación Educativa</Badge>
              <h1
                id="hero-heading"
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none text-white"
              >
                ProaLAB: El Modelador de Futuros Educacionales más Avanzado de Hispanoamérica
              </h1>
              <p className="max-w-[600px] text-gray-300 md:text-xl">
                Cerrando la brecha entre Educación e Industria mediante Inteligencia Artificial, Procesamiento de
                Lenguaje Natural, Deep Learning, métodos econométricos y forecasting predictivo.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button size="lg" className="gap-1 bg-[#EE3831] hover:bg-[#E50695]">
                Solicitar demo <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#25282A]"
              >
                Conocer más
              </Button>
            </div>
            <p className="text-xs text-gray-300">
              El esfuerzo privado más grande de Latinoamérica y el Caribe para transformar trayectorias educacionales.
            </p>
          </div>
          <div className="mx-auto w-full max-w-[600px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg order-1 lg:order-2">
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <iframe
                src="https://share.synthesia.io/embeds/videos/1a716e4c-8db1-4456-af13-534805008032"
                loading="lazy"
                title="Synthesia video player - Unlocking Chile's Future: Data-Driven Insights for Strategic Decision-Makers"
                allowFullScreen
                allow="encrypted-media; fullscreen;"
                className="h-full w-full object-cover"
                aria-label="Video de presentación de ProaLAB"
              ></iframe>
            </AspectRatio>
          </div>
        </div>
      </Container>
    </section>
  )
}

