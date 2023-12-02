import { Step, UserSteps } from './signup-form.types';

export const stepsLibrary: {
  [key in UserSteps]: Step;
} = {
  FullName: { order: 0, label: 'SIGN_UP.FORM.NAME_INPUT', fieldName: 'fullName' },
  Email: { order: 1, label: 'SIGN_UP.FORM.EMAIL_INPUT', fieldName: 'email' },
  Password: { order: 2, label: 'SIGN_UP.FORM.PASSWORD_INPUT', fieldName: 'password' },
};
