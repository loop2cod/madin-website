import { Mail, Phone, Target, Eye, BookOpen, Award, Users, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { departments } from "../data/department.json"
import BlurIn from "@/components/ui/blur-in"

const DepartmentDetails = () => {
      const params = useParams()
      const id = params?.id as string
      const [department, setDepartment] = useState<any | null>(null)

        useEffect(() => {
          if (id) {
              const foundDepartment:any = departments?.find((p:any) => p.id === decodeURIComponent(id))
              window.scrollTo({ top: 0, behavior: "instant" })
              setDepartment(foundDepartment || null)
          }
        }, [id])

  return (
    <div className="md:mt-24">
    {/* Hero Section with Floating Elements */}
    <div className="relative overflow-hidden">
  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-teal-700 brightness-[0.8]" />
  <div className="absolute inset-0 bg-black/20" />

  {/* Hero Text */}
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div className="text-center space-y-8">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
        {department?.name}
      </h1>
    </div>
  </div>
</div>

{/* HOD Section */}
<div className="md:max-w-[90vw] mx-auto py-10 px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
  <Card className="border border-secondary/50 rounded-none shadow bg-gray-50 overflow-hidden gap-0 py-2 rounded-t-xl">
    <CardHeader className="p-2 md:p-6">
      <CardTitle className="text-xl md:text-2xl font-bold text-secondary">
        Head of Department
      </CardTitle>
    </CardHeader>

    <CardContent className="p-2">
      <div className="flex flex-col md:flex-row gap-4 md:items-start">
        {/* Profile Picture */}
        <div className="relative shrink-0">
          <Avatar className="relative w-28 h-28 md:w-32 md:h-32 border-2 border-white shadow-lg">
            <AvatarImage
              src={department?.profile_pic || "/placeholder.svg"}
              alt={department?.HOD}
              className="object-cover w-auto"
            />
            <AvatarFallback className="text-2xl md:text-4xl font-bold">
              {department?.HOD?.split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* HOD Info */}
        <div className="space-y-4 flex-1 w-full">
          <h3 className="text-lg md:text-xl font-bold text-secondary">
            {department?.HOD}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 w-full">
            {/* Contact */}
            <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm shadow-sm">
              <div className="p-3 bg-secondary">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Contact</p>
                <p className="text-sm font-semibold text-gray-900">
                  {department?.contact}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm shadow-sm">
              <div className="p-3 bg-secondary">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Email</p>
                <p className="text-sm font-semibold text-gray-900">
                  {department?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</div>


    {/* Main Content */}
    <div className="md:max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 md:py-14 space-y-10">
      {/* Department Image & Overview */}
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative group">
          <div className="relative overflow-hidden">
            <img
              src={department?.image || "/collage.jpg"}
              alt="Automobile Engineering Department"
              className="w-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        </div>

        <Card className="border-0 rounded-none bg-secondary h-full gap-2 py-4 md:gap-4 md:py-6">
          <CardHeader className="pb-2 md:pb-6">
            <div className="flex items-center gap-4">
              <div className="p-2 md:p-4 bg-primary-foreground">
                <BookOpen className="h-4 w-4 md:h-8 md:w-8" />
              </div>
              <CardTitle className="text-lg md:text-xl lg:text-3xl font-serif font-bold text-primary-foreground">About Our Department</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-3 md:p-6">
            {department?.overview.map((overview:any, index:any) => (
              <p key={index} className="text-xs md:text-sm text-justify leading-relaxed text-primary-foreground">{overview}</p>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Vision & Mission - Creative Layout */}
      <div className="grid lg:grid-cols-3 gap-8 mb-4">
  {/* Vision Card */}
  <div className="lg:col-span-2">
    <Card className="relative shadow-sm  overflow-hidden h-full rounded-none border ssborder-secondary gap-2 py-2 md:gap-0 md:py-0">
      <div className="absolute top-0 right-0 w-60 h-60  blur-3xl pointer-events-none" />
      <CardHeader className="p-2 md:p-6  relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-secondary backdrop-blur-sm">
            <Eye className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-xl font-serif font-bold">Our Vision</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="relative z-10 p-2 md:p-6">
        <blockquote className="text-sm md:text-lg leading-relaxed italic font-light">
          “{department?.vision}”
        </blockquote>
      </CardContent>
    </Card>
  </div>

  {/* Mission Card */}
  <Card className="relative border-0 shadow-sm bg-secondary text-white overflow-hidden h-full rounded-none gap-2 py-2 md:gap-0 md:py-0">
    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
    <CardHeader className="p-2 md:p-6  relative z-10">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-white/20 backdrop-blur-sm">
          <Target className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-xl font-serif font-bold">Mission</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="relative space-y-4 z-10 p-2 md:p-6">
      {department?.mission?.map((item: any, index: number) => (
        <div key={index} className="flex items-start gap-3">
          <span className="mt-2 w-2.5 h-2.5 bg-white rounded-full flex-shrink-0" />
          <p className="text-xs sm:text-sm leading-relaxed">{item}</p>
        </div>
      ))}
    </CardContent>
  </Card>
</div>


      {/* Academic Outcomes - Tabbed Layout */}
      <div className="space-y-4 md:space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold">
            <BlurIn
              word="Academic Excellence"
              className="inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text pr-5 font-serif"
            />
          </h2>
          <p className="text-base md:text-xl text-gray-600">
            Our comprehensive curriculum ensures students achieve industry-ready skills and knowledge
          </p>
        </div>

        {/* PEOs */}
        <Card className="border-2 rounded-none border-secondary overflow-hidden !p-2 gap-0">
          <CardHeader className="p-0">
            <div className="flex items-center gap-4">
              <div className="p-2 md:p-4 bg-white/20 backdrop-blur-sm">
                <Award className="h-8 w-8 text-secondary" />
              </div>
              <CardTitle className="text-base md:text-xl font-serif font-bold text-secondary">Program Educational Objectives</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-1 md:p-4">
            <div className="grid gap-2 md:gap-4">
              {department?.peos.map((peo:any, index:any) => (
                <div key={index} className="group transition-transform">
                  <div className="flex gap-1.5 md:gap-6 p-2 bg-white shadow-lg border border-teal-600 group-hover:shadow-sm transition-shadow">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 bg-gradient-to-br from-secondary/90 to-teal-600/90 text-white  flex items-center justify-center font-bold text-lg">
                        {index + 1}
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-xs md:text-sm">{peo}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* PSOs & POs in Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-4">
          <Card className="border-2 rounded-none border-secondary gap-0 py-0 ">
            <CardHeader className="bg-secondary p-2">
              <div className="flex py-2 items-center gap-3">
                <div className="p-3 bg-white/20 backdrop-blur-sm">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-base md:text-xl font-serif font-bold text-white">Program Specific Outcomes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-2 md:p-4">
              <div className="space-y-2">
                {department?.psos.map((pso:any, index:any) => (
                  <div key={index} className="flex gap-1.5 md:gap-4 p-2 md:p-3 bg-white shadow-md border">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 border border-secondary text-secondary flex items-center justify-center font-bold mt-1.5">
                        {index + 1}
                      </div>
                    </div>
                    <p className="text-gray-700 text-xs md:text-sm text-justify">{pso}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 rounded-none border border-secondary gap-0 py-0">
            <CardHeader className="text-white bg-primary/5 border-b border-secondary p-2 ">
              <div className="flex items-center">
                <div className="p-3 bg-white/20 backdrop-blur-sm">
                  <Lightbulb className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-base md:text-xl font-serif font-bold text-secondary">Program Outcomes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-2 md:p-6 max-h-68 overflow-y-auto">
              <div className="space-y-2">
                {department?.pos?.map((po:any, index:any) => (
                  <div key={index} className="flex gap-3 p-2 md:p-3 bg-secondary">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-7 h-7 bg-white text-secondary flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <p className="text-white leading-relaxed text-xs md:text-sm">{po}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
  )
}

export default DepartmentDetails