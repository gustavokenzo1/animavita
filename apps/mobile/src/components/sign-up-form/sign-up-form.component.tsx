import { UserType } from '@animavita/types';
import { createValidationSchema } from '@animavita/validation-schemas';
import { joiResolver } from '@hookform/resolvers/joi';
import { Box, KeyboardAvoidingView, useToast } from 'native-base';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Platform } from 'react-native';

import UserFormSteps from './compose/form-steps/form-steps';
import StepperController from './compose/stepper-controller';
import StepperIndicator from './compose/stepper-indicator';
import { useMultiStepNavigation } from './hooks/use-multi-step-navigation.hook';
import { UserSteps } from './signup-form.types';

import Delimiter from '@/components/delimiter';
import useAdoptions from '@/hooks/use-adoptions';

type SignUpFormProps = {
  defaultValues?: Partial<UserType>;
  initialStep?: UserSteps;
};

const SignUpForm = ({ defaultValues, initialStep }: SignUpFormProps) => {
  const { activeStep, isLastStep, isFirstStep, handleBack, handleNext } =
    useMultiStepNavigation(initialStep);

  const signUpForm = useForm<Partial<UserType>>({
    resolver: joiResolver(createValidationSchema),
    mode: 'onChange',
    defaultValues,
  });
  const { saveOrCreateAdoption, saving } = useAdoptions();
  const toast = useToast();

  const onConfirm = async () => {
    const isValid = await signUpForm.trigger();

    if (!isValid) {
      toast.show({
        description: 'Invalid data!',
      });
      return;
    }

    const adoption = signUpForm.getValues();

    await saveOrCreateAdoption(adoption);
  };

  return (
    <KeyboardAvoidingView flex="1" behavior="padding" enabled={Platform.OS === 'ios'}>
      <FormProvider {...signUpForm}>
        <StepperIndicator activeStep={activeStep} />
        <Delimiter marginTop={0} flex="1">
          <Box
            position="relative"
            marginTop="8"
            display="flex"
            flex-direction="column"
            justify-content="center"
          >
            <UserFormSteps activeStep={activeStep} />
          </Box>

          <StepperController
            isLastStep={isLastStep}
            isFirstStep={isFirstStep}
            activeStep={activeStep}
            saving={saving}
            handleBack={handleBack}
            handleNext={handleNext}
            onConfirm={onConfirm}
          />
        </Delimiter>
      </FormProvider>
    </KeyboardAvoidingView>
  );
};

export default SignUpForm;
