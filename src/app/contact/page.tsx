"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone } from "lucide-react"

const whatsappLink = "https://wa.me/2349025152818?text=Hello%20Akademyx%20Team%2C%20I%20would%20like%20to%20learn%20more%20about%20the%20programme."

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50">
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 max-w-2xl">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-900">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600">Reach us instantly on WhatsApp for questions, enrollment and support.</p>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
                <Button size="lg" className="w-full bg-green-500 hover:bg-green-600 text-white">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact us on WhatsApp
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}