import { ArrowRight, BookOpen, Building, GraduationCap, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import BlurIn from "@/components/ui/blur-in"
import { useEffect } from "react"

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])
  
  return (
    <div className="mx-auto">
      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <img
              src="/graduation.jpg"
              alt="Campus View"
              className="object-cover brightness-[0.4] h-9/10 w-full"
            />
          </div>
          <div className="container relative z-10 py-24 md:py-36 lg:py-48 px-4 md:px-8">
            <div className="max-w-3xl space-y-4 text-white">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-serif">
                Empowering Through Technical Excellence
              </h1>
              <p className="text-lg md:text-xl">
                Established in 2011, Madin College of Engineering and Management provides quality technical education to
                empower students with practical skills and industry-relevant knowledge.
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="md:max-w-[90vw] mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6 font-serif">
                  <BlurIn
                    word="About"
                    className="inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text pr-5 font-serif"
                  /></h2>
                <p className="text-lg text-muted-foreground mb-6 text-justify">
                  Madin College of Engineering and Management is a prominent technical institution located in Melmuri,
                  Malappuram, Kerala. Established in 2011 under the Madin Academy, the college is affiliated with the
                  Directorate of Technical Education (DTE), Kerala, and approved by the All India Council for Technical
                  Education (AICTE).
                </p>
                <p className="text-lg text-muted-foreground mb-6  text-justify">
                  The college maintains high academic standards and a student-focused approach, integrating education
                  with moral and ethical teachings in line with the Madin Academy's broader educational vision.
                </p>
              </div>
              <div className="relative aspect-video overflow-hidden pr-5 border-r rounded-bl-2xl">
                <img
                  src="/poly.jpg"
                  alt="College Building"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

      <div className="bg-primary/5">
      <section id="programs" className="md:max-w-[90vw] mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="container">
            <div className="mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                <BlurIn
                  word="Academic Programs"
                  className="inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text pr-5 font-serif"
                />
              </h2>
              <p className="text-lg text-muted-foreground">
                Our institution offers a range of diploma programs and a postgraduate MBA program, all designed to
                prepare students for successful careers.
              </p>
            </div>

            <Tabs defaultValue="diploma" className="mx-auto">
              <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-secondary/10 to-secondary/10">
                <TabsTrigger value="diploma">Diploma Programs</TabsTrigger>
                <TabsTrigger value="postgraduate">Postgraduate Program</TabsTrigger>
              </TabsList>
              <TabsContent value="diploma" className="mt-6">
                <h3 className="text-2xl font-bold tracking-tight mb-4">
                  <BlurIn
                    word="Regular Programs"
                    className="inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text pr-5 font-serif"
                  />
                </h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Civil Engineering",
                      icon: Building,
                      description: "Learn structural design, construction management, and infrastructure development.",
                      link: "/program/Civil-Engineering",
                    },
                    {
                      title: "Mechanical Engineering",
                      icon: GraduationCap,
                      description: "Study mechanics, thermodynamics, materials science, and manufacturing processes.",
                      link: "/program/Mechanical-Engineering",
                    },
                    {
                      title: "Electrical and Electronics Engineering",
                      icon: GraduationCap,
                      description: "Focus on electrical systems, electronics, power generation, and distribution.",
                      link: "/program/Electrical-and-Electronics-Engineering",
                    },
                    {
                      title: "Computer Engineering",
                      icon: GraduationCap,
                      description: "Study computer hardware, software development, and information technology.",
                      link: "/program/Computer-Engineering",
                    },
                    {
                      title: "Automobile Engineering",
                      icon: GraduationCap,
                      description: "Learn about vehicle design, manufacturing, and maintenance technologies.",
                      link: "/program/Automobile-Engineering",
                    },
                    {
                      title: "Architecture",
                      icon: Building,
                      description: "Approved by the Council of Architecture (CoA) with focus on design principles.",
                      link: "/program/Architecture",
                    },
                  ].map((program, index) => (
                    <Card key={index} className="overflow-hidden transition-all hover:shadow-md rounded-none border-secondary/50">
                      <CardHeader className="">
                        <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <program.icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-secondary font-sans">{program.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{program.description}</CardDescription>
                        <Link to={program.link} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-secondary">
                          Program details <ArrowRight className="h-3 w-3" />
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <h3 className="text-2xl font-bold tracking-tight my-4">
                  <BlurIn
                    word="Part-time Program"
                    className="inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text pr-5 font-serif"
                  />
                </h3>
                <Card className="mt-6 rounded-none border-secondary/50">
                  <CardHeader>
                    <div className="mb-2 inline-flex h-10 w-10 items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-secondary font-sans">Electrical and Electronics Engineering (Part-time)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      Our part-time EEE program is designed for working professionals and students who want to gain
                      expertise in electrical and electronics engineering while continuing their career.
                    </p>
                    <Link to="/program/Electrical-and-Electronics-Engineering-Part-time" className="inline-flex items-center gap-1 text-sm font-medium text-secondary">
                    Program details <ArrowRight className="h-3 w-3" />
                    </Link>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="postgraduate" className="mt-6">
                <Card className="rounded-none border-secondary/50">
                  <CardHeader>
                    <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Master of Business Administration (MBA)</CardTitle>
                    <CardDescription>
                      A 2-year full-time program affiliated with the University of Calicut and approved by AICTE
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      Our MBA program is designed to develop future business leaders with a comprehensive understanding
                      of management principles, strategic thinking, and ethical business practices.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Marketing</Badge>
                      <Badge variant="outline">Finance</Badge>
                      <Badge variant="outline">Human Resource Management</Badge>
                      <Badge variant="outline">Operations, Logistics and Supply Chain Management</Badge>
                      <Badge variant="outline">Business Analytics</Badge>
                    </div>
                    <Link to="/program/Master-of-Business-Administration" className="inline-flex items-center gap-1 text-sm font-medium text-secondary">
                    Program details <ArrowRight className="h-3 w-3" />
                    </Link>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>

        <section id="campus">
          <div className="md:max-w-[90vw] mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                <BlurIn
                  word="Campus and Facilities"
                  className="inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text pr-5 font-serif"
                />
              </h2>
              <p className="text-lg text-muted-foreground">
                Madin College boasts a modern campus with well-equipped laboratories, computer centers, workshops, and a
                library, emphasizing a balance between theoretical learning and practical application.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Modern Laboratories",
                  image: "/placeholder.svg?height=400&width=600",
                  description: "State-of-the-art labs for hands-on learning and experimentation.",
                },
                {
                  title: "Computer Centers",
                  image: "/placeholder.svg?height=400&width=600",
                  description: "Advanced computing facilities with the latest software and hardware.",
                },
                {
                  title: "Workshops",
                  image: "/placeholder.svg?height=400&width=600",
                  description: "Specialized workshops for practical training and skill development.",
                },
                {
                  title: "Library",
                  image: "/library1.jpg",
                  description: "Extensive collection of books, journals, and digital resources.",
                },
                {
                  title: "Classrooms",
                  image: "/placeholder.svg?height=400&width=600",
                  description: "Modern classrooms equipped with audio-visual teaching aids.",
                },
                {
                  title: "Recreation Areas",
                  image: "/placeholder.svg?height=400&width=600",
                  description: "Sports facilities and recreation spaces for holistic development.",
                },
              ].map((facility, index) => (
                <div key={index} className="group relative overflow-hidden rounded-lg">
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <img
                      src={facility.image || "/placeholder.svg"}
                      alt={facility.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end text-white">
                    <h3 className="text-xl font-semibold mb-1 font-serif">{facility.title}</h3>
                    <p className="text-sm text-white/80">{facility.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="vision" className="md:max-w-[90vw] mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold tracking-tight font-serif">
                      <BlurIn
                        word="Vision"
                        className="inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text pr-5 font-serif"
                      /></h3>
                    <p className="text-lg text-justify">
                      To be a centre of excellence in engineering education for providing valuable resources to industry
                      and society with creative mind and practical skills.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold tracking-tight font-serif">
                      <BlurIn
                        word="Mission"
                        className="inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text pr-5 font-serif"
                      /></h3>
                    <ol className="space-y-4 text-lg text-justify">
                      <li className="flex gap-4 items-start">
                        <span className="mt-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-secondary">
                          1
                        </span>
                        <span>
                          To maintain an effective learning environment with conducive infrastructure for high quality
                          education.
                        </span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="mt-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-secondary">
                          2
                        </span>
                        <span>
                          To create technical professionals with entrepreneurial competency, ethical values and social
                          commitment.
                        </span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 relative rounded-t-xl overflow-hidden">
                <img
                  src="/poly.jpg"
                  alt="Students in campus"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50">
          <div className="md:max-w-[90vw] mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                <BlurIn
                  word="Community and Values"
                  className="inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text pr-5 font-serif"
                />
              </h2>
              <p className="text-lg opacity-90 text-justify">
                The college promotes values of discipline, respect, and inclusivity, integrating education with moral
                and ethical teachings in line with the Madin Academy's broader educational vision.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="bg-primary-foreground rounded-none">
                <CardHeader>
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="font-serif">Discipline</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    We foster a culture of discipline and responsibility, preparing students to excel in their
                    professional lives with dedication and commitment.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-primary-foreground rounded-none">
                <CardHeader>
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="font-serif">Respect</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Our community values mutual respect, creating an environment where diverse perspectives are
                    appreciated and everyone feels valued.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-primary-foreground rounded-none">
                <CardHeader>
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="font-serif">Inclusivity</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    We embrace diversity and promote an inclusive learning environment that prepares students to thrive
                    in a global society.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default About