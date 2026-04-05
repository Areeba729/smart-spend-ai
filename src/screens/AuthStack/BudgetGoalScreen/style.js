// BudgetGoalsStyle.js
import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../../libs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.black, // Dark green background like in screenshot
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(20),
  },
  headerTitle: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  saveText: {
    fontSize: moderateScale(16),
    color: '#93C523',
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(50),
  },
  insightCard: {
    backgroundColor: '#1A331A',
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: moderateScale(15),
  },
  insightIcon: {
    fontSize: moderateScale(18),
    marginRight: moderateScale(8),
  },
  insightText: {
    flex: 1,
    fontSize: moderateScale(14),
    color: '#B8D8B8',
    lineHeight: moderateScale(20),
  },
  boldText: {
    fontWeight: 'bold',
    color: '#93C523',
  },
  section: {
    marginBottom: moderateScale(15),
    backgroundColor: '#1A331A',
    padding: moderateScale(16),
    borderRadius: moderateScale(12),
  },
  sectionLabel: {
    fontSize: moderateScale(12),
    color: '#abcf5eff',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  currencySelector: {
    backgroundColor: '#1A331A',
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currencyText: {
    color: '#FFFFFF',
    fontSize: moderateScale(10),
    marginTop: moderateScale(-30),
  },
  dropdownIcon: {
    color: '#666',
    fontSize: moderateScale(14),
  },
  inputContainer: {
    backgroundColor: '#000000',
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: moderateScale(20),
    fontWeight: '600',
  },
  inputLarge: {
    color: '#ffffffff',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  currencySuffix: {
    color: '#666',
    fontSize: moderateScale(15),
  },
  currencySuffixLarge: {
    color: '#ffffffff',
    fontSize: moderateScale(15),
    fontWeight: '600',
  },
  budgetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },
  budgetIcon: {
    fontSize: moderateScale(15),
    marginRight: moderateScale(6),
  },
  percentageText: {
    marginLeft: 'auto',
    color: '#666',
    fontSize: moderateScale(13),
  },
  utilizationLabel: {
    color: '#666',
    fontSize: moderateScale(13),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(4),
  },
  progressBar: {
    height: moderateScale(8),
    backgroundColor: '#000000ff',
    borderRadius: moderateScale(4),
    overflow: 'hidden',
  },
  progressFill: {
    width: '80%', // 120k out of 150k
    height: '100%',
    backgroundColor: '#FF9500', // Orange progress
  },
  utilizationText: {
    color: '#666',
    fontSize: moderateScale(12),
    marginTop: moderateScale(6),
    alignSelf: 'flex-end',
  },
  savingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },
  savingsIcon: {
    fontSize: moderateScale(22),
    marginRight: moderateScale(6),
  },
  targetText: {
    marginLeft: 'auto',
    color: '#93C523',
    fontSize: moderateScale(12),
    fontWeight: '600',
  },
  savingsProgressBar: {
    height: moderateScale(12),
    backgroundColor: '#000000',
    borderRadius: moderateScale(6),
    overflow: 'hidden',
    marginTop: moderateScale(20),
  },
  savingsProgressFill: {
    width: '20%', // Current 20% achieved
    height: '100%',
    backgroundColor: '#93C523',
    borderRadius: moderateScale(6),
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
  },
  progressLabelLeft: {
    color: '#666',
    fontSize: moderateScale(12),
  },
  progressLabelCenter: {
    color: '#93C523',
    fontSize: moderateScale(12),
    fontWeight: '600',
  },
  progressLabelRight: {
    color: '#666',
    fontSize: moderateScale(12),
  },
  bottomCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
  },
  smallCard: {
    backgroundColor: '#1A331A',
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    alignItems: 'center',
    flex: 0.48,
  },
  smallCardValue: {
    color: '#ffffffff',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginBottom: moderateScale(4),
  },
  smallCardLabel: {
    color: '#f1f1f1ff',
    fontSize: moderateScale(12),
  },
});

export default styles;
