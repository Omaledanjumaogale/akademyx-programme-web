'use client'

import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { motion } from "@/components/motion-wrapper"
import LandingHeader from "@/components/LandingHeader"
import WhatsAppIntegration from "@/components/WhatsAppIntegration"
import { Footer } from "@/components/Footer"
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
  Share2,
  CheckCircle2
} from "lucide-react"

const ApplicationForm = dynamic(() => import('@/components/ApplicationForm').then(mod => ({ default: mod.ApplicationForm })), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-muted h-96 rounded-xl"></div>
})

const ReferralSection = dynamic(() => import('@/components/ReferralSection').then(mod => ({ default: mod.ReferralSection })), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-muted h-96 rounded-xl"></div>
})

const courses = [
  {
    title: "Virtual Polyworking & Multipreneurship in 21st Century Africa",
    description: "Learn how to build multiple digital income streams and operate confidently across industries as a multipreneur in today's African economy.",
    icon: Globe,
    color: "bg-blue-500/10 text-blue-600"
  },
  {
    title: "Prompting for Prompters (Mastering Prompt Engineering)",
    description: "A practical guide to communicating with AI accurately for creativity, automation and productivity.",
    icon: Brain,
    color: "bg-purple-500/10 text-purple-600"
  },
  {
    title: "The Science & Art of Vibe-Coding & Context Engineering",
    description: "Master narrative design, context alignment, persuasive communication and emotional drivers in the digital economy.",
    icon: Heart,
    color: "bg-emerald-500/10 text-emerald-600"
  },
  {
    title: "WOW Systems & Socialized Marketing Through Collaborative Networking",
    description: "Learn to create unforgettable user experiences and scale your income using community-based marketing.",
    icon: Share2,
    color: "bg-orange-500/10 text-orange-600"
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
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
      {/* Header */}
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-primary/95 text-white pt-24 pb-20 md:pt-32 md:pb-32">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>

        <div className="relative container mx-auto px-6 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center justify-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-yellow-300 font-semibold text-sm tracking-wide uppercase">Akademyx Masterclass Programme</span>
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight font-heading">
              Transform Your Future with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-emerald-200">
                Digital Mastery
              </span>
            </h1>

            <p className="text-xl md:text-2xl lg:text-3xl mb-12 text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
              A 21-day intensive digital skills accelerator designed to empower African youths with futuristic career paths and multiple income streams.
            </p>

            <div className="flex flex-wrap gap-6 justify-center items-center mb-12">
              <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl backdrop-blur-sm border border-white/10">
                <Clock className="w-6 h-6 text-yellow-300" />
                <span className="font-semibold text-lg">21 Days (3 Weeks)</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl backdrop-blur-sm border border-white/10">
                <Target className="w-6 h-6 text-yellow-300" />
                <span className="font-semibold text-lg">₦3,000 Only</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl backdrop-blur-sm border border-white/10">
                <Users className="w-6 h-6 text-yellow-300" />
                <span className="font-semibold text-lg">WhatsApp Based</span>
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
                  className="bg-white text-primary hover:bg-gray-100 font-bold text-xl px-10 py-8 rounded-2xl shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  Apply Now <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Courses Section */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 font-heading">
              Four High-Impact Courses
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              All four courses are combined into one comprehensive 21-day programme. Master these skills and earn three prestigious certifications.
            </p>

            {/* Value Proposition Callout */}
            <div className="mt-12 p-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-3xl max-w-5xl mx-auto backdrop-blur-sm">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                <span className="text-xl font-bold text-foreground tracking-wide">INCREDIBLE VALUE PACKAGE</span>
                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
              </div>
              <p className="text-center text-foreground/80 text-lg font-medium">
                <span className="text-primary font-bold text-2xl">₦3,000 ONLY</span> gets you access to ALL FOUR courses + THREE prestigious certifications + 21 days of intensive training.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {courses.map((course, index) => {
              const Icon = course.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 border-border/50 bg-card group hover:-translate-y-1">
                    <CardHeader className="pb-6">
                      <div className={`w-20 h-20 rounded-2xl ${course.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground font-heading group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-lg leading-relaxed">
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
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-heading">
              What You'll Get
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive resources to ensure your success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {resources.map((resource, index) => {
              const Icon = resource.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all text-center border border-border/50 group hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg">{resource.name}</h3>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-[3rem] p-10 md:p-20 text-white text-center overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative z-10"
            >
              <Award className="w-24 h-24 text-yellow-300 mx-auto mb-8 drop-shadow-lg" />
              <h2 className="text-4xl md:text-6xl font-bold mb-12 font-heading">Triple Certification</h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {certificates.map((cert, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors">
                    <CheckCircle2 className="w-12 h-12 text-emerald-300 mx-auto mb-6" />
                    <p className="font-medium text-lg leading-relaxed">{cert}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-heading text-foreground">Who Is This For?</h2>
          <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {targetAudience.map((audience, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="px-8 py-4 bg-card rounded-full shadow-sm text-foreground font-semibold text-lg border border-border/50 hover:shadow-md hover:border-primary/50 transition-all cursor-default"
              >
                {audience}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-foreground">Secure Your Spot Now</h2>
              <p className="text-xl text-muted-foreground">
                Join the next cohort and transform your digital career.
                <br />
                <span className="text-primary font-bold text-2xl mt-2 inline-block">Fee: ₦3,000 Only</span>
              </p>
            </div>
            <ApplicationForm />
          </div>
        </div>
      </section>

      {/* Referral Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <ReferralSection />
        </div>
      </section>

      <Footer />

      <WhatsAppIntegration
        phoneNumber="+2349025152818"
        defaultMessage="Hello, I would like to know more about the Akademyx Programme."
      />
    </div>
  )
}