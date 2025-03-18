"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { BlogCard } from "./blog-card"
import { getAllBlogsClient, type BlogPost } from "@/lib/blog"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import Link from "next/link"

interface BlogListProps {
  initialBlogs?: BlogPost[]
  limit?: number
  showViewMore?: boolean
}

export function BlogList({ initialBlogs, limit = 3, showViewMore = true }: BlogListProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs || [])
  const [loading, setLoading] = useState(!initialBlogs)
  const [visibleCount, setVisibleCount] = useState(limit)

  useEffect(() => {
    if (!initialBlogs) {
      const fetchBlogs = async () => {
        setLoading(true)
        try {
          const fetchedBlogs = await getAllBlogsClient()
          setBlogs(fetchedBlogs)
        } catch (error) {
          console.error("Error fetching blogs:", error)
        } finally {
          setLoading(false)
        }
      }

      fetchBlogs()
    }
  }, [initialBlogs])

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + limit)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.slice(0, visibleCount).map((blog, index) => (
          <BlogCard key={blog.slug} blog={blog} index={index} />
        ))}
      </div>

      {showViewMore && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center mt-8">
          {visibleCount < blogs.length ? (
            <Button onClick={handleViewMore} className="group bg-[#EE3831] hover:bg-[#E50695] text-white">
              Ver más artículos
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          ) : (
            <Button asChild className="group bg-[#EE3831] hover:bg-[#E50695] text-white">
              <Link href="/blog">
                Ver todos los artículos
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          )}
        </motion.div>
      )}
    </div>
  )
}

