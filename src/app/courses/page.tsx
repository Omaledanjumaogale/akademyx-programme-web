"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { motion } from "@/components/motion-wrapper"
import { Globe, Brain, Heart, Share2 } from "lucide-react"

const courses = [
  { title: "Virtual Polyworking & Multipreneurship in 21st Century Africa", description: "Learn how to build multiple digital income streams and operate confidently across industries as a multipreneur in today's African economy.", icon: Globe, color: "from-blue-500 to-cyan-500" },
  { title: "Prompting for Prompters (Mastering Prompt Engineering)", description: "A practical guide to communicating with AI accurately for creativity, automation and productivity.", icon: Brain, color: "from-purple-500 to-pink-500" },
  { title: "The Science & Art of Vibe-Coding & Context Engineering", description: "Master narrative design, context alignment, persuasive communication and emotional drivers in the digital economy.", icon: Heart, color: "from-green-500 to-teal-500" },
  { title: "WOW Systems & Socialized Marketing Through Collaborative Networking", description: "Learn to create unforgettable user experiences and scale your income using community-based marketing.", icon: Share2, color: "from-orange-500 to-red-500" }
]

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50">
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900">Courses</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">Explore the four combined courses in the 21-day programme</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {courses.map((course, index) => {
              const Icon = course.icon
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                  <Card className="h-full border-0 bg-gradient-to-br from-white to-gray-50">
                    <CardHeader className="pb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${course.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">{course.title}</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-base leading-relaxed">{course.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}