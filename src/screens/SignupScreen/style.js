import { StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { Theme } from '../../libs';

const styles = colors =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.black,
      // paddingHorizontal: moderateScale(24),
    },
    scrollView: {
      flex: 1,
      backgroundColor: colors.black,
    },
    container: {
      flexGrow: 1,
      paddingHorizontal: moderateScale(24),
      paddingTop: moderateScale(20),
      paddingBottom: moderateScale(20),
      justifyContent: 'space-between',
    },
    header: {
      marginBottom: moderateScale(24),
      paddingHorizontal: moderateScale(24),
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(70),
      marginTop: scale(40),
    },
    backButton: {
      marginBottom: moderateScale(16),
      // marginTop: scale(10),
      paddingHorizontal: moderateScale(24),
    },
    backButtonText: {
      color: colors.white,
      fontSize: moderateScale(30),
      fontWeight: 'bold',
    },
    logoContainer: {
      width: moderateScale(48),
      height: moderateScale(48),
      backgroundColor: '#1E1E1E',
      borderRadius: moderateScale(12),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: moderateScale(16),
      borderWidth: 1,
      borderColor: '#333',
      alignSelf: 'center',
    },
    logo: {
      width: moderateScale(24),
      height: moderateScale(24),
      resizeMode: 'contain',
      tintColor: colors.secondary,
    },
    title: {
      fontSize: moderateScale(28),
      color: colors.white,
      marginBottom: moderateScale(8),
      ...Theme.typography.heading,
    },
    subtitle: {
      color: colors.grey,
      fontSize: moderateScale(14),
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
    loginText: {
      color: colors.secondary,
      fontWeight: 'bold',
      fontSize: moderateScale(14),
    },
  });

export default styles;
