import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import { Theme } from '../../libs';
import getStyles from './style';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

const Splash = () => {
  const navigation = useNavigation();
  const { colors } = Theme;
  const styles = getStyles(colors);

  const renderBackgroundGrid = () => {
    return Array.from({ length: 8 }).map((_, rowIndex) => (
      <View key={`row-${rowIndex}`} style={styles.gridRow}>
        {Array.from({ length: 4 }).map((__, colIndex) => (
          <View key={`col-${colIndex}`} style={styles.gridBox} />
        ))}
      </View>
    ));
  };

  return (
    <>
      <CustomStatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Background Pattern */}
        <View style={styles.backgroundGrid}>{renderBackgroundGrid()}</View>

        <View style={styles.logoContainer}>
          <View style={styles.logoRow}>
            <Text style={styles.logoText}>SnapQuoteGt</Text>
            <Text style={styles.subLogoText}>Beta</Text>
          </View>
        </View>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <PrimaryButton
            title="Sign Up"
            onPress={() => navigation.navigate('SignupScreen')}
            containerStyle={styles.signUpBtn}
            titleStyle={styles.signUpText}
          />

          <PrimaryButton
            title="Sign In"
            onPress={() => navigation.navigate('LoginScreen')}
            containerStyle={styles.signInBtn}
            titleStyle={styles.signInText}
          />
        </View>
      </View>
    </>
  );
};

export default Splash;
