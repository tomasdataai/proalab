import { Brain, BarChart3, Lightbulb, Layers, Database, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-[#2A2A2A]">
      <Container>
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#25282A] dark:text-white">
              Tecnología de vanguardia para modelar trayectorias educacionales
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-300 md:text-xl">
              Herramientas avanzadas que transforman datos en estrategias educativas efectivas.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <FeatureCard
                    title="Inteligencia Artificial"
                    description="Algoritmos avanzados que analizan patrones educacionales y predicen trayectorias óptimas para cada estudiante."
                    icon={<Brain className="h-10 w-10 text-[#EE3831]" />}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border dark:border-gray-700">
                <p>Tecnología de punta en IA educativa</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <FeatureCard
                    title="Procesamiento de Lenguaje Natural"
                    description="Análisis semántico de documentos educativos y laborales para identificar competencias clave y brechas formativas."
                    icon={<Sparkles className="h-10 w-10 text-[#F1B434]" />}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border dark:border-gray-700">
                <p>Comprensión avanzada de textos educativos</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <FeatureCard
                    title="Deep Learning"
                    description="Redes neuronales que aprenden continuamente de los datos para mejorar la precisión de las recomendaciones educativas."
                    icon={<Layers className="h-10 w-10 text-[#E50695]" />}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border dark:border-gray-700">
                <p>Aprendizaje profundo para mejores predicciones</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <FeatureCard
                    title="Métodos Econométricos"
                    description="Modelos estadísticos avanzados que cuantifican el impacto de intervenciones educativas en resultados laborales."
                    icon={<BarChart3 className="h-10 w-10 text-[#FF8A76]" />}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border dark:border-gray-700">
                <p>Análisis estadístico de alto nivel</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <FeatureCard
                    title="Forecasting Predictivo"
                    description="Proyecciones de demanda laboral futura para alinear la formación actual con las necesidades del mercado."
                    icon={<Lightbulb className="h-10 w-10 text-[#EE3831]" />}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border dark:border-gray-700">
                <p>Predicciones precisas del mercado laboral</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <FeatureCard
                    title="Big Data Educacional"
                    description="Procesamiento de grandes volúmenes de datos educativos y laborales para identificar tendencias y oportunidades."
                    icon={<Database className="h-10 w-10 text-[#F1B434]" />}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border dark:border-gray-700">
                <p>Análisis masivo de datos educativos</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Container>
    </section>
  )
}

function FeatureCard({ title, description, icon }) {
  return (
    <Card className="flex flex-col items-center text-center dark:bg-[#333333] dark:border-gray-700 transition-all hover:shadow-md hover:-translate-y-1">
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle className="text-[#25282A] dark:text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base text-gray-500 dark:text-gray-300">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

