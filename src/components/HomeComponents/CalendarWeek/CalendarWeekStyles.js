import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../../libs';

const styles = StyleSheet.create({
  container: {
    marginBottom: moderateScale(16),
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },
  monthText: {
    fontSize: moderateScale(14),
    color: Theme.colors.white,
    marginRight: moderateScale(6),
  },
  dropdownIcon: {
    fontSize: moderateScale(10),
    color: Theme.colors.grey,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayLabel: {
    fontSize: moderateScale(11),
    color: Theme.colors.grey,
    marginBottom: moderateScale(8),
  },
  dateCircle: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDateCircle: {
    backgroundColor: Theme.colors.secondary,
  },
  dateText: {
    fontSize: moderateScale(14),
    color: Theme.colors.white,
  },
  selectedDateText: {
    color: Theme.colors.black,
  },
  disabledDay: {
    opacity: 0.3,
  },
});

export default styles;
