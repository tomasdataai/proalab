import { Container } from "@/components/ui/container"
import { BlogList } from "@/components/blog/blog-list"
import { getAllBlogs } from "@/lib/blog"

export const metadata = {
  title: "Blog ProaLAB - Explorando el futuro de la educación",
  description: "Artículos, investigaciones y análisis sobre el futuro de la educación y el trabajo en Latinoamérica.",
}

export default async function BlogPage() {
  // Añadimos await
  const blogs = await getAllBlogs()

  return (
    <main className="flex-1 pt-24 pb-16">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#25282A] dark:text-white">Blog ProaLAB</h1>
            <p className="text-gray-600 dark:text-gray-300 md:text-lg max-w-2xl mx-auto">
              Explorando el futuro de la educación y el trabajo en Latinoamérica a través de análisis, investigaciones y
              tendencias.
            </p>
          </div>

          <BlogList initialBlogs={blogs} limit={6} />
        </div>
      </Container>
    </main>
  )
}

