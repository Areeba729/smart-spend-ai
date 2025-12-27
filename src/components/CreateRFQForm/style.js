import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Theme } from '../../libs';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(40),
  },
  fieldContainer: {
    marginBottom: verticalScale(16),
  },
  label: {
    fontSize: moderateScale(14),
    color: '#333',
    fontWeight: '500',
    marginBottom: verticalScale(8),
  },
  requiredAsterisk: {
    color: '#FF0000',
  },
  input: {
    // borderWidth: 1,
    // borderColor: '#E2E8F0',
    borderRadius: scale(16),
    paddingHorizontal: scale(16),
    height: verticalScale(48),
    fontSize: moderateScale(14),
    color: '#333',
    backgroundColor: Theme.colors.white,
  },
  error: {
    color: '#FF3B30',
    fontSize: moderateScale(10),
    marginTop: verticalScale(-4),
  },
  inputContainer: {
    marginBottom: verticalScale(4),
  },
  submitButton: {
    backgroundColor: '#3E64FF',
    borderRadius: scale(16),
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  submitButtonText: {
    color: Theme.colors.white,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
});

export default styles;

