import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../libs';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161618',
    borderRadius: moderateScale(24),
    padding: moderateScale(16),
    marginBottom: moderateScale(16),
    borderWidth: 1,
    borderColor: '#2c2c2e',
  },
  overbudgetContainer: {
    borderColor: 'rgba(236, 73, 93, 0.3)',
    backgroundColor: 'rgba(236, 73, 93, 0.05)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },
  iconWrapper: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(16),
  },
  titleWrapper: {
    flex: 1,
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: Theme.colors.white,
    marginBottom: moderateScale(2),
  },
  subtitle: {
    fontSize: moderateScale(12),
    color: Theme.colors.lighttextcolor,
  },
  overbudgetSubtitle: {
    color: Theme.colors.error,
  },
  editButton: {
    padding: moderateScale(8),
  },
  progressContainer: {
    height: moderateScale(6),
    backgroundColor: '#2c2c2e',
    borderRadius: moderateScale(3),
    marginBottom: moderateScale(20),
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Theme.colors.secondary,
    borderRadius: moderateScale(3),
  },
  overbudgetProgressBar: {
    backgroundColor: Theme.colors.error,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: moderateScale(10),
    color: Theme.colors.lighttextcolor,
    marginBottom: moderateScale(4),
  },
  detailValue: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: Theme.colors.white,
  },
  remainingValue: {
    color: Theme.colors.secondary,
  },
  overbudgetValue: {
    color: Theme.colors.error,
  },
  largeEmoji: {
    fontSize: moderateScale(24),
  },
  centerAlign: {
    alignItems: 'center',
  },
  flexEndAlign: {
    alignItems: 'flex-end',
  },
});
