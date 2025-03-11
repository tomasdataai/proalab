"use client"

import type React from "react"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

interface FeatureItemProps {
  children: React.ReactNode
  icon?: React.ReactNode
  color?: string
}

export function FeatureItem({ children, icon, color = "text-white" }: FeatureItemProps) {
  return (
    <motion.li
      className="flex items-start gap-2"
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {icon || <CheckCircle2 className={`h-5 w-5 mt-0.5 ${color}`} />}
      <span className={`text-sm ${color}`}>{children}</span>
    </motion.li>
  )
}

