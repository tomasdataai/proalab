"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

interface LogoProps {
  darkMode: boolean
  size?: "sm" | "md" | "lg"
}

export function Logo({ darkMode, size = "md" }: LogoProps) {
  const sizes = {
    sm: { width: 80, height: 24, textSize: "text-lg" },
    md: { width: 100, height: 32, textSize: "text-xl" },
    lg: { width: 120, height: 40, textSize: "text-2xl" },
  }

  const { width, height, textSize } = sizes[size]

  return (
    <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link href="/" className="flex items-center gap-2">
        <Image
          src={
            darkMode
              ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FukuRwTaUVYnmTaUZjifsVqtZaFU8T.png"
              : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3hFoKfdFF75cS5iWaYl78usEBCQ7Zm.png"
          }
          alt="PROA CONSULTING Logo"
          width={width}
          height={height}
          className={`h-${size === "sm" ? "6" : size === "md" ? "8" : "10"} w-auto`}
        />
        <span className={`${textSize} font-bold text-[#25282A] dark:text-white`}>ProaLAB</span>
      </Link>
    </motion.div>
  )
}

