'use client'

import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { motion } from "@/components/motion-wrapper"
import LandingHeader from "@/components/LandingHeader"
import WhatsAppIntegration from "@/components/WhatsAppIntegration"
import {
  BookOpen,
  Users,
  Award,
  Clock,
  Zap,
  Target,
  TrendingUp,
  MessageSquare,
  Video,
  FileText,
  Headphones,
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Globe,
  Brain,
  Heart,
  Share2
} from "lucide-react"

const ApplicationForm = dynamic(() => import('@/components/ApplicationForm').then(mod => ({ default: mod.ApplicationForm })), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-100 h-96 rounded-lg"></div>
})

const ReferralSection = dynamic(() => import('@/components/ReferralSection').then(mod => ({ default: mod.ReferralSection })), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-100 h-96 rounded-lg"></div>
})

const courses = [
  {
    title: "Virtual Polyworking & Multipreneurship in 21st Century Africa",
    description: "Learn how to build multiple digital income streams and operate confidently across industries as a multipreneur in today's African economy.",
    icon: Globe,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Prompting for Prompters (Mastering Prompt Engineering)",
    description: "A practical guide to communicating with AI accurately for creativity, automation and productivity.",
    icon: Brain,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "The Science & Art of Vibe-Coding & Context Engineering",
    description: "Master narrative design, context alignment, persuasive communication and emotional drivers in the digital economy.",
    icon: Heart,
    color: "from-green-500 to-teal-500"
  },
  {
    title: "WOW Systems & Socialized Marketing Through Collaborative Networking",
    description: "Learn to create unforgettable user experiences and scale your income using community-based marketing.",
    icon: Share2,
    color: "from-orange-500 to-red-500"
  }
]

const resources = [
  { name: "Audio Learning Files", icon: Headphones },
  { name: "Interactive Video Clips", icon: Video },
  { name: "Comprehensive PDF Materials", icon: FileText },
  { name: "Community Discussion Forums", icon: MessageSquare },
  { name: "Live Q&A and Mentorship", icon: Users }
]

const certificates = [
  "Certificate of Excellence in Community Impact Advocacy",
  "Certificate of Merit in Virtual Polyworking & Multipreneurship",
  "Certificate of Merit in Prompt Engineering, Vibe-Coding & Context Engineering"
]

const targetAudience = [
  "Youths", "Students", "Unemployed Graduates",
  "Job Seekers", "Aspiring Entrepreneurs", "Young Executives"
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <LandingHeader />

      {/* Hero Section - Add top padding for fixed header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 text-white pt-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-24 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-lg">Akademyx Masterclass Programme</span>
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Transform Your Future with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Digital Mastery
              </span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
              A 21-day (3 weeks) intensive, flexible & life-transforming digital skills accelerator designed
              to empower African youths with futuristic career paths, multiple income streams and
              real-world digital entrepreneurship. Just 1 hour daily on WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center gap-2 text-yellow-400">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">21 Days (3 Weeks)</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-400">
                <Target className="w-5 h-5" />
                <span className="font-semibold">₦3,000 Only</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-400">
                <Users className="w-5 h-5" />
                <span className="font-semibold">WhatsApp Based</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <a href="#apply" className="inline-block">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg px-8 py-6 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Apply Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-400/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-pink-400/20 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      </section>

      {/* Courses Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Four High-Impact Courses Combined
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              All four courses are combined into one comprehensive 21-day programme. For just ₦3,000, you'll master all these skills and earn three prestigious certifications that will transform your digital future and create multiple income streams.
            </p>

            {/* Value Proposition Callout */}
            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Star className="w-6 h-6 text-yellow-500" />
                <span className="text-lg font-bold text-gray-900">INCREDIBLE VALUE PACKAGE</span>
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
              <p className="text-center text-gray-700 font-medium">
                <span className="text-yellow-600 font-bold">₦3,000 ONLY</span> gets you access to ALL FOUR courses + THREE prestigious certifications + 21 days of intensive training (1 hour daily on WhatsApp)
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {courses.map((course, index) => {
              const Icon = course.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                    <CardHeader className="pb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${course.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                        {course.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-base leading-relaxed">
                        {course.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Learning Resources */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What You'll Get
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive resources to ensure your success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{resource.name}</h3>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-8 md:p-16 text-white text-center overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative z-10"
            >
              <Award className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Triple Certification</h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {certificates.map((cert, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                    <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-4" />
                    <p className="font-medium">{cert}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Who Is This For?</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {targetAudience.map((audience, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="px-6 py-3 bg-white rounded-full shadow-sm text-gray-700 font-medium border border-gray-100"
              >
                {audience}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Secure Your Spot Now</h2>
              <p className="text-lg text-gray-600">
                Join the next cohort and transform your digital career.
                <br />
                <span className="text-purple-600 font-bold">Fee: ₦3,000 Only</span>
              </p>
            </div>
            <ApplicationForm />
          </div>
        </div>
      </section>

      {/* Referral Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <ReferralSection />
        </div>
      </section>

      <WhatsAppIntegration
        phoneNumber="+2349025152818"
        defaultMessage="Hello, I would like to know more about the Akademyx Programme."
      />
    </div>
  )
}