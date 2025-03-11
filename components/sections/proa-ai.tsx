"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { FeatureItem } from "@/components/atoms/feature-item"
import { Brain, Sparkles, FileText, Zap, Code, ArrowRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export function ProaAI() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="proa-ai" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#25282A] to-[#3A3D3F]">
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid gap-12 lg:grid-cols-2"
        >
          <motion.div variants={itemVariants} className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white">
                Proa AI: Inteligencia Artificial al servicio de la educación
              </h2>
              <p className="max-w-[600px] text-gray-100 md:text-xl">
                Nuestra plataforma de IA especializada permite acceder a insights educativos y laborales mediante
                tecnología de vanguardia.
              </p>
            </div>

            <ul className="space-y-4">
              <FeatureItem color="text-gray-100">
                Recuperación aumentada de información (RAG) para reducir alucinaciones
              </FeatureItem>
              <FeatureItem color="text-gray-100">
                Arquitectura de mezcla de expertos para consultas especializadas
              </FeatureItem>
              <FeatureItem color="text-gray-100">
                Personalización de embeddings para su organización o institución
              </FeatureItem>
              <FeatureItem color="text-gray-100">Generación de reportes y análisis con fuentes verificadas</FeatureItem>
            </ul>

            <div className="pt-4">
              <Button
                size="lg"
                className="gap-1 bg-[#E50695] hover:bg-[#EE3831] transition-all duration-300 transform hover:scale-105 text-white"
              >
                Solicitar acceso anticipado <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-[#1A1A1A]">
                <TabsTrigger value="chat" className="data-[state=active]:bg-[#E50695] data-[state=active]:text-white">
                  Chat
                </TabsTrigger>
                <TabsTrigger
                  value="analysis"
                  className="data-[state=active]:bg-[#E50695] data-[state=active]:text-white"
                >
                  Análisis
                </TabsTrigger>
                <TabsTrigger value="code" className="data-[state=active]:bg-[#E50695] data-[state=active]:text-white">
                  Código
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="mt-4">
                <Card className="border-2 border-[#E50695] bg-[#1A1A1A]">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#E50695] flex items-center justify-center text-white font-bold">
                          P
                        </div>
                        <div className="flex-1 rounded-lg bg-gray-800 p-3">
                          <p className="text-sm text-gray-300">
                            ¿Cuáles son las carreras con mayor proyección en el sector tecnológico para los próximos 5
                            años?
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#25282A] flex items-center justify-center text-white font-bold">
                          <Brain className="h-4 w-4" />
                        </div>
                        <div className="flex-1 rounded-lg bg-gray-800 p-3">
                          <p className="text-sm text-gray-300">
                            Según nuestros análisis predictivos, las carreras con mayor proyección en el sector
                            tecnológico para los próximos 5 años son:
                          </p>
                          <ol className="list-decimal pl-5 mt-2 text-sm text-gray-300 space-y-1">
                            <li>Ingeniería en Inteligencia Artificial y Ciencia de Datos</li>
                            <li>Desarrollo de Software con especialización en Cloud Computing</li>
                            <li>Ciberseguridad</li>
                            <li>Ingeniería en Robótica y Automatización</li>
                            <li>Diseño de Experiencia de Usuario (UX/UI)</li>
                          </ol>
                          <p className="text-sm text-gray-300 mt-2">
                            Estas proyecciones se basan en el análisis de tendencias de contratación, inversión
                            sectorial y evolución tecnológica en Chile y Latinoamérica.
                          </p>
                          <div className="mt-2 text-xs text-gray-400">
                            Fuentes: Observatorio Laboral SENCE, Informes BID 2023, Análisis ProaLAB 2024
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analysis" className="mt-4">
                <Card className="border-2 border-[#E50695] bg-[#1A1A1A]">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Análisis de Tendencias Educativas</h3>
                        <Sparkles className="h-5 w-5 text-[#E50695]" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <p className="text-sm text-gray-400">Crecimiento Sectorial</p>
                          <p className="text-2xl font-bold text-[#E50695]">+27%</p>
                          <p className="text-xs text-gray-400">Tecnología e Innovación</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <p className="text-sm text-gray-400">Demanda Laboral</p>
                          <p className="text-2xl font-bold text-[#E50695]">Alta</p>
                          <p className="text-xs text-gray-400">Próximos 5 años</p>
                        </div>
                      </div>

                      <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium">Competencias más valoradas</p>
                          <FileText className="h-4 w-4 text-[#E50695]" />
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center justify-between">
                            <span>Pensamiento analítico</span>
                            <span className="text-[#E50695]">95%</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>Programación avanzada</span>
                            <span className="text-[#E50695]">92%</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>Gestión de proyectos</span>
                            <span className="text-[#E50695]">88%</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>Comunicación efectiva</span>
                            <span className="text-[#E50695]">85%</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="code" className="mt-4">
                <Card className="border-2 border-[#E50695] bg-[#1A1A1A]">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Generación de Código</h3>
                        <Code className="h-5 w-5 text-[#E50695]" />
                      </div>

                      <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                        <pre className="text-gray-300">
                          {`// Análisis predictivo de tendencias educativas
import { analyzeData, visualizeResults } from '@proalab/analytics';

async function predictEducationalTrends(sector, timeframe) {
  // Obtener datos históricos
  const historicalData = await fetchHistoricalData(sector);
  
  // Aplicar modelo predictivo
  const prediction = analyzeData({
    data: historicalData,
    timeframe: timeframe,
    factors: ['marketDemand', 'salaryTrends', 'jobGrowth']
  });
  
  // Visualizar resultados
  return visualizeResults(prediction);
}

// Ejemplo de uso
const techSectorForecast = await predictEducationalTrends(
  'technology', 
  { years: 5 }
);`}
                        </pre>
                      </div>

                      <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-[#E50695]" />
                          <span className="text-sm">Ejecutar análisis</span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#E50695] text-[#E50695] hover:bg-[#E50695] hover:text-white"
                        >
                          Ejecutar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

