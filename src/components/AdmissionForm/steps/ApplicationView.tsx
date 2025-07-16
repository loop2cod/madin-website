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
    mode: string
    branchPreferences: Array<{
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
      <div className="flex  justify-between">
        <div className="flex flex-col space-x-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Application Details</h1>
            <p className="text-gray-600 text-sm">Application ID: {applicationData._id}</p>
          </div>
              <Button onClick={onBack} size="sm" className='rounded-none w-fit bg-secondary hover:bg-secondary/80 text-white mt-2'>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        <div className="flex items-start space-x-2">
          <Badge className={getStatusColor(applicationData.status)}>
            {applicationData.status.toUpperCase()}
          </Badge>
          <Badge variant="outline">
            {getCurrentStageDisplay(applicationData.currentStage)}
          </Badge>
        </div>
      </div>

      {/* Application Summary */}
      <Card className="rounded-none border-none shadow-none gap-2 py-3">
        <CardHeader className='px-3'>
          <CardTitle className="flex items-center text-lg">
            <FileText className="w-5 h-5 mr-2" />
            Application Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Created Date</Label>
              <p className="text-sm text-gray-900">{formatDate(applicationData.createdAt)}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Last Updated</Label>
              <p className="text-sm text-gray-900">{formatDate(applicationData.updatedAt)}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Mobile Number</Label>
              <p className="text-sm text-gray-900">{applicationData.mobile}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Application Type</Label>
              <p className="text-sm text-gray-900">
                {applicationData.isExistingApplication ? 'Existing' : 'New'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Details */}
      <Card className="rounded-none border-secondary/20 gap-2 py-3">
        <CardHeader className='px-3'>
          <CardTitle className="flex items-center text-lg">
            <User className="w-5 h-5 mr-2" />
            Personal Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-3">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div className='col-span-2 md:col-span-1'>
              <Label className="text-sm font-medium text-gray-700">Full Name</Label>
              <p className="text-sm text-gray-900">{applicationData.personalDetails.fullName}</p>
            </div>
            <div className='col-span-2 md:col-span-1'>
              <Label className="text-sm font-medium text-gray-700">Date of Birth</Label>
              <p className="text-sm text-gray-900">{formatDate(applicationData.personalDetails.dob)}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Gender</Label>
              <p className="text-sm text-gray-900 capitalize">{applicationData.personalDetails.gender}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Religion</Label>
              <p className="text-sm text-gray-900 capitalize">{applicationData.personalDetails.religion}</p>
            </div>
            <div className='col-span-2 md:col-span-1'>
              <Label className="text-sm font-medium text-gray-700">Email</Label>
              <p className="text-sm text-gray-900">{applicationData.personalDetails.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address & Family Details */}
      <Card className="rounded-none border-secondary/20 gap-2 py-3">
        <CardHeader className='px-3'>
          <CardTitle className="flex items-center text-lg">
            <MapPin className="w-5 h-5 mr-2" />
            Address & Family Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6  px-3">
          {/* Address */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Address</h3>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <div className='col-span-2 md:col-span-1'>
                <Label className="text-sm font-medium text-gray-700">House Number</Label>
                <p className="text-sm text-gray-900">{applicationData.addressFamilyDetails.address.houseNumber}</p>
              </div>
              <div className='col-span-2 md:col-span-1'>
                <Label className="text-sm font-medium text-gray-700">Street</Label>
                <p className="text-sm text-gray-900">{applicationData.addressFamilyDetails.address.street}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Post Office</Label>
                <p className="text-sm text-gray-900">{applicationData.addressFamilyDetails.address.postOffice}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Pin Code</Label>
                <p className="text-sm text-gray-900">{applicationData.addressFamilyDetails.address.pinCode}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">District</Label>
                <p className="text-sm text-gray-900">{applicationData.addressFamilyDetails.address.district}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">State</Label>
                <p className="text-sm text-gray-900">{applicationData.addressFamilyDetails.address.state}</p>
              </div>
            </div>
          </div>

          {/* Parents */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Parents</h3>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
              <div>
                <Label className="text-sm font-medium text-gray-700">Father's Name</Label>
                <p className="text-sm text-gray-900">{applicationData.addressFamilyDetails.parents.fatherName}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Father's Mobile</Label>
                <p className="text-sm text-gray-900">{applicationData.addressFamilyDetails.parents.fatherMobile}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Mother's Name</Label>
                <p className="text-sm text-gray-900">{applicationData.addressFamilyDetails.parents.motherName}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Mother's Mobile</Label>
                <p className="text-sm text-gray-900">{applicationData.addressFamilyDetails.parents.motherMobile}</p>
              </div>
            </div>
          </div>

          {/* Guardian */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Guardian</h3>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
              <div>
                <Label className="text-sm font-medium text-gray-700">Name</Label>
                <p className="text-sm text-gray-900">{applicationData.addressFamilyDetails.guardian.guardianName}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Place</Label>
                <p className="text-sm text-gray-900">{applicationData.addressFamilyDetails.guardian.guardianPlace}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Contact</Label>
                <p className="text-sm text-gray-900">{applicationData.addressFamilyDetails.guardian.guardianContact}</p>
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
                <div>
                  <Label className="text-sm font-medium text-gray-700">Mode</Label>
                  <p className="text-sm text-gray-900">{program.mode}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Priority</Label>
                  <p className="text-sm text-gray-900">{program.priority}</p>
                </div>
              </div>
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
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education Details */}
      <Card className="rounded-none border-secondary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <GraduationCap className="w-5 h-5 mr-2" />
            Education Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Entrance Exams */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Entrance Exams</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">KMAT</Label>
                <p className="text-sm text-gray-900">
                  {applicationData.educationDetails.entranceExams.kmat.selected ? 'Selected' : 'Not Selected'}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">CMAT</Label>
                <p className="text-sm text-gray-900">
                  {applicationData.educationDetails.entranceExams.cmat.selected ? 'Selected' : 'Not Selected'}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">CAT</Label>
                <p className="text-sm text-gray-900">
                  {applicationData.educationDetails.entranceExams.cat.selected ? 'Selected' : 'Not Selected'}
                </p>
              </div>
            </div>
          </div>

          {/* Education Data */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Education History</h3>
            <div className="space-y-4">
              {applicationData.educationDetails.educationData.map((education) => (
                <div key={education._id} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Examination</Label>
                      <p className="text-sm text-gray-900">{education.examination}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Status</Label>
                      <p className="text-sm text-gray-900 capitalize">{education.passedFailed}</p>
                    </div>
                    {education.yearOfPass && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Year of Pass</Label>
                        <p className="text-sm text-gray-900">{education.yearOfPass}</p>
                      </div>
                    )}
                    {education.percentageMarks && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Percentage</Label>
                        <p className="text-sm text-gray-900">{education.percentageMarks}%</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
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