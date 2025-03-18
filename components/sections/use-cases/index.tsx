"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/molecules/section-heading"
import { CaseStudyTabs } from "./case-study-tabs"

export function UseCases() {
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
    <section id="use-cases" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-[#222222]">
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-12"
        >
          <SectionHeading
            title="Casos de Éxito"
            description="Descubra cómo organizaciones de diversos sectores están transformando la educación con ProaLAB"
          />

          <motion.div variants={itemVariants}>
            <CaseStudyTabs />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

