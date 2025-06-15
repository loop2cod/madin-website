import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const AddressAndFamilyDetails = ({handleStep}:any) => {
  const [formData, setFormData] = useState({
    // Address Information
    houseNumber: "",
    street: "",
    postOffice: "",
    pinCode: "",
    district: "",
    state: "",

    // Parents Information
    fatherName: "",
    fatherMobile: "",
    motherName: "",
    motherMobile: "",

    // Guardian Information
    guardianName: "",
    guardianPlace: "",
    guardianContact: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleContinue = () => {
    console.log("Form data:", formData)
    handleStep(4)
    // Handle continue logic
  }

  return (
    <div className="space-y-5 max-w-xl">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">Address & Family Details</h1>
        <p className="text-gray-700 text-sm leading-relaxed">
          Please fill in your address and family information
        </p>
      </div>

      {/* Address Information */}
      <Card className="border border-gray-200 rounded-none px-2 py-4 gap-0">
        <CardHeader className="px-2 py-0">
          <CardTitle className="text-lg">Address Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-2 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="houseNumber" className="text-sm font-medium">
                House Name/Number*
              </Label>
              <Input
                id="houseNumber"
                placeholder="Enter house"
                value={formData.houseNumber}
                onChange={(e) => handleInputChange("houseNumber", e.target.value)}
                className="rounded-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="street" className="text-sm font-medium">
                Place/Street*
              </Label>
              <Input
                id="street"
                placeholder="Enter place/street"
                value={formData.street}
                onChange={(e) => handleInputChange("street", e.target.value)}
                className="rounded-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="postOffice" className="text-sm font-medium">
                Post Office*
              </Label>
              <Input
                id="postOffice"
                placeholder="Enter post office"
                value={formData.postOffice}
                onChange={(e) => handleInputChange("postOffice", e.target.value)}
                className="rounded-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pinCode" className="text-sm font-medium">
                PIN Code*
              </Label>
              <Input
                id="pinCode"
                placeholder="Enter PIN code"
                value={formData.pinCode}
                onChange={(e) => handleInputChange("pinCode", e.target.value)}
                className="rounded-none"
                maxLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="district" className="text-sm font-medium">
                District*
              </Label>
              <Input
                id="district"
                placeholder="Enter district"
                value={formData.district}
                onChange={(e) => handleInputChange("district", e.target.value)}
                className="rounded-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="state" className="text-sm font-medium">
              State*
            </Label>
            <Input
              id="state"
              placeholder="Enter state"
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              className="rounded-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Parents Information */}
      <Card className="border border-gray-200 rounded-none px-2 py-4 gap-0">
        <CardHeader className="px-2 py-0">
          <CardTitle className="text-lg">Parents Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-2 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fatherName" className="text-sm font-medium">
                Father's Name*
              </Label>
              <Input
                id="fatherName"
                placeholder="Enter father's name"
                value={formData.fatherName}
                onChange={(e) => handleInputChange("fatherName", e.target.value)}
                className="rounded-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fatherMobile" className="text-sm font-medium">
                Father's Mobile Number*
              </Label>
              <Input
                id="fatherMobile"
                placeholder="Enter father's mobile"
                value={formData.fatherMobile}
                onChange={(e) => handleInputChange("fatherMobile", e.target.value)}
                className="rounded-none"
                maxLength={10}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="motherName" className="text-sm font-medium">
                Mother's Name*
              </Label>
              <Input
                id="motherName"
                placeholder="Enter mother's name"
                value={formData.motherName}
                onChange={(e) => handleInputChange("motherName", e.target.value)}
                className="rounded-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="motherMobile" className="text-sm font-medium">
                Mother's Mobile Number*
              </Label>
              <Input
                id="motherMobile"
                placeholder="Enter mother's mobile"
                value={formData.motherMobile}
                onChange={(e) => handleInputChange("motherMobile", e.target.value)}
                className="rounded-none"
                maxLength={10}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guardian Information */}
      <Card className="border border-gray-200 rounded-none px-2 py-4 gap-0">
        <CardHeader className="px-2 py-0">
          <CardTitle className="text-lg">Guardian Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-2 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guardianName" className="text-sm font-medium">
                Guardian's Name
              </Label>
              <Input
                id="guardianName"
                placeholder="Enter guardian's name"
                value={formData.guardianName}
                onChange={(e) => handleInputChange("guardianName", e.target.value)}
                className="rounded-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guardianPlace" className="text-sm font-medium">
                Guardian's Place
              </Label>
              <Input
                id="guardianPlace"
                placeholder="Enter guardian's place"
                value={formData.guardianPlace}
                onChange={(e) => handleInputChange("guardianPlace", e.target.value)}
                className="rounded-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guardianContact" className="text-sm font-medium">
              Guardian's Contact Number
            </Label>
            <Input
              id="guardianContact"
              placeholder="Enter guardian's contact"
              value={formData.guardianContact}
              onChange={(e) => handleInputChange("guardianContact", e.target.value)}
              className="rounded-none"
              maxLength={10}
            />
          </div>
        </CardContent>
      </Card>

      {/* Continue Button */}
      <div className="flex">
        <Button
          onClick={handleContinue}
          className="bg-secondary hover:bg-secondary/80 text-white rounded-none px-6"
          disabled={
            !formData.houseNumber ||
            !formData.street ||
            !formData.postOffice ||
            !formData.pinCode ||
            !formData.district ||
            !formData.state ||
            !formData.fatherName ||
            !formData.fatherMobile ||
            !formData.motherName ||
            !formData.motherMobile
          }
        >
          Continue to Confirmation
        </Button>
      </div>
    </div>
  )
}

export default AddressAndFamilyDetails