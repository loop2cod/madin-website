import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'

interface Application {
  applicationId: string
  status: string
  currentStage: string
  createdAt: string
  personalDetails?: {
    fullName: string
    email: string
  }
}

interface ApplicationListProps {
  applications: Application[]
  handleStep: (step: number) => void
  handleViewApplication: (applicationId: string) => void
  handleContinueApplication: (applicationId: string, currentStage: string) => void
}

const ApplicationList = ({
  applications,
  handleStep,
  handleViewApplication,
  handleContinueApplication
}: ApplicationListProps) => {
  // Map API stage to UI step
  const getStepFromStage = (stage: string): number => {
    const stageToStep: Record<string, number> = {
      'mobile_verification': 2, // Move to personal details
      'personal_details': 2,
      'address_family_details': 3,
      'program_selection': 4,
      'declaration': 4,
      'submitted': 4
    };
    
    return stageToStep[stage] || 2;
  };

  const isSubmitted = (stage: string): boolean => {
    return stage === 'submitted';
  };

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">Existing Applications</h1>
        <p className="text-gray-700 text-sm leading-relaxed">
          We found multiple applications associated with your mobile number. Please select one to continue.
        </p>
      </div>

      <div className="space-y-4 max-w-md">
        {applications.map((app) => (
          <div key={app.applicationId} className="border p-4 rounded-sm space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">
                  {app.personalDetails?.fullName || 'Application'}
                </h3>
                <p className="text-sm text-gray-500">
                  ID: {app.applicationId}
                </p>
                <p className="text-sm text-gray-500">
                  Created: {formatDate(app.createdAt)}
                </p>
                <div className="mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    app.status === 'approved' ? 'bg-green-100 text-green-800' : 
                    app.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="space-x-2">
                {isSubmitted(app.currentStage) ? (
                  <Button
                    variant="outline"
                    className="text-sm rounded-none border border-secondary"
                    onClick={() => handleViewApplication(app.applicationId)}
                  >
                    View
                  </Button>
                ) : (
                  <Button
                    className="bg-secondary hover:bg-secondary/80 text-white text-sm rounded-none"
                    onClick={() => handleContinueApplication(app.applicationId, app.currentStage)}
                  >
                    Continue
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <Button
          variant="outline"
          className="text-sm rounded-none border border-secondary"
          onClick={() => handleStep(2)}
        >
          Start New Application
        </Button>
      </div>
    </div>
  )
}

export default ApplicationList