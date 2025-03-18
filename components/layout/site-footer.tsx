import Link from "next/link"
import { Twitter, Linkedin, Github, Facebook } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Logo } from "@/components/atoms/logo"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-[#25282A] text-white">
      <Container className="py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <div className="flex flex-col gap-4 lg:w-1/3">
            <Logo darkMode={true} />
            <p className="text-sm text-gray-300">
              El modelador de futuros educacionales más avanzado de Hispanoamérica, cerrando la brecha entre educación e
              industria mediante tecnologías de vanguardia.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Soluciones</h3>
              <FooterLink href="#products">Simulador de Escenarios</FooterLink>
              <FooterLink href="#products">Pertinencia Educativa</FooterLink>
              <FooterLink href="#products">Proa AI</FooterLink>
              <FooterLink href="#tech-advantages">Ventajas Tecnológicas</FooterLink>
              <FooterLink href="#use-cases">Casos de Éxito</FooterLink>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Recursos</h3>
              <FooterLink href="#research">Faro de PROA</FooterLink>
              <FooterLink href="#research">Estudios</FooterLink>
              <FooterLink href="#research">Reportes Metodológicos</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="#student-resources">Recursos para Estudiantes</FooterLink>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Empresa</h3>
              <FooterLink href="#">Sobre Nosotros</FooterLink>
              <FooterLink href="#">Equipo</FooterLink>
              <FooterLink href="#">Carreras</FooterLink>
              <FooterLink href="#">Prensa</FooterLink>
              <FooterLink href="#">Alianzas</FooterLink>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Legal</h3>
              <FooterLink href="#">Privacidad</FooterLink>
              <FooterLink href="#">Términos</FooterLink>
              <FooterLink href="#">Seguridad</FooterLink>
              <FooterLink href="#">Cookies</FooterLink>
            </div>
          </div>
        </div>
      </Container>
      <div className="border-t border-gray-700">
        <Container className="py-6">
          <div className="flex flex-col gap-2 text-center text-sm text-gray-400 md:flex-row md:justify-between">
            <p>© {new Date().getFullYear()} PROA CONSULTING. Todos los derechos reservados.</p>
            <p>Desarrollado con pasión por el futuro de la educación</p>
          </div>
        </Container>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }) {
  return (
    <Link href={href} className="text-sm text-gray-300 hover:text-white">
      {children}
    </Link>
  )
}

