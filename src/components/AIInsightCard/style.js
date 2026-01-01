import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../libs';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(134, 174, 18, 0.05)',
    borderRadius: moderateScale(24),
    padding: moderateScale(20),
    borderWidth: 1,
    borderColor: 'rgba(134, 174, 18, 0.2)',
    marginBottom: moderateScale(24),
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  iconWrapper: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: 'rgba(134, 174, 18, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  labelText: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: '#EAB308', // Goldish color for AI Insight
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  insightText: {
    fontSize: moderateScale(14),
    color: Theme.colors.white,
    lineHeight: moderateScale(22),
    marginBottom: moderateScale(15),
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(12),
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: moderateScale(13),
    color: Theme.colors.white,
    fontWeight: '600',
    marginRight: moderateScale(6),
  },
});
