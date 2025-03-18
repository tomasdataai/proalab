"use client"

import { Suspense, lazy } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"

import { Hero } from "@/components/sections/hero"
import { Features } from "@/components/sections/features"
import { Products } from "@/components/sections/products"
// import { Research } from "@/components/sections/research"
import { StudentResources } from "@/components/sections/student-resources"
// import { ProaAI } from "@/components/sections/proa-ai"
// import { TechAdvantages } from "@/components/sections/tech-advantages"
// import { UseCases } from "@/components/sections/use-cases"
import { Testimonials } from "@/components/sections/testimonials"
import { Pricing } from "@/components/sections/pricing"
import { CTA } from "@/components/sections/cta"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
// import { Chatbot } from "@/components/ui/chatbot"
import Link from "next/link"
import { CheckCircle2, Menu } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { AppProvider, useAppContext } from "@/contexts/app-context"

// Lazy load componentes pesados
const ProaAI = lazy(() => import("@/components/sections/proa-ai").then((mod) => ({ default: mod.ProaAI })))
const TechAdvantages = lazy(() =>
  import("@/components/sections/tech-advantages").then((mod) => ({ default: mod.TechAdvantages })),
)
const UseCases = lazy(() => import("@/components/sections/use-cases").then((mod) => ({ default: mod.UseCases })))
const BlogPreview = lazy(() =>
  import("@/components/sections/blog-preview").then((mod) => ({ default: mod.BlogPreview })),
)
const Chatbot = lazy(() => import("@/components/ui/chatbot").then((mod) => ({ default: mod.Chatbot })))

// Add this function at the beginning of the file, before the main component
function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>, targetId: string) {
  e.preventDefault()
  const target = document.querySelector(targetId)
  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

function LoadingFallback() {
  return (
    <div className="flex justify-center items-center py-24">
      <LoadingSpinner size="lg" />
    </div>
  )
}

function LandingPageContent() {
  const { isDarkMode } = useAppContext()

  return (
    <div className={`flex min-h-screen flex-col ${isDarkMode ? "dark" : ""}`}>
      <SiteHeader />
      <main className="flex-1 pt-16">
        <Hero />
        <Features />
        <Products />

        <Suspense fallback={<LoadingFallback />}>
          <TechAdvantages />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <UseCases />
        </Suspense>

        <StudentResources />

        <Suspense fallback={<LoadingFallback />}>
          <ProaAI />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <BlogPreview />
        </Suspense>

        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <SiteFooter />

      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
    </div>
  )
}

// En la función LandingPage, añadir la sección de blog antes de Testimonials
export default function LandingPage() {
  return (
    <AppProvider>
      <LandingPageContent />
    </AppProvider>
  )
}

function MobileNav() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-white dark:bg-[#25282A] dark:text-white">
          <SheetHeader>
            <SheetTitle className="text-[#25282A] dark:text-white">ProaLAB</SheetTitle>
            <SheetDescription className="text-gray-500 dark:text-gray-300">
              Modelador de futuros educacionales
            </SheetDescription>
          </SheetHeader>
          <nav className="flex flex-col gap-4 mt-8">
            <Link href="#products" className="text-sm font-medium hover:text-[#EE3831]">
              Productos
            </Link>
            <Link href="#features" className="text-sm font-medium hover:text-[#EE3831]">
              Características
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-[#EE3831]">
              Testimonios
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-[#EE3831]">
              Planes
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-[#EE3831]">
              Contacto
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-[#EE3831]">
              Iniciar sesión
            </Link>
            <Button className="mt-2 bg-[#EE3831] hover:bg-[#E50695]">Comenzar</Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}

function FeatureCard({ title, description, icon }) {
  return (
    <Card className="flex flex-col items-center text-center dark:bg-[#333333] dark:border-gray-700">
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle className="text-[#25282A] dark:text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base text-gray-500 dark:text-gray-300">{description}</CardDescription>
      </CardContent>
    </Card>
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

function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonColor,
  highlighted = false,
  highlightColor = "border-[#F1B434]",
}) {
  return (
    <Card
      className={`flex flex-col dark:bg-[#333333] dark:border-gray-700 ${highlighted ? highlightColor + " shadow-lg" : ""}`}
    >
      <CardHeader>
        <CardTitle className="text-[#25282A] dark:text-white">{title}</CardTitle>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-[#25282A] dark:text-white">{price}</span>
          <span className="text-gray-500 dark:text-gray-300">/mes</span>
        </div>
        <CardDescription className="dark:text-gray-300">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#EE3831]" />
              <span className="text-sm text-gray-500 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className={`w-full ${buttonColor}`}>{buttonText}</Button>
      </CardFooter>
    </Card>
  )
}

function FooterLink({ href, children }) {
  return (
    <Link href={href} className="text-sm text-gray-300 hover:text-white">
      {children}
    </Link>
  )
}

function ProductFeature({ children }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="h-5 w-5 mt-0.5 text-[#EE3831]" />
      <span className="text-sm text-gray-600 dark:text-gray-300">{children}</span>
    </li>
  )
}

function Sheet({ children }) {
  return <div>{children}</div>
}

function SheetTrigger({ asChild, children }) {
  return <div>{children}</div>
}

function SheetContent({ side, children, className }) {
  return (
    <div className={`fixed inset-y-0 right-0 z-50 flex ${className}`}>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="fixed inset-y-0 right-0 h-full w-3/4 border-l p-6 shadow-lg">{children}</div>
    </div>
  )
}

function SheetHeader({ children }) {
  return <div className="flex flex-col space-y-2 text-left">{children}</div>
}

function SheetTitle({ children, className }) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
}

function SheetDescription({ children, className }) {
  return <p className={`text-sm ${className}`}>{children}</p>
}

