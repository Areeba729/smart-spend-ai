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
    tabRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: moderateScale(8),
      marginBottom: moderateScale(0),
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: moderateScale(2),
    },
    tabText: {
      fontSize: scale(16),
      color: colors['dark-grey'],
      letterSpacing: 0.2,
      ...Theme.fontWeight[500],
    },
    tabTextActive: {
      fontSize: scale(16),
      color: colors.primary,
      ...Theme.fontWeight[700],
    },
    tabUnderlineWrapper: {
      position: 'relative',
      height: 2,
      marginTop: 6,
      marginBottom: moderateScale(10),
      flexDirection: 'row',
    },
    tabUnderlineInactive: {
      backgroundColor: colors['dark-grey'],
    },
    content: {
      flex: 1,
      marginTop: moderateScale(8),
    },
    contentText: {
      color: colors.text,
      fontWeight: '500',
      lineHeight: 24,
      marginTop: moderateScale(8),
      marginBottom: moderateScale(8),
      fontSize: scale(14),
      ...Theme.fontWeight[500],
    },
  });

export default getStyles;
