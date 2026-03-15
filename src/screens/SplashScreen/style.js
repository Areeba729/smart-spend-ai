import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../libs';
const getStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: Theme.colors.white,
      backgroundColor: Theme.colors.black,
    },
    logoContainer: {
      position: 'absolute',
      top: '40%',
      left: '50%',
      marginLeft: -moderateScale(100),
      marginTop: -moderateScale(120),
      width: moderateScale(200),
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: moderateScale(120),
      height: moderateScale(120),
      marginBottom: moderateScale(16),
    },
    logoText: {
      color: Theme.colors.secondary,
      fontSize: moderateScale(26),
      fontWeight: 'bold',
    },
  });

export default getStyles;
