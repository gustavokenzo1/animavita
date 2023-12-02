import React from 'react';
import { useFormContext } from 'react-hook-form';

import { stepsLibrary } from '../../sign-up-form.constants';
import { UserSteps } from '../../signup-form.types';

import { RHFInput } from '@/components/react-hook-form/native-base';
import useLocale from '@/hooks/use-locale';
import theme from '@/theme';

const commonInputProperties = {
  size: 'xl',
  borderColor: theme.colors.primary[600],
  variant: 'outline',
  autoFocus: true,
};

// Full Name Step
const FullNameStep = () => {
  const { t } = useLocale();
  const { control } = useFormContext();

  return (
    <RHFInput
      input={{
        ...commonInputProperties,
        placeholder: t('SIGN_UP.FORM.NAME_INPUT'),
        testID: 'signup-form-full-name-input',
        returnKeyType: 'next',
        isRequired: true,
      }}
      control={control}
      name={stepsLibrary.FullName.fieldName}
    />
  );
};

// Email Step
const EmailStep = () => {
  const { t } = useLocale();
  const { control } = useFormContext();

  return (
    <RHFInput
      input={{
        ...commonInputProperties,
        placeholder: t('SIGN_UP.FORM.EMAIL_INPUT'),
        testID: 'signup-form-email-input',
        returnKeyType: 'next',
        isRequired: true,
        keyboardType: 'email-address',
      }}
      control={control}
      name={stepsLibrary.Email.fieldName}
    />
  );
};

// Password Step
const PasswordStep = () => {
  const { t } = useLocale();
  const { control } = useFormContext();

  return (
    <RHFInput
      input={{
        ...commonInputProperties,
        placeholder: t('SIGN_UP.FORM.PASSWORD_INPUT'),
        testID: 'signup-form-password-input',
        returnKeyType: 'done',
        isRequired: true,
        secureTextEntry: true,
      }}
      control={control}
      name={stepsLibrary.Password.fieldName}
    />
  );
};

const UserFormSteps = ({ activeStep }: { activeStep: UserSteps }) => {
  switch (activeStep) {
    case UserSteps.FullName:
      return <FullNameStep />;
    case UserSteps.Email:
      return <EmailStep />;
    case UserSteps.Password:
      return <PasswordStep />;
    default:
      return null;
  }
};

export default UserFormSteps;
