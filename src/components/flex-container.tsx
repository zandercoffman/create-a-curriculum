'use client'

import { BookOpen, MessageSquare } from "lucide-react"
import { motion } from 'framer-motion'
import Link from "next/link"

export function FlexContainer() {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <Link href={"/prompt/curriculum"} prefetch>
        <motion.div className="flex-1 bg-primary-foreground rounded-lg shadow-md p-6"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}>
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
        </motion.div>
      </Link>
      <Link href={"/prompt/appeal"} prefetch>
        <motion.div className="flex-1 bg-primary-foreground rounded-lg shadow-md p-6"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}>
          <div className="grid place-items-center h-full text-center">
            <div className="space-y-4">
              <div className="flex flex-row items-center justify-center space-x-2">
                <MessageSquare className="w-8 h-8 text-primary" />
                <span className="text-xl font-semibold">Appeal Generator</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm">
              Craft effective arguments to justify why your product should be approved. Address objections with logical, well-structured rebuttals that highlight its value and necessity.
              </p>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  )
}