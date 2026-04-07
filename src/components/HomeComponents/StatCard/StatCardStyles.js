import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../../libs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    borderRadius: Theme.borders.normalRadius,
    padding: moderateScale(16),
    marginHorizontal: moderateScale(4),
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(8),
  },
  icon: {
    fontSize: moderateScale(16),
    marginRight: moderateScale(6),
  },
  label: {
    fontSize: moderateScale(12),
    color: Theme.colors.grey,
  },
  amount: {
    fontSize: moderateScale(20),
    color: Theme.colors.white,
  },
});

export default styles;
