'use client'
import { useState, useCallback } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import { get } from '../../../utilities/AxiosInterceptor'
import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Download, FileText, Loader2 } from "lucide-react"
import { Badge } from "../ui/badge"
import BlurIn from '../ui/blur-in'


interface ResponseFormat {
    success: boolean
    data?: any
    message?: string
    total?: any
    totalPages?: any
}

interface LabManual {
    _id: string
    revisionYear: string
    subjectCode: string
    subject: string
    semester: string
    labManual: string
    size?: string
}

const ViewLab = () => {
        const [selectedDepartment, setSelectedDepartment] = useState("")
        const [selectedSemester, setSelectedSemester] = useState("")
        const [revisionYear, setRevisionYear] = useState("")
        const [filteredLabManuals, setFilteredLabManuals] = useState<LabManual[]>([])
        const [filters, setFilters] = useState<any>([])
        const [loading, setLoading] = useState(true)

           const getFilters = async () => {
                try {
                    const response = await get<ResponseFormat>(`/api/v1/lab/get-filters-lab-manual`)
                    if (response.success) {
                        setFilters(response.data)
                        setSelectedDepartment(response?.data?.departments?.[0])
                        setSelectedSemester(response?.data?.semesters?.[0])
                        setRevisionYear(response?.data?.revisionYears?.[0])
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        
            const getLabManuals = useCallback(async () => {
                setLoading(true)
                try {
                    const response = await get<ResponseFormat>(`/api/v1/lab/get-lab-manuals`, {
                        params: {
                            department: selectedDepartment,
                            semester: selectedSemester,
                            revisionYear: revisionYear,
                        }
                    })
                    if (response.success) {
                        setFilteredLabManuals(response.data)
                    }
                } catch (error) {
                    console.log(error)
                } finally {
                    setLoading(false)
                }
            }, [selectedDepartment, selectedSemester, revisionYear, setFilteredLabManuals, setLoading])
            
                useEffect(() => {
                    getLabManuals()
                }, [selectedDepartment, selectedSemester, revisionYear, getLabManuals])
            
                useEffect(() => {
                    getFilters()
                }, [])


  return (
      <div className="py-10 md:py-20">

            <div id="lab-manual" className="mb-6 md:mb-8">
      <h1 className="mb-3 text-3xl sm:text-4xl lg:text-5xl font-bold">
        <BlurIn word="Lab Manual" className="inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text font-serif text-left" />
      </h1>
      <p className="text-base sm:text-lg text-gray-600">
        Access lab manual for all programmes
      </p>
    </div>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                <Select
                    value={selectedDepartment}
                    onValueChange={(value) => {
                        setSelectedDepartment(value)
                    }}
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
                <Select
                    value={selectedSemester}
                    onValueChange={(value) => {
                        setSelectedSemester(value)
                    }}
                >
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
                <Select
                    value={revisionYear}
                    onValueChange={(value) => {
                        setRevisionYear(value)
                    }}
                >
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
                        setSelectedDepartment("")
                        setSelectedSemester("")
                        setRevisionYear("")
                    }}
                    variant="outline"
                    className="w-full"
                >
                    Clear Filters
                </Button>
            </div>

            <Card className="mt-6 border border-secondary shadow-lg rounded-none">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-primary">
                        <Calendar className="h-5 w-5" />
                        {selectedDepartment
                            ? `${selectedDepartment} - Question Papers`
                            : "All Question Papers"}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                        {selectedSemester && `Semester ${selectedSemester} • `}
                        {loading ? "Loading..." : `${filteredLabManuals?.length} papers found`}
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                {loading ? (
                                <div className="flex justify-center items-center py-12">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                </div>
                            ) : filteredLabManuals?.length > 0 ? (
                                <>
                                    <div className="space-y-3 sm:space-y-4">
                                        {filteredLabManuals?.map((paper) => (
                                            <div
                                                key={paper._id}
                                                className="flex flex-col sm:flex-row sm:items-center justify-between border p-3 sm:p-4 hover:bg-gray-50 transition-colors gap-3 sm:gap-4 rounded-lg"
                                            >
                                                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                                                    <div className={`p-2 rounded bg-blue-100`}>
                                                        <FileText className={`h-5 w-5 text-blue-600`} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-medium text-sm sm:text-base truncate">{paper.subjectCode}-{paper.subject}</h4>
                                                        <p className="text-xs sm:text-sm text-gray-600 truncate">
                                                       {paper.revisionYear} • {`Semester ${paper.semester}`}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-end sm:justify-normal gap-2 sm:gap-3">
                                                    {(
                                                        <>
                                                            <Badge variant="secondary" className="rounded-none text-xs hidden sm:inline-flex">Lab Manual</Badge>
                                                            {paper.size && <span className="text-xs sm:text-sm text-gray-500 hidden sm:inline">{paper.size}</span>}
                                                        </>
                                                    )}
                                                    <Button
                                                        className="rounded text-xs sm:text-sm h-8 sm:h-9"
                                                        onClick={() => {
                                                            window.open(paper.labManual, '_blank');
                                                        }}
                                                        size="sm"
                                                        variant="outline"
                                                    >
                                                        <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                                        <span className="hidden sm:inline">Download</span>
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-sm sm:text-base">
                                        No lab manuals found matching your criteria
                                    </p>
                                    <Button
                                        variant="link"
                                        className="text-xs sm:text-sm mt-2"
                                        onClick={() => {
                                            setSelectedDepartment("")
                                            setSelectedSemester("")
                                            setRevisionYear("")
                                        }}
                                    >
                                        Clear filters
                                    </Button>
                                </div>
                            )}
                </CardContent>
            </Card>
        </div>
  )
}

export default ViewLab