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
    borderWidth: 1,
    borderColor: '#2c2c2e',
    position: 'relative',
  },
  activeBorder: {
    borderColor: 'rgba(134, 174, 18, 0.4)',
  },
  dot: {
    position: 'absolute',
    top: moderateScale(10),
    right: moderateScale(10),
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    backgroundColor: '#EAB308',
  },
  label: {
    fontSize: moderateScale(11),
    color: '#EAB308',
    fontWeight: '700',
    marginBottom: moderateScale(12),
    letterSpacing: 0.5,
  },
  currentLabel: {
    color: '#A0A0A0',
  },
  amount: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: Theme.colors.white,
    marginBottom: moderateScale(12),
  },
  barContainer: {
    height: moderateScale(64),
    backgroundColor: '#2c2c2e',
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    backgroundColor: Theme.colors.secondary,
    opacity: 0.8,
  },
  currentBar: {
    backgroundColor: '#404040',
  },
});
