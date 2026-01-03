import { StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { Theme } from '../../../libs';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,
    paddingHorizontal: moderateScale(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(20),
    marginBottom: moderateScale(30),
  },
  iconButton: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: Theme.colors.white,
  },
  summarySection: {
    alignItems: 'center',
    marginBottom: moderateScale(30),
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  dateIcon: {
    marginRight: moderateScale(8),
  },
  summaryDate: {
    fontSize: moderateScale(14),
    color: '#A0A0A0',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: moderateScale(12),
  },
  pkrLabel: {
    fontSize: moderateScale(18),
    color: '#A0A0A0',
    marginRight: moderateScale(8),
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: moderateScale(36),
    color: Theme.colors.white,
    fontWeight: '700',
  },
  budgetBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(134, 174, 18, 0.15)',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: 'rgba(134, 174, 18, 0.3)',
  },
  budgetDot: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    backgroundColor: '#86AE12',
    marginRight: moderateScale(6),
  },
  budgetText: {
    fontSize: moderateScale(12),
    color: '#86AE12',
    fontWeight: '600',
  },
  dateSelector: {
    marginBottom: moderateScale(20),
  },
  dateCard: {
    width: moderateScale(65),
    height: moderateScale(65),
    borderRadius: moderateScale(20),
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  activeDateCard: {
    backgroundColor: '#86AE12',
    shadowColor: '#86AE12',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  dayText: {
    fontSize: moderateScale(12),
    color: '#A0A0A0',
    fontWeight: '600',
    marginBottom: moderateScale(4),
  },
  dateNumber: {
    fontSize: moderateScale(18),
    color: Theme.colors.white,
    fontWeight: '700',
  },
  activeDayText: {
    color: 'rgba(0, 0, 0, 0.6)',
  },
  activeDateNumber: {
    color: '#000',
  },
  transactionList: {
    flex: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: moderateScale(20),
    padding: moderateScale(16),
    marginBottom: moderateScale(12),
  },
  iconContainer: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(16),
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: Theme.colors.white,
    marginBottom: moderateScale(4),
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    marginRight: moderateScale(4),
  },
  timeText: {
    fontSize: moderateScale(12),
    color: '#A0A0A0',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: Theme.colors.white,
    marginBottom: moderateScale(4),
  },
  transactionCategory: {
    fontSize: moderateScale(12),
    color: '#A0A0A0',
  },
  categoryIcon: {
    fontSize: moderateScale(24),
  },
  listContent: {
    paddingBottom: moderateScale(20),
  },
});
