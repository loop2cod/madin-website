import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/Hooks/use-toast';
import axios from 'axios';
import MBAEducationForm from './EducationDetails/MBAEducationForm';
import DiplomaLETEducationForm from './EducationDetails/DiplomaLETEducationForm';
import DiplomaRegularForm from './EducationDetails/DiplomaRegularForm';

interface EducationDetailsProps {
  handleStep: (step: number) => void;
  applicationId: string;
}

interface ProgramSelection {
  programLevel: string;
  programName: string;
  mode?: string;
  specialization?: string;
  branchPreferences: {
    branch: string;
    priority: number;
    _id: string;
  }[];
  selected: boolean;
  priority: number;
  _id: string;
}


const EducationDetails = ({ handleStep, applicationId }: EducationDetailsProps) => {
  const [programSelections, setProgramSelections] = useState<ProgramSelection[]>([]);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Fetch existing data if available
  useEffect(() => {
    const fetchEducationDetails = async () => {
      if (!applicationId) return;
      
      try {
        setLoading(true);
        
        // Fetch general application data first for program selections
        const appResponse = await axios.get(
          `${import.meta.env.VITE_ADMISSION_API_URL}/api/v1/admission/application/${applicationId}`
        );
        
        if (appResponse.data.success && appResponse.data.data) {
          const { programSelections } = appResponse.data.data;
          
          if (programSelections && programSelections.length > 0) {
            setProgramSelections(programSelections);
          }
        }
        
        // Try to fetch existing education details
        try {
          const educationResponse = await axios.get(
            `${import.meta.env.VITE_ADMISSION_API_URL}/api/v1/admission/education-details/${applicationId}`
          );
          
          if (educationResponse.data.success && educationResponse.data.data) {
            setFormData(educationResponse.data.data);
          }
        } catch (educationError: any) {
          // If education details don't exist yet, that's okay - user will fill them
          if (educationError.response?.status !== 404) {
            console.error('Error fetching existing education details:', educationError);
          }
        }
        
      } catch (error: any) {
        console.error('Error fetching application data:', error);
        toast({
          title: "Error",
          description: "Failed to load application data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchEducationDetails();
  }, [applicationId]);

  const handleSubmit = async () => {
    if (!applicationId || submitting) return;
    
    try {
      setSubmitting(true);
      
      // Validate form data before submission
      if (!formData.educationData || formData.educationData.length === 0) {
        toast({
          title: "Validation Error",
          description: "Please fill in your education details.",
          variant: "destructive",
        });
        setSubmitting(false);
        return;
      }

      // Get the selected program to determine validation requirements
      const selectedProgram = programSelections.find(p => p.selected);
      
      if (selectedProgram && selectedProgram.programLevel === 'mba') {
        // For MBA, validate that SSLC, +2/VHSE, and Degree are all present
        const requiredExaminations = ['SSLC/THSLC/CBSE', '+2/VHSE', 'Degree'];
        const presentExaminations = formData.educationData.map((entry: any) => entry.examination);
        const missingExaminations = requiredExaminations.filter(exam => !presentExaminations.includes(exam));
        
        if (missingExaminations.length > 0) {
          toast({
            title: "Validation Error",
            description: `MBA programs require SSLC/THSLC/CBSE, +2/VHSE, and Degree qualifications. Missing: ${missingExaminations.join(', ')}`,
            variant: "destructive",
          });
          return;
        }

        // Validate required fields for each mandatory examination
        for (const exam of requiredExaminations) {
          const examEntry = formData.educationData.find((entry: any) => entry.examination === exam);
          if (examEntry) {
            const requiredFields = exam === 'SSLC/THSLC/CBSE' 
              ? ['yearOfPass', 'percentageMarks', 'registrationNumber']
              : ['groupSubject', 'yearOfPass', 'percentageMarks', 'registrationNumber'];
            
            const missingFields = requiredFields.filter(field => !examEntry[field] || !examEntry[field].trim());
            
            if (missingFields.length > 0) {
              toast({
                title: "Validation Error",
                description: `${exam} details are incomplete. Please fill in: ${missingFields.join(', ')}`,
                variant: "destructive",
              });
              return;
            }
          }
        }
      } else {
        // For non-MBA programs, validate SSLC/THSLC/CBSE only
        const sslcEntry = formData.educationData.find((entry: any) => 
          entry.examination === "SSLC/THSLC/CBSE" || entry.isCompulsory
        );
        
        if (sslcEntry) {
          const requiredFields = ['yearOfPass', 'percentageMarks', 'registrationNumber'];
          const missingFields = requiredFields.filter(field => !sslcEntry[field]);
          
          if (missingFields.length > 0) {
            toast({
              title: "Validation Error",
              description: "SSLC/THSLC/CBSE details are mandatory. Please fill in Year of Pass, Percentage, and Registration Number.",
              variant: "destructive",
            });
            return;
          }
        }
      }

      const response = await axios.post(
        `${import.meta.env.VITE_ADMISSION_API_URL}/api/v1/admission/education-details/${applicationId}`,
        { educationDetails: formData }
      );

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Education details saved successfully!",
        });
        handleStep(7); // Move to next step
      } else {
        throw new Error(response.data.message || "Failed to save education details");
      }
    } catch (error: any) {
      console.error('Error saving education details:', error);
      
      let errorMessage = "Failed to save education details. Please try again.";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors) {
        errorMessage = error.response.data.errors.join(", ");
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderEducationForm = () => {
    if (loading) {
      return <div className="p-4 text-center">Loading...</div>;
    }
    
    if (!programSelections || programSelections.length === 0) {
      return (
        <div className="p-4 text-center">
          <p className="text-red-500 mb-4">No program selection found.</p>
          <Button 
            variant="outline" 
            onClick={() => handleStep(5)}
            className="rounded-none border-secondary text-secondary"
          >
            Go back and select a program
          </Button>
        </div>
      );
    }
    
    // Get the selected program
    const selectedProgram = programSelections.find(p => p.selected);
    
    if (!selectedProgram) {
      return (
        <div className="p-4 text-center">
          <p className="text-red-500 mb-4">No selected program found.</p>
          <Button 
            variant="outline" 
            onClick={() => handleStep(5)}
            className="rounded-none border-secondary text-secondary"
          >
            Go back and select a program
          </Button>
        </div>
      );
    }
    
    // Render form based on program level and mode
    if (selectedProgram.programLevel === 'mba') {
      return <MBAEducationForm formData={formData} setFormData={setFormData} selectedProgram={selectedProgram} />;
    } else if (selectedProgram.programLevel === 'diploma') {
      if (selectedProgram.mode === 'let' || selectedProgram.mode === 'LET') {
        return <DiplomaLETEducationForm formData={formData} setFormData={setFormData} selectedProgram={selectedProgram}  />;
      } else if (selectedProgram.mode === 'regular' || selectedProgram.mode === 'Regular' || 
                 selectedProgram.mode === 'part-time' || selectedProgram.mode === 'Part-time') {
        return <DiplomaRegularForm formData={formData} setFormData={setFormData} selectedProgram={selectedProgram} />;
      }
    }
    
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 mb-4">Unsupported program selection.</p>
        <p className="mb-4">Please contact support or go back and select a different program.</p>
        <Button 
          variant="outline" 
          onClick={() => handleStep(5)}
          className="rounded-none border-secondary text-secondary"
        >
          Go back
        </Button>
      </div>
    );
  };

  return (
    <div className="bg-white">
      <h2 className="text-xl font-semibold mb-6">Education Details</h2>
      
      {renderEducationForm()}
      
      <div className="mt-6 flex justify-between">
        <Button
          variant="outline"
          onClick={() => handleStep(5)}
          className="rounded-none border-secondary text-secondary"
        >
          Back
        </Button>
        
        <Button
          onClick={handleSubmit}
          className="rounded-none bg-secondary hover:bg-secondary/80 text-white cursor-pointer transition-colors duration-300 ease-in-out"
          disabled={loading || submitting}
        >
          {submitting ? "Saving..." : "Save & Continue"}
        </Button>
      </div>
    </div>
  );
};

export default EducationDetails;