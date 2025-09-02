import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from '@/Hooks/use-toast';
import axios from 'axios';
import { Loader2, ChevronUp, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface ProgramSelectionProps {
  handleStep: (step: number) => void;
  applicationId: string;
}


const BRANCHES = {
  REGULAR: [
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical and Electronics Engineering",
    "Computer Engineering",
    "Automobile Engineering",
    "Architecture"
  ],
    PART_TIME: [
    "Electrical and Electronics Engineering",
  ],
  LET: [
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical and Electronics Engineering",
    "Computer Engineering",
    "Automobile Engineering"
  ]
};

const ProgramSelection = ({ handleStep, applicationId }: ProgramSelectionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProgramType, setSelectedProgramType] = useState<'diploma' | 'mba' | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<'Regular' | 'Part-time' | 'LET' | null>(null);
  // Store branch selections for each mode separately
  const [branchSelections, setBranchSelections] = useState<{
    Regular: string[];
    'Part-time': string[];
    LET: string[];
  }>({
    Regular: [],
    'Part-time': [],
    LET: []
  });
  // This is a computed value based on the selected mode
  const selectedBranches = selectedMode ? branchSelections[selectedMode] : [];
  const programs = [
    {
      id: 'diploma-eng',
      name: 'Diploma in Engineering',
      type: 'diploma',
      modes: ['Regular', 'Part-time', 'LET']
    },
    {
      id: 'mba-regular',
      name: 'MBA (Regular)',
      type: 'mba'
    }
  ];

  useEffect(() => {
    const fetchApplicationData = async () => {
      if (!applicationId) return;
      
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_ADMISSION_API_URL}/api/v1/admission/application/${applicationId}`
        );
        
        if (response?.data?.success && response.data.data) {
          const programSelections = response.data.data.programSelections;
          
          if (programSelections && programSelections.length > 0) {
            // Get the first program selection (assuming we're showing one at a time)
            const selection = programSelections[0];
            
            // Set program type
            if (selection.programLevel === 'diploma') {
              setSelectedProgramType('diploma');
              
              // Find the matching program ID
              const diplomaProgram = programs.find(p => 
                p.type === 'diploma' && p.name === selection.programName
              );
              
              if (diplomaProgram) {
                setSelectedProgram(diplomaProgram.id);
              }
              
              // Set mode if it exists
              if (selection.mode) {
                setSelectedMode(selection.mode as 'Regular' | 'Part-time' | 'LET');
              }
              
              // Set branch preferences if they exist
              if (selection.branchPreferences && selection.branchPreferences.length > 0 && selection.mode) {
                // Sort branch preferences by priority
                const sortedBranches = [...selection.branchPreferences]
                  .sort((a, b) => a.priority - b.priority)
                  .map(bp => bp.branch);
                
                // Update branch selections for the specific mode
                setBranchSelections(prev => ({
                  ...prev,
                  [selection.mode]: sortedBranches
                }));
              }
            } else if (selection.programLevel === 'mba') {
              setSelectedProgramType('mba');
              
              // Find the matching program ID
              const mbaProgram = programs.find(p => 
                p.type === 'mba' && p.name === selection.programName
              );
              
              if (mbaProgram) {
                setSelectedProgram(mbaProgram.id);
              }
            }
          }
        }
      } catch (error: any) {
        console.error("Error fetching application data:", error);
        toast({
          title: "Error",
          description: "Failed to load application data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchApplicationData();
  }, [applicationId]);

  const handleSubmit = async () => {
    if (!selectedProgram) {
      toast({
        title: "Error",
        description: "Please select a program to continue",
        variant: "destructive",
      });
      return;
    }

    // For diploma programs, mode is required
    if (selectedProgramType === 'diploma' && !selectedMode) {
      toast({
        title: "Error",
        description: "Please select a mode for your diploma program",
        variant: "destructive",
      });
      return;
    }

    // For all diploma modes, at least one branch must be selected
    if (selectedProgramType === 'diploma' && 
        selectedMode && 
        selectedBranches.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one branch preference",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Find the selected program details
      const selectedProgramDetails = programs.find(p => p.id === selectedProgram);
      
      if (!selectedProgramDetails) {
        throw new Error("Selected program not found");
      }

      // Prepare the payload based on program type
      let programSelections = [];
      
      if (selectedProgramType === 'diploma') {
        // Format branch preferences with priority
        const branchPreferences = selectedBranches.map((branch, index) => ({
          branch,
          priority: index + 1
        }));

        programSelections.push({
          programLevel: 'diploma',
          programName: selectedProgramDetails.name,
          mode: selectedMode,
          branchPreferences,
          selected: true,
          priority: 1
        });
      } else if (selectedProgramType === 'mba') {
        programSelections.push({
          programLevel: 'mba',
          programName: selectedProgramDetails.name,
          specialization: "General", // Default specialization if not specified
          selected: true,
          priority: 1
        });
      }

      const response = await axios.post(
        `${import.meta.env.VITE_ADMISSION_API_URL}/api/v1/admission/add-program-selection/${applicationId}`,
        { 
          programSelections
        }
      );
      
      if (response?.data?.success) {
        toast({
          title: "Success",
          description: "Program selection saved successfully",
        });
        
        // Proceed to next step
        handleStep(6);
      } else {
        toast({
          title: "Error",
          description: response?.data?.message || "Failed to save program selection",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error saving program selection:", error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || error?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProgramTypeSelect = (type: 'diploma' | 'mba') => {
    setSelectedProgramType(type);
    setSelectedProgram('');
    setSelectedMode(null);
    // Reset branch selections when changing program type
    if (type === 'mba') {
      setBranchSelections({
        Regular: [],
        'Part-time': [],
        LET: []
      });
    }
  };

  const handleProgramSelect = (programId: string) => {
    setSelectedProgram(programId);
    setSelectedMode(null);
    // Don't reset branch selections here
  };

  const handleModeSelect = (mode: 'Regular' | 'Part-time' | 'LET') => {
    setSelectedMode(mode);
    // Mode is changed but branch selections are preserved
  };

  const handleBranchToggle = (branch: string) => {
    if (!selectedMode) return;
    
    setBranchSelections(prev => {
      const currentSelections = [...prev[selectedMode]];
      
      // If branch is already selected, remove it
      if (currentSelections.includes(branch)) {
        return {
          ...prev,
          [selectedMode]: currentSelections.filter(b => b !== branch)
        };
      } 
      // Otherwise add it to the end (maintaining selection order for priority)
      else {
        return {
          ...prev,
          [selectedMode]: [...currentSelections, branch]
        };
      }
    });
  };
  
  const moveBranchUp = (index: number) => {
    if (!selectedMode || index <= 0) return; // Can't move up if already at the top
    
    setBranchSelections(prev => {
      const currentSelections = [...prev[selectedMode]];
      // Swap with the item above
      [currentSelections[index], currentSelections[index - 1]] = 
        [currentSelections[index - 1], currentSelections[index]];
      
      return {
        ...prev,
        [selectedMode]: currentSelections
      };
    });
  };
  
  const moveBranchDown = (index: number) => {
    if (!selectedMode) return;
    
    setBranchSelections(prev => {
      const currentSelections = [...prev[selectedMode]];
      if (index >= currentSelections.length - 1) return prev; // Can't move down if already at the bottom
      
      // Swap with the item below
      [currentSelections[index], currentSelections[index + 1]] = 
        [currentSelections[index + 1], currentSelections[index]];
      
      return {
        ...prev,
        [selectedMode]: currentSelections
      };
    });
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-secondary"></div>
        <span className="ml-3 text-gray-700">Loading program details...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-xl">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">Program Selection</h1>
        <p className="text-gray-700 text-sm leading-relaxed">
          Select the program you wish to apply for
        </p>
      </div>

      <Card className="border border-gray-200 rounded-none p-2 gap-0">
        <CardHeader className="p-2">
          <CardTitle>Select Program Type</CardTitle>
          <CardDescription>
            Choose between Diploma or MBA programs
          </CardDescription>
        </CardHeader>
        <CardContent className="p-2">
          <RadioGroup 
            value={selectedProgramType || ''} 
            onValueChange={(value: 'diploma' | 'mba') => handleProgramTypeSelect(value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="diploma" id="diploma-type" />
              <Label htmlFor="diploma-type">Diploma Programs</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mba" id="mba-type" />
              <Label htmlFor="mba-type">MBA Programs</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {selectedProgramType && (
        <Card className="border border-gray-200 rounded-none p-2 gap-0">
          <CardHeader className="p-2">
            <CardTitle>
              {selectedProgramType === 'diploma' ? 'Diploma' : 'MBA'} Programs
            </CardTitle>
            <CardDescription>
              Select your preferred {selectedProgramType === 'diploma' ? 'Diploma' : 'MBA'} program
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-2">
            <RadioGroup 
              value={selectedProgram} 
              onValueChange={handleProgramSelect}
            >
              {programs
                .filter(program => program.type === selectedProgramType)
                .map(program => (
                  <div key={program.id} className="flex flex-col space-y-2 border px-2 py-3 rounded-none mb-4">
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value={program.id} id={`program-${program.id}`} />
                      <div className="grid gap-1.5">
                        <Label htmlFor={`program-${program.id}`} className="font-medium">
                          {program.name}
                        </Label>
                      </div>
                    </div>

                    {/* Mode selection for diploma programs */}
                    {selectedProgram === program.id && program.type === 'diploma' && program.modes && (
                      <div className="ml-8 space-y-3">
                        <h4 className="text-sm font-medium">Select Mode:</h4>
                        <RadioGroup 
                          value={selectedMode || ''} 
                          onValueChange={handleModeSelect}
                          className="flex gap-4"
                        >
                          {program.modes.map(mode => (
                            <div key={mode} className="flex items-center space-x-2">
                              <RadioGroupItem value={mode} id={`mode-${mode}`} />
                              <Label htmlFor={`mode-${mode}`}>{mode}</Label>
                            </div>
                          ))}
                        </RadioGroup>

                        {/* Branch selection for Regular/Part-time Diploma */}
                        {(selectedMode === 'Regular') && (
                          <div className="space-y-3 mt-4">
                            <h4 className="text-sm font-medium">Select Branch Preferences:</h4>
                            <div className="grid grid-cols-1 gap-2">
                              {BRANCHES.REGULAR.map(branch => {
                                const priorityIndex = selectedBranches.indexOf(branch);
                                const priority = priorityIndex !== -1 ? priorityIndex + 1 : null;
                                return (
                                  <div key={branch} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`branch-${branch}`}
                                      checked={selectedBranches.includes(branch)}
                                      onCheckedChange={() => handleBranchToggle(branch)}
                                    />
                                    <div className="flex items-center space-x-2 flex-1">
                                      {priority && (
                                        <span className="w-6 h-6 bg-secondary text-white text-xs rounded-full flex items-center justify-center font-medium">
                                          {priority}
                                        </span>
                                      )}
                                      <Label htmlFor={`branch-${branch}`} className="flex-1">{branch}</Label>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <p className="text-xs text-gray-500">Select your preferred branches in order of priority</p>
                            
                            {/* Selection overview for Regular/Part-time */}
                            {selectedBranches.length > 0 && (
                              <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded">
                                <h5 className="text-sm font-medium mb-2">Your Branch Preferences:</h5>
                                <div className="space-y-2">
                                  {selectedBranches.map((branch, index) => (
                                    <div key={branch} className="flex items-center justify-between">
                                      <div className="flex items-center">
                                        <span className="w-6 text-center font-medium">{index + 1}.</span>
                                        <span className="text-sm">{branch}</span>
                                      </div>
                                      <div className="flex space-x-1">
                                        <Button 
                                          type="button" 
                                          variant="ghost" 
                                          size="sm" 
                                          className="h-7 w-7 p-0"
                                          onClick={() => moveBranchUp(index)}
                                          disabled={index === 0}
                                        >
                                          <ChevronUp className="h-4 w-4" />
                                        </Button>
                                        <Button 
                                          type="button" 
                                          variant="ghost" 
                                          size="sm" 
                                          className="h-7 w-7 p-0"
                                          onClick={() => moveBranchDown(index)}
                                          disabled={index === selectedBranches.length - 1}
                                        >
                                          <ChevronDown className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                             {(selectedMode === 'Part-time') && (
                          <div className="space-y-3 mt-4">
                            <h4 className="text-sm font-medium">Select Branch Preferences:</h4>
                            <div className="grid grid-cols-1 gap-2">
                              {BRANCHES.PART_TIME.map(branch => {
                                const priorityIndex = selectedBranches.indexOf(branch);
                                const priority = priorityIndex !== -1 ? priorityIndex + 1 : null;
                                return (
                                  <div key={branch} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`branch-${branch}`}
                                      checked={selectedBranches.includes(branch)}
                                      onCheckedChange={() => handleBranchToggle(branch)}
                                    />
                                    <div className="flex items-center space-x-2 flex-1">
                                      {priority && (
                                        <span className="w-6 h-6 bg-secondary text-white text-xs rounded-full flex items-center justify-center font-medium">
                                          {priority}
                                        </span>
                                      )}
                                      <Label htmlFor={`branch-${branch}`} className="flex-1">{branch}</Label>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <p className="text-xs text-gray-500">Select your preferred branches in order of priority</p>
                            
                            {/* Selection overview for Regular/Part-time */}
                            {selectedBranches.length > 0 && (
                              <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded">
                                <h5 className="text-sm font-medium mb-2">Your Branch Preferences:</h5>
                                <div className="space-y-2">
                                  {selectedBranches.map((branch, index) => (
                                    <div key={branch} className="flex items-center justify-between">
                                      <div className="flex items-center">
                                        <span className="w-6 text-center font-medium">{index + 1}.</span>
                                        <span className="text-sm">{branch}</span>
                                      </div>
                                      <div className="flex space-x-1">
                                        <Button 
                                          type="button" 
                                          variant="ghost" 
                                          size="sm" 
                                          className="h-7 w-7 p-0"
                                          onClick={() => moveBranchUp(index)}
                                          disabled={index === 0}
                                        >
                                          <ChevronUp className="h-4 w-4" />
                                        </Button>
                                        <Button 
                                          type="button" 
                                          variant="ghost" 
                                          size="sm" 
                                          className="h-7 w-7 p-0"
                                          onClick={() => moveBranchDown(index)}
                                          disabled={index === selectedBranches.length - 1}
                                        >
                                          <ChevronDown className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Branch selection for LET Diploma */}
                        {selectedMode === 'LET' && (
                          <div className="space-y-3 mt-4">
                            <h4 className="text-sm font-medium">Select Branch Preferences:</h4>
                            <div className="grid grid-cols-1 gap-2">
                              {BRANCHES.LET.map(branch => {
                                const priorityIndex = selectedBranches.indexOf(branch);
                                const priority = priorityIndex !== -1 ? priorityIndex + 1 : null;
                                return (
                                  <div key={branch} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`branch-let-${branch}`}
                                      checked={selectedBranches.includes(branch)}
                                      onCheckedChange={() => handleBranchToggle(branch)}
                                    />
                                    <div className="flex items-center space-x-2 flex-1">
                                      {priority && (
                                        <span className="w-6 h-6 bg-secondary text-white text-xs rounded-full flex items-center justify-center font-medium">
                                          {priority}
                                        </span>
                                      )}
                                      <Label htmlFor={`branch-let-${branch}`} className="flex-1">{branch}</Label>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <p className="text-xs text-gray-500">Select your preferred branches in order of priority</p>
                            
                            {/* Selection overview for LET */}
                            {selectedBranches.length > 0 && (
                              <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded">
                                <h5 className="text-sm font-medium mb-2">Your Branch Preferences:</h5>
                                <div className="space-y-2">
                                  {selectedBranches.map((branch, index) => (
                                    <div key={branch} className="flex items-center justify-between">
                                      <div className="flex items-center">
                                        <span className="w-6 text-center font-medium">{index + 1}.</span>
                                        <span className="text-sm">{branch}</span>
                                      </div>
                                      <div className="flex space-x-1">
                                        <Button 
                                          type="button" 
                                          variant="ghost" 
                                          size="sm" 
                                          className="h-7 w-7 p-0"
                                          onClick={() => moveBranchUp(index)}
                                          disabled={index === 0}
                                        >
                                          <ChevronUp className="h-4 w-4" />
                                        </Button>
                                        <Button 
                                          type="button" 
                                          variant="ghost" 
                                          size="sm" 
                                          className="h-7 w-7 p-0"
                                          onClick={() => moveBranchDown(index)}
                                          disabled={index === selectedBranches.length - 1}
                                        >
                                          <ChevronDown className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => handleStep(4)}
          disabled={isSubmitting}
          className="rounded-none border-secondary text-secondary"
        >
          Back
        </Button>
        
        <Button
          onClick={handleSubmit}
          disabled={
            isSubmitting || 
            !selectedProgram || 
            (selectedProgramType === 'diploma' && selectedMode === null) ||
            (selectedProgramType === 'diploma' && selectedMode !== null && selectedBranches.length === 0)
          }
          className="bg-secondary hover:bg-secondary/80 text-white rounded-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Continue'
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProgramSelection;