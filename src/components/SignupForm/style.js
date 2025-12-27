import { StyleSheet } from 'react-native';
import { Theme } from '../../libs';
import { scale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: scale(16),
    width: scale(349),
    height: scale(700),
    paddingHorizontal: scale(16),
  },
  field: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Theme.colors.text,
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#1E1E1E',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    // backgroundColor: Theme.colors.primary,
    width: scale(325),
    borderColor: Theme.colors.text,
    height: scale(50),
    alignSelf: 'center',
  },
  label: {
    fontWeight: '500',
    marginBottom: 8,
    // color: '#D6D6D6',
    color: 'black',
    fontSize: 14,
    // marginLeft: scale(12),
  },
  input: {
    fontSize: 12,
    color: Theme.colors.black,
    flex: 1,
    padding: 0,
    paddingLeft: scale(12),
  },
  error: {
    color: '#EC495D',
    fontSize: 12,
    marginTop: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#666',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(12),
  },
  checkboxChecked: {
    backgroundColor: '#1E1E1E', // Or secondary color if checked
    borderColor: '#86AE12',
  },
  checkboxText: {
    color: '#999',
    fontSize: 14,
  },
  checkboxLink: {
    color: '#fff',
    fontWeight: '600',
  },
  checkboxCheckmark: {
    color: '#86AE12',
  },
  signupButton: {
    backgroundColor: '#4C6EF5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: scale(40),
    width: scale(325),
    alignSelf: 'center',
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: scale(20),
  },
  footerText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: scale(20),
  },
  footerLink: {
    color: '#4C6EF5',
    fontWeight: '600',
  },
});
