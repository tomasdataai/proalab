"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, GraduationCap, Landmark, BookOpen } from "lucide-react"
import { EducationCaseStudy } from "./education-case-study"
import { GovernmentCaseStudy } from "./government-case-study"
import { EnterpriseCaseStudy } from "./enterprise-case-study"
import { ResearchCaseStudy } from "./research-case-study"

export function CaseStudyTabs() {
  return (
    <Tabs defaultValue="education" className="w-full">
      <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4 mb-8">
        <TabsTrigger value="education" className="data-[state=active]:bg-[#EE3831] data-[state=active]:text-white">
          <GraduationCap className="h-4 w-4 mr-2" />
          Educación
        </TabsTrigger>
        <TabsTrigger value="government" className="data-[state=active]:bg-[#F1B434] data-[state=active]:text-[#25282A]">
          <Landmark className="h-4 w-4 mr-2" />
          Gobierno
        </TabsTrigger>
        <TabsTrigger value="enterprise" className="data-[state=active]:bg-[#E50695] data-[state=active]:text-white">
          <Building className="h-4 w-4 mr-2" />
          Empresas
        </TabsTrigger>
        <TabsTrigger value="research" className="data-[state=active]:bg-[#25282A] data-[state=active]:text-white">
          <BookOpen className="h-4 w-4 mr-2" />
          Investigación
        </TabsTrigger>
      </TabsList>

      <TabsContent value="education">
        <EducationCaseStudy />
      </TabsContent>

      <TabsContent value="government">
        <GovernmentCaseStudy />
      </TabsContent>

      <TabsContent value="enterprise">
        <EnterpriseCaseStudy />
      </TabsContent>

      <TabsContent value="research">
        <ResearchCaseStudy />
      </TabsContent>
    </Tabs>
  )
}

