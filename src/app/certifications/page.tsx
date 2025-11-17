"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { motion } from "@/components/motion-wrapper"
import { Star } from "lucide-react"

const certificates = [
  "Certificate of Excellence in Community Impact Advocacy",
  "Certificate of Merit in Virtual Polyworking & Multipreneurship",
  "Certificate of Merit in Prompt Engineering, Vibe-Coding & Context Engineering"
]

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50">
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900">Certifications</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">Earn three prestigious certifications upon completion</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {certificates.map((certificate, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.2 }}>
                <Card className="h-full text-center border-2 border-yellow-200">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">{certificate}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}