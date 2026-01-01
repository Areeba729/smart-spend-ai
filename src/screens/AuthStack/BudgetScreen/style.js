import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../../libs';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,
    paddingHorizontal: moderateScale(20),
  },
  scrollContent: {
    paddingBottom: moderateScale(100), // Space for tab bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(10),
    marginBottom: moderateScale(20),
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: moderateScale(32),
    fontWeight: '700',
    color: Theme.colors.white,
  },
  monthText: {
    fontSize: moderateScale(14),
    color: Theme.colors.lighttextcolor,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: moderateScale(4),
  },
  calendarButton: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: '#1c1c1e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: moderateScale(24),
    padding: moderateScale(20),
    marginBottom: moderateScale(16),
  },
  monthlyBudgetCard: {
    backgroundColor: '#161618',
    borderWidth: 1,
    borderColor: '#2c2c2e',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(8),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(10),
  },
  label: {
    fontSize: moderateScale(14),
    color: '#A0A0A0',
    fontWeight: '500',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: moderateScale(20),
  },
  mainAmount: {
    fontSize: moderateScale(34),
    fontWeight: '700',
    color: Theme.colors.white,
  },
  currency: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: Theme.colors.secondary,
    marginLeft: moderateScale(8),
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(12),
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: moderateScale(12),
    color: '#A0A0A0',
    marginBottom: moderateScale(4),
  },
  statValue: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: Theme.colors.white,
  },
  remainingValue: {
    color: Theme.colors.secondary,
  },
  progressContainer: {
    height: moderateScale(8),
    backgroundColor: '#2c2c2e',
    borderRadius: moderateScale(4),
    marginBottom: moderateScale(8),
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Theme.colors.secondary,
    borderRadius: moderateScale(4),
  },
  progressText: {
    fontSize: moderateScale(12),
    color: '#A0A0A0',
    alignSelf: 'flex-end',
  },
  aiLimitCard: {
    backgroundColor: '#161618',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 0,
    overflow: 'hidden',
  },
  verticalLine: {
    width: 4,
    height: '130%',
    backgroundColor: Theme.colors.secondary,
    marginRight: moderateScale(16),
  },
  aiIconWrapper: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: 'rgba(134, 174, 18, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(16),
  },
  aiContent: {
    flex: 1,
    paddingRight: moderateScale(16),
  },
  aiTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: Theme.colors.white,
    marginBottom: moderateScale(4),
  },
  aiDescription: {
    fontSize: moderateScale(13),
    color: '#A0A0A0',
    lineHeight: moderateScale(18),
  },
  highlightText: {
    color: Theme.colors.secondary,
    fontWeight: '700',
  },
  healthCard: {
    backgroundColor: 'rgba(21, 35, 23, 1)',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(134, 174, 18, 0.2)',
  },
  healthIconWrapper: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: 'rgba(134, 174, 18, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(16),
  },
  healthContent: {
    flex: 1,
  },
  healthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  healthTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: Theme.colors.white,
  },
  healthStatus: {
    color: '#6CC070',
  },
  badge: {
    backgroundColor: 'rgba(134, 174, 18, 0.2)',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(6),
  },
  badgeText: {
    fontSize: moderateScale(10),
    color: Theme.colors.secondary,
    fontWeight: '700',
  },
  healthDescription: {
    fontSize: moderateScale(13),
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: moderateScale(2),
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(30),
  },
  actionItem: {
    flex: 1,
    backgroundColor: '#161618',
    borderRadius: moderateScale(20),
    padding: moderateScale(16),
    alignItems: 'center',
    marginHorizontal: moderateScale(4),
  },
  actionIconWrapper: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: '#2c2c2e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  actionLabel: {
    fontSize: moderateScale(12),
    color: Theme.colors.white,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(16),
  },
  sectionTitle: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: Theme.colors.white,
  },
  seeReports: {
    fontSize: moderateScale(14),
    color: Theme.colors.secondary,
    fontWeight: '600',
  },
  insightCard: {
    backgroundColor: '#161618',
    flexDirection: 'row',
    alignItems: 'center',
  },
  insightImageWrapper: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(12),
    backgroundColor: '#2c2c2e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(16),
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: Theme.colors.white,
    marginBottom: moderateScale(4),
  },
  insightDescription: {
    fontSize: moderateScale(13),
    color: '#A0A0A0',
    lineHeight: moderateScale(18),
  },
  ellipsis: {
    color: '#A0A0A0',
    fontSize: moderateScale(20),
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  largeIcon: {
    fontSize: moderateScale(32),
  },
  mediumIcon: {
    fontSize: moderateScale(24),
  },
  smallIcon: {
    fontSize: moderateScale(20),
  },
});
