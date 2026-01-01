import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../libs';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161618',
    borderRadius: moderateScale(24),
    padding: moderateScale(20),
    marginBottom: moderateScale(20),
    borderWidth: 1,
    borderColor: '#2c2c2e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: moderateScale(24),
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: moderateScale(56),
    height: moderateScale(56),
    borderRadius: moderateScale(16),
    backgroundColor: 'rgba(234, 179, 8, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(16),
  },
  titleLabel: {
    fontSize: moderateScale(14),
    color: '#A0A0A0',
    marginBottom: moderateScale(4),
  },
  mainAmount: {
    fontSize: moderateScale(22),
    fontWeight: '700',
    color: Theme.colors.white,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(236, 73, 93, 0.12)',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(12),
  },
  badgeText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#EC495D',
    marginLeft: moderateScale(4),
  },
  remainingSection: {
    marginBottom: moderateScale(20),
  },
  remainingLabel: {
    fontSize: moderateScale(14),
    color: '#A0A0A0',
    marginBottom: moderateScale(8),
  },
  remainingAmount: {
    fontSize: moderateScale(32),
    fontWeight: '700',
    color: Theme.colors.secondary,
  },
  progressInfoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: moderateScale(8),
  },
  percentageText: {
    fontSize: moderateScale(13),
    color: '#A0A0A0',
    fontWeight: '500',
  },
  progressContainer: {
    height: moderateScale(8),
    backgroundColor: '#2c2c2e',
    borderRadius: moderateScale(4),
    marginBottom: moderateScale(16),
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Theme.colors.secondary,
    borderRadius: moderateScale(4),
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: moderateScale(12),
    color: '#606060',
  },
  cardEmoji: {
    fontSize: moderateScale(28),
  },
  badgeEmoji: {
    fontSize: moderateScale(14),
  },
});
