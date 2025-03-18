"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/molecules/section-heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Shield, Zap, BarChart, Lock, RefreshCw, Database, Layers } from "lucide-react"

export function TechAdvantages() {
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

  const advantages = [
    {
      title: "Infraestructura Cloud",
      description:
        "Plataforma 100% basada en la nube para acceso desde cualquier lugar y dispositivo, sin necesidad de instalaciones locales.",
      icon: <Cloud className="h-10 w-10 text-[#EE3831]" />,
      color: "border-[#EE3831]",
    },
    {
      title: "Seguridad Avanzada",
      description:
        "Protección de datos de nivel empresarial con encriptación de extremo a extremo y cumplimiento de estándares internacionales.",
      icon: <Shield className="h-10 w-10 text-[#F1B434]" />,
      color: "border-[#F1B434]",
    },
    {
      title: "Procesamiento en Tiempo Real",
      description:
        "Análisis instantáneo de datos educativos y laborales para toma de decisiones inmediata y actualizada.",
      icon: <Zap className="h-10 w-10 text-[#E50695]" />,
      color: "border-[#E50695]",
    },
    {
      title: "Escalabilidad Automática",
      description:
        "Capacidad para crecer según sus necesidades, desde pequeñas instituciones hasta sistemas educativos nacionales.",
      icon: <Layers className="h-10 w-10 text-[#EE3831]" />,
      color: "border-[#EE3831]",
    },
    {
      title: "Analítica Avanzada",
      description:
        "Herramientas de visualización y análisis de datos que transforman información compleja en insights accionables.",
      icon: <BarChart className="h-10 w-10 text-[#F1B434]" />,
      color: "border-[#F1B434]",
    },
    {
      title: "Privacidad por Diseño",
      description:
        "Arquitectura que prioriza la privacidad de datos sensibles de estudiantes e instituciones desde su concepción.",
      icon: <Lock className="h-10 w-10 text-[#E50695]" />,
      color: "border-[#E50695]",
    },
    {
      title: "Actualizaciones Continuas",
      description: "Mejoras y nuevas funcionalidades implementadas regularmente sin interrupciones en el servicio.",
      icon: <RefreshCw className="h-10 w-10 text-[#EE3831]" />,
      color: "border-[#EE3831]",
    },
    {
      title: "Almacenamiento Optimizado",
      description:
        "Gestión eficiente de grandes volúmenes de datos educativos con tecnologías de compresión y optimización.",
      icon: <Database className="h-10 w-10 text-[#F1B434]" />,
      color: "border-[#F1B434]",
    },
  ]

  return (
    <section id="tech-advantages" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-[#1F1F1F]">
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-12"
        >
          <SectionHeading
            title="Ventajas Tecnológicas"
            description="Nuestra plataforma combina lo mejor de la tecnología cloud con análisis avanzado de datos"
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {advantages.map((advantage, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card
                  className={`h-full border-2 ${advantage.color} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-[#333333]`}
                >
                  <CardHeader className="pb-2">
                    <div className="mb-2">{advantage.icon}</div>
                    <CardTitle className="text-[#25282A] dark:text-white">{advantage.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{advantage.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

