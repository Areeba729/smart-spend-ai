import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../libs';
const getStyles = () =>
  StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: Theme.colors.primary,
    },
    backgroundImage: {
      resizeMode: 'cover',
    },
    overlay: {
      flex: 1,
      paddingHorizontal: moderateScale(20),
      paddingTop: moderateScale(24),
      paddingBottom: moderateScale(32),
    },
    carouselContent: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
    },
    slideInner: {
      borderRadius: moderateScale(28),
      paddingVertical: moderateScale(24),
      paddingHorizontal: moderateScale(24),
      backgroundColor: 'rgba(255,255,255,0.94)',
      shadowColor: '#000000',
      shadowOpacity: 0.08,
      shadowRadius: moderateScale(16),
      shadowOffset: { width: 0, height: moderateScale(8) },
      elevation: 6,
    },
    footerWrapper: {
      marginTop: moderateScale(20),
    },
  });

export default getStyles;
