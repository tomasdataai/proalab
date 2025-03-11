// Eliminamos la importación estática de gray-matter
import { format } from "date-fns"
import { es } from "date-fns/locale"

// Detectamos si estamos en el cliente
const isClient = typeof window !== "undefined"

export type BlogPost = {
  slug: string
  title: string
  date: string
  formattedDate: string
  excerpt: string
  content: string
  author: string
  category: string
  coverImage: string
  readingTime: string
}

// Datos de blog estáticos para usar en el cliente
const staticBlogs: BlogPost[] = [
  {
    slug: "impacto-ia-educacion-superior",
    title: "El impacto de la IA en la educación superior",
    date: "2023-05-15",
    formattedDate: "15 mayo 2023",
    excerpt: "Análisis de cómo la inteligencia artificial está transformando las universidades y el aprendizaje.",
    content: "Contenido del artículo...",
    author: "Dr. Carlos Mendoza",
    category: "Educación",
    coverImage: "/images/blog/ia-educacion.jpg",
    readingTime: "5 min de lectura",
  },
  {
    slug: "habilidades-futuro-2025-2030",
    title: "Habilidades del futuro: perspectivas 2025-2030",
    date: "2023-06-22",
    formattedDate: "22 junio 2023",
    excerpt: "Las competencias más demandadas en el mercado laboral de la próxima década.",
    content: "Contenido del artículo...",
    author: "Dra. Ana Martínez",
    category: "Mercado Laboral",
    coverImage: "/images/blog/habilidades-futuro.jpg",
    readingTime: "7 min de lectura",
  },
  {
    slug: "transformacion-digital-educacion",
    title: "Transformación digital en la educación latinoamericana",
    date: "2023-07-10",
    formattedDate: "10 julio 2023",
    excerpt: "Retos y oportunidades en la digitalización de sistemas educativos en América Latina.",
    content: "Contenido del artículo...",
    author: "Prof. Luis Ramírez",
    category: "Tecnología Educativa",
    coverImage: "/images/blog/transformacion-digital.jpg",
    readingTime: "6 min de lectura",
  },
]

// Funciones para el servidor (solo se ejecutan en el servidor)
// No importamos nada aquí, lo haremos dinámicamente

export async function getBlogSlugs() {
  if (isClient) return staticBlogs.map((blog) => blog.slug + ".md")

  try {
    // Importaciones dinámicas solo cuando se ejecuta en el servidor
    const fs = await import("fs")
    const path = await import("path")

    const blogsDirectory = path.join(process.cwd(), "content/blog")
    return fs.readdirSync(blogsDirectory).filter((file) => file.endsWith(".md"))
  } catch (error) {
    console.error("Error reading blog directory:", error)
    return []
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  if (isClient) {
    const blog = staticBlogs.find((b) => b.slug === slug.replace(/\.md$/, ""))
    return blog || null
  }

  try {
    // Importaciones dinámicas solo cuando se ejecuta en el servidor
    const fs = await import("fs")
    const path = await import("path")
    const matter = await import("gray-matter")

    const blogsDirectory = path.join(process.cwd(), "content/blog")
    const realSlug = slug.replace(/\.md$/, "")
    const fullPath = path.join(blogsDirectory, `${realSlug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter.default(fileContents)

    const date = new Date(data.date)
    const formattedDate = format(date, "dd MMMM yyyy", { locale: es })

    // Calculate reading time (approx. 200 words per minute)
    const wordCount = content.split(/\s+/).length
    const readingTime = `${Math.ceil(wordCount / 200)} min de lectura`

    return {
      slug: realSlug,
      title: data.title,
      date: data.date,
      formattedDate,
      excerpt: data.excerpt,
      content,
      author: data.author,
      category: data.category,
      coverImage: data.coverImage,
      readingTime,
    }
  } catch (error) {
    console.error(`Error getting blog by slug ${slug}:`, error)
    return null
  }
}

export async function getAllBlogs(): Promise<BlogPost[]> {
  if (isClient) return staticBlogs

  try {
    const slugs = await getBlogSlugs()
    const blogsPromises = slugs.map((slug) => getBlogBySlug(slug))
    const blogs = (await Promise.all(blogsPromises)).filter((blog): blog is BlogPost => blog !== null)

    return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("Error getting all blogs:", error)
    return []
  }
}

export async function getAllBlogsClient(): Promise<BlogPost[]> {
  if (isClient) {
    // En desarrollo o cuando no podemos acceder a la API, usamos datos estáticos
    return staticBlogs
  }

  try {
    const response = await fetch("/api/blog")
    const blogs = await response.json()
    return blogs
  } catch (error) {
    console.error("Error fetching blogs client-side:", error)
    return staticBlogs // Fallback a datos estáticos
  }
}

export async function getBlogBySlugClient(slug: string): Promise<BlogPost | null> {
  if (isClient) {
    // En desarrollo o cuando no podemos acceder a la API, usamos datos estáticos
    return staticBlogs.find((blog) => blog.slug === slug) || null
  }

  try {
    const response = await fetch(`/api/blog/${slug}`)
    if (!response.ok) return null
    const blog = await response.json()
    return blog
  } catch (error) {
    console.error(`Error fetching blog ${slug} client-side:`, error)
    return null
  }
}

