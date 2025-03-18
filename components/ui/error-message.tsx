import type React from "react"
import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string
}

export function ErrorMessage({ message, className, ...props }: ErrorMessageProps) {
  return (
    <div
      className={cn("flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive", className)}
      role="alert"
      {...props}
    >
      <AlertCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  )
}

