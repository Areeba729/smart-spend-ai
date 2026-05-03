import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../../libs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,
  },
  header: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(20),
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: Theme.colors.white,
  },
  section: {
    marginBottom: moderateScale(30),
    paddingHorizontal: moderateScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(12),
    color: Theme.colors.grey,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: moderateScale(12),
    marginLeft: moderateScale(5),
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(18),
    marginBottom: moderateScale(12),
  },
  icon: {
    fontSize: moderateScale(20),
    marginRight: moderateScale(6),
    width: moderateScale(32),
  },
  label: {
    flex: 1,
    fontSize: moderateScale(16),
    color: Theme.colors.white,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: moderateScale(15),
    color: Theme.colors.lightTransparent,
    marginRight: moderateScale(8),
  },
  arrow: {
    fontSize: moderateScale(20),
    color: Theme.colors.grey,
  },
  subtitle: {
    position: 'absolute',
    bottom: moderateScale(6),
    left: moderateScale(54),
    fontSize: moderateScale(10),
    color: Theme.colors.lightTransparent,
  },
  version: {
    fontSize: moderateScale(12),
    color: Theme.colors.grey,
    textAlign: 'center',
    marginBottom: moderateScale(80),
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1E',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    fontSize: moderateScale(24),
    marginBottom: moderateScale(4),
    color: Theme.colors.grey,
  },
  activeNavIcon: {
    color: '#93C523',
  },
  navLabel: {
    fontSize: moderateScale(10),
    color: Theme.colors.grey,
  },
  activeNavLabel: {
    color: '#93C523',
    fontWeight: 'bold',
  },
});

export default styles;
