import { BookOpen, GraduationCap, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import BlurIn from '@/components/ui/blur-in'

const Syllabus = () => {
     const syllabusItems = [
            {
              title: "Diploma - Revision 2021",
              category: "Diploma",
              year: "2021",
              icon: <GraduationCap className="w-4 h-4" />,
              link:"https://sitttrkerala.ac.in/index.php?r=site%2Fdiploma-syllabus&scheme=REV2021"
            },
            {
              title: "Diploma - Revision 2015",
              category: "Diploma",
              year: "2015",
              icon: <GraduationCap className="w-4 h-4" />,
              link:"https://sitttrkerala.ac.in/index.php?r=site%2Fdiploma-syllabus&scheme=REV2015"
            },
            {
              title: "Diploma - Revision 2010",
              category: "Diploma",
              year: "2010",
              icon: <GraduationCap className="w-4 h-4" />,
              link:"https://sitttrkerala.ac.in/index.php?r=site%2Fdiploma-syllabus&scheme=REV2010"
            }
          ]

          const getCategoryColor = (category: string) => {
            const colors = {
              Diploma: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
              GCT: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
              FDGT: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
              KGCE: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
              KGTE: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
            }
            return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
          }
    

  return (
    <Card className='rounded-none border-secondary'>
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-secondary" />
        <BlurIn word="Syllabus & Curriculum" className="inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text font-serif" />
      </CardTitle>
      <CardDescription>Comprehensive collection of syllabi, curricula, and educational resources</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {syllabusItems.map((item, index) => (
          <Card
            onClick={()=>{
                window.open(item.link, "_blank")
            }}
            key={index} className="hover:shadow-md transition-shadow cursor-pointer rounded-none bg-secondary/5 gap-0 p-0">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 text-secondary">
                  {item.icon}
                  <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="w-3 h-3" />
                  {item.year}
                </div>
              </div>
              <h3 className="font-medium text-sm leading-tight">{item.title}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </CardContent>
  </Card>

  )
}

export default Syllabus