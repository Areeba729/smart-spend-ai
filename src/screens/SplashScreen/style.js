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
      top: '45%',
      left: '50%',
      marginLeft: -moderateScale(90),
      marginTop: -moderateScale(90),
      width: moderateScale(180),
      height: moderateScale(250),
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      height: '80%',
      resizeMode: 'contain',
    },
    logoText: {
      color: Theme.colors.secondary,
      fontSize: moderateScale(24),
      fontWeight: 'bold',
    },
  });

export default getStyles;
