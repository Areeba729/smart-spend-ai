import { StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { Theme } from '../../../libs';

const getStyles = colors =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      // backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      paddingHorizontal: moderateScale(16),
      // backgroundColor: colors.background,
    },
    contentText: {
      fontSize: scale(14),
      color: colors.text,
      lineHeight: 24,
      marginTop: moderateScale(8),
      marginBottom: moderateScale(8),
      ...Theme.fontWeight[500]
    },
  });

export default getStyles;
