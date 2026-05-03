import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../libs';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161618',
    borderRadius: moderateScale(24),
    padding: moderateScale(12),
    marginBottom: moderateScale(20),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2c2c2e',
  },
  label: {
    fontSize: moderateScale(12),
    color: '#A0A0A0',
    marginBottom: moderateScale(12),
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: moderateScale(20),
  },
  currency: {
    fontSize: moderateScale(16),
    color: '#606060',
    fontWeight: '600',
    marginRight: moderateScale(8),
  },
  amount: {
    fontSize: moderateScale(22),
    fontWeight: '700',
    color: Theme.colors.white,
  },
  sliderContainer: {
    width: '100%',
    height: moderateScale(40),
    justifyContent: 'center',
    marginBottom: moderateScale(10),
  },
  track: {
    height: moderateScale(4),
    backgroundColor: '#333',
    borderRadius: moderateScale(2),
    position: 'relative',
  },
  activeTrack: {
    height: '100%',
    backgroundColor: Theme.colors.secondary,
    borderRadius: moderateScale(2),
  },
  thumb: {
    position: 'absolute',
    top: moderateScale(-10),
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: Theme.colors.secondary,
    borderWidth: 6,
    borderColor: '#3a4a08', // Darker green for border as per image
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: moderateScale(20),
  },
  limitLabel: {
    fontSize: moderateScale(13),
    color: '#606060',
  },
  adjustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adjustButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(24),
    backgroundColor: '#2c2c2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adjustText: {
    fontSize: moderateScale(12),
    color: '#A0A0A0',
    fontWeight: '600',
    marginHorizontal: moderateScale(24),
    letterSpacing: 1,
  },
  buttonText: {
    fontSize: moderateScale(24),
    color: Theme.colors.white,
    fontWeight: '300',
  },
});
