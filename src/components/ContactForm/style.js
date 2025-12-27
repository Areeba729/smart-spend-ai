import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Theme } from '../../libs';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.white,
    marginHorizontal: scale(20),
    marginTop: verticalScale(20),
    borderRadius: scale(16),
    padding: scale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
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
  input: {
    // borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: scale(16),
    paddingHorizontal: scale(16),
    height: verticalScale(48),
    fontSize: moderateScale(14),
    color: '#333',
  },
  textArea: {
    height: verticalScale(120),
    paddingTop: verticalScale(12),
    textAlignVertical: 'top',
  },
  error: {
    color: '#FF3B30',
    fontSize: moderateScale(10),
    marginTop: verticalScale(-14),
  },
  inputContainer: {
    marginBottom: verticalScale(16),
  },
  sendButton: {
    backgroundColor: '#3E64FF',
    borderRadius: scale(16),
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  sendButtonText: {
    color: Theme.colors.white,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
});

export default styles;
