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
      backgroundColor: Theme.colors.white,
    },
    comparisonContainer: {
      flex: 1,
      flexDirection: 'row',
      paddingTop: verticalScale(20),
    },
    column: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: scale(10),
    },
    divider: {
      width: 2,
      height: '100%',
      backgroundColor: '#40E0D0', // Teal color from design
    },
    dashedDivider: {
      width: 2,
      height: '100%',
      borderStyle: 'dashed',
      borderWidth: 1,
      borderColor: '#40E0D0',
      marginRight: scale(10),
    },
    itemContainer: {
      alignItems: 'center',
      marginTop: verticalScale(50),
    },
    itemText: {
      fontSize: moderateScale(14),
      color: '#333',
      textAlign: 'center',
      fontWeight: '500',
    },
    companyName: {
      fontSize: moderateScale(12),
      color: '#666',
      marginTop: verticalScale(4),
    },
    arrowContainer: {
      position: 'absolute',
      right: scale(20),
      top: '50%',
      width: scale(30),
      height: scale(30),
      backgroundColor: '#3E64FF',
      borderRadius: scale(8),
      justifyContent: 'center',
      alignItems: 'center',

      zIndex: 10,
    },
    arrowText: {
      color: Theme.colors.white,
      fontSize: moderateScale(18),
      fontWeight: 'bold',
    },
  });

export default getStyles;
