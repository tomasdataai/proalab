import { type NextRequest, NextResponse } from "next/server"
import { getBlogBySlug } from "@/lib/blog"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug
  const blog = getBlogBySlug(slug)

  if (!blog) {
    return new NextResponse(null, { status: 404 })
  }

  return NextResponse.json(blog)
}

