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
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(40),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  screenTitle: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: Theme.colors.white,
  },
  addButton: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: '#1c1c1e',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2c2c2e',
  },
  budgetSummary: {
    marginBottom: moderateScale(30),
  },
  summaryLabel: {
    fontSize: moderateScale(14),
    color: Theme.colors.lighttextcolor,
    marginBottom: moderateScale(8),
  },
  summaryAmount: {
    fontSize: moderateScale(36),
    fontWeight: '700',
    color: Theme.colors.white,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: Theme.colors.white,
  },
  seeAll: {
    fontSize: moderateScale(14),
    color: Theme.colors.secondary,
    fontWeight: '600',
  },
});
