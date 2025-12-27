import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Theme } from '../../libs';

const getStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3E64FF', // A slightly more vibrant blue matching the design
      paddingHorizontal: scale(20),
    },

    /* BACKGROUND GRID PATTERN */
    backgroundGrid: {
      ...StyleSheet.absoluteFillObject,
      paddingTop: verticalScale(40),
      alignItems: 'center',
    },
    gridRow: {
      flexDirection: 'row',
    },
    gridBox: {
      width: scale(80),
      height: scale(80),
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: moderateScale(20),
      margin: scale(5),
    },

    /* CENTER LOGO */
    logoContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },

    logoRow: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },

    logoText: {
      color: Theme.colors.white,
      fontSize: moderateScale(42),
      fontWeight: '900',
      letterSpacing: -1,
    },

    subLogoText: {
      color: '#FF3B30',
      fontSize: moderateScale(16),
      fontWeight: '700',
      marginTop: scale(-10),
      marginRight: scale(4),
    },

    /* FOOTER */
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: verticalScale(40),
      zIndex: 1,
    },

    signUpBtn: {
      width: '47%',
      borderWidth: 1.5,
      borderColor: Theme.colors.white,
      backgroundColor: 'transparent',
      borderRadius: moderateScale(15),
      height: verticalScale(55),
    },

    signUpText: {
      color: Theme.colors.white,
      fontWeight: '700',
      fontSize: moderateScale(15),
    },

    signInBtn: {
      width: '47%',
      backgroundColor: Theme.colors.white,
      borderRadius: moderateScale(15),
      height: verticalScale(55),
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },

    signInText: {
      color: '#3E64FF',
      fontWeight: '700',
      fontSize: moderateScale(15),
    },
  });

export default getStyles;
