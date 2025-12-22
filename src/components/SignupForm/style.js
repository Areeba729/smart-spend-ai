import { StyleSheet } from 'react-native';
import { Theme } from '../../libs';
import { scale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignSelf: 'center',
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
    width: scale(325),
    borderColor: '#666',
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#D6D6D6',
    fontSize: 14,
  },
  input: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
    padding: 0,
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
    backgroundColor: '#86AE12',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  signupButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
