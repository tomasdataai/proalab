"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatTab } from "./chat-tab"
import { AnalysisTab } from "./analysis-tab"
import { CodeTab } from "./code-tab"

export function AiTabs() {
  return (
    <Tabs defaultValue="chat" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-[#1A1A1A]">
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

      <TabsContent value="chat" className="mt-4">
        <ChatTab />
      </TabsContent>

      <TabsContent value="analysis" className="mt-4">
        <AnalysisTab />
      </TabsContent>

      <TabsContent value="code" className="mt-4">
        <CodeTab />
      </TabsContent>
    </Tabs>
  )
}

