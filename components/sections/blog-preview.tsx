"use client"

import { useEffect, useState } from "react"
import { type BlogPost, getAllBlogsClient } from "@/lib/blog"
import { BlogCard } from "@/components/blog/blog-card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import Link from "next/link"
import { motion } from "framer-motion"

export function BlogPreview() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true)
        setError(null)
        const data = await getAllBlogsClient()
        setBlogs(data.slice(0, 3)) // Solo mostramos los 3 más recientes
      } catch (error) {
        console.error("Error fetching blogs:", error)
        setError("No se pudieron cargar los artículos. Inténtalo de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section id="blog" className="py-16 bg-gray-50 dark:bg-[#1F1F1F]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#25282A] dark:text-white">Últimos artículos</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explorando el futuro de la educación y el trabajo en Latinoamérica a través de análisis, investigaciones y
            tendencias.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <ErrorMessage message={error} className="max-w-md mx-auto" />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogs.map((blog, index) => (
              <BlogCard key={blog.slug} blog={blog} index={index} />
            ))}
          </motion.div>
        )}

        <div className="text-center mt-12">
          <Button asChild className="bg-[#EE3831] hover:bg-[#E50695] text-white">
            <Link href="/blog">
              Ver todos los artículos <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

