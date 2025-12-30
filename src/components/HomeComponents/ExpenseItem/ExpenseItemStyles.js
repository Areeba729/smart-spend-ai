import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../../libs';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1C1C1E',
    borderRadius: Theme.borders.normalRadius,
    padding: moderateScale(12),
    marginBottom: moderateScale(8),
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(8),
    backgroundColor: '#2C2C2E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(12),
  },
  icon: {
    fontSize: moderateScale(20),
  },
  textContainer: {
    flex: 1,
  },
  category: {
    fontSize: moderateScale(14),
    color: Theme.colors.white,
    marginBottom: moderateScale(2),
  },
  location: {
    fontSize: moderateScale(11),
    color: Theme.colors.lighttextcolor,
  },
  amount: {
    fontSize: moderateScale(14),
    color: Theme.colors.white,
  },
});

export default styles;
