"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {
  GraduationCap,
  Clock,
  Building,
  Users,
  BookOpen,
  FlaskConical,
  Briefcase,
  Award,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Globe,
  Download,
  ArrowRight,
  Target,
  Shield,
} from "lucide-react"
import { useParams } from "react-router-dom"
import { diploma_programs } from "../data/program.json"
import BlurIn from "@/components/ui/blur-in"

interface ProgramDetailsProps {
  id: string
  program_name: string
  duration: string
  affiliation: string
  approval: string
  intake: number
  mode: string
  program_overview: string
  curriculum_highlights: {
    core_subjects: string[]
    laboratory_practical_training: string[]
    laboratories_and_workshops?: string[]
    studio_practical_training?: string[]
  }
  career_opportunities: string[]
  license_eligibility?: string[]
  higher_education_pathways?: string[]
  license_certification_opportunities?: string[]
  department?: string
}



const ProgramDetails: React.FC = () => {
  const params = useParams()
  const id = params?.id as string
  const [program, setProgram] = useState<ProgramDetailsProps | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (id) {
      setTimeout(() => {
        const foundProgram:any = diploma_programs.find((p: any) => p.id === decodeURIComponent(id))
        setProgram(foundProgram || null)
        setIsLoading(false)
      }, 500)
    }
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-12 shadow-2xl border border-gray-200">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent animate-spin mx-auto"></div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Loading Program Details</h3>
              <p className="text-gray-600">Please wait while we fetch the information...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-12 shadow-2xl border border-gray-200 text-center">
          <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Program Not Found</h2>
          <p className="text-gray-600">The requested program could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="md:max-w-[90vw] mx-auto py-10 px-4 sm:px-6 lg:px-8 mt-20">
      {/* Hero Section - Boxy Design */}
      <div className="bg-white">
        <div className="mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info Box */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-secondary p-8 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-white flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-gray-900" />
                  </div>
                  <span className="text-sm font-medium uppercase tracking-wider">{program.department}</span>
                </div>
                <h1 className="md:text-4xl text-lg font-bold mb-4 leading-tight font-serif">{program.program_name}</h1>
                <p className="text-lg text-gray-300 leading-relaxed">{program.program_overview}</p>
              </div>
            </div>

            {/* Quick Stats Box */}
            <div className="space-y-4">
              <div className="bg-white border-2 border-secondary p-6">
                <h3 className="text-lg font-bold mb-4 uppercase tracking-wider font-serif">
                <BlurIn
                    word="Program Details"
                    className="inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text pr-5 font-serif"
                  /></h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-secondary font-medium font-serif">Duration</span>
                    <span className="text-gray-900 text-sm">{program.duration}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-secondary font-medium font-serif">Mode</span>
                    <span className="text-gray-900 text-sm">{program.mode}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-secondary font-medium font-serif">Intake</span>
                    <span className="text-gray-900 text-sm">{program.intake}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-secondary font-medium font-serif">Approval</span>
                    <span className="text-gray-900 text-sm">{program.approval}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-2 border-secondary">
                <h4 className="font-bold mb-3">
                <BlurIn
                    word="Affiliation"
                    className="inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text pr-5 font-serif"
                  /></h4>
                <div className="flex items-center space-x-2">
                  <Building className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-800 font-medium">{program.affiliation}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Curriculum */}
          <div className="lg:col-span-2 space-y-8">
            {/* Core Subjects Box */}
            <div className="bg-white border border-gray-300 shadow-lg">
              <div className="bg-gray-900 p-6 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-gray-900" />
                  </div>
                  <h2 className="text-xl font-bold uppercase tracking-wider">Core Subjects</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {program.curriculum_highlights.core_subjects.map((subject, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gray-900"></div>
                        <span className="text-gray-800 font-medium">{subject}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Laboratory Training Box */}
            <div className="bg-white border border-gray-300 shadow-lg">
              <div className="bg-blue-600 p-6 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white flex items-center justify-center">
                    <FlaskConical className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold uppercase tracking-wider">Laboratory Training</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {program.curriculum_highlights?.laboratory_practical_training?.map((training, index) => (
                    <div
                      key={index}
                      className="bg-blue-50 p-4 border border-blue-200 hover:bg-blue-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600"></div>
                        <span className="text-gray-800 font-medium">{training}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Career Opportunities Box */}
            <div className="bg-white border border-gray-300 shadow-lg">
              <div className="bg-green-600 p-6 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold uppercase tracking-wider">Career Opportunities</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {program.career_opportunities.map((opportunity, index) => (
                    <div
                      key={index}
                      className="bg-green-50 p-4 border border-green-200 hover:bg-green-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-gray-800 font-medium">{opportunity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-8">
            {/* License Eligibility Box */}
            {program.license_eligibility && (
              <div className="bg-white border border-gray-300 shadow-lg">
                <div className="bg-purple-600 p-6 text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white flex items-center justify-center">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold uppercase tracking-wider">Certifications</h3>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  {program.license_eligibility.map((license, index) => (
                    <div key={index} className="bg-purple-50 p-3 border border-purple-200">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-purple-600" />
                        <span className="text-gray-800 font-medium text-sm">{license}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Higher Education Box */}
            {program.higher_education_pathways && (
              <div className="bg-white border border-gray-300 shadow-lg">
                <div className="bg-orange-600 p-6 text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-bold uppercase tracking-wider">Higher Education</h3>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  {program.higher_education_pathways.map((pathway, index) => (
                    <div key={index} className="bg-orange-50 p-3 border border-orange-200">
                      <div className="flex items-center space-x-2">
                        <ArrowRight className="w-4 h-4 text-orange-600" />
                        <span className="text-gray-800 font-medium text-sm">{pathway}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer CTA Section */}
      <div className="bg-secondary-foreground">
        <div className="mx-auto px-6 md:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Future?</h2>
              <p className="text-lg  mb-6">
                Join thousands of successful graduates who have built remarkable careers through our
                programs.
              </p>
              <div className="flex space-x-4">
                <button className="bg-secondary text-white hover:text-secondary px-8 py-3 font-bold hover:bg-gray-100 transition-colors cursor-pointer">
                  START APPLICATION
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-secondary/10 p-6 text-center">
                <div className="text-3xl font-bold mb-2">15+</div>
                <div className="text-sm uppercase tracking-wider">Years Excellence</div>
              </div>
              <div className="bg-secondary/10 p-6 text-center">
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-sm uppercase tracking-wider">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgramDetails
