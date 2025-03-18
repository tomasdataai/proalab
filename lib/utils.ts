import type React from "react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>, targetId: string) {
  e.preventDefault()
  const target = document.querySelector(targetId)
  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

