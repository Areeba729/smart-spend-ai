import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import { useOnboardingStatus } from '../../hooks/useOnboardingStatus';
import { Theme } from '../../libs';
import { images } from '../../assets/images';
import getStyles from './style';

const Splash = () => {
  const navigation = useNavigation();
  const { colors } = Theme;
  const styles = getStyles(colors);
  const { isOnboarded } = useOnboardingStatus();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(isOnboarded ? 'LoginScreen' : 'OnboardingScreen');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, isOnboarded]);

  return (
    <>
      <CustomStatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={images.logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.logoText}>SmartSpendAI</Text>
        </View>
      </View>
    </>
  );
};

export default Splash;
