import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../../libs';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1E',
    borderRadius: Theme.borders.normalRadius,
    padding: moderateScale(16),
    marginBottom: moderateScale(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(8),
  },
  label: {
    fontSize: moderateScale(12),
    color: Theme.colors.grey,
  },
  currencyBadge: {
    fontSize: moderateScale(10),
    color: Theme.colors.secondary,
    backgroundColor: 'rgba(134, 174, 18, 0.2)',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(4),
  },
  amount: {
    fontSize: moderateScale(32),
    color: Theme.colors.white,
    marginBottom: moderateScale(12),
  },
  progressContainer: {
    marginBottom: moderateScale(12),
  },
  progressBar: {
    height: moderateScale(6),
    backgroundColor: '#2C2C2E',
    borderRadius: moderateScale(3),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Theme.colors.secondary,
    borderRadius: moderateScale(3),
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dot: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    backgroundColor: Theme.colors.secondary,
    marginTop: moderateScale(6),
    marginRight: moderateScale(8),
  },
  message: {
    flex: 1,
    fontSize: moderateScale(11),
    color: Theme.colors.grey,
    lineHeight: moderateScale(16),
  },
  highlight: {
    color: Theme.colors.white,
  },
});

export default styles;
