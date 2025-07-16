import  { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from '@/Hooks/use-toast'
import axios from 'axios'

interface SubmitConfirmationProps {
  handleStep: (step: number) => void
  applicationId: string
}

interface ApplicationData {
  _id: string
  mobile: string
  whatsapp: string
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
    specialization: string
    selected: boolean
    priority: number
    _id: string
    branchPreferences: string[]
  }>
  educationDetails: {
    programDetails: {
      programLevel: string
      programName: string
      specialization: string
      selected: boolean
      priority: number
      _id: string
      branchPreferences: string[]
    }
    entranceExams: {
      kmat: { selected: boolean; score: string }
      cmat: { selected: boolean; score: string }
      cat: { selected: boolean; score: string }
    }
    educationData: Array<{
      examination: string
      passedFailed: string
      groupSubject: string
      period: string
      yearOfPass: string
      percentageMarks: string
      boardUniversity: string
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

const SubmitConfirmation = ({ handleStep, applicationId }: SubmitConfirmationProps) => {
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [antiRaggingAccepted, setAntiRaggingAccepted] = useState(false)
  const [antiDrugAccepted, setAntiDrugAccepted] = useState(false)
  const [digitalSignature, setDigitalSignature] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  const handleSubmit = async () => {
    if (!antiRaggingAccepted || !antiDrugAccepted) {
      toast({
        title: "Required Undertakings",
        description: "Please accept both anti-ragging and anti-drug undertakings to proceed",
        variant: "destructive",
      })
      return
    }

    if (!digitalSignature.trim()) {
      toast({
        title: "Digital Signature Required",
        description: "Please provide your digital signature to complete the declaration",
        variant: "destructive",
      })
      return
    }
    if(digitalSignature !== applicationData?.personalDetails.fullName) {
      toast({
        title: "Digital Signature Mismatch",
        description: "Please provide your digital signature as per the name on the declaration form",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const declarationPayload = {
        agreed: true,
        digitalSignature: digitalSignature.trim(),
        agreedAt: new Date().toISOString()
      }

      const response = await axios.post(
        `${import.meta.env.VITE_ADMISSION_API_URL}/api/v1/admission/declaration/${applicationId}`,
        declarationPayload
      )

      if (response?.data?.success) {

        toast({
          title: "Application Completed Successfully!",
          description: "Your application has been completed and you will be contacted after reviewing the application.",
        })
        
        // Set submission success state
        setIsSubmitted(true)
        
        // Navigate to next step or completion page
        handleStep(8)
      } else {
        toast({
          title: "Submission Failed",
          description: response?.data?.message || "Failed to submit declaration. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      console.error("Error submitting declaration:", error)
      toast({
        title: "Submission Failed",
        description: error?.response?.data?.message || error?.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-secondary"></div>
        <span className="ml-3 text-gray-700">Loading application details...</span>
      </div>
    )
  }

  // Show success UI after submission
  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold text-gray-900">Application Submitted Successfully!</h1>
          <p className="text-gray-700 text-base max-w-md mx-auto leading-relaxed">
            Your application has been completed and you will be contacted after reviewing the application.
          </p>
        </div>
        <div className="pt-4">
          <Button
            onClick={() => window.location.reload()}
            className="bg-secondary hover:bg-secondary/80 text-white rounded-none px-8"
          >
            Submit Another Application
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">Submit Application</h1>
        <p className="text-gray-700 text-sm leading-relaxed">
          Please review your application details and accept the required undertakings to submit your application.
        </p>
      </div>

      {/* Application Summary */}
      {applicationData && (
        <div className="space-y-4">
          {/* Personal Details */}
          <Card className='gap-2 py-3 rounded-none border-secondary/20'>
            <CardHeader className='px-3'>
              <CardTitle className="text-lg">Personal Details</CardTitle>
            </CardHeader>
            <CardContent className='px-3'>
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
                <div>
                  <Label className="text-sm font-medium text-gray-700">Mobile</Label>
                  <p className="text-sm text-gray-900">{applicationData.mobile}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Anti-Ragging Undertaking */}
      <Card className='gap-2 py-3 rounded-none border-none shadow-none'>
        <CardHeader className='px-3'>
          <CardTitle className="text-lg text-red-700">Anti-Ragging Undertaking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-3">
          <div className="text-xs md:text-sm leading-relaxed">
            <p className="font-medium mb-3">
              Undertaking from the Students as per the provisions of anti-ragging verdict by the Hon'ble Supreme Court
            </p>
            <p className="mb-3">
              I, Mr./Ms. <span className="font-semibold">{applicationData?.personalDetails.fullName || '........................'}</span>, 
              selected to {applicationData?.educationDetails.programDetails.programName || 'Diploma courses'} at <span className="font-semibold">Madin College of Engineering and Management </span> 
              do hereby undertake on this day <span className="font-semibold">{new Date().getDate()}</span> month <span className="font-semibold">{new Date().toLocaleString('default', { month: 'long' })}</span> year <span className="font-semibold">{new Date().getFullYear()}</span>, the following with respect to above subject.
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>That I understand the directives of the Hon'ble Supreme Court of India on anti-ragging.</li>
              <li>That I understand the meaning of Ragging and know that the ragging in any form is a punishable offence and the same is banned by the Court of Law.</li>
              <li>That I have not been found or charged for my involvement in any kind of ragging in the past. However, I undertake to face disciplinary action/legal proceedings including expulsion from the Institute if the above statement is found to be untrue or the facts are concealed, at any stage in future.</li>
              <li>That I shall not resort to ragging in any form at any place and shall abide by the rules/laws prescribed by the Courts, State / Union Government and the Institute authorities for the purpose from time to time.</li>
            </ol>
            <div className="mt-4">
              <p className="mt-2">I hereby fully endorse the undertaking made by my child / ward.</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox
              id="anti-ragging"
              checked={antiRaggingAccepted}
              onCheckedChange={(checked) => setAntiRaggingAccepted(checked === true)}
              disabled={isSubmitting}
            />
            <Label
              htmlFor="anti-ragging"
              className="text-xs md:text-sm font-medium leading-none text-gray-700 cursor-pointer"
            >
              I have read and accept the anti-ragging undertaking*
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Anti-Drug Declaration */}
   <Card className='gap-2 py-3 rounded-none border-none shadow-none'>
        <CardHeader className='px-3'>
          <CardTitle className="text-lg text-red-700">Anti-Drug Declaration Form</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-3">
          <div className="text-xs md:text-sm leading-relaxed">
            <p className="font-medium mb-3">
              TO BE SIGNED BY THE PARENT AND STUDENT (as per the Narcotics Drugs and Psychotropic Substances Act 1985)
            </p>
            <p className="mb-3">
              I, Mr./Ms. <span className="font-semibold">{applicationData?.personalDetails.fullName || '........................'}</span>, 
              son/daughter of Mr./Mrs. <span className="font-semibold">{applicationData?.addressFamilyDetails.parents.fatherName || applicationData?.addressFamilyDetails.parents.motherName || '........................'}</span> Residing at (address) <span className="font-semibold">{applicationData?.addressFamilyDetails.address ? `${applicationData.addressFamilyDetails.address.houseNumber}, ${applicationData.addressFamilyDetails.address.street}, ${applicationData.addressFamilyDetails.address.postOffice}, ${applicationData.addressFamilyDetails.address.district} ` : '........................'}</span> 
              admitted to {applicationData?.educationDetails.programDetails.programName || 'Diploma program'} at <span className="font-semibold">Madin College of Engineering and Management </span> 
              do hereby undertake on this day <span className="font-semibold">{new Date().getDate()}</span> month <span className="font-semibold">{new Date().toLocaleString('default', { month: 'long' })}</span> year <span className="font-semibold">{new Date().getFullYear()}</span>, the following with respect to above subject.
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>That I understand the Narcotics Drugs and Psychotropic Substances Act 1985 on stringent provisions for the control and regulation of operations relating to narcotic drugs and psychotropic substances</li>
              <li>That I am aware that the possession, use, sale and distribution of alcohol/tobacco/any psychoactive substances are wrong and harmful.</li>
              <li>That I shall refrain from using, being under the influence of, possessing, furnishing, distributing, selling or conspiring to sell or possess, or being in the chain of sale or distribution of alcohol/ tobacco/any psychoactive substances within the premises of the Polytechnic College/institute or during any activities by the Polytechnic College/institute.</li>
              <li>That I have not been found or charged for my involvement in any kind of drug abuse in the past. However, I undertake to face disciplinary action/legal proceedings including expulsion from the Institute if the above statement is found to be untrue or the facts are concealed, at any stage in future.</li>
              <li>That I shall not resort to drug abuse in any form at any place and shall abide by the rules/laws prescribed by the Courts, State / Union Government and the Institute authorities for the purpose from time to time.</li>
              <li>That I shall report to the authorities of the institution any irregular behavior that I observe in relation to the possession, use, sale and distribution of alcohol/tobacco/any psychoactive substances which may have occurred at the institution or during any activities Conducted by any students or institution.</li>
              <li>That I shall support and actively participate in any substance use prevention education programmes which may be organized by the institution/government which would enable me to be a better student and citizen of India.</li>
              <li>That I shall co-operate with the authorities of the institution and other relevant authorities in their investigation of any substance-related incident of which I may have information, and to prevent the possession, use, sale and distribution of any psychoactive substances in or around my Polytechnic College/institute.</li>
            </ol>
            <div className="mt-4">
              <p>Name of the student: {applicationData?.personalDetails.fullName || '.............................'}</p>
              <p className="mt-2">I hereby fully endorse the undertaking made by my child / ward.</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox
              id="anti-drug"
              checked={antiDrugAccepted}
              onCheckedChange={(checked) => setAntiDrugAccepted(checked === true)}
              disabled={isSubmitting}
            />
            <Label
              htmlFor="anti-drug"
              className="text-xs  md:text-sm font-medium leading-none text-gray-700 cursor-pointer"
            >
              I have read and accept the anti-drug declaration*
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Digital Signature */}
      <Card className='gap-2 py-3 rounded-none border-none shadow-none'>
        <CardHeader className='px-3'>
          <CardTitle className="text-base">Digital Signature</CardTitle>
        </CardHeader>
        <CardContent className='px-3'>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="digitalSignature" className="text-xs font-medium text-gray-700">
                Full Name*
              </Label>
              <Input
                id="digitalSignature"
                placeholder="Type your full name as digital signature"
                value={digitalSignature}
                onChange={(e) => setDigitalSignature(e.target.value)}
                className="w-full max-w-md rounded-none text-xs"
                disabled={isSubmitting}
              />
              <p className="text-xs text-gray-600">
                By typing your full name above, you are providing your digital signature for this application.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => handleStep(5)}
          disabled={isSubmitting}
          className="rounded-none px-6"
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!antiRaggingAccepted || !antiDrugAccepted || !digitalSignature.trim() || isSubmitting}
          className="bg-secondary hover:bg-secondary/80 text-white rounded-none px-6"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </div>
    </div>
  )
}

export default SubmitConfirmation