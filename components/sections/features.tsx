"use client"

import type React from "react"

import { useState } from "react"
import { Brain, BarChart3, Lightbulb, Layers, Database, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function Features() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const features = [
    {
      title: "Inteligencia Artificial",
      description:
        "Algoritmos avanzados que analizan patrones educacionales y predicen trayectorias óptimas para cada estudiante.",
      icon: <Brain className="h-10 w-10 text-[#EE3831]" aria-hidden="true" />,
      tooltip: "Tecnología de punta en IA educativa",
    },
    {
      title: "Procesamiento de Lenguaje Natural",
      description:
        "Análisis semántico de documentos educativos y laborales para identificar competencias clave y brechas formativas.",
      icon: <Sparkles className="h-10 w-10 text-[#F1B434]" aria-hidden="true" />,
      tooltip: "Comprensión avanzada de textos educativos",
    },
    {
      title: "Deep Learning",
      description:
        "Redes neuronales que aprenden continuamente de los datos para mejorar la precisión de las recomendaciones educativas.",
      icon: <Layers className="h-10 w-10 text-[#E50695]" aria-hidden="true" />,
      tooltip: "Aprendizaje profundo para mejores predicciones",
    },
    {
      title: "Métodos Econométricos",
      description:
        "Modelos estadísticos avanzados que cuantifican el impacto de intervenciones educativas en resultados laborales.",
      icon: <BarChart3 className="h-10 w-10 text-[#FF8A76]" aria-hidden="true" />,
      tooltip: "Análisis estadístico de alto nivel",
    },
    {
      title: "Forecasting Predictivo",
      description:
        "Proyecciones de demanda laboral futura para alinear la formación actual con las necesidades del mercado.",
      icon: <Lightbulb className="h-10 w-10 text-[#EE3831]" aria-hidden="true" />,
      tooltip: "Predicciones precisas del mercado laboral",
    },
    {
      title: "Big Data Educacional",
      description:
        "Procesamiento de grandes volúmenes de datos educativos y laborales para identificar tendencias y oportunidades.",
      icon: <Database className="h-10 w-10 text-[#F1B434]" aria-hidden="true" />,
      tooltip: "Análisis masivo de datos educativos",
    },
  ]

  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-[#2A2A2A]"
      aria-labelledby="features-heading"
    >
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-12"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <h2
                id="features-heading"
                className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#25282A] dark:text-white"
              >
                Tecnología de vanguardia para modelar trayectorias educacionales
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-300 md:text-xl">
                Herramientas avanzadas que transforman datos en estrategias educativas efectivas.
              </p>
            </div>
          </motion.div>

          <div className="mx-auto grid max-w-5xl items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <FeatureCard title={feature.title} description={feature.description} icon={feature.icon} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border dark:border-gray-700">
                      <p>{feature.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <Card
      className="flex flex-col items-center text-center dark:bg-[#333333] dark:border-gray-700 transition-all hover:shadow-md hover:-translate-y-1"
      tabIndex={0}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    >
      <CardHeader>
        <motion.div
          className="mb-2"
          animate={isFocused ? { scale: 1.1 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.div>
        <CardTitle className="text-[#25282A] dark:text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base text-gray-500 dark:text-gray-300">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

