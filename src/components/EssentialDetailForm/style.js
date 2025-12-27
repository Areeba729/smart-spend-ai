import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Theme } from '../../libs';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: verticalScale(30),
  },
  field: {
    marginBottom: verticalScale(20),
  },
  label: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#333',
    marginBottom: verticalScale(8),
  },
  inputContainer: {
    backgroundColor: Theme.colors.white,
    borderColor: Theme.colors.text,
    width: scale(325),
    height: scale(50),
    paddingHorizontal: scale(16),
    alignSelf: 'center',
  },
  inputContainerWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: moderateScale(14),
    color: '#333',
    padding: 0,
  },
  placeholderText: {
    color: '#999',
  },
  error: {
    color: '#EC495D',
    fontSize: moderateScale(12),
    marginTop: verticalScale(4),
  },
  sectionTitle: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#333',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(4),
  },
  sectionSubtitle: {
    fontSize: moderateScale(12),
    color: '#999',
    marginBottom: verticalScale(15),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: verticalScale(15),
  },
  checkbox: {
    width: scale(20),
    height: scale(20),
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: moderateScale(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
    marginTop: verticalScale(2),
  },
  checkboxChecked: {
    backgroundColor: '#3E64FF',
    borderColor: '#3E64FF',
  },
  checkboxCheckmark: {
    color: Theme.colors.white,
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
  checkboxText: {
    fontSize: moderateScale(13),
    color: '#666',
    flex: 1,
    lineHeight: moderateScale(18),
  },
  link: {
    color: '#3E64FF',
    textDecorationLine: 'underline',
  },
  submitButton: {
    backgroundColor: '#4C6EF5',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  submitButtonText: {
    color: Theme.colors.white,
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationIcon: {
    marginRight: scale(10),
  },
});
