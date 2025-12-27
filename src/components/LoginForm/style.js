import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Theme } from '../../libs';

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
    borderColor: '',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#1E1E1E',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: Theme.colors.white,
    borderColor: Theme.colors.text,
    width: scale(325),
    height: scale(50),
  },
  label: {
    fontWeight: '500',
    marginBottom: 8,
    color: 'black',
    fontSize: 14,
  },
  input: {
    fontSize: 12,
    color: 'black',
    flex: 1,
  },
  error: {
    color: '#EC495D',
    fontSize: 12,
    marginTop: 4,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#4C6EF5',
    fontSize: 12,
    marginTop: scale(-8),
  },
  loginButton: {
    backgroundColor: '#4C6EF5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: scale(120),
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
