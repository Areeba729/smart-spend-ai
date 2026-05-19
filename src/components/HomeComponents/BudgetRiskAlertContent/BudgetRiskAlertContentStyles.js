import { StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { Theme } from '../../../libs';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1E',
    borderRadius: moderateScale(14),
    padding: moderateScale(16),
    borderWidth: 1,
    borderColor: 'rgba(255, 69, 58, 0.35)',
  },
  containerCompact: {
    borderWidth: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(6),
  },
  title: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: Theme.colors.white,
  },
  badge: {
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(3),
    borderRadius: moderateScale(6),
  },
  badgeText: {
    fontSize: moderateScale(9),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: moderateScale(12),
    color: Theme.colors.text,
    marginBottom: moderateScale(12),
    lineHeight: moderateScale(18),
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(12),
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(10),
    backgroundColor: 'rgba(255, 69, 58, 0.08)',
    borderRadius: moderateScale(8),
  },
  scoreLabel: {
    fontSize: moderateScale(11),
    color: Theme.colors.grey,
    fontWeight: '600',
  },
  scoreValue: {
    fontSize: moderateScale(18),
    fontWeight: '800',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: moderateScale(12),
    marginHorizontal: moderateScale(-4),
  },
  metricItem: {
    width: '50%',
    paddingHorizontal: moderateScale(4),
    marginBottom: moderateScale(8),
  },
  metricLabel: {
    fontSize: moderateScale(10),
    color: Theme.colors.grey,
    marginBottom: moderateScale(2),
  },
  metricValue: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: Theme.colors.white,
  },
  predictionBox: {
    backgroundColor: '#2C2C2E',
    borderRadius: moderateScale(10),
    padding: moderateScale(12),
    marginBottom: moderateScale(10),
  },
  predictionLabel: {
    fontSize: moderateScale(10),
    color: Theme.colors.secondary,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: moderateScale(4),
  },
  predictionText: {
    fontSize: scale(12),
    color: Theme.colors.text,
    lineHeight: scale(18),
  },
  suggestion: {
    fontSize: moderateScale(11),
    color: Theme.colors.secondary,
    fontStyle: 'italic',
    lineHeight: moderateScale(16),
  },
});

export default styles;
