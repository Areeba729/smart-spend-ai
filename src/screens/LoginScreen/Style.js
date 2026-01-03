import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../libs';

const styles = colors =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.black,
    },
    scrollView: {
      flex: 1,
      backgroundColor: colors.black,
    },
    container: {
      // flexGrow: 1,
      paddingHorizontal: moderateScale(24),
      paddingTop: moderateScale(20),
      paddingBottom: moderateScale(40),
      // justifyContent: 'space-between',
    },
    header: {
      alignItems: 'center',
      marginTop: moderateScale(40),
      marginBottom: moderateScale(40),
    },
    logoContainer: {
      width: moderateScale(64),
      height: moderateScale(64),
      backgroundColor: '#1E1E1E',
      borderRadius: moderateScale(16),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: moderateScale(24),
      borderWidth: 1,
      borderColor: '#333',
    },
    logo: {
      width: moderateScale(32),
      height: moderateScale(32),
      resizeMode: 'contain',
      tintColor: colors.secondary,
    },
    title: {
      fontSize: moderateScale(28),
      color: colors.white,
      marginBottom: moderateScale(8),
      textAlign: 'center',
      ...Theme.typography.heading,
    },
    subtitle: {
      color: colors.grey,
      fontSize: moderateScale(14),
      textAlign: 'center',
      ...Theme.typography.body,
    },
    socialSection: {
      marginTop: moderateScale(24),
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: moderateScale(24),
      marginTop: moderateScale(20),
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#333',
    },
    dividerText: {
      color: '#666',
      paddingHorizontal: moderateScale(10),
      fontSize: moderateScale(12),
      ...Theme.typography.body,
    },
    socialButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: moderateScale(16),
      alignSelf: 'center',
    },
    socialButton: {
      width: '47%',
      backgroundColor: '#111',
      borderWidth: 1,
      borderColor: '#333',
      borderRadius: moderateScale(12),
      paddingVertical: moderateScale(12),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    socialButtonText: {
      color: colors.white,
      marginLeft: moderateScale(8),
      fontWeight: '600',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: moderateScale(40),
      marginBottom: moderateScale(20),
    },
    footerText: {
      color: '#666',
      fontSize: moderateScale(14),
    },
    signupText: {
      color: colors.secondary,
      fontWeight: 'bold',
      fontSize: moderateScale(14),
    },
  });

export default styles;
