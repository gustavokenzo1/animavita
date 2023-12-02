import { View } from 'native-base';

import SafeArea from '@/components/safe-area';
import SignUpForm from '@/components/sign-up-form/sign-up-form.component';
import AppStatusBar from '@/components/status-bar/status-bar.component';

const SignUp = () => {
  return (
    <View height="full">
      <SafeArea>
        <AppStatusBar />
        <SignUpForm />
      </SafeArea>
    </View>
  );
};

export default SignUp;
