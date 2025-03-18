"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { getBlogBySlugClient, type BlogPost } from "@/lib/blog"

interface BlogContentProps {
  slug: string
  initialBlog?: BlogPost
}

export function BlogContent({ slug, initialBlog }: BlogContentProps) {
  const [blog, setBlog] = useState<BlogPost | null>(initialBlog || null)
  const [loading, setLoading] = useState(!initialBlog)

  useEffect(() => {
    if (!initialBlog) {
      const fetchBlog = async () => {
        setLoading(true)
        try {
          const fetchedBlog = await getBlogBySlugClient(slug)
          setBlog(fetchedBlog)
        } catch (error) {
          console.error("Error fetching blog:", error)
        } finally {
          setLoading(false)
        }
      }

      fetchBlog()
    }
  }, [initialBlog, slug])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Artículo no encontrado</h2>
        <Link href="/blog" passHref>
          <Button>Volver al blog</Button>
        </Link>
      </div>
    )
  }

  return (
    <article className="max-w-4xl mx-auto">
      <Link href="/blog" passHref>
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al blog
        </Button>
      </Link>

      <div className="mb-8">
        <div className="relative aspect-video w-full mb-6 rounded-xl overflow-hidden">
          <Image src={blog.coverImage || "/placeholder.svg"} alt={blog.title} fill className="object-cover" priority />
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="inline-block px-3 py-1 text-sm font-medium bg-[#EE3831] text-white rounded-full">
              {blog.category}
            </span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {blog.formattedDate} · {blog.readingTime}
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#25282A] dark:text-white">{blog.title}</h1>

        <div className="flex items-center mb-8">
          <div className="h-10 w-10 rounded-full bg-[#EE3831] flex items-center justify-center text-white font-bold mr-3">
            {blog.author
              .split(" ")
              .map((name) => name[0])
              .join("")}
          </div>
          <div>
            <p className="font-medium text-[#25282A] dark:text-white">{blog.author}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Autor</p>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-[#25282A] dark:prose-headings:text-white prose-a:text-[#EE3831] dark:prose-a:text-[#F1B434]">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSanitize]}>
          {blog.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}

