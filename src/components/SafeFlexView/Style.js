import { StyleSheet } from 'react-native';
import { Theme } from '../../libs';
const { colors } = Theme;
const getStyles = (
  _,
  isTopColor,
  isBottomColor,
  insets,
  isTop,

  isPaddingTop,
  isPaddingBottom,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    contentContainerStyle: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    topFlex: {
      flex: 0,
      backgroundColor: isTopColor ? isTopColor : colors.gradientPrimary,
      paddingTop: isPaddingTop ? insets.top : 0,
    },

    bottomFlex: {
      flex: 1,
      // backgroundColor: isBottomColor ? isBottomColor : colors.gradientPrimary,
    },
  });

export default getStyles;
