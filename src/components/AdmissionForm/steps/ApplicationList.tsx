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
  programSelections?: {
    programLevel: string
    programName: string
    specialization?: string
    mode?: string
    selected: boolean
    priority: number
    branchPreferences?: {
      branch: string
      priority: number
      _id: string
    }[]
    _id: string
  }[]
}

interface ApplicationListProps {
  applications: Application[]
  handleViewApplication: (applicationId: string) => void
  handleContinueApplication: (applicationId: string, currentStage: string) => void
  handleEditRejectedApplication: (applicationId: string) => void
  handleStartNewApplication: () => void
}

const ApplicationList = ({
  applications,
  handleViewApplication,
  handleContinueApplication,
  handleEditRejectedApplication,
  handleStartNewApplication
}: ApplicationListProps) => {

  const isSubmitted = (stage: string): boolean => {
    return stage === 'submitted';
  };

  const isRejected = (status: string): boolean => {
    return status === 'rejected';
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">Existing Applications</h1>
        <p className="text-gray-700 text-sm leading-relaxed">
          We found multiple applications associated with your mobile number. Please select one to continue.
        </p>
      </div>

      <div className="space-y-4 max-w-md">
        {applications.map((app) => (
          <div key={app.applicationId} className="border p-3 space-y-3">
            <div className="flex justify-between items-start">
              <div className='w-full'>
                <h3 className="font-medium text-gray-900">
                  {app.personalDetails?.fullName || 'Application'}
                </h3>
                <p className="text-sm text-gray-500">
                  ID: {app.applicationId}
                </p>
                <p className="text-sm text-gray-500">
                  Created: {formatDate(app.createdAt)}
                </p>
                
                {/* Program Details */}
                {app.programSelections && app.programSelections.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Program Details:</h4>
                    {app.programSelections.map((program) => (
                      <div key={program._id} className="bg-gray-50 p-2 rounded text-xs space-y-1">
                        <div className="font-medium text-gray-800">
                          {program.programName}
                        </div>
                        <div className="text-gray-600">
                          Level: {program.programLevel.toUpperCase()}
                          {program.mode && ` | Mode: ${program.mode}`}
                          {program.specialization && ` | Specialization: ${program.specialization}`}
                        </div>
                        {program.branchPreferences && program.branchPreferences.length > 0 && (
                          <div className="text-gray-600">
                            Branch: {program.branchPreferences
                              .sort((a, b) => a.priority - b.priority)
                              .map(branch => branch.branch)
                              .join(', ')
                            }
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    app.status === 'draft' ? 'bg-gray-100 text-gray-800' : 
                    app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    app.status === 'verified' ? 'bg-blue-100 text-blue-800' : 
                    app.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    app.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="space-x-2">
                 {isRejected(app.status) ? (
                   <Button
                     className="bg-orange-600 hover:bg-orange-700 text-white text-sm rounded-none"
                     onClick={() => handleEditRejectedApplication(app.applicationId)}
                   >
                     Edit & Resubmit
                   </Button>
                 ) : isSubmitted(app.currentStage) ? (
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
          onClick={handleStartNewApplication}
        >
          Start New Application
        </Button>
      </div>
    </div>
  )
}

export default ApplicationList