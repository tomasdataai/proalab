import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 dark:bg-[#1F1F1F]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#25282A] dark:text-white">
              Transformando la educación en Latinoamérica
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-300 md:text-xl">
              Instituciones y organizaciones que ya están aprovechando el poder de ProaLAB.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
          <TestimonialCard
            quote="ProaLAB ha revolucionado nuestra forma de diseñar programas educativos. Ahora podemos anticipar las necesidades del mercado laboral con años de antelación."
            author="María Rodríguez"
            role="Directora de Innovación, Universidad Nacional"
            avatar="MR"
          />
          <TestimonialCard
            quote="La precisión de los modelos predictivos de ProaLAB nos ha permitido reducir significativamente la brecha entre formación y empleo en nuestra región."
            author="Carlos Mendoza"
            role="Secretario de Educación, Gobierno Regional"
            avatar="CM"
          />
          <TestimonialCard
            quote="Como empresa, encontramos en ProaLAB un aliado estratégico para identificar y desarrollar el talento que necesitaremos en los próximos años."
            author="Ana Martínez"
            role="Directora de RRHH, Corporación Tecnológica"
            avatar="AM"
          />
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ quote, author, role, avatar }) {
  return (
    <Card className="dark:bg-[#333333] dark:border-gray-700">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="" alt={author} />
            <AvatarFallback className="bg-[#F1B434] text-[#25282A]">{avatar}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base text-[#25282A] dark:text-white">{author}</CardTitle>
            <CardDescription className="dark:text-gray-300">{role}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500 dark:text-gray-300">"{quote}"</p>
      </CardContent>
    </Card>
  )
}

