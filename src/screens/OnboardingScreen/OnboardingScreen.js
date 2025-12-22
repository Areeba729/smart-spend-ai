import React, { useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { images } from '../../assets/images';
import OnboardingFooter from '../../components/OnboardingFooter/OnboardingFooter';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import { useOnboardingStatus } from '../../hooks/useOnboardingStatus';
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import { Theme } from '../../libs';

export default function Onboarding({ navigation }) {
  const [step, setStep] = useState(0);

  const { markCompleted } = useOnboardingStatus();

  const steps = [
    {
      title: 'TrackEvery Penny',
      desc: 'Effortlessly monitor your spending habits and watch your savings grow with simple, real-time analytics.',
      img: images.onboarding1,
      accentWord: 'Penny',
    },
    {
      title: 'Smart Insights',
      desc: 'Get personalized tips and alerts that help you stay on budget and reach your goals faster.',
      img: images.onboarding2,
    },
    {
      title: 'Secure & Seamless',
      desc: 'Your data is protected with bank-grade security while you enjoy a smooth experience.',
      img: images.onboarding3,
    },
  ];

  const navigateToWelcome = async () => {
    try {
      await markCompleted();
    } finally {
      navigation.replace('LoginScreen');
    }
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      navigateToWelcome();
    }
  };

  const handleSkip = () => {
    navigateToWelcome();
  };

  return (
    <>
      <View style={{ backgroundColor: Theme.colors.primary, flex: 1 }}>
        <CustomStatusBar barStyle="light-content" />

        <OnboardingHeader
          image={steps[step].img}
          handleSkip={handleSkip}
          currentStep={step}
          totalSteps={steps.length}
        />

        <OnboardingFooter
          step={step}
          stepsCount={steps.length}
          onNext={nextStep}
          title={steps[step].title}
          desc={steps[step].desc}
          accentWord={steps[step]?.accentWord}
        />
      </View>
    </>
  );
}
