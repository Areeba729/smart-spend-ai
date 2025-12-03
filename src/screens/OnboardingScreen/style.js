import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../libs';

const { width } = Dimensions.get('window');

const getStyles = colors => {
  const CIRCLE_SIZE = width * 1.5;
  const IMAGE_SIZE = width * 0.55;
  return StyleSheet.create({
    safeArea: { flex: 1, position: 'relative' },
    // For OnboardingHeader
    halfCircle: {
      position: 'relative',
      top: -moderateScale(70),
      height: moderateScale(200),
      borderBottomLeftRadius: '100%',
      borderBottomRightRadius: '100%',
      backgroundColor: colors.primary,
      opacity: 0.12,
      zIndex: 0,
      width: CIRCLE_SIZE,
      left: -(CIRCLE_SIZE - width) / 2,
    },
    illustrationWrap: {
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
      position: 'relative',
      height: IMAGE_SIZE + moderateScale(5),
    },
    illustration: {
      width: '100%',
    },
    textWrap: {
      alignItems: 'center',
      paddingHorizontal: moderateScale(32),
      marginTop: moderateScale(32),
    },
    title: {
      fontSize: moderateScale(24),
      color: colors.text,
      textAlign: 'center',
      marginBottom: moderateScale(12),
      lineHeight: moderateScale(32),
      ...Theme.fontWeight[500],
    },
    highlight: {
      fontSize: moderateScale(24),
      textAlign: 'center',
      marginBottom: moderateScale(12),
      lineHeight: moderateScale(32),
      color: colors.primary,
      ...Theme.fontWeight[600],
    },
    desc: {
      fontSize: moderateScale(18),
      color: colors['grey-500'] || colors['dark-grey'],
      textAlign: 'center',
      lineHeight: moderateScale(24),
      ...Theme.fontWeight[500],
    },
    // For OnboardingFooter
    footer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: moderateScale(32),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: moderateScale(32),
      zIndex: 2,
    },
    stepperWrap: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dot: {
      width: moderateScale(10),
      height: moderateScale(4),
      borderRadius: moderateScale(2),
      backgroundColor: colors.grey,
      marginRight: moderateScale(8),
    },
    dotActive: {
      backgroundColor: colors.primary,
      width: moderateScale(22),
    },
    nextBtn: {
      width: moderateScale(56),
      height: moderateScale(56),
      backgroundColor: colors.primary,
      borderRadius: moderateScale(16),
      transform: [{ rotate: '45deg' }],
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    nextBtnIcon: {
      color: colors.white,
      fontSize: moderateScale(28),
      fontWeight: 'bold',
      transform: [{ rotate: '-135deg' }],
      marginTop: -2,
    },
  });
};

export default getStyles;
