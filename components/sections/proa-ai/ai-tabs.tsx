"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatTab } from "./chat-tab"
import { AnalysisTab } from "./analysis-tab"
import { CodeTab } from "./code-tab"

export function AiTabs() {
  const [activeTab, setActiveTab] = useState("chat")

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <Tabs defaultValue="chat" onValueChange={handleTabChange} className="w-full">
      <div className="flex justify-center mb-6">
        <TabsList className="grid w-full max-w-md grid-cols-3 bg-[#1A1A1A]">
          <TabsTrigger value="chat" className="data-[state=active]:bg-[#E50695] data-[state=active]:text-white">
            Chat
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-[#E50695] data-[state=active]:text-white">
            Análisis
          </TabsTrigger>
          <TabsTrigger value="code" className="data-[state=active]:bg-[#E50695] data-[state=active]:text-white">
            Código
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="relative">
        <TabsContent value="chat" className="mt-0">
          <ChatTab />
        </TabsContent>

        <TabsContent value="analysis" className="mt-0">
          <AnalysisTab />
        </TabsContent>

        <TabsContent value="code" className="mt-0">
          <CodeTab />
        </TabsContent>
      </div>
    </Tabs>
  )
}

