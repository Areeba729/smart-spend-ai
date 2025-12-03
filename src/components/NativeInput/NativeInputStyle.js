import { StyleSheet } from 'react-native';

import { moderateScale } from 'react-native-size-matters';
import { Responsive, Theme } from '../../libs';

const { AppFonts, getWidth, getHeight, sizeMatter } = Responsive;

const styles = colors =>
  StyleSheet.create({
    inputContainer: {
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      width: '100%',
      height: Responsive.sizeMatter.scale(52),
      borderWidth: 0,
      backgroundColor: colors.white,
    },

    errorText: {
      fontSize: AppFonts.t4,
      marginLeft: getWidth(1),
      marginTop: getHeight(0.1),
      color: Theme.colors.error,
    },
    input: {
      color: Theme.colors.text,
      fontFamily: Theme.typography.caption.fontFamily,
      includeFontPadding: false,
      fontSize: moderateScale(12),
      ...Theme.fontWeight[500],
    },
    errorContainer: {
      // height: getHeight(2),
    },
  });

export default styles;
