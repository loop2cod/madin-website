import { FileText, Calendar, Search, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BlurIn from '@/components/ui/blur-in';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { get } from "../../utilities/AxiosInterceptor";
import { useEffect, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton";

interface ResponseFormat {
  success: boolean
  data?: any
  message?: string
  total?: any
  totalPages?: any
}

interface Paper {
  subjectCode: string;
  subject: string;
  type: string;
  year: number;
  semester: number;
  questionPaper: string;
  size?: string;
}

const QuestionPapers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [revisionYear, setRevisionYear] = useState("");
  const [filteredPapers, setFilteredPapers] = useState<Paper[]>([]);
  const [activeTab, setActiveTab] = useState("previous-paper");
  const [filters, setFilters] = useState<{
    departments?: string[];
    years?: number[];
    months?: string[];
    semesters?: number[];
    revisionYears?: string[];
  }>({});
  const [loading, setLoading] = useState({
    filters: true,
    papers: true
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });

  const getFilters = async () => {
    try {
      setLoading(prev => ({ ...prev, filters: true }));
      const response = await get<ResponseFormat>('/api/v1/qp/get-filters');
      if (response.success) {
        setFilters(response.data);
        setSelectedDepartment(response.data?.departments?.[0] || "");
        setSelectedYear(response.data?.years?.find((year: any) => year === 2021) || response.data?.years?.[1] || "");
        setSelectedSemester(response.data?.semesters?.[0] || "");
        setRevisionYear(response.data?.revisionYears?.[1] || "");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(prev => ({ ...prev, filters: false }));
    }
  };

  const getQuestionPapers = async () => {
    if (!selectedDepartment) return;
    
    try {
      setLoading(prev => ({ ...prev, papers: true }));
      const response = await get<ResponseFormat>('/api/v1/qp/get-question-papers', {
        params: {
          department: selectedDepartment,
          year: selectedYear,
          month: selectedMonth,
          semester: selectedSemester,
          type: activeTab,
          revisionYear: revisionYear,
          page: pagination.page,
          limit: pagination.limit
        }
      });
      if (response.success) {
        setFilteredPapers(response.data || []);
        setPagination(prev => ({
          ...prev,
          total: response?.total,
          totalPages: response?.totalPages
      }))
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(prev => ({ ...prev, papers: false }));
    }
  };

  useEffect(() => {
    getFilters();
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      // Reset to first page when filters change
      setPagination(prev => ({ ...prev, page: 1 }));
      getQuestionPapers();
    }
  }, [selectedDepartment, selectedYear, selectedMonth, selectedSemester, activeTab, revisionYear]);

  useEffect(() => {
    getQuestionPapers();
  }, [pagination.page, pagination.limit]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const clearFilters = () => {
    setSelectedYear("");
    setSelectedMonth("");
    setSelectedSemester("");
    setRevisionYear(filters?.revisionYears?.[1] || "");
  };

  const renderPaperItem = (paper: Paper, index: number) => (
    <div
      key={index}
      className="flex flex-col sm:flex-row sm:items-center justify-between border p-3 sm:p-4 hover:bg-gray-50 transition-colors gap-3 sm:gap-4"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={`p-2 ${activeTab === 'answer-key' ? 'bg-green-100' : 'bg-blue-100'}`}>
          <FileText className={`h-5 w-5 ${activeTab === 'answer-key' ? 'text-green-600' : 'text-blue-600'}`} />
        </div>
        <div>
          <h4 className="font-medium text-sm sm:text-base">{paper.subjectCode}-{paper.subject}</h4>
          <p className="text-xs sm:text-sm text-gray-600">
            {`${paper.type.charAt(0).toUpperCase()}${paper.type.slice(1)}`} • {paper.year} • {`Semester ${paper.semester}`}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end sm:justify-normal gap-2 sm:gap-3">
        {activeTab === 'answer-key' && (
          <>
            <Badge variant="secondary" className="rounded-none text-xs">Solved</Badge>
            {paper.size && <span className="text-xs sm:text-sm text-gray-500">{paper.size}</span>}
          </>
        )}
        <Button
          className="rounded-none text-xs sm:text-sm h-8 sm:h-9"
          onClick={() => window.open(paper.questionPaper, '_blank')}
          size="sm" 
          variant="outline"
        >
          <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Download
        </Button>
      </div>
    </div>
  );

  const renderSkeletonLoader = () => (
    <div className="space-y-3 sm:space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center justify-between p-4 border rounded">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-3 w-[150px]" />
            </div>
          </div>
          <Skeleton className="h-9 w-24" />
        </div>
      ))}
    </div>
  );

  return (
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

      {/* Filters Card */}
      <Card className="mb-6 md:mb-8 shadow-lg border border-secondary rounded-none gap-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Search className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          {loading.filters ? (
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <Select
                value={selectedDepartment}
                onValueChange={setSelectedDepartment}
                disabled={loading.filters}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {filters?.departments?.map((dept, index) => (
                    <SelectItem key={index} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select 
                value={selectedYear} 
                onValueChange={setSelectedYear}
                disabled={loading.filters}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {filters?.years?.map((year, index) => (
                    <SelectItem key={index} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select 
                value={selectedMonth} 
                onValueChange={setSelectedMonth}
                disabled={loading.filters}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  {filters?.months?.map((month, index) => (
                    <SelectItem key={index} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select 
                value={selectedSemester} 
                onValueChange={setSelectedSemester}
                disabled={loading.filters}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  {filters?.semesters?.map((semester, index) => (
                    <SelectItem key={index} value={semester}>
                      {`Semester ${semester}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select 
                value={revisionYear} 
                onValueChange={setRevisionYear}
                disabled={loading.filters}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Revision Year" />
                </SelectTrigger>
                <SelectContent>
                  {filters?.revisionYears?.map((year, index) => (
                    <SelectItem key={index} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="w-full"
                disabled={loading.filters}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Papers Section */}
      <Card className="mt-6 md:mt-8  shadow-lg rounded-none border">
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
            {loading.papers ? 'Loading...' : `${pagination.total} papers found`}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="">
              <TabsTrigger value="previous-paper" className="text-sm sm:text-base">
                Previous Question Papers
              </TabsTrigger>
              <TabsTrigger value="answer-key" className="text-sm sm:text-base">
                Answer Key
              </TabsTrigger>
            </TabsList>

            <TabsContent value="previous-paper" className="mt-4 sm:mt-6">
              {loading.papers ? (
                renderSkeletonLoader()
              ) : filteredPapers.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {filteredPapers.map(renderPaperItem)}
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1 || loading.papers}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="ml-1 hidden sm:inline">Previous</span>
                      </Button>
                      <div className="px-3 py-1 text-sm">
                        Page {pagination.page} of {pagination.totalPages}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.totalPages || loading.papers}
                      >
                        <span className="mr-1 hidden sm:inline">Next</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <p className="text-gray-500 text-sm sm:text-base">
                    No papers found matching your criteria
                  </p>
                  <Button
                    variant="link"
                    className="text-xs sm:text-sm"
                    onClick={clearFilters}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="answer-key" className="mt-4 sm:mt-6">
              {loading.papers ? (
                renderSkeletonLoader()
              ) : filteredPapers.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {filteredPapers.map(renderPaperItem)}
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1 || loading.papers}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="ml-1 hidden sm:inline">Previous</span>
                      </Button>
                      <div className="px-3 py-1 text-sm">
                        Page {pagination.page} of {pagination.totalPages}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.totalPages || loading.papers}
                      >
                        <span className="mr-1 hidden sm:inline">Next</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <p className="text-gray-500 text-sm sm:text-base">
                    No answer keys found matching your criteria
                  </p>
                  <Button
                    variant="link"
                    className="text-xs sm:text-sm"
                    onClick={clearFilters}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionPapers;