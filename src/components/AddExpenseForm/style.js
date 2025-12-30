import { StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { Theme } from '../../libs';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: moderateScale(40),
  },
  amountSection: {
    alignItems: 'center',
    marginBottom: moderateScale(30),
  },

  amountInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: moderateScale(18),
    color: Theme.colors.grey,
    marginRight: moderateScale(10),
    fontWeight: '500',
  },
  amountValue: {
    fontSize: moderateScale(32),
    color: Theme.colors.grey,
    fontWeight: '600',
    minWidth: moderateScale(100),
    textAlign: 'center',
  },
  inputSection1: {
    marginBottom: moderateScale(12),
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#D6D6D6',
    fontSize: 14,
  },
  field: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#1E1E1E',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: Theme.colors.primary,
    borderColor: '#666',
    width: scale(325),
    height: scale(50),
    borderRadius: 12,
    alignSelf: 'center',
  },
  input: {
    fontSize: 12,
    color: '#fff',
    flex: 1,
  },
  error: {
    color: '#EC495D',
    fontSize: 12,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aiTag: {
    fontSize: moderateScale(10),
    color: '#86AE12',
    fontStyle: 'italic',
    marginBottom: moderateScale(10),
  },
  categoryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(24),
    width: scale(325),
    alignSelf: 'center',
  },
  categoryItem: {
    width: (scale(325) - moderateScale(30)) / 4,
    height: moderateScale(70),
    borderRadius: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(5),
  },
  categoryIcon: {
    fontSize: moderateScale(22),
    marginBottom: moderateScale(4),
  },
  categoryName: {
    fontSize: moderateScale(10),
    fontWeight: '600',
  },
  datePickerTrigger: {
    backgroundColor: Theme.colors.primary,
    borderColor: '#666',
    width: scale(325),
    height: scale(50),
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    alignSelf: 'center',
  },
  datePickerError: {
    borderColor: '#EC495D',
  },
  dateIconWrapper: {
    justifyContent: 'flex-end',
  },
  dateText: {
    flex: 1,
    fontSize: 12,
    color: '#fff',
    marginLeft: scale(8),
    marginTop: scale(2),
  },
  calendarIconEmoji: {
    fontSize: moderateScale(12),
  },
  noteContainer: {
    height: moderateScale(100),
    alignItems: 'flex-start',
    paddingVertical: moderateScale(12),
  },
  noteInput: {
    flex: 1,
    width: '100%',
    textAlignVertical: 'top',
    fontSize: 12,
    color: '#fff',
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  noteInputContainer: {
    height: 100,
  },
  categoryItemActive: {
    backgroundColor: '#86AE12',
  },
  categoryItemInactive: {
    backgroundColor: '#1E1E1E',
  },
  categoryNameActive: {
    color: '#000',
  },
  categoryNameInactive: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#86AE12',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: scale(325),
    alignSelf: 'center',
    marginTop: 20,
  },
  saveButtonIcon: {
    fontSize: 20,
    color: '#000',
    marginRight: 8,
    fontWeight: 'bold',
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelText: {
    textAlign: 'center',
    color: Theme.colors.grey,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 16,
  },
});
