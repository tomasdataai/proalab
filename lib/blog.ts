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
    date: "2024-03-10",
    formattedDate: "10 marzo 2024",
    excerpt:
      "Análisis profundo sobre cómo la inteligencia artificial está transformando la educación universitaria en Latinoamérica.",
    content:
      "# El impacto de la IA en la educación superior\n\nLa inteligencia artificial (IA) está revolucionando la forma en que concebimos la educación superior en Latinoamérica. Desde sistemas de tutoría personalizada hasta herramientas de evaluación automatizada, las universidades están adoptando estas tecnologías para mejorar la experiencia educativa y preparar a los estudiantes para un futuro cada vez más digitalizado...",
    author: "Dr. Carlos Mendoza",
    category: "Tecnología",
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1740&auto=format&fit=crop",
    readingTime: "8 min de lectura",
  },
  {
    slug: "habilidades-futuro-2025-2030",
    title: "Habilidades del futuro: 2025-2030",
    date: "2024-03-08",
    formattedDate: "8 marzo 2024",
    excerpt:
      "Proyecciones y análisis de las competencias más demandadas en el próximo quinquenio en el mercado laboral latinoamericano.",
    content:
      "# Habilidades del futuro: 2025-2030\n\nEl mercado laboral está experimentando una transformación acelerada impulsada por la automatización, la inteligencia artificial y los cambios en los modelos de negocio. En este contexto, identificar las habilidades que serán más valoradas en los próximos años resulta crucial tanto para profesionales como para instituciones educativas en Latinoamérica...",
    author: "Dra. Ana Martínez",
    category: "Mercado Laboral",
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1740&auto=format&fit=crop",
    readingTime: "7 min de lectura",
  },
  {
    slug: "transformacion-digital-educacion",
    title: "Transformación digital en educación",
    date: "2024-03-05",
    formattedDate: "5 marzo 2024",
    excerpt:
      "Guía completa sobre la implementación de tecnologías educativas emergentes en instituciones latinoamericanas.",
    content:
      "# Transformación digital en educación\n\nLa transformación digital está redefiniendo el panorama educativo en Latinoamérica, ofreciendo nuevas oportunidades para mejorar el acceso, la calidad y la relevancia de la educación. Este artículo explora las tecnologías emergentes que están impulsando esta transformación y proporciona una guía práctica para su implementación en instituciones educativas...",
    author: "Ing. Javier Pérez",
    category: "Innovación",
    coverImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1740&auto=format&fit=crop",
    readingTime: "6 min de lectura",
  },
  {
    slug: "industria-electrica-ia",
    title: "La importancia de la industria eléctrica para el desarrollo de la IA",
    date: "2024-03-03",
    formattedDate: "3 marzo 2024",
    excerpt:
      "Análisis del impacto de la infraestructura energética en el avance de la inteligencia artificial en Latinoamérica.",
    content:
      "# La importancia de la industria eléctrica para el desarrollo de la IA\n\nLa inteligencia artificial (IA) está transformando industrias y sociedades a un ritmo sin precedentes. Sin embargo, detrás de estos avances tecnológicos existe una realidad fundamental que a menudo pasa desapercibida: el enorme consumo energético que requieren los sistemas de IA...",
    author: "Ing. Lucía Ramírez",
    category: "Infraestructura",
    coverImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1740&auto=format&fit=crop",
    readingTime: "9 min de lectura",
  },
  {
    slug: "datacenters-latinoamerica",
    title: "El potencial de los datacenters para Latinoamérica en la era de chips e IA",
    date: "2024-03-01",
    formattedDate: "1 marzo 2024",
    excerpt:
      "Análisis de las oportunidades y desafíos para el desarrollo de infraestructura de datacenters en la región latinoamericana.",
    content:
      "# El potencial de los datacenters para Latinoamérica en la era de chips e IA\n\nLa convergencia de la inteligencia artificial avanzada y la creciente demanda de procesamiento de datos está transformando el panorama tecnológico global. En este contexto, los datacenters emergen como infraestructura crítica para el desarrollo digital de las economías...",
    author: "Dr. Miguel Sánchez",
    category: "Tecnología",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1740&auto=format&fit=crop",
    readingTime: "8 min de lectura",
  },
  {
    slug: "automatizacion-frey-osborne",
    title: "Automatización y futuro del trabajo: Revisitando Frey & Osborne en Latinoamérica",
    date: "2024-02-28",
    formattedDate: "28 febrero 2024",
    excerpt:
      "Análisis de las implicaciones del estudio de Frey & Osborne sobre automatización para los mercados laborales latinoamericanos.",
    content:
      '# Automatización y futuro del trabajo: Revisitando Frey & Osborne en Latinoamérica\n\nEn 2013, Carl Benedikt Frey y Michael A. Osborne publicaron su influyente estudio "The Future of Employment", donde estimaron que aproximadamente el 47% de los empleos en Estados Unidos estaban en alto riesgo de automatización en las siguientes dos décadas...',
    author: "Dra. Gabriela Torres",
    category: "Mercado Laboral",
    coverImage: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=1740&auto=format&fit=crop",
    readingTime: "10 min de lectura",
  },
]

// Funciones para el cliente
export async function getAllBlogs(): Promise<BlogPost[]> {
  return staticBlogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  return staticBlogs.find((blog) => blog.slug === slug) || null
}

// Estas funciones ahora son alias de las anteriores ya que todo está en el cliente
export const getAllBlogsClient = getAllBlogs
export const getBlogBySlugClient = getBlogBySlug

