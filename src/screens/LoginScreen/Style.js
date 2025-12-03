import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../libs';

const getStyles = colors =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
      backgroundColor: colors.grey,
    },
    container: {
      position: 'relative',
      minHeight: '100%',
    },
    content: {
      paddingHorizontal: moderateScale(24),
      marginTop: moderateScale(192),
    },
    header: {
      marginBottom: moderateScale(32),
    },
    title: {
      fontSize: moderateScale(24),
      color: colors.text,
      marginBottom: moderateScale(8),
      ...Theme.fontWeight[600],
    },
    subtitle: {
      color: colors.text,
      fontSize: moderateScale(15),
      ...Theme.fontWeight[400],
    },
    form: {
      marginBottom: moderateScale(32),
    },
    errorText: {
      color: colors.error || '#FF3B30',
      fontSize: moderateScale(12),
      marginLeft: moderateScale(4),
    },
    errorContainer: {
      width: '100%',
    },
  });

export default getStyles;
