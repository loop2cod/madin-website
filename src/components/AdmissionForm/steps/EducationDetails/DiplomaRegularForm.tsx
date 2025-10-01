import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"

const DiplomaRegularForm = ({ formData, setFormData,selectedProgram }: any) => {
  // Initialize default data structure if not already in formData
  useEffect(() => {
    if (!formData.educationData) {
      setFormData({
        ...formData,
        programDetails: selectedProgram,
        educationData: [
          {
            examination: "SSLC/THSLC/CBSE",
            passedFailed: "Passed", // SSLC is compulsory and assumed passed
            groupTrade: "",
            yearOfPass: "",
            percentageMarks: "",
            registrationNumber: "",
            isCompulsory: true
          }
        ],
      });
    }
  }, [formData, setFormData]);

  // Available additional examinations
  const availableExaminations = [
    { value: "+2/VHSE", label: "+2/VHSE" },
    { value: "ITI", label: "ITI" },
    { value: "KGCE", label: "KGCE" },
    { value: "Diploma", label: "Diploma" },
    { value: "Degree", label: "Degree" }
  ];

  // Add new examination
  const addExamination = (examinationType: string) => {
    const newExamination = {
      examination: examinationType,
      passedFailed: "",
      groupTrade: "",
      yearOfPass: "",
      percentageMarks: "",
      registrationNumber: "",
      isCompulsory: false
    };

    setFormData({
      ...formData,
      educationData: [...(formData.educationData || []), newExamination]
    });
  };

  // Remove examination
  const removeExamination = (index: number) => {
    const updatedEducationData = [...(formData.educationData || [])];
    updatedEducationData.splice(index, 1);
    
    setFormData({
      ...formData,
      educationData: updatedEducationData
    });
  };

  // Get examinations that are already added
  const getAddedExaminations = () => {
    return (formData.educationData || []).map((exam: any) => exam.examination);
  };

  // Get available examinations that haven't been added yet
  const getAvailableToAdd = () => {
    const addedExams = getAddedExaminations();
    return availableExaminations.filter(exam => !addedExams.includes(exam.value));
  };

  // Handle input changes for education data
  const handleEducationDataChange = (index: number, field: string, value: string) => {
    const updatedEducationData = [...(formData.educationData || [])];
    updatedEducationData[index] = {
      ...updatedEducationData[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      educationData: updatedEducationData
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 p-4 border">
        <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-2">Education Qualifications</h3>
        <p className="text-xs md:text-sm text-gray-600">
          Please provide details of your academic qualifications. 
          <span className="text-red-600 font-medium"> SSLC/THSLC/CBSE is mandatory</span> for all applicants.
        </p>
      </div>

      {/* Education Cards */}
      <div className="space-y-2">
        {(formData.educationData || []).map((row: any, index: number) => (
          <Card key={index} className={`transition-all duration-200 hover:shadow-md ${
            row.isCompulsory ? 'ring-2 ring-red-100 border-red-200 bg-red-50/30' : 'border-gray-200'
          }`}>
            <CardHeader>
              <div className="flex justify-between sm:flex-row sm:items-center sm:justify-between gap-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <span className="bg-secondary/10 text-secondary px-2 py-1.5 rounded-full text-xs font-medium">
                    {index + 1}
                  </span>
                  {row.examination}
                  {row.isCompulsory && (
                    <Badge variant="destructive" className="text-xs">
                      Required
                    </Badge>
                  )}
                  {!row.isCompulsory && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExamination(index)}
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </CardTitle>
                
                {/* Status Badge - Mobile First */}
                <div className="flex justify-start sm:justify-end">
                  {row.isCompulsory ? (
                    <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                      ✓ Passed
                    </Badge>
                  ) : (
                    <div className="w-full sm:w-auto sm:min-w-[120px]">
                      <Select
                        value={row.passedFailed}
                        onValueChange={(value) => handleEducationDataChange(index, 'passedFailed', value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Passed">✓ Passed</SelectItem>
                          <SelectItem value="Failed">✗ Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-2">
              {/* Form Grid - Responsive */}
              <div className={`grid gap-4 ${
                row.isCompulsory 
                  ? 'grid-cols-1 sm:grid-cols-3' 
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              }`}>
                
                {/* Group/Trade - Only for non-compulsory exams */}
                {!row.isCompulsory && (
                  <div className="space-y-2">
                    <Label htmlFor={`groupTrade-${index}`} className="text-sm font-medium text-gray-700">
                      Group/Trade
                    </Label>
                    <Input
                      id={`groupTrade-${index}`}
                      value={row.groupTrade}
                      onChange={(e) => handleEducationDataChange(index, 'groupTrade', e.target.value)}
                      className="w-full"
                      placeholder="e.g., Electronics, IT"
                    />
                  </div>
                )}

                {/* Year of Pass */}
                <div className="space-y-2">
                  <Label htmlFor={`yearOfPass-${index}`} className="text-sm font-medium text-gray-700">
                    Year of Passing
                    {row.isCompulsory && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  <Input
                    id={`yearOfPass-${index}`}
                    value={row.yearOfPass}
                    onChange={(e) => handleEducationDataChange(index, 'yearOfPass', e.target.value)}
                    className="w-full"
                    placeholder="e.g., 2020"
                    type="number"
                    min="1950"
                    max={new Date().getFullYear()}
                  />
                </div>

                {/* Percentage */}
                <div className="space-y-2">
                  <Label htmlFor={`percentageMarks-${index}`} className="text-sm font-medium text-gray-700">
                    Percentage (%)
                    {row.isCompulsory && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  <div className="relative">
                    <Input
                      id={`percentageMarks-${index}`}
                      value={row.percentageMarks}
                      onChange={(e) => handleEducationDataChange(index, 'percentageMarks', e.target.value)}
                      className="w-full pr-8"
                      placeholder="85.5"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                      %
                    </span>
                  </div>
                </div>

                {/* Registration Number */}
                <div className="space-y-2">
                  <Label htmlFor={`registrationNumber-${index}`} className="text-sm font-medium text-gray-700">
                    Registration Number
                    {row.isCompulsory && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  <Input
                    id={`registrationNumber-${index}`}
                    value={row.registrationNumber}
                    onChange={(e) => handleEducationDataChange(index, 'registrationNumber', e.target.value)}
                    className="w-full"
                    placeholder="Registration number"
                  />
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Completion Status:</span>
                  <div className="flex items-center gap-2">
                    {[
                      { field: 'yearOfPass', label: 'Year' },
                      { field: 'percentageMarks', label: 'Percentage' },
                      { field: 'registrationNumber', label: 'Reg. No.' }
                    ].map(({ field, label }) => (
                      <div key={field} className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${
                          row[field] ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                        <span className={row[field] ? 'text-green-600' : 'text-gray-400'}>
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Examination Section */}
      {getAvailableToAdd().length > 0 && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50/50">
          <div className="text-center space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Add Additional Qualification
              </h4>
              <p className="text-xs text-gray-500">
                Add other educational qualifications if applicable
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {getAvailableToAdd().map((exam) => (
                <Button
                  key={exam.value}
                  variant="outline"
                  size="sm"
                  onClick={() => addExamination(exam.value)}
                  className="h-8 text-xs border-secondary text-secondary hover:bg-secondary hover:text-white"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add {exam.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-blue-600 text-xs">i</span>
          </div>
          <div>
            <p className="font-medium mb-1">Important Notes:</p>
            <ul className="space-y-1 text-xs">
              <li>• SSLC/THSLC/CBSE qualification is mandatory for all diploma programs</li>
              <li>• Fill in details for additional qualifications if applicable</li>
              <li>• Ensure all information matches your certificates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiplomaRegularForm