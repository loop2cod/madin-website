import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


const DiplomaLETEducationForm = ({ formData, setFormData , selectedProgram }:any) => {
  // Initialize default data structure if not already in formData
  useEffect(() => {
    if (!formData.educationData) {
      setFormData({
        ...formData,
        programDetails:selectedProgram,
        educationData: [
          {
            examination: "SSLC/THSLC/CBSE",
            passedFailed: "",
            groupTrade: "",
            period: "",
            yearOfPass: "",
            percentageMarks: "",
            noOfChances: "",
            english: "",
            physics: "",
            chemistry: "",
            maths: "",
          },
          {
            examination: "+2/VHSE",
            passedFailed: "",
            groupTrade: "",
            period: "",
            yearOfPass: "",
            percentageMarks: "",
            noOfChances: "",
            english: "",
            physics: "",
            chemistry: "",
            maths: "",
          },
          {
            examination: "ITI",
            passedFailed: "",
            groupTrade: "",
            period: "",
            yearOfPass: "",
            percentageMarks: "",
            noOfChances: "",
            english: "",
            physics: "",
            chemistry: "",
            maths: "",
          },
        ],
        subjectScores: [
          { examination: "+2/VHSE", physics: "", chemistry: "", maths: "", total: "", remarks: "" },
        ]
      });
    }
  }, [formData, setFormData]);
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

  // Handle input changes for subject scores
  const handleSubjectScoreChange = (index: number, field: string, value: string) => {
    const updatedSubjectScores = [...(formData.subjectScores || [])];
    updatedSubjectScores[index] = {
      ...updatedSubjectScores[index],
      [field]: value
    };
    
    // Calculate total if physics, chemistry, and maths are all filled
    if (field === 'physics' || field === 'chemistry' || field === 'maths') {
      const physics = parseFloat(updatedSubjectScores[index].physics) || 0;
      const chemistry = parseFloat(updatedSubjectScores[index].chemistry) || 0;
      const maths = parseFloat(updatedSubjectScores[index].maths) || 0;
      
      if (physics && chemistry && maths) {
        updatedSubjectScores[index].total = ((physics + chemistry + maths) / 3).toFixed(2);
      }
    }
    
    setFormData({
      ...formData,
      subjectScores: updatedSubjectScores
    });
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-secondary/10">
              <th className="border border-gray-300 p-2 text-left text-sm font-medium">Examination</th>
              <th className="border border-gray-300 p-2 text-left text-sm font-medium">Passed/Failed</th>
              <th className="border border-gray-300 p-2 text-left text-sm font-medium">Group/Trade</th>
              <th className="border border-gray-300 p-2 text-left text-sm font-medium">Period</th>
              <th className="border border-gray-300 p-2 text-left text-sm font-medium min-w-26">Year of Pass</th>
              <th className="border border-gray-300 p-2 text-left text-sm font-medium min-w-24">% of Marks</th>
              <th className="border border-gray-300 p-2 text-left text-sm font-medium">No. of Chances</th>
              <th className="border border-gray-300 p-2 text-left text-sm font-medium">English</th>
              <th className="border border-gray-300 p-2 text-left text-sm font-medium">Physics</th>
              <th className="border border-gray-300 p-2 text-left text-sm font-medium">Chemistry</th>
              <th className="border border-gray-300 p-2 text-left text-sm font-medium">Maths</th>
            </tr>
          </thead>
          <tbody>
            {(formData.educationData || []).map((row:any, index:any) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">
                  <span className="font-normal text-sm">
                    {row.examination}
                  </span>
                </td>
                <td className="border border-gray-300">
                  <Select
                    value={row.passedFailed}
                    onValueChange={(value) => handleEducationDataChange(index, 'passedFailed', value)}
                  >
                    <SelectTrigger className="border-0  w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passed">Passed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="border border-gray-300">
                  <Input
                    value={row.groupTrade}
                    onChange={(e) => handleEducationDataChange(index, 'groupTrade', e.target.value)}
                    className="border-0 rounded-none focus:!ring-0 w-full text-sm shadow-none"
                    placeholder="Group/Trade"
                  />
                </td>
                <td className="border border-gray-300">
                  <Input
                    value={row.period}
                    onChange={(e) => handleEducationDataChange(index, 'period', e.target.value)}
                    className="border-0 rounded-none focus:!ring-0 w-full text-sm shadow-none"
                    placeholder="Period"
                  />
                </td>
                <td className="border border-gray-300">
                  <Input
                    value={row.yearOfPass}
                    onChange={(e) => handleEducationDataChange(index, 'yearOfPass', e.target.value)}
                    className="border-0 rounded-none focus:!ring-0 w-full text-sm shadow-none"
                    placeholder="Year"
                    type="number"
                  />
                </td>
                <td className="border border-gray-300">
                  <Input
                    value={row.percentageMarks}
                    onChange={(e) => handleEducationDataChange(index, 'percentageMarks', e.target.value)}
                    className="border-0 rounded-none focus:!ring-0 w-full text-sm shadow-none"
                    placeholder="%"
                    type="number"
                    max="100"
                  />
                </td>
                <td className="border border-gray-300">
                  <Input
                    value={row.noOfChances}
                    onChange={(e) => handleEducationDataChange(index, 'noOfChances', e.target.value)}
                    className="border-0 rounded-none focus:!ring-0 w-full text-sm shadow-none"
                    placeholder="No."
                    type="number"
                  />
                </td>
                <td className="border border-gray-300">
                  <Input
                    value={row.english}
                    onChange={(e) => handleEducationDataChange(index, 'english', e.target.value)}
                    className="border-0 rounded-none focus:!ring-0 w-full text-sm shadow-none"
                    placeholder="Grade"
                  />
                </td>
                <td className="border border-gray-300">
                  <Input
                    value={row.physics}
                    onChange={(e) => handleEducationDataChange(index, 'physics', e.target.value)}
                    className="border-0 rounded-none focus:!ring-0 w-full text-sm shadow-none"
                    placeholder="Grade"
                  />
                </td>
                <td className="border border-gray-300">
                  <Input
                    value={row.chemistry}
                    onChange={(e) => handleEducationDataChange(index, 'chemistry', e.target.value)}
                    className="border-0 rounded-none focus:!ring-0 w-full text-sm shadow-none"
                    placeholder="Grade"
                  />
                </td>
                <td className="border border-gray-300">
                  <Input
                    value={row.maths}
                    onChange={(e) => handleEducationDataChange(index, 'maths', e.target.value)}
                    className="border-0 rounded-none focus:!ring-0 w-full text-sm shadow-none"
                    placeholder="Grade"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 14 - Subject-wise Scores */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-secondary/10">
              <th className="border border-gray-300 p-2 text-left text-sm font-medium">Examination</th>
              <th className="border border-gray-300 p-2 text-left text-sm font-medium min-w-24">Physics (%)</th>
              <th className="border border-gray-300 p-2 text-left text-sm font-medium min-w-30">Chemistry (%)</th>
              <th className="border border-gray-300 p-2 text-left text-sm font-medium min-w-24">Maths (%)</th>
              <th className="border border-gray-300 p-2 text-left text-sm font-medium">
                Total
              </th>
              <th className="border border-gray-300 p-2 text-left text-sm font-medium">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {(formData.subjectScores || []).map((row:any, index:any) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300">
                  <Input
                    value={row.examination}
                    onChange={(e) => handleSubjectScoreChange(index, 'examination', e.target.value)}
                    className="border-0 rounded-none focus:!ring-0 w-full text-sm shadow-none"
                    placeholder="Examination"
                  />
                </td>
                <td className="border border-gray-300">
                  <Input
                    value={row.physics}
                    onChange={(e) => handleSubjectScoreChange(index, 'physics', e.target.value)}
                    className="border-0 rounded-none focus:!ring-0 w-full text-sm shadow-none"
                    placeholder="%"
                    type="number"
                    max="100"
                  />
                </td>
                <td className="border border-gray-300">
                  <Input
                    value={row.chemistry}
                    onChange={(e) => handleSubjectScoreChange(index, 'chemistry', e.target.value)}
                    className="border-0 rounded-none focus:!ring-0 w-full text-sm shadow-none"
                    placeholder="%"
                    type="number"
                    max="100"
                  />
                </td>
                <td className="border border-gray-300">
                  <Input
                    value={row.maths}
                    onChange={(e) => handleSubjectScoreChange(index, 'maths', e.target.value)}
                    className="border-0 rounded-none focus:!ring-0 w-full text-sm shadow-none"
                    placeholder="%"
                    type="number"
                    max="100"
                  />
                </td>
                <td className="border border-gray-300">
                  <Input
                    value={row.total}
                    readOnly
                    className="border-0 rounded-none focus:!ring-0 w-full text-sm shadow-none"
                    placeholder="Auto-calculated"
                  />
                </td>
                <td className="border border-gray-300">
                  <Input
                    value={row.remarks}
                    onChange={(e) => handleSubjectScoreChange(index, 'remarks', e.target.value)}
                    className="border-0 rounded-none focus:!ring-0 w-full text-sm shadow-none"
                    placeholder="Remarks"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DiplomaLETEducationForm