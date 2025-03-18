"use client"

import type React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface CardWithIconProps {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
  headerColor?: string
  borderColor?: string
}

export function CardWithIcon({
  icon,
  title,
  children,
  headerColor = "bg-[#EE3831]",
  borderColor = "border-[#EE3831]",
}: CardWithIconProps) {
  return (
    <Card
      className={`flex flex-col overflow-hidden border-2 ${borderColor} dark:bg-[#333333] transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
    >
      <div className={`${headerColor} p-4`}>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <CardHeader className="p-6 pb-0">
        <div className="mb-4 flex justify-center">{icon}</div>
      </CardHeader>
      <CardContent className="flex-1 p-6 pt-0">{children}</CardContent>
    </Card>
  )
}

