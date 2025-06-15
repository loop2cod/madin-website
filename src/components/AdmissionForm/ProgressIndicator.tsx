interface ProgressIndicatorProps {
  steps: Array<any>;
  currentStep: number;
}

export const ProgressIndicator = ({ steps, currentStep }: ProgressIndicatorProps) => {
  const progressPercentage = ((currentStep-1) / steps.length) * 100;
  const currentStepData = steps.find(step => step.id === currentStep);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-primary/80">Step {currentStep} of {steps.length}</span>
        <span className="text-sm text-primary/80">{Math.round(progressPercentage)}% Complete</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-secondary h-2 rounded-full transition-all duration-300" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Desktop Step Indicators */}
      <div className="hidden md:flex items-center justify-between relative">
        <div className="absolute top-4 left-0 right-0 h-px bg-gray-200 -z-10"></div>
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
                step.id === currentStep
                  ? "bg-secondary text-white"
                  : step.id < currentStep
                  ? "bg-green-800 text-white"
                  : "bg-white border-2 border-gray-300 text-gray-500"
              }`}
            >
              {step.id}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Step Indicator */}
      <div className="md:hidden">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-sm font-medium">
            {currentStep}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{currentStepData?.id}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
