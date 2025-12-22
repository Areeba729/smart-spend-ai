import { StyleSheet, Platform } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { Theme, Responsive } from '../../libs';
const { AppFonts, getHeight } = Responsive;

const getStyles = () =>
  StyleSheet.create({
    footer: {
      alignItems: 'center',
      paddingHorizontal: moderateScale(22),
      paddingBottom: moderateScale(45),
      justifyContent: 'flex-end',
      marginTop: moderateScale(30),
      flex: 1,
    },
    footerContainer: {
      flex: 1,
    },
    card: {
      width: '100%',
      // backgroundColor: Theme.colors.secondary,
      borderRadius: scale(20),
      paddingHorizontal: moderateScale(20),
      paddingTop: moderateScale(20),
      paddingBottom: moderateScale(16),
      justifyContent: 'space-between',
      marginBottom: scale(10),
    },
    cardBody: {
      alignItems: 'center',
    },
    cardTitle: {
      textAlign: 'center',
      marginBottom: moderateScale(8),
      fontWeight: 'bold',
      fontSize: AppFonts.h3,
      color: Theme.colors.text,
    },
    cardDesc: {
      textAlign: 'center',
      color: Theme.colors.text,
      marginVertical: moderateScale(8),
      fontSize: AppFonts.h5,
      opacity: 0.8,
    },
    stepperWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: moderateScale(8),
      marginBottom: moderateScale(50),
    },
    dot: {
      width: moderateScale(8),
      height: moderateScale(8),
      borderRadius: Theme.borders.fullRadius,
      backgroundColor: Theme.colors.text,
      marginRight: moderateScale(6),
    },
    dotActive: {
      width: moderateScale(28),
      height: moderateScale(8),
      borderRadius: moderateScale(6),
      overflow: 'hidden',
      backgroundColor: Theme.colors.secondary,
    },
    button: {
      alignItems: 'center',
      width: '100%',
      height: moderateScale(56),
      borderRadius: moderateScale(28),
      elevation: 6,
      backgroundColor: Theme.colors.secondary,
    },
    btnTitle: {
      fontWeight: 'bold',
      color: Theme.colors.primary,
    },
  });

export default getStyles;
