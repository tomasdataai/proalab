import { NextResponse } from "next/server"
import { getAllBlogs } from "@/lib/blog"

export async function GET() {
  try {
    // Añadimos await
    const blogs = await getAllBlogs()
    return NextResponse.json(blogs)
  } catch (error) {
    console.error("Error in blog API route:", error)
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

