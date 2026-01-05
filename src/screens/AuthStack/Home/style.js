import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../../libs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: moderateScale(20),
    // paddingTop: moderateScale(50),
    paddingBottom: moderateScale(100),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: Theme.colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(12),
  },
  profileInitial: {
    fontSize: moderateScale(18),
    color: Theme.colors.black,
  },
  greeting: {
    fontSize: moderateScale(12),
    color: Theme.colors.grey,
  },
  userName: {
    fontSize: moderateScale(16),
    color: Theme.colors.white,
  },
  notificationButton: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIcon: {
    fontSize: moderateScale(20),
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: moderateScale(20),
    marginHorizontal: moderateScale(-4),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(12),
    marginTop: moderateScale(8),
  },
  noExpensesText: {
    fontSize: moderateScale(12),
    color: Theme.colors.secondary,
    textAlign: 'flex-start',
    marginBottom: moderateScale(10),
  },
  sectionTitle: {
    fontSize: moderateScale(11),
    color: Theme.colors.text,
    letterSpacing: 0.5,
    fontWeight: 'bold',
  },
  viewAll: {
    fontSize: moderateScale(11),
    color: Theme.colors.secondary,
    fontWeight: 'bold',
  },
  alertsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: moderateScale(-4),
  },
  alertsScroll: {
    marginBottom: moderateScale(20),
  },
  dailyLimitContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
    alignItems: 'center',
  },
  dailyLimitText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00796b',
  },

  quickActionsRow: {
    flexDirection: 'row',
    marginBottom: moderateScale(20),
  },
  budgetAmount: {
    color: '#93C523',
    fontWeight: 'bold',
  },
});

export default styles;
