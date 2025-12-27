import { StyleSheet } from 'react-native';
import { Theme, Responsive } from '../../libs';
import { scale } from 'react-native-size-matters';

const styleGenerator = colors =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#4C6EF5',
      paddingHorizontal: Responsive.getWidth(5),
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
      borderColor: '#333333',
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
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: Responsive.getHeight(5),
      marginTop: 'auto',
    },
    footerText: {
      ...Theme.typography.body,
      color: '#666666',
      fontSize: Responsive.getWidth(3.5),
    },
    loginText: {
      ...Theme.typography.heading,
      color: colors.secondary,
      fontSize: Responsive.getWidth(3.5),
      marginLeft: Responsive.getWidth(1),
    },
  });

export default styleGenerator;
