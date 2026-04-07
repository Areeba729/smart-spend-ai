import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../../libs';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0A0A',
    borderRadius: moderateScale(28),
    padding: moderateScale(24),
    marginBottom: moderateScale(20),
    borderWidth: 1,
    borderColor: '#1C1C1E',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(16),
  },
  iconContainer: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(16),
    backgroundColor: '#93C523',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(16),
    shadowColor: '#93C523',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  icon: {
    fontSize: moderateScale(32),
  },
  title: {
    fontSize: moderateScale(18),
    color: Theme.colors.white,
    fontWeight: '800',
  },
  message: {
    fontSize: moderateScale(14),
    color: Theme.colors.grey,
    lineHeight: moderateScale(22),
    marginBottom: moderateScale(24),
    fontWeight: '500',
  },
  highlight: {
    color: '#93C523',
    fontWeight: 'bold',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#1C1C1E',
    borderRadius: moderateScale(24),
    paddingVertical: moderateScale(16),
    width: '100%',
  },
  actionText: {
    fontSize: moderateScale(15),
    color: Theme.colors.white,
    fontWeight: '600',
    marginRight: moderateScale(8),
  },
  arrow: {
    fontSize: moderateScale(18),
    color: Theme.colors.white,
  },
});

export default styles;
