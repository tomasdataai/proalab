"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, BarChart3, Lightbulb, CheckCircle2 } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Products() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
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
    <section id="products" className="w-full py-12 md:py-24 lg:py-32">
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#25282A] dark:text-white">
              Nuestras Soluciones Avanzadas
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-300 md:text-xl">
              Herramientas de vanguardia para transformar datos en decisiones estratégicas
            </p>
          </div>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-8 py-12 md:grid-cols-1 lg:grid-cols-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div variants={cardVariants}>
                  <ProductCard
                    title="Simulador de Escenarios Laborales"
                    icon={<BarChart3 className="h-16 w-16 text-[#EE3831]" />}
                    description="Proyecta el futuro laboral basado en datos reales y tendencias de la industria."
                    features={[
                      "Análisis predictivo de sectores industriales a nivel país",
                      "Evaluación de retorno de inversión en formación específica",
                      "Identificación de oportunidades emergentes y sectores en declive",
                      "Proyecciones personalizadas según variables económicas y sociales",
                    ]}
                    buttonText="Explorar Simulador"
                    buttonColor="bg-[#EE3831] hover:bg-[#E50695]"
                    borderColor="border-[#EE3831]"
                    headerBgColor="bg-[#EE3831]"
                  />
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Simulación avanzada de escenarios laborales</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div variants={cardVariants}>
                  <ProductCard
                    title="Pertinencia Educativa"
                    icon={<Lightbulb className="h-16 w-16 text-[#F1B434]" />}
                    description="Análisis completo de la relevancia de todas las carreras impartidas en Chile."
                    features={[
                      "Índice de fortaleza de demanda por carrera y región",
                      "Evaluación de riesgo de saturación del mercado laboral",
                      "Análisis de riesgo de sustitución tecnológica (metodología Frey & Osborne)",
                      "Índice de trayectoria internacional para cada sector profesional",
                    ]}
                    buttonText="Descubrir Pertinencia"
                    buttonColor="bg-[#F1B434] hover:bg-[#E50695] text-[#25282A] hover:text-white"
                    borderColor="border-[#F1B434]"
                    headerBgColor="bg-[#F1B434]"
                  />
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Análisis de relevancia educativa</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div variants={cardVariants}>
                  <ProductCard
                    title="Proa AI"
                    icon={<Brain className="h-16 w-16 text-[#E50695]" />}
                    description="Inteligencia artificial especializada en análisis educativo y laboral."
                    features={[
                      "Recuperación aumentada de información (RAG) sobre datos educativos",
                      "Reducción de alucinaciones mediante verificación de fuentes",
                      "Generación de reportes personalizados con insights accionables",
                      "Asistencia en la adaptación a nuevas tecnologías educativas",
                    ]}
                    buttonText="Conocer Proa AI"
                    buttonColor="bg-[#E50695] hover:bg-[#EE3831]"
                    borderColor="border-[#E50695]"
                    headerBgColor="bg-[#E50695]"
                  />
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>IA especializada en educación</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Container>
    </section>
  )
}

interface ProductCardProps {
  title: string
  icon: React.ReactNode
  description: string
  features: string[]
  buttonText: string
  buttonColor: string
  borderColor: string
  headerBgColor: string
}

function ProductCard({
  title,
  icon,
  description,
  features,
  buttonText,
  buttonColor,
  borderColor,
  headerBgColor,
}: ProductCardProps) {
  return (
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
  )
}

function ProductFeature({ children }: { children: React.ReactNode }) {
  return (
    <motion.li
      className="flex items-start gap-2"
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <CheckCircle2 className="h-5 w-5 mt-0.5 text-[#EE3831]" />
      <span className="text-sm text-gray-600 dark:text-gray-300">{children}</span>
    </motion.li>
  )
}

