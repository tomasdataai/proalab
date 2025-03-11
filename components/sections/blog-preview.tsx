"use client"

import { useEffect, useState } from "react"
import { type BlogPost, getAllBlogsClient } from "@/lib/blog"
import { BlogCard } from "@/components/blog/blog-card"

export function BlogPreview() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await getAllBlogsClient()
        setBlogs(data.slice(0, 3)) // Solo mostramos los 3 más recientes
      } catch (error) {
        console.error("Error fetching blogs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <section id="blog" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Últimos artículos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="/blog" className="inline-block px-6 py-3 bg-primary text-white rounded-lg">
            Ver todos los artículos
          </a>
        </div>
      </div>
    </section>
  )
}

