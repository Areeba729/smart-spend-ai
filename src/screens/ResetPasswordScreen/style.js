import { StyleSheet } from 'react-native';
import { Theme, Responsive } from '../../libs';

const styleGenerator = colors =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.black,
    },
    container: {
      paddingHorizontal: Responsive.getWidth(5),
      flexGrow: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: Responsive.getHeight(2),
      marginBottom: Responsive.getHeight(4),
    },
    backButton: {
      padding: Responsive.getWidth(2),
      marginLeft: -Responsive.getWidth(2),
    },
    contentContainer: {
      flex: 1,
    },
    iconContainer: {
      width: Responsive.getWidth(16),
      height: Responsive.getWidth(16),
      borderRadius: Responsive.getWidth(4),
      backgroundColor: '#1E1E1E',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: Responsive.getHeight(3),
      borderWidth: 1,
      borderColor: '#2A3310', // Dark green border
    },
    title: {
      ...Theme.typography.heading,
      fontSize: Responsive.getWidth(7),
      color: colors.white,
      marginBottom: Responsive.getHeight(1.5),
      textAlign: 'left',
    },
    subtitle: {
      ...Theme.typography.body,
      fontSize: Responsive.getWidth(4),
      color: colors.grey,
      marginBottom: Responsive.getHeight(4),
      lineHeight: Responsive.getHeight(3),
      textAlign: 'left',
    },
  });

export default styleGenerator;
