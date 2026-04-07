import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../libs';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161618',
    borderRadius: moderateScale(24),
    padding: moderateScale(20),
    marginBottom: moderateScale(24),
    borderWidth: 1,
    borderColor: '#2c2c2e',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(14),
  },
  icon: {
    fontSize: moderateScale(18),
    marginRight: moderateScale(10),
  },
  title: {
    fontSize: moderateScale(14),
    color: '#EAB308',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: moderateScale(15),
    color: '#A0A0A0',
    lineHeight: moderateScale(22),
    marginBottom: moderateScale(20),
  },
  highlight: {
    color: '#EAB308',
    fontWeight: '600',
  },
  button: {
    backgroundColor: 'rgba(134, 174, 18, 0.1)',
    borderRadius: moderateScale(14),
    paddingVertical: moderateScale(14),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(134, 174, 18, 0.2)',
  },
  buttonText: {
    fontSize: moderateScale(14),
    color: Theme.colors.secondary,
    fontWeight: '600',
  },
});
