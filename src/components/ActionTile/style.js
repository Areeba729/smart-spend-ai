import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../libs';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161618',
    borderRadius: moderateScale(20),
    padding: moderateScale(16),
    marginHorizontal: moderateScale(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2c2c2e',
    position: 'relative',
  },
  aiTipsContainer: {
    borderColor: 'rgba(134, 174, 18, 0.4)',
  },
  iconWrapper: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    backgroundColor: '#2c2c2e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  aiIconWrapper: {
    backgroundColor: 'rgba(134, 174, 18, 0.15)',
  },
  label: {
    fontSize: moderateScale(12),
    color: '#A0A0A0',
    fontWeight: '500',
  },
  aiLabel: {
    color: Theme.colors.secondary,
  },
  dot: {
    position: 'absolute',
    top: moderateScale(12),
    right: moderateScale(12),
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    backgroundColor: '#EAB308',
  },
  tileEmoji: {
    fontSize: moderateScale(24),
  },
});
