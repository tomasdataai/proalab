"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  return (
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
          <Link href="#research" className="text-sm font-medium hover:text-[#EE3831]">
            Investigación
          </Link>
          <Link href="#student-resources" className="text-sm font-medium hover:text-[#EE3831]">
            Recursos
          </Link>
          <Link href="#blog" className="text-sm font-medium hover:text-[#EE3831]">
            Blog
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:text-[#EE3831]">
            Testimonios
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-[#EE3831]">
            Planes
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-[#EE3831]">
            Iniciar sesión
          </Link>
          <Button className="mt-2 bg-[#EE3831] hover:bg-[#E50695]">Comenzar</Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

