'use client'

import { BookOpen, MessageSquare } from "lucide-react"

export function FlexContainer() {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <div className="flex-1 bg-primary-foreground rounded-lg shadow-md p-6">
        <div className="grid place-items-center h-full text-center">
          <div className="space-y-4">
            <div className="flex flex-row items-center justify-center space-x-2">
              <BookOpen className="w-8 h-8 text-primary" />
              <span className="text-xl font-semibold">Curriculum Prompt Generator</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Create tailored educational prompts to enhance your curriculum. Generate engaging questions and discussion topics for various subjects and grade levels.
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-primary-foreground rounded-lg shadow-md p-6">
        <div className="grid place-items-center h-full text-center">
          <div className="space-y-4">
            <div className="flex flex-row items-center justify-center space-x-2">
              <MessageSquare className="w-8 h-8 text-primary" />
              <span className="text-xl font-semibold">Rebuttal Generator</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Craft effective counterarguments and rebuttals. Analyze opposing viewpoints and generate logical, well-structured responses for debates, essays, or discussions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}