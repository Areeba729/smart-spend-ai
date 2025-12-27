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
    tableContainer: {
      flex: 1,
      paddingHorizontal: scale(10),
      marginTop: verticalScale(10),
    },
    tableHeader: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
      paddingVertical: verticalScale(15),
    },
    headerText: {
      fontSize: moderateScale(12),
      color: '#999',
      textAlign: 'center',
      fontWeight: '500',
    },
    column1: { flex: 1.2, alignItems: 'center' },
    column2: { flex: 1.5, alignItems: 'center' },
    column3: { flex: 1.5, alignItems: 'center' },
    column4: { flex: 1.2, alignItems: 'center' },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: verticalScale(12),
      borderBottomWidth: 1,
      borderBottomColor: '#f8f8f8',
    },
    verticalDivider: {
      width: 1,
      height: '80%',
      backgroundColor: '#f0f0f0',
      position: 'absolute',
      right: 0,
      top: '10%',
    },
    projectLink: {
      backgroundColor: '#2ecc71',
      paddingHorizontal: scale(10),
      paddingVertical: verticalScale(6),
      borderRadius: scale(20),
    },
    projectLinkInactive: {
      backgroundColor: '#82E0AA', // Lighter green for other rows
    },
    projectLinkText: {
      color: Theme.colors.white,
      fontSize: moderateScale(12),
      fontWeight: 'bold',
    },
    cellText: {
      fontSize: moderateScale(13),
      color: '#666',
      textAlign: 'center',
    },
    reUploadButton: {
      backgroundColor: '#3E64FF',
      paddingHorizontal: scale(8),
      paddingVertical: verticalScale(6),
      borderRadius: scale(15),
      width: scale(75),
      alignItems: 'center',
    },
    reUploadButtonInactive: {
      backgroundColor: '#9FB1FF',
    },
    reUploadText: {
      color: Theme.colors.white,
      fontSize: moderateScale(10),
      fontWeight: '600',
    },

    // Bottom Tab Bar
    bottomTabContainer: {
      flexDirection: 'row',
      height: verticalScale(60),
      backgroundColor: Theme.colors.white,
      borderTopWidth: 1,
      borderTopColor: '#f0f0f0',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingBottom: verticalScale(10),
    },
    tabItem: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default getStyles;
