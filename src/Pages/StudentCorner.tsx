import { FileText, Calendar, Search, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import BlurIn from '@/components/ui/blur-in'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Syllabus from '@/components/studentcorner/Syllabus'
import { get } from "../../utilities/AxiosInterceptor"
import { useEffect } from 'react'
import { useState } from "react"

interface ResponseFormat {
  success: boolean;
  data: any;
  message: string;
}

const StudentCorner = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("")
  const [revisionYear, setRevisionYear] = useState("")
  const [filteredPapers, setFilteredPapers] = useState([])
  const [activeTab, setActiveTab] = useState("previous")
  const [filters, setFilters] = useState<any>([])


  const getFilters = async () => {
    try {
      const response = await get<ResponseFormat>(`/api/v1/qp/get-filters`)
      if (response.success) {
        setFilters(response.data)
        setSelectedDepartment(response?.data?.departments?.[0])
        setSelectedYear(response?.data?.years?.find((year: any) => year === 2021) || response?.data?.years?.[1])
        setSelectedMonth(response?.data?.months?.[0])
        setSelectedSemester(response?.data?.semesters?.[0])
        setRevisionYear(response?.data?.revisionYears?.[1])
      } else {

      }
    } catch (error) {
      console.log(error)
    }
  }

  const getQuestionPapers = async () => {
    try {
      const response = await get<ResponseFormat>(`/api/v1/qp/get-question-papers`, {
        params: {
          department: selectedDepartment,
          year: selectedYear,
          month: selectedMonth,
          semester: selectedSemester,
          type: activeTab,
          revisionYear: revisionYear
        }
      })
      if (response.success) {
        setFilteredPapers(response.data)
      } else {

      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getQuestionPapers()
  }, [selectedDepartment, selectedYear, selectedMonth, selectedSemester, activeTab])

  useEffect(() => {
    getFilters()
  }, [])

  return (
<div className="max-w-[95vw] 2xl:max-w-[1400px] mx-auto py-6 md:py-10 sm:px-6 lg:px-8 mt-8 md:mt-12 lg:mt-16 xl:mt-20">
  <Syllabus />
  <div className="mt-4 md:mt-8 lg:mt-10">
    <div className="mx-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="mb-3 text-3xl sm:text-4xl lg:text-5xl font-bold">
          <BlurIn word="Question Papers Archive" className="inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text font-serif text-left" />
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          Access previous year and solved question papers for all diploma programmes
        </p>
      </div>

      <Card className="mb-6 md:mb-8 border-0 shadow-lg border border-secondary rounded-none gap-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Search className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {filters?.departments?.map((dept: any, index: number) => (
                  <SelectItem key={index} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {filters?.years?.map((year: any, index: number) => (
                  <SelectItem key={index} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {filters?.months?.map((month: any, index: number) => (
                  <SelectItem key={index} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                {filters?.semesters?.map((semester: any, index: number) => (
                  <SelectItem key={index} value={semester}>
                    {`Semester ${semester}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={revisionYear} onValueChange={setRevisionYear}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Revision Year" />
              </SelectTrigger>
              <SelectContent>
                {filters?.revisionYears?.map((year: any, index: number) => (
                  <SelectItem key={index} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => {
                setSelectedYear("")
                setSelectedMonth("")
                setSelectedSemester("")
              }}
              variant="outline"
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Papers Section */}
      <Card className="mt-6 md:mt-8 border-0 shadow-lg rounded-none border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-secondary">
            <Calendar className="h-5 w-5" />
            {selectedDepartment
              ? `${selectedDepartment} - Question Papers`
              : "All Question Papers"}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {selectedYear && `${selectedYear} • `}
            {selectedSemester && `Semester ${selectedSemester} • `}
            {filteredPapers.length} papers found
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="">
              <TabsTrigger value="previous" className="text-sm sm:text-base">Previous</TabsTrigger>
              <TabsTrigger value="solved" className="text-sm sm:text-base">Solved</TabsTrigger>
            </TabsList>

            <TabsContent value="previous" className="mt-4 sm:mt-6">
              {filteredPapers.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {filteredPapers.map((paper: any, index: any) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between border p-3 sm:p-4 hover:bg-gray-50 transition-colors gap-3 sm:gap-4"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="bg-blue-100 p-2">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm sm:text-base">{paper.subjectCode}-{paper.subject}</h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {`${paper.type.charAt(0).toUpperCase()}${paper.type.slice(1)}`} • {paper.year} • {`Semester ${paper.semester}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-end sm:justify-normal gap-2 sm:gap-3">
                        <Button
                          className="rounded-none text-xs sm:text-sm h-8 sm:h-9"
                          onClick={() => {
                            window.open(paper.questionPaper, '_blank');
                          }}
                          size="sm" 
                          variant="outline"
                        >
                          <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <p className="text-gray-500 text-sm sm:text-base">No papers found matching your criteria</p>
                  <Button
                    variant="link"
                    className="text-xs sm:text-sm"
                    onClick={() => {
                      setSelectedDepartment("");
                      setSelectedYear("");
                      setSelectedMonth("");
                      setSelectedSemester("");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="solved" className="mt-4 sm:mt-6">
              {filteredPapers.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {filteredPapers.map((paper: any, index: any) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between border p-3 sm:p-4 hover:bg-gray-50 transition-colors gap-3 sm:gap-4"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="bg-green-100 p-2">
                          <FileText className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm sm:text-base">{paper?.subjectCode}-{paper?.subject}</h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {paper?.type.charAt(0).toUpperCase() + paper?.type.slice(1)} • {paper?.year} • {`Semester ${paper?.semester}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-end sm:justify-normal gap-2 sm:gap-3">
                        <Badge variant="secondary" className="rounded-none text-xs">Solved</Badge>
                        <span className="text-xs sm:text-sm text-gray-500">{paper.size}</span>
                        <Button
                          className="rounded-none text-xs sm:text-sm h-8 sm:h-9"
                          onClick={() => {
                            window.open(paper.questionPaper, '_blank');
                          }}
                          size="sm" 
                          variant="outline"
                        >
                          <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <p className="text-gray-500 text-sm sm:text-base">No solved papers found matching your criteria</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  </div>
</div>
  )
}

export default StudentCorner