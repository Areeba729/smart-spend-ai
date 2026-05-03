import { StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { Theme } from '../../../libs';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111111',
    borderRadius: moderateScale(16),
    padding: moderateScale(12),
    marginHorizontal: moderateScale(4),
    marginBottom: moderateScale(8),
    width: scale(150), // Adjusted to be more reliable for 2 per row
    borderWidth: 1,
    borderColor: '#1C1C1E',
  },
  iconStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(8),
  },
  iconContainer: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(8),
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: moderateScale(16),
  },
  statusText: {
    fontSize: moderateScale(10),
    fontWeight: '600',
  },
  textContainer: {
    width: '100%',
  },
  title: {
    fontSize: moderateScale(13),
    color: Theme.colors.white,
    fontWeight: '700',
    marginBottom: moderateScale(2),
  },
  description: {
    fontSize: moderateScale(11),
    color: Theme.colors.lighttextcolor,
    lineHeight: moderateScale(14),
  },
});

export default styles;
