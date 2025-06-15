import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from '@/components/ui/date-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const PersonalDetails = ({handleStep}:any) => {
  const [dob, setDob] = useState<Date | null>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    religion: "",
    email: "",
    agreeToTerms: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleContinue = () => {
    console.log("Continuing with:", { ...formData, dob })
    handleStep(3)
    // Handle continue logic
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

      {/* Form Fields */}
      <div className="max-w-md space-y-4">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
            Full Name*
          </Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className="w-full rounded-none"
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
          />
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Gender*</Label>
          <Select
            value={formData.gender}
            onValueChange={(value) => handleInputChange("gender", value)}
          >
            <SelectTrigger className="w-full rounded-none">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Religion */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Religion</Label>
          <Select
            value={formData.religion}
            onValueChange={(value) => handleInputChange("religion", value)}
          >
            <SelectTrigger className="w-full rounded-none">
              <SelectValue placeholder="Select religion (optional)" />
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
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex">
        <Button
          onClick={handleContinue}
          disabled={!formData.fullName || 
                   !dob || 
                   !formData.gender || 
                   !formData.email}
          className="bg-secondary hover:bg-secondary/80 text-white rounded-none px-6"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

export default PersonalDetails