import React from 'react';
import { View, Text } from 'react-native';
import getStyles from './style';
import NativeButton from '../NativeButton/NativeButton';
import HeadingText from '../TextDecoration/HeadingText';
import LabelText from '../TextDecoration/LabelText';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import { Theme } from '../../libs';

export default function OnboardingFooter({
  step,
  stepsCount,
  onNext,
  title,
  desc,
  accentWord,
}) {
  const styles = getStyles();

  const isLastStep = step === stepsCount - 1;

  return (
    <View style={styles.footer}>
      <View style={styles.card}>
        <View style={styles.cardBody}>
          <View style={{ width: '90%' }}>
            {accentWord && title?.includes(accentWord) ? (
              <HeadingText style={styles.cardTitle}>
                {title.split(accentWord)[0]}
                <Text style={{ color: Theme.colors.secondary }}>
                  {accentWord}
                </Text>
                {title.split(accentWord)[1]}
              </HeadingText>
            ) : (
              <HeadingText text={title} style={styles.cardTitle} />
            )}
          </View>
          <LabelText text={desc} style={styles.cardDesc} numberOfLines={5} />

          <View style={styles.stepperWrap}>
            {Array.from({ length: stepsCount }).map((_, i) =>
              i === step ? (
                <View key={i} style={[styles.dot, styles.dotActive]} />
              ) : (
                <View key={i} style={styles.dot} />
              ),
            )}
          </View>
        </View>

        <PrimaryButton
          title={'Next'}
          onPress={onNext}
          containerStyle={styles.button}
          titleStyle={styles.btnTitle}
        />
      </View>
    </View>
  );
}
