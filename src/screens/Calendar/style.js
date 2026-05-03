import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../libs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(50),
    paddingBottom: moderateScale(16),
  },
  backButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: moderateScale(20),
    color: Theme.colors.white,
  },
  headerTitle: {
    fontSize: moderateScale(18),
    color: Theme.colors.white,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(8),
  },
  menuIcon: {
    fontSize: moderateScale(20),
    color: Theme.colors.white,
  },
  settingsButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: moderateScale(16),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(100),
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginBottom: moderateScale(24),
  },
  navArrow: {
    fontSize: moderateScale(24),
    color: Theme.colors.white,
    paddingHorizontal: moderateScale(12),
  },
  monthInfo: {
    alignItems: 'center',
  },
  monthText: {
    fontSize: moderateScale(18),
    color: Theme.colors.white,
    fontWeight: '700',
    marginBottom: moderateScale(2),
  },
  totalSpent: {
    fontSize: moderateScale(12),
    color: Theme.colors.grey,
  },
  totalAmount: {
    fontWeight: '700',
    color: Theme.colors.secondary,
  },
  // Calendar Grid Styles
  calendarContainer: {
    marginBottom: moderateScale(30),
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(12),
    paddingHorizontal: moderateScale(5),
  },
  weekDayText: {
    width: moderateScale(40),
    textAlign: 'center',
    fontSize: moderateScale(11),
    color: '#3A3A3C',
    fontWeight: '600',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayCell: {
    width: moderateScale(44),
    height: moderateScale(54),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(8),
  },
  selectedDayCell: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: Theme.colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: moderateScale(2),
  },
  dayText: {
    fontSize: moderateScale(15),
    color: Theme.colors.white,
    fontWeight: '500',
  },
  notCurrentMonthText: {
    color: '#2C2C2E',
  },
  selectedDayText: {
    color: Theme.colors.black,
    fontWeight: '700',
  },
  dotContainer: {
    height: moderateScale(4),
    marginTop: moderateScale(4),
    flexDirection: 'row',
  },
  dot: {
    width: moderateScale(4),
    height: moderateScale(4),
    borderRadius: moderateScale(2),
    marginHorizontal: moderateScale(1),
  },
  // Overview Styles
  overviewSection: {
    marginTop: moderateScale(10),
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(16),
  },
  overviewTitle: {
    fontSize: moderateScale(18),
    color: Theme.colors.white,
    fontWeight: '700',
  },
  viewFullList: {
    fontSize: moderateScale(13),
    color: Theme.colors.secondary,
    fontWeight: '500',
  },
  overviewCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: moderateScale(24),
    padding: moderateScale(20),
  },
  totalSpentLabel: {
    fontSize: moderateScale(13),
    color: Theme.colors.grey,
    marginBottom: moderateScale(4),
  },
  totalSpentAmount: {
    fontSize: moderateScale(28),
    color: Theme.colors.white,
    fontWeight: '700',
  },
  budgetBadge: {
    position: 'absolute',
    top: moderateScale(20),
    right: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 204, 0, 0.15)',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: 'rgba(255, 204, 0, 0.3)',
  },
  budgetIcon: {
    fontSize: moderateScale(14),
    marginRight: moderateScale(6),
  },
  budgetText: {
    fontSize: moderateScale(12),
    color: '#FFCC00',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: moderateScale(20),
    gap: moderateScale(12),
  },
  statItem: {
    flex: 1,
    backgroundColor: '#121212',
    borderRadius: moderateScale(16),
    padding: moderateScale(12),
  },
  statLabel: {
    fontSize: moderateScale(11),
    color: Theme.colors.grey,
    marginBottom: moderateScale(8),
  },
  statValue: {
    fontSize: moderateScale(20),
    color: Theme.colors.white,
    fontWeight: '700',
  },
  impactBar: {
    height: moderateScale(6),
    backgroundColor: '#2C2C2E',
    borderRadius: moderateScale(3),
    marginTop: moderateScale(8),
    overflow: 'hidden',
  },
  impactFill: {
    height: '100%',
    backgroundColor: '#4E5BA6',
  },
  insightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginTop: moderateScale(16),
  },
  insightIconContainer: {
    width: moderateScale(32),
    height: moderateScale(32),
    marginRight: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  robotIcon: {
    fontSize: moderateScale(24),
  },
  insightText: {
    flex: 1,
    fontSize: moderateScale(12),
    color: Theme.colors.grey,
    lineHeight: moderateScale(18),
    fontStyle: 'italic',
  },
  // Transactions List Styles
  transactionsSection: {
    marginTop: moderateScale(24),
    marginBottom: moderateScale(24),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(16),
  },
  sectionTitle: {
    fontSize: moderateScale(14),
    color: Theme.colors.white,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  transactionCount: {
    fontSize: moderateScale(12),
    color: Theme.colors.secondary,
    fontWeight: '600',
  },
  transactionsList: {
    gap: moderateScale(12),
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    padding: moderateScale(16),
    borderRadius: moderateScale(16),
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIconContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(10),
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(12),
  },
  transactionIcon: {
    fontSize: moderateScale(18),
  },
  transactionTextContent: {
    justifyContent: 'center',
  },
  transactionName: {
    fontSize: moderateScale(15),
    color: Theme.colors.white,
    fontWeight: '600',
    marginBottom: moderateScale(2),
  },
  transactionCategory: {
    fontSize: moderateScale(12),
    color: Theme.colors.grey,
  },
  transactionAmount: {
    fontSize: moderateScale(15),
    color: '#FF3B30',
    fontWeight: '700',
  },
});

export default styles;
