import { StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { Theme } from '../../../libs';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,
    paddingHorizontal: moderateScale(20),
  },
  summarySection: {
    alignItems: 'center',
    marginBottom: moderateScale(24),
    marginTop: moderateScale(8),
  },
  periodLabel: {
    fontSize: moderateScale(14),
    color: '#A0A0A0',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: moderateScale(10),
    textAlign: 'center',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: moderateScale(8),
  },
  pkrLabel: {
    fontSize: moderateScale(18),
    color: '#A0A0A0',
    marginRight: moderateScale(8),
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: moderateScale(36),
    color: '#86AE12',
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: moderateScale(16),
    gap: moderateScale(12),
  },
  statBox: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    borderRadius: moderateScale(16),
    padding: moderateScale(14),
    alignItems: 'center',
  },
  statLabel: {
    fontSize: moderateScale(12),
    color: '#A0A0A0',
    fontWeight: '600',
    marginBottom: moderateScale(6),
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: moderateScale(18),
    color: Theme.colors.white,
    fontWeight: '700',
  },
  spentValue: {
    color: '#FF6B6B',
  },
  sectionTitle: {
    fontSize: moderateScale(14),
    color: '#A0A0A0',
    fontWeight: '600',
    marginBottom: moderateScale(12),
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  content: {
    paddingBottom: scale(40),
  },
  noExpensesText: {
    fontSize: moderateScale(14),
    color: Theme.colors.grey,
    textAlign: 'center',
    marginTop: moderateScale(20),
  },
  hintText: {
    fontSize: moderateScale(12),
    color: Theme.colors.grey,
    textAlign: 'center',
    marginBottom: moderateScale(12),
  },
});
