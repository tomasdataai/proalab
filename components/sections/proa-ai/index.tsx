"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { FeatureItem } from "@/components/atoms/feature-item"
import { ArrowRight } from "lucide-react"
import { AiTabs } from "./ai-tabs"

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
            <AiTabs />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

