import { NavigationContainer } from '@react-navigation/native';
import { act, renderHook } from '@testing-library/react-hooks';

import { getStepsByOrder, useMultiStepNavigation } from './use-multi-step-navigation.hook';
import { stepsLibrary } from '../sign-up-form.constants';
import { UserSteps } from '../signup-form.types';

jest.mock('native-base', () => ({
  ...jest.requireActual('native-base'),
  useToast: jest.fn(),
}));

describe('getStepsByOrder', () => {
  it('returns step ids ordered', () => {
    expect(getStepsByOrder(stepsLibrary)).toStrictEqual({
      0: UserSteps.FullName,
      1: UserSteps.Email,
      2: UserSteps.Password,
    });
  });
});

const wrapper = ({ children }: { children: React.ReactElement }) => (
  <NavigationContainer>{children}</NavigationContainer>
);

const setup = (step: UserSteps) =>
  renderHook(() => useMultiStepNavigation(step), {
    wrapper,
  });

describe('useMultiStepNavigation', () => {
  describe('when the current step is Password', () => {
    it('isLastStep is true', () => {
      const { result } = setup(UserSteps.Password);

      expect(result.current.isLastStep).toBeTruthy();
    });
  });

  describe('when handleBack is triggered', () => {
    it('the activeStep is Password', () => {
    });
    const { result } = setup(UserSteps.Password);

    act(() => {
      result.current.handleBack();
    });

    expect(result.current.isLastStep).toBeFalsy();
    expect(result.current.activeStep).toBe(UserSteps.Email);
  });

  describe('when the current step is FullName', () => {
    it('isFirstStep is true', () => {
      const { result } = setup(UserSteps.FullName);

      expect(result.current.isFirstStep).toBeTruthy();
    });

  //   describe('when handleNext is triggered', () => {
  //     it('the activeStep is FullName', () => {
  //       const { result } = setup(UserSteps.FullName);

  //       act(() => {
  //         result.current.handleNext();
  //       });

  //       expect(result.current.isFirstStep).toBeFalsy();
  //       expect(result.current.activeStep).toBe(UserSteps.Email);
  //     });
  //   });
  });
});
