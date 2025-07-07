import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from '@/Hooks/use-toast'
import axios from 'axios'

interface AddressAndFamilyDetailsProps {
  handleStep: (step: number) => void
  applicationId: string
}

const AddressAndFamilyDetails = ({ handleStep, applicationId }: AddressAndFamilyDetailsProps) => {
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
          const { addressFamilyDetails } = response.data.data;
          
          if (addressFamilyDetails) {
            // Extract data from nested structure if it exists
            const address = addressFamilyDetails.address || {};
            const parents = addressFamilyDetails.parents || {};
            const guardian = addressFamilyDetails.guardian || {};
            
            setFormData({
              // Address Information
              houseNumber: address.houseNumber || "",
              street: address.street || "",
              postOffice: address.postOffice || "",
              pinCode: address.pinCode || "",
              district: address.district || "",
              state: address.state || "",
              
              // Parents Information
              fatherName: parents.fatherName || "",
              fatherMobile: parents.fatherMobile || "",
              motherName: parents.motherName || "",
              motherMobile: parents.motherMobile || "",
              
              // Guardian Information
              guardianName: guardian.guardianName || "",
              guardianPlace: guardian.guardianPlace || "",
              guardianContact: guardian.guardianContact || ""
            });
          }
        }
      } catch (error: any) {
        console.error("Error fetching application data:", error);
        toast({
          title: "Error",
          description: "Failed to load existing address and family details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExistingData();
  }, [applicationId]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Function to fetch address details from PIN code
  const fetchAddressFromPincode = async (pincode: string) => {
    if (pincode.length !== 6) return;
    
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      
      if (data[0].Status === 'Success') {
        const postOffice = data[0].PostOffice[0];
        
        setFormData(prev => ({
          ...prev,
          district: postOffice.District || '',
          state: postOffice.State || '',
          postOffice: postOffice.Name || ''
        }));
      } else {
        console.error('Invalid PIN code. Please check and try again.');
        toast({
          title: "Error",
          description: "Invalid PIN code. Please check and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching address details:', error);
      toast({
        title: "Error",
        description: "Failed to fetch address details. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Effect to trigger address lookup when PIN code changes
  useEffect(() => {
    if (formData.pinCode.length === 6) {
      fetchAddressFromPincode(formData.pinCode);
    }
  }, [formData.pinCode]);

  const handleContinue = async () => {
    setIsSubmitting(true);
    try {
      // Structure the payload according to the schema
      const payload = {
        applicationId,
        addressFamilyDetails: {
          address: {
            houseNumber: formData.houseNumber,
            street: formData.street,
            postOffice: formData.postOffice,
            pinCode: formData.pinCode,
            district: formData.district,
            state: formData.state,
            country: 'India'
          },
          parents: {
            fatherName: formData.fatherName,
            fatherMobile: formData.fatherMobile,
            motherName: formData.motherName,
            motherMobile: formData.motherMobile
          },
          guardian: {
            guardianName: formData.guardianName,
            guardianPlace: formData.guardianPlace,
            guardianContact: formData.guardianContact
          }
        }
      };
      
      const response = await axios.post(
        `${import.meta.env.VITE_ADMISSION_API_URL}/api/v1/admission/address-family-details`,
        payload
      );
      
      if (response?.data?.success) {
        toast({
          title: "Success",
          description: "Address and family details saved successfully",
        });
        handleStep(4);
      } else {
        toast({
          title: "Error",
          description: response?.data?.message || "Failed to save address and family details",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error saving address and family details:", error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || error?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-secondary"></div>
          <span className="ml-3 text-gray-700">Loading your information...</span>
        </div>
      ) : (
        <>
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pinCode" className="text-sm font-medium">
                    PIN Code*
                  </Label>
                  <Input
                    id="pinCode"
                    placeholder="Enter PIN code"
                    value={formData.pinCode}
                    onChange={(e) => {
                      // Only allow numbers
                      const value = e.target.value.replace(/\D/g, '');
                      handleInputChange("pinCode", value);
                    }}
                    className="rounded-none"
                    maxLength={6}
                    onBlur={(e) => {
                      if (e.target.value.length === 6) {
                        fetchAddressFromPincode(e.target.value);
                      }
                    }}
                    disabled={isSubmitting}
                  />
                </div>
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2 cursor-not-allowed">
                  <Label htmlFor="country" className="text-sm font-medium">
                    Country*
                  </Label>
                  <Input
                    id="country"
                    disabled
                    value="India"
                    className="rounded-none cursor-not-allowed"
                  />
                </div>
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
                    disabled={isSubmitting}
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
                    onChange={(e) => {
                      // Only allow numbers
                      const value = e.target.value.replace(/\D/g, '');
                      handleInputChange("fatherMobile", value);
                    }}
                    className="rounded-none"
                    maxLength={10}
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    onChange={(e) => {
                      // Only allow numbers
                      const value = e.target.value.replace(/\D/g, '');
                      handleInputChange("motherMobile", value);
                    }}
                    className="rounded-none"
                    maxLength={10}
                    disabled={isSubmitting}
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
                   Name
                  </Label>
                  <Input
                    id="guardianName"
                    placeholder="Enter name"
                    value={formData.guardianName}
                    onChange={(e) => handleInputChange("guardianName", e.target.value)}
                    className="rounded-none"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guardianPlace" className="text-sm font-medium">
                   Place
                  </Label>
                  <Input
                    id="guardianPlace"
                    placeholder="Enter place"
                    value={formData.guardianPlace}
                    onChange={(e) => handleInputChange("guardianPlace", e.target.value)}
                    className="rounded-none"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guardianContact" className="text-sm font-medium">
                 Contact Number
                </Label>
                <Input
                  id="guardianContact"
                  placeholder="Enter contact"
                  value={formData.guardianContact}
                  onChange={(e) => {
                    // Only allow numbers
                    const value = e.target.value.replace(/\D/g, '');
                    handleInputChange("guardianContact", value);
                  }}
                  className="rounded-none"
                  maxLength={10}
                  disabled={isSubmitting}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => handleStep(2)}
              disabled={isSubmitting}
              className="rounded-none border-secondary text-secondary"
            >
              Back
            </Button>
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
                !formData.motherMobile ||
                isSubmitting
              }
            >
              {isSubmitting ? "Saving..." : "Continue to Confirmation"}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default AddressAndFamilyDetails