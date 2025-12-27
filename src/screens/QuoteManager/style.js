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
    contentHeader: {
      paddingHorizontal: scale(20),
      paddingVertical: verticalScale(15),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rfqTitle: {
      fontSize: moderateScale(18),
      fontWeight: '600',
      color: '#333',
    },
    buttonGroup: {
      flexDirection: 'row',
    },
    actionButton: {
      paddingHorizontal: scale(15),
      paddingVertical: verticalScale(6),
      borderRadius: scale(8),
      borderWidth: 1,
      borderColor: '#333',
      marginLeft: scale(10),
    },
    actionButtonText: {
      fontSize: moderateScale(14),
      color: '#333',
      fontWeight: '500',
    },
    tableHeader: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#D6D6D6',
      backgroundColor: Theme.colors.white,
    },
    headerCell: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: verticalScale(10),
      borderRightWidth: 0.5,
      borderRightColor: '#D6D6D6',
    },
    verticalHeaderCell: {
      width: scale(50),
      justifyContent: 'center',
      alignItems: 'center',
    },
    verticalTextContainer: {
      transform: [{ rotate: '-90deg' }],
      width: verticalScale(100),
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      fontSize: moderateScale(10),
      fontWeight: '700',
      color: '#333',
      textAlign: 'center',
    },
    iconHeader: {
      alignItems: 'center',
    },
    subHeaderText: {
      fontSize: moderateScale(10),
      fontWeight: '600',
      color: '#666',
      marginTop: verticalScale(2),
    },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#D6D6D6',
    },
    cell: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: verticalScale(15),
      borderRightWidth: 0.5,
      borderRightColor: '#D6D6D6',
    },
    inboxCell: {
      flex: 3,
      paddingHorizontal: scale(10),
    },
    compareCell: {
      width: scale(50),
    },
    sectorCell: {
      flex: 2,
      paddingHorizontal: scale(5),
    },
    statusCell: {
      width: scale(40),
    },
    quoteCard: {
      width: '100%',
      padding: scale(10),
      borderRadius: scale(10),
      borderWidth: 1,
      borderColor: '#333',
      alignItems: 'center',
    },
    quoteCardText: {
      fontSize: moderateScale(10),
      color: '#666',
      marginBottom: verticalScale(5),
    },
    companyName: {
      fontSize: moderateScale(12),
      fontWeight: '700',
      color: '#333',
      textAlign: 'center',
    },
    sectorItem: {
      fontSize: moderateScale(10),
      color: '#777',
      marginBottom: verticalScale(2),
    },
    radioButton: {
      width: scale(20),
      height: scale(20),
      borderRadius: scale(10),
      borderWidth: 1,
      borderColor: '#D6D6D6',
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioButtonActive: {
      backgroundColor: '#3E64FF',
      borderColor: '#3E64FF',
    },
    radioButtonSelected: {
      backgroundColor: '#9E9E9E',
      borderColor: '#9E9E9E',
    },
    radioInner: {
      width: scale(10),
      height: scale(10),
      borderRadius: scale(5),
      backgroundColor: Theme.colors.white,
    },
    scaleIcon: {
      fontSize: moderateScale(14),
      marginTop: verticalScale(5),
    },
    statusEmoji: {
      fontSize: moderateScale(16),
    },
    noText: {
      fontSize: moderateScale(12),
      fontWeight: '700',
      color: 'red',
      transform: [{ rotate: '90deg' }],
    },
    maybeText: {
      fontSize: moderateScale(12),
      fontWeight: '700',
      color: 'blue',
      transform: [{ rotate: '90deg' }],
    },
    lastCell: {
      borderRightWidth: 0,
    },
    horizontalScrollWrapper: {
      width: scale(400),
    },
  });

export default getStyles;
