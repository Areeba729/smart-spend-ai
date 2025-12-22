import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme, Responsive } from '../../libs';

const { AppFonts, getHeight } = Responsive;

const getStyles = colors => {
  return StyleSheet.create({
    illustrationWrap: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: moderateScale(120),
      alignSelf: 'center',
      width: moderateScale(325),
      height: moderateScale(325),
      // borderRadius: moderateScale(),
      // backgroundColor: Theme.colors.secondary,
      // shadowColor: '#000',
      // shadowOpacity: 0.5,
      // shadowOffset: { width: 0, height: 10 },
      // shadowRadius: 20,
      // elevation: 12,
    },
    illustration: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      // borderRadius: moderateScale(20),
    },
    textWrap: {
      alignItems: 'center',
      paddingHorizontal: moderateScale(30),
      marginBottom: moderateScale(10),
    },
    title: {
      textAlign: 'center',
      marginTop: moderateScale(10),
      marginBottom: moderateScale(8),
      lineHeight: moderateScale(32),
    },

    desc: {
      color: Theme.colors.textColor,
      textAlign: 'center',
      lineHeight: moderateScale(24),
    },
    skipButton: {
      width: moderateScale(70),
      borderRadius: Theme.borders.fullRadius,
      height: moderateScale(36),
      position: 'absolute',
      top: moderateScale(50),
      right: moderateScale(16),
      zIndex: 1,
      backgroundColor: 'transparent',
    },
    skipText: {
      color: Theme.colors.white,
      fontSize: AppFonts.h5,
      fontWeight: '500',
      textAlign: 'center',
    },
  });
};

export default getStyles;
