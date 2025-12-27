import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Theme } from '../../libs';

const getStyles = colors =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#3E64FF',
    },
    container: {
      flex: 1,
    },
    header: {
      paddingHorizontal: scale(20),
      paddingTop: verticalScale(20),
      paddingBottom: verticalScale(30),
    },
    backButton: {
      marginBottom: verticalScale(10),
      marginTop: scale(10),
    },
    title: {
      color: Theme.colors.white,
      fontSize: moderateScale(28),
      fontWeight: '700',
      marginBottom: verticalScale(10),
    },
    subtitle: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: moderateScale(16),
      lineHeight: moderateScale(22),
    },
    formContainer: {
      flex: 1,
      backgroundColor: Theme.colors.white,
      borderTopLeftRadius: moderateScale(30),
      borderTopRightRadius: moderateScale(30),
      paddingTop: verticalScale(30),
      paddingHorizontal: scale(20),
    },
  });

export default getStyles;
