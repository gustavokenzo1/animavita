import { Box, Button } from 'native-base';
import React from 'react';

import { stepsLibrary } from '../../sign-up-form.constants';
import { StepperControllerProps } from '../../signup-form.types';

import useFormValidation from '@/hooks/react-hook-form/use-form-validation';
import useLocale from '@/hooks/use-locale';
import theme from '@/theme';

const StepperController = ({
  handleBack,
  handleNext,
  onConfirm,
  isLastStep,
  activeStep,
  saving,
}: StepperControllerProps) => {
  const { t } = useLocale();
  const { validateField } = useFormValidation('signup', 'SIGN_UP.FORM_ERROR_MESSAGES');

  const onBackPress = () => {
    handleBack();
  };

  const onNextPress = async () => {
    if (isLastStep) {
      onConfirm();
      return;
    }

    const fieldName = stepsLibrary[activeStep].fieldName;
    const isValid = await validateField(fieldName);

    if (isValid) handleNext();
  };

  const label = isLastStep ? t('SIGN_UP.FORM.CONFIRM_BUTTON') : t('SIGN_UP.FORM.NEXT_BUTTON');

  return (
    <Box marginTop="auto" display="flex" flexDirection="row" justifyContent="space-between">
      <Button
        color={theme.colors.primary[600]}
        variant="outline"
        onPress={onBackPress}
        disabled={saving}
      >
        {t('SIGN_UP.FORM.BACK_BUTTON')}
      </Button>
      <Button
        color={theme.colors.primary[600]}
        onPress={onNextPress}
        marginLeft="auto"
        disabled={saving}
        isLoading={saving}
        isLoadingText={label}
      >
        {label}
      </Button>
    </Box>
  );
};

export default StepperController;
