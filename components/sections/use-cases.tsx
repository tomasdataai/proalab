"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/molecules/section-heading"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building, GraduationCap, Landmark, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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
            <Tabs defaultValue="education" className="w-full">
              <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4 mb-8">
                <TabsTrigger
                  value="education"
                  className="data-[state=active]:bg-[#EE3831] data-[state=active]:text-white"
                >
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Educación
                </TabsTrigger>
                <TabsTrigger
                  value="government"
                  className="data-[state=active]:bg-[#F1B434] data-[state=active]:text-[#25282A]"
                >
                  <Landmark className="h-4 w-4 mr-2" />
                  Gobierno
                </TabsTrigger>
                <TabsTrigger
                  value="enterprise"
                  className="data-[state=active]:bg-[#E50695] data-[state=active]:text-white"
                >
                  <Building className="h-4 w-4 mr-2" />
                  Empresas
                </TabsTrigger>
                <TabsTrigger
                  value="research"
                  className="data-[state=active]:bg-[#25282A] data-[state=active]:text-white"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Investigación
                </TabsTrigger>
              </TabsList>

              <TabsContent value="education">
                <Card className="border-2 border-[#EE3831]">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <Badge className="mb-4 bg-[#EE3831]">Caso de Estudio</Badge>
                        <h3 className="text-2xl font-bold mb-4 text-[#25282A] dark:text-white">
                          Universidad Nacional de Chile
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          La Universidad Nacional implementó ProaLAB para rediseñar su oferta académica basándose en
                          proyecciones del mercado laboral, logrando:
                        </p>
                        <ul className="space-y-2 mb-6">
                          <li className="flex items-start gap-2">
                            <span className="text-[#EE3831] font-bold">•</span>
                            <span className="text-gray-600 dark:text-gray-300">
                              Aumento del 27% en la empleabilidad de sus egresados
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#EE3831] font-bold">•</span>
                            <span className="text-gray-600 dark:text-gray-300">
                              Creación de 5 nuevos programas alineados con demandas emergentes
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#EE3831] font-bold">•</span>
                            <span className="text-gray-600 dark:text-gray-300">
                              Reducción del 35% en la deserción estudiantil
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#EE3831] font-bold">•</span>
                            <span className="text-gray-600 dark:text-gray-300">
                              Mejora significativa en la satisfacción de empleadores
                            </span>
                          </li>
                        </ul>
                        <Button className="bg-[#EE3831] hover:bg-[#E50695]">
                          Ver caso completo <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                        <blockquote className="text-gray-600 dark:text-gray-300 italic mb-4">
                          "ProaLAB nos permitió anticipar las necesidades del mercado laboral y adaptar nuestra oferta
                          académica de manera ágil y precisa. El resultado ha sido una mejora sustancial en la
                          empleabilidad de nuestros egresados y un posicionamiento más sólido de nuestra institución."
                        </blockquote>
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-[#EE3831] flex items-center justify-center text-white font-bold">
                            MR
                          </div>
                          <div>
                            <p className="font-medium text-[#25282A] dark:text-white">Dra. María Rodríguez</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Vicerrectora Académica</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="government">
                <Card className="border-2 border-[#F1B434]">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <Badge className="mb-4 bg-[#F1B434] text-[#25282A]">Caso de Estudio</Badge>
                        <h3 className="text-2xl font-bold mb-4 text-[#25282A] dark:text-white">
                          Ministerio de Educación Regional
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          El Ministerio utilizó ProaLAB para desarrollar políticas educativas basadas en evidencia y
                          proyecciones de demanda laboral, consiguiendo:
                        </p>
                        <ul className="space-y-2 mb-6">
                          <li className="flex items-start gap-2">
                            <span className="text-[#F1B434] font-bold">•</span>
                            <span className="text-gray-600 dark:text-gray-300">
                              Reducción del 42% en la brecha entre formación y empleo
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#F1B434] font-bold">•</span>
                            <span className="text-gray-600 dark:text-gray-300">
                              Optimización de la inversión pública en programas educativos
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#F1B434] font-bold">•</span>
                            <span className="text-gray-600 dark:text-gray-300">
                              Creación de un observatorio laboral con actualización en tiempo real
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#F1B434] font-bold">•</span>
                            <span className="text-gray-600 dark:text-gray-300">
                              Mejora en la coordinación entre instituciones educativas y sector productivo
                            </span>
                          </li>
                        </ul>
                        <Button className="bg-[#F1B434] hover:bg-[#E50695] text-[#25282A] hover:text-white">
                          Ver caso completo <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                        <blockquote className="text-gray-600 dark:text-gray-300 italic mb-4">
                          "La precisión de los modelos predictivos de ProaLAB nos ha permitido diseñar políticas
                          educativas con un enfoque prospectivo, anticipándonos a las necesidades del mercado laboral.
                          Esto ha resultado en una asignación más eficiente de recursos y mejores resultados para
                          nuestros estudiantes."
                        </blockquote>
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-[#F1B434] flex items-center justify-center text-[#25282A] font-bold">
                            CM
                          </div>
                          <div>
                            <p className="font-medium text-[#25282A] dark:text-white">Carlos Mendoza</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Secretario de Educación</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="enterprise">
                <Card className="border-2 border-[#E50695]">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <Badge className="mb-4 bg-[#E50695]">Caso de Estudio</Badge>
                        <h3 className="text-2xl font-bold mb-4 text-[#25282A] dark:text-white">
                          Corporación Tecnológica Internacional
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          La corporación implementó ProaLAB para alinear sus programas de capacitación interna con las
                          tendencias tecnológicas emergentes, logrando:
                        </p>
                        <ul className="space-y-2 mb-6">
                          <li className="flex items-start gap-2">
                            <span className="text-[#E50695] font-bold">•</span>
                            <span className="text-gray-600 dark:text-gray-300">
                              Reducción del 30% en tiempo de adaptación a nuevas tecnologías
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#E50695] font-bold">•</span>
                            <span className="text-gray-600 dark:text-gray-300">
                              Aumento del 25% en la retención de talento especializado
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#E50695] font-bold">•</span>
                            <span className="text-gray-600 dark:text-gray-300">
                              Desarrollo de un pipeline de talento alineado con necesidades futuras
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#E50695] font-bold">•</span>
                            <span className="text-gray-600 dark:text-gray-300">
                              Mejora en la competitividad en mercados emergentes
                            </span>
                          </li>
                        </ul>
                        <Button className="bg-[#E50695] hover:bg-[#EE3831]">
                          Ver caso completo <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                        <blockquote className="text-gray-600 dark:text-gray-300 italic mb-4">
                          "Como empresa, encontramos en ProaLAB un aliado estratégico para identificar y desarrollar el
                          talento que necesitaremos en los próximos años. Su capacidad para anticipar tendencias
                          tecnológicas nos ha dado una ventaja competitiva significativa."
                        </blockquote>
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-[#E50695] flex items-center justify-center text-white font-bold">
                            AM
                          </div>
                          <div>
                            <p className="font-medium text-[#25282A] dark:text-white">Ana Martínez</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Directora de RRHH</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="research">
                <Card className="border-2 border-[#25282A]">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <Badge className="mb-4 bg-[#25282A]">Caso de Estudio</Badge>
                        <h3 className="text-2xl font-bold mb-4 text-[#25282A] dark:text-white">
                          Centro de Investigación Educativa
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          El centro utilizó ProaLAB para analizar grandes volúmenes de datos educativos y laborales,
                          consiguiendo:
                        </p>
                        <ul className="space-y-2 mb-6">
                          <li className="flex items-start gap-2">
                            <span className="text-[#25282A] dark:text-white font-bold">•</span>
                            <span className="text-gray-600 dark:text-gray-300">
                              Identificación de patrones ocultos en trayectorias educativas
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#25282A] dark:text-white font-bold">•</span>
                            <span className="text-gray-600 dark:text-gray-300">
                              Publicación de 12 papers en revistas científicas de alto impacto
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#25282A] dark:text-white font-bold">•</span>
                            <span className="text-gray-600 dark:text-gray-300">
                              Desarrollo de nuevos modelos predictivos de trayectorias educativas
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#25282A] dark:text-white font-bold">•</span>
                            <span className="text-gray-600 dark:text-gray-300">
                              Colaboraciones internacionales con centros de investigación líderes
                            </span>
                          </li>
                        </ul>
                        <Button className="bg-[#25282A] hover:bg-[#EE3831]">
                          Ver caso completo <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                        <blockquote className="text-gray-600 dark:text-gray-300 italic mb-4">
                          "La capacidad de ProaLAB para procesar y analizar grandes volúmenes de datos educativos nos ha
                          permitido descubrir patrones y correlaciones que antes eran imposibles de detectar. Esto ha
                          revolucionado nuestra forma de entender las trayectorias educativas y su relación con el mundo
                          laboral."
                        </blockquote>
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-[#25282A] flex items-center justify-center text-white font-bold">
                            JP
                          </div>
                          <div>
                            <p className="font-medium text-[#25282A] dark:text-white">Dr. Javier Pérez</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Director de Investigación</p>
                          </div>
                        </div>
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

