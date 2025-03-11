"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, BookOpen, FileText, CheckCircle2 } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Research() {
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
    <>
      <section id="research" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-[#1F1F1F]">
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
                Investigación y Publicaciones
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-300 md:text-xl">
                Compartiendo conocimiento para transformar la educación
              </p>
            </div>
          </motion.div>

          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div variants={cardVariants}>
                    <ResearchCard
                      title="Faro de PROA"
                      icon={<Lightbulb className="h-12 w-12 text-[#EE3831]" />}
                      description="Minuta técnica mensual gratuita con análisis del sector educativo y laboral."
                      features={[
                        "Análisis de tendencias actuales",
                        "Insights del mercado laboral",
                        "Proyecciones y recomendaciones",
                      ]}
                      buttonText="Suscribirse"
                      buttonColor="bg-[#EE3831] hover:bg-[#E50695]"
                      borderColor="border-[#EE3831]"
                      headerBgColor="bg-[#EE3831]"
                    />
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Newsletter mensual con análisis del sector</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div variants={cardVariants}>
                    <ResearchCard
                      title="Estudios"
                      icon={<BookOpen className="h-12 w-12 text-[#F1B434]" />}
                      description="Investigaciones detalladas sobre el panorama educativo y laboral."
                      features={["Análisis sectoriales", "Estudios de casos", "Informes especializados"]}
                      buttonText="Ver estudios"
                      buttonColor="bg-[#F1B434] hover:bg-[#E50695] text-[#25282A] hover:text-white"
                      borderColor="border-[#F1B434]"
                      headerBgColor="bg-[#F1B434]"
                    />
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Investigaciones detalladas del sector</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div variants={cardVariants}>
                    <ResearchCard
                      title="Reportes Metodológicos"
                      icon={<FileText className="h-12 w-12 text-[#E50695]" />}
                      description="Documentación detallada de nuestras metodologías y procesos."
                      features={["Frameworks de análisis", "Procesos de investigación", "Documentación técnica"]}
                      buttonText="Explorar reportes"
                      buttonColor="bg-[#E50695] hover:bg-[#EE3831]"
                      borderColor="border-[#E50695]"
                      headerBgColor="bg-[#E50695]"
                    />
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Documentación técnica y metodológica</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Container>
      </section>
    </>
  )
}

interface ResearchCardProps {
  title: string
  icon: React.ReactNode
  description: string
  features: string[]
  buttonText: string
  buttonColor: string
  borderColor: string
  headerBgColor: string
}

function ResearchCard({
  title,
  icon,
  description,
  features,
  buttonText,
  buttonColor,
  borderColor,
  headerBgColor,
}: ResearchCardProps) {
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
            <motion.li
              key={index}
              className="flex items-start gap-2"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <CheckCircle2 className="h-5 w-5 mt-0.5 text-[#EE3831]" />
              <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
            </motion.li>
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

