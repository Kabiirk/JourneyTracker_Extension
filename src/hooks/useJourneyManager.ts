import { useState } from 'react';

export interface IUserJourneyStep {
  id: string;
  name: string;
}

export interface IUserJourneyAction {
  id: string;
  name: string;
  callback?: () => void;
}

export interface IUserJourney {
  steps: IUserJourneyStep[];
  currentStepIndex: number;
  actions: IUserJourneyAction[]; // Include actions in the return type
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (stepId: string) => void;
  performAction: (actionId: string) => void;
  getCurrentStep: () => IUserJourneyStep;
}

export const useUserJourney = (
  initialSteps: IUserJourneyStep[] = [],
  initialStepIndex: number = 0,
  actions: IUserJourneyAction[] = []
): IUserJourney => {
  const [steps] = useState<IUserJourneyStep[]>(initialSteps);
  const [currentStepIndex, setCurrentStepIndex] = useState(initialStepIndex);

  const goToNextStep = () => {
    setCurrentStepIndex((prevIndex) => (prevIndex < steps.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const goToPreviousStep = () => {
    setCurrentStepIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const goToStep = (stepId: string) => {
    const index = steps.findIndex((step) => step.id === stepId);
    if (index !== -1) {
      setCurrentStepIndex(index);
    }
  };

  const performAction = (actionId: string) => {
    const action = actions.find((a) => a.id === actionId);
    if (action && action.callback) {
      action.callback();
    }
  };

  const getCurrentStep = (): IUserJourneyStep | null => {
    return steps[currentStepIndex] || null;
  };

  return {
    steps,
    currentStepIndex,
    actions, // Include actions in the return object
    goToNextStep,
    goToPreviousStep,
    goToStep,
    performAction,
    getCurrentStep
  };
};
