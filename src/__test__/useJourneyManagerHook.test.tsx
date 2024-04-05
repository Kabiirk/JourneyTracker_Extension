import { renderHook, act } from '@testing-library/react-hooks';
import { useUserJourney } from '../hooks/useJourneyManager';

// Mock steps and actions for testing
const steps = [
  { id: 'step1', name: 'Step 1' },
  { id: 'step2', name: 'Step 2' },
  { id: 'step3', name: 'Step 3' },
];
const actions = [
  { id: 'action1', name: 'Action 1', callback: jest.fn() },
  { id: 'action2', name: 'Action 2', callback: jest.fn() },
];

describe('useUserJourney', () => {
  test('initializes with correct initial step and steps', () => {
    const { result } = renderHook(() => useUserJourney(steps, 1, actions));

    expect(result.current.currentStepIndex).toBe(1);
    expect(result.current.steps).toEqual(steps);
  });

  test('goes to next step', () => {
    const { result } = renderHook(() => useUserJourney(steps, 0, actions));

    act(() => {
      result.current.goToNextStep();
    });

    expect(result.current.currentStepIndex).toBe(1);
  });

  test('does not go beyond last step when going to next step', () => {
    const { result } = renderHook(() => useUserJourney(steps, steps.length - 1, actions));

    act(() => {
      result.current.goToNextStep();
    });

    expect(result.current.currentStepIndex).toBe(steps.length - 1);
  });

  test('goes to previous step', () => {
    const { result } = renderHook(() => useUserJourney(steps, 1, actions));

    act(() => {
      result.current.goToPreviousStep();
    });

    expect(result.current.currentStepIndex).toBe(0);
  });

  test('does not go beyond first step when going to previous step', () => {
    const { result } = renderHook(() => useUserJourney(steps, 0, actions));

    act(() => {
      result.current.goToPreviousStep();
    });

    expect(result.current.currentStepIndex).toBe(0);
  });

  test('goes to specific step by id', () => {
    const { result } = renderHook(() => useUserJourney(steps, 0, actions));

    act(() => {
      result.current.goToStep('step2');
    });

    expect(result.current.currentStepIndex).toBe(1);
  });

  test('performs action callback', () => {
    const { result } = renderHook(() => useUserJourney(steps, 0, actions));

    act(() => {
      result.current.performAction('action1');
    });

    expect(actions[0].callback).toHaveBeenCalledTimes(1);
  });

  test('returns correct current step information', () => {
    const { result } = renderHook(() => useUserJourney(steps, 1, actions));

    const currentStep = result.current.getCurrentStep();

    expect(currentStep).toEqual(steps[1]);
  });
  test('returns current step', () => {
    const { result } = renderHook(() => useUserJourney(steps, 1, actions));

    const currentStep = result.current.getCurrentStep();

    expect(currentStep).toEqual(steps[1]);
  });

  test('returns null when current step index is out of bounds', () => {
    const { result } = renderHook(() => useUserJourney(steps, steps.length + 1, actions));

    const currentStep = result.current.getCurrentStep();

    expect(currentStep).toBeNull();
  });

});
const defaultSteps = [
    { id: 'defaultStep1', name: 'Default Step 1' },
    { id: 'defaultStep2', name: 'Default Step 2' },
  ];
  
  const defaultActions = [
    { id: 'defaultAction1', name: 'Default Action 1', callback: jest.fn() },
    { id: 'defaultAction2', name: 'Default Action 2', callback: jest.fn() },
  ];
  
  describe('useUserJourney2', () => {
    test('initializes with default initial steps and index when not provided', () => {
      const { result } = renderHook(() => useUserJourney());
  
      expect(result.current.currentStepIndex).toBe(0);
      expect(result.current.steps).toEqual([]);
    });
  
    test('initializes with custom initial steps and default index when index not provided', () => {
      const { result } = renderHook(() => useUserJourney(defaultSteps));
  
      expect(result.current.currentStepIndex).toBe(0);
      expect(result.current.steps).toEqual(defaultSteps);
    });
  
    test('initializes with custom initial index and default steps when steps not provided', () => {
      const { result } = renderHook(() => useUserJourney([], 1));
  
      expect(result.current.currentStepIndex).toBe(1);
      expect(result.current.steps).toEqual([]);
    });
  
    test('initializes with default actions when actions not provided', () => {
      const { result } = renderHook(() => useUserJourney(defaultSteps, 0));
  
      expect(result.current.actions).toEqual([]);
    });
  
    test('initializes with custom initial steps, index, and actions', () => {
      const { result } = renderHook(() => useUserJourney(defaultSteps, 1, defaultActions));
  
      expect(result.current.currentStepIndex).toBe(1);
      expect(result.current.steps).toEqual(defaultSteps);
      expect(result.current.actions).toEqual(defaultActions);
    });
  });
  