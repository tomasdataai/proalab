"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, HelpCircle } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Pricing() {
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

  const plans = [
    {
      title: "Institucional",
      price: "$1,500",
      description: "Ideal para instituciones educativas individuales.",
      features: [
        "Hasta 5 usuarios administrativos",
        "10,000 perfiles de estudiantes",
        "Reportes básicos",
        "Soporte técnico 5x8",
      ],
      buttonText: "Solicitar información",
      buttonColor: "bg-[#EE3831] hover:bg-[#E50695]",
      tooltipText: "Perfecto para comenzar con ProaLAB",
    },
    {
      title: "Gubernamental",
      price: "$3,500",
      description: "Perfecto para secretarías de educación y gobiernos regionales.",
      features: [
        "Hasta 20 usuarios administrativos",
        "50,000 perfiles de estudiantes",
        "Análisis avanzado de datos",
        "Forecasting regional",
        "Soporte técnico 24/7",
      ],
      buttonText: "Solicitar información",
      buttonColor: "bg-[#EE3831] hover:bg-[#E50695]",
      tooltipText: "Solución completa para entidades gubernamentales",
      highlighted: true,
    },
    {
      title: "Empresarial",
      price: "Personalizado",
      description: "Para corporaciones y consorcios educativos.",
      features: [
        "Usuarios ilimitados",
        "Perfiles ilimitados",
        "Integración con sistemas propios",
        "Modelos predictivos personalizados",
        "Consultoría estratégica",
        "Soporte premium dedicado",
      ],
      buttonText: "Contactar ventas",
      buttonColor: "bg-[#EE3831] hover:bg-[#E50695]",
      tooltipText: "Solución empresarial personalizada",
    },
  ]

  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-[#2A2A2A]">
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
              Planes adaptados a sus necesidades
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-300 md:text-xl">
              Soluciones escalables para instituciones educativas, gobiernos y empresas.
            </p>
          </div>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
          {plans.map((plan, index) => (
            <TooltipProvider key={plan.title}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div variants={cardVariants}>
                    <Card
                      className={`relative flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-[#333333] ${
                        plan.highlighted ? "border-2 border-[#E50695]" : ""
                      }`}
                    >
                      {plan.highlighted && (
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 rotate-45">
                          <span className="block w-32 text-center text-xs font-medium text-white bg-[#E50695] py-1">
                            Popular
                          </span>
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {plan.title}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <HelpCircle className="h-4 w-4 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{plan.tooltipText}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </CardTitle>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold text-[#25282A] dark:text-white">{plan.price}</span>
                          <span className="text-gray-500 dark:text-gray-300">/mes</span>
                        </div>
                        <CardDescription className="dark:text-gray-300">{plan.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <ul className="space-y-2">
                          {plan.features.map((feature, i) => (
                            <motion.li
                              key={i}
                              className="flex items-center gap-2"
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                              <CheckCircle2 className="h-4 w-4 text-[#EE3831]" />
                              <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className={`w-full ${plan.buttonColor} transition-all duration-300 transform hover:scale-105`}
                        >
                          {plan.buttonText}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{plan.tooltipText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </Container>
    </section>
  )
}

