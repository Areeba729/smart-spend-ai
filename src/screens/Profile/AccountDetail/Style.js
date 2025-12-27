import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
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
    avatarContainer: {
      position: 'relative',
      alignItems: 'center',
      marginTop: moderateScale(24),
      marginBottom: moderateScale(32),
      width: moderateScale(140),
      height: moderateScale(140),
      marginHorizontal: 'auto',
    },
    avatar: {
      width: '100%',
      height: '100%',
      borderRadius: moderateScale(70),
      resizeMode: 'cover',
    },
    editIconWrapper: {
      position: 'absolute',
      right: moderateScale(10),
      bottom: moderateScale(10),
      backgroundColor: 'transparent',
      borderRadius: moderateScale(8),
      borderWidth: 2,
      borderColor: colors.primary,
    },
    section: {
      marginBottom: moderateScale(14),
    },
    label: {
      fontSize: moderateScale(14),
      marginBottom: moderateScale(8),
      color: colors.text,
      ...Theme.fontWeight[500],
    },
    inputCard: {
      backgroundColor: colors.white,
      borderRadius: moderateScale(12),
      paddingVertical: moderateScale(18),
      paddingHorizontal: moderateScale(16),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: moderateScale(16),
    },
    inputText: {
      fontSize: moderateScale(12),
      color: colors.text,
      ...Theme.fontWeight[500],
    },

    backdrop: {
      flex: 1,
      backgroundColor: '#00000099',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalCard: {
      padding: 24,
      borderRadius: 12,
      width: '80%',
    },
    modalTitle: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 12,
    },
    editIconPos: {
      position: 'absolute',
      bottom: -10,
      right: -5,
    },
    inputContainer: () => ({
      backgroundColor: colors.white,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors['light-grey'],
      marginBottom: 10,
    }),
    fullWidth: { width: '100%' },
    mt16: { marginTop: 16 },
  });

export default getStyles;
