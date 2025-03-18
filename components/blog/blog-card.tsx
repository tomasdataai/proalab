"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/blog"

interface BlogCardProps {
  blog: BlogPost
  index?: number
}

export function BlogCard({ blog, index = 0 }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-[#333333]">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={blog.coverImage || "/placeholder.svg?height=340&width=600"}
            alt={blog.title}
            width={600}
            height={340}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            loading="lazy" // Lazy loading para imágenes
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizes
          />
          <div className="absolute top-2 right-2">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-[#EE3831] text-white rounded-full">
              {blog.category}
            </span>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <time className="text-sm text-gray-500 dark:text-gray-400">{blog.formattedDate}</time>
            <span className="text-xs text-gray-500 dark:text-gray-400">{blog.readingTime}</span>
          </div>
          <h3 className="mt-2 text-lg font-semibold text-[#25282A] dark:text-white line-clamp-2">{blog.title}</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{blog.excerpt}</p>
          <Button
            variant="link"
            className="mt-4 p-0 text-[#EE3831] hover:text-[#E50695] dark:text-[#F1B434] dark:hover:text-[#E50695]"
            asChild
          >
            <Link href={`/blog/${blog.slug}`} aria-label={`Leer más sobre ${blog.title}`}>
              Leer más <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

