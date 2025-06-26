import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

const MBAEducationForm = ({ formData, setFormData, selectedProgram }: any) => {
    // Initialize default data structure if not already in formData
    useEffect(() => {
        if (!formData.educationData) {
            setFormData({
                ...formData,
                programDetails:selectedProgram,
                educationData: [
                    {
                        examination: "SSLC",
                        passedFailed: "",
                        groupSubject: "",
                        period: "",
                        yearOfPass: "",
                        percentageMarks: "",
                        boardUniversity: "",
                    },
                    {
                        examination: "+2",
                        passedFailed: "",
                        groupSubject: "",
                        period: "",
                        yearOfPass: "",
                        percentageMarks: "",
                        boardUniversity: "",
                    },
                    {
                        examination: "Degree",
                        passedFailed: "",
                        groupSubject: "",
                        period: "",
                        yearOfPass: "",
                        percentageMarks: "",
                        boardUniversity: "",
                    },
                ],
                achievements: "",
                collegeName: "",
                entranceExams: {
                    kmat: { selected: false, score: "" },
                    cmat: { selected: false, score: "" },
                    cat: { selected: false, score: "" }
                }
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

    // Handle changes for achievements and college name
    const handleTextChange = (field: string, value: string) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    // Handle changes for entrance exam checkboxes and scores
    const handleEntranceExamChange = (exam: string, field: 'selected' | 'score', value: any) => {
        // If unchecking the box, also clear the score
        if (field === 'selected' && value === false) {
            setFormData({
                ...formData,
                entranceExams: {
                    ...(formData.entranceExams || {}),
                    [exam]: {
                        ...(formData.entranceExams?.[exam] || {}),
                        selected: false,
                        score: ""
                    }
                }
            });
        } else {
            setFormData({
                ...formData,
                entranceExams: {
                    ...(formData.entranceExams || {}),
                    [exam]: {
                        ...(formData.entranceExams?.[exam] || {}),
                        [field]: value
                    }
                }
            });
        }
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-secondary/10">
                            <th className="border border-gray-300 p-2 text-left text-sm font-medium">Examination</th>
                            <th className="border border-gray-300 p-2 text-left text-sm font-medium">Passed/Failed</th>
                            <th className="border border-gray-300 p-2 text-left text-sm font-medium">Group/Subject</th>
                            <th className="border border-gray-300 p-2 text-left text-sm font-medium">Period</th>
                            <th className="border border-gray-300 p-2 text-left text-sm font-medium min-w-26">Year of Pass</th>
                            <th className="border border-gray-300 p-2 text-left text-sm font-medium min-w-24">% of Marks</th>
                            <th className="border border-gray-300 p-2 text-left text-sm font-medium">Board/University</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(formData.educationData || []).map((row: any, index: number) => (
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
                                        <SelectTrigger className="border-0 w-full">
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
                                        value={row.groupSubject}
                                        onChange={(e) => handleEducationDataChange(index, 'groupSubject', e.target.value)}
                                        className="border-0 rounded-none focus:!ring-0 w-full text-sm shadow-none"
                                        placeholder="Group/Subject"
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
                                        value={row.boardUniversity}
                                        onChange={(e) => handleEducationDataChange(index, 'boardUniversity', e.target.value)}
                                        className="border-0 rounded-none focus:!ring-0 w-full text-sm shadow-none"
                                        placeholder="Board/University"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <div className="my-4 max-w-lg">
                    <Label htmlFor="achievements" className="text-sm font-medium text-gray-700">
                        Achievements/Work experience if any
                    </Label>
                    <Textarea
                        id="achievements"
                        value={formData.achievements || ""}
                        onChange={(e) => handleTextChange('achievements', e.target.value)}
                        className="mt-2 rounded-none"
                        placeholder="Describe your achievements and work experience..."
                        rows={3}
                    />
                </div>

                <div className="space-y-4 max-w-lg">
                    <div>
                        <Label htmlFor="college-name" className="text-sm font-medium text-gray-700">
                            Name of the College where UG was completed
                        </Label>
                        <Input
                            id="college-name"
                            value={formData.collegeName || ""}
                            onChange={(e) => handleTextChange('collegeName', e.target.value)}
                            className="mt-2 rounded-none"
                            placeholder="Enter college name"
                        />
                    </div>
                </div>

                <div className="space-y-4 mt-4">
                    <Label className="text-sm font-medium text-gray-700">
                        Name and Score of the Entrance Examination attended
                    </Label>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="kmat"
                                    checked={formData.entranceExams?.kmat?.selected || false}
                                    onCheckedChange={(checked) => 
                                        handleEntranceExamChange('kmat', 'selected', checked === true)
                                    }
                                    className="cursor-pointer rounded-none"
                                />
                                <Label htmlFor="kmat" className="text-sm font-medium">
                                    KMAT
                                </Label>
                            </div>
                            {formData.entranceExams?.kmat?.selected && (
                                <Input
                                    value={formData.entranceExams?.kmat?.score || ""}
                                    onChange={(e) => handleEntranceExamChange('kmat', 'score', e.target.value)}
                                    placeholder="Enter KMAT score"
                                    type="number"
                                    className="rounded-none"
                                />
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="cmat"
                                    checked={formData.entranceExams?.cmat?.selected || false}
                                    onCheckedChange={(checked) => 
                                        handleEntranceExamChange('cmat', 'selected', checked === true)
                                    }
                                    className="cursor-pointer rounded-none"
                                />
                                <Label htmlFor="cmat" className="text-sm font-medium">
                                    CMAT
                                </Label>
                            </div>
                            {formData.entranceExams?.cmat?.selected && (
                                <Input
                                    value={formData.entranceExams?.cmat?.score || ""}
                                    onChange={(e) => handleEntranceExamChange('cmat', 'score', e.target.value)}
                                    placeholder="Enter CMAT score"
                                    type="number"
                                    className="rounded-none"
                                />
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="cat"
                                    checked={formData.entranceExams?.cat?.selected || false}
                                    onCheckedChange={(checked) => 
                                        handleEntranceExamChange('cat', 'selected', checked === true)
                                    }
                                    className="cursor-pointer rounded-none"
                                />
                                <Label htmlFor="cat" className="text-sm font-medium">
                                    CAT
                                </Label>
                            </div>
                            {formData.entranceExams?.cat?.selected && (
                                <Input
                                    value={formData.entranceExams?.cat?.score || ""}
                                    onChange={(e) => handleEntranceExamChange('cat', 'score', e.target.value)}
                                    placeholder="Enter CAT score"
                                    type="number"
                                    className="rounded-none"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MBAEducationForm