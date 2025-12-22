import React from 'react';
import { Image, View } from 'react-native';
import getStyles from './style';
import PrimaryButton from '../PrimaryButton/PrimaryButton';

export default function OnboardingHeader({
  image,
  handleSkip,
  currentStep,
  totalSteps,
}) {
  const styles = getStyles();

  return (
    <>
      {currentStep < totalSteps - 1 && (
        <PrimaryButton
          title={'Skip'}
          onPress={handleSkip}
          containerStyle={styles.skipButton}
          titleStyle={styles.skipText}
        />
      )}
      <View style={styles.illustrationWrap}>
        <Image
          source={image}
          style={styles.illustration}
          accessibilityLabel={`Onboarding illustration`}
        />
      </View>
    </>
  );
}
