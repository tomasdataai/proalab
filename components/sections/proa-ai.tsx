"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Container } from "@/components/ui/container"
import { AiTabs } from "./proa-ai/ai-tabs"
import { Sparkles } from "lucide-react"

export function ProaAI() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const yReverse = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <>
      <section
        id="proa-ai"
        className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#25282A] to-[#3A3D3F] relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/ai-grid-pattern.svg')] opacity-10"></div>
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 bg-[#EE3831] rounded-full filter blur-3xl opacity-20"
            style={{ y, opacity }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#F1B434] rounded-full filter blur-3xl opacity-20"
            style={{ y: yReverse, opacity }}
          />
        </div>

        <Container>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="relative z-10"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <motion.div variants={itemVariants} className="inline-block">
                <span className="inline-flex items-center rounded-full border border-[#EE3831] px-2.5 py-0.5 text-xs font-semibold text-[#EE3831]">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Inteligencia Artificial
                </span>
              </motion.div>
              <motion.h2
                variants={itemVariants}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white"
              >
                PROA AI
              </motion.h2>
              <motion.p variants={itemVariants} className="mx-auto max-w-[700px] text-gray-300 md:text-xl/relaxed">
                Nuestra plataforma de inteligencia artificial diseñada específicamente para el sector educativo
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="relative z-20">
              <AiTabs />
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}

