import type React from "react"
import { useEffect, useState } from "react"
import {
  GraduationCap,
  Building,
  BookOpen,
  FlaskConical,
  Award,
  TrendingUp,
  ArrowRight,
  Shield,
} from "lucide-react"
import { useParams } from "react-router-dom"
import { diploma_programs } from "../data/program.json"
import BlurIn from "@/components/ui/blur-in"




const ProgramDetails: React.FC = () => {
  const params = useParams()
  const id = params?.id as string
  const [program, setProgram] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (id) {
        const foundProgram:any = diploma_programs.find((p: any) => p.id === decodeURIComponent(id))
        window.scrollTo({ top: 0, behavior: "instant" })
        setProgram(foundProgram || null)
        setIsLoading(false)
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
            <div className="lg:col-span-2 space-y-6 bg-secondary">
              <div className="p-8 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-white flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-gray-900" />
                  </div>
                  <span className="text-sm font-medium uppercase tracking-wider">{program.department}</span>
                </div>
                <h1 className="md:text-4xl text-lg font-bold mb-4 leading-tight font-serif">{program.program_name}</h1>
                <p className="text-lg text-gray-300 leading-relaxed text-justify">{program.program_overview}</p>
              </div>
            </div>

            {/* Quick Stats Box */}
            <div className="space-y-2">
              <div className="bg-white border-2 border-secondary p-4">
                <h3 className="text-lg font-bold mb-2 uppercase tracking-wider font-serif">
                <BlurIn
                    word="Program Details"
                    className="inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text pr-5 font-serif"
                  /></h3>
                <div className="space-y-2">
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
                    word="Affiliated to"
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
      <div className="mx-auto mx-4 py-8">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Main Content - 3 columns */}
    <div className="lg:col-span-2 space-y-6">
      {/* Core Subjects */}
      <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-secondary px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-secondary-foreground p-3 rounded-lg mr-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-serif">Core Subjects</h2>
              <p className="text-gray-300 text-sm">Foundation knowledge areas</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {program.curriculum_highlights.core_subjects.map((subject:any, index:any) => (
              <div key={index} className="bg-gray-50 p-4 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="flex items-start">
                  <div className="bg-gray-200 w-1.5 h-1.5 rounded-full mt-1.5 mr-2"></div>
                  <span className="text-gray-800 font-medium text-sm">{subject}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Laboratory Training */}
      {program.curriculum_highlights?.laboratory_practical_training && (
        <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-secondary px-6 py-4 border-b border-secondary">
            <div className="flex items-center">
              <div className="bg-secondary-foreground p-3 rounded-lg mr-4">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white font-serif">Practical Training</h2>
                <p className="text-blue-100 text-sm">Hands-on experience</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {program.curriculum_highlights.laboratory_practical_training.map((training:any, index:any) => (
                <div key={index} className="bg-blue-50 p-4 rounded-md border border-blue-100 hover:bg-blue-100 transition-colors">
                  <div className="flex items-start">
                    <div className="bg-blue-400 w-1.5 h-1.5 rounded-full mt-1.5 mr-2"></div>
                    <span className="text-gray-800 font-medium text-sm">{training}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>

    {/* Sidebar - 1 column */}
    <div className="space-y-6">
      {/* License Eligibility */}
      {program?.License_Certification_Opportunities && (
        <div className="bg-white border border-secondary shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-muted">
            <div className="flex items-center">
              <div className="bg-secondary p-3 rounded-lg mr-4">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-secondary font-serif">License & Certification Opportunities</h3>
              </div>
            </div>
          </div>

          {program?.sp && (
            <div className="px-2 pt-4">
              <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-md">{program.sp}</p>
            </div>
          )}

          <div className="p-3 space-y-4">
            {Array.isArray(program.License_Certification_Opportunities)
              ? program.License_Certification_Opportunities.map((license:any, index:any) => (
                  <div key={index} className="bg-secondary/5 p-4 rounded-md border border-secondary hover:bg-primary/5 transition-colors">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-gray-800 font-medium text-sm">{license}</span>
                    </div>
                  </div>
                ))
              : Object.entries(program.License_Certification_Opportunities).map(([key, value]:any, index) => (
                  <div key={index} className="bg-muted p-2 rounded-md border border-purple-100 hover:bg-gray-100 transition-colors">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 text-secondary mr-2 flex-shrink-0" />
                        <span className="text-gray-800 font-semibold text-sm">{key}</span>
                      </div>
                      <div className="pl-6 space-y-2">
                        <div className="bg-white p-2 rounded">
                          <p className="text-gray-700 text-xs">
                            <span className="font-semibold">Eligibility:</span> {value.eligibility}
                          </p>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <p className="text-gray-700 text-xs">
                            <span className="font-semibold">Scope:</span> {value.scope}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      )}

      {/* Higher Education */}
      {program.higher_education_pathways && (
        <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-secondary px-6 py-4 border-b border-secondary">
            <div className="flex items-center">
              <div className="bg-secondary-foreground p-3 rounded-lg mr-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Higher Education</h3>
                <p className="text-secondary-foreground text-sm">Advanced study options</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {program.higher_education_pathways.map((pathway:any, index:any) => (
              <div key={index} className="bg-muted p-4  border transition-colors">
                <div className="flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 flex-shrink-0" />
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
<div className="mx-auto mb-6">
            <div className="mb-6">
              <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                <BlurIn
                    word="Career Opportunities"
                    className="inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text pr-5 font-serif"
                  />
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Discover exciting opportunities to grow and succeed in your professional journey
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {program.career_opportunities.map((opportunity:any, index:any) => (
                  <div 
                  key={index}
                  className="relative group bg-white border overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-md"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-teal-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  <div className="p-4 relative z-10">
                    <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 text-secondary mr-2" />
                      <h3 className="text-sm font-semibold text-gray-800">{opportunity}</h3>
                    </div>
                  </div>
                </div>
              ))}
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
                <div className="text-3xl font-bold mb-2">14+</div>
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
