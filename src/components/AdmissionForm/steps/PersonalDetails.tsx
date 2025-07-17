import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from '@/components/ui/date-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from '@/Hooks/use-toast'
import axios from 'axios'
import { format } from 'date-fns'

interface PersonalDetailsProps {
  handleStep: (step: number) => void
  applicationId: string
}

const PersonalDetails = ({ handleStep, applicationId }: PersonalDetailsProps) => {
  const [dob, setDob] = useState<Date | null>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    religion: "",
    email: "",
    agreeToTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchExistingData = async () => {
      if (!applicationId) return;

      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_ADMISSION_API_URL}/api/v1/admission/application/${applicationId}`
        );

        if (response?.data?.success && response.data.data) {
          const { personalDetails } = response.data.data;

          if (personalDetails) {
            setFormData({
              fullName: personalDetails.fullName || "",
              gender: personalDetails.gender || "",
              religion: personalDetails.religion || "",
              email: personalDetails.email || "",
              agreeToTerms: true,
            });

            if (personalDetails.dob) {
              setDob(new Date(personalDetails.dob));
            }
          }
        }
      } catch (error: any) {
        console.error("Error fetching application data:", error);
        toast({
          title: "Error",
          description: "Failed to load existing application data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchExistingData();
  }, [applicationId]);


  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleContinue = async () => {
    if (!dob) return;

    setIsSubmitting(true);
    try {
      // Format date as YYYY-MM-DD
      const formattedDob = format(dob, 'yyyy-MM-dd');

      const payload = {
        applicationId,
        personalDetails: {
          ...formData,
          dob: formattedDob,
        }
      };

      const response = await axios.post(
        `${import.meta.env.VITE_ADMISSION_API_URL}/api/v1/admission/personal-details`,
        payload
      );

      if (response?.data?.success) {
        toast({
          title: "Success",
          description: "Personal details saved successfully",
        });
        handleStep(3);
      } else {
        toast({
          title: "Error",
          description: response?.data?.message || "Failed to save personal details",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error saving personal details:", error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || error?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const religions = [
    "Muslim",
    "Hindu",
    "Christian",
    "Sikh",
    "Buddhist",
    "Jain",
    "Other"
  ]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">New Application</h1>
        <p className="text-gray-700 text-sm leading-relaxed">
          Please provide your personal details to continue with the application
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-secondary"></div>
          <span className="ml-3 text-gray-700">Loading your information...</span>
        </div>
      ) : (
        <>
          {/* Form Fields */}
          <div className="max-w-md space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name (As per SSLC or 10th)*
              </Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="w-full rounded-none"
                disabled={isSubmitting}
              />
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Date of Birth*</Label>
              <DatePicker
                date={dob}
                setDate={setDob}
                placeholder="Select your date of birth"
                className="w-full rounded-none h-10"
                disabled={isSubmitting}
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Gender*</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange("gender", value)}
                disabled={isSubmitting}
              >
                <SelectTrigger className="w-full rounded-none">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Religion */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Religion*</Label>
              <Select
                value={formData.religion}
                onValueChange={(value) => handleInputChange("religion", value)}
                disabled={isSubmitting}
              >
                <SelectTrigger className="w-full rounded-none">
                  <SelectValue placeholder="Select religion" />
                </SelectTrigger>
                <SelectContent>
                  {religions.map(religion => (
                    <SelectItem key={religion} value={religion.toLowerCase()}>
                      {religion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address*
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full rounded-none"
                disabled={isSubmitting}
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                defaultChecked={formData.agreeToTerms}
                onCheckedChange={(checked) =>
                  handleInputChange("agreeToTerms", checked === true)
                }
                disabled={isSubmitting}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the terms and conditions*
                </label>
                <p className="text-xs text-muted-foreground">
                  By continuing, you agree that all information provided is accurate.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex">
            <Button
              onClick={handleContinue}
              disabled={
                !formData.fullName ||
                !dob ||
                !formData.gender ||
                !formData.religion ||
                !formData.email ||
                !formData.agreeToTerms ||
                isSubmitting
              }
              className="bg-secondary hover:bg-secondary/80 text-white rounded-none px-6"
            >
              {isSubmitting ? "Saving..." : "Continue"}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default PersonalDetails