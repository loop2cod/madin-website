import { useState} from 'react';
import { ProgressIndicator } from './ProgressIndicator';
import MobileAdmissionForm from './steps/MobileAdmissionForm';
import PersonalDetails from './steps/PersonalDetails';
import AddressAndFamilyDetails from './steps/AddressAndFamilyDetails';
import ApplicationFeePayment from './steps/ApplicationFeePayment';
import ApplicationList from './steps/ApplicationList';
import { toast } from '@/Hooks/use-toast';
import axios from 'axios';
import ProgramSelection from './steps/ProgramSelection';
import EducationDetails from './steps/EducationDetails';
import SubmitConfirmation from './steps/SubmitConfirmation';
import ApplicationView from './steps/ApplicationView';




const steps = [
  { id: 1, name: 'Mobile Verification' },
  { id: 2, name: 'Personal Details' },
  { id: 3, name: 'Address & Family' },
  { id: 4, name: 'Application Fee' },
  { id: 5, name: 'Program Selection' },
  { id: 6, name: 'Education Details' },
  { id: 7, name: 'Confirmation & Submition' }
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
  const [viewApplicationId, setViewApplicationId] = useState<string | null>(null);

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
                'education_details': 6,
                'declaration': 7,
                'submitted': 7
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


  const handleViewApplication = (applicationId: string) => {
    setViewApplicationId(applicationId);
  };

  const handleBackFromView = () => {
    setViewApplicationId(null);
  };

  const handleContinueApplication = (applicationId: string, currentStage: string) => {
    // Map API stage to UI step
    const stageToStep: Record<string, number> = {
      'mobile_verification': 2,
      'personal_details': 2,
      'address_family_details': 3,
      'application_fee_payment': 4,
      'program_selection': 5,
      'education_details': 6,
      'declaration': 7,
      'submitted': 7
    };

    const nextStep = stageToStep[currentStage] || 2;

    // Set application ID in state
    setApplicationId(applicationId);
    setShowApplicationList(false);

    // Navigate to the appropriate step
    handleStep(nextStep);
    setShowApplicationList(false);
  };

  const handleEditRejectedApplication = async (applicationId: string) => {
    try {
      // Call backend to reset the rejected application status to pending
      const response = await axios.post(
        `${import.meta.env.VITE_ADMISSION_API_URL}/api/v1/admission/edit-rejected-application`,
        { applicationId }
      );

      if (response.data.success) {
        // Set the application ID
        setApplicationId(applicationId);

        // Hide the application list and move to step 2 (personal details)
        setShowApplicationList(false);

        // Start from personal details (step 2) for editing
        handleStep(2);

        toast({
          title: "Application Ready for Editing",
          description: "You can now edit and resubmit your application.",
        });
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to prepare application for editing.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Error preparing rejected application for editing:', error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to prepare application for editing. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleStartNewApplication = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_ADMISSION_API_URL}/api/v1/admission/create-application`,
        { mobile }
      );

      if (response.data.success) {
        // Set the new application ID
        const newApplicationId = response.data.data.applicationId;
        setApplicationId(newApplicationId);

        // Hide the application list and move to step 2 (personal details)
        setShowApplicationList(false);
        handleStep(2);

        toast({
          title: "New Application Created",
          description: "Your new application has been created successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to create new application.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error creating new application:', error);
      toast({
        title: "Error",
        description: "Failed to create new application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    // If we're viewing a specific application, render the ApplicationView
    if (viewApplicationId) {
      return (
        <ApplicationView
          applicationId={viewApplicationId}
          onBack={handleBackFromView}
        />
      );
    }

    // If we're showing the application list, render that instead of the current step
    if (showApplicationList && existingApplications) {
      return (
        <ApplicationList
          applications={existingApplications}
          handleViewApplication={handleViewApplication}
          handleContinueApplication={handleContinueApplication}
          handleEditRejectedApplication={handleEditRejectedApplication}
          handleStartNewApplication={handleStartNewApplication}
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
            setStep={setStep}
            attempts={attempts}
            isSubmitting={isSubmitting || isCheckingExisting}
            handleMobileSubmit={handleMobileSubmit}
            handleResendOtp={handleResendOtp}
            handleOtpSubmit={handleOtpSubmit}
            isOtpVerified={isOtpVerified}
            handleContinueToNextStep={handleContinueToNextStep}
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
          <EducationDetails
            handleStep={handleStep}
            applicationId={applicationId}
          />
        );
      case 7:
        return (
          <SubmitConfirmation
            handleStep={handleStep}
            applicationId={applicationId}
          />
        );
      case 8:
        return (
          <div className="flex flex-col items-center justify-center py-16 space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-semibold text-gray-900">Application Submitted Successfully!</h1>
              <p className="text-gray-700 text-base max-w-md mx-auto leading-relaxed">
                Your application has been completed and you will be contacted after reviewing the application.
              </p>
            </div>
          </div>
        );
      default:
        return <MobileAdmissionForm handleStep={handleStep} />;
    }
  };

  return (
    <div className="md:max-w-[90vw] mx-auto px-2">
      {currentStep >= 1 && currentStep <= 7 && !showApplicationList && !existingApplications && !viewApplicationId && (<div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Application Form</h1>
        <p className="text-gray-600">Complete your application in a few simple steps.</p>
      </div>
      )}

      {currentStep >= 1 && currentStep <= 7 && !showApplicationList && !existingApplications && !viewApplicationId && (
        <ProgressIndicator steps={steps} currentStep={currentStep} />
      )}

      <div className="mt-8">
        {renderStep()}
      </div>
    </div>
  );
};