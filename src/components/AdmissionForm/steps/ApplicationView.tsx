import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { toast } from '@/Hooks/use-toast'
import axios from 'axios'
import { format } from 'date-fns'
import { ArrowLeft, MapPin, User, GraduationCap, CreditCard, FileText } from 'lucide-react'

interface ApplicationViewProps {
  applicationId: string
  onBack: () => void
}

interface ApplicationData {
  _id: string
  mobile: string
  personalDetails: {
    fullName: string
    dob: string
    gender: string
    religion: string
    email: string
  }
  addressFamilyDetails: {
    address: {
      houseNumber: string
      street: string
      postOffice: string
      pinCode: string
      district: string
      state: string
      country: string
    }
    parents: {
      fatherName: string
      fatherMobile: string
      motherName: string
      motherMobile: string
    }
    guardian: {
      guardianName: string
      guardianPlace: string
      guardianContact: string
    }
  }
  programSelections: Array<{
    programLevel: string
    programName: string
    mode?: string
    specialization?: string
    branchPreferences?: Array<{
      branch: string
      priority: number
      _id: string
    }>
    selected: boolean
    priority: number
    _id: string
  }>
  educationDetails: {
    programDetails: {
      programLevel: string
      programName: string
      mode: string
      branchPreferences: Array<{
        branch: string
        priority: number
        _id: string
      }>
      selected: boolean
      priority: number
      _id: string
    }
    entranceExams: {
      kmat: { selected: boolean; score?: string }
      cmat: { selected: boolean; score?: string }
      cat: { selected: boolean; score?: string }
    }
    educationData: Array<{
      examination: string
      passedFailed: string
      groupTrade: string
      period: string
      yearOfPass: string
      percentageMarks: string
      registrationNumber: string
      noOfChances: string
      english: string
      physics: string
      chemistry: string
      maths: string
      _id: string
    }>
    subjectScores: any[]
  }
  paymentDetails: {
    application_fee: {
      _id: string
      amount: number
      currency: string
      status: string
      paymentMethod: string
      receipt: string
      verifiedAt: string
      createdAt: string
    }
  }
  declaration: {
    agreed: boolean
    digitalSignature?: string
    agreedAt?: string
  }
  status: string
  currentStage: string
  isExistingApplication: boolean
  createdAt: string
  updatedAt: string
}

const ApplicationView = ({ applicationId, onBack }: ApplicationViewProps) => {
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchApplicationData = async () => {
      if (!applicationId) return

      setIsLoading(true)
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_ADMISSION_API_URL}/api/v1/admission/application/${applicationId}`
        )

        if (response?.data?.success && response.data.data) {
          setApplicationData(response.data.data)
        }
      } catch (error: any) {
        console.error("Error fetching application data:", error)
        toast({
          title: "Error",
          description: "Failed to load application data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchApplicationData()
  }, [applicationId])

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy')
  }

  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy hh:mm a')
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'submitted':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCurrentStageDisplay = (stage: string) => {
    const stageMap: Record<string, string> = {
      'mobile_verification': 'Mobile Verification',
      'personal_details': 'Personal Details',
      'address_family_details': 'Address & Family Details',
      'application_fee_payment': 'Application Fee Payment',
      'program_selection': 'Program Selection',
      'education_details': 'Education Details',
      'declaration': 'Declaration',
      'submitted': 'Application Submitted'
    }
    return stageMap[stage] || stage
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-secondary"></div>
        <span className="ml-3 text-gray-700">Loading application details...</span>
      </div>
    )
  }

  if (!applicationData) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Application Not Found</h2>
          <p className="text-gray-600 mt-2">The requested application could not be found.</p>
        </div>
        <Button onClick={onBack} variant="outline" className="mt-4 rounded-none">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        {/* Title and ID Row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 break-words">Application Details</h1>
            <p className="text-gray-600 text-xs sm:text-sm mt-1 break-all">
              <span className="font-medium">Application ID:</span> {applicationData._id}
            </p>
          </div>
          
          {/* Status Badges - Mobile: Stack, Desktop: Side by side */}
          <div className="flex flex-wrap items-center gap-2 sm:items-start sm:justify-end">
            <Badge className={`text-xs ${getStatusColor(applicationData.status)}`}>
              {applicationData.status.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {getCurrentStageDisplay(applicationData.currentStage)}
            </Badge>
          </div>
        </div>
        
        {/* Back Button Row */}
        <div className="flex justify-start">
          <Button onClick={onBack} size="sm" className='rounded-none w-fit bg-secondary hover:bg-secondary/80 text-white'>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      {/* Application Summary */}
      <Card className="rounded-none border-none shadow-none">
        <CardHeader className='px-3 sm:px-4 py-3'>
          <CardTitle className="flex items-center text-base sm:text-lg">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Application Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-4 pb-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Created</Label>
              <p className="text-sm font-semibold text-gray-900 mt-1">{formatDate(applicationData.createdAt)}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Updated</Label>
              <p className="text-sm font-semibold text-gray-900 mt-1">{formatDate(applicationData.updatedAt)}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Mobile</Label>
              <p className="text-sm font-semibold text-gray-900 mt-1 break-all">{applicationData.mobile}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Type</Label>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  applicationData.isExistingApplication ? 'bg-blue-500' : 'bg-green-500'
                }`} />
                <p className="text-sm font-semibold text-gray-900">
                  {applicationData.isExistingApplication ? 'Existing' : 'New'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Details */}
      <Card className="rounded-none border-secondary/20">
        <CardHeader className='px-3 sm:px-4 py-3'>
          <CardTitle className="flex items-center text-base sm:text-lg">
            <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Personal Details
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-4 pb-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            <div className='col-span-2 lg:col-span-1 bg-gray-50 p-3 rounded-lg'>
              <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Full Name</Label>
              <p className="text-sm font-semibold text-gray-900 mt-1 break-words">{applicationData.personalDetails.fullName}</p>
            </div>
            <div className='bg-gray-50 p-3 rounded-lg'>
              <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide">DOB</Label>
              <p className="text-sm font-semibold text-gray-900 mt-1">{formatDate(applicationData.personalDetails.dob)}</p>
            </div>
            <div className='bg-gray-50 p-3 rounded-lg'>
              <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Gender</Label>
              <p className="text-sm font-semibold text-gray-900 mt-1 capitalize">{applicationData.personalDetails.gender}</p>
            </div>
            <div className='bg-gray-50 p-3 rounded-lg'>
              <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Religion</Label>
              <p className="text-sm font-semibold text-gray-900 mt-1 capitalize">{applicationData.personalDetails.religion}</p>
            </div>
            <div className='col-span-2 lg:col-span-2 bg-gray-50 p-3 rounded-lg'>
              <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Email</Label>
              <p className="text-sm font-semibold text-gray-900 mt-1 break-all">{applicationData.personalDetails.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address & Family Details */}
      <Card className="rounded-none border-secondary/20">
        <CardHeader className='px-3 sm:px-4 py-3'>
          <CardTitle className="flex items-center text-base sm:text-lg">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Address & Family Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-3 sm:px-4 pb-4">
          {/* Address */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">Address</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              <div className='bg-blue-50 p-3 rounded-lg'>
                <Label className="text-xs font-medium text-blue-700 uppercase tracking-wide">House No.</Label>
                <p className="text-sm font-semibold text-gray-900 mt-1">{applicationData.addressFamilyDetails.address.houseNumber}</p>
              </div>
              <div className='bg-blue-50 p-3 rounded-lg'>
                <Label className="text-xs font-medium text-blue-700 uppercase tracking-wide">Street</Label>
                <p className="text-sm font-semibold text-gray-900 mt-1 break-words">{applicationData.addressFamilyDetails.address.street}</p>
              </div>
              <div className='bg-blue-50 p-3 rounded-lg'>
                <Label className="text-xs font-medium text-blue-700 uppercase tracking-wide">Post Office</Label>
                <p className="text-sm font-semibold text-gray-900 mt-1">{applicationData.addressFamilyDetails.address.postOffice}</p>
              </div>
              <div className='bg-blue-50 p-3 rounded-lg'>
                <Label className="text-xs font-medium text-blue-700 uppercase tracking-wide">Pin Code</Label>
                <p className="text-sm font-semibold text-gray-900 mt-1">{applicationData.addressFamilyDetails.address.pinCode}</p>
              </div>
              <div className='bg-blue-50 p-3 rounded-lg'>
                <Label className="text-xs font-medium text-blue-700 uppercase tracking-wide">District</Label>
                <p className="text-sm font-semibold text-gray-900 mt-1">{applicationData.addressFamilyDetails.address.district}</p>
              </div>
              <div className='bg-blue-50 p-3 rounded-lg'>
                <Label className="text-xs font-medium text-blue-700 uppercase tracking-wide">State</Label>
                <p className="text-sm font-semibold text-gray-900 mt-1">{applicationData.addressFamilyDetails.address.state}</p>
              </div>
            </div>
          </div>

          {/* Parents */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">Parents</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className='bg-green-50 p-3 rounded-lg'>
                <Label className="text-xs font-medium text-green-700 uppercase tracking-wide">Father's Name</Label>
                <p className="text-sm font-semibold text-gray-900 mt-1 break-words">{applicationData.addressFamilyDetails.parents.fatherName}</p>
              </div>
              <div className='bg-green-50 p-3 rounded-lg'>
                <Label className="text-xs font-medium text-green-700 uppercase tracking-wide">Father's Mobile</Label>
                <p className="text-sm font-semibold text-gray-900 mt-1">{applicationData.addressFamilyDetails.parents.fatherMobile}</p>
              </div>
              <div className='bg-green-50 p-3 rounded-lg'>
                <Label className="text-xs font-medium text-green-700 uppercase tracking-wide">Mother's Name</Label>
                <p className="text-sm font-semibold text-gray-900 mt-1 break-words">{applicationData.addressFamilyDetails.parents.motherName}</p>
              </div>
              <div className='bg-green-50 p-3 rounded-lg'>
                <Label className="text-xs font-medium text-green-700 uppercase tracking-wide">Mother's Mobile</Label>
                <p className="text-sm font-semibold text-gray-900 mt-1">{applicationData.addressFamilyDetails.parents.motherMobile}</p>
              </div>
            </div>
          </div>

          {/* Guardian */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">Guardian</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              <div className='bg-purple-50 p-3 rounded-lg'>
                <Label className="text-xs font-medium text-purple-700 uppercase tracking-wide">Name</Label>
                <p className="text-sm font-semibold text-gray-900 mt-1 break-words">{applicationData.addressFamilyDetails.guardian.guardianName}</p>
              </div>
              <div className='bg-purple-50 p-3 rounded-lg'>
                <Label className="text-xs font-medium text-purple-700 uppercase tracking-wide">Place</Label>
                <p className="text-sm font-semibold text-gray-900 mt-1">{applicationData.addressFamilyDetails.guardian.guardianPlace}</p>
              </div>
              <div className='bg-purple-50 p-3 rounded-lg'>
                <Label className="text-xs font-medium text-purple-700 uppercase tracking-wide">Contact</Label>
                <p className="text-sm font-semibold text-gray-900 mt-1">{applicationData.addressFamilyDetails.guardian.guardianContact}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Program Selection */}
      <Card className="rounded-none border-secondary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <GraduationCap className="w-5 h-5 mr-2" />
            Program Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          {applicationData.programSelections.map((program) => (
            <div key={program._id} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Program Level</Label>
                  <p className="text-sm text-gray-900 capitalize">{program.programLevel}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Program Name</Label>
                  <p className="text-sm text-gray-900">{program.programName}</p>
                </div>
                {program.programLevel === 'diploma' && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Mode</Label>
                    <p className="text-sm text-gray-900">{program.mode}</p>
                  </div>
                )}
                {program.programLevel === 'mba' && program.specialization && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Specialization</Label>
                    <p className="text-sm text-gray-900">{program.specialization}</p>
                  </div>
                )}
              </div>
              {program.programLevel === 'diploma' && program.branchPreferences && program.branchPreferences.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-gray-700">Branch Preferences</Label>
                  <div className="mt-2 space-y-1">
                    {program.branchPreferences.map((branch) => (
                      <div key={branch._id} className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          Priority {branch.priority}
                        </Badge>
                        <span className="text-sm text-gray-900">{branch.branch}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education Details */}
      <Card className="rounded-none border-secondary/20">
        <CardHeader className="px-3 sm:px-4 py-3">
          <CardTitle className="flex items-center text-base sm:text-lg">
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Education Details ({applicationData.educationDetails?.programDetails?.programLevel?.toUpperCase() || 'N/A'})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-4 pb-4">
          {/* Header Info */}
          <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 p-3 border rounded-lg">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 uppercase tracking-wide">Education Qualifications</h3>
            <p className="text-xs text-gray-600">
              Academic qualifications for {applicationData.educationDetails?.programDetails?.programName || 'this program'} admission.
            </p>
          </div>

          {/* Education Cards */}
          <div className="space-y-3">
            {applicationData.educationDetails?.educationData?.map((education, index) => (
              <Card key={education._id || index} className={`transition-all duration-200 ${
                education.examination === 'SSLC/THSLC/CBSE' || education.examination === '+2/VHSE' || education.examination === 'Degree' 
                  ? 'ring-2 ring-red-100 border-red-200 bg-red-50/30' 
                  : 'border-gray-200'
              }`}>
                <CardHeader className="pb-2 px-3 pt-3 sm:px-4 sm:pt-4">
                  <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 gap-2">
                    <CardTitle className="text-xs sm:text-sm font-semibold flex flex-wrap items-center gap-2">
                      <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs font-medium flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="break-words text-xs sm:text-sm">{education.examination}</span>
                      {(education.examination === 'SSLC/THSLC/CBSE' || education.examination === '+2/VHSE' || education.examination === 'Degree') && (
                        <Badge variant="destructive" className="text-xs flex-shrink-0 px-1.5 py-0.5">
                          Required
                        </Badge>
                      )}
                    </CardTitle>
                    
                    {/* Status Badge */}
                    <div className="flex justify-start sm:justify-end">
                      <Badge variant="default" className={`text-xs px-2 py-1 ${
                        education.passedFailed === 'Passed' 
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                      }`}>
                        {education.passedFailed === 'Passed' ? '✓' : '✗'} {education.passedFailed}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-2 px-3 pb-3 sm:px-4 sm:pb-4">
                  {/* Form Grid - Responsive */}
                  <div className="grid gap-3 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
                    
                    {/* Group/Subject - Not for SSLC */}
                    {education.examination !== "SSLC/THSLC/CBSE" && education.groupTrade && (
                      <div className="bg-gray-50 p-2 rounded">
                        <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                          {education.examination === "Degree" ? "Subject" : "Group"}
                        </Label>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-1">{education.groupTrade}</p>
                      </div>
                    )}

                    {/* Year of Pass */}
                    {education.yearOfPass && (
                      <div className="bg-gray-50 p-2 rounded">
                        <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Year</Label>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-1">{education.yearOfPass}</p>
                      </div>
                    )}

                    {/* Percentage */}
                    {education.percentageMarks && (
                      <div className="bg-gray-50 p-2 rounded">
                        <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Percentage</Label>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-1">{education.percentageMarks}%</p>
                      </div>
                    )}

                    {/* Registration Number */}
                    <div className="bg-gray-50 p-2 rounded">
                      <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Reg. No.</Label>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 break-all">{education.registrationNumber || 'N/A'}</p>
                    </div>

                    {/* Subject Marks for specific examinations */}
                    {(education.english || education.physics || education.chemistry || education.maths) && (
                      <div className="col-span-full">
                        <Label className="text-xs font-medium text-gray-700">Subject Marks</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                          {education.english && (
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <Label className="text-xs text-gray-600">English</Label>
                              <p className="text-sm font-medium">{education.english}</p>
                            </div>
                          )}
                          {education.physics && (
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <Label className="text-xs text-gray-600">Physics</Label>
                              <p className="text-sm font-medium">{education.physics}</p>
                            </div>
                          )}
                          {education.chemistry && (
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <Label className="text-xs text-gray-600">Chemistry</Label>
                              <p className="text-sm font-medium">{education.chemistry}</p>
                            </div>
                          )}
                          {education.maths && (
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <Label className="text-xs text-gray-600">Maths</Label>
                              <p className="text-sm font-medium">{education.maths}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Completion Status Indicator */}
                  <div className="pt-2">
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 text-xs text-gray-500">
                      <span className="font-medium">Completion Status:</span>
                      <div className="flex flex-wrap items-center gap-3 sm:gap-2">
                        {[
                          { field: 'yearOfPass', label: 'Year', value: education.yearOfPass },
                          { field: 'percentageMarks', label: '%', value: education.percentageMarks },
                          { field: 'registrationNumber', label: 'Reg', value: education.registrationNumber }
                        ].map(({ field, label, value }) => (
                          <div key={field} className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              value ? 'bg-green-500' : 'bg-gray-300'
                            }`} />
                            <span className={`text-xs ${value ? 'text-green-600' : 'text-gray-400'}`}>
                              {label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) || (
              <div className="text-center py-8 text-gray-500">
                <p>No education details available</p>
              </div>
            )}
          </div>

          {/* Entrance Exams Section - Only for MBA programs */}
          {applicationData.educationDetails?.entranceExams && 
           applicationData.educationDetails?.programDetails?.programLevel?.toLowerCase() === 'mba' && (
            <Card className="border-purple-200 bg-purple-50/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-purple-800">
                  Entrance Examination Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* KMAT */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        applicationData.educationDetails.entranceExams.kmat?.selected ? 'bg-purple-600' : 'bg-gray-300'
                      }`} />
                      <Label className="text-sm font-medium text-purple-800">KMAT</Label>
                    </div>
                    {applicationData.educationDetails.entranceExams.kmat?.selected && applicationData.educationDetails.entranceExams.kmat?.score && (
                      <div className="ml-5">
                        <Label className="text-xs text-gray-600">Score</Label>
                        <p className="text-sm font-medium">{applicationData.educationDetails.entranceExams.kmat.score}</p>
                      </div>
                    )}
                    {!applicationData.educationDetails.entranceExams.kmat?.selected && (
                      <p className="text-xs text-gray-500 ml-5">Not attempted</p>
                    )}
                  </div>

                  {/* CMAT */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        applicationData.educationDetails.entranceExams.cmat?.selected ? 'bg-purple-600' : 'bg-gray-300'
                      }`} />
                      <Label className="text-sm font-medium text-purple-800">CMAT</Label>
                    </div>
                    {applicationData.educationDetails.entranceExams.cmat?.selected && applicationData.educationDetails.entranceExams.cmat?.score && (
                      <div className="ml-5">
                        <Label className="text-xs text-gray-600">Score</Label>
                        <p className="text-sm font-medium">{applicationData.educationDetails.entranceExams.cmat.score}</p>
                      </div>
                    )}
                    {!applicationData.educationDetails.entranceExams.cmat?.selected && (
                      <p className="text-xs text-gray-500 ml-5">Not attempted</p>
                    )}
                  </div>

                  {/* CAT */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        applicationData.educationDetails.entranceExams.cat?.selected ? 'bg-purple-600' : 'bg-gray-300'
                      }`} />
                      <Label className="text-sm font-medium text-purple-800">CAT</Label>
                    </div>
                    {applicationData.educationDetails.entranceExams.cat?.selected && applicationData.educationDetails.entranceExams.cat?.score && (
                      <div className="ml-5">
                        <Label className="text-xs text-gray-600">Score</Label>
                        <p className="text-sm font-medium">{applicationData.educationDetails.entranceExams.cat.score}</p>
                      </div>
                    )}
                    {!applicationData.educationDetails.entranceExams.cat?.selected && (
                      <p className="text-xs text-gray-500 ml-5">Not attempted</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Payment Details */}
      <Card className="rounded-none border-secondary/20 gap-2 py-3">
        <CardHeader className='px-3'>
          <CardTitle className="flex items-center text-lg">
            <CreditCard className="w-5 h-5 mr-2" />
            Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-3">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Amount</Label>
              <p className="text-sm text-gray-900">
                {applicationData.paymentDetails.application_fee.currency} {applicationData.paymentDetails.application_fee.amount}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Payment Status</Label>
              <Badge className={getStatusColor(applicationData.paymentDetails.application_fee.status)}>
                {applicationData.paymentDetails.application_fee.status.toUpperCase()}
              </Badge>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Payment Method</Label>
              <p className="text-sm text-gray-900 capitalize">{applicationData.paymentDetails.application_fee.paymentMethod}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Verified At</Label>
              <p className="text-sm text-gray-900">{formatDateTime(applicationData.paymentDetails.application_fee.verifiedAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ApplicationView