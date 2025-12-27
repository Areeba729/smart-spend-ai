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
      backgroundColor: '#F8F9FA', // Light grey background for the content area
    },
    contentArea: {
      flex: 1,
      backgroundColor: Theme.colors.white,
      marginTop: verticalScale(10),
      borderTopLeftRadius: moderateScale(25),
      borderTopRightRadius: moderateScale(25),
      padding: scale(20),
    },
    lastUpdated: {
      fontSize: moderateScale(14),
      color: '#666',
      marginBottom: verticalScale(20),
      fontWeight: '500',
    },
    policyText: {
      fontSize: moderateScale(14),
      color: '#333',
      lineHeight: moderateScale(22),
      marginBottom: verticalScale(15),
    },
    sectionTitle: {
      fontSize: moderateScale(16),
      fontWeight: '700',
      color: '#333',
      marginTop: verticalScale(10),
      marginBottom: verticalScale(10),
      textTransform: 'uppercase',
    },
  });

export default getStyles;
