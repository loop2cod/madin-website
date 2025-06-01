import { BookOpen, Monitor, Wrench, FlaskConical, Users, Wifi, Shield, Lightbulb } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect } from "react"
import BlurIn from "@/components/ui/blur-in"
import { Badge } from "@/components/ui/badge"

const Facilities = () => {
      useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" })
      }, [])

      const facilities = [
        {
          title: "Classrooms",
          description:
            "Spacious, well-ventilated and digitally equipped classrooms offering a conducive learning environment.",
          icon: Monitor,
          features: [
            "Smart boards and projectors",
            "Audio-visual aids",
            "Ergonomic seating design",
            "Optimal visibility for all students",
            "Climate controlled environment",
          ],
          image: "/collage.jpg",
        },
        {
          title: "Library and Information Centre",
          description:
            "The college Library has the distinction of being the fully automated College Library in the state of Kerala. Our mission is to facilitate creation of new knowledge through acquisition, organisation and dissemination of knowledge resources.",
          icon: BookOpen,
          features: [
            "Fully automated with RFID technology",
            "9,389 total books across all disciplines",
            "Digital library with 2,711 e-books",
            "DELNET membership for online databases",
            "Self-service kiosk for circulation",
            "Air-conditioned with Wi-Fi connectivity",
          ],
          image: "/collage.jpg",
          detailed: true,
        },
        {
          title: "Workshops",
          description: "State-of-the-art workshops offer hands-on training in all engineering domains with modern tools.",
          icon: Wrench,
          features: [
            "Modern tools and equipment",
            "Safety equipment provided",
            "Fabrication and machining",
            "Industry-standard practices",
            "Expert supervision",
          ],
          image: "/collage.jpg",
        },
        {
          title: "Modern Laboratories",
          description: "Each department boasts modern laboratories with advanced instruments for practical learning.",
          icon: FlaskConical,
          features: [
            "Advanced instruments",
            "Real-time application",
            "Safety protocols",
            "CAD facilities",
            "Research support",
          ],
          image: "/collage.jpg",
        },
      ]
    
      const highlights = [
        {
          icon: Users,
          title: "Student-Centered Design",
          description: "All facilities are designed with student comfort and learning efficiency in mind",
        },
        {
          icon: Shield,
          title: "Safety First",
          description: "Comprehensive safety protocols and equipment ensure secure learning environments",
        },
        {
          icon: Wifi,
          title: "Digital Integration",
          description: "Modern technology integration enhances teaching methodologies and learning outcomes",
        },
        {
          icon: Lightbulb,
          title: "Innovation Hub",
          description: "Facilities that bridge the gap between theoretical knowledge and practical application",
        },
      ]
    

  return (
    <div className="min-h-screen mt-10 md:mt-20">
    {/* Hero Section */}
<div className="md:max-w-[90vw] mx-auto px-2 py-5">
<section className="md:py-20">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 ">
           <BlurIn word="World-Class Facilities" className="text-start inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text font-serif" />
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Experience excellence in education with our state-of-the-art facilities designed to foster learning,
            innovation, and practical skill development.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="md:px-4">
        <div className="">
          <div className="grid gap-8 md:gap-12">
            {facilities.map((facility, index) => (
              <Card
                key={facility.title}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-none gap-2 py-0"
              >
                <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? "md:grid-flow-col-dense" : ""}`}>
                  <div className={`relative h-52 md:h-auto ${index % 2 === 1 ? "md:col-start-2" : ""}`}>
                    <img
                      src={facility.image || "/placeholder.svg"}
                      alt={facility.title}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3 md:p-5 flex flex-col justify-center">
                    <CardHeader className="p-0 mb-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-secondary rounded-none">
                          <facility.icon className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-900">{facility.title}</CardTitle>
                      </div>
                      <CardDescription className="text-gray-600 text-sm md:text-base text-justify">
                        {facility.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-4 px-0">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2 text-xs md:text-sm">
                        {facility.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-gray-600">
                            <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
</div>
<div className="md:py-10 py-8 px-0 bg-gray-50 mb-5 md:mb-10">
        <div className="md:max-w-[90vw] mx-auto py-5 px-2">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">
            <BlurIn word="Library and Information Centre" className="text-start inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text font-serif" />
            </h2>
            <p className="text-gray-600 max-w-3xl">
              Experience Kerala's first fully automated college library, equipped with cutting-edge RFID technology and
              comprehensive digital resources to support your academic journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-8">
            {/* Book Collection Statistics */}
            <Card className="p-3 md:p-6 rounded-none border border-secondary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-secondary" />
                  Book Collection (Branch-wise)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2">
                  {[
                    { branch: "Civil Engineering", count: 810 },
                    { branch: "Mechanical Engineering", count: 820 },
                    { branch: "Electrical Electronics Engineering", count: 1087 },
                    { branch: "Computer Engineering", count: 710 },
                    { branch: "Auto Mobile Engineering", count: 339 },
                    { branch: "Architecture", count: 187 },
                    { branch: "Management", count: 364 },
                    { branch: "Reference Books", count: 394 },
                    { branch: "General Books", count: 1967 },
                    { branch: "E-books", count: 2711 },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="text-gray-700">{item.branch}</span>
                      <Badge variant="secondary">{item.count}</Badge>
                    </div>
                  ))}
                  <div className="flex justify-between items-center py-3 border-t-2 border-secondary font-semibold text-lg">
                    <span className="text-gray-900">Total Books</span>
                    <Badge className="bg-secondary text-white text-lg px-3 py-1">9,389</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Special Collections & Services */}
            <div className="md:space-y-6 space-y-4">
              <Card className="p-3 md:p-6 rounded-none border border-secondary">
                <CardHeader>
                  <CardTitle className="text-lg">Special Collections</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-none">
                      <div className="text-2xl font-bold text-blue-600">1,442</div>
                      <div className="text-sm text-gray-600">Bound Question Papers</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-none">
                      <div className="text-2xl font-bold text-green-600">73</div>
                      <div className="text-sm text-gray-600">Bound Periodicals</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-none">
                      <div className="text-2xl font-bold text-purple-600">1,495</div>
                      <div className="text-sm text-gray-600">Seminar Reports</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-none">
                      <div className="text-2xl font-bold text-orange-600">718</div>
                      <div className="text-sm text-gray-600">CDs & DVDs</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-3 md:p-6 rounded-none border border-secondary">
                <CardHeader>
                  <CardTitle className="text-lg">Library Hours</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Monday to Friday</span>
                      <span className="font-semibold">8:45 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Saturday</span>
                      <span className="font-semibold">9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Sunday & Holidays</span>
                      <span className="text-red-600 font-semibold">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Services Grid */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold  mb-8"><BlurIn word="Services Provided" className="inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text font-serif" /></h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Reference Service",
                "Book Lending Service",
                "E-mail Alert",
                "Digital Library Services",
                "Reprographic Services",
                "User Education",
                "OPAC System",
                "New Arrival Display",
                "Reading Facility",
                "Internet Facility",
                "Wi-Fi Connectivity",
                "Workshops & Events",
              ].map((service, index) => (
                <div key={index} className="p-4 rounded-none shadow-sm bg-secondary text-white  text-center text-xs md:text-sm">
                  <span className="font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RFID Technology */}
          <Card className="mb-8 rounded-none gap-0 md:gap-4 py-2 md:py-4">
            <CardHeader className="p-3 md:p-6">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-secondary" />
                RFID Implementation
              </CardTitle>
              <CardDescription className="text-justify">
                Advanced Radio Frequency Identification system for enhanced library automation
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 md:p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {[
                      "Self-check-out and check-in of books",
                      "Theft control and security monitoring",
                      "Automated inventory management",
                      "Smart card issuance system",
                      "Video surveillance integration",
                      "Real-time stock verification",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Circulation System:</h4>
                  <div className="bg-blue-50 p-4 rounded-none">
                    <p className="text-gray-700 mb-3">
                      Automated Self Service Kiosk operational from 8:40 AM to 5:00 PM enables users to issue, return,
                      and renew books independently.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Students:</strong> 3 Books for 15 Days
                      </div>
                      <div>
                        <strong>Teaching Staff:</strong> 5 Books for 30 Days
                      </div>
                      <div>
                        <strong>Non-teaching Staff:</strong> 5 Books for 30 Days
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Digital Library & Staff */}
          <div className="grid lg:grid-cols-2">
            <Card className="rounded-none gap-0 md:gap-4 py-2 md:py-4">
              <CardHeader className="p-3 md:px-6">
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-secondary" />
                  Digital Library
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 md:px-6">
                <p className="text-gray-600 text-justify text-xs md:text-sm mb-4">
                  Our digital library features 5 touch-enabled all-in-one PCs providing access to electronic resources,
                  e-journals, and online databases through DELNET membership.
                </p>
                <div className="bg-green-50 p-4 rounded-none">
                  <h4 className="font-semibold text-green-800 mb-2">DELNET Access</h4>
                  <p className="text-green-700 text-sm">
                    Members can access all online databases with assigned credentials available from the librarian.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-none gap-0  py-2 md:py-4">
              <CardHeader className="p-3 md:px-6">
                <CardTitle>Library Staff</CardTitle>
              </CardHeader>
              <CardContent className="p-3 md:px-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h4 className="font-semibold text-gray-900">Muhammed Basheer P</h4>
                    <p className="text-gray-600 text-sm">Chief Librarian</p>
                    <p className="text-blue-600 text-sm">library@madin.edu.in</p>
                    <p className="text-gray-600 text-sm">📞 9447260863</p>
                  </div>
                  <div className="border-l-4 border-green-600 pl-4">
                    <h4 className="font-semibold text-gray-900">Nidhin V K</h4>
                    <p className="text-gray-600 text-sm">Library Attender</p>
                    <p className="text-green-600 text-sm">nidhinvk@gmail.com</p>
                    <p className="text-gray-600 text-sm">📞 9562003415</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <section className="bg-white py-10">
        <div className="md:max-w-[90vw] mx-auto px-2">
          <div className="mb-4">
            <h2 className="text-3xl font-bold mb-4"><BlurIn word="Why Our Facilities Stand Out" className="text-start inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text font-serif" /></h2>
            <p className="text-gray-600 max-w-2xl text-justify text-sm md:text-base">
              Our commitment to excellence is reflected in every aspect of our infrastructure, creating an environment
              that nurtures growth and innovation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center px-2 md:px-6 hover:shadow-lg transition-shadow duration-300 rounded-none border border-secondary">
                <CardContent className="p-0">
                  <div className="p-4 bg-secondary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <highlight.icon className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                  <p className="text-gray-600 text-sm">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
  </div>
  )
}

export default Facilities