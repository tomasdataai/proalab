"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import type { ReactNode } from "react"

interface ProductFeatureProps {
  children: ReactNode
}

export function ProductFeature({ children }: ProductFeatureProps) {
  return (
    <motion.li
      className="flex items-start gap-2"
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <CheckCircle2 className="h-5 w-5 mt-0.5 text-[#EE3831]" />
      <span className="text-sm text-gray-600 dark:text-gray-300">{children}</span>
    </motion.li>
  )
}

