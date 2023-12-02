export enum UserSteps {
  FullName = 'FullName',
  Email = 'Email',
  Password = 'Password',
}

export type Step = {
  order: number;
  label: string;
  fieldName: string;
};

export type StepperIndicatorProps = {
  activeStep: UserSteps;
};

export type StepperControllerProps = {
  handleBack: () => void;
  handleNext: () => void;
  onConfirm: () => void;
  saving: boolean;
  isLastStep: boolean;
  isFirstStep: boolean;
  activeStep: UserSteps;
};
