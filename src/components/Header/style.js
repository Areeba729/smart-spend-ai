import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Theme } from '../../libs';

const styles = StyleSheet.create({
  container: {
    height: verticalScale(60),
    backgroundColor: '#3E64FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingTop: scale(10),
  },
  backButton: {
    width: scale(40),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(-10),
  },
  title: {
    color: Theme.colors.white,
    fontSize: moderateScale(20),
    fontWeight: '700',
    marginLeft: scale(10),
    flex: 1,
    textAlign: 'center',
    marginRight: scale(40), // Balanced with back button
  },
});

export default styles;
