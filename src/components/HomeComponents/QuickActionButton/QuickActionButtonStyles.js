import { StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { Theme } from '../../../libs';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    justifyContent: 'center',
  },
  Bigcontainer: {
    borderWidth: 1,
    borderColor: Theme.colors.primary,
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(10),
    paddingVertical: scale(4),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    margin: scale(4),
  },
  iconContainer: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(12),
    backgroundColor: Theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(8),
    marginTop: scale(10),
  },
  primaryIconContainer: {
    backgroundColor: Theme.colors.secondary,
  },
  icon: {
    fontSize: moderateScale(24),
    color: Theme.colors.secondary,
  },
  primaryIcon: {
    color: Theme.colors.black,
  },
  label: {
    fontSize: moderateScale(11),
    color: Theme.colors.grey,
    textAlign: 'center',
    marginBottom: scale(10),
  },
});

export default styles;
