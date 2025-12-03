import { useState } from 'react';
import OnboardingFooter from '../../components/OnboardingFooter/OnboardingFooter';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import { useOnboardingStatus } from '../../hooks/useOnboardingStatus';
import { Theme } from '../../libs';
import { onboardingSteps } from '../../libs/constants';
import getStyles from './style';

const colors = Theme.colors;

export default function Onboarding({ navigation }) {
  const [step, setStep] = useState(0);
  const styles = getStyles(colors);

  const { markCompleted } = useOnboardingStatus();

  const nextStep = async () => {
    if (step < onboardingSteps.length - 1) setStep(step + 1);
    else {
      await markCompleted();
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <>
      <OnboardingHeader
        image={onboardingSteps[step].img}
        title={onboardingSteps[step].title}
        desc={onboardingSteps[step].description}
        styles={styles}
      />
      <OnboardingFooter
        step={step}
        stepsCount={onboardingSteps.length}
        onNext={nextStep}
        styles={styles}
      />
    </>
  );
}
