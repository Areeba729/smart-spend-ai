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
      backgroundColor: '#F8F9FA',
    },
    contentArea: {
      flex: 1,
      paddingHorizontal: scale(20),
      paddingTop: verticalScale(20),
    },
    section: {
      marginBottom: verticalScale(30),
    },
    sectionTitle: {
      fontSize: moderateScale(16),
      fontWeight: '600',
      color: '#333',
      marginBottom: verticalScale(15),
    },
    filterItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: verticalScale(12),
    },
    checkbox: {
      width: scale(20),
      height: scale(20),
      borderRadius: scale(4),
      borderWidth: 1,
      borderColor: '#D6D6D6',
      backgroundColor: Theme.colors.white,
      marginRight: scale(12),
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxSelected: {
      backgroundColor: Theme.colors.white,
      borderColor: '#D6D6D6',
    },
    filterText: {
      fontSize: moderateScale(14),
      color: '#666',
    },
    bottomActions: {
      flexDirection: 'row',
      paddingHorizontal: scale(20),
      paddingBottom: verticalScale(30),
      paddingTop: verticalScale(10),
      backgroundColor: '#F8F9FA',
      justifyContent: 'space-between',
    },
    clearButton: {
      flex: 1,
      height: verticalScale(45),
      borderRadius: scale(25),
      borderWidth: 1,
      borderColor: '#3E64FF',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: scale(15),
      backgroundColor: Theme.colors.white,
    },
    clearButtonText: {
      color: '#3E64FF',
      fontSize: moderateScale(14),
      fontWeight: '600',
    },
    applyButton: {
      flex: 1,
      height: verticalScale(45),
      borderRadius: scale(25),
      backgroundColor: '#3E64FF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    applyButtonText: {
      color: Theme.colors.white,
      fontSize: moderateScale(14),
      fontWeight: '600',
    },
  });

export default getStyles;
