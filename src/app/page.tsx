"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { motion } from "@/components/motion-wrapper"
import ApplicationForm from "@/components/ApplicationForm"
import ReferralSection from "@/components/ReferralSection"
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

const mandates = [
  "Build at least one income-generating and scalable digital enterprise",
  "Access done-for-you platforms to boost income streams",
  "Develop clarity on wealth creation, purpose and socio-economic positioning",
  "Understand the power of people, platforms and systems",
  "Become a certified Community Impact Advocate"
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
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-400/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-pink-400/20 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
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

      {/* Resources Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Course Resources
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to succeed in your digital transformation journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {resources.map((resource, index) => {
              const Icon = resource.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                      {resource.name}
                    </h3>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="w-8 h-8 text-yellow-500" />
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                Three Prestigious Certifications
              </h2>
              <Award className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Upon completing all four courses in our 21-day programme, you'll earn three prestigious, globally-recognized certifications. These certificates validate your expertise in digital entrepreneurship, AI mastery, and community impact leadership.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {certificates.map((certificate, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full text-center hover:shadow-xl transition-all duration-300 border-2 border-yellow-200">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">
                      {certificate}
                    </h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-purple-700 to-indigo-800 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Who Is This Programme For?
            </h2>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Designed specifically for forward-thinking young Africans ready to build their digital future
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {targetAudience.map((audience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300"
              >
                <Users className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                <h3 className="font-bold text-lg">{audience}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* End-Course Mandate Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-gray-900 to-purple-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Your Transformation Outcomes
            </h2>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              By the end of this programme, you will achieve these life-changing results
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {mandates.map((mandate, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-4 mb-6 p-6 rounded-2xl bg-white/5 backdrop-blur-sm"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <p className="text-lg md:text-xl leading-relaxed">{mandate}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="py-20 md:py-32 bg-gradient-to-br from-white to-purple-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Future?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Fill out the application form below and take the first step towards your digital transformation
            </p>
          </motion.div>

          <ApplicationForm />
        </div>
      </section>

      {/* Referral Section */}
      <ReferralSection />

      {/* Final CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Don't Miss This Opportunity
            </h2>
            <p className="text-lg md:text-xl mb-12 opacity-90 max-w-2xl mx-auto">
              Join hundreds of forward-thinking young Africans building new career paths, 
              digital enterprises and multiple income streams.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <a href="#apply" className="inline-block">
                <Button 
                  size="lg" 
                  className="bg-white text-orange-500 font-bold text-xl px-10 py-6 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Apply Now <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </a>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white font-bold text-xl px-10 py-6 rounded-2xl hover:bg-white/10 transition-all duration-300"
              >
                Pay ₦3,000 Now
              </Button>
            </div>

            <div className="flex items-center justify-center gap-4 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Limited Spots Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Next Cohort Starting Soon</span>
              </div>
            </div>
            <div className="mt-8">
              <a href="https://wa.me/2349025152818?text=Hello%20Akademyx%20Team%2C%20I%20would%20like%20to%20learn%20more%20about%20the%20programme." className="inline-block">
                <Button 
                  size="lg" 
                  className="bg-green-500 text-white font-bold text-xl px-10 py-6 rounded-2xl hover:bg-green-600"
                >
                  Contact us on WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <h3 className="text-2xl font-bold">Akademyx Masterclass</h3>
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
          <p className="text-gray-400 mb-4">
            Empowering African youths with digital skills for the future
          </p>
          <p className="text-sm text-gray-500">
            © 2024 Akademyx Masterclass Programme. All rights reserved.
          </p>
        </div>
      </footer>

      {/* WhatsApp Integration */}
      <WhatsAppIntegration
        phoneNumber="+2348012345678"
        defaultMessage="Hello! I'm interested in the Akademyx Masterclass Programme. Can you tell me more about the courses and enrollment?"
        position="bottom-right"
        theme="green"
        businessName="Akademyx Support"
        welcomeMessage="👋 Hi there! How can we help you with the Akademyx Masterclass Programme today?"
        workingHours={{
          start: "09:00",
          end: "18:00",
          timezone: "Africa/Lagos"
        }}
      />
    </div>
  )
}