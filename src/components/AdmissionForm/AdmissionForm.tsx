import { useState, useEffect } from 'react';
import { ProgressIndicator } from './ProgressIndicator';
import MobileAdmissionForm from './steps/MobileAdmissionForm';
import PersonalDetails from './steps/PersonalDetails';
import AddressAndFamilyDetails from './steps/AddressAndFamilyDetails';
import ApplicationFeePayment from './steps/ApplicationFeePayment';
import ApplicationList from './steps/ApplicationList';
import { toast } from '@/Hooks/use-toast';
import axios from 'axios';
import { Button } from '../ui/button';
import ProgramSelection from './steps/ProgramSelection';


interface ResponseFormat {
  success: boolean;
  message: string;
  data: any;
}

const steps = [
  { id: 1, name: 'Mobile Verification' },
  { id: 2, name: 'Personal Details' },
  { id: 3, name: 'Address & Family' },
  { id: 4, name: 'Application Fee' },
  { id: 5, name: 'Program Selection' },
  { id: 6, name: 'Confirmation' }
];

export const AdmissionForm = () => {
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [currentStep, setCurrentStep] = useState(1);
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile')
  const [attempts, setAttempts] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOtpVerified, setIsOtpVerified] = useState(false)
  const [applicationId, setApplicationId] = useState('')

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('admissionFormData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setMobile(parsedData.mobile || '');
      setStep(parsedData.step || 'mobile');
      setIsOtpVerified(parsedData.isOtpVerified || false);
      setApplicationId(parsedData.applicationId || '');
      
      // If OTP was verified and we're still on step 1, move to step 2
      if (parsedData.isOtpVerified && parsedData.currentStep > 1) {
        setCurrentStep(parsedData.currentStep);
      }
    }
  }, []);

  // Save data to localStorage whenever relevant state changes
  useEffect(() => {
    const dataToSave = {
      mobile,
      step,
      isOtpVerified,
      currentStep,
      applicationId
    };
    localStorage.setItem('admissionFormData', JSON.stringify(dataToSave));
  }, [mobile, step, isOtpVerified, currentStep, applicationId]);

  const handleMobileSubmit = async () => {
    try {
      if (mobile.length === 10) {
        setIsSubmitting(true)
        const response = await axios.post(`${import.meta.env.VITE_ADMISSION_API_URL}/api/v1/admission/send-otp`, { mobile })
        if (response?.data?.success) {
          setIsSubmitting(false)
          setStep('otp')
        }
        else {
          setIsSubmitting(false)
          setAttempts(prev => prev + 1)
          toast({
            title: "Error",
            description: "Invalid mobile number",
            variant: "destructive",
          })
        }
      }
    } catch (error: any) {
      setIsSubmitting(false)
      toast({
        title: "Error",
        description: error?.response?.data?.message || error?.message || "Something went wrong",
        variant: "destructive",
      })
    }
  }

  const handleResendOtp = async () => {
    setAttempts(0)
    setOtp('')
    if (mobile.length === 10) {
      setIsSubmitting(true)
      try {
        const response = await axios.post(`${import.meta.env.VITE_ADMISSION_API_URL}/api/v1/admission/send-otp`, { mobile })
        if (response?.data?.success) {
          setIsSubmitting(false)
          setStep('otp')
          toast({
            title: "Success",
            description: "OTP sent successfully",
          })
        }
        else {
          setIsSubmitting(false)
          setAttempts(prev => prev + 1)
          toast({
            title: "Error",
            description: "Invalid mobile number",
            variant: "destructive",
          })
        }
      } catch (error: any) {
        setIsSubmitting(false)
        toast({
          title: "Error",
          description: error?.response?.data?.message || error?.message || "Something went wrong",
          variant: "destructive",
        })
      }
    } else {
      toast({
        title: "Error",
        description: "Invalid mobile number",
        variant: "destructive",
      })
    }
  }

  const handleOtpSubmit = async () => {
    if (otp.length === 6) {
      setIsSubmitting(true)
      try {
        const response = await axios.post(`${import.meta.env.VITE_ADMISSION_API_URL}/api/v1/admission/verify-otp`, { 
          mobile, 
          otp 
        })
        
        if (response?.data?.success) {
          setIsSubmitting(false)
          setIsOtpVerified(true)
          toast({
            title: "Success",
            description: "OTP verified successfully",
          })
        } else {
          setIsSubmitting(false)
          setAttempts(prev => prev + 1)
          toast({
            title: "Error",
            description: response?.data?.message || "Invalid OTP",
            variant: "destructive",
          })
        }
      } catch (error: any) {
        setIsSubmitting(false)
        setAttempts(prev => prev + 1)
        toast({
          title: "Error",
          description: error?.response?.data?.message || error?.message || "Invalid OTP",
          variant: "destructive",
        })
      }
    }
  }

  const handleStep = (step: number) => {
    if (currentStep !== step) {
      setCurrentStep(step);
    }
  };

  const [existingApplications, setExistingApplications] = useState<any>(null);
  const [isCheckingExisting, setIsCheckingExisting] = useState(false);
  const [showApplicationList, setShowApplicationList] = useState(false);

  const handleContinueToNextStep = async () => {
    if (isOtpVerified) {
      setIsCheckingExisting(true);
      try {
        const response = await axios.post(`${import.meta.env.VITE_ADMISSION_API_URL}/api/v1/admission/check-existing`, { 
          mobile 
        });
        
        if (response?.data?.success) {
          const { exists, multipleApplications, data } = response.data;
          
          if (exists) {
            if (multipleApplications) {
              // Multiple applications found
              setExistingApplications(data.applications);
              setShowApplicationList(true);
            } else {
              // Single application found
              const { currentStage, applicationId: appId } = data;
              
              // Save the application ID
              setApplicationId(appId);
              
              // Map API stage to UI step
              const stageToStep = {
                'mobile_verification': 2, // Move to personal details
                'personal_details': 2,
                'address_family_details': 3,
                'application_fee_payment': 4,
                'program_selection': 5,
                'declaration': 6,
                'submitted': 6
              };
              
              const nextStep = stageToStep[currentStage as keyof typeof stageToStep] || 2;
              handleStep(nextStep);
            }
          } else {
            // New application
            if (data && data.applicationId) {
              setApplicationId(data.applicationId);
            }
            handleStep(2);
          }
        } else {
          toast({
            title: "Error",
            description: response?.data?.message || "Failed to check existing applications",
            variant: "destructive",
          });
          handleStep(2); // Fallback to step 2
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error?.response?.data?.message || error?.message || "Something went wrong",
          variant: "destructive",
        });
        handleStep(2); // Fallback to step 2
      } finally {
        setIsCheckingExisting(false);
      }
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('admissionFormData');
  };

  const handleViewApplication = (applicationId: string) => {
    // Implement view functionality - could redirect to a view page
    toast({
      title: "View Application",
      description: `Viewing application ${applicationId}`,
    });
    // For now, we'll just log it
    console.log('View application:', applicationId);
  };

  const handleContinueApplication = (applicationId: string, currentStage: string) => {
    // Map API stage to UI step
    const stageToStep: Record<string, number> = {
      'mobile_verification': 2,
      'personal_details': 2,
      'address_family_details': 3,
      'application_fee_payment': 4,
      'program_selection': 5,
      'declaration': 6,
      'submitted': 6
    };
    
    const nextStep = stageToStep[currentStage] || 2;
    
    // Set application ID in state
    setApplicationId(applicationId);
    
    // Navigate to the appropriate step
    handleStep(nextStep);
    setShowApplicationList(false);
  };


  const renderStep = () => {
    // If we're showing the application list, render that instead of the current step
    if (showApplicationList && existingApplications) {
      return (
        <ApplicationList 
          applications={existingApplications}
          handleStep={handleStep}
          handleViewApplication={handleViewApplication}
          handleContinueApplication={handleContinueApplication}
        />
      );
    }

    // Otherwise, render the current step
    switch (currentStep) {
      case 1:
        return (
          <MobileAdmissionForm 
          mobile={mobile}
          setMobile={setMobile}
          otp={otp}
          setOtp={setOtp}
          handleStep={handleStep} 
          step={step}
          attempts={attempts}
          isSubmitting={isSubmitting || isCheckingExisting}
          handleMobileSubmit={handleMobileSubmit}
          handleResendOtp={handleResendOtp}
          handleOtpSubmit={handleOtpSubmit}
          isOtpVerified={isOtpVerified}
          handleContinueToNextStep={handleContinueToNextStep}
          clearLocalStorage={clearLocalStorage}
          />
        );
      case 2:
        return (
          <PersonalDetails 
          handleStep={handleStep}
          applicationId={applicationId}
          />
        );
      case 3:
        return (
          <AddressAndFamilyDetails 
          handleStep={handleStep}
          applicationId={applicationId}
          />
        );
      case 4:
        return (
          <ApplicationFeePayment
            handleStep={handleStep}
            applicationId={applicationId}
          />
        );
      case 5:
        return (
          <ProgramSelection
            handleStep={handleStep}
            applicationId={applicationId}
          />
        );
      case 6:
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Confirmation</h2>
            <p className="mb-4 text-gray-700">
              Thank you for completing your application. Your application has been submitted successfully.
            </p>
            <Button
              variant="outline"
              onClick={() => handleStep(5)}
              disabled={isSubmitting}
              className="rounded-none border-secondary text-secondary"
            >
              Back
            </Button>
          </div>
        );
      default:
        return <MobileAdmissionForm handleStep={handleStep} />;
    }
  };

  return (
    <div className="md:max-w-[90vw] mx-auto px-2">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Application Form</h1>
        <p className="text-gray-600">Complete your application in a few simple steps.</p>
      </div>

      <ProgressIndicator steps={steps} currentStep={currentStep} />

      <div className="mt-8">
        {renderStep()}
      </div>
    </div>
  );
};