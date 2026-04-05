import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../../libs';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,
  },
  header: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelBtn: {
    fontSize: moderateScale(14),
    color: '#A0A0A0',
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: Theme.colors.white,
  },
  placeholder: {
    width: moderateScale(45), // rough width of "Cancel" to balance title
  },
  scrollContent: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(100),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(16),
    marginTop: moderateScale(8),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: Theme.colors.white,
  },
  badge: {
    backgroundColor: '#1c1c1e',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(8),
  },
  badgeText: {
    fontSize: moderateScale(12),
    color: '#606060',
    fontWeight: '600',
  },
  impactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: moderateScale(20),
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  updateButton: {
    backgroundColor: Theme.colors.secondary,
    borderRadius: moderateScale(16),
    height: moderateScale(56),
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#1a1a1a',
  },
});
