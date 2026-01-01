import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../libs';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161618',
    borderRadius: moderateScale(20),
    padding: moderateScale(16),
    marginHorizontal: moderateScale(6),
    borderWidth: 1,
    borderColor: '#2c2c2e',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(8),
  },
  icon: {
    fontSize: moderateScale(14),
    marginRight: moderateScale(6),
  },
  label: {
    fontSize: moderateScale(12),
    color: '#A0A0A0',
  },
  value: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: Theme.colors.white,
  },
});
