import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../libs';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161618',
    borderRadius: moderateScale(20),
    padding: moderateScale(16),
    marginBottom: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    backgroundColor: '#2c2c2e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(16),
  },
  name: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: Theme.colors.white,
    marginBottom: moderateScale(4),
  },
  date: {
    fontSize: moderateScale(12),
    color: '#606060',
  },
  amount: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: Theme.colors.white,
  },
  listEmoji: {
    fontSize: moderateScale(24),
  },
});
