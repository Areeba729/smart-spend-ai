import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Theme } from '../../libs';

const getStyles = colors =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#3E64FF',
    },
    container: {
      flex: 1,
      backgroundColor: '#F0F2F5', // Light grey background like in the image
      alignItems: 'center',
    },
    divider: {
      width: scale(6),
      height: '100%',
      backgroundColor: '#40E0D0', // Teal color from design
    },
  });

export default getStyles;
