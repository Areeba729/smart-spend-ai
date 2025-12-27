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
      backgroundColor: Theme.colors.white,
      marginTop: verticalScale(10),
      borderTopLeftRadius: moderateScale(25),
      borderTopRightRadius: moderateScale(25),
      paddingTop: verticalScale(10),
    },
    listContainer: {
      paddingBottom: verticalScale(20),
    },
    notificationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: scale(20),
      paddingVertical: verticalScale(15),
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
    },
    iconContainer: {
      marginRight: scale(15),
    },
    textContainer: {
      flex: 1,
    },
    message: {
      fontSize: moderateScale(14),
      color: '#333',
      fontWeight: '500',
      marginBottom: verticalScale(4),
    },
    date: {
      fontSize: moderateScale(12),
      color: '#999',
    },
    arrowIcon: {
      marginLeft: scale(10),
    },
  });

export default getStyles;
