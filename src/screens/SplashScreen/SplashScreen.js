import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import { useOnboardingStatus } from '../../hooks/useOnboardingStatus';
import { Theme } from '../../libs';
import getStyles from './style';
import { Image } from 'react-native-svg';

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
          {/* <Image
            source={require('../../assets/images/logo.png')}
            style={{ height: 50, width: 50 }}
          /> */}
          <Text style={styles.logoText}>SmartSpendAI</Text>
        </View>
      </View>
    </>
  );
};

export default Splash;
