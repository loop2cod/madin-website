import { useState } from 'react';
import { ProgressIndicator } from './ProgressIndicator';
import MobileAdmissionForm from './steps/MobileAdmissionForm';
import PersonalDetails from './steps/PersonalDetails';
import AddressAndFamilyDetails from './steps/AddressAndFamilyDetails';

const steps = [
  { id: 1, name: 'Mobile Verification' },
  { id: 2, name: 'Personal Details' },
  { id: 3, name: 'Address & Family' },
  { id: 4, name: 'Confirmation' }
];

export const AdmissionForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleStep = (step: number) => {
    if (currentStep !== step) {
      setCurrentStep(step);
    }
  };



  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <MobileAdmissionForm 
          handleStep={handleStep} 
          />
        );
      case 2:
        return (
          <PersonalDetails 
          handleStep={handleStep} 
          />
        );
      case 3:
        return (
          <AddressAndFamilyDetails 
          handleStep={handleStep} 
          />
        );
      case 4:
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Confirmation</h2>
          </div>
        );
      default:
        return <MobileAdmissionForm  handleStep={handleStep}  />;
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