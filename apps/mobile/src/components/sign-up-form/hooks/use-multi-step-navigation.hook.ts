import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import { stepsLibrary } from '../sign-up-form.constants';
import { UserSteps, Step } from '../signup-form.types';

export const getStepsByOrder = (stepsLibrary: { [key in UserSteps]: Step }): {
  [key: number]: UserSteps;
} =>
  Object.keys(UserSteps).reduce((prev, stepId) => {
    const step = stepId as UserSteps;
    return { ...prev, [stepsLibrary[step].order]: step };
  }, {});

export const useMultiStepNavigation = (initialStep = UserSteps.FullName) => {
  const [activeStep, setActiveStep] = useState(initialStep);
  const { goBack } = useNavigation();

  const stepsByOrder = getStepsByOrder(stepsLibrary);
  const currentStepNumber = stepsLibrary[activeStep].order;
  const isFirstStep = currentStepNumber === 0;

  const isLastStep = () => {
    const totalSteps = Object.keys(UserSteps).length - 1;
    return currentStepNumber >= totalSteps;
  };

  const handleBack = () => {
    if (isFirstStep) {
      goBack();
      return;
    }

    const step = stepsByOrder[currentStepNumber - 1];
    setActiveStep(step);
  };

  const handleNext = () => {
    const step = stepsByOrder[currentStepNumber + 1];
    setActiveStep(step);
  };

  return {
    isFirstStep,
    isLastStep: isLastStep(),
    handleBack,
    handleNext,
    activeStep,
  };
};
