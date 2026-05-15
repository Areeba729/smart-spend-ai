import { StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { Theme } from '../../libs';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: Theme.colors.white,
    width: '90%',
    borderRadius: moderateScale(12),
    padding: moderateScale(24),
  },
  message: {
    fontSize: moderateScale(14),
    color: Theme.colors.black,
    textAlign: 'center',
    lineHeight: moderateScale(20),
    marginBottom: moderateScale(24),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: scale(12),
  },
  button: {
    flex: 1,
    minHeight: moderateScale(44),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(8),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextHidden: {
    opacity: 0,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: Theme.colors.white,
    borderWidth: 1,
    borderColor: Theme.colors.secondary,
  },
  cancelButtonText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: Theme.colors.secondary,
  },
  confirmButton: {
    backgroundColor: Theme.colors.secondary,
  },
  confirmButtonText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: Theme.colors.white,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
