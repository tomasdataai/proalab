"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, BookOpen, FileText, CheckCircle2, ArrowRight } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

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

        {/* Blog Section */}
        <motion.div variants={containerVariants} className="mt-24 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-full mb-8">
            <h3 className="text-2xl font-bold tracking-tighter md:text-3xl/tight text-[#25282A] dark:text-white">
              Blog ProaLAB
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-300">Explorando el futuro de la educación y el trabajo</p>
          </div>

          <HoverCard>
            <HoverCardTrigger asChild>
              <motion.div variants={cardVariants} className="group cursor-pointer" whileHover={{ y: -5 }}>
                <BlogCard
                  title="El impacto de la IA en la educación superior"
                  excerpt="Análisis profundo sobre cómo la inteligencia artificial está transformando la educación universitaria."
                  date="10 Mar 2024"
                  category="Tecnología"
                  imageUrl="/placeholder.svg?height=200&width=400"
                />
              </motion.div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Destacados del artículo:</h4>
                <ul className="text-sm">
                  <li>• Tendencias en IA educativa</li>
                  <li>• Casos de estudio globales</li>
                  <li>• Recomendaciones prácticas</li>
                </ul>
              </div>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger asChild>
              <motion.div variants={cardVariants} className="group cursor-pointer" whileHover={{ y: -5 }}>
                <BlogCard
                  title="Habilidades del futuro: 2025-2030"
                  excerpt="Proyecciones y análisis de las competencias más demandadas en el próximo quinquenio."
                  date="8 Mar 2024"
                  category="Mercado Laboral"
                  imageUrl="/placeholder.svg?height=200&width=400"
                />
              </motion.div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Puntos clave:</h4>
                <ul className="text-sm">
                  <li>• Tendencias globales</li>
                  <li>• Sectores emergentes</li>
                  <li>• Guía de preparación</li>
                </ul>
              </div>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger asChild>
              <motion.div variants={cardVariants} className="group cursor-pointer" whileHover={{ y: -5 }}>
                <BlogCard
                  title="Transformación digital en educación"
                  excerpt="Guía completa sobre la implementación de tecnologías educativas emergentes."
                  date="5 Mar 2024"
                  category="Innovación"
                  imageUrl="/placeholder.svg?height=200&width=400"
                />
              </motion.div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Contenido destacado:</h4>
                <ul className="text-sm">
                  <li>• Mejores prácticas</li>
                  <li>• Herramientas recomendadas</li>
                  <li>• Casos de éxito</li>
                </ul>
              </div>
            </HoverCardContent>
          </HoverCard>

          <div className="col-span-full mt-8 text-center">
            <Button className="group bg-[#25282A] hover:bg-[#EE3831] dark:bg-white dark:text-[#25282A] dark:hover:bg-[#EE3831] dark:hover:text-white">
              Ver más artículos
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
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

interface BlogCardProps {
  title: string
  excerpt: string
  date: string
  category: string
  imageUrl: string
}

function BlogCard({ title, excerpt, date, category, imageUrl }: BlogCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-[#333333]">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt=""
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-[#EE3831] text-white rounded-full">
            {category}
          </span>
        </div>
      </div>
      <CardContent className="p-4">
        <time className="text-sm text-gray-500 dark:text-gray-400">{date}</time>
        <h3 className="mt-2 text-lg font-semibold text-[#25282A] dark:text-white">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{excerpt}</p>
        <Button
          variant="link"
          className="mt-4 p-0 text-[#EE3831] hover:text-[#E50695] dark:text-[#F1B434] dark:hover:text-[#E50695]"
        >
          Leer más <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

