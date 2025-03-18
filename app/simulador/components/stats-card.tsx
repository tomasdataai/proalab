"use client"

import { Card, CardContent } from "../../../components/ui/card"

interface StatsCardProps {
  title: string
  value: string | number
  trend?: number
  subtitle?: string
  className?: string
}

export default function StatsCard({ title, value, trend, subtitle, className }: StatsCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-bold">{value}</h3>
            {trend !== undefined && (
              <div className={`text-sm font-medium flex items-center ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                <span>
                  {trend >= 0 ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}%
                </span>
              </div>
            )}
          </div>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
