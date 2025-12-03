import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Responsive, Theme } from '../../libs';

const getStyles = colors =>
  StyleSheet.create({
    description: {
      color: colors.dark,
      fontSize: moderateScale(14),
      marginBottom: moderateScale(),
      fontWeight: '500',
    },
    label: {
      color: colors.text,
      fontSize: moderateScale(14),
      fontWeight: '600',
      marginBottom: moderateScale(8),
      marginTop: moderateScale(5),
    },
    textareaContainer: {
      minHeight: moderateScale(120),
      paddingVertical: moderateScale(15, 0.25),
      backgroundColor: colors.white,

      height: Responsive.getHeight(15),
      borderWidth: 0,
      borderRadius: 10,
      paddingHorizontal: 15,
      width: '100%',
    },
    textareaInput: {
      height: 100,
      ...Theme.fontWeight[500]
    },
  });

export default getStyles;
