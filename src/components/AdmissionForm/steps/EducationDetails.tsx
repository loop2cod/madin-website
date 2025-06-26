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
        const response = await axios.get(
          `${import.meta.env.VITE_ADMISSION_API_URL}/api/v1/admission/application/${applicationId}`
        );
        
        if (response.data.success && response.data.data) {
          const { programSelections, educationDetails } = response.data.data;
          
          if (programSelections && programSelections.length > 0) {
            setProgramSelections(programSelections);
          }
          
          if (educationDetails) {
            setFormData(educationDetails);
          }
        }
      } catch (error: any) {
        console.error('Error fetching education details:', error);
        toast({
          title: "Error",
          description: "Failed to fetch education details. Please try again.",
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

      const response = await axios.post(
        `${import.meta.env.VITE_ADMISSION_API_URL}/api/v1/admission/education-details/${applicationId}`,
        { educationDetails: formData }
      );
          setSubmitting(false);
      if (response.data.success) {
        toast({
          title: "Success",
          description: "Education details saved successfully!",
        });
        handleStep(7); // Move to next step
      } else {
        throw new Error("Failed to save education details");
      }
    } catch (error: any) {
      console.error('Error saving education details:', error);
      toast({
        title: "Error",
        description: "Failed to save education details. Please try again.",
        variant: "destructive",
      });
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
      if (selectedProgram.mode === 'LET') {
        return <DiplomaLETEducationForm formData={formData} setFormData={setFormData} selectedProgram={selectedProgram}  />;
      } else if (selectedProgram.mode === 'Regular' || selectedProgram.mode === 'Part-time') {
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