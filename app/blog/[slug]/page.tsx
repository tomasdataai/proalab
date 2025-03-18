import { Container } from "@/components/ui/container"
import { BlogContent } from "@/components/blog/blog-content"
import { getAllBlogs, getBlogBySlug } from "@/lib/blog"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // Añadimos await
  const blog = await getBlogBySlug(params.slug)

  if (!blog) {
    return {
      title: "Artículo no encontrado - ProaLAB",
      description: "El artículo que estás buscando no existe o ha sido movido.",
    }
  }

  return {
    title: `${blog.title} - Blog ProaLAB`,
    description: blog.excerpt,
  }
}

export async function generateStaticParams() {
  // Añadimos await
  const blogs = await getAllBlogs()

  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Añadimos await
  const blog = await getBlogBySlug(params.slug)

  if (!blog) {
    notFound()
  }

  return (
    <main className="flex-1 pt-24 pb-16">
      <Container>
        <BlogContent slug={params.slug} initialBlog={blog} />
      </Container>
    </main>
  )
}

