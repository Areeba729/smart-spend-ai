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
    emailHighlight: {
      color: colors.white,
      fontWeight: 'bold',
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
    changeLink: {
      ...Theme.typography.heading,
      color: '#666666', // Slightly lighter/darker depending on design, using grey for now
      fontSize: Responsive.getWidth(3.5),
      marginLeft: Responsive.getWidth(1),
      fontWeight: 'bold',
    },
  });

export default styleGenerator;
