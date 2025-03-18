"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  label?: string
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

export function IconButton({ icon, label, variant = "primary", size = "md", className, ...props }: IconButtonProps) {
  const variantClasses = {
    primary: "bg-[#EE3831] text-white hover:bg-[#E50695]",
    secondary: "bg-[#F1B434] text-[#25282A] hover:bg-[#E50695] hover:text-white",
    outline: "bg-transparent border border-current text-[#EE3831] hover:bg-[#EE3831] hover:text-white",
    ghost: "bg-transparent text-[#25282A] hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700",
  }

  const sizeClasses = {
    sm: "p-1.5 rounded-md",
    md: "p-2 rounded-lg",
    lg: "p-3 rounded-xl",
  }

  return (
    <motion.button
      className={cn(
        "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EE3831]",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      {...props}
    >
      {icon}
      {label && <span className="sr-only">{label}</span>}
    </motion.button>
  )
}

