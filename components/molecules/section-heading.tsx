"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  description?: string
  centered?: boolean
  className?: string
}

export function SectionHeading({ title, description, centered = true, className = "" }: SectionHeadingProps) {
  return (
    <div className={`space-y-2 ${centered ? "text-center" : "text-left"} ${className}`}>
      <motion.h2
        className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#25282A] dark:text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-300 md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}

